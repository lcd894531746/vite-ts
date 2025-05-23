<template>
  <div class="peach-worlds">
    <div ref="container" class="model-container"></div>
    <div v-if="error" class="error-message">{{ error }}</div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import sphere from './sphere-compressed.glb'
import right1 from './right1.glb'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader'
import bgImg from '@/assets/bg.webp'
import metallic from '@/assets/metallic.webp'
import gradient from '@/assets/test.jpg'


const container = ref<HTMLElement | null>(null)
const error = ref<string>('')
let scene: THREE.Scene
let camera: THREE.PerspectiveCamera
let renderer: THREE.WebGLRenderer
let controls: OrbitControls
let mixer: THREE.AnimationMixer | null = null
let clock: THREE.Clock
let ring: THREE.Object3D | null = null
let ring2: THREE.Object3D | null = null

let ringRotationTarget = 1.6
let ringRotationCurrent = 1.6
let ring2RotationTarget = 0
let ring2RotationCurrent = 0



// 检查 WebGL 支持
const checkWebGLSupport = () => {
  try {
    const canvas = document.createElement('canvas')
    const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl')
    if (!gl) {
      throw new Error('WebGL not supported')
    }
    return true
  } catch (e) {
    error.value = '您的浏览器不支持 WebGL，请使用现代浏览器访问'
    return false
  }
}

// 初始化场景
const initScene = () => {
  if (!checkWebGLSupport()) return

  try {
    // 创建场景
    scene = new THREE.Scene()
    scene.background = new THREE.Color(0x000000)

    // 创建相机
    camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    )
    camera.position.z = 5
    camera.position.x = -8

    // 创建渲染器
    renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance'
    })

    const textureLoader = new THREE.TextureLoader();
    const bgTexture = textureLoader.load(bgImg);
    scene.background = bgTexture;


    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2)) // 限制最大像素比
    container.value?.appendChild(renderer.domElement)

    // 添加轨道控制器
    controls = new OrbitControls(camera, renderer.domElement)
    controls.enableDamping = true
    controls.dampingFactor = 0.05
    controls.enableZoom = false

    // 添加环境光
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.0)
    scene.add(ambientLight)

    // 添加平行光
    const directionalLight = new THREE.DirectionalLight(0xffffff, 2)
    directionalLight.position.set(5, 5, 5)
    scene.add(directionalLight)


    // 新增：添加一个点光源
    const pointLight = new THREE.PointLight(0xffffff, 2, 100);
    pointLight.position.set(0, 0, 10); // 你可以调整位置
    scene.add(pointLight);

    // 创建坐标轴辅助线（长度可自定义，比如10）
    const axesHelper = new THREE.AxesHelper(10);
    scene.add(axesHelper);

    // 创建时钟
    clock = new THREE.Clock()
  } catch (e) {
    error.value = '初始化 3D 场景失败：' + (e as Error).message
  }
}

