import { defineComponent, type PropType, inject } from "vue";
import { type Product } from "@/model/product";

export default defineComponent({
  name: "CartItem",
  props: {
    data: Object as PropType<Product>,
  },
  emits: ['removeFromCart'],
  setup(_props, { emit }) {

    return { emit }
  },
  render() {
    return (
      <div class="flex items-center border border-slate-200 p-4 rounded-xl gap-4">
        <img class="w-16 h-16" src={`/images/${ this.data?.imageUrl }`} alt={`${ this.data?.title }`} />
        <div class="flex flex-col w-full">
          <p>{ this.data?.title }</p>
          <div class="flex justify-betвween mt-2">
            <b>{ this.data?.price } руб.</b>
            <img class="ml-auto opacity-40 hover:opacity-100 cursor-pointer transition" src="/images/close.svg" alt="Убрать" 
              onClick={ () => this.emit('removeFromCart') }
            />
          </div>
        </div>
      </div>
    )
  },
})

