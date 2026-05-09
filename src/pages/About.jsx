import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { useEffect } from 'react';
import './StaticPages.css';

const categories = [
  { name: 'Technology', slug: 'tech', color: '#1dd1a1', icon: '💻', count: '12' },
  { name: 'Health', slug: 'health', color: '#54a0ff', icon: '❤️', count: '12' },
  { name: 'Money', slug: 'money', color: '#5f27cd', icon: '💰', count: '12' },
  { name: 'Travel', slug: 'travel', color: '#00d2d3', icon: '✈️', count: '12' },
  { name: 'Esports', slug: 'esports', color: '#ff6b6b', icon: '🎮', count: '7' },
  { name: 'Food', slug: 'food', color: '#feca57', icon: '🍽️', count: '12' },
  { name: 'Entertainment', slug: 'entertainment', color: '#ff9ff3', icon: '🎬', count: '12' },
  { name: 'History', slug: 'history', color: '#8b5cf6', icon: '📜', count: '5' },
  { name: 'Culture', slug: 'culture', color: '#fd9644', icon: '🎨', count: '3' },
  { name: 'War & Conflict', slug: 'war', color: '#ee5a24', icon: '⚔️', count: '3' },
];

const values = [
  { 
    title: 'Accuracy', 
    description: 'Every article undergoes rigorous fact-checking with multiple source verification before publication.',
    icon: '✓'
  },
  { 
    title: 'Transparency', 
    description: 'We clearly label sponsored content and maintain complete separation between editorial and commercial content.',
    icon: '🔍'
  },
  { 
    title: 'Accessibility', 
    description: 'We break down complex topics into clear, understandable language without sacrificing depth or nuance.',
    icon: '🌐'
  },
  { 
    title: 'Diversity', 
    description: 'Our writers represent diverse backgrounds from over 25 countries, bringing global perspectives to every topic.',
    icon: '�'
  },
  { 
    title: 'Integrity', 
    description: 'We never publish clickbait, sensationalism, or misinformation. Quality over quantity always.',
    icon: '⚖️'
  },
  { 
    title: 'Community', 
    description: 'We value reader feedback and continuously improve based on what our community wants to read.',
    icon: '🤝'
  },
];

const stats = [
  { number: '50K+', label: 'Monthly Readers' },
  { number: '90', label: 'Published Articles' },
  { number: '10', label: 'Content Categories' },
  { number: '25+', label: 'Global Writers' },
];

const achievements = [
  { icon: '🏆', title: 'Featured on', description: 'Top tech blogs and news aggregators' },
  { icon: '📈', title: 'Growing Fast', description: '300% growth in readership over the past year' },
  { icon: '⭐', title: 'Reader Trust', description: '98% positive feedback from our community' },
];

