import { defineStore } from "pinia";
import { type Ref, ref, type ComputedRef, computed, watch } from "vue";
import axios from "axios";
import { type Product } from "@/model/product";

export const useCartStore = defineStore('cart', () => {
    const cart: Ref<Product[]> = ref([]),
    localCart = localStorage.getItem('cart'),
    totalPrice: ComputedRef<number> = computed(
        () => cart.value.reduce((total: number, item: Product) => total + item.price, 0)
    ),
    vatPrice: ComputedRef<number> = computed(
        () => Math.round((totalPrice.value * 5) / 100)
    ),
    isOrderCreating: Ref<boolean> = ref(false),
    currentOrderID: Ref<number | null> = ref(null)

    async function setCart() {
        cart.value = localCart ? JSON.parse(localCart) : []
    }

    function addToCart(item: Product) {
        cart.value.push(item)
        item.isAdded = true
    }

    function removeFromCart(item: Product) {
        cart.value.splice(cart.value.indexOf(item), 1)
        item.isAdded = false
    }

    function cardAddHandle(item: Product) {
        !item.isAdded ? addToCart(item) : removeFromCart(item)
    }

    async function createOrder() {
        isOrderCreating.value = true
        try {
            const { data } = await axios.post('https://a464207e3cbafe55.mokky.dev/orders', {
                items: cart.value,
                totalPrice: totalPrice.value
            })
            currentOrderID.value = data.id
            cart.value = []
            return data
        } catch (error) {
            console.log(error)
        } finally {
            isOrderCreating.value = false
        }
    }

    return { 
        cart, 
        totalPrice, 
        vatPrice,
        isOrderCreating,
        currentOrderID,
        setCart,
        addToCart, 
        removeFromCart, 
        cardAddHandle,
        createOrder    
    }
})