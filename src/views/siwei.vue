<template>
  <div class="mindmap-page">
    <div class="toolbar">
      <button @click="addRootNode">新增根节点</button>
      <button :disabled="!selectedNode" @click="() => addChildNode()">新增子节点</button>
      <button :disabled="!selectedNode" @click="() => deleteNode()">删除节点</button>
      <button @click="resetAll">重置</button>
    </div>

    <div class="canvas" ref="canvasRef" @mousedown="onCanvasMouseDown" @mousemove="onCanvasMouseMove" @mouseup="onCanvasMouseUp" @mouseleave="onCanvasMouseUp">
      <svg class="edges" :width="canvasSize.width" :height="canvasSize.height">
        <defs>
          <marker id="arrow" viewBox="0 0 10 10" refX="10" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
            <path d="M 0 0 L 10 5 L 0 10 z" fill="#97a3b6"></path>
          </marker>
        </defs>
        <path v-for="edge in edges" :key="edge.id" :d="edge.d" stroke="#97a3b6" stroke-width="2" fill="none" marker-end="url(#arrow)" />
      </svg>

      <div v-for="node in visibleNodes" :key="node.id" class="node" :class="{ selected: node.id === selectedId }" :style="nodeStyle(node)" @mousedown.stop="onNodeMouseDown($event, node)" @dblclick.stop="startEditing(node)">
        <button class="collapse-toggle" @click.stop="() => toggleCollapse(node)" :title="node.collapsed ? '展开' : '收起'">
          <span v-if="node.collapsed">▸</span>
          <span v-else>▾</span>
        </button>
        <input v-if="editingId === node.id" class="title-input" v-model="node.title" @blur="stopEditing" @keydown.enter.prevent="stopEditing" />
        <div v-else class="title" @click.stop="() => selectNode(node.id)">{{ node.title }}</div>
        <div class="node-actions">
          <button title="添加子节点" @click.stop="() => addChildNode(node)">＋</button>
          <button title="删除" @click.stop="() => deleteNode(node)">×</button>
        </div>
      </div>
    </div>
  </div>
  
</template>

<script setup lang="ts">
import { computed, onMounted, reactive, ref, watch } from 'vue'

type NodeId = string

interface MindNode {
  id: NodeId
  title: string
  x: number
  y: number
  parentId?: NodeId | null
  collapsed?: boolean
}

const STORAGE_KEY = 'mindmap.siwei.nodes.v1'

const canvasRef = ref<HTMLDivElement | null>(null)
const canvasSize = reactive({ width: 2400, height: 1400 })

const nodes = reactive<MindNode[]>([])
const selectedId = ref<NodeId | null>(null)
const editingId = ref<NodeId | null>(null)

const selectedNode = computed(() => nodes.find(n => n.id === selectedId.value))

function genId(): NodeId {
  return Math.random().toString(36).slice(2, 9)
}

function centerOf(node: MindNode) {
  const width = 160
  const height = 48
  return { cx: node.x + width / 2, cy: node.y + height / 2 }
}

function isHiddenByAncestor(node: MindNode, all: MindNode[]): boolean {
  let pid = node.parentId
  while (pid) {
    const p = all.find(n => n.id === pid)
    if (!p) break
    if (p.collapsed) return true
    pid = p.parentId ?? null
  }
  return false
}

const visibleNodes = computed(() => nodes.filter(n => !isHiddenByAncestor(n, nodes)))

const edges = computed(() => {
  const list: { id: string; d: string }[] = []
  for (const child of nodes) {
    if (!child.parentId) continue
    const parent = nodes.find(n => n.id === child.parentId)
    if (!parent) continue
    if (isHiddenByAncestor(child, nodes)) continue
    const { cx: x1, cy: y1 } = centerOf(parent)
    const { cx: x2, cy: y2 } = centerOf(child)
    const dx = Math.abs(x2 - x1)
    const ctrl = Math.max(40, dx * 0.5)
    const c1x = x1 + ctrl
    const c1y = y1
    const c2x = x2 - ctrl
    const c2y = y2
    const d = `M ${x1} ${y1} C ${c1x} ${c1y}, ${c2x} ${c2y}, ${x2} ${y2}`
    list.push({ id: `${parent.id}->${child.id}` , d })
  }
  return list
})

function nodeStyle(node: MindNode) {
  return {
    left: node.x + 'px',
    top: node.y + 'px'
  }
}

function selectNode(id: NodeId | null) {
  selectedId.value = id
}

function addRootNode() {
  if (nodes.length === 0) {
    nodes.push({ id: genId(), title: '中心主题', x: canvasSize.width / 2 - 80, y: canvasSize.height / 2 - 24, parentId: null, collapsed: false })
  } else {
    nodes.push({ id: genId(), title: '新主题', x: 100, y: 100, parentId: null, collapsed: false })
  }
}

function addChildNode(target?: MindNode) {
  const base = target ?? selectedNode.value
  if (!base) return
  const child: MindNode = {
    id: genId(),
    title: '子主题',
    x: base.x + 220,
    y: base.y + 80,
    parentId: base.id,
    collapsed: false
  }
  nodes.push(child)
  selectedId.value = child.id
}

