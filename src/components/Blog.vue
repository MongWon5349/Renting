<script setup>
import { onMounted, onBeforeMount, ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { createClient } from 'contentful'

const router = useRouter()
const blogPosts = ref([])
const isLoading = ref(true)
const error = ref(null)

// SEO-related metadata setup
onBeforeMount(() => {
  // Set page title
  document.title = 'SEO Research Institute | Yuezhu\'s Blog'
  
  // Remove old meta tags (if they exist)
  const oldMetaTags = document.querySelectorAll('meta[data-vue-meta="true"]')
  oldMetaTags.forEach(tag => tag.remove())
  
  // Create and add new meta tags
  const metaTags = [
    // Description - Optimized to 140-160 characters
    { name: 'description', content: 'SEO Research Institute by Yuezhu - Discover cutting-edge SEO research, technical insights, programmatic solutions, and advanced strategies for modern search optimization.' },
    // Keywords
    { name: 'keywords', content: 'SEO Research, Programmatic SEO, SEO Automation, Content Generation, AI SEO, Long-tail Keywords, Yuezhu' },
    // Author
    { name: 'author', content: 'Yuezhu' },
    // Canonical link
    { rel: 'canonical', href: 'https://yuezhu.chat/blog' },
    // Open Graph tags (social media sharing optimization)
    { property: 'og:title', content: 'SEO Research Institute | Yuezhu\'s Blog' },
    { property: 'og:description', content: 'SEO Research Institute by Yuezhu - Discover cutting-edge SEO research, technical insights, programmatic solutions, and advanced strategies for modern search optimization.' },
    { property: 'og:url', content: 'https://yuezhu.chat/blog' },
    { property: 'og:type', content: 'website' },
    { property: 'og:image', content: '/pmy-profile.png' },
    // Twitter card tags
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:title', content: 'SEO Research Institute | Yuezhu\'s Blog' },
    { name: 'twitter:description', content: 'SEO Research Institute by Yuezhu - Discover cutting-edge SEO research, technical insights, programmatic solutions, and advanced strategies for modern search optimization.' },
    { name: 'twitter:image', content: '/pmy-profile.png' },
  ]
  
  // Add meta tags to head
  metaTags.forEach(tagInfo => {
    const tag = document.createElement('meta')
    tag.setAttribute('data-vue-meta', 'true') // Mark as vue-meta created tag for later cleanup
    
    // Set attributes
    Object.keys(tagInfo).forEach(key => {
      tag.setAttribute(key, tagInfo[key])
    })
    
    // Add to head
    document.head.appendChild(tag)
  })
  
  // Add canonical link (if it doesn't exist)
  let canonicalLink = document.querySelector('link[rel="canonical"]')
  if (!canonicalLink) {
    canonicalLink = document.createElement('link')
    canonicalLink.setAttribute('rel', 'canonical')
    canonicalLink.setAttribute('href', 'https://yuezhu.chat/blog')
    canonicalLink.setAttribute('data-vue-meta', 'true')
    document.head.appendChild(canonicalLink)
  }
})

onMounted(async () => {
  fetchBlogPosts()
})

const client = createClient({
  space: '29l74muijlia',
  environment: 'master', // defaults to 'master' if not set
  accessToken: 'kJwt3bp0v89gICy3UAf39gkQTRwCY7kpMzFZetin-Is'
})

// Fetch blog posts from Contentful
const fetchBlogPosts = async () => {
  isLoading.value = true
  error.value = null
  
  try {
    console.log('Fetching blog posts...')
    const entries = await client.getEntries({
      content_type: 'blog',
      include: 2
    })
    
    console.log('Received entries:', entries)
    console.log('Total entries:', entries.total)
    console.log('Items:', entries.items)
    console.log('Includes:', entries.includes)
    
    // 从includes.Entry中提取实际的博客文章数据
    if (entries.includes && entries.includes.Entry) {
      blogPosts.value = entries.includes.Entry.filter(entry => 
        entry.sys.contentType.sys.id === 'blogPost'
      )
    } else {
      blogPosts.value = []
    }
    
    console.log('Processed blog posts:', blogPosts.value)
  } catch (err) {
    console.error('Error fetching blog posts:', err)
    error.value = 'Failed to load blog posts: ' + err.message
  } finally {
    isLoading.value = false
  }
}

