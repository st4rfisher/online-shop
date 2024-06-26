import { defineComponent, onMounted, type ComputedRef, computed, watch } from "vue";
import { storeToRefs } from 'pinia'

import { type Favorite, type Product } from "@/model/product";
import { useFavoritesStore } from "@/stores/favorites/store";
import CardList from "@/components/cardList";

export default defineComponent({
  name: "Favorites",
  setup() {
    const favoritesStore = useFavoritesStore(),
    { favorites } = storeToRefs(favoritesStore),
    favoritesItems: ComputedRef<Product[]> = computed(() => favorites.value.map((object: Favorite) => object.product))

    return {
      favoritesStore, favoritesItems
    }
  },
  render() {
    return (
      <>
        <div class="flex justify-between items-center mb-8 gap-4">
          <h2 class="text-3xl font-bold mr-auto">Мои закладки</h2>
        </div>
        
        <CardList
          items={ this.favoritesItems }
          onToggleFavorite={ (item: Product) => this.favoritesStore.removeFromFavorites(item) }
        />
      </>
    )
  },
})

