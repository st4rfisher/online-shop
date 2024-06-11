import { defineComponent, onMounted, provide, reactive, ref, watch, computed, type ComputedRef, type Ref } from "vue";
import axios from "axios";
import Header from "@/components/header";
import CardList from "@/components/cardList";
import Drawer from "@/components/drawer";
import { type Product, type Favorite, type ResponseParams } from "@/model/product";

export default defineComponent({
  name: "App",
  setup() {
    const isDrawerOpen: Ref<boolean> = ref(false),
    isCreatingOrder: Ref<boolean> = ref(false),
    isOrderButtonDisabled: ComputedRef<boolean> = computed(() => cart.value.length === 0 || isCreatingOrder.value),
    items: Ref<Product[]> = ref([]),
    cart: Ref<Product[]> = ref([]),
    totalPrice: ComputedRef<number> = computed(
        () => cart.value.reduce((total: number, item: Product) => total + item.price, 0)
    ),
    vatPrice: ComputedRef<number> = computed(
        () => Math.round((totalPrice.value * 5) / 100)
    ),
    filters = reactive({
        sortBy: 'title',
        searchQuery: ''
    }),
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
                const favorite = favorites.find((favorite: Favorite) => favorite.productID === item.id)

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
    createOrder = async () => {
        isCreatingOrder.value = true
        try {
            const { data } = await axios.post('https://a464207e3cbafe55.mokky.dev/orders', {
                items: cart.value,
                totalPrice: totalPrice.value
            })
            cart.value = []
            return data
        } catch (error) {
            console.log(error)
        } finally {
            isCreatingOrder.value = false
        }
    },
    onChangeSelect = (target: HTMLSelectElement) => {
        filters.sortBy = target.value
    },
    onChangeSearchInput = (target: HTMLInputElement) => {
        filters.searchQuery = target.value
    },
    addToFavorite = async (item: Product) => {
        try {
            if(!item.isFavorite) {
                const payload = {
                    productID: item.id
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
    },
    addToCart = (item: Product) => {
        cart.value.push(item)
        item.isAdded = true
    },
    removeFromCart = (item: Product) => {
        cart.value.splice(cart.value.indexOf(item), 1)
        item.isAdded = false
    },
    cardAddHandle = (item: Product) => {
        !item.isAdded ? addToCart(item) : removeFromCart(item)
    }

    provide('cart', { 
        cart,
        removeFromCart,
        cardAddHandle
    })

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
        localStorage.setItem('cart', JSON.stringify(cart.value))
    }, 
    { deep: true })

    watch(cart, () => {
        items.value = items.value.map((item: Product) => ({
            ...item,
            isAdded: false
        }))
    })
    
    return {
        isDrawerOpen, isCreatingOrder, isOrderButtonDisabled, items, cart, totalPrice, vatPrice, createOrder, onChangeSelect, onChangeSearchInput,
        addToFavorite, addToCart
    }
  },
  render() {
    return (
        <>
            {
                this.isDrawerOpen &&
                <Drawer
                    totalPrice = { this.totalPrice }
                    vatPrice = { this.vatPrice }
                    onToggleDrawer={ () => this.isDrawerOpen = !this.isDrawerOpen }
                    onCreateOrder={ () => this.createOrder() }
                    isOrderButtonDisabled = { this.isOrderButtonDisabled }
                />
            }
            
            <div class="bg-white w-4/5 m-auto rounded-xl shadow-xl mt-16 mb-16">
                <Header
                    totalPrice = { this.totalPrice }
                    onToggleDrawer={ () => this.isDrawerOpen = !this.isDrawerOpen }
                />
                <div class="p-10">
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
                        onAddToFavorite={ (item: Product) => this.addToFavorite(item) }
                        onAddToCart={(item: Product) => this.addToCart(item)}
                    />
                </div>
            </div>
        </>
    )
  },
})