// Navigate to article detail page
// 修改navigateToPost函数
const navigateToPost = (post) => {
  // 使用系统ID作为路由参数
  const identifier = post.sys.id;
  router.push(`/blog/${identifier}`)
}

// Computed properties for featured posts
const featuredPosts = computed(() => {
  return blogPosts.value.filter(post => post.fields.featured)
})

const getPostWithDefaults = (post) => {
  if (!post) return {};
  
  return {
    ...post,
    fields: {
      ...post.fields,
      title: post.fields.title || '',
      mainContent: post.fields.mainContent || {}
      // 不要添加不存在的字段
    }
  };
};
</script>

<template>
  <div class="page-container">
    <div class="blog-container">
      <header class="blog-header">
        <h1 class="blog-title">Global Rental Housing Research Institute</h1>
        <p class="blog-subtitle">Advanced Research • Legal Notices • Programmatic Solutions</p>
      </header>
      
      <!-- Loading state -->
      <div v-if="isLoading" class="loading-state">
        <div class="loader"></div>
        <p>Loading...</p>
      </div>
      
      <!-- Error state -->
      <div v-else-if="error" class="error-state">
        <p>{{ error }}</p>
        <button @click="fetchBlogPosts" class="retry-button">Retry</button>
      </div>
      
      <template v-else>
        <!-- All articles list -->
        <section class="all-posts">
          <h2 class="section-title">Research</h2>
          <div class="blog-content">
            <article 
              v-for="post in blogPosts" 
              :key="post.sys.id"
              class="blog-post"
              @click="navigateToPost(post)"  
            >
              <div class="post-header">
                <h3 class="post-title">{{ post.fields.title }}</h3>
                <div class="post-meta">
                  <span v-if="getPostWithDefaults(post).fields.time" class="post-date">{{ new Date(getPostWithDefaults(post).fields.time).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' }) }}</span>
                  <span v-if="getPostWithDefaults(post).fields.category" class="post-category">{{ getPostWithDefaults(post).fields.category }}</span>
                  <span v-if="getPostWithDefaults(post).fields.readTime" class="read-time">{{ getPostWithDefaults(post).fields.readTime }}</span>
                </div>
              </div>
              <p class="post-excerpt">
                {{ post.fields.excerpt }}
              </p>
            </article>
          </div>
        </section>
      </template>
    </div>
  </div>
</template>

<style scoped>
/* 极客风格的紧凑设计 */
.page-container {
  min-height: calc(100vh - 60px);
  background: #fff;
  font-family: 'SF Mono', 'Monaco', 'Inconsolata', 'Roboto Mono', monospace;
  color: #000;
  padding: 20px 0;
  overflow-y: auto;
}

.blog-container {
  max-width: 900px;
  margin: 0 auto;
  padding: 0 24px;
}

.blog-header {
  text-align: center;
  margin-bottom: 32px;
  padding: 16px 0;
  border-bottom: 1px solid #ddd;
}

.blog-title {
  font-size: 32px;
  font-weight: 700;
  margin-bottom: 8px;
  color: #000;
  letter-spacing: -0.5px;
  font-family: 'SF Pro Display', -apple-system, BlinkMacSystemFont, sans-serif;
}

.blog-subtitle {
  font-size: 14px;
  color: #7f8c8d;
  font-weight: 400;
  letter-spacing: 0.5px;
  text-transform: lowercase;
}

.section-title {
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 16px;
  color: #2c3e50;
  position: relative;
  padding-bottom: 4px;
  text-transform: lowercase;
  letter-spacing: 0.5px;
}

.section-title::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 24px;
  height: 2px;
  background: #34495e;
}

/* Loading & Error states */
.loading-state, .error-state {
  text-align: center;
  padding: 40px 20px;
  color: #7f8c8d;
  font-size: 14px;
}

.loader {
  width: 20px;
  height: 20px;
  border: 2px solid #f3f3f3;
  border-top: 2px solid #34495e;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin: 0 auto 16px;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.retry-button {
  background: #34495e;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 4px;
  font-size: 12px;
  cursor: pointer;
  margin-top: 12px;
  transition: all 0.2s ease;
}

.retry-button:hover {
  background: #2c3e50;
}

/* Featured posts */
.featured-posts {
  margin-bottom: 32px;
}

.featured-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 16px;
}

