<template>
	<div class="romantic-container">
		<!-- 背景层：星空与草地 -->
		<div class="scene-bg">
			<div class="stars-container">
				<div v-for="(star, index) in stars" :key="index" class="star" :style="{
					left: star.x + '%',
					top: star.y + '%',
					animationDelay: star.delay + 's',
					animationDuration: star.duration + 's'
				}"></div>
			</div>
			<div class="moon"></div>
			<div class="grass"></div>
		</div>

		<!-- 角色层 -->
		<div class="characters-wrapper">
			<img :src="objectData.bgMsgL" class="character male" alt="布布" />
			<img :src="objectData.bgMsgR" class="character female" alt="一二" />
			<div class="hearts-container">
				<div class="heart heart1">❤️</div>
				<div class="heart heart2">❤️</div>
				<div class="heart heart3">❤️</div>
			</div>
		</div>

		<!-- 告白文字气泡层 -->
		<transition name="fade-msg">
			<div class="message-box">
				<div class="msg-content">
					<h3>💌 {{ this.objectData.title }}</h3>
					<p>{{ displayText }}</p>
					<span class="cursor" v-if="!isTypingComplete">|</span>
				</div>
			</div>
		</transition>

		<!-- 🎆 升级版浪漫烟花层 -->
		<div class="fireworks-container" v-if="particles.length > 0" style="pointer-events: none;">
			<div v-for="particle in particles" :key="particle.id" class="particle romantic-particle" :style="{
				left: particle.x,
				top: particle.y,
				width: particle.size,
				height: particle.size,
				background: particle.color,
				boxShadow: `0 0 8px 2px ${particle.color}`,
				'--dx': particle.dx,
				'--dy': particle.dy,
				animationDelay: particle.delay
			}"></div>
			<!-- 烟花中心逐层扩散的闪爆光圈 -->
			<div v-for="(flash, index) in flashes" :key="flash.id" class="flash-ring" :style="{
				left: flash.x,
				top: flash.y,
				animationDelay: flash.delay,
				background: `radial-gradient(circle, ${flash.ringColor} 0%, rgba(255,255,255,0) 70%)`
			}"></div>
		</div>

		<!-- 背景音乐层 -->
		<!-- <audio ref="bgMusic" :src="objectData.musicSrc" preload="auto" @ended="handleMusicEnded"> -->
		<audio ref="bgMusic" src="/static/mp3/qixi.mp3" preload="auto" @ended="handleMusicEnded">
			您的浏览器不支持音频播放。
		</audio>


	</div>
</template>

<script>
import { Flexbox, FlexboxItem, XImg } from 'vux'

