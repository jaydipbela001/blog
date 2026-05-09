import { useParams, Link, useNavigate, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import './BlogPost.css';
import { allPosts } from '../data/posts.js';
import { slugRedirects } from '../config/slugRedirects.js';

// Helper function to get posts by category
export const getPostsByCategory = (category) => {
  return allPosts.filter(post => post.category.toLowerCase() === category.toLowerCase());
};

// WhatsApp share function
const shareOnWhatsApp = (title, url) => {
  const text = encodeURIComponent(`${title}\n${url}`);
  window.open(`https://wa.me/?text=${text}`, '_blank');
};

// Dynamic related posts function - gets posts from same category
const getRelatedPosts = (currentPost, allBlogPosts, limit = 4) => {
  if (!currentPost) return [];
  
  // Filter posts by same category, exclude current post
  const sameCategory = allBlogPosts.filter(
    p => p.category === currentPost.category && p.slug !== currentPost.slug
  );
  
  // If not enough same category, add some random posts
  if (sameCategory.length < limit) {
    const otherPosts = allBlogPosts.filter(
      p => p.category !== currentPost.category && p.slug !== currentPost.slug
    );
    return [...sameCategory, ...otherPosts].slice(0, limit);
  }
  
  return sameCategory.slice(0, limit);
};

function BlogPost() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const redirectSlug = slugRedirects[slug];
  const actualSlug = redirectSlug || slug;
  const post = allPosts.find(p => p.slug === actualSlug);

  useEffect(() => {
    if (redirectSlug) {
      navigate(`/blog/${redirectSlug}`, { replace: true });
    }
  }, [redirectSlug, navigate]);

  if (redirectSlug) {
    return null;
  }

  // Handle back navigation based on where user came from
  const handleBack = () => {
    const state = location.state;
    
    if (state?.from === 'category' && state?.category) {
      // Came from category page - go back to that category
      navigate(`/${state.category.toLowerCase()}`);
    } else if (state?.from === 'home') {
      // Came from home page
      navigate('/');
    } else {
      // No state (direct URL) - default to home
      navigate('/');
    }
  };

  // Handle WhatsApp share
  const handleShare = () => {
    const url = window.location.href;
    shareOnWhatsApp(post.title, url);
  };

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [slug]);

  // Show not found message if post doesn't exist
  if (!post) {
    return (
      <article className="blog-post">
        <div className="article-layout" style={{ padding: '100px 20px', textAlign: 'center' }}>
          <h1>Post Not Found</h1>
          <p>The blog post "{slug}" could not be found.</p>
          <button onClick={handleBack} className="btn-primary" style={{ marginTop: '20px', display: 'inline-block', cursor: 'pointer' }}>
            Return Home
          </button>
        </div>
      </article>
    );
  }

  return (
    <article className="blog-post">
      {/* Article Header - Full Width */}
      <header className="article-header-full">
        <div className="article-header-shell">
          <button
            onClick={handleBack}
            className="back-link-top"
            aria-label="Go back"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
            <span>Back</span>
          </button>

          <div className="article-header-container">
            <div className="header-top-row">
              <span className="article-category-badge">{post.category}</span>
            </div>
            <h1 className="article-title-main">{post.title}</h1>
            <div className="article-meta-bar">
              <div className="meta-left">
                <span className="article-author">By <strong>{post.author}</strong></span>
                <span className="article-date">{post.date}</span>
                <span className="article-readtime">{post.readTime}</span>
              </div>
              <div className="meta-right">
                <button
                  className="share-icon-btn whatsapp-share-btn"
                  aria-label="Share on WhatsApp"
                  onClick={handleShare}
                  title="Share on WhatsApp"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Featured Image - Full Width */}
      <figure className="article-hero-full">
        <img src={post.image} alt={post.title} />
      </figure>

      {/* Main Article Layout */}
      <div className="article-layout">
        <div className="article-main">
          {/* Article Content */}
          <div
            className="article-body"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          {/* Tags */}
          <div className="article-tags">
            <span className="tag">{post.category}</span>
            <span className="tag">Investigation</span>
            <span className="tag">World News</span>
            <span className="tag">Long Read</span>
          </div>

          {/* Share Section */}
          <div className="article-share">
            <span className="share-label">Share this story</span>
            <div className="share-buttons">
              <button className="share-btn share-twitter" aria-label="Share on Twitter">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
                <span>Twitter</span>
              </button>
              <button className="share-btn share-facebook" aria-label="Share on Facebook">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
                <span>Facebook</span>
              </button>
              <button className="share-btn share-linkedin" aria-label="Share on LinkedIn">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
                <span>LinkedIn</span>
              </button>
              <button className="share-btn share-copy" aria-label="Copy link">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
                  <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
                </svg>
                <span>Copy</span>
              </button>
            </div>
          </div>

          {/* Author Box */}
          <div className="article-author-box">
            <div className="author-portrait">
              <div className="author-initials">{post.author.split(' ').map(n => n[0]).join('')}</div>
            </div>
            <div className="author-info">
              <h4 className="author-name">{post.author}</h4>
              <p className="author-bio">Journalist and historian covering conflict, human rights, and the stories that shape our world. Dedicated to giving voice to those affected by war and historical events.</p>
              <Link to="/" className="author-link">View all articles by {post.author} →</Link>
            </div>
          </div>
        </div>

        {/* Article Sidebar */}
        <aside className="article-sidebar">
          {/* Trending in Category */}
          <div className="sidebar-section">
            <h3 className="sidebar-heading">More in {post.category}</h3>
            <div className="sidebar-articles">
              {getRelatedPosts(post, allPosts, 4).map((related, index) => (
                <article key={related.id} className="sidebar-article">
                  <span className="sidebar-number">{index + 1}</span>
                  <div className="sidebar-article-content">
                    <h4 className="sidebar-article-title">
                      <Link to={`/blog/${related.slug}`}>{related.title}</Link>
                    </h4>
                    <span className="sidebar-article-date">{related.date}</span>
                  </div>
                </article>
              ))}
            </div>
          </div>

          {/* Newsletter Widget */}
          <div className="sidebar-widget newsletter-widget">
            <h4 className="widget-title">Stay Informed</h4>
            <p className="widget-text">Get the latest stories delivered to your inbox weekly.</p>
            <input type="email" placeholder="Enter your email" className="widget-input" />
            <button className="widget-btn">Subscribe Now</button>
          </div>

          {/* Follow Us Widget */}
          <div className="sidebar-widget follow-widget">
            <h4 className="widget-title">Follow Us</h4>
            <div className="social-links">
              <a href="#" className="social-link-item social-twitter">Twitter</a>
              <a href="#" className="social-link-item social-facebook">Facebook</a>
              <a href="#" className="social-link-item social-linkedin">LinkedIn</a>
            </div>
          </div>
        </aside>
      </div>

      {/* Related Articles Section */}
      <section className="related-section">
        <div className="related-container">
          <div className="section-header-bar">
            <h2 className="section-title">Related Articles</h2>
          </div>
          <div className="related-grid">
            {getRelatedPosts(post, allPosts, 3).map((related) => (
              <article key={related.id} className="related-card">
                <Link to={`/blog/${related.slug}`} className="related-image-link">
                  <img src={related.image} alt={related.title} />
                  <span className="related-category">{related.category}</span>
                </Link>
                <div className="related-content">
                  <h3 className="related-card-title">
                    <Link to={`/blog/${related.slug}`}>{related.title}</Link>
                  </h3>
                  <div className="related-meta">{related.date}</div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </article>
  );
}

export default BlogPost;