.featured-post {
  background: #fff;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
  transition: all 0.2s ease;
  cursor: pointer;
  border: 1px solid #ddd;
}

.featured-post:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08);
}

.featured-content {
  padding: 20px;
}

.featured-category {
  display: inline-block;
  background: #34495e;
  color: white;
  padding: 2px 8px;
  border-radius: 4px;
  font-size: 10px;
  font-weight: 500;
  margin-bottom: 12px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.featured-title {
  font-size: 16px;
  font-weight: 600;
  color: #2c3e50;
  margin-bottom: 8px;
  line-height: 1.3;
  font-family: 'SF Pro Display', -apple-system, BlinkMacSystemFont, sans-serif;
}

.featured-excerpt {
  color: #5a6c7d;
  line-height: 1.5;
  margin-bottom: 12px;
  font-size: 13px;
}

.featured-meta {
  display: flex;
  justify-content: space-between;
  color: #7f8c8d;
  font-size: 11px;
}

/* Blog posts list */
.all-posts {
  margin-bottom: 32px;
}

.blog-content {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.blog-post {
  background: #fff;
  border-radius: 8px;
  padding: 20px;
  border: 1px solid #ddd;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
  transition: all 0.2s ease;
  cursor: pointer;
}

.blog-post:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08);
}

.post-header {
  margin-bottom: 12px;
}

/* New H3 structure styles */
.research-focus {
  margin-bottom: 24px;
  padding: 16px 0;
}

.focus-title {
  font-size: 16px;
  font-weight: 600;
  color: #2c3e50;
  margin-bottom: 12px;
  text-align: center;
}

.focus-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 12px;
}

.focus-item {
  text-align: center;
  padding: 12px;
  background: #fff;
  border-radius: 6px;
  border: 1px solid #ddd;
}

.focus-heading {
  font-size: 13px;
  font-weight: 600;
  color: #34495e;
  margin-bottom: 4px;
}

.focus-desc {
  font-size: 11px;
  color: #7f8c8d;
  line-height: 1.4;
}

.section-subtitle {
  font-size: 13px;
  color: #7f8c8d;
  margin-bottom: 12px;
  font-weight: 400;
  text-align: center;
  font-style: italic;
}

.methodology-section {
  margin-bottom: 24px;
  padding: 16px;
  background: #fff;
  border-radius: 8px;
  border: 1px solid #ddd;
}

.methodology-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 12px;
}

.method-item {
  padding: 12px;
  background: #fff;
  border-radius: 6px;
  border: 1px solid #ddd;
}

.method-heading {
  font-size: 13px;
  font-weight: 600;
  color: #2c3e50;
  margin-bottom: 6px;
}

.method-desc {
  font-size: 11px;
  color: #5a6c7d;
  line-height: 1.4;
}

/* Update existing post title to H3 */
.post-title {
  font-size: 16px;
  font-weight: 600;
  color: #2c3e50;
  margin-bottom: 8px;
  line-height: 1.3;
  font-family: 'SF Pro Display', -apple-system, BlinkMacSystemFont, sans-serif;
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .focus-grid, .methodology-grid {
    grid-template-columns: 1fr;
  }
  
  .focus-title {
    font-size: 14px;
  }
  
  .focus-heading, .method-heading {
    font-size: 12px;
  }
  
  .focus-desc, .method-desc {
    font-size: 10px;
  }
}
</style>
