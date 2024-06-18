import { defineComponent, provide, ref, watch, computed, type ComputedRef, type Ref } from "vue";
import axios from "axios";
import Header from "@/components/header";
import Drawer from "@/components/drawer";
import { type Product } from "@/model/product";

export default defineComponent({
  name: "App",
  setup() {
    const isDrawerOpen: Ref<boolean> = ref(false),
    isCreatingOrder: Ref<boolean> = ref(false),
    isOrderButtonDisabled: ComputedRef<boolean> = computed(() => cart.value.length === 0 || isCreatingOrder.value),
    cart: Ref<Product[]> = ref([]),
    totalPrice: ComputedRef<number> = computed(
        () => cart.value.reduce((total: number, item: Product) => total + item.price, 0)
    ),
    vatPrice: ComputedRef<number> = computed(
        () => Math.round((totalPrice.value * 5) / 100)
    ),
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
    removeFromCart = (item: Product) => {
        cart.value.splice(cart.value.indexOf(item), 1)
        item.isAdded = false
    },
    addToCart = (item: Product) => {
        cart.value.push(item)
        item.isAdded = true
    },
    cardAddHandle = (item: Product) => {
        !item.isAdded ? addToCart(item) : removeFromCart(item)
    }

    provide('cart', { 
        cart,
        addToCart,
        removeFromCart,
        cardAddHandle
    })

    watch(cart, () => {
        localStorage.setItem('cart', JSON.stringify(cart.value))
    }, 
    { deep: true })

    return {
        isDrawerOpen, isCreatingOrder, isOrderButtonDisabled, cart, totalPrice, vatPrice, createOrder
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
                    <router-view></router-view>
                    {/* <Home/> */}
                </div>
            </div>
        </>
    )
  },
})

