<script setup>
import { onMounted, onBeforeMount, ref, computed, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { createClient } from 'contentful'
import { documentToHtmlString } from '@contentful/rich-text-html-renderer'
import { BLOCKS, MARKS } from '@contentful/rich-text-types'
import { marked } from 'marked'

const route = useRoute()
const router = useRouter()
const slug = computed(() => route.params.slug)

const client = createClient({
  space: '29l74muijlia',
  environment: 'master', // defaults to 'master' if not set
  accessToken: 'kJwt3bp0v89gICy3UAf39gkQTRwCY7kpMzFZetin-Is'
})

const currentPost = ref(null)
const isLoading = ref(true)
const error = ref(null)
const relatedPosts = ref([])

const fetchBlogPost = async () => {
  isLoading.value = true
  error.value = null
  
  try {
    // 直接使用路由参数作为系统ID查询
    const entries = await client.getEntries({
      'sys.id': slug.value,
      include: 2
    });
    
    if (entries.items.length > 0) {
      currentPost.value = entries.items[0];
    } else {
      // 没有找到文章
      error.value = "Can't find the blog post";
      router.push('/blog');
    }
  } catch (err) {
    console.error('Error fetching blog post:', err);
    error.value = "Can't find the blog post";
  } finally {
    isLoading.value = false;
  }
};

onMounted(() => {
  fetchBlogPost()
})

onBeforeMount(() => {
  // SEO metadata will be updated after the post is loaded
})

const updateSEOMetadata = () => {
  if (!currentPost.value) return
  
  const post = currentPost.value.fields
  
  // Set page title
  document.title = `${post.title} | Yuezhu's Blog`
  
  // Remove old meta tags (if they exist)
  const oldMetaTags = document.querySelectorAll('meta[data-vue-meta="true"]')
  oldMetaTags.forEach(tag => tag.remove())
  
  // Create and add new meta tags
  const metaTags = [
    // Description - use article excerpt
    { name: 'description', content: post.excerpt || post.title },
    // Keywords
    { name: 'keywords', content: `${post.category}, pSEO, Programmatic SEO, ${post.title}, Yuezhu` },
    // Author
    { name: 'author', content: post.author || 'Yuezhu' },
    // Canonical link
    { rel: 'canonical', href: `https://yuezhu.chat/blog/${post.slug}` },
    // Open Graph tags (social media sharing optimization)
    { property: 'og:title', content: post.title },
    { property: 'og:description', content: post.excerpt || post.title },
    { property: 'og:url', content: `https://yuezhu.chat/blog/${post.slug}` },
    { property: 'og:type', content: 'article' },
    { property: 'og:image', content: post.featuredImage ? post.featuredImage.fields.file.url : '/pmy-profile.png' },
    // Twitter card tags
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:title', content: post.title },
    { name: 'twitter:description', content: post.excerpt || post.title },
    { name: 'twitter:image', content: post.featuredImage ? post.featuredImage.fields.file.url : '/pmy-profile.png' },
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
    canonicalLink.setAttribute('href', `https://yuezhu.chat/blog/${post.slug}`)
    canonicalLink.setAttribute('data-vue-meta', 'true')
    document.head.appendChild(canonicalLink)
  }
}

// Watch for changes to currentPost and update SEO metadata
watch(() => currentPost.value, updateSEOMetadata, { immediate: true })

// Navigate to another post
const navigateToPost = (slug) => {
  router.push(`/blog/${slug}`)
}

// Return to blog main page
const backToBlog = () => {
  router.push('/blog')
}

// 处理混合内容的渲染器
const renderedContent = computed(() => {
  if (!currentPost.value || !currentPost.value.fields.richText) {
    return ''
  }

  // 处理富文本和Markdown内容的标题层级
  
  // 自定义渲染器，处理包含 Markdown 的富文本内容，优化标题层级
  const options = {
    renderNode: {
      [BLOCKS.PARAGRAPH]: (node, next) => {
        const content = next(node.content)
        // 检查段落内容是否包含 Markdown 语法
        if (content.includes('**') || content.includes('*') || content.includes('`') || content.includes('[') || content.includes('|')) {
          // 使用 marked 解析 Markdown
          let markdownContent = marked.parse(content)
          // 调整标题层级 - 保持语义化层级：H1文章标题，H2主要章节，H3子章节，H4小节
          markdownContent = markdownContent
            .replace(/<h1(\s[^>]*)?>(.*?)<\/h1>/g, '<h2$1>$2</h2>')
            .replace(/<h2(\s[^>]*)?>(.*?)<\/h2>/g, '<h3$1>$2</h3>')
            .replace(/<h3(\s[^>]*)?>(.*?)<\/h3>/g, '<h4$1>$2</h4>')
            .replace(/<h4(\s[^>]*)?>(.*?)<\/h4>/g, '<h4$1>$2</h4>')
            .replace(/<h5(\s[^>]*)?>(.*?)<\/h5>/g, '<h4$1>$2</h4>')
            .replace(/<h6(\s[^>]*)?>(.*?)<\/h6>/g, '<h4$1>$2</h4>')
          return markdownContent
        }
        return `<p>${content}</p>`
      },
      // 将原始H1-H6标签调整为语义化层级：H1文章标题，H2主要章节，H3子章节，H4小节
      [BLOCKS.HEADING_1]: (node, next) => {
        const content = next(node.content)
        return `<h2>${content}</h2>`
      },
      [BLOCKS.HEADING_2]: (node, next) => {
        const content = next(node.content)
        return `<h3>${content}</h3>`
      },
      [BLOCKS.HEADING_3]: (node, next) => {
        const content = next(node.content)
        return `<h4>${content}</h4>`
      },
      [BLOCKS.HEADING_4]: (node, next) => {
        const content = next(node.content)
        return `<h4>${content}</h4>`
      },
      [BLOCKS.HEADING_5]: (node, next) => {
        const content = next(node.content)
        return `<h4>${content}</h4>`
      },
      [BLOCKS.HEADING_6]: (node, next) => {
        const content = next(node.content)
        return `<h4>${content}</h4>`
      },
      [BLOCKS.UL_LIST]: (node, next) => {
        return `<ul>${next(node.content)}</ul>`
      },
      [BLOCKS.OL_LIST]: (node, next) => {
        return `<ol>${next(node.content)}</ol>`
      },
      [BLOCKS.LIST_ITEM]: (node, next) => {
        return `<li>${next(node.content)}</li>`
      },
      [BLOCKS.QUOTE]: (node, next) => {
        return `<blockquote>${next(node.content)}</blockquote>`
      },
      [BLOCKS.HR]: () => {
        return '<hr>'
      },
      [BLOCKS.EMBEDDED_ASSET]: (node) => {
        const { file } = node.data.target.fields
        return `<img src="https:${file.url}" alt="${file.fileName || ''}" style="max-width: 100%; height: auto;">`
      },
      'hyperlink': (node, next) => {
        return `<a href="${node.data.uri}" target="_blank" rel="noopener noreferrer">${next(node.content)}</a>`
      }
    },
    renderMark: {
      [MARKS.BOLD]: (text) => `<strong>${text}</strong>`,
      [MARKS.ITALIC]: (text) => `<em>${text}</em>`,
      [MARKS.UNDERLINE]: (text) => `<u>${text}</u>`,
      [MARKS.CODE]: (text) => `<code>${text}</code>`
    }
  }

  try {
    return documentToHtmlString(currentPost.value.fields.richText, options)
  } catch (error) {
    console.error('渲染内容时出错:', error)
    // 如果富文本解析失败，尝试直接解析为 Markdown
    const rawContent = JSON.stringify(currentPost.value.fields.richText)
    if (rawContent.includes('**') || rawContent.includes('|')) {
      // 提取文本内容并作为 Markdown 处理
      const extractText = (node) => {
        if (node.nodeType === 'text') {
          return node.value
        }
        if (node.content) {
          return node.content.map(extractText).join('')
        }
        return ''
      }
      
      const textContent = currentPost.value.fields.richText.content
        .map(extractText)
        .join('\n\n')
      
      // 处理 Markdown 内容，调整标题层级为语义化层级：H1文章标题，H2主要章节，H3子章节，H4小节
      let processedContent = marked.parse(textContent)
      
      // 统一标题转换规则：保持语义化层级
      processedContent = processedContent
        .replace(/<h1(\s[^>]*)?>(.*?)<\/h1>/g, '<h2$1>$2</h2>')
        .replace(/<h2(\s[^>]*)?>(.*?)<\/h2>/g, '<h3$1>$2</h3>')
        .replace(/<h3(\s[^>]*)?>(.*?)<\/h3>/g, '<h4$1>$2</h4>')
        .replace(/<h4(\s[^>]*)?>(.*?)<\/h4>/g, '<h4$1>$2</h4>')
        .replace(/<h5(\s[^>]*)?>(.*?)<\/h5>/g, '<h4$1>$2</h4>')
        .replace(/<h6(\s[^>]*)?>(.*?)<\/h6>/g, '<h4$1>$2</h4>')
      
      return processedContent
    }
    return '<p>内容渲染失败</p>'
  }
})
</script>

<template>
  <div class="page-container">
    <div class="blog-post-container">
      <!-- Back button -->
      <div class="back-link" @click="backToBlog">
        ← Back to Blog
      </div>
      
      <!-- Loading state -->
      <div v-if="isLoading" class="loading-state">
        <div class="loader"></div>
        <p>Loading article...</p>
      </div>
      
      <!-- Error state -->
      <div v-else-if="error" class="error-state">
        <p>{{ error }}</p>
        <button @click="fetchBlogPost" class="retry-button">Try Again</button>
      </div>
      
      <!-- Article content -->
      <template v-else-if="currentPost">
        <!-- Article header -->
        <header class="post-header">
          <div class="post-meta">
            <span v-if="currentPost.fields.category" class="post-category">{{ currentPost.fields.category }}</span>
            <span v-if="currentPost.fields.time" class="post-date">{{ new Date(currentPost.fields.time).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }) }}</span>
            <span v-if="currentPost.fields.readTime" class="read-time">{{ currentPost.fields.readTime }} read</span>
          </div>
          <h1 class="post-title">{{ currentPost.fields.title }}</h1>
          
          <!-- Author info -->
          <div class="author-info">
            <div class="author-avatar">
              <img src="/pmy-profile.png" alt="Author" />
            </div>
            <div class="author-details">
              <div v-if="currentPost.fields.author" class="author-name">{{ currentPost.fields.author }}</div>
              <div v-if="currentPost.fields.authorTitle" class="author-title">{{ currentPost.fields.authorTitle }}</div>
            </div>
          </div>
        </header>
        
        <div class="post-content">
          <!-- 渲染处理后的内容 -->
          <div v-html="renderedContent"></div>
        </div>
        
        <!-- Article footer -->
        <div class="post-footer">
          <div class="post-tags" v-if="currentPost.fields.tags && currentPost.fields.tags.length">
            <span class="tag" v-for="tag in currentPost.fields.tags" :key="tag">{{ tag }}</span>
          </div>
        </div>
        
        <!-- Related articles -->
        <section class="related-posts" v-if="relatedPosts.length">
          <h4 class="section-title">Related Articles</h4>
          <div class="related-grid">
            <article 
              v-for="post in relatedPosts" 
              :key="post.sys.id"
              class="related-post"
              @click="navigateToPost(post.fields.slug)"
            >
              <h3 class="related-title">{{ post.fields.title }}</h3>
              <div class="related-meta">
                <span class="post-category">{{ post.fields.category }}</span>
                <span class="post-date">{{ new Date(post.fields.time).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }) }}</span>
              </div>
            </article>
          </div>
        </section>
      </template>
    </div>
  </div>
