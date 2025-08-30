<template>
  <div class="blog-home">
    <div class="container">
      <header class="blog-header">
         <h1 class="blog-title">Welcome to My Blog</h1>
         <p class="blog-description">Sharing insights on technology and life</p>
       </header>

      <main class="blog-content">
        <section class="intro-section">
           <h2>About This Blog</h2>
           <p>This blog documents my thoughts and insights from technology learning and project development, hoping to share valuable content with everyone.</p>
         </section>

        <section class="recent-posts">
           <h2>Recent Posts</h2>
          <div class="posts-grid">
            <article class="post-card">
               <h3>Frontend Development Best Practices</h3>
               <p class="post-excerpt">Exploring best practices and design patterns in modern frontend development...</p>
               <div class="post-meta">
                 <span class="post-date">January 15, 2024</span>
                 <span class="post-category">Technology</span>
               </div>
             </article>

            <article class="post-card">
               <h3>Vue.js 3.0 New Features Analysis</h3>
               <p class="post-excerpt">Deep dive into the new features and improvements brought by Vue.js 3.0...</p>
               <div class="post-meta">
                 <span class="post-date">January 10, 2024</span>
                 <span class="post-category">Technology</span>
               </div>
             </article>

            <article class="post-card">
               <h3>JavaScript Asynchronous Programming Guide</h3>
               <p class="post-excerpt">The evolution from callback functions to Promise to async/await...</p>
               <div class="post-meta">
                 <span class="post-date">January 5, 2024</span>
                 <span class="post-category">Technology</span>
               </div>
             </article>
          </div>
        </section>

        <section class="categories">
          <h2>Article Categories</h2>
          <div class="category-list">
            <div class="category-item">
              <h4>Frontend Development</h4>
              <p>HTML, CSS, JavaScript, Vue.js, React</p>
            </div>
            <div class="category-item">
              <h4>Backend Technology</h4>
              <p>Node.js, Python, Database Design</p>
            </div>
            <div class="category-item">
              <h4>Tools & Efficiency</h4>
              <p>Development Tools, Workflow, Productivity Enhancement</p>
            </div>
          </div>
        </section>
      </main>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Home'
}
</script>

<style scoped>
.blog-home {
  font-family: 'SF Pro Display', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  color: #000;
  line-height: 1.6;
  min-height: 100vh;
  background-color: #fff;
  padding: 20px;
}

.container {
  max-width: 900px;
  margin: 0 auto;
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  border: 1px solid #ddd;
}

.blog-header {
  background: #fff;
  color: #000;
  padding: 40px;
  text-align: center;
  border-bottom: 2px solid #000;
}

.blog-title {
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 10px;
  letter-spacing: -0.02em;
}

.blog-description {
  font-size: 1.2rem;
  opacity: 0.8;
  font-weight: 300;
}

.blog-content {
  padding: 40px;
}

.intro-section,
.recent-posts,
.categories {
  margin-bottom: 40px;
}

.intro-section h2,
.recent-posts h2,
.categories h2 {
  font-size: 1.8rem;
  font-weight: 600;
  color: #000;
  margin-bottom: 20px;
  padding-bottom: 10px;
  border-bottom: 2px solid #000;
  position: relative;
}

.intro-section h2::after,
.recent-posts h2::after,
.categories h2::after {
  content: '';
  position: absolute;
  bottom: -2px;
  left: 0;
  width: 50px;
  height: 2px;
  background: #666;
}

.intro-section p {
  font-size: 1.1rem;
  color: #333;
  line-height: 1.7;
}

.posts-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 20px;
}

.post-card {
  background: #fff;
  padding: 25px;
  border-radius: 12px;
  border: 1px solid #ddd;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;
  cursor: pointer;
}

.post-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
}

.post-card h3 {
  font-size: 1.3rem;
  font-weight: 600;
  color: #000;
  margin-bottom: 10px;
  line-height: 1.3;
}

.post-excerpt {
  color: #555;
  margin-bottom: 15px;
  line-height: 1.6;
}

.post-meta {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.9rem;
  color: #777;
}

.post-date {
  color: #666;
}

.post-category {
  background: #f0f0f0;
  color: #000;
  padding: 4px 12px;
  border-radius: 20px;
  font-size: 0.8rem;
  border: 1px solid #ddd;
}

.category-list {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
}

.category-item {
  background: #fff;
  padding: 20px;
  border-radius: 12px;
  border: 1px solid #ddd;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

.category-item h4 {
  color: #000;
  margin-bottom: 10px;
  font-weight: 600;
  font-size: 1.1rem;
}

.category-item p {
  color: #666;
  font-size: 0.9rem;
  line-height: 1.5;
}

@media (max-width: 768px) {
  .container {
    margin: 10px;
    border-radius: 8px;
  }
  
  .blog-header {
    padding: 30px 20px;
  }
  
  .blog-title {
    font-size: 2rem;
  }
  
  .blog-content {
    padding: 30px 20px;
  }
  
  .posts-grid,
  .category-list {
    grid-template-columns: 1fr;
  }
}
</style>