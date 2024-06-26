import { defineComponent, ref, watch, type Ref, onMounted } from "vue";
import { storeToRefs } from 'pinia'

import { useCartStore } from "@/stores/cart/store";
import { useFavoritesStore } from "@/stores/favorites/store";
import Header from "@/components/header";
import Drawer from "@/components/drawer";

export default defineComponent({
  name: "App",
  setup() {
    const isDrawerOpen: Ref<boolean> = ref(false),
    cartStore = useCartStore(),
    favoritesStore = useFavoritesStore(),
    { cart } = storeToRefs(cartStore)

    onMounted(async () => favoritesStore.fetchFavorites())

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

