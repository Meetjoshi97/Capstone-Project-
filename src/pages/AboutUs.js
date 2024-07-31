import React from 'react';
import './AboutUs.css';

const AboutUs = () => {
  return (
    <div className="home-container">
      <section className="hero-section">
        <div className="hero-text">
          <h1>About Our E-commerce Platform</h1>
          <p>
          At Shop verse, we are dedicated to providing a seamless and enjoyable shopping experience for our customers. Our platform offers a wide range of products including clothing, electronics, home goods, and more. We strive to bring the latest trends and highest quality products to our customers at competitive prices.          </p>
          <p>
          Our mission is to revolutionize the e-commerce industry by integrating sustainability, ethical practices, and community involvement into everything we do. We believe that shopping online should be easy, efficient, and beneficial for everyone involved.
            
            </p>
        </div>
        <div className="hero-image">
          <img src="./aboutus.png" alt="shop verse" />
        </div>
      </section>

     

      <section className="team-section">
        <h2>Meet the Team</h2>
        <div className="team-members">
          <div className="team-member">
            <img src="./meet.png" alt="meet " />
            <h3>Meet Joshi</h3>
          </div>
          <div className="team-member">
            <img src="./pratik.png" alt="" />
            <h3>Pratik Patel</h3>
          </div>
          <div className="team-member">
            <img src="./Harshil.png" alt="" />
            <h3>Harshil Patel</h3>
          </div>
        </div>
      </section>

      <section className="commitment-section">
      <h2>Our Commitment</h2>
      <div className="commitment-points">
        <div className="commitment-point">
          <img src="./Sustainability.svg" alt="Sustainability Icon" />
          <h3>Sustainability</h3>
          <p>We source our products from ethical and environmentally conscious suppliers, and we continuously work to reduce our carbon footprint and waste.</p>
        </div>
        <div className="commitment-point">
          <img src="./Ethical.svg" alt="Ethical Practices Icon" />
          <h3>Ethical Practices</h3>
          <p>We are committed to fair labor practices, ensuring that all our employees and suppliers are treated with dignity and respect.</p>
        </div>
        <div className="commitment-point">
          <img src="./community.svg" alt="Community Involvement Icon" />
          <h3>Community Involvement</h3>
          <p>We actively support local and global communities through charitable donations, volunteer work, and partnerships with non-profit organizations.</p>
        </div>
      </div>
    </section>
    </div>
  );
};

export default AboutUs;
