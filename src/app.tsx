import { defineComponent } from "vue";
import Header from "@/components/header";
import CardList from "@/components/cardList";
import Drawer from "@/components/drawer";

export default defineComponent({
  name: "App",
  setup() {
    
    return {

    }
  },
  render() {
    return (
        <>
            <Drawer/>
            <div class="bg-white w-4/5 m-auto rounded-xl shadow-xl mt-16 mb-16">
                <Header/>
                <div class="p-10">
                    <h2 class="text-3xl font-bold mb-8">Все кроссовки</h2>
                    <CardList />
                </div>
            </div>
        </>
    )
  },
})

