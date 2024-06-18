import { defineComponent, type PropType, onMounted, inject } from "vue";
import clsx from "clsx";
import { type Product } from "@/model/product";
import { useRoute } from "vue-router";

export default defineComponent({
    name: "Card",
    props: {
        data: Object as PropType<Product>,
        // isFavorite: Boolean,
        // isAdded: Boolean,
        // onClickAdd: Function,   
    },
    emits: ['toggleFavorite', 'clickAdd'],
    setup(_props, { emit }) {
        const route = useRoute()
        
        return {
            emit, route
        }
    },
    render() {
        return (
            <div class="flex flex-col relative w-full h-full bg-white border border-slate-100 rounded-3xl p-8 hover:-translate-y-2 hover:shadow-xl transition">
                <img class={ 
                    clsx(
                        !this.data?.isFavorite && "opacity-70 hover:opacity-100",
                        "absolute top-8 left-8 cursor-pointer transition"
                    )}
                    src={ this.data?.isFavorite ? "/images/like-2.svg" : "/images/like-1.svg" }
                    alt= { this.data?.isFavorite ? "Убрать из закладок" : "Добавить в закладки" }
                    onClick={ () => this.emit('toggleFavorite') }
                />
                <img class="w-full object-contain max-h-[205px]" src={`/images/${this.data?.imageUrl}`} alt={this.data?.title} />
                <p class="mb-auto text-center">{ this.data?.title }</p>
                <div class="flex justify-between items-end mt-5">
                    <div class="flex flex-col">
                        <span class="text-slate-400">Цена:</span>
                        <b>{ this.data?.price } руб.</b>
                    </div>
                    {
                        this.route.name === "home" &&
                        <img class={ 
                            clsx(
                                !this.data?.isAdded && "opacity-40 hover:opacity-100",
                                "cursor-pointer transition"
                            )}
                            src={ this.data?.isAdded ? "/images/checked.svg" : "/images/plus.svg" }
                            onClick={() => this.emit('clickAdd') }
                            alt={ this.data?.isAdded ? "Убрать из корзины" : "Добавить в корзину" }
                        />
                    }
                </div>
            </div>
        )
    },
})