// 加载模型
const loadModel = async () => {
  const loader = new GLTFLoader()
  // 配置 DRACO 解码器
  const dracoLoader = new DRACOLoader()
  // 设置解码器文件路径
  dracoLoader.setDecoderPath('/libs/draco/')
  loader.setDRACOLoader(dracoLoader)

  try {
    // 先加载环境贴图
    const envMap = await new THREE.TextureLoader().loadAsync(gradient);
    envMap.mapping = THREE.EquirectangularReflectionMapping;
    // scene.environment = envMap;

    // 球体
    const sphereGltf = await loader.loadAsync(sphere)
    const spheremode = sphereGltf.scene
    const sphereBox = new THREE.Box3().setFromObject(spheremode)
    const sphereCenter = sphereBox.getCenter(new THREE.Vector3())

    const metallicT = await new THREE.TextureLoader().loadAsync(metallic);

    // 赋予带贴纸的金属材质
    spheremode.traverse((child: any) => {
      if (child.isMesh) {
        child.material = new THREE.MeshPhysicalMaterial({
          metalness: 1,
          roughness: 0.5,
          envMap: metallicT,            // 环境贴图
          envMapIntensity: 2,
          clearcoat: 1,
          clearcoatRoughness: 0.05,
          transmission: 0,           // 不透明
        });
        child.material.needsUpdate = true;
      }
    });


    spheremode.position.sub(sphereCenter)


    scene.add(spheremode)

    // ring1
    const ringGltf = await loader.loadAsync(right1)
    ring = ringGltf.scene
    ring.scale.set(2, 2, 2)
    ring.rotation.set(0, 0, 0) // 先清零
    const ringBox = new THREE.Box3().setFromObject(ring)
    const ringCenter = ringBox.getCenter(new THREE.Vector3())
    ring.position.sub(ringCenter)
    // 赋予金属质感
    ring.traverse((child: any) => {
      if (child.isMesh) {
        child.material.envMap = envMap;
        child.material.metalness = 0.8;
        child.material.roughness = 0.1;
        child.material.needsUpdate = true;
      }
    });
    scene.add(ring)


    // ring2
    const ringGltf2 = await loader.loadAsync(right1);
    ring2 = ringGltf2.scene;
    ring2 = ringGltf2.scene
    ring2.scale.set(2.1, 2.1, 2.1)
    ring2.rotation.set(0, 0, Math.PI / 2) // 先清零再设置垂直
    const ringBox2 = new THREE.Box3().setFromObject(ring2)
    const ringCenter2 = ringBox2.getCenter(new THREE.Vector3())
    ring2.position.sub(ringCenter2)

    ring2.traverse((child) => {
      if (child.isMesh) {
        child.material = new THREE.MeshPhysicalMaterial({
          color: 0xffffff,
          metalness: 0,
          roughness: 0,
          transparent: true,
          opacity: 0.5,           // 透明度
          transmission: 1,        // 透光
          ior: 1.7,               // 折射率
          thickness: 1.2,         // 厚度
          envMap: scene.environment,
          envMapIntensity: 2,     // 环境贴图强度
          clearcoat: 1,
          clearcoatRoughness: 0,
        });
      }
    });

    scene.add(ring2)

    // 如果有动画，设置动画混合器
    // if (sphereGltf.animations.length) {
    //   mixer = new THREE.AnimationMixer(sphereGltf.scene)
    //   const action = mixer.clipAction(sphereGltf.animations[0])
    //   action.play()
    // }

    // 自动调整相机位置以适应模型
    const box = new THREE.Box3().setFromObject(sphereGltf.scene)
    box.expandByObject(ring) // 将圆环也包含在计算范围内
    const center = box.getCenter(new THREE.Vector3())
    const size = box.getSize(new THREE.Vector3())
    const maxDim = Math.max(size.x, size.y, size.z)
    const fov = camera.fov * (Math.PI / 180)
    let cameraZ = Math.abs(maxDim / Math.sin(fov / 2))
    camera.position.z = cameraZ * 1.5
    camera.updateProjectionMatrix()
  } catch (error: any) {
    error.value = '模型加载失败：' + (error as Error).message
    console.error('Error loading model:', error)
  }
}

// 鼠标滚轮事件
const onWheel = (event: WheelEvent) => {
  ringRotationTarget += event.deltaY * 0.005
  ring2RotationTarget -= event.deltaY * 0.005
}

// 动画循环
const animate = () => {
  requestAnimationFrame(animate)

  const easing = 0.1 // 越小越慢，越大越快

  ringRotationCurrent += (ringRotationTarget - ringRotationCurrent) * easing
  ring2RotationCurrent += (ring2RotationTarget - ring2RotationCurrent) * easing
  // 更新动画混合器
  if (mixer) {
    mixer.update(clock.getDelta())
  }

  if (ring) {
    ring.rotation.z = ringRotationCurrent;
  }
  if (ring2) {
    ring2.rotation.z = ring2RotationCurrent;
  }

  controls?.update()
  renderer.render(scene, camera)
}

// 处理窗口大小变化
const handleResize = () => {
  if (!container.value) return

  const width = container.value.clientWidth
  const height = container.value.clientHeight

  camera.aspect = width / height
  camera.updateProjectionMatrix()
  renderer.setSize(width, height)
}

onMounted(() => {
  initScene()
  loadModel()
  animate()
  window.addEventListener('resize', handleResize)
  window.addEventListener('wheel', onWheel)
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', handleResize)
  window.removeEventListener('wheel', onWheel)
  renderer?.dispose()
})
</script>

<style scoped>
.peach-worlds {
  width: 100%;
  height: 100vh;
  overflow: hidden;
  position: relative;
}

.model-container {
  width: 100%;
  height: 100%;
}

.error-message {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: rgba(0, 0, 0, 0.8);
  color: white;
  padding: 20px;
  border-radius: 8px;
  text-align: center;
  z-index: 1000;
}
</style>