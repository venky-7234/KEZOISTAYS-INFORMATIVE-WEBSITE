import React, { useEffect, useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';

import Header from './Header';
import Footer from './Footer';
import ApplicationForm from './ApplicationForm';

const Layout = () => {
  const { pathname } = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [bookingOpen, setBookingOpen] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <>
      <Header
        mobileMenuOpen={mobileMenuOpen}
        setMobileMenuOpen={setMobileMenuOpen}
        onBook={() => setBookingOpen(true)}
      />

      <main style={{ minHeight: '100vh' }}>
        <Outlet context={{ mobileMenuOpen, openBooking: () => setBookingOpen(true) }} />
      </main>

      <Footer />
      {bookingOpen && <ApplicationForm modal showPropertySelector={false} onClose={() => setBookingOpen(false)} />}
    </>
  );
};

export default Layout;
