import React from 'react';
import './Legal.css';

const PrivacyPolicy = () => (
  <article className="legal-copy">
    <p className="legal-brand"><strong>Kezoi Stays</strong></p>
    <p><strong>Effective Date:</strong> 9 October 2026</p>
    <p>At Kezoi Stays, we value your privacy and are committed to protecting the personal information you share with us. This Privacy Policy explains how we collect, use, store, and protect your information when you visit our website, enquire about our properties, make reservations, or communicate with us through WhatsApp and other channels.</p>

    <h2>1. Information We Collect</h2>
    <p>When you interact with Kezoi Stays, we may collect the following information:</p>
    <ul>
      <li>Personal details such as your name, email address, and phone number.</li>
      <li>Booking information, including check-in and check-out dates, number of guests, property preferences, and reservation details.</li>
      <li>Information you voluntarily provide through website forms, WhatsApp conversations, or customer support enquiries.</li>
      <li>Payment and transaction information necessary to process or verify reservations.</li>
      <li>Technical information such as browser type, device information, IP address, and website usage data, where applicable.</li>
    </ul>

    <h2>2. How We Use Your Information</h2>
    <p>We use the information collected to:</p>
    <ul>
      <li>Respond to enquiries and provide customer assistance.</li>
      <li>Check property availability and manage reservations.</li>
      <li>Send booking confirmations, payment updates, check-in instructions, and other stay-related notifications.</li>
      <li>Communicate with guests through WhatsApp, email, phone, or other appropriate channels.</li>
      <li>Improve our website, services, and guest experience.</li>
      <li>Maintain the security and reliability of our services.</li>
      <li>Comply with applicable legal and regulatory requirements.</li>
    </ul>
    <p>We do not sell your personal information to third parties.</p>

    <h2>3. WhatsApp Communication</h2>
    <p>Kezoi Stays may use the WhatsApp Business Platform to communicate with guests regarding enquiries, property availability, reservations, payments, and customer support.</p>
    <p>When you contact us through WhatsApp, we may process your phone number, messages, booking preferences, and related information to respond to your requests.</p>
    <p>WhatsApp communications may be supported by automated systems to provide timely responses and booking assistance.</p>
    <p>You may request to stop receiving non-essential promotional WhatsApp communications at any time.</p>

    <h2>4. Sharing of Information</h2>
    <p>We may share necessary information with trusted service providers who assist us with:</p>
    <ul>
      <li>Website hosting and technical operations.</li>
      <li>Reservation management and guest communication.</li>
      <li>Payment processing.</li>
      <li>Property operations and guest services.</li>
      <li>Legal and regulatory compliance.</li>
    </ul>
    <p>Information is shared only when reasonably necessary for these purposes, subject to applicable legal requirements.</p>

    <h2>5. Data Security</h2>
    <p>We take reasonable technical and organizational measures to protect personal information against unauthorized access, misuse, alteration, or disclosure.</p>
    <p>However, no internet-based service or electronic transmission method can be guaranteed to be completely secure.</p>

    <h2>6. Data Retention</h2>
    <p>We retain personal information for as long as reasonably necessary to provide our services, manage reservations, resolve disputes, maintain required records, and comply with applicable laws.</p>
    <p>When information is no longer required, we take appropriate steps to delete or securely dispose of it.</p>

    <h2>7. Cookies and Website Analytics</h2>
    <p>Our website may use cookies or similar technologies to support website functionality, understand visitor interactions, and improve the browsing experience.</p>
    <p>You may manage cookies through your browser settings. Disabling certain cookies may affect website functionality.</p>

    <h2>8. Third-Party Services</h2>
    <p>Our website and communications may involve third-party services, including booking platforms, payment providers, and WhatsApp.</p>
    <p>These services may process information under their own privacy policies. We encourage users to review the relevant policies when using external services.</p>

    <h2>9. Your Privacy Rights</h2>
    <p>Subject to applicable laws, you may contact us to:</p>
    <ul>
      <li>Request access to your personal information.</li>
      <li>Request correction of inaccurate information.</li>
      <li>Request deletion of personal information where legally permitted.</li>
      <li>Withdraw consent where processing relies on consent.</li>
      <li>Raise concerns about how your personal information is handled.</li>
    </ul>
    <p>We will review and respond to requests in accordance with applicable legal requirements.</p>

    <h2>10. Children's Privacy</h2>
    <p>Our services are intended for reservations made by adults. We do not knowingly collect personal information directly from children without appropriate authorization.</p>

    <h2>11. Changes to This Privacy Policy</h2>
    <p>Kezoi Stays may update this Privacy Policy periodically to reflect changes in our services, technology, or legal obligations.</p>
    <p>Any updates will be published on this page with a revised effective date.</p>

    <h2>12. Contact Us</h2>
    <p>If you have any questions, concerns, or requests regarding this Privacy Policy, please contact:</p>
    <address>
      <strong>Kezoi Stays</strong><br />
      Manikonda, Hyderabad, Telangana, India<br />
      Website: <a href="https://kezoistays.com/">https://kezoistays.com/</a><br />
      Email: <a href="mailto:support@kezoistays.com">support@kezoistays.com</a>
    </address>
    <hr />
    <p className="legal-copyright">© 2026 Kezoi Stays. All rights reserved.</p>
  </article>
);

const GenericLegalCopy = () => (
  <article className="legal-copy">
    <p>Welcome to Kezoi Stays. These terms govern your use of our website and services. By accessing or using our platform, you agree to be bound by these terms.</p>
    <h2>1. General Provisions</h2>
    <p>Kezoi Stays provides premium short-stay and serviced apartments. All bookings are subject to availability and confirmation.</p>
    <h2>2. User Responsibilities</h2>
    <p>Guests are expected to treat properties with respect and adhere to house rules provided during check-in. Any damages may incur additional charges.</p>
    <h2>3. Modifications</h2>
    <p>We reserve the right to update or modify these terms at any time without prior notice. Continued use of our services constitutes acceptance of the new terms.</p>
  </article>
);

const Legal = ({ title }) => (
  <main className="legal-page section-padding">
    <div className="legal-container">
      <h1>{title}</h1>
      {title === 'Privacy Policy' ? <PrivacyPolicy /> : <GenericLegalCopy />}
    </div>
  </main>
);

export default Legal;
