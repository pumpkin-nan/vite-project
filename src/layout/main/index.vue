<template>
    <router-view v-slot="{ Component }">
        <transition name="fade">
            <component :is="Component" v-if="flag" />
        </transition>
    </router-view>
</template>

<script setup lang="ts">
import { watch, ref, nextTick } from 'vue'
import useLayOutSettingStore from '@/store/modules/setting'
let layOutSettingStore = useLayOutSettingStore()
let flag = ref(true)
watch(() => layOutSettingStore.refresh, () => {
    flag.value = false
    nextTick(() => {
        flag.value = true
    })

})
</script>
<script  lang="ts">
export default {
    name: 'main'
}
</script>
<style lang="scss" scoped>
.fade-enter-from {
    opacity: 0;
}

.fade-enter-active {
    transition: all 1s;
}

.fade-enter-to {
    opacity: 1;
}
</style>
