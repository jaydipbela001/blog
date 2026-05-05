import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

// Helper to create category navigation state
const getCategoryLinkState = (category) => ({ from: 'category', category });
import './CategoryPage.css';
import { allPosts, getPostsByCategory } from '../data/posts.js';

const allCategories = [
  { name: 'Esports', slug: 'esports', color: '#ff6b6b' },
  { name: 'Food', slug: 'food', color: '#feca57' },
  { name: 'History', slug: 'history', color: '#8b5cf6' },
  { name: 'Entertainment', slug: 'entertainment', color: '#ff9ff3' },
  { name: 'Health', slug: 'health', color: '#54a0ff' },
  { name: 'Money', slug: 'money', color: '#5f27cd' },
  { name: 'Travel', slug: 'travel', color: '#00d2d3' },
  { name: 'Tech', slug: 'tech', color: '#1dd1a1' }
];

const categoryTitles = {
  esports: 'Esports',
  food: 'Food',
  history: 'History',
  entertainment: 'Entertainment',
  health: 'Health',
  money: 'Money',
  travel: 'Travel',
  tech: 'Tech'
};

function CategoryPage({ category }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [activeFilter, setActiveFilter] = useState('All');
  const postsPerPage = 5;

  // Get posts for this category using imported helper
  const posts = getPostsByCategory(category);
  const totalPages = Math.ceil((posts?.length || 0) / postsPerPage);
  
  const currentPosts = posts.slice(
    (currentPage - 1) * postsPerPage,
    currentPage * postsPerPage
  );

  const featuredPost = posts[0] || null;
  const listPosts = currentPosts || [];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentPage, category]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    setTimeout(() => {
      const latestArticlesSection = document.getElementById('latest-articles');
      if (latestArticlesSection) {
        latestArticlesSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 100);
  };

  // Category icons mapping
  const categoryIcons = {
    esports: '🎮',
    food: '🍽️',
    recipes: '👨‍🍳',
    entertainment: '🎬',
    health: '❤️',
    money: '💰',
    travel: '✈️',
    tech: '💻',
    lifestyle: '☕',
    history: '📜'
  };

  const getRankStyle = (index) => {
    if (index === 0) return { background: '#dc2626', color: '#fff' };
    if (index === 1) return { background: '#ea580c', color: '#fff' };
    if (index === 2) return { background: '#eab308', color: '#fff' };
    return { background: '#f3f4f6', color: '#6b7280' };
  };

  return (
    <div className="category-page">
      {/* Featured Hero Section - Content Left, Image Right */}
      <section className="cat-hero-section">
        <div className="cat-hero-container">
          {featuredPost && (
            <>
              <div className="cat-hero-content">
                <span className="cat-hero-label">FEATURED STORY</span>
                <h1 className="cat-hero-title">{featuredPost.title}</h1>
                <p className="cat-hero-excerpt">{featuredPost.excerpt}</p>
                <div className="cat-hero-actions">
                  <Link to={`/blog/${featuredPost.slug}`} state={getCategoryLinkState(category)} className="cat-hero-btn">
                    Read Full Story
                  </Link>
                  <span className="cat-hero-readtime">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <circle cx="12" cy="12" r="10"/>
                      <polyline points="12 6 12 12 16 14"/>
                    </svg>
                    {featuredPost.readTime}
                  </span>
                </div>
              </div>
              <div className="cat-hero-image-wrap">
                <img src={featuredPost.image} alt={featuredPost.title} />
              </div>
            </>
          )}
        </div>
      </section>

      {/* Main Content Area - Articles Grid + Sidebar */}
      <section id="latest-articles" className="cat-main-section">
        <div className="cat-main-container">
          {/* Articles Column */}
          <div className="cat-articles-column">
            {/* Section Header with Filter Tabs */}
            <div className="cat-section-header">
              <h2 className="cat-section-title">Latest Articles</h2>
              <div className="cat-filter-tabs">
                {['All', 'Popular', 'Recent'].map((filter) => (
                  <button
                    key={filter}
                    className={`cat-filter-tab ${activeFilter === filter ? 'active' : ''}`}
                    onClick={() => setActiveFilter(filter)}
                  >
                    {filter}
                  </button>
                ))}
              </div>
            </div>

            {/* Articles Grid - First article is featured large */}
            <div className="cat-articles-grid">
              {listPosts.map((post, index) => (
                <article 
                  key={post.id} 
                  className={`cat-article-card ${index === 0 ? 'cat-article-featured' : ''}`}
                >
                  <Link to={`/blog/${post.slug}`} state={getCategoryLinkState(category)} className="cat-article-img-wrap">
                    <img src={post.image} alt={post.title} />
                    <span className="cat-article-badge">{post.category}</span>
                  </Link>
                  <div className="cat-article-content">
                    <h3 className="cat-article-headline">
                      <Link to={`/blog/${post.slug}`} state={getCategoryLinkState(category)}>{post.title}</Link>
                    </h3>
                    <p className="cat-article-excerpt">{post.excerpt}</p>
                    <div className="cat-article-meta">
                      <div className="cat-article-author">
                        <span className="cat-author-avatar">{post.author.charAt(0)}</span>
                        <span className="cat-author-name">{post.author}</span>
                      </div>
                      <span className="cat-meta-separator">•</span>
                      <span className="cat-article-date">{post.date}</span>
                      <span className="cat-meta-separator">•</span>
                      <span className="cat-article-readtime">{post.readTime}</span>
                    </div>
                  </div>
                </article>
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="cat-pagination">
                <button
                  className="cat-pagination-prev"
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                >
                  ← Previous
                </button>
                <div className="cat-pagination-pages">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <button
                      key={page}
                      className={`cat-pagination-page ${currentPage === page ? 'active' : ''}`}
                      onClick={() => handlePageChange(page)}
                    >
                      {page}
                    </button>
                  ))}
                </div>
                <button
                  className="cat-pagination-next"
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                >
                  Next →
                </button>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <aside className="cat-sidebar">
            {/* Trending */}
            <div className="cat-sidebar-box">
              <h4 className="cat-sidebar-title">Trending Now</h4>
              <div className="cat-trending-list">
                {posts.slice(0, 5).map((post, index) => (
                  <Link key={post.id} to={`/blog/${post.slug}`} state={getCategoryLinkState(category)} className="cat-trending-item">
                    <span className="cat-trending-number" style={getRankStyle(index)}>
                      {index + 1}
                    </span>
                    <div className="cat-trending-content">
                      <h5 className="cat-trending-title">{post.title}</h5>
                      <span className="cat-trending-date">{post.date}</span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* Browse Categories */}
            <div className="cat-sidebar-box">
              <h4 className="cat-sidebar-title">Browse Categories</h4>
              <div className="cat-categories-grid">
                {allCategories.map((cat) => (
                  <Link
                    key={cat.slug}
                    to={`/${cat.slug}`}
                    className={`cat-category-item ${cat.slug === category ? 'active' : ''}`}
                  >
                    <span className="cat-category-icon">{categoryIcons[cat.slug] || '📁'}</span>
                    <span className="cat-category-name">{cat.name}</span>
                  </Link>
                ))}
              </div>
            </div>

            {/* Newsletter */}
            <div className="cat-sidebar-box cat-newsletter-box">
              <h4 className="cat-sidebar-title">Stay Updated</h4>
              <p className="cat-newsletter-text">Get the latest {categoryTitles[category]} news delivered to your inbox.</p>
              <input 
                type="email" 
                placeholder="Enter your email" 
                className="cat-newsletter-input" 
              />
              <button className="cat-newsletter-btn">Subscribe</button>
              <p className="cat-newsletter-note">No spam, unsubscribe anytime.</p>
            </div>
          </aside>
        </div>
      </section>
    </div>
  );
}

export default CategoryPage;
