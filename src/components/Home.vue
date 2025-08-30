<template>
  <div class="resume-container">
    <div class="tech-decoration"></div>
    
    <div class="container">
      <div class="header">
        <div class="header-content">
          <img src="/image.png" alt="头像" class="avatar">
          <h1 class="name">张三</h1>
          <p class="title">全栈开发工程师</p>
          <div class="contact-info">
            <div class="contact-item">
              <span>📧</span>
              <span>zhangsan@email.com</span>
            </div>
            <div class="contact-item">
              <span>📱</span>
              <span>138-0000-0000</span>
            </div>
            <div class="contact-item">
              <span>🌐</span>
              <span>github.com/zhangsan</span>
            </div>
          </div>
        </div>
      </div>

      <div class="main-content">
        <div class="section">
          <h2 class="section-title">技能专长</h2>
          <div class="skills-grid">
            <div class="skill-category">
              <h4>前端技术</h4>
              <div class="skill-tags">
                <span class="skill-tag">React</span>
                <span class="skill-tag">Vue.js</span>
                <span class="skill-tag">TypeScript</span>
                <span class="skill-tag">CSS3</span>
              </div>
            </div>
            <div class="skill-category">
              <h4>后端技术</h4>
              <div class="skill-tags">
                <span class="skill-tag">Node.js</span>
                <span class="skill-tag">Python</span>
                <span class="skill-tag">MySQL</span>
                <span class="skill-tag">MongoDB</span>
              </div>
            </div>
            <div class="skill-category">
              <h4>开发工具</h4>
              <div class="skill-tags">
                <span class="skill-tag">Git</span>
                <span class="skill-tag">Docker</span>
                <span class="skill-tag">AWS</span>
                <span class="skill-tag">Jenkins</span>
              </div>
            </div>
          </div>
        </div>

        <div class="section">
          <h2 class="section-title">工作经历</h2>
          
          <div class="experience-item">
            <div class="experience-header">
              <div>
                <div class="job-title">高级前端开发工程师</div>
                <div class="company">科技创新有限公司</div>
              </div>
              <div class="duration">2022.03 - 至今</div>
            </div>
            <ul class="achievements">
              <li>负责公司核心产品的前端架构设计和开发</li>
              <li>优化页面性能，提升用户体验30%</li>
              <li>带领团队完成多个重要项目的交付</li>
            </ul>
          </div>

          <div class="experience-item">
            <div class="experience-header">
              <div>
                <div class="job-title">前端开发工程师</div>
                <div class="company">互联网科技公司</div>
              </div>
              <div class="duration">2020.06 - 2022.02</div>
            </div>
            <ul class="achievements">
              <li>参与多个Web应用的开发和维护</li>
              <li>实现响应式设计，支持多端适配</li>
              <li>协助建立前端开发规范和流程</li>
            </ul>
          </div>
        </div>

        <div class="section">
          <h2 class="section-title">教育背景</h2>
          
          <div class="education-item">
            <div class="degree">计算机科学与技术 学士学位</div>
            <div class="school">某某大学</div>
            <div style="color: #6c757d; margin-top: 5px;">2016.09 - 2020.06</div>
          </div>
        </div>

        <div class="section">
          <h2 class="section-title">项目经验</h2>
          
          <div class="experience-item">
            <div class="experience-header">
              <div>
                <div class="job-title">企业管理系统</div>
                <div class="company">React + Node.js</div>
              </div>
              <div class="duration">2023</div>
            </div>
            <ul class="achievements">
              <li>构建完整的企业级管理系统</li>
              <li>实现用户权限管理和数据可视化</li>
              <li>支持高并发访问，性能优异</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Home'
}
</script>

<style scoped>
.resume-container {
  font-family: 'SF Pro Display', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  color: #1a1a1a;
  line-height: 1.6;
  min-height: 100vh;
  padding: 20px;
  position: relative;
}

.container {
  max-width: 900px;
  margin: 0 auto;
  background: rgba(255, 255, 255, 0.9);
  border-radius: 20px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  backdrop-filter: blur(10px);
}

