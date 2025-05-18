// src/HomeScreen.js
import React from 'react';
import { Link } from 'react-router-dom';
import './HomeScreen.css';  
import icon1 from './assets/icon1.svg';
import icon2 from './assets/icon2.png';
import icon3 from './assets/icon3.png';
import heroImage from './assets/Untitled.png';
import { Ribbon } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

function HomeScreen() {
  const navigate = useNavigate();

  const handleLearnMore = () => {
    navigate('/care-guidelines');
  };

  const handleFactSheet = () => {
    navigate('/factsheets');
  };

  return (
    <div className="home-screen-container">
      
      {/* Header Section */}
      <header className="header-section">
        <Ribbon size={50} className="header-icon" />
        <h1 className="header-title">CancerTalks</h1>
        {/* <p className="header-subtitle">Bringing you the latest in Cancer Care & Research</p> */}
      </header>

      {/* Hero Section with Blurred Background */}
      <section className="hero-section" style={{ backgroundImage: `url(${heroImage})` }}>
        <div className="hero-overlay">
          <h1 className="hero-title">Together We Can Minimize Global Cancer Health Disparities</h1>
          <p className="hero-subtitle">Our vision is to make evidence-based cancer care accessible to everyone</p>
          {/* <button className="hero-button">Donate Today</button> */}
        </div>
      </section>

      <div className='body'>
        {/* Content Below Hero Section */}
        <section className="cancer-odds-section">
          {/* Your other content goes here */}
        </section>

        {/* Your Odds of Surviving Cancer Section */}
        <section className="cancer-odds-section">
          <h2 className="section-title">Your odds of surviving cancer shouldn’t depend on where you live or how much money you make.</h2>
          <p className="section-text">
            Let's build a world where equitable cancer care is the norm, not the exception. Sources: * World Health Organization / ** The Lancet Global Health
          </p>

          {/* Flexbox Container for Statistics */}
          <div className="odds-container">
            <div className="odds-item">
              <img src={icon1} alt="Icon1" className="odds-icon" />
              <p className="odds-text">
                <span className="odds-number">1 in 5</span> people will develop cancer in their lifetime.
              </p>
            </div>
            <div className="odds-item">
              <img src={icon2} alt="Icon2" className="odds-icon" />
              <p className="odds-text">
                <span className="odds-number">1/3</span> of premature cancer deaths were treatable.
              </p>
            </div>
            <div className="odds-item">
              <img src={icon3} alt="Icon3" className="odds-icon" />
              <p className="odds-text">
                <span className="odds-number">70%</span> of cancer-related deaths are in low-and-middle-income countries.
              </p>
            </div>
          </div>
        </section>

        {/* Cancer facts Section */}
        <section className="cancer-care-guidelines">
          <h2 className="section-title">Fact sheets</h2>
          <p className="section-text">
            These fact sheets, sourced from <a href="https://www.nccp.health.gov.lk/en" target="_blank" rel="noopener noreferrer">The National Cancer Control Programme by Ministry of Health, Sri Lanka</a>, provide crucial statistical overviews of different cancer types within the country. They are important for understanding the prevalence and trends of cancer, which aids in public health planning and resource allocation.
          </p>
          <button className="project-button" onClick={handleFactSheet}>Fact Sheets</button>
        </section>

        {/* Cancer Care Guideline Section */}
        <section className="cancer-care-guidelines">
          <h2 className="section-title">General Guideline for Cancer Care</h2>
          <p className="section-text">
            Cancer care is a multi-step process involving diagnosis, treatment, rehabilitation, and follow-up. It's essential to have a holistic approach to address each aspect of a patient’s journey, including emotional, physical, and mental health.
          </p>
          <button className="project-button" onClick={handleLearnMore}>Learn More</button>

        </section>

        {/* Our Projects Section */}
        <section className="our-projects">
          <h2 className="section-title">Our Projects</h2>
          <p className="section-text">
            We aim to help minimize cancer disparities through cancer care centers, advocacy, research, and education. At the center of our work are cancer patients. We exist to minimize disparities in their cancer care.
          </p>
          
          <div className="projects-container">
            <div className="project-card">
              <h3 className="project-title">Visualization App</h3>
              <p className="project-description">
                Our Visualization App is designed to help in cancer care education by visualizing essential data and trends for healthcare professionals and researchers.
              </p>
              <Link to="/file-upload">
                <button className="project-button">Explore App</button>
              </Link>
            </div>
          </div>
        </section>
      </div>

    </div>
  );
}

export default HomeScreen;
