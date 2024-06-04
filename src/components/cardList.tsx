import { defineComponent } from "vue";
import Card from "@/components/card";

export default defineComponent({
  name: "CardList",
  setup() {
    
    return {

    }
  },
  render() {
    return (
        <div class="grid grid-cols-4 gap-5">
            <Card data={{ 
                name: "Мужские кроссовки",
                imageUrl: '/images/sneakers/sneakers-1.jpg',
                price: 1205
            }}
            isFavorite={true}
            isAdded={true}
            
            />
            <Card/>
        </div>
    )
  },
})

