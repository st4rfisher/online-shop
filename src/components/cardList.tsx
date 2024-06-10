import { defineComponent, onMounted, type PropType, inject } from "vue";
import Card from "@/components/card";
import { type Product } from "@/model/product";

export default defineComponent({
  name: "CardList",
  props: {
    items: Array as PropType<Product[]>,
  },
  emits: ['addToFavorite'],
  setup(_props, { emit }) {

    return {
        emit
    }
  },
  render() {
    return (
        <ul class="grid grid-cols-4 gap-5">   
            {
                this.items?.map((item: Product) => (
                    <li>
                        <Card 
                            key={ item.id }
                            data={{ 
                                id: item.id,
                                title: item.title,
                                imageUrl: item.imageUrl,
                                price: item.price,
                                isFavorite: item.isFavorite
                            }}
                            onClickFavorite={() => this.emit('addToFavorite', item)}
                        />
                    </li>
                ))
            }
        </ul>
    )
  },
})

