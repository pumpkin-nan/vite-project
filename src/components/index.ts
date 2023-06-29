import SvgIcon from '@/components/SvgIcon/index.vue'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
const allGlobalCompontent: any = { SvgIcon }

export default {
    install(app: any) {
        Object.keys(allGlobalCompontent).forEach(key => {
            app.component(key, allGlobalCompontent[key])
        })
        // @ts-ignore
        for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
            app.component(key, component)
        }
    }

}