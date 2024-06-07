import { defineComponent, type PropType } from "vue";
import { type Product } from "@/model/product";

export default defineComponent({
  name: "Card",
  props: {
    data: Object as PropType<Product>,
    isFavorite: Boolean,
    isAdded: Boolean,
    // onClickAdd: Function,
    // onClickFavorite: Function
  },
  setup() {
    const onClickAdd = () => {
        console.log(1)
    },
    onClickFavorite = () => {
        console.log(2)
    }
        
    return {
        onClickAdd, onClickFavorite
    }
  },
  render() {
    return (
        <div class="relative bg-white border border-slate-100 rounded-3xl p-8 cursor-pointer hover:-translate-y-2 hover:shadow-xl transition">
            <img class="absolute top-8 left-8" 
                src={ this.isFavorite ? "/images/like-2.svg" : "/images/like-1.svg" }  
                alt="Добавить в закладки"
                onClick={() => this.onClickFavorite() }
            />
            <img class="m-auto" src={ `/images/${this.data?.imageUrl}` } alt={ this.data?.title } width="250"/>
            <p class="mt-2 text-center">{ this.data?.title }</p>
            <div class="flex justify-between items-end mt-5">
                <div class="flex flex-col">
                    <span class="text-slate-400">Цена:</span>
                    <b>{ this.data?.price } руб.</b>
                </div>  
                <img src={ this.isAdded ? "/images/checked.svg" : "/images/plus.svg" } 
                    onClick={ () => this.onClickAdd() }
                    alt="Добавить в корзину"
                />
            </div>
        </div>
    )
  },
})

