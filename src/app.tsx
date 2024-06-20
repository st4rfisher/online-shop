import { defineComponent, ref, watch, type Ref } from "vue";
import { storeToRefs } from 'pinia'

import { useCartStore } from "@/stores/cart/store";
import Header from "@/components/header";
import Drawer from "@/components/drawer";

export default defineComponent({
  name: "App",
  setup() {
    const isDrawerOpen: Ref<boolean> = ref(false)
    const cartStore = useCartStore(),
    { cart } = storeToRefs(cartStore)

    watch(cart, () => {
        localStorage.setItem('cart', JSON.stringify(cart.value))
    }, 
    { deep: true })
    
    return {
        isDrawerOpen
    }
  },
  render() {
    return (
        <>
            {
                this.isDrawerOpen &&
                <Drawer
                    onToggleDrawer={ () => this.isDrawerOpen = !this.isDrawerOpen }
                />
            }
            
            <div class="bg-white w-4/5 m-auto rounded-xl shadow-xl mt-16 mb-16">
                <Header
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