export default {
	mounted() {
		this.stars = Array.from({ length: 120 }, () => ({
			x: Math.random() * 100,
			y: Math.random() * 70,
			delay: Math.random() * 5,
			duration: 1.5 + Math.random() * 2
		}));

		this.loadDetail(); // 加载数据
	},

	beforeDestroy() {
		if (this.typingTimer) clearTimeout(this.typingTimer);
		if (this.fireworksTimer) clearTimeout(this.fireworksTimer);
		if (this.$refs.bgMusic) this.$refs.bgMusic.pause();
	},

	data() {
		return {
			isTypingComplete: false, // 展示动态打印
			displayText: '', // 动态打印内容
			stars: [],
			typingTimer: null,

			// 🎆 烟花数据
			particles: [],
			flashes: [],
			fireworksTimer: null,
			fireworkQueue: [], // 用于逐次发射烟花
			objectData: {
				title: '', // 标题
				fullMessage: '', // 祝福语内容
				musicSrc: '', // 音频路径
			}
		}
	},

	methods: {
		loadDetail() {
			let self = this;
			let targetId = this.$route.params.activityId;
			this.baseAjax({
				url: '/static/basicData/activityDetail.json',
				showLoading: true,
				success: function (data) {
					// 使用find方法找到id对应的对象
					const result = data.returnObject.find(item => item.id == targetId);
					self.objectData = result // 赋值

					self.newTitleName() //设置标题

					// 播放音频
					self.startScene();
				}
			})
		},

		newTitleName: function () {
			this.$store.commit('UPDATE_PAGE_TITLE', this.objectData.title);
		},

		startScene() { // 音频播放
			const audio = this.$refs.bgMusic;
			audio.play().catch(e => console.log('音频播放需用户交互:', e));

			setTimeout(() => {
				this.typeMessage();
			}, 1500);
		},

		typeMessage() {
			let index = 0;
			this.displayText = '';
			this.isTypingComplete = false;
			const self = this;

			function typing() {
				if (index < self.objectData.fullMessage.length) {
					self.displayText += self.objectData.fullMessage[index];
					index++;
					self.typingTimer = setTimeout(typing, 80);
				} else {
					self.isTypingComplete = true;
				}
			}
			typing();
		},

		// 🎆 音乐结束时触发多次浪漫烟花雨
		handleMusicEnded() {
			// 重置队列，连续燃放6发，每发间隔 0.6 秒
			this.fireworkQueue = [];
			for (let i = 0; i < 20; i++) {
				this.fireworkQueue.push(i);
			}
			this.processFireworkQueue();
		},

		processFireworkQueue() {
			if (this.fireworkQueue.length === 0) {
				// 全部烟花燃放完毕后，再保持几秒消散时间
				this.fireworksTimer = setTimeout(() => {
					this.particles = [];
					this.flashes = [];
				}, 4500);
				return;
			}

			const currentBatch = this.fireworkQueue.shift();
			this.launchSingleFirework();

			// 间隔600毫秒发射下一发，让烟花形成连绵不断的感觉
			setTimeout(() => {
				this.processFireworkQueue();
			}, 600);
		},

		launchSingleFirework() {
			// 浪漫温婉的色调组合：香槟金、樱花粉、薰衣草紫、月光蓝
			const colors = ['#FFD700', '#FFB6C1', '#FF69B4', '#E6A8D7', '#87CEFA', '#FFA07A', '#FFFACD'];
			const newParticles = [];
			const newFlashes = [];

			// 随机爆炸中心
			const centerX = (15 + Math.random() * 70) + 'vw';
			const centerY = (25 + Math.random() * 35) + 'vh';
			// 爆炸主色调
			const mainColor = colors[Math.floor(Math.random() * colors.length)];

			// 添加闪爆光圈 (白-中心色)
			newFlashes.push({
				id: `flash-${Date.now()}-${Math.random()}`,
				x: centerX,
				y: centerY,
				delay: '0s',
				ringColor: mainColor
			});

			// 一个爆炸点生成 38 个粒子
			for (let j = 0; j < 38; j++) {
				const angle = Math.random() * 2 * Math.PI;
				// 随机爆炸威力，形成不规则的漂亮烟花形状
				const distance = 40 + Math.random() * 130;
				const size = 5 + Math.random() * 8;

				// 颜色：主色调混合亮白
				const color = Math.random() > 0.6 ? '#ffffff' : mainColor;

				newParticles.push({
					id: `p-${Date.now()}-${j}-${Math.random()}`,
					x: centerX,
					y: centerY,
					dx: Math.cos(angle) * distance + 'px',
					dy: Math.sin(angle) * distance + 'px',
					color: color,
					size: size + 'px',
					delay: (Math.random() * 0.15) + 's' // 引爆有微弱的先后顺序
				});
			}

			// 追加到当前粒子上，而不是直接覆盖，使烟花层层叠加更华丽
			this.particles = [...this.particles, ...newParticles];
			this.flashes = [...this.flashes, ...newFlashes];
		}
	},

	components: {
		Flexbox, FlexboxItem, XImg
	}
}
</script>
<style scoped>
* {
	margin: 0;
	padding: 0;
	box-sizing: border-box;
}

