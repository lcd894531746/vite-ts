<template>
    <div>
        <h1 class="title">上传COS</h1>
        <div class="upload-container">
            <input type="file" webkitdirectory directory multiple @change="handleFileSelect" class="file-input"/>
            <div class="progress" v-if="uploading">
                <div>正在上传: {{currentFile}}</div>
                <div>总进度: {{uploadedCount}}/{{totalFiles}}</div>
            </div>
        </div>
    </div>
</template>

<script>
// 使用完整的AWS SDK路径
import * as AWS from 'aws-sdk'

export default {
    name: 'UploadCos',
    data() {
        return {
            s3: null,
            files: [],
            uploading: false,
            currentFile: '',
            uploadedCount: 0,
            totalFiles: 0
        }
    },
    created() {
        // 初始化S3客户端
        this.s3 = new AWS.S3({
            accessKeyId: 'SMP5KZUF6YX7AO295K49',
            secretAccessKey: '4EhOuZJMQVzGdQ2LRGEenIOppDykkkpmd4AZkHIl',
            endpoint: '/cos', // 使用代理地址
            apiVersion: '2006-03-01',
            s3ForcePathStyle: true,
            sslEnabled: false,  // 改为false因为我们用本地代理
            signatureVersion: 'v4',
            region: 'gz-tst'  // 添加region配置
        });
    },
    methods: {
        handleFileSelect(event) {
            this.files = Array.from(event.target.files);
            this.totalFiles = this.files.length;
            this.uploadedCount = 0;
            this.startUpload();
        },
        async startUpload() {
            this.uploading = true;
            
            for (let file of this.files) {
                try {
                    this.currentFile = file.name;
                    await this.uploadFile(file);
                    this.uploadedCount++;
                } catch (error) {
                    console.error(`上传文件 ${file.name} 失败:`, error);
                }
            }
            
            this.uploading = false;
            this.$message.success('所有文件上传完成！');
        },
        uploadFile(file) {
            return new Promise((resolve, reject) => {
                const params = {
                    Bucket: 'gd-szfs-test-vr', // 替换为你的bucket名称
                    Key: file.lastModified.toString(),
                    Body: file,
                    ACL: 'public-read'
                };

                this.s3.upload(params, (err, data) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(data);
                    }
                });
            });
        }
    }
}
</script>

<style scoped>
.title {
    font-size: 20px;
    font-weight: bold;
    text-align: center;
    margin-top: 20px;
    color: aliceblue;
}

.upload-container {
    margin: 20px auto;
    padding: 20px;
    max-width: 500px;
    text-align: center;
}

.file-input {
    margin: 20px 0;
    padding: 10px;
}

.progress {
    margin-top: 20px;
    padding: 10px;
    background: #f5f5f5;
    border-radius: 4px;
}
</style>