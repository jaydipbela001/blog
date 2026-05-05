import { Link, useLocation } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

// Navigation state helper
const homeLinkState = { from: 'home' };
import './Home.css';
import { allPosts } from '../data/posts.js';


const getPostsByCategory = (category, count = 4) => 
  allPosts.filter(post => post.category === category).slice(0, count);

const trendingPosts = allPosts.slice(0, 6);

const topStories = allPosts.slice(0, 5);

const featuredBannerPost = allPosts[60];


function Home() {
  const location = useLocation();
  const hasRestoredScroll = useRef(false);
  const [isLoading, setIsLoading] = useState(true);

  // Simulate loading for skeleton demonstration
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  // Disable browser's default scroll restoration
  useEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
    return () => {
      if ('scrollRestoration' in window.history) {
        window.history.scrollRestoration = 'auto';
      }
    };
  }, []);

  // Restore scroll position when returning to Home from a blog post
  useEffect(() => {
    if (location.state?.from === 'home' && !hasRestoredScroll.current) {
      const savedScroll = sessionStorage.getItem('homeScrollPosition');
      if (savedScroll) {
        // Small delay to ensure DOM is ready
        setTimeout(() => {
          window.scrollTo(0, parseInt(savedScroll, 10));
          hasRestoredScroll.current = true;
          // Clear after restoring to avoid affecting future navigation
          sessionStorage.removeItem('homeScrollPosition');
        }, 0);
      }
    }
  }, [location]);

  // Save scroll position before navigating to a blog post
  const handleBlogClick = () => {
    sessionStorage.setItem('homeScrollPosition', window.scrollY.toString());
  };

  return (
    <div className="home">
      {/* Main Layout with Sidebar */}
      <div className="news-layout">
        {/* Main Content Area */}
        <div className="news-main">
          <div className="hero-section-wrapper">
          {/* Hero Section - Large Featured */}
          <div className="hero-section-left"> 
          <section className="hero-section">
            <article className="hero-article">
              {isLoading ? (
                <>
                  <Skeleton height={300} style={{ marginBottom: '1rem' }} />
                  <div className="hero-text">
                    <Skeleton width={100} height={20} style={{ marginBottom: '0.5rem' }} />
                    <Skeleton height={40} style={{ marginBottom: '0.5rem' }} />
                    <Skeleton count={2} style={{ marginBottom: '0.5rem' }} />
                    <Skeleton width={150} />
                  </div>
                </>
              ) : (
                <>
                  <Link to={`/blog/${allPosts[0].slug}`}
                  state={homeLinkState} className="hero-image-wrap"
                  onClick={handleBlogClick}>
                    <img src={allPosts[0].image} alt={allPosts[0].title} onLoad={e => e.target.classList.add('loaded')} />
                    <span className="hero-cat">{allPosts[0].category}</span>
                  </Link>
                  <div className="hero-text">
                    <h1 className="hero-headline">
                      <Link to={`/blog/${allPosts[0].slug}`}
                  state={homeLinkState} onClick={handleBlogClick}>{allPosts[0].title}</Link>
                    </h1>
                    <p className="hero-desc">{allPosts[0].excerpt}</p>
                    <div className="hero-info">
                      <span className="hero-author">{allPosts[0].author}</span>
                      <span className="hero-date">{allPosts[0].date}</span>
                    </div>
                  </div>
                </>
              )}
            </article>
          </section>

          {/* Trending Grid - 2x2 */}
          <section className="trending-section">
            <div className="section-header">
              <h2>Trending Stories</h2>
            </div>
            <div className="trending-grid-2x2">
              {isLoading ? (
                Array.from({ length: 4 }).map((_, i) => (
                  <article key={i} className="trend-item">
                    <Skeleton height={150} style={{ marginBottom: '0.75rem' }} />
                    <Skeleton width={80} height={16} style={{ marginBottom: '0.5rem' }} />
                    <Skeleton height={20} style={{ marginBottom: '0.25rem' }} />
                    <Skeleton width={100} />
                  </article>
                ))
              ) : (
                allPosts.slice(1, 5).map((post) => (
                  <article key={post.id} className="trend-item">
                    <Link to={`/blog/${post.slug}`}
                    state={homeLinkState} className="trend-img-link"
                    onClick={handleBlogClick}>
                      <img src={post.image} alt={post.title} onLoad={e => e.target.classList.add('loaded')} />
                    </Link>
                    <div className="trend-text">
                      <span className="trend-cat">{post.category}</span>
                      <h3 className="trend-title">
                        <Link to={`/blog/${post.slug}`}
                    state={homeLinkState} onClick={handleBlogClick}>{post.title}</Link>
                      </h3>
                      <span className="trend-date">{post.date}</span>
                    </div>
                  </article>
                ))
              )}
            </div>
          </section>
          </div>
            <aside className="news-sidebar">
              <div className="sidebar-section">
                <h3 className="sidebar-title">Top Stories</h3>
                <div className="top-list">
                  {isLoading ? (
                    Array.from({ length: 6 }).map((_, i) => (
                      <article key={i} className="top-item">
                        <Skeleton circle width={24} height={24} style={{ marginRight: '0.75rem', flexShrink: 0 }} />
                        <div className="top-text" style={{ flex: 1 }}>
                          <Skeleton height={18} style={{ marginBottom: '0.5rem' }} />
                          <Skeleton width={100} height={14} />
                        </div>
                      </article>
                    ))
                  ) : (
                    allPosts.slice(0, 6).map((post, index) => (
                      <article key={post.id} className="top-item">
                        <span className="top-num">{index + 1}</span>
                        <div className="top-text">
                          <h4 className="top-headline">
                            <Link to={`/blog/${post.slug}`}
                    state={homeLinkState} onClick={handleBlogClick}>{post.title}</Link>
                          </h4>
                          <div className="top-meta">
                            <span className="top-cat">{post.category}</span>
                            <span className="top-date">{post.date}</span>
                          </div>
                        </div>
                      </article>
                    ))
                  )}
                </div>
              </div>

              <div className="sidebar-widget">
                <h4 className="widget-title">Newsletter</h4>
                <p className="widget-text">Get the latest stories in your inbox</p>
                <input type="email" placeholder="Your email" className="widget-input" />
                <button className="widget-submit">Subscribe</button>
              </div>

              <div className="sidebar-widget social-widget">
                <h4 className="widget-title">Follow Us</h4>
                <div className="social-grid">
                  <a href="#" className="social-btn">Twitter</a>
                  <a href="#" className="social-btn">Facebook</a>
                  <a href="#" className="social-btn">LinkedIn</a>
                </div>
              </div>
            </aside>  
          </div>
          {/* Featured Video Banner - Full Width */}
          <div className="full-width-wrapper">
            <section className="video-banner">
              {isLoading ? (
                <>
                  <div className="video-content" style={{ flex: 1 }}>
                    <Skeleton width={100} height={20} style={{ marginBottom: '1rem' }} />
                    <Skeleton height={40} style={{ marginBottom: '1rem' }} />
                    <Skeleton count={3} style={{ marginBottom: '1rem' }} />
                    <Skeleton width={120} height={40} />
                  </div>
                  <div className="video-thumb" style={{ flex: 1 }}>
                    <Skeleton height={250} />
                  </div>
                </>
              ) : (
                <>
                  <div className="video-content">
                    <span className="video-label">Featured {featuredBannerPost.category}</span>
                    <h2 className="video-title">{featuredBannerPost.title}</h2>
                    <p className="video-desc">{featuredBannerPost.excerpt}</p>
                    <Link
                      to={`/blog/${featuredBannerPost.slug}`}
                      className="video-btn"
                      state={homeLinkState}
                      onClick={handleBlogClick}
                    >
                      Read Full Story
                    </Link>
                  </div>
                  <div className="video-thumb">
                    <img src={featuredBannerPost.image} alt={featuredBannerPost.title} onLoad={e => e.target.classList.add('loaded')} />
                  </div>
                </>
              )}
            </section>
          </div>

          {/* World News Section */}
          <section className="news-category">
            <div className="cat-header">
              <h2>World News</h2>
            </div>
            {isLoading ? (
              <div className="cat-grid">
                <article className="cat-featured">
                  <Skeleton height={200} style={{ marginBottom: '1rem' }} />
                  <Skeleton width={80} height={18} style={{ marginBottom: '0.5rem' }} />
                  <Skeleton height={28} style={{ marginBottom: '0.5rem' }} />
                  <Skeleton count={2} style={{ marginBottom: '0.5rem' }} />
                  <Skeleton width={100} />
                </article>
                <div className="cat-list">
                  {Array.from({ length: 3 }).map((_, i) => (
                    <article key={i} className="cat-list-item">
                      <Skeleton height={80} width={120} style={{ marginRight: '1rem' }} />
                      <div className="cat-list-text" style={{ flex: 1 }}>
                        <Skeleton width={60} height={14} style={{ marginBottom: '0.5rem' }} />
                        <Skeleton height={18} style={{ marginBottom: '0.25rem' }} />
                        <Skeleton width={80} />
                      </div>
                    </article>
                  ))}
                </div>
              </div>
            ) : (
              <div className="cat-grid">
                <article className="cat-featured">
                  <Link to={`/blog/${allPosts[4].slug}`} className="cat-featured-img"
                  onClick={handleBlogClick}>
                    <img src={allPosts[4].image} alt={allPosts[4].title} onLoad={e => e.target.classList.add('loaded')} />
                    <span className="cat-tag">{allPosts[4].category}</span>
                  </Link>
                  <h3 className="cat-featured-title">
                    <Link to={`/blog/${allPosts[4].slug}`} onClick={handleBlogClick}>{allPosts[4].title}</Link>
                  </h3>
                  <p className="cat-featured-desc">{allPosts[4].excerpt}</p>
                  <span className="cat-date">{allPosts[4].date}</span>
                </article>
                <div className="cat-list">
                  {allPosts.slice(5, 8).map((post) => (
                    <article key={post.id} className="cat-list-item">
                      <Link to={`/blog/${post.slug}`}
                    state={homeLinkState} className="cat-list-img"
                    onClick={handleBlogClick}>
                        <img src={post.image} alt={post.title} onLoad={e => e.target.classList.add('loaded')} />
                      </Link>
                      <div className="cat-list-text">
                        <span className="cat-list-tag">{post.category}</span>
                        <h4 className="cat-list-title">
                          <Link to={`/blog/${post.slug}`}
                    state={homeLinkState} onClick={handleBlogClick}>{post.title}</Link>
                        </h4>
                        <span className="cat-list-date">{post.date}</span>
                      </div>
                    </article>
                  ))}
                </div>
              </div>
            )}
          </section>

          {/* History Section */}
          <section className="news-category">
            <div className="cat-header">
              <h2>History & Culture</h2>
            </div>
            {isLoading ? (
              <div className="history-grid">
                {Array.from({ length: 3 }).map((_, i) => (
                  <article key={i} className="history-item">
                    <Skeleton height={150} style={{ marginBottom: '0.75rem' }} />
                    <Skeleton width={80} height={14} style={{ marginBottom: '0.5rem' }} />
                    <Skeleton height={18} style={{ marginBottom: '0.25rem' }} />
                    <Skeleton width={100} />
                  </article>
                ))}
              </div>
            ) : (
              <div className="history-grid">
                {allPosts.slice(8, 11).map((post) => (
                  <article key={post.id} className="history-item">
                    <Link to={`/blog/${post.slug}`}
                    state={homeLinkState} className="history-img"
                    onClick={handleBlogClick}>
                      <img src={post.image} alt={post.title} onLoad={e => e.target.classList.add('loaded')} />
                    </Link>
                    <div className="history-text">
                      <span className="history-cat">{post.category}</span>
                      <h4 className="history-title">
                        <Link to={`/blog/${post.slug}`}
                    state={homeLinkState} onClick={handleBlogClick}>{post.title}</Link>
                      </h4>
                      <span className="history-date">{post.date}</span>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </section>

          {/* Latest Stories */}
          <section className="news-category">
            <div className="cat-header">
              <h2>Latest Stories</h2>
            </div>
            {isLoading ? (
              <div className="latest-grid">
                {Array.from({ length: 4 }).map((_, i) => (
                  <article key={i} className="latest-item">
                    <Skeleton height={180} style={{ marginBottom: '0.75rem' }} />
                    <Skeleton width={80} height={14} style={{ marginBottom: '0.5rem' }} />
                    <Skeleton height={18} style={{ marginBottom: '0.25rem' }} />
                    <Skeleton width={100} />
                  </article>
                ))}
              </div>
            ) : (
              <div className="latest-grid">
                {allPosts.slice(11, 15).map((post) => (
                  <article key={post.id} className="latest-item">
                    <Link to={`/blog/${post.slug}`}
                    state={homeLinkState} className="latest-img"
                    onClick={handleBlogClick}>
                      <img src={post.image} alt={post.title} onLoad={e => e.target.classList.add('loaded')} />
                    </Link>
                    <div className="latest-text">
                      <span className="latest-cat">{post.category}</span>
                      <h4 className="latest-title">
                        <Link to={`/blog/${post.slug}`}
                    state={homeLinkState} onClick={handleBlogClick}>{post.title}</Link>
                      </h4>
                      <span className="latest-date">{post.date}</span>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </section>

          {/* History Section */}
          <section className="news-category">
            <div className="cat-header">
              <h2>History</h2>
              {isLoading ? (
                <Skeleton width={80} height={20} />
              ) : (
                <Link to="/history" className="view-all-link">View All →</Link>
              )}
            </div>
            {isLoading ? (
              <div className="history-grid">
                {Array.from({ length: 3 }).map((_, i) => (
                  <article key={i} className="history-item">
                    <Skeleton height={150} style={{ marginBottom: '0.75rem' }} />
                    <Skeleton width={80} height={14} style={{ marginBottom: '0.5rem' }} />
                    <Skeleton height={18} style={{ marginBottom: '0.25rem' }} />
                    <Skeleton width={100} />
                  </article>
                ))}
              </div>
            ) : (
              <div className="history-grid">
                {allPosts.filter(post => post.category === 'History').slice(0, 3).map((post) => (
                  <article key={post.id} className="history-item">
                    <Link to={`/blog/${post.slug}`}
                    state={homeLinkState} className="history-img"
                    onClick={handleBlogClick}>
                      <img src={post.image} alt={post.title} onLoad={e => e.target.classList.add('loaded')} />
                    </Link>
                    <div className="history-text">
                      <span className="history-cat">{post.category}</span>
                      <h4 className="history-title">
                        <Link to={`/blog/${post.slug}`}
                    state={homeLinkState} onClick={handleBlogClick}>{post.title}</Link>
                      </h4>
                      <span className="history-date">{post.date}</span>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </section>
        </div>

      </div>
    </div>
  );
}

export default Home;
