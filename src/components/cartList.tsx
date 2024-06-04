import { defineComponent, type PropType } from "vue";
import CartItem from "@/components/cartItem";
import { type Product } from "@/model/product";

export default defineComponent({
  name: "CartList",
  setup() {


    return {
        
    }
  },
  render() {
    return (
        <ul class="flex flex-col w-full h-full overflow-y-auto mt-6 mb-6">
            <li class="mt-2">
                <CartItem />
            </li>
            <li class="mt-2">
                <CartItem />
            </li>
        </ul>
    )
  },
})

