/**
 * Slug Redirect Manager
 * 
 * When you change a post slug, add the old slug -> new slug mapping here
 * This ensures old URLs don't break and maintains SEO ranking
 * 
 * Format:
 * OLD_SLUG: NEW_SLUG
 * 
 * Example:
 * "old-lol-worlds": "lol-worlds-2025-showdown"
 */

export const slugRedirects = {
  // Add your old -> new slug mappings here
  // Example:
  // "league-of-legends-worlds": "lol-worlds-2025-showdown",
  // "counter-strike-major": "cs2-major-championships",
};

/**
 * Usage in your routing:
 * 
 * 1. In React Router or your page component:
 * 
 * import { slugRedirects } from '@/config/slugRedirects';
 * 
 * // Check if the current slug is a redirect
 * const isRedirect = slugRedirects[slug];
 * if (isRedirect) {
 *   navigate(`/blog/${isRedirect}`);
 * }
 * 
 * 2. In your BlogPost.jsx:
 * 
 * const { slug } = useParams();
 * const actualSlug = slugRedirects[slug] || slug;
 * const post = allPosts.find(p => p.slug === actualSlug);
 * 
 * 3. Create a 301 redirect page (redirect.jsx):
 * 
 * import { Navigate, useParams } from 'react-router-dom';
 * import { slugRedirects } from '@/config/slugRedirects';
 * 
 * export default function RedirectPage() {
 *   const { slug } = useParams();
 *   const newSlug = slugRedirects[slug];
 *   
 *   if (newSlug) {
 *     return <Navigate to={`/blog/${newSlug}`} replace />;
 *   }
 *   
 *   return <Navigate to="/" replace />;
 * }
 * 
 */

export default slugRedirects;
