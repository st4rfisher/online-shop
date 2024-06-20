import { defineStore } from "pinia";
import { type Ref, ref } from "vue";
import axios from "axios";
import { type Product, type ResponseParams } from "@/model/product";
import { useFiltersStore } from "@/stores/catalog/filters";

export const useCatalogStore = defineStore('catalog', () => {
    const items: Ref<Product[]> = ref([]),
    filtersStore = useFiltersStore()

    async function fetchItems() {
        try {
            const params: ResponseParams = {
                sortBy: filtersStore.filters.sortBy,
            }
            if(filtersStore.filters.searchQuery) {
                params.title = `*${filtersStore.filters.searchQuery}*`
            }
            const { data } = await axios.get('https://a464207e3cbafe55.mokky.dev/products', { params })
            console.log(data)
            items.value = data.map((object: Product) => ({
                ...object,
                isFavorite: false,
                isAdded: false
            }))
        } catch (error) {
            console.log(error)
        }
    }

    return { items, fetchItems }
})