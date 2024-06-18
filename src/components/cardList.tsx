import { defineComponent, onMounted, type PropType, inject } from "vue";
import Card from "@/components/card";
import { type Product, type Favorite } from "@/model/product";

export default defineComponent({
    name: "CardList",
    props: {
        items: Array as PropType<Product[]>
    },
    emits: ['toggleFavorite', 'addToCart'],
    setup(_props, { emit }) {
        const { cardAddHandle } = inject('cart') as any
        return {
            emit, cardAddHandle
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
                                onClickAdd={ () => this.cardAddHandle(item) }
                            />
                        </li>
                    ))
                }
            </ul>
        )
    },
})

