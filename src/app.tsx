import { defineComponent, provide, ref, watch, computed, type ComputedRef, type Ref } from "vue";
import axios from "axios";
import Header from "@/components/header";
import Drawer from "@/components/drawer";
import { type Product } from "@/model/product";

export default defineComponent({
  name: "App",
  setup() {
    const isDrawerOpen: Ref<boolean> = ref(false),

    cart: Ref<Product[]> = ref([]),
    totalPrice: ComputedRef<number> = computed(
        () => cart.value.reduce((total: number, item: Product) => total + item.price, 0)
    ),
    vatPrice: ComputedRef<number> = computed(
        () => Math.round((totalPrice.value * 5) / 100)
    ),
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
        isDrawerOpen, cart, totalPrice, vatPrice
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
                />
            }
            
            <div class="bg-white w-4/5 m-auto rounded-xl shadow-xl mt-16 mb-16">
                <Header
                    totalPrice = { this.totalPrice }
                    onToggleDrawer={ () => this.isDrawerOpen = !this.isDrawerOpen }
                />
                <div class="p-10">
                    <router-view></router-view>
                </div>
            </div>
        </>
    )
  },
})

