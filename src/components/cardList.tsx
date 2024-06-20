import { defineComponent, onMounted, type PropType, inject } from "vue";
import { storeToRefs } from 'pinia'

import { type Product, type Favorite } from "@/model/product";
import { useCartStore } from "@/stores/cart/store";
import Card from "@/components/card";

export default defineComponent({
    name: "CardList",
    props: {
        items: Array as PropType<Product[]>
    },
    emits: ['toggleFavorite', 'addToCart'],
    setup(_props, { emit }) {
        const cartStore = useCartStore()

        return {
            emit, cartStore
        }
    },
    render() {
        return (
            <ul class="grid grid-cols-4 gap-5" v-auto-animate>
                {
                    this.items?.map((item: Product) => (
                        <li key={item.id}>
                            <Card
                                data={{
                                    id: item.id,
                                    title: item.title,
                                    imageUrl: item.imageUrl,
                                    price: item.price,
                                    isFavorite: item.isFavorite,
                                    isAdded: item.isAdded
                                }}
                                onToggleFavorite={ () => this.emit('toggleFavorite', item) }
                                onClickAdd={ () => this.cartStore.cardAddHandle(item) }
                            />
                        </li>
                    ))
                }
            </ul>
        )
    },
})

