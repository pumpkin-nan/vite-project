import { defineStore } from 'pinia'
import { reqC1, reqC2, reqC3 } from '@/api/product/attr/index'
import type { CategoryResponse } from '@/api/product/attr/type'
import type { CategoryState } from '@/store/modules/types/types'

let useCategoryStore = defineStore('category', {
    state: (): CategoryState => {
        return {
            c1Id: '',
            c2Id: '',
            c3Id: '',
            c1Arr: [],
            c2Arr: [],
            c3Arr: [],
        }
    },
    actions: {
        async getCategory1() {
            let result: CategoryResponse = await reqC1()
            if (result.code == 200) {
                this.c1Arr = result.data
            }
        },
        async getCategory2() {
            let result: CategoryResponse = await reqC2(this.c1Id)
            if (result.code == 200) {
                this.c2Arr = result.data
            }
        },
        async getCategory3() {
            let result: CategoryResponse = await reqC3(this.c2Id)
            if (result.code == 200) {
                this.c3Arr = result.data
            }
        },

    }

})

export default useCategoryStore