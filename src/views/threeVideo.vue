<template>
    <div>
        <h1 style="text-align: center;color: #fff;">Three.js 视频</h1>
        <button @click="startVideo" class="play-btn">点击播放视频</button>
    </div>
    <div id="container"></div>
</template>


<script setup lang="ts">
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { onMounted, onBeforeUnmount, ref } from 'vue';

// 引入视频资源
import greenScreenVideo from '@/assets/tips.mp4';
class ThreeVideo {
    scene: THREE.Scene;
    camera: THREE.PerspectiveCamera;
    renderer: THREE.WebGLRenderer;
    controls: OrbitControls;
    videoPlane: THREE.Mesh | null;
    videoTexture: THREE.VideoTexture | null;
    video: HTMLVideoElement | null;
    animationId: number | null;
    
    constructor() {
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        this.renderer = new THREE.WebGLRenderer({ 
            antialias: true, 
            alpha: true,
            powerPreference: "high-performance",
            preserveDrawingBuffer: true // 对iOS有帮助
        });
        this.controls = null;
        this.videoPlane = null;
        this.videoTexture = null;
        this.video = null;
        this.animationId = null;
        
        this.init();
    }
    
    init() {
        this.createScene();
        this.setupLights();
        this.setupControls();
        this.setupEventListeners();
        this.animate();
    }
    
    createScene() {
        const container = document.getElementById('container');
        if (!container) return;
        
        // 设置渲染器
        this.renderer.setPixelRatio(window.devicePixelRatio);
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.setClearColor(0x000000, 0); // 透明背景
        container.appendChild(this.renderer.domElement);
        
        // 设置相机位置
        this.camera.position.set(0, 0, 5);
        this.camera.lookAt(0, 0, 0);
        
        // 添加环境光和方向光
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
        this.scene.add(ambientLight);
    }
    
    setupLights() {
        // 添加方向光
        const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
        directionalLight.position.set(1, 1, 1);
        this.scene.add(directionalLight);
    }
    
    setupControls() {
        // 添加轨道控制器
        this.controls = new OrbitControls(this.camera, this.renderer.domElement);
        this.controls.enableDamping = true;
        this.controls.dampingFactor = 0.05;
    }
    
    setupEventListeners() {
        // 监听窗口大小变化
        window.addEventListener('resize', this.onWindowResize.bind(this));
    }
    
    onWindowResize() {
        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(window.innerWidth, window.innerHeight);
    }
    
    animate() {
        this.animationId = requestAnimationFrame(this.animate.bind(this));
        
        if (this.controls) {
            this.controls.update();
        }
        
        if (this.videoTexture && this.video && !this.video.paused) {
            this.videoTexture.needsUpdate = true;
        }
        
        this.renderer.render(this.scene, this.camera);
    }
    
    createVideo(src = 'https://media.w3.org/2010/05/sintel/trailer.webm') {
        const video = document.createElement('video');
        video.src = src;
        video.loop = true;
        video.muted = true;
        video.playsInline = true;
        video.crossOrigin = 'anonymous';
        video.setAttribute('playsinline', '');
        video.setAttribute('webkit-playsinline', '');
        video.muted = true;
        video.play().catch(e => console.error('视频播放失败:', e));

        // 添加更详细的日志
        video.addEventListener('canplay', () => {
            console.log('视频可以播放');
        });
        
        // 检查WebGL支持
        if (!this.renderer.capabilities.isWebGL2) {
            console.warn('设备不支持WebGL2，使用兼容模式');
        }

        return video;
    }
    
    removeCurrentVideo() {
        if (this.videoPlane) {
            this.scene.remove(this.videoPlane);
        }
        
        if (this.video) {
            this.video.pause();
            this.video.src = '';
        }
        
        this.videoPlane = null;
        this.videoTexture = null;
        this.video = null;
    }
    
