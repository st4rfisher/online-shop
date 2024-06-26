import { defineComponent, type ComputedRef, computed } from "vue";
import { storeToRefs } from 'pinia';
import { useCartStore } from "@/stores/cart/store";
import { useFavoritesStore } from "@/stores/favorites/store";

export default defineComponent({
  name: "Header",
  emits: ['toggleDrawer'],
  setup(_props, {emit}) {
    const cartStore = useCartStore(),
    favoritesStore = useFavoritesStore(),
    { totalPrice } = storeToRefs(cartStore),
    { favorites } = storeToRefs(favoritesStore)

    return {
        totalPrice, favorites, emit
    }
  },
  render() {
    return (
        <header class="flex justify-between border-b border-slate-300 px-10 py-8">
            <router-link to="/">
                <div class="flex items-center gap-4">
                    <img class="w-10" src="/images/logo.png" alt="Логотип"/>
                    <div>
                        <h2 class="text-xl font-bold uppercase">Vue Sneakers</h2>
                        <p class="text-slate-400">Магазин лучших кроссовок</p>
                    </div>
                </div>
            </router-link>
            <ul class="flex items-center gap-10">
                <li class="flex items-center gap-3 text-gray-500 hover:text-black cursor-pointer transition-colors"
                    onClick={ () => this.emit('toggleDrawer') }
                >
                    <img src="/images/cart.svg" alt="Корзина"/>
                    {
                        this.totalPrice !== 0 ?
                        <b>{ `${this.totalPrice} руб.` }</b>
                        : <span>Корзина</span>
                    }
                </li>
                <li>
                    <router-link class="relative flex items-center gap-3 hover:text-black cursor-pointer text-gray-500 transition-colors" to="/favorites">
                        <img src="/images/heart.svg" alt="Закладки"
                        />
                        <span>Закладки</span>
                        {
                            this.favorites.length > 0 &&
                            <b class="absolute left-4 -bottom-2 text-red-500 text-xs">{ this.favorites.length }</b>
                        }
                    </router-link>
                </li>
                <li class="flex items-center gap-3 text-gray-500 hover:text-black cursor-pointer transition-colors">
                    <img src="/images/profile.svg" alt="Профиль"/>
                    <span>Профиль</span>
                </li>
            </ul>
        </header>
    )
  },
})