.romantic-container {
	position: relative;
	width: 100vw;
	height: 100vh;
	overflow: hidden;
	background: linear-gradient(180deg, #0F0C29 0%, #302B63 50%, #24243E 100%);
	font-family: 'PingFang SC', 'Helvetica Neue', Helvetica, Arial, sans-serif;
	touch-action: pan-y;
}

/* 背景层 */
.scene-bg {
	position: absolute;
	width: 100%;
	height: 100%;
	top: 0;
	left: 0;
	z-index: 1;
}

.stars-container {
	position: absolute;
	width: 100%;
	height: 70%;
	top: 0;
}

.star {
	position: absolute;
	width: 3px;
	height: 3px;
	background: #fff;
	border-radius: 50%;
	box-shadow: 0 0 4px 1px rgba(255, 255, 255, 0.6);
	animation: twinkle ease-in-out infinite alternate;
}

@keyframes twinkle {
	0% {
		opacity: 0.2;
		transform: scale(0.8);
	}

	100% {
		opacity: 1;
		transform: scale(1.2);
	}
}

.moon {
	position: absolute;
	top: 10%;
	right: 15%;
	width: 8vw;
	height: 8vw;
	max-width: 60px;
	max-height: 60px;
	background: #FDFCE5;
	border-radius: 50%;
	box-shadow: 0 0 40px 10px rgba(255, 255, 200, 0.5);
	animation: moonGlow 4s ease-in-out infinite alternate;
}

@keyframes moonGlow {
	0% {
		box-shadow: 0 0 40px 10px rgba(255, 255, 200, 0.5);
	}

	100% {
		box-shadow: 0 0 80px 20px rgba(255, 255, 200, 0.9);
	}
}

.grass {
	position: absolute;
	bottom: 0;
	left: 0;
	width: 100%;
	height: 35%;
	background: linear-gradient(to top, #2E8B57, #3CB371);
	border-radius: 50% 50% 0 0 / 20% 20% 0 0;
	transform: scaleX(1.5);
	transform-origin: bottom center;
	opacity: 0.8;
}

/* 角色层 */
.characters-wrapper {
	position: absolute;
	bottom: 10vh;
	width: 100%;
	height: 50vh;
	z-index: 10;
	display: flex;
	justify-content: center;
	align-items: flex-end;
	gap: 5vw;
}

.character {
	width: 28vw;
	max-width: 130px;
	height: auto;
	object-fit: contain;
	filter: drop-shadow(0 10px 10px rgba(0, 0, 0, 0.3));
	animation: floatUp 1.2s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards, floatBreath 4s ease-in-out infinite alternate 1.2s;
}

.male {
	transform-origin: bottom;
	animation-delay: 0.1s;
}

.female {
	transform-origin: bottom;
	animation-delay: 0.4s;
}

@keyframes floatUp {
	0% {
		transform: translateY(100px) scale(0.8);
		opacity: 0;
	}

	100% {
		transform: translateY(0) scale(1);
		opacity: 1;
	}
}

@keyframes floatBreath {
	0% {
		transform: translateY(0px) rotate(-1deg);
	}

	100% {
		transform: translateY(-8px) rotate(1deg);
	}
}

/* 漂浮的心 */
.hearts-container {
	position: absolute;
	top: 0;
	width: 100%;
	height: 100%;
	pointer-events: none;
}

.heart {
	position: absolute;
	font-size: 1.2rem;
	animation: floatHeart 6s linear infinite;
	opacity: 0;
}

.heart1 {
	left: 20%;
	top: 30%;
	animation-delay: 0s;
}

.heart2 {
	left: 70%;
	top: 40%;
	animation-delay: 2s;
	font-size: 1.8rem;
}

.heart3 {
	left: 45%;
	top: 10%;
	animation-delay: 4s;
	font-size: 2rem;
}

@keyframes floatHeart {
	0% {
		transform: translateY(0) scale(0.5);
		opacity: 0;
	}

	20% {
		opacity: 0.8;
	}

	100% {
		transform: translateY(-200px) scale(1.2);
		opacity: 0;
	}
}

/* 文字气泡 */
.message-box {
	position: absolute;
	bottom: 25vh;
	left: 50%;
	transform: translateX(-50%);
	z-index: 20;
	width: 85vw;
	max-width: 400px;
	background: rgba(255, 255, 255, 0.12);
	backdrop-filter: blur(12px);
	-webkit-backdrop-filter: blur(12px);
	border: 1px solid rgba(255, 255, 255, 0.2);
	border-radius: 20px;
	padding: 20px 24px;
	box-shadow: 0 8px 32px rgba(0, 0, 0, 0.4);
	text-align: center;
}

.msg-content h3 {
	color: #FFDAB9;
	font-size: 1.1rem;
	margin-bottom: 10px;
	letter-spacing: 1px;
}

.msg-content p {
	text-indent: 2.3em;
	color: #fff;
	font-size: 1rem;
	line-height: 1.6;
	letter-spacing: 0.5px;
	text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
	margin: 0;
}

.cursor {
	color: #FFD700;
	font-weight: bold;
	animation: blink 1s infinite;
}

@keyframes blink {

	0%,
	100% {
		opacity: 1;
	}

	50% {
		opacity: 0;
	}
}

.fade-msg-enter-active,
.fade-msg-leave-active {
	transition: all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}

.fade-msg-enter,
.fade-msg-leave-to {
	opacity: 0;
	transform: translateX(-50%) translateY(30px);
}

/* 🎆 浪漫烟花层（配合重力和长拖尾） */
.fireworks-container {
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	z-index: 15;
	overflow: hidden;
	pointer-events: none;
}

/* 烟花粒子 - 带有重力下落效果，停留时间非常久 (4s) */
.romantic-particle {
	position: absolute;
	border-radius: 50%;
	animation: explodeRomantic 4s cubic-bezier(0.4, 0, 0.2, 1) forwards;
	will-change: transform, opacity;
}

@keyframes explodeRomantic {
	0% {
		transform: translate(0, 0) scale(1);
		opacity: 1;
	}

	40% {
		transform: translate(var(--dx), var(--dy)) scale(0.8);
		opacity: 1;
	}

	/* 爆炸到最高点 */
	100% {
		transform: translate(calc(var(--dx) * 1.1), calc(var(--dy) * 1.6 + 200px)) scale(0.2);
		opacity: 0;
	}

	/* 飘落收尾 */
}

/* 烟花闪爆光圈 */
.flash-ring {
	position: absolute;
	width: 10vw;
	height: 10vw;
	max-width: 80px;
	max-height: 80px;
	border-radius: 50%;
	transform: translate(-50%, -50%) scale(0);
	animation: flashBoomRomantic 0.8s ease-out forwards;
}

@keyframes flashBoomRomantic {
	0% {
		transform: translate(-50%, -50%) scale(0);
		opacity: 1;
	}

	100% {
		transform: translate(-50%, -50%) scale(4);
		opacity: 0;
	}
}

/* 启动按钮 */
.start-btn {
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	display: flex;
	justify-content: center;
	align-items: center;
	background: rgba(0, 0, 0, 0.6);
	z-index: 100;
	cursor: pointer;
}

.start-btn span {
	display: block;
	padding: 16px 32px;
	background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
	color: #fff;
	border-radius: 50px;
	font-size: 1.2rem;
	font-weight: bold;
	letter-spacing: 2px;
	box-shadow: 0 4px 15px rgba(245, 87, 108, 0.4);
	animation: pulseBtn 1.5s infinite;
}

@keyframes pulseBtn {
	0% {
		transform: scale(1);
		box-shadow: 0 0 0 0 rgba(245, 87, 108, 0.7);
	}

	70% {
		transform: scale(1.05);
		box-shadow: 0 0 0 15px rgba(245, 87, 108, 0);
	}

	100% {
		transform: scale(1);
		box-shadow: 0 0 0 0 rgba(245, 87, 108, 0);
	}
}

.fade-btn-enter-active,
.fade-btn-leave-active {
	transition: opacity 0.8s;
}

.fade-btn-enter,
.fade-btn-leave-to {
	opacity: 0;
}
</style>