    addGreenScreenVideo(options: { 
        src?: string; 
        position?: any; 
        rotation?: any; 
        scale?: any;
    }) {
        // 先移除当前视频（如果有）
        this.removeCurrentVideo();
        
        const { src = '', position = [0, 0, 0], rotation = [0, 0, 0], scale = [1, 1, 1] } = options;
        
        // 创建视频元素
        const video = document.createElement('video');
        video.src = src;
        video.loop = false;
        video.muted = true; // 初始静音，iOS要求必须静音才能自动播放
        video.playsInline = true;
        video.crossOrigin = 'anonymous';
        video.setAttribute('playsinline', '');
        video.setAttribute('webkit-playsinline', '');
        // 设置音量为最大
        video.volume = 1.0;
        
        // 保存视频引用
        this.video = video;
        
        console.log('开始加载视频:', src);
        
        // 添加音频相关事件监听
        video.addEventListener('volumechange', () => {
            console.log('视频音量变化:', video.volume, '静音状态:', video.muted);
        });
        
        // 在成功播放后尝试启用声音
        const startPlayback = () => {
            console.log('尝试播放视频');
            // 先尝试静音播放
            const playPromise = video.play();
            
            if (playPromise !== undefined) {
                playPromise.then(() => {
                    console.log('视频开始播放，尝试启用声音');
                    
                    // 使用定时器延迟取消静音，iOS上可能更可靠
                    setTimeout(() => {
                        video.muted = false;
                        console.log('取消静音');
                        
                        // 再次尝试调整音量
                        video.volume = 1.0;
                        console.log('音量设置为:', video.volume);
                        
                        // iOS可能需要用户交互才能启用音频
                        console.log('如果仍无声音，请点击页面或控制按钮');
                    }, 1000);
                })
                .catch(error => {
                    console.error('视频播放失败:', error);
                    // 可能是权限问题，需要用户交互
                    console.log('可能需要用户交互才能播放视频');
                });
            }
        };
        
        // 在元数据加载后创建纹理
        video.addEventListener('loadedmetadata', () => {
            console.log(`视频元数据已加载: ${video.videoWidth} x ${video.videoHeight}`);
            
            // 计算视频宽高比
            const aspectRatio = video.videoWidth / video.videoHeight;
            console.log(`视频宽高比: ${aspectRatio}`);
            
            // 创建平面几何体
            const width = 1;
            const height = width / aspectRatio;
            const geometry = new THREE.PlaneGeometry(width, height);
            
            // 创建视频纹理
            const videoTexture = new THREE.VideoTexture(video);
            videoTexture.minFilter = THREE.LinearFilter;
            videoTexture.magFilter = THREE.LinearFilter;
            videoTexture.format = THREE.RGBAFormat;
            
            // 关闭测试模式，使用着色器材质处理绿幕
            const testMode = false;
            
            let videoMaterial;
            if (testMode) {
                // 基本材质，用于测试
                videoMaterial = new THREE.MeshBasicMaterial({ 
                    map: videoTexture,
                    transparent: true
                });
            } else {
                // 自定义着色器材质，处理绿幕
                videoMaterial = new THREE.ShaderMaterial({
                    uniforms: {
                        videoTexture: { value: videoTexture },
                        removeGreenScreen: { value: true }, // 始终启用绿幕效果
                    },
                    vertexShader: `
                        varying vec2 vUv;
                        void main() {
                            vUv = uv;
                            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
                        }
                    `,
                    fragmentShader: `
                        uniform sampler2D videoTexture;
                        uniform bool removeGreenScreen;
                        varying vec2 vUv;
                        
                        void main() {
                            vec4 color = texture2D(videoTexture, vUv);
                            
                            if (removeGreenScreen) {
                                // 检测绿幕
                                float greenStrength = color.g;
                                float redRatio = color.r / color.g;
                                float blueRatio = color.b / color.g;
                                
                                // 检测黄色区域（可选）
                                bool isYellowBubble = (
                                    color.r > 0.6 && 
                                    color.g > 0.6 && 
                                    color.b < 0.4 && 
                                    abs(color.r - color.g) < 0.1
                                );

                                if (isYellowBubble) {
                                    // 保持黄色，但使其半透明
                                    gl_FragColor = vec4(color.r, color.g, color.b, 0.7);
                                } else if (greenStrength > 0.30 &&    // 降低绿色强度阈值
                                    redRatio < 0.90 &&         // 增加红色比例容忍度
                                    blueRatio < 0.90 &&        // 增加蓝色比例容忍度
                                    color.r < 0.55 &&          // 增加红色容忍度
                                    color.b < 0.55) {          // 增加蓝色容忍度
                                    // 完全透明的绿幕
                                    gl_FragColor = vec4(0.0, 0.0, 0.0, 0.0);
                                } else {
                                    // 其他部分保持不变
                                    gl_FragColor = vec4(color.rgb, 1.0);
                                }
                            } else {
                                gl_FragColor = vec4(color.rgb, 1.0);
                            }
                        }
                    `,
                    transparent: true,
                    side: THREE.DoubleSide,
                    depthTest: false,
                    depthWrite: false,
                });
            }
            
            // 创建平面
            const videoPlane = new THREE.Mesh(geometry, videoMaterial);
            
            // 调整位置、旋转和缩放
            videoPlane.position.set(...position);
            videoPlane.rotation.set(...rotation);
            
            // 统一缩放
            const uniformScale = typeof scale === 'number' ? scale : scale[0];
            videoPlane.scale.set(uniformScale, uniformScale, 1);
            
            // 添加到场景
            this.scene.add(videoPlane);
            
            // 保存引用
            this.videoPlane = videoPlane;
            this.videoTexture = videoTexture;
            
            // 开始播放
            startPlayback();
        });
        
        // 添加更多诊断事件监听
        video.addEventListener('canplay', () => console.log('视频可以播放'));
        video.addEventListener('playing', () => console.log('视频正在播放中'));
        video.addEventListener('error', (e) => console.error('视频错误:', e));
        
        // 强调用户必须点击按钮
        console.log('请确保用户点击播放按钮以激活iOS上的视频播放');
        
        return { video };
    }
    