</template>

<style scoped>
/* 添加基本样式确保内容可读 */
.page-container {
  padding: 20px;
  max-width: 800px;
  margin: 0 auto;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
}

.back-link {
  color: #007bff;
  cursor: pointer;
  margin-bottom: 20px;
}

.back-link:hover {
  text-decoration: underline;
}

.post-header {
  margin-bottom: 30px;
}

.post-meta {
  display: flex;
  gap: 15px;
  margin-bottom: 15px;
  font-size: 14px;
  color: #666;
}

.post-category {
  background: #007bff;
  color: white;
  padding: 4px 8px;
  border-radius: 4px;
}

.post-title {
  font-size: 32px;
  font-weight: bold;
  margin-bottom: 20px;
  line-height: 1.3;
}

.author-info {
  display: flex;
  align-items: center;
  gap: 12px;
}

.author-avatar img {
  width: 40px;
  height: 40px;
  border-radius: 50%;
}

.author-name {
  font-weight: 600;
}

.author-title {
  font-size: 14px;
  color: #666;
}

.post-content {
  line-height: 1.6;
  margin-bottom: 40px;
}

/* Markdown 内容样式 - 优化标题层级 */
.post-content :deep(h2),
.post-content :deep(h3),
.post-content :deep(h4),
.post-content :deep(h5),
.post-content :deep(h6) {
  margin: 24px 0 16px;
  font-weight: 600;
  line-height: 1.3;
}

