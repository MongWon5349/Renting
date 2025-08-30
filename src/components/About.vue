<template>
  <div class="about">
    <div class="about-container">
      <div class="about-header">
        <div class="avatar">
          <div class="avatar-placeholder">👨‍💻</div>
        </div>
        <h1 class="about-title">关于我</h1>
        <p class="about-subtitle">热爱技术的前端开发者</p>
      </div>
      
      <div class="about-content">
        <section class="intro-section">
          <h2 class="section-title">个人简介</h2>
          <p class="intro-text">
            我是一名充满热情的前端开发者，专注于创建优雅、高效的用户界面。
            我热爱学习新技术，并致力于将最佳实践应用到每一个项目中。
          </p>
        </section>
        
        <section class="skills-section">
          <h2 class="section-title">技能专长</h2>
          <div class="skills-grid">
            <div class="skill-category" v-for="category in skills" :key="category.name">
              <h3 class="category-title">{{ category.name }}</h3>
              <div class="skill-list">
                <span class="skill-item" v-for="skill in category.items" :key="skill">{{ skill }}</span>
              </div>
            </div>
          </div>
        </section>
        
        <section class="contact-section">
          <h2 class="section-title">联系方式</h2>
          <div class="contact-info">
            <div class="contact-item">
              <span class="contact-icon">📧</span>
              <span class="contact-text">your.email@example.com</span>
            </div>
            <div class="contact-item">
              <span class="contact-icon">🐙</span>
              <span class="contact-text">github.com/yourusername</span>
            </div>
            <div class="contact-item">
              <span class="contact-icon">💼</span>
              <span class="contact-text">linkedin.com/in/yourprofile</span>
            </div>
          </div>
        </section>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'About',
  data() {
    return {
      skills: [
        {
          name: '前端技术',
          items: ['Vue.js', 'React', 'JavaScript', 'TypeScript', 'HTML5', 'CSS3']
        },
        {
          name: '工具与框架',
          items: ['Vite', 'Webpack', 'Git', 'npm/yarn', 'ESLint', 'Prettier']
        },
        {
          name: '设计与UI',
          items: ['响应式设计', 'CSS Grid', 'Flexbox', 'Sass/SCSS', 'UI/UX设计']
        }
      ]
    }
  }
}
</script>

<style scoped>
.about {
  max-width: 800px;
  margin: 0 auto;
}

.about-header {
  text-align: center;
  margin-bottom: 3rem;
}

.avatar {
  margin-bottom: 1.5rem;
}

.avatar-placeholder {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 3rem;
  margin: 0 auto;
  box-shadow: 0 10px 30px rgba(102, 126, 234, 0.3);
}

.about-title {
  font-size: 2.5rem;
  color: #2c3e50;
  margin-bottom: 0.5rem;
}

.about-subtitle {
  font-size: 1.2rem;
  color: #7f8c8d;
}

.about-content {
  display: flex;
  flex-direction: column;
  gap: 3rem;
}

.section-title {
  font-size: 1.8rem;
  color: #2c3e50;
  margin-bottom: 1.5rem;
  border-bottom: 3px solid #667eea;
  padding-bottom: 0.5rem;
}

.intro-text {
  font-size: 1.1rem;
  line-height: 1.8;
  color: #555;
  text-align: justify;
}

.skills-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
}

.skill-category {
  background: white;
  padding: 1.5rem;
  border-radius: 10px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
}

.category-title {
  font-size: 1.2rem;
  color: #2c3e50;
  margin-bottom: 1rem;
}

.skill-list {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.skill-item {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 0.4rem 0.8rem;
  border-radius: 15px;
  font-size: 0.9rem;
  font-weight: 500;
}

.contact-info {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.contact-item {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  background: white;
  border-radius: 10px;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
}

.contact-item:hover {
  transform: translateX(5px);
}

.contact-icon {
  font-size: 1.5rem;
}

.contact-text {
  font-size: 1.1rem;
  color: #2c3e50;
}

@media (max-width: 768px) {
  .about-title {
    font-size: 2rem;
  }
  
  .skills-grid {
    grid-template-columns: 1fr;
  }
}
</style>