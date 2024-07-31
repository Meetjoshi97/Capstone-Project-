import React from 'react';
import './ContactUs.css';

const ContactUs = () => {
  return (
    <section className="contact-us">
      <div className="contact-info">
        <h2>Get in touch</h2>
        <p>Have a question or want to work together? Fill out the form and we'll get back to you as soon as possible.</p>
        <div className="contact-details">
          <p><i className="fas fa-map-marker-alt"></i> 123 Test st, Canada</p>
          <p><i className="fas fa-phone"></i> (555) 555-5555</p>
          <p><i className="fas fa-envelope"></i> shopverse@gmail.com.com</p>
        </div>
      </div>
      <div className="contact-form">
        <form>
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input type="text" id="name" placeholder="Enter your name" />
            <label htmlFor="email">Email</label>
            <input type="email" id="email" placeholder="Enter your email" />
          </div>
          <div className="form-group">
            <label htmlFor="subject">Subject</label>
            <input type="text" id="subject" placeholder="Enter the subject" />
          </div>
          <div className="form-group">
            <label htmlFor="message">Message</label>
            <textarea id="message" placeholder="Enter your message"></textarea>
          </div>
          <button type="submit">Submit</button>
        </form>
      </div>
    </section>
  );
};

export default ContactUs;
