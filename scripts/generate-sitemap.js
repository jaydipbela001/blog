#!/usr/bin/env node

/**
 * Sitemap Generator for SmartReads Blog
 * This script automatically generates sitemap.xml from posts.js
 * Run with: node scripts/generate-sitemap.js
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Import posts data
import { allPosts } from '../src/data/posts.js';

const DOMAIN = 'https://smartreadsblog.vercel.app';
const CATEGORIES = [
  'esports',
  'food',
  'entertainment',
  'health',
  'money',
  'travel',
  'tech',
  'history',
  'culture',
  'war',
  'environment',
  'lifestyle'
];

function getCurrentDate() {
  return new Date().toISOString().split('T')[0];
}

function getPriorityByAge(dateStr) {
  // Newer posts get higher priority
  const postDate = new Date(dateStr);
  const daysDiff = Math.floor((new Date() - postDate) / (1000 * 60 * 60 * 24));
  
  if (daysDiff < 7) return '0.90';
  if (daysDiff < 30) return '0.85';
  if (daysDiff < 90) return '0.80';
  return '0.75';
}

function generateSitemap() {
  const today = getCurrentDate();
  let xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:news="http://www.google.com/schemas/sitemap-news/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">

  <!-- Homepage - Updated daily for freshness -->
  <url>
    <loc>${DOMAIN}/</loc>
    <lastmod>${today}</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>

  <!-- Category Pages - High Priority -->
`;

  // Add category pages
  CATEGORIES.forEach(category => {
    xml += `  <url>
    <loc>${DOMAIN}/${category}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.95</priority>
  </url>
`;
  });

  // Add all blog posts
  xml += '\n  <!-- Blog Posts -->\n';
  
  allPosts.forEach(post => {
    const slug = post.slug;
    if (!slug) {
      console.warn(`⚠️  Warning: Post "${post.title}" has no slug`);
      return;
    }

    // Convert date format (e.g., "Jan 15, 2026" to ISO format)
    const postDate = new Date(post.date);
    const lastmod = postDate.toISOString().split('T')[0];
    const priority = getPriorityByAge(postDate.toISOString());

    xml += `  <url>
    <loc>${DOMAIN}/blog/${slug}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>${priority}</priority>
  </url>
`;
  });

  xml += '\n</urlset>';

  return xml;
}

function saveSitemap(content) {
  const outputPath = path.join(__dirname, '../public/sitemap.xml');
  
  try {
    fs.writeFileSync(outputPath, content, 'utf8');
    console.log(`✅ Sitemap generated successfully!`);
    console.log(`📄 File: ${outputPath}`);
    console.log(`📊 Total URLs: ${content.match(/<url>/g).length}`);
  } catch (error) {
    console.error('❌ Error writing sitemap:', error.message);
    process.exit(1);
  }
}

function main() {
  console.log('🚀 Generating sitemap.xml...');
  console.log(`📦 Found ${allPosts.length} blog posts`);
  console.log(`🏷️  Categories: ${CATEGORIES.length}`);
  
  const sitemap = generateSitemap();
  saveSitemap(sitemap);
  
  console.log('\n✨ Sitemap generation complete!');
  console.log('💡 Tip: Submit to Google Search Console at https://search.google.com/search-console');
}

main();
