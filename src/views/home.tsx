import { defineComponent, onMounted, watch } from "vue";
import { storeToRefs } from 'pinia'

import { type Product } from "@/model/product";
import { useFiltersStore } from "@/stores/catalog/filters";
import { useCatalogStore } from "@/stores/catalog/store";
import { useFavoritesStore } from "@/stores/favorites/store";
import { useCartStore } from "@/stores/cart/store";
import CardList from "@/components/cardList";

export default defineComponent({
  name: "Home",
  setup() {
    const catalogStore = useCatalogStore(),
    filtersStore = useFiltersStore(),
    favoritesStore = useFavoritesStore(),
    cartStore = useCartStore(),
    { items } = storeToRefs(catalogStore),
    onChangeSelect = (target: HTMLSelectElement) => {
        filtersStore.setSortBy(target.value)
    },
    onChangeSearchInput = (target: HTMLInputElement) => {
        filtersStore.setSearchQuery(target.value)
    }
    onMounted(async () => {
        await cartStore.setCart()
        await catalogStore.fetchItems()
        await favoritesStore.fetchFavorites()
        await catalogStore.updateCatalog()
    })

    watch(filtersStore.filters, catalogStore.fetchItems)

    // watch(cart, () => {
    //     items.value = items.value.map((CatalogItem: Product) => ({
    //         ...CatalogItem,
    //         isAdded: false
    //     }))
    // })

    return {
        items, favoritesStore, cartStore, onChangeSelect, onChangeSearchInput, 
    }
  },
  render() {
    return (
      <>
        <div class="flex justify-between items-center mb-8 gap-4">
            <h2 class="text-3xl font-bold mr-auto">Все кроссовки</h2>
            <select class="py-2 px-3 border rounded-md outline-none" name="" id=""
                onChange={(e) => this.onChangeSelect(e.target as HTMLSelectElement)} 
            >
                <option value="name">По названию</option>
                <option value="price">Сначало дешевые</option>
                <option value="-price">Сначало дорогие</option>
            </select>
            <div class="relative">
                <img class="absolute left-3.5 top-1/2 -translate-y-1/2" src="/images/search.svg" alt="Поиск" />
                <input class="border border-gray-200 rounded-md py-2 pl-10 pr-4 outline-none focus:border-gray-400 transition" 
                    type="text"
                    placeholder="Поиск"
                    onChange={(e) => this.onChangeSearchInput(e.target as HTMLInputElement)} 
                />
            </div>
        </div>
        
        <CardList 
            items={ this.items }
            onToggleFavorite={ (item: Product) => this.favoritesStore.toggleFavorite(item) }
            onAddToCart={ (item: Product) => this.cartStore.addToCart(item) }
        />
      </>
    )
  },
})

