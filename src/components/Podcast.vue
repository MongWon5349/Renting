<template>
  <div class="podcast-container">
    <div class="podcast-header">
      <h1 class="podcast-title">我的播客</h1>
      <p class="podcast-subtitle">分享技术见解与生活感悟</p>
    </div>
    
    <div class="podcast-content">
      <div class="podcast-intro">
        <h2 class="section-title">关于播客</h2>
        <p class="intro-text">
          欢迎来到我的播客频道！在这里，我会分享关于技术开发、职业成长、
          以及生活感悟的内容。希望能够为听众带来有价值的信息和启发。
        </p>
      </div>
      
      <div class="episodes-section">
        <h2 class="section-title">最新节目</h2>
        <div class="episodes-grid">
          <div class="episode-card" v-for="episode in episodes" :key="episode.id">
            <div class="episode-image">
              <div class="play-button">▶</div>
            </div>
            <div class="episode-info">
              <h3 class="episode-title">{{ episode.title }}</h3>
              <p class="episode-description">{{ episode.description }}</p>
              <div class="episode-meta">
                <span class="episode-date">{{ episode.date }}</span>
                <span class="episode-duration">{{ episode.duration }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div class="subscribe-section">
        <h2 class="section-title">订阅播客</h2>
        <p class="subscribe-text">在以下平台收听我的播客：</p>
        <div class="platform-links">
          <a href="#" class="platform-link">
            <span class="platform-icon">🎵</span>
            <span>Apple Podcasts</span>
          </a>
          <a href="#" class="platform-link">
            <span class="platform-icon">🎧</span>
            <span>Spotify</span>
          </a>
          <a href="#" class="platform-link">
            <span class="platform-icon">📻</span>
            <span>Google Podcasts</span>
          </a>
          <a href="#" class="platform-link">
            <span class="platform-icon">🔊</span>
            <span>小宇宙</span>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Podcast',
  data() {
    return {
      episodes: [
        {
          id: 1,
          title: '第1期：从零开始学习前端开发',
          description: '分享我的前端学习经历，以及给新手开发者的建议和学习路径规划。',
          date: '2024-01-15',
          duration: '45分钟'
        },
        {
          id: 2,
          title: '第2期：Vue.js开发实战经验分享',
          description: '深入探讨Vue.js在实际项目中的应用，包括最佳实践和常见问题解决方案。',
          date: '2024-01-08',
          duration: '38分钟'
        },
        {
          id: 3,
          title: '第3期：程序员的职业规划与成长',
          description: '聊聊程序员如何规划职业发展，提升技术能力和软技能的重要性。',
          date: '2024-01-01',
          duration: '52分钟'
        }
      ]
    }
  }
}
</script>

<style scoped>
.podcast-container {
  max-width: 1000px;
  margin: 0 auto;
  padding: 2rem;
}

.podcast-header {
  text-align: center;
  margin-bottom: 3rem;
  padding: 3rem 0;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
  border-radius: 15px;
}

.podcast-title {
  font-size: 3rem;
  color: #2c3e50;
  margin-bottom: 1rem;
  font-weight: bold;
}

.podcast-subtitle {
  font-size: 1.3rem;
  color: #7f8c8d;
  font-weight: 300;
}

.podcast-content {
  display: flex;
  flex-direction: column;
  gap: 3rem;
}

.section-title {
  font-size: 2rem;
  color: #2c3e50;
  margin-bottom: 1.5rem;
  border-bottom: 3px solid #667eea;
  padding-bottom: 0.5rem;
  display: inline-block;
}

.intro-text {
  font-size: 1.1rem;
  line-height: 1.8;
  color: #555;
  text-align: justify;
}

.episodes-grid {
  display: grid;
  gap: 2rem;
}

.episode-card {
  display: flex;
  background: white;
  border-radius: 15px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.episode-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 15px 40px rgba(0, 0, 0, 0.15);
}

.episode-image {
  width: 150px;
  height: 150px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  flex-shrink: 0;
}

.play-button {
  width: 60px;
  height: 60px;
  background: rgba(255, 255, 255, 0.9);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  color: #667eea;
  cursor: pointer;
  transition: transform 0.3s ease;
}

.play-button:hover {
  transform: scale(1.1);
}

.episode-info {
  padding: 1.5rem;
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.episode-title {
  font-size: 1.3rem;
  color: #2c3e50;
  margin-bottom: 0.5rem;
  font-weight: 600;
}

.episode-description {
  color: #666;
  line-height: 1.6;
  margin-bottom: 1rem;
  flex: 1;
}

.episode-meta {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.9rem;
  color: #888;
}

.episode-date {
  background: rgba(102, 126, 234, 0.1);
  padding: 0.3rem 0.8rem;
  border-radius: 15px;
  color: #667eea;
}

.episode-duration {
  font-weight: 500;
}

.subscribe-section {
  text-align: center;
  padding: 2rem;
  background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
  border-radius: 15px;
}

.subscribe-text {
  font-size: 1.1rem;
  color: #666;
  margin-bottom: 2rem;
}

.platform-links {
  display: flex;
  justify-content: center;
  gap: 1.5rem;
  flex-wrap: wrap;
}

.platform-link {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.8rem 1.5rem;
  background: white;
  border-radius: 25px;
  text-decoration: none;
  color: #2c3e50;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  font-weight: 500;
}

.platform-link:hover {
  transform: translateY(-3px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
}

.platform-icon {
  font-size: 1.2rem;
}

@media (max-width: 768px) {
  .podcast-container {
    padding: 1rem;
  }
  
  .podcast-title {
    font-size: 2.5rem;
  }
  
  .episode-card {
    flex-direction: column;
  }
  
  .episode-image {
    width: 100%;
    height: 120px;
  }
  
  .platform-links {
    flex-direction: column;
    align-items: center;
  }
  
  .platform-link {
    width: 200px;
    justify-content: center;
  }
}
</style>