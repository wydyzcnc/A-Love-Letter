<template>
  <div class="page-container">
    <!-- 背景图层 -->
    <div class="background-layer"></div>
    <!-- 文字内容 -->
    <div class="content">
      <h1 class="title">{{ title }}</h1>
      <p class="description">{{ description }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'mine',
  mounted() {
		this.$store.commit('UPDATE_PAGE_TITLE', '首页');
	},
  data() {
    return {
      title: '遇见美好',
      description: '每一帧风景，都是时光赠予的诗篇。\n愿你在喧嚣中，寻得内心的宁静。'
    };
  }
};
</script>

<style scoped>
/* 重置内外边距，确保全屏适配 */
.page-container {
  position: relative;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0;
  padding: 0;
}

/* 背景图：使用 CSS 背景，支持手机屏幕比例 */
.background-layer {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url('/static/pic/indexPic.jpg');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  filter: brightness(0.75) saturate(1.1);
  z-index: 0;
}

/* 文字内容：居中，带半透明遮罩增强可读性 */
.content {
  position: relative;
  z-index: 1;
  max-width: 80%;
  padding: 24px 30px;
  text-align: center;
  background: rgba(0, 0, 0, 0.35);
  backdrop-filter: blur(6px);
  -webkit-backdrop-filter: blur(6px);
  border-radius: 20px;
  border: 1px solid rgba(255, 255, 255, 0.15);
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.2);
  animation: fadeUp 0.8s ease-out;
}

.title {
  font-family: 'Georgia', 'Times New Roman', serif;
  font-size: 2rem;
  font-weight: 700;
  color: #ffffff;
  text-shadow: 0 2px 12px rgba(0, 0, 0, 0.3);
  margin-bottom: 12px;
  letter-spacing: 2px;
}

.description {
  font-family: 'PingFang SC', 'Microsoft YaHei', sans-serif;
  font-size: 1rem;
  line-height: 1.8;
  color: rgba(255, 255, 255, 0.92);
  text-shadow: 0 1px 8px rgba(0, 0, 0, 0.2);
  white-space: pre-line; /* 保留换行符 */
  margin: 0;
}

/* 淡入动画 */
@keyframes fadeUp {
  from {
    opacity: 0;
    transform: translateY(30px) scale(0.96);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

/* ===== 手机端适配 ===== */
@media (max-width: 480px) {
  .content {
    max-width: 88%;
    padding: 20px 22px;
    border-radius: 16px;
  }
  .title {
    font-size: 1.6rem;
  }
  .description {
    font-size: 0.9rem;
    line-height: 1.7;
  }
}

@media (max-width: 380px) {
  .content {
    padding: 16px 18px;
  }
  .title {
    font-size: 1.3rem;
  }
  .description {
    font-size: 0.8rem;
  }
}

/* 针对横屏或平板，限制最大高度 */
@media (min-width: 768px) {
  .page-container {
    height: 100vh;
  }
  .content {
    max-width: 60%;
    padding: 36px 48px;
  }
  .title {
    font-size: 2.8rem;
  }
  .description {
    font-size: 1.2rem;
  }
}
</style>