.header {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 40px;
  text-align: center;
  position: relative;
}

.header::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse"><path d="M 10 0 L 0 0 0 10" fill="none" stroke="rgba(255,255,255,0.1)" stroke-width="0.5"/></pattern></defs><rect width="100" height="100" fill="url(%23grid)"/></svg>') repeat;
  opacity: 0.3;
}

.header-content {
  position: relative;
  z-index: 1;
}

.avatar {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  margin: 0 auto 20px;
  border: 4px solid rgba(255, 255, 255, 0.3);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
  object-fit: cover;
  display: block;
}

.name {
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 10px;
  letter-spacing: -0.02em;
}

.title {
  font-size: 1.2rem;
  opacity: 0.9;
  font-weight: 300;
}

.contact-info {
  display: flex;
  justify-content: center;
  gap: 30px;
  margin-top: 20px;
  flex-wrap: wrap;
}

.contact-item {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 0.9rem;
}

.main-content {
  padding: 40px;
}

.section {
  margin-bottom: 40px;
}

.section-title {
  font-size: 1.5rem;
  font-weight: 600;
  color: #2c3e50;
  margin-bottom: 20px;
  padding-bottom: 10px;
  border-bottom: 2px solid #667eea;
  position: relative;
}

.section-title::after {
  content: '';
  position: absolute;
  bottom: -2px;
  left: 0;
  width: 50px;
  height: 2px;
  background: #764ba2;
}

.skills-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
}

.skill-category {
  background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
  padding: 20px;
  border-radius: 12px;
  border-left: 4px solid #667eea;
}

.skill-category h4 {
  color: #2c3e50;
  margin-bottom: 10px;
  font-weight: 600;
}

.skill-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.skill-tag {
  background: rgba(102, 126, 234, 0.1);
  color: #2c3e50;
  padding: 4px 12px;
  border-radius: 20px;
  font-size: 0.85rem;
  border: 1px solid rgba(102, 126, 234, 0.2);
}

.experience-item {
  background: linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%);
  padding: 25px;
  border-radius: 12px;
  margin-bottom: 20px;
  border-left: 4px solid #e74c3c;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
}

.experience-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 15px;
  flex-wrap: wrap;
  gap: 10px;
}

.job-title {
  font-size: 1.2rem;
  font-weight: 600;
  color: #2c3e50;
}

.company {
  color: #667eea;
  font-weight: 500;
}

.duration {
  color: #6c757d;
  font-size: 0.9rem;
  background: rgba(108, 117, 125, 0.1);
  padding: 4px 12px;
  border-radius: 20px;
}

.achievements {
  list-style: none;
  margin-top: 15px;
}

.achievements li {
  position: relative;
  padding-left: 20px;
  margin-bottom: 8px;
  color: #495057;
}

.achievements li::before {
  content: '▶';
  position: absolute;
  left: 0;
  color: #667eea;
  font-size: 0.8rem;
}

.education-item {
  background: linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%);
  padding: 20px;
  border-radius: 12px;
  border-left: 4px solid #28a745;
  margin-bottom: 15px;
}

.degree {
  font-weight: 600;
  color: #2c3e50;
  margin-bottom: 5px;
}

.school {
  color: #28a745;
  font-weight: 500;
}

.tech-decoration {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: -1;
  opacity: 0.03;
  background-image: 
    radial-gradient(circle at 20% 80%, #667eea 0%, transparent 50%),
    radial-gradient(circle at 80% 20%, #764ba2 0%, transparent 50%),
    radial-gradient(circle at 40% 40%, #667eea 0%, transparent 50%);
}

@media (max-width: 768px) {
  .container {
    margin: 10px;
    border-radius: 15px;
  }
  
  .header {
    padding: 30px 20px;
  }
  
  .name {
    font-size: 2rem;
  }
  
  .main-content {
    padding: 30px 20px;
  }
  
  .contact-info {
    gap: 15px;
  }
  
  .experience-header {
    flex-direction: column;
    align-items: flex-start;
  }
}
</style>