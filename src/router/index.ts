import { createRouter, createWebHashHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'
import Index from '../views/Index.vue'
import Home from '../views/Home.vue'
import Table from '../views/Table.vue'
import Echarts from '../views/Echarts.vue'
import Rolling from '../views/Rolling.vue'
import Tiandi from '../views/tiandi.vue'
import Xgplayer from '../views/Xgplayer.vue'
import car from '../views/Car.vue'
import NumberChange from '../views/NumberChange.vue'
import FlipClock from '../views/FlipClock.vue'
import compressImg from '../views/compressImg.vue'
// import threeVideo from '../views/threeVideo.vue'
import uploadCos from '../views/uploadCos.vue'
import CascaderDemo from '../views/CascaderDemo.vue'
import PeachWorlds from '../views/PeachWorlds.vue'
import WebSocketVideo from '../views/WebSocketVideo.vue'
import siwei from '../views/siwei.vue'


const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'layout',
    component: Index,
    redirect: '/home',
    children: [
      
      // {
      //   path: '/threeVideo',
      //   name: 'threeVideo',
      //   component: threeVideo,
      //   meta: {
      //     title: 'three.js视频'
      //   }
      // },
      {
        path: '/home',
        name: 'home',
        component: Home,
        meta: {
          title: '首页'
        }
      },
      {
        path: '/websocket-video',
        name: 'websocketVideo',
        component: WebSocketVideo,
        meta: {
          title: 'WebSocket 视频流'
        }
      },
      {
        path: '/table',
        name: 'table',
        component: Table,
        meta: {
          title: 'table页面'
        }
      },
      {
        path: '/echarts',
        name: 'echarts',
        component: Echarts,
        meta: {
          title: 'echarts页面'
        }
      },
      {
        path: '/Rolling',
        name: 'Rolling',
        component: Rolling,
        meta: {
          title: '滚动展示页面'
        }
      },
      {
        path: '/tiandi',
        name: 'tiandi',
        component: Tiandi,
        meta: {
          title: '天地图页面'
        }
      },
      {
        path: '/xgplayer',
        name: 'xgplayer',
        component: Xgplayer,
        meta: {
          title: 'xgplayer页面'
        }
      },
      {
        path: '/car',
        name: 'car',
        component: car,
        meta: {
          title: '卡片页面'
        }
      }, {
        path: '/NumberChange',
        name: 'NumberChange',
        component: NumberChange,
        meta: {
          title: '数字翻牌器'
        }
      },
      {
        path: '/FlipClock',
        name: 'FlipClock',
        component: FlipClock,
        meta: {
          title: '日期翻牌器'
        }
      },
      {
        path: '/compressImg',
        name: 'compressImg',
        component: compressImg,
        meta: {
          title: '图片压缩'
        }
      },
      {
        path: '/uploadCos',
        name: 'uploadCos',
        component: uploadCos,
        meta: {
          title: '上传COS'
        }
      },
      {
        path: '/cascader',
        name: 'cascader',
        component: CascaderDemo,
        meta: {
          title: '省市区级联选择器'
        }
      },
      {
        path: '/peach-worlds',
        name: 'peachWorlds',
        component: PeachWorlds,
        meta: {
          title: 'Peach Worlds'
        }
      },
      {
        path: '/siwei',
        name: 'siwei',
        component: siwei,
        meta: {
          title: '思维导图'
        }
      },
     
    ]
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
