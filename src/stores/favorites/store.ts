import { defineStore, storeToRefs } from "pinia";
import { type Ref, ref } from "vue";
import axios from "axios";
import { type Favorite, type Product } from "@/model/product";
import { useCatalogStore } from "@/stores/catalog/store";

export const useFavoritesStore = defineStore('favorites', () => {
    const favorites: Ref<Favorite[]> = ref([]),
    catalogStore = useCatalogStore(),
    { items } = storeToRefs(catalogStore)

    async function fetchFavorites() {
        try {
            const { data } = await axios.get('https://a464207e3cbafe55.mokky.dev/favorites')

            items.value = items.value.map((item: Product) => {
                const favorite = data.find((favorite: Favorite) => favorite.product.id === item.id)

                if(!favorite) {
                    return item
                }

                return {
                    ...item,
                    isFavorite: true, 
                    favoriteID: favorite.id
                }
            })
            console.log("Favorites from Server", data)
        } catch (error) {
            console.log(error)
        }
    }

    async function toggleFavorite(item: Product) {
        try {
            if(!item.isFavorite) {
                const payload = {
                    product: item
                }
                item.isFavorite = true
                const { data } = await axios.post('https://a464207e3cbafe55.mokky.dev/favorites', payload)
                item.favoriteID = data.id
                console.log(data)
            } else {
                item.isFavorite = false
                await axios.delete(`https://a464207e3cbafe55.mokky.dev/favorites/${item.favoriteID}`)
                item.favoriteID = null
            }
        } catch(error) {
            console.log(error)
        }
        console.log(item)
    }

    return { favorites, fetchFavorites, toggleFavorite }
})