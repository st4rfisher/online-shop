import { computed, defineComponent, type PropType } from "vue";
import CartList from "@/components/cartList";
import { type Product } from "@/model/product";
import clsx from "clsx";

export default defineComponent({
  name: "Drawer",
  props: {
    totalPrice: Number,
    vatPrice: Number,
    isOrderButtonDisabled: Boolean
  },
  emits: ['toggleDrawer', 'createOrder'],
  setup(props, {emit}) {

    return {
        emit
    }
  },
  render() {
    return (
        <>
            <div class="fixed top-0 left-0 h-full w-full bg-black z-10 opacity-70" onClick={() => this.emit('toggleDrawer') }/>
            <div class="flex flex-col fixed top-0 right-0 h-full w-96 bg-white z-20 p-8">
                <div class="flex items-center justify-between">
                    <button class="p-1 opacity-30 hover:opacity-100 transition"
                        onClick={() => this.emit('toggleDrawer') }
                    >
                        <img class="" src="/images/arrow-next.svg" alt="" />
                    </button>
                    <h2 class="text-2-xl font-bold">Корзина</h2>
                </div>
                
                {
                    this.totalPrice !== 0 ?
                    <>
                        <CartList/>
                        <div class="flex flex-col w-full self-end gap-4 mt-auto">
                            <div class="flex gap-2">
                                <span>Итого:</span>
                                <div class="flex-1 border-b border-dashed"></div>
                                <b>{ this.totalPrice } руб.</b>
                            </div>

                            <div class="flex gap-2">
                                <span>Налог 5%:</span>
                                <div class="flex-1 border-b border-dashed"></div>
                                <b>{ this.vatPrice } руб.</b>
                            </div>
                        </div>
                    </>
                    
                    : 
                    <div class="flex flex-col items-center m-auto">
                        <img height="170" width="170" src="/images/package-icon.png" alt="Корзина пуста"/>
                        <h2 class="mt-4 text-2xl font-medium">Корзина пустая</h2>
                        <p class="text-gray-400 text-center mt-2">
                            Необходимо добавить товары из каталога, 
                            чтобы сделать заказ
                        </p>
                    </div>
                }
                <button 
                    disabled={ this.isOrderButtonDisabled }
                    class={
                        clsx(
                            this.totalPrice && !this.isOrderButtonDisabled ? 
                            "bg-lime-500 hover:bg-lime-600 active:bg-lime-700" 
                            : "bg-gray-300 cursor-auto",
                            "transition w-full rounded-xl text-white py-3 mt-4"
                        )
                    }
                    onClick={ () => this.emit('createOrder') }
                >
                    Оформить заказ
                </button>
            </div>
        </>
    )
  },
})