function deleteNode(target?: MindNode) {
  const node = target ?? selectedNode.value
  if (!node) return
  // 同时删除其所有后代
  const toDelete = new Set<NodeId>()
  const queue: NodeId[] = [node.id]
  while (queue.length) {
    const id = queue.shift()!
    toDelete.add(id)
    for (const n of nodes) {
      if (n.parentId === id) queue.push(n.id)
    }
  }
  for (let i = nodes.length - 1; i >= 0; i--) {
    if (toDelete.has(nodes[i].id)) nodes.splice(i, 1)
  }
  if (selectedId.value && toDelete.has(selectedId.value)) selectedId.value = null
}

function resetAll() {
  nodes.splice(0, nodes.length)
  selectedId.value = null
  editingId.value = null
  localStorage.removeItem(STORAGE_KEY)
}

function toggleCollapse(node: MindNode) {
  node.collapsed = !node.collapsed
}

function startEditing(node: MindNode) {
  editingId.value = node.id
}
function stopEditing() {
  editingId.value = null
}

// 拖拽
const dragging = reactive<{ id: NodeId | null; offsetX: number; offsetY: number }>(
  { id: null, offsetX: 0, offsetY: 0 }
)

function getCanvasOffset() {
  const rect = canvasRef.value?.getBoundingClientRect()
  return { left: rect?.left ?? 0, top: rect?.top ?? 0 }
}

function onNodeMouseDown(e: MouseEvent, node: MindNode) {
  selectNode(node.id)
  const { left, top } = getCanvasOffset()
  dragging.id = node.id
  dragging.offsetX = e.clientX - left - node.x
  dragging.offsetY = e.clientY - top - node.y
}

function onCanvasMouseDown() {
  // 点击画布取消选择/结束编辑
  if (editingId.value) editingId.value = null
  selectNode(null)
}

function onCanvasMouseMove(e: MouseEvent) {
  if (!dragging.id) return
  const node = nodes.find(n => n.id === dragging.id)
  if (!node) return
  const { left, top } = getCanvasOffset()
  node.x = e.clientX - left - dragging.offsetX
  node.y = e.clientY - top - dragging.offsetY
}

function onCanvasMouseUp() {
  dragging.id = null
}

// 持久化
watch(
  () => nodes.map(n => ({ id: n.id, title: n.title, x: n.x, y: n.y, parentId: n.parentId, collapsed: !!n.collapsed })),
  (val: Array<{ id: string; title: string; x: number; y: number; parentId?: string | null; collapsed?: boolean }>) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(val))
  },
  { deep: true }
)

onMounted(() => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (raw) {
      const data: Array<Omit<MindNode, 'collapsed'> & { collapsed?: boolean }> = JSON.parse(raw)
      if (Array.isArray(data)) {
        // 兼容旧数据：默认 collapsed 为 false
        const normalized = data.map(n => ({ ...n, collapsed: !!n.collapsed })) as MindNode[]
        nodes.splice(0, nodes.length, ...normalized)
      }
    }
  } catch (e) {
    // ignore
  }
  if (nodes.length === 0) addRootNode()
})
</script>

<style scoped>
.mindmap-page {
  display: flex;
  flex-direction: column;
  gap: 8px;
  height: calc(100vh - 16px);
  padding: 8px;
  box-sizing: border-box;
}
.toolbar {
  display: flex;
  gap: 8px;
}
.canvas {
  position: relative;
  flex: 1;
  background: #0b1020;
  border-radius: 8px;
  overflow: hidden;
}
.edges {
  position: absolute;
  inset: 0;
}
.node {
  position: absolute;
  width: 160px;
  min-height: 48px;
  padding: 8px 10px 6px 10px;
  border-radius: 10px;
  color: #e6edf7;
  background: linear-gradient(180deg, rgba(34, 42, 69, 0.95), rgba(20, 26, 46, 0.95));
  border: 1px solid rgba(120, 134, 171, 0.35);
  box-shadow: 0 6px 18px rgba(0,0,0,0.25);
  cursor: move;
  user-select: none;
}
.collapse-toggle {
  position: absolute;
  left: -10px;
  top: 8px;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: rgba(255,255,255,0.08);
  color: #d0dbff;
  border: 1px solid rgba(255,255,255,0.12);
  cursor: pointer;
}
.node.selected {
  outline: 2px solid #6aa9ff;
}
.title {
  font-weight: 600;
  line-height: 1.2;
}
.title-input {
  width: 100%;
  border: 1px solid #6aa9ff;
  background: rgba(12, 18, 34, 0.9);
  color: #e6edf7;
  border-radius: 6px;
  padding: 6px 8px;
}
.node-actions {
  position: absolute;
  right: 6px;
  bottom: 6px;
  display: flex;
  gap: 4px;
}
.node-actions > button {
  width: 22px;
  height: 22px;
  border-radius: 6px;
  background: rgba(255,255,255,0.08);
  color: #d0dbff;
  border: 1px solid rgba(255,255,255,0.12);
  cursor: pointer;
}
.toolbar > button {
  padding: 6px 10px;
  background: #1c2540;
  color: #e6edf7;
  border: 1px solid rgba(120, 134, 171, 0.4);
  border-radius: 8px;
  cursor: pointer;
}
.toolbar > button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
</style>


