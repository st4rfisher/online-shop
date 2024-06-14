import { defineComponent, inject } from "vue";
import CartItem from "@/components/cartItem";
import { type Product } from "@/model/product";

export default defineComponent({
  name: "CartList",
  setup() {
    const { cart, removeFromCart } = inject('cart') as any

    return {
      cart, removeFromCart
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
                onRemoveFromCart={ () => this.removeFromCart(item)}
              />
            </li>
          ))
        }
      </ul>
    )
  },
})

