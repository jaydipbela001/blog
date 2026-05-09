import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { useEffect } from 'react';
import emailjs from '@emailjs/browser';
import './StaticPages.css';

function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
      const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
      const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;
      const toEmail = import.meta.env.VITE_EMAILJS_TO_EMAIL;

      if (!serviceId || !templateId || !publicKey || !toEmail) {
        alert('EmailJS credentials not configured. Please check your .env file.');
        return;
      }

      await emailjs.send(
        serviceId,
        templateId,
        {
          from_name: formData.name,
          from_email: formData.email,
          subject: formData.subject,
          message: formData.message,
          to_email: toEmail
        },
        publicKey
      );

      setSubmitted(true);
    } catch (error) {
      console.error('Failed to send email:', error);
      alert('Failed to send message. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="static-page">
      <Helmet>
        <title>Contact Us | SmartReads</title>
        <meta name="description" content="Get in touch with the SmartReads team. Send us your feedback, story tips, or partnership inquiries." />
        <link rel="canonical" href="https://smartreadsblog.vercel.app/contact" />
      </Helmet>

      <header className="static-page__header">
        <span className="static-page__badge">Contact</span>
        <h1 className="static-page__title">Get in Touch</h1>
        <p className="static-page__subtitle">
          Have a question, feedback, or a story tip? Fill out the form below and we'll get back to you as soon as possible.
        </p>
      </header>

      <div className="static-page__body">
        {submitted ? (
          <div className="contact-success">
            <div className="contact-success__icon">✓</div>
            <h3 className="contact-success__title">Message Sent!</h3>
            <p className="contact-success__text">Thank you for reaching out. We'll get back to you within 1–2 business days.</p>
          </div>
        ) : (
          <form className="contact-form" onSubmit={handleSubmit} noValidate>
            <div className="form-group">
              <label className="form-label" htmlFor="name">Full Name *</label>
              <input 
                className="form-input" 
                id="name" 
                type="text" 
                required 
                placeholder="Your full name"
                value={formData.name}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label className="form-label" htmlFor="email">Email Address *</label>
              <input 
                className="form-input" 
                id="email" 
                type="email" 
                required 
                placeholder="your@email.com"
                value={formData.email}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label className="form-label" htmlFor="subject">Subject *</label>
              <input 
                className="form-input" 
                id="subject" 
                type="text" 
                required 
                placeholder="What is this about?"
                value={formData.subject}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label className="form-label" htmlFor="message">Message *</label>
              <textarea 
                className="form-textarea" 
                id="message" 
                required 
                placeholder="Write your message here..."
                value={formData.message}
                onChange={handleChange}
              />
            </div>
            <button 
              className="form-submit" 
              type="submit" 
              disabled={loading}
            >
              {loading ? 'Sending...' : 'Send Message'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

export default Contact;
