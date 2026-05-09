import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { useEffect } from 'react';
import './StaticPages.css';

const privacySections = [
  {
    number: '01',
    title: 'Information We Collect',
    icon: '📊',
    content: 'We do not require account creation. We may collect non-personal data automatically through cookies and analytics:',
    list: ['Pages visited and time spent on site', 'Browser type and device information', 'Referring URLs']
  },
  {
    number: '02',
    title: 'Cookies',
    icon: '🍪',
    content: 'We use cookies to improve your experience and to serve relevant advertisements via Google AdSense. Google may use cookies to serve ads based on your prior visits to our site or other sites.',
    link: { text: 'Google Ads Settings', url: 'https://www.google.com/settings/ads' }
  },
  {
    number: '03',
    title: 'Google AdSense',
    icon: '📢',
    content: 'We use Google AdSense to display advertisements. Google, as a third-party vendor, uses cookies to serve ads on our site.',
    link: { text: "Google's Privacy Policy", url: 'https://policies.google.com/privacy' }
  },
  {
    number: '04',
    title: 'Third-Party Links',
    icon: '🔗',
    content: 'Our site may contain links to third-party websites. We are not responsible for their privacy practices and encourage you to review their policies.'
  },
  {
    number: '05',
    title: 'Data Security',
    icon: '🔒',
    content: 'We take reasonable measures to protect any information collected. However, no method of transmission over the Internet is 100% secure.'
  },
  {
    number: '06',
    title: "Children's Privacy",
    icon: '👶',
    content: 'Our site is not directed to children under 13. We do not knowingly collect personal information from children.'
  },
  {
    number: '07',
    title: 'Changes to This Policy',
    icon: '📝',
    content: 'We may update this Privacy Policy from time to time. Changes will be posted on this page with an updated date.'
  },
  {
    number: '08',
    title: 'Contact Us',
    icon: '📧',
    content: 'If you have questions about this Privacy Policy, please reach out via our',
    linkComponent: 'contact'
  }
];

function PrivacyPolicy() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="static-page">
      <Helmet>
        <title>Privacy Policy | SmartReads</title>
        <meta name="description" content="SmartReads Privacy Policy — how we collect, use, and protect your data." />
        <link rel="canonical" href="https://smartreadsblog.vercel.app/privacy-policy" />
      </Helmet>

      <header className="static-page__header">
        <span className="static-page__badge">Legal</span>
        <h1 className="static-page__title">Privacy Policy</h1>
        <p className="static-page__meta">Last updated: May 9, 2026</p>
      </header>

      <div className="static-page__body">
        <p className="privacy-intro">
          Welcome to SmartReads ("we", "us", or "our"). This Privacy Policy explains how we collect, use, and protect information when you visit <strong>smartreadsblog.vercel.app</strong>.
        </p>

        <div className="privacy-sections-grid">
          {privacySections.map((section, index) => (
            <div key={index} className="privacy-section-card">
              <div className="privacy-section-header">
                <span className="privacy-section-number">{section.number}</span>
                <span className="privacy-section-icon">{section.icon}</span>
              </div>
              <h3 className="privacy-section-title">{section.title}</h3>
              <p className="privacy-section-content">{section.content}</p>
              {section.list && (
                <ul className="privacy-section-list">
                  {section.list.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              )}
              {section.link && (
                <a href={section.link.url} target="_blank" rel="noopener noreferrer" className="privacy-section-link">
                  {section.link.text} →
                </a>
              )}
              {section.linkComponent === 'contact' && (
                <Link to="/contact" className="privacy-section-link">
                  Contact page →
                </Link>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default PrivacyPolicy;