    // 清理资源
    dispose() {
        if (this.animationId) {
            cancelAnimationFrame(this.animationId);
        }
        
        this.removeCurrentVideo();
        
        if (this.controls) {
            this.controls.dispose();
        }
        
        window.removeEventListener('resize', this.onWindowResize.bind(this));
        
        const container = document.getElementById('container');
        if (container && this.renderer) {
            container.removeChild(this.renderer.domElement);
        }
    }
}

// 创建实例并在组件挂载后初始化
let threeVideoInstance: ThreeVideo | null = null;

onMounted(() => {
    threeVideoInstance = new ThreeVideo();
    console.log('Three.js场景已初始化，等待用户点击播放按钮');
});

onBeforeUnmount(() => {
    if (threeVideoInstance) {
        threeVideoInstance.dispose();
        threeVideoInstance = null;
    }
});

// 暴露给模板使用
const playGreenScreenVideo = (src: string, position: any = [0, 0, 0], rotation: any = [0, 0, 0], scale: any = [1, 1, 1]) => {
    if (threeVideoInstance) {
        threeVideoInstance.addGreenScreenVideo({ src, position, rotation, scale });
    }
};

const videoStarted = ref(false);

// 添加解锁音频的函数
const unlockAudio = () => {
    console.log('尝试解锁音频');
    
    if (threeVideoInstance && threeVideoInstance.video) {
        // 取消静音
        threeVideoInstance.video.muted = false;
        
        // 设置音量
        threeVideoInstance.video.volume = 1.0;
        console.log('音频已解锁，音量设置为:', threeVideoInstance.video.volume);
    }
};

// 添加播放触发函数
const startVideo = () => {
    console.log('用户点击播放按钮');
    if (threeVideoInstance) {
        videoStarted.value = true;
        
        // 移除当前视频（如果有）
        if (threeVideoInstance.video) {
            threeVideoInstance.removeCurrentVideo();
        }
        
        // 添加新视频
        threeVideoInstance.addGreenScreenVideo({
            src: greenScreenVideo,
            position: [0, 0, 0],
            rotation: [0, 0, 0],
            scale: 2
        });
        
        // 添加一个延时解锁音频
        setTimeout(unlockAudio, 1500);
    }
};
</script>


<style scoped>
#container {
    width: 100%;
    height: 80vh;
    background-color: #f5f5f5; /* 更改为浅灰色便于调试 */
}

.play-btn {
    padding: 12px 24px;
    background-color: #4CAF50;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    margin: 15px auto;
    display: block;
    font-size: 16px;
    font-weight: bold;
    box-shadow: 0 4px 8px rgba(0,0,0,0.2);
}

.play-btn:hover {
    background-color: #45a049;
}
</style>