/* 文章内容中的标题层级 - 从H2开始（页面已有H1文章标题，H4章节标题） */
.post-content :deep(h2) { 
  font-size: 24px; 
  color: #2c3e50;
  border-bottom: 2px solid #ecf0f1;
  padding-bottom: 8px;
  margin-top: 32px;
}
.post-content :deep(h3) { 
  font-size: 20px; 
  color: #34495e;
  margin-top: 28px;
}
.post-content :deep(h4) { 
  font-size: 18px; 
  color: #34495e;
  margin-top: 28px;
}
.post-content :deep(h5) { 
  font-size: 16px; 
  color: #5a6c7d;
  margin-top: 24px;
}
.post-content :deep(h6) { 
  font-size: 14px; 
  color: #5a6c7d;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-top: 20px;
}

.post-content :deep(.content-subtitle) {
  font-size: 16px;
  font-weight: 600;
  color: #666;
  margin: 16px 0 8px 0;
  padding: 8px 0;
  border-bottom: 1px solid #eee;
}

.post-content :deep(p) {
  margin-bottom: 16px;
}

.post-content :deep(strong) {
  font-weight: 700;
}

.post-content :deep(em) {
  font-style: italic;
}

.post-content :deep(code) {
  background: #f5f5f5;
  padding: 2px 4px;
  border-radius: 3px;
  font-family: monospace;
}

