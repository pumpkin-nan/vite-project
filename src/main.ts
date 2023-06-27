import { createApp } from "vue";
import App from "@/App.vue";
// 引入element-plus插件与样式
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
// 国际化
// @ts-ignore
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
//svg配置项
import 'virtual:svg-icons-register'
import globalComponent from './components/index';
import '@/styles/index.scss'


const app = createApp(App)
app.use(ElementPlus, {
    locale: zhCn,
  })
app.mount('#app')
app.use(globalComponent)

console.log(import.meta.env)