function About() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="static-page">
      <Helmet>
        <title>About Us | SmartReads</title>
        <meta name="description" content="Learn about SmartReads — a modern blog covering tech, health, travel, money, esports, food, entertainment, history, culture, and more." />
        <link rel="canonical" href="https://smartreadsblog.vercel.app/about" />
      </Helmet>

      <header className="static-page__header">
        <span className="static-page__badge">About Us</span>
        <h1 className="static-page__title">We Write Stories That Matter</h1>
        <p className="static-page__subtitle">
          Founded in 2023, SmartReads has grown from a small passion project into a trusted source of information for over 50,000 monthly readers worldwide.
        </p>
      </header>

      <div className="static-page__body">
        {/* Stats Section */}
        <div className="about-stats-grid">
          {stats.map((stat, index) => (
            <div key={index} className="about-stat-card">
              <div className="about-stat-number">{stat.number}</div>
              <div className="about-stat-label">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Mission Section */}
        <div className="about-mission-section">
          <h2>Our Mission</h2>
          <p className="about-mission-text">
            At SmartReads, our mission is to democratize access to high-quality, well-researched information. In an era of misinformation and clickbait, we're committed to delivering content that informs, inspires, and empowers our readers. We believe everyone deserves access to accurate, nuanced reporting on the topics that affect their lives — from technology trends that shape our future to health advice that impacts our wellbeing.
          </p>
        </div>

        {/* Achievements Section */}
        <div className="about-achievements-section">
          <h2>Our Achievements</h2>
          <div className="about-achievements-grid">
            {achievements.map((achievement, index) => (
              <div key={index} className="about-achievement-card">
                <div className="about-achievement-icon">{achievement.icon}</div>
                <h3 className="about-achievement-title">{achievement.title}</h3>
                <p className="about-achievement-description">{achievement.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Values Section */}
        <h2>Our Core Values</h2>
        <div className="about-values-grid">
          {values.map((value, index) => (
            <div key={index} className="about-value-card">
              <div className="about-value-icon">{value.icon}</div>
              <h3 className="about-value-title">{value.title}</h3>
              <p className="about-value-description">{value.description}</p>
            </div>
          ))}
        </div>

        {/* Categories Section */}
        <h2>What We Cover</h2>
        <p className="about-section-intro">We publish original articles across 10 categories:</p>

        <div className="about-categories">
          {categories.map(cat => (
            <Link key={cat.slug} to={`/${cat.slug}`} className="about-category-card">
              <div className="about-category-icon-wrapper">
                <span className="about-category-icon">{cat.icon}</span>
                <span className="about-category-count">{cat.count}</span>
              </div>
              <span className="about-category-dot" style={{ background: cat.color }} />
              <span className="about-category-name">{cat.name}</span>
            </Link>
          ))}
        </div>

        {/* Standards Section */}
        <div className="about-standards-section">
          <h2>Our Editorial Standards</h2>
          <p>
            Every article published on SmartReads undergoes a rigorous editorial process. Our team of editors reviews each piece for accuracy, clarity, and relevance before publication. We maintain strict guidelines to ensure our content meets the highest standards of journalism.
          </p>
          <div className="about-standards-list">
            <div className="about-standard-item">
              <span className="about-standard-icon">✓</span>
              <span>Multi-source fact-checking on all articles</span>
            </div>
            <div className="about-standard-item">
              <span className="about-standard-icon">✓</span>
              <span>No sensationalist or clickbait headlines</span>
            </div>
            <div className="about-standard-item">
              <span className="about-standard-icon">✓</span>
              <span>Full writer attribution and bylines</span>
            </div>
            <div className="about-standard-item">
              <span className="about-standard-icon">✓</span>
              <span>Clear labeling of sponsored content</span>
            </div>
            <div className="about-standard-item">
              <span className="about-standard-icon">✓</span>
              <span>Corrections policy for any errors</span>
            </div>
            <div className="about-standard-item">
              <span className="about-standard-icon">✓</span>
              <span>Regular content audits and updates</span>
            </div>
          </div>
        </div>

        {/* Story Section */}
        <div className="about-story-section">
          <h2>Our Story</h2>
          <p>
            SmartReads was founded in March 2023 by a small group of journalists and content creators who shared a common frustration: the internet was full of clickbait, misinformation, and shallow content. We believed there had to be a better way — a platform that prioritized quality over quantity, accuracy over speed, and reader value over ad revenue.
          </p>
          <p>
            Starting with just three writers and a handful of articles, we focused on building trust through consistently reliable content. Word spread quickly, and our readership grew organically. Today, we're proud to work with over 25 writers from around the world, publishing across 10 diverse categories.
          </p>
          <p>
            Our growth hasn't changed our core principles. We remain independently owned and operated, which means we answer only to our readers — not corporate interests or shareholders. This independence allows us to maintain our commitment to honest, unbiased journalism.
          </p>
        </div>

        {/* CTA Section */}
        <div className="about-cta-section">
          <h2>Get in Touch</h2>
          <p>
            Have a story tip, feedback, or partnership inquiry? Visit our <Link to="/contact" className="about-cta-link">Contact page</Link> — we read every message.
          </p>
        </div>
      </div>
    </div>
  );
}

export default About;
