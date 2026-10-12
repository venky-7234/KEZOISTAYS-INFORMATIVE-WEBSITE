import React from 'react';
import { BrowserRouter, Navigate, Routes, Route } from 'react-router-dom';
import BookStay from './pages/BookStay';
import Layout from './components/Layout';
import Home from './pages/Home';
import Stays from './pages/Stays';
import StayDetails from './pages/StayDetails';
import Locations from './pages/Locations';
import About from './pages/About';
import Contact from './pages/Contact';
import Profile from './pages/Profile';
import Legal from './pages/Legal';
import Care from './pages/Care';
import Move from './pages/Move';
import Table from './pages/Table';

import Gallery from './pages/Gallery';
import Collaboration from './pages/Collaboration';
import Journal from './pages/Journal';
import Partner from './pages/Partner';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="properties" element={<Stays />} />
          <Route path="stay/:slug" element={<StayDetails />} />
          <Route path="gallery" element={<Gallery />} />
          <Route path="collaboration" element={<Collaboration />} />
          <Route path="journal" element={<Journal />} />
          <Route path="our-stays" element={<About />} />
          <Route path="about" element={<Navigate to="/our-stays" replace />} />
          <Route path="partner" element={<Partner />} />
          <Route path="experiences" element={<Navigate to="/" replace />} />
          <Route path="experiences/live" element={<Navigate to="/properties" replace />} />
          <Route path="experiences/care" element={<Care />} />
          <Route path="experiences/move" element={<Move />} />
          <Route path="experiences/table" element={<Table />} />
          <Route path="contact" element={<Contact />} />
          <Route path="profile" element={<Profile />} />
          <Route path="privacy" element={<Legal title="Privacy Policy" />} />
          <Route path="terms" element={<Legal title="Terms & Conditions" />} />
          <Route path="cancellation" element={<Legal title="Cancellation Policy" />} />
          <Route path="book-stay" element={<BookStay />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
