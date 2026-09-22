import React, { useState } from 'react';
import './ApplicationForm.css';

const API_BASE_URL = 'http://192.168.0.244:5000/api';

const ApplicationForm = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    whatsapp: '',
    city: '',
    property: '',
    checkIn: '',
    checkOut: '',
    adults: '1',
    children: '0',
    message: '',
  });

  const [status, setStatus] = useState('idle'); // 'idle' | 'loading' | 'success' | 'error'
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('loading');
    setErrorMessage('');

    // Map form fields to the API's expected shape
    const payload = {
      full_name: formData.fullName,
      email: formData.email || undefined,
      phone: formData.phone,
      whatsapp_number: formData.whatsapp || undefined,
      city: formData.city || undefined,
      property_id: formData.property ? Number(formData.property) : undefined,
      check_in: formData.checkIn || undefined,
      check_out: formData.checkOut || undefined,
      adults: Number(formData.adults),
      children: Number(formData.children),
      guest_message: formData.message || undefined,
    };

    // Remove undefined keys so the request stays clean
    Object.keys(payload).forEach((key) => {
      if (payload[key] === undefined) delete payload[key];
    });

    try {
      const response = await fetch(`${API_BASE_URL}/enquiries/public`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data?.message || `Server error: ${response.status}`);
      }

      // Success — reset form
      setStatus('success');
      setFormData({
        fullName: '',
        email: '',
        phone: '',
        whatsapp: '',
        city: '',
        property: '',
        checkIn: '',
        checkOut: '',
        adults: '1',
        children: '0',
        message: '',
      });
    } catch (err) {
      console.error('Enquiry submission failed:', err);
      setStatus('error');
      setErrorMessage(
        err.message || 'Something went wrong. Please try again or contact us directly.'
      );
    }
  };

  const handleReset = () => {
    setStatus('idle');
    setErrorMessage('');
  };

  return (
    <section className="application-form-section">
      <div className="application-form-container">

        {/* Header */}
        <div className="application-form-header">
          <span className="application-form-eyebrow">
            KEZOI STAYS
          </span>

          <h1 className="application-form-title">
            BOOK YOUR STAY
          </h1>

          <p className="application-form-description">
            Tell us a little about your stay and we&apos;ll help you plan
            a memorable experience at KEZOI.
          </p>
        </div>

        {/* ── Success Banner ── */}
        {status === 'success' && (
          <div className="form-status-banner form-status-success">
            <span className="form-status-icon">&#10003;</span>
            <div className="form-status-body">
              <strong>Enquiry received!</strong>
              <p>Our team will get back to you shortly. We look forward to hosting you.</p>
            </div>
            <button type="button" className="form-status-dismiss" onClick={handleReset}>
              Submit another
            </button>
          </div>
        )}

        {/* ── Error Banner ── */}
        {status === 'error' && (
          <div className="form-status-banner form-status-error">
            <span className="form-status-icon">&#10005;</span>
            <div className="form-status-body">
              <strong>Submission failed</strong>
              <p>{errorMessage}</p>
            </div>
            <button type="button" className="form-status-dismiss" onClick={handleReset}>
              Try again
            </button>
          </div>
        )}

        {/* Form Card — hidden after successful submission */}
        {status !== 'success' && (
          <form
            className="application-form"
            onSubmit={handleSubmit}
          >

            {/* Personal Details */}
            <div className="form-section">
              <h2 className="form-section-title">
                YOUR DETAILS
              </h2>

              <div className="form-grid">

                {/* Full Name */}
                <div className="form-field">
                  <label htmlFor="fullName">
                    Full Name <span>*</span>
                  </label>

                  <input
                    type="text"
                    id="fullName"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    placeholder="Enter your full name"
                    required
                  />
                </div>

                {/* Email */}
                <div className="form-field">
                  <label htmlFor="email">
                    Email
                  </label>

                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter your email address"
                  />
                </div>

                {/* Phone */}
                <div className="form-field">
                  <label htmlFor="phone">
                    Phone <span>*</span>
                  </label>

                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="Enter your phone number"
                    required
                  />
                </div>

                {/* WhatsApp */}
                <div className="form-field">
                  <label htmlFor="whatsapp">
                    WhatsApp Number
                  </label>

                  <input
                    type="tel"
                    id="whatsapp"
                    name="whatsapp"
                    value={formData.whatsapp}
                    onChange={handleChange}
                    placeholder="Enter WhatsApp number"
                  />
                </div>

                {/* City */}
                <div className="form-field form-field-full">
                  <label htmlFor="city">
                    City
                  </label>

                  <input
                    type="text"
                    id="city"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    placeholder="Enter your city"
                  />
                </div>

              </div>
            </div>


            {/* Stay Details */}
            <div className="form-section">

              <h2 className="form-section-title">
                YOUR STAY
              </h2>

              <div className="form-grid">

                {/* Property */}
                <div className="form-field form-field-full">
                  <label htmlFor="property">
                    Property
                  </label>

                  <select
                    id="property"
                    name="property"
                    value={formData.property}
                    onChange={handleChange}
                  >
                    <option value="">Select a property</option>
                    <option value="1">Property 1</option>
                    <option value="2">Property 2</option>
                    <option value="3">Property 3</option>
                  </select>
                </div>


                {/* Check-in */}
                <div className="form-field">
                  <label htmlFor="checkIn">
                    Check-in Date
                  </label>

                  <input
                    type="date"
                    id="checkIn"
                    name="checkIn"
                    value={formData.checkIn}
                    onChange={handleChange}
                  />
                </div>


                {/* Check-out */}
                <div className="form-field">
                  <label htmlFor="checkOut">
                    Check-out Date
                  </label>

                  <input
                    type="date"
                    id="checkOut"
                    name="checkOut"
                    value={formData.checkOut}
                    onChange={handleChange}
                  />
                </div>


                {/* Adults */}
                <div className="form-field">
                  <label htmlFor="adults">
                    Adults
                  </label>

                  <select
                    id="adults"
                    name="adults"
                    value={formData.adults}
                    onChange={handleChange}
                  >
                    {[1, 2, 3, 4, 5, 6, 7, 8].map((number) => (
                      <option key={number} value={number}>
                        {number}
                      </option>
                    ))}
                  </select>
                </div>


                {/* Children */}
                <div className="form-field">
                  <label htmlFor="children">
                    Children
                  </label>

                  <select
                    id="children"
                    name="children"
                    value={formData.children}
                    onChange={handleChange}
                  >
                    {[0, 1, 2, 3, 4, 5, 6].map((number) => (
                      <option key={number} value={number}>
                        {number}
                      </option>
                    ))}
                  </select>
                </div>

              </div>
            </div>


            {/* Message */}
            <div className="form-section">

              <h2 className="form-section-title">
                ANYTHING WE SHOULD KNOW?
              </h2>

              <div className="form-field">

                <label htmlFor="message">
                  Message / Requirements
                </label>

                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Tell us about your requirements, preferences or anything else we should know..."
                  rows="6"
                />

              </div>

            </div>


            {/* Submit */}
            <div className="form-submit-area">

              <button
                type="submit"
                className="application-submit-btn"
                disabled={status === 'loading'}
                aria-busy={status === 'loading'}
              >
                {status === 'loading' ? (
                  <span className="btn-spinner" aria-label="Submitting…" />
                ) : (
                  'SEND APPLICATION'
                )}
              </button>

              <p className="form-note">
                Required fields are marked with{' '}
                <span style={{ color: 'var(--color-gold)' }}>*</span>.
                {' '}We&apos;ll respond within 24 hours.
              </p>

            </div>

          </form>
        )}
      </div>
    </section>
  );
};

export default ApplicationForm;