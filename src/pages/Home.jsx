import React from 'react';
import { useOutletContext } from 'react-router-dom';
import Hero from '../components/Hero';
import Experience from '../components/Experience';
import KezoiStory from '../components/KezoiStory';
import BrandStatement from '../components/BrandStatement';
import CustomerStories from '../components/CustomerStories';


const Home = () => {
  const { mobileMenuOpen } = useOutletContext();
  return (
    <>
      <Hero mobileMenuOpen={mobileMenuOpen} />
      <KezoiStory />

      <Experience />
      <CustomerStories />
      <BrandStatement />
    </>
  );
};

export default Home;
