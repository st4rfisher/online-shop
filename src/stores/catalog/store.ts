import { defineStore, storeToRefs } from "pinia";
import { type Ref, ref, watch } from "vue";
import axios from "axios";
import { type Product, type ResponseParams } from "@/model/product";
import { useFiltersStore } from "@/stores/catalog/filters";
import { useCartStore } from "@/stores/cart/store";

export const useCatalogStore = defineStore('catalog', () => {
    const items: Ref<Product[]> = ref([]),
    filtersStore = useFiltersStore(),
    cartStore = useCartStore(),
    { cart } = storeToRefs(cartStore)

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
    
    async function updateItems() {
        items.value = items.value.map((catalogItem: Product) => ({
            ...catalogItem,
            isAdded: cart.value.some((cartItem: Product) => cartItem.id === catalogItem.id)
        }))
    }

    watch(cart, () => {
        items.value = items.value.map((CatalogItem: Product) => ({
            ...CatalogItem,
            isAdded: false
        }))
    })

    return { items, fetchItems, updateItems }
})