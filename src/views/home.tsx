import { defineComponent, inject, reactive, onMounted, watch, type Ref, ref, provide } from "vue";
import CardList from "@/components/cardList";
import axios from "axios";
import { type Product, type Favorite, type ResponseParams } from "@/model/product";

export default defineComponent({
  name: "Home",
  setup() {
    const { cart, addToCart } = inject('cart') as any,
    filters = reactive({
        sortBy: 'title',
        searchQuery: ''
    }),
    items: Ref<Product[]> = ref([]),
    fetchItems = async () => {
        try {
            const params: ResponseParams = {
                sortBy: filters.sortBy,
            }
            if(filters.searchQuery) {
                params.title = `*${filters.searchQuery}*`
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
    },
    fetchFavorites = async () => {
        try {
            const { data: favorites } = await axios.get('https://a464207e3cbafe55.mokky.dev/favorites')
            items.value = items.value.map((item: Product) => {
                const favorite = favorites.find((favorite: Favorite) => favorite.product.id === item.id)

                if(!favorite) {
                    return item
                }

                return {
                    ...item,
                    isFavorite: true, 
                    favoriteID: favorite.id
                }
            })
            console.log(items.value)
        } catch (error) {
            console.log(error)
        }
    },
    onChangeSelect = (target: HTMLSelectElement) => {
        filters.sortBy = target.value
    },
    onChangeSearchInput = (target: HTMLInputElement) => {
        filters.searchQuery = target.value
    },
    toggleFavorite = async (item: Product) => {
        try {
            if(!item.isFavorite) {
                const payload = {
                    // productID: item.id,
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
   
    onMounted(async () => {
        const localCart = localStorage.getItem('cart')
        cart.value = localCart ? JSON.parse(localCart) : []

        await fetchItems()
        await fetchFavorites()

        items.value = items.value.map((item: Product) => ({
            ...item,
            isAdded: cart.value.some((cartItem: Product) => cartItem.id === item.id)
        }))
    })

    watch(filters, fetchItems)

    watch(cart, () => {
        items.value = items.value.map((item: Product) => ({
            ...item,
            isAdded: false
        }))
    })

    return {
        items, addToCart, onChangeSelect, onChangeSearchInput, toggleFavorite, 
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
            onToggleFavorite={ (item: Product) => this.toggleFavorite(item) }
            onAddToCart={(item: Product) => this.addToCart(item)}
        />
      </>
    )
  },
})

