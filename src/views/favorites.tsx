import { defineComponent, onMounted, ref, type Ref } from "vue";
import axios from "axios";
import CardList from "@/components/cardList";
import { type Favorite, type Product } from "@/model/product";

export default defineComponent({
  name: "Favorites",
  setup() {
    const favorites: Ref<Favorite[]> = ref([]),
    products: Ref<Product[]> = ref([]),
    fetchFavorites = async () => {
      try {
        const { data } = await axios.get('https://a464207e3cbafe55.mokky.dev/favorites')
        products.value = data.map((object: Favorite) => object.product)
        favorites.value = data
        console.log(data)
      } catch (error) {
        console.log(error)
      }
    },
    toggleFavorite = async (item: Product) => {
      console.log(item)
      const currentFavorite = favorites.value.find((favorite: Favorite) => item.id === favorite.product.id) as Favorite
      try {
        item.isFavorite = false
        await axios.delete(`https://a464207e3cbafe55.mokky.dev/favorites/${currentFavorite.id}`)
        item.favoriteID = null
        fetchFavorites()
      } catch(error) {
          console.log(error)
      }
    }

    onMounted(async () => {
      try {
        fetchFavorites()
      } catch (error) {
        console.log(error)
      }
    })

    return {
      favorites, products, toggleFavorite
    }
  },
  render() {
    return (
      <>
        <div class="flex justify-between items-center mb-8 gap-4">
          <h2 class="text-3xl font-bold mr-auto">Мои закладки</h2>
        </div>
        
        <CardList
          items={ this.products }
          onToggleFavorite={ (item: Product) => this.toggleFavorite(item) }
        />
      </>
    )
  },
})

