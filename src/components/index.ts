import SvgIcon from '@/components/SvgIcon/index.vue'

const allGlobalCompontent={SvgIcon}

export default{
    install(app){
        Object.keys(allGlobalCompontent).forEach(key=>{
            app.component(key,allGlobalCompontent[key])
        })
    }
}