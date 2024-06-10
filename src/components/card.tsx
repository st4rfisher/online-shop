import { defineComponent, type PropType, onMounted, inject } from "vue";
import { type Product } from "@/model/product";

export default defineComponent({
  name: "Card",
  props: {
    data: Object as PropType<Product>,
    // isFavorite: Boolean,
    // isAdded: Boolean,
    // onClickAdd: Function,   
  },
  emits: ['clickFavorite'],
  setup(_props, { emit }) {
        
    return {
        emit
    }
  },
  render() {
    return (
        <div class="flex flex-col relative w-full h-full bg-white border border-slate-100 rounded-3xl p-8 cursor-pointer hover:-translate-y-2 hover:shadow-xl transition">
            <img class="absolute top-8 left-8" 
                src={ this.data?.isFavorite ? "/images/like-2.svg" : "/images/like-1.svg" }  
                alt="Добавить в закладки"
                onClick={() => this.emit('clickFavorite') }
            />
            <img class="w-full object-contain max-h-[205px]" src={ `/images/${this.data?.imageUrl}` } alt={ this.data?.title }/>
            <p class="mb-auto text-center">{ this.data?.title }</p>
            <div class="flex justify-between items-end mt-5">
                <div class="flex flex-col">
                    <span class="text-slate-400">Цена:</span>
                    <b>{ this.data?.price } руб.</b>
                </div>  
                <img src={ this.data?.isAdded ? "/images/checked.svg" : "/images/plus.svg" } 
                    // onClick={ () => this.onClickAdd() }
                    alt="Добавить в корзину"
                />
            </div>
        </div>
    )
  },
})

