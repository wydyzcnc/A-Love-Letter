<template>
  <div class="mobile-page">
    <!-- 背景图区域 -->
    <div class="background-section" :style="backgroundStyle">
      <div class="overlay">
        <h1 class="main-title">{{ title }}</h1>
        <p class="description">{{ description }}</p>
      </div>
    </div>

    <!-- 菜单触发按钮 -->
    <div class="menu-toggle" @click="toggleSidebar" :class="{ 'active': isSidebarOpen }">
      <span class="bar" v-for="n in 3" :key="n"></span>
    </div>

    <!-- 右侧侧边栏 -->
    <div class="sidebar" :class="{ 'sidebar-open': isSidebarOpen }">
      <!-- 侧边栏标题 -->
      <div class="sidebar-header">
        <span class="sidebar-title">📋 游戏菜单</span>
        <div class="close-btn" @click="closeSidebar">✕</div>
      </div>

      <!-- 菜单列表 -->
      <ul class="menu-list">
        <li v-for="(item, index) in menuItems" :key="index" @click="handleMenuClick(item)"
          :class="{ 'active-menu': activeMenu === item.action }">
          <span class="menu-icon">{{ item.icon }}</span>
          <span class="menu-label">{{ item.label }}</span>
          <span class="menu-arrow">›</span>
        </li>
      </ul>
    </div>

    <!-- 遮罩 -->
    <div class="overlay-backdrop" v-if="isSidebarOpen" @click="closeSidebar"></div>

    <!-- Toast 提示 -->
    <transition name="toast">
      <div v-if="toastMessage" class="toast">{{ toastMessage }}</div>
    </transition>
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
      backgroundImage: '/static/pic/indexPic.jpg',
      title: '遇见美好',
      description: '每一帧风景，都是时光赠予的诗篇。\n愿你在喧嚣中，寻得内心的宁静。',
      menuItems: [
        {
          label: '俄罗斯方块',
          icon: '🏠',
          action: 'home',
          route: '/home'
        },
        {
          label: '贪吃蛇游戏',
          icon: '🔍',
          action: 'explore',
          route: '/explore'
        },
        {
          label: '消消乐',
          icon: '👤',
          action: 'profile',
          route: '/profile'
        },
        {
          label: '设置',
          icon: '⚙️',
          action: 'settings',
          route: '/settings'
        }
      ],
      isSidebarOpen: false,
      activeMenu: 'home',
      toastMessage: '',
      toastTimer: null
    };
  },
  computed: {
    backgroundStyle() {
      return {
        backgroundImage: `url(${this.backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      };
    }
  },
  beforeDestroy() {
    if (this.toastTimer) {
      clearTimeout(this.toastTimer);
    }
  },
  methods: {
    toggleSidebar() {
      this.isSidebarOpen = !this.isSidebarOpen;
      if (this.isSidebarOpen) {
        document.body.style.overflow = 'hidden';
      } else {
        document.body.style.overflow = '';
      }
    },
    closeSidebar() {
      this.isSidebarOpen = false;
      document.body.style.overflow = '';
    },
    handleMenuClick(item) {
      this.activeMenu = item.action;
      this.showToast(`功能还在建设中...`);
      // this.showToast(`正在跳转到「${item.label}」...`);

      setTimeout(() => {
        // this.showToast(`已进入「${item.label}」页面`);
      }, 800);

      this.closeSidebar();
      this.$emit('menu-click', item);
    },
    showToast(message) {
      if (this.toastTimer) {
        clearTimeout(this.toastTimer);
        this.toastTimer = null;
      }

      this.toastMessage = message;

      this.toastTimer = setTimeout(() => {
        this.toastMessage = '';
        this.toastTimer = null;
      }, 1500);
    }
  }
};
</script>

<style scoped>
/* 全局重置与字体 */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.mobile-page {
  position: relative;
  width: 100%;
  min-height: 100vh;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
  overflow-x: hidden;
  background-color: #f5f7fa;
}

/* ----- 背景图区域 ----- */
.background-section {
  position: relative;
  width: 100%;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  background-size: cover;
  background-position: center;
  transition: background-image 0.3s ease;
}

.overlay {
  background: rgba(0, 0, 0, 0.35);
  backdrop-filter: blur(2px);
  padding: 2rem 1.5rem;
  border-radius: 20px;
  max-width: 85%;
  margin: 0 1rem;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
  border: 1px solid rgba(255, 255, 255, 0.15);
}

.main-title {
  font-size: 2.2rem;
  font-weight: 700;
  color: #ffffff;
  text-shadow: 0 2px 12px rgba(0, 0, 0, 0.5);
  margin-bottom: 0.75rem;
  letter-spacing: 1px;
}

.description {
  font-size: 1.1rem;
  line-height: 1.7;
  color: rgba(255, 255, 255, 0.92);
  text-shadow: 0 1px 8px rgba(0, 0, 0, 0.4);
  max-width: 480px;
  margin: 0 auto;
  font-weight: 400;
}

/* ----- 菜单触发按钮 ----- */
.menu-toggle {
  position: fixed;
  top: 20px;
  right: 20px;
  width: 50px;
  height: 50px;
  background: rgba(255, 255, 255, 0.25);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  border-radius: 50%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 5px;
  cursor: pointer;
  transition: all 0.3s ease;
  border: 2px solid rgba(255, 255, 255, 0.4);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
  z-index: 1001;
}

.menu-toggle:hover {
  background: rgba(255, 255, 255, 0.4);
  transform: scale(1.05);
}

.menu-toggle:active {
  transform: scale(0.92);
}

.menu-toggle .bar {
  display: block;
  width: 26px;
  height: 3px;
  background: #ffffff;
  border-radius: 4px;
  transition: all 0.3s ease;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.15);
}

.menu-toggle.active .bar:nth-child(1) {
  transform: rotate(45deg) translate(5px, 6px);
}

.menu-toggle.active .bar:nth-child(2) {
  opacity: 0;
  transform: scaleX(0);
}

.menu-toggle.active .bar:nth-child(3) {
  transform: rotate(-45deg) translate(5px, -6px);
}

/* ----- 侧边栏（浅色简约风格） ----- */
.sidebar {
  position: fixed;
  top: 0;
  right: 0;
  width: 300px;
  height: 100%;
  background: #ffffff;
  box-shadow: -4px 0 30px rgba(0, 0, 0, 0.08);
  transform: translateX(100%);
  transition: transform 0.35s cubic-bezier(0.4, 0, 0.2, 1);
  z-index: 1000;
  display: flex;
  flex-direction: column;
}

.sidebar-open {
  transform: translateX(0);
}

/* 侧边栏头部 */
.sidebar-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 24px 24px 20px 24px;
  border-bottom: 1px solid #f0f0f0;
  flex-shrink: 0;
}

.sidebar-title {
  font-size: 1.15rem;
  font-weight: 600;
  color: #1a1a2e;
  letter-spacing: 0.3px;
}

.close-btn {
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #999;
  font-size: 1.2rem;
  cursor: pointer;
  border-radius: 50%;
  transition: all 0.2s;
  background: #f5f5f5;
}

.close-btn:hover {
  background: #e8e8e8;
  color: #333;
}

.close-btn:active {
  transform: scale(0.85);
}

/* 菜单列表 */
.menu-list {
  list-style: none;
  padding: 12px 16px;
  margin: 0;
  flex: 1;
  overflow-y: auto;
}

.menu-list li {
  display: flex;
  align-items: center;
  padding: 14px 18px;
  margin: 2px 0;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.2s ease;
  color: #333;
  font-size: 1rem;
  font-weight: 500;
  position: relative;
}

.menu-list li:hover {
  background: #f5f7fa;
}

.menu-list li:active {
  transform: scale(0.97);
  background: #eef1f5;
}

/* 菜单激活状态 */
.menu-list li.active-menu {
  background: #eef3ff;
  color: #4a7cf7;
}

.menu-list li.active-menu .menu-icon {
  transform: scale(1.05);
}

.menu-list li.active-menu .menu-arrow {
  color: #4a7cf7;
  opacity: 1;
}

.menu-list li .menu-icon {
  margin-right: 14px;
  font-size: 1.3rem;
  width: 28px;
  text-align: center;
  flex-shrink: 0;
  transition: transform 0.2s;
}

.menu-list li .menu-label {
  flex: 1;
}

.menu-list li .menu-arrow {
  color: #ccc;
  font-size: 1.1rem;
  transition: all 0.2s;
  opacity: 0.6;
}

.menu-list li:hover .menu-arrow {
  color: #999;
  opacity: 1;
  transform: translateX(3px);
}

/* 遮罩 */
.overlay-backdrop {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.3);
  z-index: 999;
  animation: fadeIn 0.25s ease;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
}

/* ----- Toast 提示 ----- */
.toast {
  position: fixed;
  bottom: 80px;
  left: 50%;
  transform: translateX(-50%);
  background: rgba(0, 0, 0, 0.8);
  backdrop-filter: blur(8px);
  color: #ffffff;
  padding: 12px 24px;
  border-radius: 12px;
  font-size: 0.95rem;
  font-weight: 500;
  z-index: 2000;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
  border: 1px solid rgba(255, 255, 255, 0.06);
  max-width: 80%;
  text-align: center;
  animation: slideUp 0.3s ease;
}

.toast-enter-active,
.toast-leave-active {
  transition: all 0.3s ease;
}

.toast-enter {
  transform: translateX(-50%) translateY(20px);
  opacity: 0;
}

.toast-leave-to {
  transform: translateX(-50%) translateY(20px);
  opacity: 0;
}

@keyframes slideUp {
  from {
    transform: translateX(-50%) translateY(20px);
    opacity: 0;
  }

  to {
    transform: translateX(-50%) translateY(0);
    opacity: 1;
  }
}

/* ----- 响应式适配 ----- */
@media (max-width: 480px) {
  .main-title {
    font-size: 1.8rem;
  }

  .description {
    font-size: 0.95rem;
    line-height: 1.6;
  }

  .overlay {
    padding: 1.5rem 1rem;
    max-width: 92%;
  }

  .sidebar {
    width: 280px;
  }

  .menu-toggle {
    width: 44px;
    height: 44px;
    top: 16px;
    right: 16px;
  }

  .menu-toggle .bar {
    width: 22px;
    height: 2.5px;
  }

  .sidebar-header {
    padding: 20px 20px 16px 20px;
  }

  .sidebar-title {
    font-size: 1rem;
  }

  .menu-list {
    padding: 8px 12px;
  }

  .menu-list li {
    padding: 12px 16px;
    font-size: 0.9rem;
  }

  .menu-list li .menu-icon {
    font-size: 1.1rem;
    width: 24px;
  }

  .toast {
    font-size: 0.85rem;
    padding: 10px 18px;
    bottom: 60px;
  }
}

@media (min-width: 481px) and (max-width: 768px) {
  .sidebar {
    width: 320px;
  }
}

/* 触摸设备优化 */
@media (hover: none) {
  .menu-list li:hover {
    background: transparent;
  }

  .menu-list li:active {
    background: #f0f2f5;
    transform: scale(0.97);
  }
}</style>