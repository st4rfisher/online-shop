import { defineStore, storeToRefs } from "pinia";
import { type Ref, ref } from "vue";
import axios from "axios";
import { type Favorite, type Product } from "@/model/product";
import { useCatalogStore } from "@/stores/catalog/store";

export const useFavoritesStore = defineStore('favorites', () => {
    const favorites: Ref<Favorite[]> = ref([])

    async function fetchFavorites() {
        try {
            const { data } = await axios.get('https://a464207e3cbafe55.mokky.dev/favorites')
            favorites.value = data
            console.log(data)
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
                fetchFavorites()
                console.log(data)
            } else {
                item.isFavorite = false
                await axios.delete(`https://a464207e3cbafe55.mokky.dev/favorites/${item.favoriteID}`)
                item.favoriteID = null
                fetchFavorites()
            }
        } catch(error) {
            console.log(error)
        }
        console.log(item)
    }

    async function removeFromFavorites(item: Product) {
        console.log(item)
        const currentFavorite = favorites.value.find((favorite: Favorite) => item.id === favorite.product.id) as Favorite
        try {
          item.isFavorite = false
          await axios.delete(`https://a464207e3cbafe55.mokky.dev/favorites/${currentFavorite.id}`)
          item.favoriteID = null
          await fetchFavorites()
          
        } catch(error) {
            console.log(error)
        }
    }

    return { favorites, fetchFavorites, toggleFavorite, removeFromFavorites }
})