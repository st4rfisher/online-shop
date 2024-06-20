import { defineComponent, inject } from "vue";
import CartItem from "@/components/cartItem";
import { type Product } from "@/model/product";
import { storeToRefs } from 'pinia'
import { useCartStore } from "@/stores/cart/store";

export default defineComponent({
  name: "CartList",
  setup() {
    const cartStore = useCartStore(),
    { cart } = storeToRefs(cartStore)

    return {
      cartStore, cart
    }
  },
  render() {
    return (
      <ul class="flex flex-col w-full h-full overflow-y-auto mt-6 mb-6" v-auto-animate>
        {
          this.cart?.map((item: Product) => (
            <li class="mt-2">
              <CartItem 
                data={ item }
                onRemoveFromCart={ () => this.cartStore.removeFromCart(item)}
              />
            </li>
          ))
        }
      </ul>
    )
  },
})

