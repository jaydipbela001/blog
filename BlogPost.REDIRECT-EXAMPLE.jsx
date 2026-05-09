/**
 * ====================================================
 * BlogPost.jsx - With Slug Redirect Support
 * ====================================================
 * 
 * Implementation example showing how to handle slug redirects
 * while maintaining proper 301 redirect behavior for SEO.
 * 
 * Copy and adapt this to your actual BlogPost.jsx component.
 */

import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { allPosts } from '@/data/posts';
import { slugRedirects } from '@/config/slugRedirects';
import BlogPostComponent from '@/components/BlogPostComponent';
import NotFound from '@/pages/NotFound';

export default function BlogPost() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [isRedirecting, setIsRedirecting] = useState(false);

  // Get the actual slug (handles redirects)
  const actualSlug = slugRedirects[slug] || slug;

  // Find the post
  const post = allPosts.find(p => p.slug === actualSlug);

  useEffect(() => {
    // If this is an old slug that needs redirecting
    if (slug !== actualSlug) {
      setIsRedirecting(true);
      
      // Use replace to maintain history properly for 301 semantics
      navigate(`/blog/${actualSlug}`, { replace: true });
      
      // Log redirect for analytics (optional)
      console.log(`[SEO] Redirecting: /blog/${slug} → /blog/${actualSlug}`);
      
      setIsRedirecting(false);
    }
  }, [slug, actualSlug, navigate]);

  // During redirect, show nothing or a loading state
  if (isRedirecting) {
    return <div>Redirecting...</div>;
  }

  // If post not found
  if (!post) {
    return <NotFound />;
  }

  // Render the post
  return (
    <BlogPostComponent
      post={post}
      allPosts={allPosts}
    />
  );
}

/**
 * ====================================================
 * NEXT STEPS - Implementation Checklist
 * ====================================================
 * 
 * 1. Update your BlogPost.jsx with the redirect logic above
 * 
 * 2. Add a catch-all route for redirects in your router:
 *    Example in App.jsx:
 * 
 *    <Route path="/blog/:slug" element={<BlogPost />} />
 * 
 * 3. When changing a slug, add entry to slugRedirects:
 *    
 *    // src/config/slugRedirects.js
 *    export const slugRedirects = {
 *      "old-slug": "new-slug",
 *    };
 * 
 * 4. Test the redirect:
 *    - Visit http://localhost:5173/blog/old-slug
 *    - Should redirect to http://localhost:5173/blog/new-slug
 * 
 * 5. Deploy and Verify:
 *    - After deployment, verify redirects work
 *    - Check Google Search Console for redirect errors
 *    - Monitor crawl stats
 * 
 * ====================================================
 */
