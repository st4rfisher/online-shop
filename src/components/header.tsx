import { computed, defineComponent } from "vue";

export default defineComponent({
  name: "Header",
  props: {
    totalPrice: Number
  },
  emits: ['toggleDrawer'],
  setup(_props, {emit}) {
    
    return {
        emit
    }
  },
  render() {
    return (
        <header class="flex justify-between border-b border-slate-300 px-10 py-8">
            <div class="flex items-center gap-4">
                <img class="w-10" src="/images/logo.png" alt="Логотип"/>
                <div>
                    <h2 class="text-xl font-bold uppercase">Vue Sneakers</h2>
                    <p class="text-slate-400">Магазин лучших кроссовок</p>
                </div>
            </div>
            <ul class="flex items-center gap-10">
                <li class="flex items-center gap-3 text-gray-500 hover:text-black cursor-pointer transition-colors"
                    onClick={ () => this.emit('toggleDrawer') }
                >
                    <img src="/images/cart.svg" alt="Корзина"/>
                    {
                        this.totalPrice !== 0 ?
                        <b>{ `${this.totalPrice} руб.` }</b>
                        : <span>Корзина</span>
                    }
                </li>
                <li class="flex items-center gap-3 text-gray-500 hover:text-black cursor-pointer transition-colors">
                    <img src="/images/heart.svg" alt="Закладки"/>
                    <span>Закладки</span>
                </li>
                <li class="flex items-center gap-3 text-gray-500 hover:text-black cursor-pointer transition-colors">
                    <img src="/images/profile.svg" alt="Профиль"/>
                    <span>Профиль</span>
                </li>
            </ul>
        </header>
    )
  },
})

