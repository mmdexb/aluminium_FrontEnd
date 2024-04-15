import './assets/main.scss'
import { createPinia } from 'pinia'
import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import App from './App.vue'
import router from '@/router'
import locale from 'element-plus/dist/locale/zh-cn.js'
import {createPersistedState} from'pinia-persistedstate-plugin'


import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'font-awesome/css/font-awesome.min.css'
import Echarts from "vue-echarts"
import * as echarts from "echarts"

const app = createApp(App)
const pinia = createPinia()
const persist = createPersistedState()

pinia.use(persist)
app.use(pinia)
app.use(ElementPlus)
app.use(router)
app.use(ElementPlus,{locale})
app.component("v-chart", Echarts)
app.mount('#app')
app.config.globalProperties.$echarts = echarts
