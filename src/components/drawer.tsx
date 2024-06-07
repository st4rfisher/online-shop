import { defineComponent } from "vue";
import CartList from "@/components/cartList";

export default defineComponent({
  name: "Drawer",
  emits: ['toggleDrawer'],
  setup(_props, {emit}) {
    
    return {
        emit
    }
  },
  render() {
    return (
        <>
            <div class="fixed top-0 left-0 h-full w-full bg-black z-10 opacity-70"></div>
            <div class="flex flex-col fixed top-0 right-0 h-full w-96 bg-white z-20 p-8">
                <div class="flex items-center justify-between">
                    <button class="p-1 opacity-30 hover:opacity-100 transition"
                        onClick={() => this.emit('toggleDrawer') }
                    >
                        <img class="" src="/images/arrow-next.svg" alt="" />
                    </button>
                    <h2 class="text-2-xl font-bold">Корзина</h2>
                </div>
                
                <CartList/>

                <div class="flex flex-col w-full self-end gap-4 mt-auto">
                    <div class="flex gap-2">
                        <span>Итого:</span>
                        <div class="flex-1 border-b border-dashed"></div>
                        <b>12990 руб.</b>
                    </div>

                    <div class="flex gap-2">
                        <span>Налог 5%:</span>
                        <div class="flex-1 border-b border-dashed"></div>
                        <b>900 руб.</b>
                    </div>
                    <button class="bg-lime-500 hover:bg-lime-600 active:bg-lime-700 transition w-full rounded-xl text-white py-3 mt-4">
                        Оформить заказ
                    </button>
                </div>

                
            </div>
        </>
    )
  },
})

