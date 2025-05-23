<template>
    <div class="cascader-demo">
        <h2>中国省市区选择器</h2>
        <el-cascader v-model="selectedOptions" :options="options" :props="props" placeholder="请选择省市区" clearable
            @change="handleChange">
        </el-cascader>
        <div class="selected-value" v-if="selectedOptions.length">
            <p>已选择的值：{{ JSON.stringify(selectedOptions, null, 2) }}</p>
        </div>
        <div class="button-group">
            <el-button type="primary" @click="setValue">设置为北京朝阳区</el-button>
            <el-button type="success" @click="setValue2">设置为上海静安区</el-button>
            <el-button type="warning" @click="clearValue">清空选择</el-button>
        </div>
    </div>
</template>

<script setup lang="ts">
// 引入map数据
import mapData from '@/assets/response.json'
import { ref, onMounted } from 'vue'

interface MapDataItem {
    code: string | object
    name: string
    next?: MapDataItem[]
}

const options = ref<any[]>([])
// 绑定的值（code数组）
const selectedOptions = ref<any[]>([])

function convert(arr: MapDataItem[]): { value: { name: string, code: string | object }, children: any[] | null, label: string }[] {
    return arr.map(item => ({
        value: { name: item.name, code: item.code },
        children: item.next ? convert(item.next) : null,
        label: item.name
    }))
}
onMounted(() => {
    options.value = convert(mapData)
    console.log(options.value)
})

const props = {
    expandTrigger: 'hover',
    emitPath: true,
    multiple: false
}

// 设置北京朝阳区
const setValue = () => {
    selectedOptions.value = [{ "name": "内蒙古自治区", "code": "150000" }, { "name": "包头市", "code": "150200" }, { "name": "白云鄂博矿区", "code": "150206" }]
}

// 设置上海静安区
const setValue2 = () => {
    selectedOptions.value = [{ "name": "山西省", "code": "140000" }, { "name": "大同市", "code": "140200" }, { "name": "云州区", "code": "140215" }]
}

// 清空
const clearValue = () => {
    selectedOptions.value = []
}

// 监听change事件，保存对象数组
const handleChange = (value: any[], selectedNodes: MapDataItem[]) => {
    console.log('选中的对象数组：', value)
    console.log('选中的节点：', selectedNodes)
}
</script>

<style scoped>
.cascader-demo {
    padding: 20px;
}

h2 {
    margin-bottom: 20px;
    color: #409EFF;
}

.selected-value {
    margin-top: 20px;
    color: #67C23A;
    font-size: 14px;
}

.selected-value pre {
    background: #f6f8fa;
    padding: 10px;
    border-radius: 4px;
    font-size: 13px;
    color: #333;
}

.button-group {
    margin-top: 20px;
    display: flex;
    gap: 10px;
}
</style>