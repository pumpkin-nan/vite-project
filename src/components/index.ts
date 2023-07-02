import SvgIcon from './SvgIcon/index.vue'
import Category from './Category/index.vue'

import * as ElementPlusIconsVue from '@element-plus/icons-vue'
const allGlobalCompontent: any = { SvgIcon, Category }

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