.post-content :deep(blockquote) {
  border-left: 4px solid #ddd;
  padding-left: 16px;
  margin: 16px 0;
  color: #666;
  font-style: italic;
}

.post-content :deep(ul),
.post-content :deep(ol) {
  margin: 16px 0;
  padding-left: 24px;
}

.post-content :deep(li) {
  margin-bottom: 8px;
}

.post-content :deep(table) {
  width: 100%;
  border-collapse: collapse;
  margin: 20px 0;
}

.post-content :deep(th),
.post-content :deep(td) {
  border: 1px solid #ddd;
  padding: 8px 12px;
  text-align: left;
}

.post-content :deep(th) {
  background: #f5f5f5;
  font-weight: 600;
}

.post-content :deep(a) {
  color: #007bff;
  text-decoration: none;
}

.post-content :deep(a:hover) {
  text-decoration: underline;
}

.post-content :deep(hr) {
  border: none;
  border-top: 1px solid #ddd;
  margin: 24px 0;
}

.loading-state,
.error-state {
  text-align: center;
  padding: 40px;
}

.post-footer {
  border-top: 1px solid #eee;
  padding-top: 20px;
  margin-bottom: 40px;
}

.post-tags {
  margin-bottom: 20px;
}

.tag {
  background: #f5f5f5;
  padding: 4px 8px;
  border-radius: 4px;
  margin-right: 8px;
  font-size: 12px;
}

.related-posts {
  margin-bottom: 40px;
}

.share-buttons {
  display: flex;
  align-items: center;
  gap: 12px;
}

.share-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  background: #f5f5f5;
  border-radius: 50%;
  text-decoration: none;
}

.related-posts {
  margin-bottom: 40px;
}

.section-title {
  font-size: 24px;
  margin-bottom: 20px;
}

.related-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
}

.related-post {
  border: 1px solid #eee;
  padding: 16px;
  border-radius: 8px;
  cursor: pointer;
}

.subscribe-section {
  background: #f5f5f5;
  padding: 30px;
  border-radius: 8px;
  text-align: center;
}

.subscribe-form {
  display: flex;
  gap: 12px;
  max-width: 400px;
  margin: 0 auto;
}

.subscribe-input {
  flex: 1;
  padding: 8px 12px;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.subscribe-button {
  background: #007bff;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
}
</style>
