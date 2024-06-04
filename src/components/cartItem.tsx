import { defineComponent, type PropType } from "vue";
import { type Product } from "@/model/product";

export default defineComponent({
  name: "CartItem",
//   props: {
//     data: Object as PropType<Product>,
//     isFavorite: Boolean,
//     isAdded: Boolean,
//     // onClickAdd: Function,
//     // onClickFavorite: Function
//   },
  setup() {


    return {
        
    }
  },
  render() {
    return (
        <div class="flex items-center border border-slate-200 p-4 rounded-xl gap-4">
            <img class="w-16 h-16" src="/images/sneakers/sneakers-1.jpg" alt="Товар" />
            <div class="flex flex-col w-full">
                <p>Кроссовки Nike</p>
                <div class="flex justify-between mt-2">
                    <b>12990 руб.</b>
                    <img class="opacity-40 hover:opacity-100 cursor-pointer transition" src="/images/close.svg" alt="Товар" />
                </div>
            </div>
        </div>
    )
  },
})

