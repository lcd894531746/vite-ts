import * as THREE from 'three';

/**
 * 绿幕视频播放器类
 * 
 * 这个类用于在Three.js场景中添加带有绿幕效果的视频。
 * 它会管理视频的加载、播放和绿幕处理。
 * 
 * @author Claude 3.7 Sonnet
 * @version 1.0.0
 */
export class GreenScreenVideoPlayer {
    /**
     * 构造函数
     * @param scene - Three.js场景
     */
    constructor(scene) {
        // 引用外部资源
        this.scene = scene;
        
        // 内部状态
        this.videoPlane = null;
        this.videoTexture = null;
        this.video = null;
        
        // 默认绿幕配置
        this.config = {
            greenScreenThreshold: 0.30,
            redRatioThreshold: 0.90,
            blueRatioThreshold: 0.90,
            redThreshold: 0.55,
            blueThreshold: 0.55
        };
    }
    
    /**
     * 加载并播放绿幕视频
     * @param options - 视频配置选项
     * @returns 返回视频元素引用
     */
    loadVideo(options) {
        // 先移除当前视频（如果有）
        this.removeVideo();
        
        // 提取并设置默认值
        const { 
            src, 
            position = [0, 0, 0], 
            rotation = [0, 0, 0], 
            scale = 1,
            loop = false,
            muted = true,
            autoplay = false,
            onLoad,
            onPlay,
            onEnd,
            greenScreenConfig = {}
        } = options;
        
        // 更新绿幕配置
        if (greenScreenConfig) {
            this.config = { ...this.config, ...greenScreenConfig };
        }
        
        // 创建视频元素
        const video = document.createElement('video');
        video.src = src;
        video.loop = loop;
        video.muted = muted; // iOS要求必须静音才能自动播放
        video.playsInline = true;
        video.crossOrigin = 'anonymous';
        video.setAttribute('playsinline', '');
        video.setAttribute('webkit-playsinline', '');
        video.volume = 1.0;
        
        // 保存视频引用
        this.video = video;
        
        console.log('开始加载视频:', src);
        
        // 添加音频相关事件监听
        video.addEventListener('volumechange', () => {
            console.log('视频音量变化:', video.volume, '静音状态:', video.muted);
        });
        
        // 播放结束事件
        if (onEnd) {
            video.addEventListener('ended', onEnd);
        }
        
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
            
            // 自定义着色器材质，处理绿幕
            const videoMaterial = new THREE.ShaderMaterial({
                uniforms: {
                    videoTexture: { value: videoTexture },
                    removeGreenScreen: { value: true },
                    greenScreenThreshold: { value: this.config.greenScreenThreshold },
                    redRatioThreshold: { value: this.config.redRatioThreshold },
                    blueRatioThreshold: { value: this.config.blueRatioThreshold },
                    redThreshold: { value: this.config.redThreshold },
                    blueThreshold: { value: this.config.blueThreshold }
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
                    uniform float greenScreenThreshold;
                    uniform float redRatioThreshold;
                    uniform float blueRatioThreshold;
                    uniform float redThreshold;
                    uniform float blueThreshold;
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
                            } else if (greenStrength > greenScreenThreshold &&
                                redRatio < redRatioThreshold &&
                                blueRatio < blueRatioThreshold &&
                                color.r < redThreshold &&
                                color.b < blueThreshold) {
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
            
            // 创建平面
            const videoPlane = new THREE.Mesh(geometry, videoMaterial);
            
            // 设置位置、旋转和缩放
            if (position instanceof THREE.Vector3) {
                videoPlane.position.copy(position);
            } else {
                videoPlane.position.set(...position);
            }
            
            if (rotation instanceof THREE.Euler) {
                videoPlane.rotation.copy(rotation);
            } else {
                videoPlane.rotation.set(...rotation);
            }
            
            // 统一缩放
            const uniformScale = typeof scale === 'number' ? scale : scale[0];
            videoPlane.scale.set(uniformScale, uniformScale, 1);
            
            // 添加到场景
            this.scene.add(videoPlane);
            
            // 保存引用
            this.videoPlane = videoPlane;
            this.videoTexture = videoTexture;
            
            // 加载完成回调
            if (onLoad) {
                onLoad();
            }
            
            // 如果需要自动播放
            if (autoplay) {
                this.play().then(() => {
                    if (onPlay) onPlay();
                });
            }
        });
        
        // 添加更多诊断事件监听
        video.addEventListener('canplay', () => console.log('视频可以播放'));
        video.addEventListener('playing', () => console.log('视频正在播放中'));
        video.addEventListener('error', (e) => console.error('视频错误:', e));
        
        return this;
    }
    
    /**
     * 播放视频
     * @param unmute - 是否取消静音
     * @returns 返回播放Promise
     */
    play(unmute = true) {
        if (!this.video) {
            console.error('没有视频可播放');
            return Promise.reject(new Error('没有视频可播放'));
        }
        
        console.log('尝试播放视频');
        const playPromise = this.video.play();
        
        if (unmute) {
            setTimeout(() => {
                if (this.video) {
                    this.video.muted = false;
                    this.video.volume = 1.0;
                    console.log('取消静音，音量设置为:', this.video.volume);
                }
            }, 1000);
        }
        
        return playPromise || Promise.resolve();
    }
    
    /**
     * 暂停视频
     */
    pause() {
        if (this.video) {
            this.video.pause();
        }
    }
    
    /**
     * 停止并移除视频
     */
    removeVideo() {
        if (this.videoPlane) {
            this.scene.remove(this.videoPlane);
        }
        
        if (this.video) {
            this.video.pause();
            this.video.src = '';
            
            // 移除所有事件监听器
            this.video.oncanplay = null;
            this.video.onplaying = null;
            this.video.onerror = null;
            this.video.onended = null;
            this.video.onvolumechange = null;
            this.video.onloadedmetadata = null;
        }
        
        this.videoPlane = null;
        this.videoTexture = null;
        this.video = null;
    }
    
    /**
     * 处理动画帧更新（应在渲染循环中调用）
     */
    update() {
        if (this.videoTexture && this.video && !this.video.paused) {
            this.videoTexture.needsUpdate = true;
        }
    }
    
    /**
     * 设置视频是否静音
     * @param muted - 是否静音
     */
    setMuted(muted) {
        if (this.video) {
            this.video.muted = muted;
        }
    }
    
    /**
     * 设置视频音量
     * @param volume - 音量值(0-1)
     */
    setVolume(volume) {
        if (this.video) {
            this.video.volume = Math.max(0, Math.min(1, volume));
        }
    }
    
    /**
     * 切换绿幕效果
     * @param enable - 是否启用绿幕效果
     */
    toggleGreenScreen(enable) {
        if (this.videoPlane) {
            const material = this.videoPlane.material;
            if (material.uniforms && material.uniforms.removeGreenScreen) {
                material.uniforms.removeGreenScreen.value = enable;
            }
        }
    }
    
    /**
     * 调整绿幕效果参数
     * @param config - 绿幕效果配置
     */
    updateGreenScreenConfig(config) {
        this.config = { ...this.config, ...config };
        
        if (this.videoPlane) {
            const material = this.videoPlane.material;
            if (material.uniforms) {
                if (config.greenScreenThreshold !== undefined) {
                    material.uniforms.greenScreenThreshold.value = config.greenScreenThreshold;
                }
                if (config.redRatioThreshold !== undefined) {
                    material.uniforms.redRatioThreshold.value = config.redRatioThreshold;
                }
                if (config.blueRatioThreshold !== undefined) {
                    material.uniforms.blueRatioThreshold.value = config.blueRatioThreshold;
                }
                if (config.redThreshold !== undefined) {
                    material.uniforms.redThreshold.value = config.redThreshold;
                }
                if (config.blueThreshold !== undefined) {
                    material.uniforms.blueThreshold.value = config.blueThreshold;
                }
            }
        }
    }
    
    /**
     * 获取视频DOM元素
     * @returns 视频元素
     */
    getVideoElement() {
        return this.video;
    }
    
    /**
     * 获取视频Mesh对象
     * @returns 视频平面对象
     */
    getVideoMesh() {
        return this.videoPlane;
    }
    
    /**
     * 获取视频材质
     * @returns 视频材质
     */
    getVideoMaterial() {
        if (!this.videoPlane) return null;
        return this.videoPlane.material;
    }
    
    /**
     * 设置视频位置
     * @param position - 位置坐标
     */
    setPosition(position) {
        if (this.videoPlane) {
            if (position instanceof THREE.Vector3) {
                this.videoPlane.position.copy(position);
            } else {
                this.videoPlane.position.set(...position);
            }
        }
    }
    
    /**
     * 设置视频旋转
     * @param rotation - 旋转角度
     */
    setRotation(rotation) {
        if (this.videoPlane) {
            if (rotation instanceof THREE.Euler) {
                this.videoPlane.rotation.copy(rotation);
            } else {
                this.videoPlane.rotation.set(...rotation);
            }
        }
    }
    
    /**
     * 设置视频缩放
     * @param scale - 缩放比例
     */
    setScale(scale) {
        if (this.videoPlane) {
            const uniformScale = typeof scale === 'number' ? scale : scale[0];
            this.videoPlane.scale.set(uniformScale, uniformScale, 1);
        }
    }
}

export default GreenScreenVideoPlayer; 