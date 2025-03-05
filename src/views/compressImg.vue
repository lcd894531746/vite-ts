<template>
    <div class="compressImg">
        <el-button @click="startCompressImg">压缩图片</el-button>
        <div v-if="scenes" class="scenes-container">
            <div v-for="(scene, sceneName) in scenes" :key="sceneName" class="scene-block">
                <h3>{{ sceneName }}</h3>
                <div class="images-grid">
                    <div v-for="(img, index) in scene.images" :key="index" class="image-item">
                        <div class="image-pair">
                            <div class="image-original">
                                <h4>原图</h4>
                                <img :src="img.original" :alt="img.name">
                            </div>
                            <div class="image-compressed">
                                <h4>压缩后</h4>
                                <img :src="img.compressed" :alt="img.name">
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { handleImageCompression } from '@/utils/imageCompressor'
import { ElMessage } from 'element-plus';

// 场景数据
const scenes = ref(null);

const startCompressImg = async () => {
    try {
        const { config } = await handleImageCompression();
        scenes.value = config;
        ElMessage.success('图片压缩完成');
    } catch (error) {
        console.error('图片压缩失败:', error);
        ElMessage.error('图片压缩失败');
    }
};
</script>

<style scoped lang="scss">
.compressImg {
    width: 100%;
    padding: 20px;
    background-color: #f0f2f5;

    .scenes-container {
        margin-top: 20px;
    }

    .scene-block {
        background: white;
        padding: 20px;
        border-radius: 8px;
        margin-bottom: 20px;

        h3 {
            margin-bottom: 16px;
            color: #333;
        }
    }

    .images-grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
        gap: 20px;
    }

    .image-item {
        border: 1px solid #eee;
        border-radius: 4px;
        padding: 10px;
    }

    .image-pair {
        display: flex;
        gap: 10px;
        margin-bottom: 10px;

        .image-original,
        .image-compressed {
            flex: 1;

            h4 {
                margin-bottom: 8px;
                color: #666;
                font-size: 14px;
            }

            img {
                width: 100%;
                height: 150px;
                object-fit: cover;
                border-radius: 4px;
            }
        }
    }

    .image-info {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-top: 10px;

        span {
            color: #666;
            font-size: 14px;
        }

        .image-actions {
            display: flex;
            gap: 8px;
        }
    }
}
</style>
