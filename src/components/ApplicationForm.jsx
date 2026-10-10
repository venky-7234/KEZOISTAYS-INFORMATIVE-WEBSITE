import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Check, ChevronLeft, ChevronRight, FileCheck2, LoaderCircle, Minus, Plus, RefreshCw, UploadCloud, X } from 'lucide-react';
import PhoneInput, { isValidPhoneNumber } from 'react-phone-number-input';
import 'react-phone-number-input/style.css';
import './ApplicationForm.css';

const API = (import.meta.env.VITE_API_BASE_URL || 'https://api.kezoistays.com').replace(/\/$/, '');
const FALLBACK_PROPERTY = { code: 'TG-0001', name: 'Premium 3BHK Flat', location: 'Manikonda, Hyderabad', maxGuests: 6 };
const iso = date => `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
const asDate = value => value ? new Date(`${value}T00:00:00`) : null;
const today = () => iso(new Date());
const dateLabel = value => asDate(value)?.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }) || 'Select date';
const money = value => new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(Number(value || 0));

function Month({ value, start, end, unavailable, onSelect }) {
  const first = new Date(value.getFullYear(), value.getMonth(), 1);
  const total = new Date(value.getFullYear(), value.getMonth() + 1, 0).getDate();
  const cells = [...Array(first.getDay()).fill(null), ...Array.from({ length: total }, (_, index) => new Date(value.getFullYear(), value.getMonth(), index + 1))];
  return <div className="booking-month">
    <h4>{value.toLocaleDateString('en-IN', { month: 'long', year: 'numeric' })}</h4>
    <div className="booking-weekdays">{['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map(day => <span key={day}>{day}</span>)}</div>
    <div className="booking-days">{cells.map((date, index) => {
      if (!date) return <span key={`blank-${index}`} />;
      const day = iso(date);
      const selected = day === start || day === end;
      const inRange = start && end && day > start && day < end;
      return <button type="button" key={day} aria-label={date.toLocaleDateString('en-IN')} aria-pressed={selected} disabled={day < today() || unavailable.has(day)} className={`${selected ? 'selected' : ''} ${inRange ? 'in-range' : ''}`} onClick={() => onSelect(day)}>{date.getDate()}</button>;
    })}</div>
  </div>;
}

function Counter({ title, hint, value, min, max, onChange }) {
  return <div className="guest-counter">
    <div><strong>{title}</strong><span>{hint}</span></div>
    <div className="counter-controls">
      <button type="button" aria-label={`Decrease ${title}`} disabled={value <= min} onClick={() => onChange(value - 1)}><Minus size={15} /></button>
      <output aria-label={`${title}: ${value}`}>{value}</output>
      <button type="button" aria-label={`Increase ${title}`} disabled={value >= max} onClick={() => onChange(value + 1)}><Plus size={15} /></button>
    </div>
  </div>;
}

function PriceSummary({ quote, loading }) {
  if (loading) return <div className="booking-status"><LoaderCircle className="spin" size={18} /> Updating your quote...</div>;
  if (!quote) return <div className="price-card price-empty"><h3>Price summary</h3><p>Select valid dates to see your estimated total.</p></div>;
  return <div className="price-card" aria-live="polite">
    <h3>Price summary</h3>
    <div><span>{money(quote.nightlyRate)} × {quote.nights} night{quote.nights === 1 ? '' : 's'}</span><span>{money(quote.subtotal)}</span></div>
    <div><span>Cleaning fee</span><span>{money(quote.cleaningFee)}</span></div>
    <div><span>Taxes</span><span>{money(quote.taxes)}</span></div>
    {quote.discountAmount > 0 && <><div className="discount-row"><span>Mobile discount ({quote.discountPercent}%)</span><span>-{money(quote.discountAmount)}</span></div><div className="discount-callout"><span>Actual price</span><del>{money(quote.actualTotal)}</del></div></>}
    <div className="price-total"><strong>{quote.discountAmount > 0 ? 'Price for you' : 'Estimated total'}</strong><strong>{money(quote.total)}</strong></div>
  </div>;
}

export default function ApplicationForm({ propertyCode = 'TG-0001', source = 'MAIN_WEBSITE', modal = false, onClose = () => {} }) {
  const [property, setProperty] = useState(FALLBACK_PROPERTY);
  const [propertyId, setPropertyId] = useState('');
  const [propertyOptions, setPropertyOptions] = useState([]);
  const [propertiesState, setPropertiesState] = useState('loading');
  const [month, setMonth] = useState(() => new Date(new Date().getFullYear(), new Date().getMonth(), 1));
  const [unavailableDates, setUnavailableDates] = useState([]);
  const [availabilityState, setAvailabilityState] = useState('idle');
  const [quote, setQuote] = useState(null);
  const [quoteLoading, setQuoteLoading] = useState(false);
  const [apiError, setApiError] = useState('');
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [reference, setReference] = useState('');
  const [dragging, setDragging] = useState(false);
  const [form, setForm] = useState({ checkIn: '', checkOut: '', adults: 1, children: 0, infants: 0, fullName: '', email: '', phone: '', idType: 'AADHAAR_CARD', idFile: null, discovery: '', referralName: '', referralPhone: '', message: '' });
  const unavailable = useMemo(() => new Set(unavailableDates), [unavailableDates]);
  const requestKey = useRef(globalThis.crypto?.randomUUID?.() || `${Date.now()}-${Math.random().toString(36).slice(2)}`);
  const modalRef = useRef(null);

  const loadProperties = async () => {
    setPropertiesState('loading'); setApiError('');
    try {
      const response = await fetch(`${API}/api/applications/properties`);
      const data = await response.json().catch(() => ({}));
      if (!response.ok || !data.success || !Array.isArray(data.properties)) throw Error('Properties could not be loaded.');
      const options = data.properties.filter(item => item.property_code);
      setPropertyOptions(options);
      setPropertiesState(options.length ? 'ready' : 'empty');
    } catch (error) {
      setPropertiesState('error');
      setApiError('Properties are temporarily unavailable. Please retry.');
    }
  };

  const loadAvailability = async (selected, silent = false) => {
    if (!selected?.id) return;
    if (!silent) { setAvailabilityState('loading'); setQuote(null); }
    setApiError('');
    try {
      const datesResponse = await fetch(`${API}/api/applications/properties/${encodeURIComponent(selected.id)}/unavailable-dates`);
      const datesData = await datesResponse.json().catch(() => ({}));
      if (!datesResponse.ok || !datesData.success) throw Error(datesData.message || 'Availability could not be loaded.');
      const blocked = new Set(Array.isArray(datesData.blocked_dates) ? datesData.blocked_dates : []);
      if (!blocked.size && Array.isArray(datesData.unavailable_dates)) datesData.unavailable_dates.forEach(({ start_date, end_date }) => {
        for (let day = asDate(String(start_date).slice(0, 10)); day < asDate(String(end_date).slice(0, 10)); day = new Date(day.getTime() + 864e5)) blocked.add(iso(day));
      });
      setPropertyId(selected.id);
      setProperty({ code: selected.property_code, name: selected.property_name || FALLBACK_PROPERTY.name, location: [selected.area, selected.city].filter(Boolean).join(', ') || FALLBACK_PROPERTY.location, maxGuests: Number(selected.max_guests || FALLBACK_PROPERTY.maxGuests) });
      setUnavailableDates([...blocked]);
      setAvailabilityState('ready');
      setForm(current => {
        if (!current.checkIn || !current.checkOut) return current;
        let rangeBlocked = false;
        for (let day = asDate(current.checkIn); iso(day) < current.checkOut; day = new Date(day.getTime() + 864e5)) {
          if (blocked.has(iso(day))) { rangeBlocked = true; break; }
        }
        if (!rangeBlocked) return current;
        setQuote(null);
        setErrors(previous => ({ ...previous, dates: 'Your selected dates were just blocked. Please choose another range.' }));
        return { ...current, checkIn: '', checkOut: '' };
      });
    } catch (error) {
      if (!silent) {
        setAvailabilityState('fallback');
        setUnavailableDates([]);
      }
      setApiError('Live availability is temporarily unavailable. Retry to refresh blocked dates and pricing.');
    }
  };

  useEffect(() => {
    loadProperties();
  }, [propertyCode]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (!propertyId) return undefined;
    const selected = propertyOptions.find(item => String(item.id) === String(propertyId));
    if (!selected) return undefined;
    const refresh = () => loadAvailability(selected, true);
    const refreshWhenVisible = () => { if (document.visibilityState === 'visible') refresh(); };
    const timer = globalThis.setInterval(refresh, 30000);
    globalThis.addEventListener('focus', refresh);
    document.addEventListener('visibilitychange', refreshWhenVisible);
    return () => {
      globalThis.clearInterval(timer);
      globalThis.removeEventListener('focus', refresh);
      document.removeEventListener('visibilitychange', refreshWhenVisible);
    };
  }, [propertyId, propertyOptions]); // eslint-disable-line react-hooks/exhaustive-deps

  const selectProperty = id => {
    const selected = propertyOptions.find(item => String(item.id) === String(id));
    setPropertyId(id);
    setQuote(null);
    setUnavailableDates([]);
    setForm(current => ({ ...current, checkIn: '', checkOut: '' }));
    setErrors(current => ({ ...current, property: '', dates: '' }));
    if (!selected) { setAvailabilityState('idle'); return; }
    setProperty({ code: selected.property_code, name: selected.property_name || FALLBACK_PROPERTY.name, location: [selected.area, selected.city].filter(Boolean).join(', ') || FALLBACK_PROPERTY.location, maxGuests: Number(selected.max_guests || FALLBACK_PROPERTY.maxGuests) });
    loadAvailability(selected);
  };

  useEffect(() => {
    if (!modal) return undefined;
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKeyDown = event => {
      if (event.key === 'Escape' && !submitting) onClose();
      if (event.key !== 'Tab') return;
      const focusable = [...(modalRef.current?.querySelectorAll('button:not(:disabled), input:not(:disabled), select:not(:disabled), textarea:not(:disabled), [href], [tabindex]:not([tabindex="-1"])') || [])];
      if (!focusable.length) return;
      const first = focusable[0], last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
      else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
    };
    document.addEventListener('keydown', onKeyDown);
    requestAnimationFrame(() => modalRef.current?.focus());
    return () => { document.body.style.overflow = previous; document.removeEventListener('keydown', onKeyDown); };
  }, [modal, onClose, submitting]);

  const rangeIsClear = (start, end) => {
    for (let day = asDate(start); iso(day) < end; day = new Date(day.getTime() + 864e5)) if (unavailable.has(iso(day))) return false;
    return true;
  };

  const selectDate = selected => {
    setErrors(current => ({ ...current, dates: '' })); setQuote(null);
    if (!form.checkIn || form.checkOut || selected <= form.checkIn) return setForm(current => ({ ...current, checkIn: selected, checkOut: '' }));
    if (!rangeIsClear(form.checkIn, selected)) return setErrors(current => ({ ...current, dates: 'This range contains an unavailable night.' }));
    setForm(current => ({ ...current, checkOut: selected }));
  };

  useEffect(() => {
    if (!form.checkIn || !form.checkOut || !propertyId || availabilityState !== 'ready') return setQuote(null);
    const controller = new AbortController();
    const timer = setTimeout(async () => {
      setQuoteLoading(true); setApiError('');
      try {
        const params = new URLSearchParams({ check_in: form.checkIn, check_out: form.checkOut, adults: String(form.adults), children: String(form.children), infants: String(form.infants), pets: '0' });
        if (form.phone && isValidPhoneNumber(form.phone)) params.set('mobile_number', form.phone);
        const response = await fetch(`${API}/api/applications/properties/${encodeURIComponent(propertyId)}/quote?${params}`, { method: 'GET', signal: controller.signal, headers: { Accept: 'application/json' } });
        const data = await response.json().catch(() => ({}));
        if (!response.ok || !data.success || !data.quote) throw Error(data.message || 'A live quote could not be calculated.');
        const item = data.quote;
        setQuote({ nightlyRate: Number(item.base_price_per_night), nights: Number(item.nights), subtotal: Number(item.base_amount) + Number(item.extra_guest_amount || 0), cleaningFee: Number(item.cleaning_fee || 0), taxes: Number(item.taxes || 0), discountAmount: Number(item.discount_amount || 0), discountPercent: Number(item.discount_percentage || 0), actualTotal: Number(item.original_amount || item.actual_price || Number(item.total_amount) + Number(item.discount_amount || 0)), total: Number(item.total_amount || item.final_amount) });
      } catch (error) { if (error.name !== 'AbortError') setApiError(error.message); }
      finally { if (!controller.signal.aborted) setQuoteLoading(false); }
    }, 450);
    return () => { clearTimeout(timer); controller.abort(); };
  }, [form.checkIn, form.checkOut, form.adults, form.children, form.infants, form.phone, propertyId, availabilityState]);

  const updateGuests = (key, value) => setForm(current => ({ ...current, [key]: Math.max(key === 'adults' ? 1 : 0, Math.min(value, property.maxGuests - (key === 'adults' ? current.children : current.adults))) }));
  const acceptFile = file => {
    setErrors(current => ({ ...current, idFile: '' }));
    if (!file) return;
    if (!['image/jpeg', 'image/png', 'application/pdf'].includes(file.type)) return setErrors(current => ({ ...current, idFile: 'Use a JPG, JPEG, PNG, or PDF file.' }));
    if (file.size > 5 * 1024 * 1024) return setErrors(current => ({ ...current, idFile: 'The document must be 5 MB or smaller.' }));
    setForm(current => ({ ...current, idFile: file }));
  };

  const validate = () => {
    const next = {};
    if (!propertyId) next.property = 'Select a property to continue.';
    if (!form.checkIn || !form.checkOut) next.dates = 'Select check-in and check-out dates.';
    if (!form.fullName.trim()) next.fullName = 'Full name is required.';
    if (!/^\S+@\S+\.\S+$/.test(form.email)) next.email = 'Enter a valid email address.';
    if (!form.phone || !isValidPhoneNumber(form.phone)) next.phone = 'Enter a valid international mobile number.';
    if (!form.idFile) next.idFile = 'Upload one identity document.';
    if (!form.discovery) next.discovery = 'Select how you heard about us.';
    if (form.discovery === 'REFERRAL' && !form.referralName.trim()) next.referralName = 'Reference name is required.';
    if (form.discovery === 'REFERRAL' && (!form.referralPhone || !isValidPhoneNumber(form.referralPhone))) next.referralPhone = 'Enter a valid reference mobile number.';
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const submit = async event => {
    event.preventDefault(); setApiError('');
    if (!validate()) return;
    setSubmitting(true);
    try {
      const payload = new FormData();
      const fields = { property_id: propertyId, application_source: source, check_in: form.checkIn, check_out: form.checkOut, adults: form.adults, children: form.children, infants: form.infants, pets: 0, full_name: form.fullName.trim(), email: form.email.trim(), whatsapp_number: form.phone, phone: form.phone, phone_country_code: 'IN', document_type: form.idType, discovery_source: form.discovery, referral_name: form.referralName.trim(), referral_mobile: form.referralPhone, guest_message: form.message.trim() };
      Object.entries(fields).forEach(([key, value]) => payload.append(key, value));
      payload.append('identity_document', form.idFile);
      const response = await fetch(`${API}/api/applications/submit`, { method: 'POST', headers: { 'Idempotency-Key': requestKey.current }, body: payload });
      const data = await response.json().catch(() => ({}));
      if (!response.ok || !data.success || !data.application) throw Error(data.message || 'Your application could not be submitted. Please try again.');
      setReference(String(data.application.reference_number || data.application.id));
    } catch (error) { setApiError(error.message); }
    finally { setSubmitting(false); }
  };

  const card = <section className="booking-modal-card" role={modal ? 'dialog' : undefined} aria-modal={modal || undefined} aria-labelledby="booking-title" ref={modalRef} tabIndex={-1}>
    <header className="booking-header">
      <div><span>Kezoi Stays{propertyId ? ` · ${property.code}` : ''}</span><h1 id="booking-title">Apply for your stay</h1></div>
      {modal && <button type="button" aria-label="Close booking application" onClick={onClose} disabled={submitting}><X /></button>}
    </header>
    {reference ? <div className="booking-success"><i><Check /></i><h2>Application submitted successfully</h2><p>Our team will review your request and contact you. Your stay is not confirmed until approval.</p><div><span>Application reference number</span><strong>{reference}</strong></div><button type="button" className="booking-primary" onClick={modal ? onClose : () => { globalThis.location.href = '/'; }}>Done</button></div> :
      <form onSubmit={submit} noValidate>
        <main className="booking-body">
          <section className="form-section" aria-labelledby="stay-heading"><div className="booking-section-heading"><span>01</span><div><h2 id="stay-heading">Stay dates & guests</h2><p>Choose your dates and tell us who is coming.</p></div></div>
            <label className="property-selector">Select property *
              {propertiesState === 'loading' ? <div className="booking-status"><LoaderCircle className="spin" size={18} /> Loading properties...</div> :
                propertiesState === 'error' ? <div className="booking-error" role="alert"><span>{apiError}</span><button type="button" onClick={loadProperties}><RefreshCw size={14} /> Retry</button></div> :
                propertiesState === 'empty' ? <div className="booking-notice" role="status">No properties are currently available for applications.</div> :
                <select value={propertyId} aria-invalid={Boolean(errors.property)} onChange={event => selectProperty(event.target.value)}><option value="">Choose a property</option>{propertyOptions.map(item => <option key={item.id} value={item.id}>{item.property_code} — {item.property_name || [item.area, item.city].filter(Boolean).join(', ') || 'Kezoi property'}</option>)}</select>}
              {errors.property && <small className="field-error">{errors.property}</small>}
            </label>
            {propertyId && <>
            <div className="date-summary"><div><span>Check-in</span><strong>{dateLabel(form.checkIn)}</strong></div><div><span>Check-out</span><strong>{dateLabel(form.checkOut)}</strong></div></div>
            <div className="calendar-card"><div className="calendar-nav"><button type="button" aria-label="Previous month" disabled={month.getFullYear() === new Date().getFullYear() && month.getMonth() === new Date().getMonth()} onClick={() => setMonth(new Date(month.getFullYear(), month.getMonth() - 1, 1))}><ChevronLeft /></button><span>Select your stay {availabilityState === 'ready' && <em>Live</em>}</span><button type="button" aria-label="Next month" onClick={() => setMonth(new Date(month.getFullYear(), month.getMonth() + 1, 1))}><ChevronRight /></button></div>
              {availabilityState === 'loading' && <div className="booking-status"><LoaderCircle className="spin" size={18} /> Loading availability...</div>}
              {availabilityState === 'fallback' && <div className="booking-notice" role="status"><span>{apiError}</span><button type="button" onClick={() => loadAvailability(propertyOptions.find(item => String(item.id) === String(propertyId)))}><RefreshCw size={14} /> Retry</button></div>}
              {(availabilityState === 'ready' || availabilityState === 'fallback') && <div className="months-grid"><Month value={month} start={form.checkIn} end={form.checkOut} unavailable={unavailable} onSelect={selectDate} /><Month value={new Date(month.getFullYear(), month.getMonth() + 1, 1)} start={form.checkIn} end={form.checkOut} unavailable={unavailable} onSelect={selectDate} /></div>}
            </div>
            {errors.dates && <p className="field-error" role="alert">{errors.dates}</p>}
            <div className="guests-card"><Counter title="Adults" hint="Age 13+" value={form.adults} min={1} max={property.maxGuests - form.children} onChange={value => updateGuests('adults', value)} /><Counter title="Children" hint="Age 2–12" value={form.children} min={0} max={property.maxGuests - form.adults} onChange={value => updateGuests('children', value)} /><Counter title="Infants" hint="Under 2" value={form.infants} min={0} max={5} onChange={value => setForm(current => ({ ...current, infants: value }))} /><small>Maximum capacity: {property.maxGuests} guests, excluding infants.</small></div>
            </>}
          </section>

          <section className="form-section" aria-labelledby="contact-heading"><div className="booking-section-heading"><span>02</span><div><h2 id="contact-heading">Guest contact information</h2><p>We will use these details to contact you about the application.</p></div></div>
            <div className="booking-fields"><label>Full name *<input autoComplete="name" aria-invalid={Boolean(errors.fullName)} value={form.fullName} onChange={event => setForm(current => ({ ...current, fullName: event.target.value }))} />{errors.fullName && <small className="field-error">{errors.fullName}</small>}</label><label>Email address *<input type="email" autoComplete="email" aria-invalid={Boolean(errors.email)} value={form.email} onChange={event => setForm(current => ({ ...current, email: event.target.value }))} />{errors.email && <small className="field-error">{errors.email}</small>}</label><label className="field-wide">Mobile / WhatsApp number *<PhoneInput international defaultCountry="IN" countryCallingCodeEditable={false} aria-label="Mobile or WhatsApp number" value={form.phone} onChange={phone => setForm(current => ({ ...current, phone: phone || '' }))} />{errors.phone && <small className="field-error">{errors.phone}</small>}</label></div>
          </section>

          <section className="form-section" aria-labelledby="identity-heading"><div className="booking-section-heading"><span>03</span><div><h2 id="identity-heading">Identity document</h2><p>Required for the lead guest.</p></div></div>
            <label className="identity-type">Document type *<select value={form.idType} onChange={event => setForm(current => ({ ...current, idType: event.target.value }))}><option value="AADHAAR_CARD">Aadhaar card</option><option value="PASSPORT">Passport</option><option value="DRIVING_LICENCE">Driving licence</option></select></label>
            <label className={`identity-dropzone ${dragging ? 'is-dragging' : ''} ${form.idFile ? 'has-file' : ''}`} onDragOver={event => { event.preventDefault(); setDragging(true); }} onDragLeave={() => setDragging(false)} onDrop={event => { event.preventDefault(); setDragging(false); acceptFile(event.dataTransfer.files[0]); }}><input type="file" aria-label="Upload identity document" accept=".jpg,.jpeg,.png,.pdf" onChange={event => acceptFile(event.target.files[0])} />{form.idFile ? <><FileCheck2 size={30} /><strong>{form.idFile.name}</strong><span>Click or drop another file to replace it</span></> : <><UploadCloud size={32} /><strong>Drag and drop your document here</strong><span>or click to browse · JPG, JPEG, PNG or PDF · Maximum 5 MB</span></>}</label>
            {errors.idFile && <p className="field-error" role="alert">{errors.idFile}</p>}<p className="identity-note">Your document is used only for booking verification.</p>
          </section>

          <section className="form-section" aria-labelledby="discovery-heading"><div className="booking-section-heading"><span>04</span><div><h2 id="discovery-heading">How did you hear about Kezoi Stays?</h2></div></div>
            <label className="identity-type">Discovery source *<select value={form.discovery} aria-invalid={Boolean(errors.discovery)} onChange={event => setForm(current => ({ ...current, discovery: event.target.value }))}><option value="">Select an option</option><option value="INSTAGRAM">Instagram</option><option value="FACEBOOK">Facebook</option><option value="X">X</option><option value="YOUTUBE">YouTube</option><option value="REFERRAL">Friend or referral</option><option value="OTHER">Other</option></select>{errors.discovery && <small className="field-error">{errors.discovery}</small>}</label>
            {form.discovery === 'REFERRAL' && <div className="booking-fields conditional-fields"><label>Reference name *<input value={form.referralName} onChange={event => setForm(current => ({ ...current, referralName: event.target.value }))} />{errors.referralName && <small className="field-error">{errors.referralName}</small>}</label><label>Reference mobile number *<PhoneInput international defaultCountry="IN" countryCallingCodeEditable={false} aria-label="Reference mobile number" value={form.referralPhone} onChange={phone => setForm(current => ({ ...current, referralPhone: phone || '' }))} />{errors.referralPhone && <small className="field-error">{errors.referralPhone}</small>}</label></div>}
          </section>

          <section className="form-section" aria-labelledby="quote-heading"><div className="booking-section-heading"><span>05</span><div><h2 id="quote-heading">Your estimated stay</h2></div></div><PriceSummary quote={quote} loading={quoteLoading} /></section>
          <section className="form-section" aria-labelledby="message-heading"><div className="booking-section-heading"><span>06</span><div><h2 id="message-heading">Special requests</h2><p>Optional</p></div></div><label className="message-field">Message or special request<textarea rows="4" value={form.message} onChange={event => setForm(current => ({ ...current, message: event.target.value }))} /></label><p className="payment-note">You won’t be charged now. Payment is requested after approval.</p></section>
          {apiError && availabilityState === 'ready' && <div className="booking-error" role="alert"><span>{apiError}</span></div>}
        </main>
        <footer className="booking-footer"><button type="submit" className="booking-primary" disabled={submitting || availabilityState !== 'ready' || quoteLoading}>{submitting ? <><LoaderCircle className="spin" size={18} /> Sending application…</> : availabilityState === 'fallback' ? 'Retry availability to submit' : 'Submit application'}</button></footer>
      </form>}
  </section>;

  if (!modal) return <div className="application-form-section">{card}</div>;
  return <div className="booking-modal-overlay" onMouseDown={event => { if (event.target === event.currentTarget && !submitting) onClose(); }}>{card}</div>;
}
