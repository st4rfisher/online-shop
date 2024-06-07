import { defineComponent, onMounted, reactive, ref, watch, type Ref } from "vue";
import axios from "axios";
import Header from "@/components/header";
import CardList from "@/components/cardList";
import Drawer from "@/components/drawer";
import { type Product, type ResponceParams } from "@/model/product";

export default defineComponent({
  name: "App",
  setup() {
    const isDrawerOpen: Ref<boolean> = ref(false),
    items: Ref<Product[]> = ref([]),
    filters = reactive({
        sortBy: 'title',
        searchQuery: ''
    }),
    fetchItems = async () => {
        try {
            const params: ResponceParams = {
                sortBy: filters.sortBy,
            }
            if(filters.searchQuery) {
                params.title = `*${filters.searchQuery}*`
            }
            const { data } = await axios.get('https://a464207e3cbafe55.mokky.dev/products', { params })
            console.log(data)
            items.value = data
        } catch (error) {
            console.log(error)
        }
    },
    onChangeSelect = (target: HTMLSelectElement) => {
        filters.sortBy = target.value
    },
    onChangeSearchInput = (target: HTMLInputElement) => {
        filters.searchQuery = target.value
        console.log(filters.searchQuery)
    }

    onMounted(fetchItems)
    watch(filters, fetchItems)

    return {
        isDrawerOpen, items, onChangeSelect, onChangeSearchInput
    }
  },
  render() {
    return (
        <>
            {
                this.isDrawerOpen &&
                <Drawer
                    onToggleDrawer={ () => this.isDrawerOpen = !this.isDrawerOpen }
                />
            }
            
            <div class="bg-white w-4/5 m-auto rounded-xl shadow-xl mt-16 mb-16">
                <Header
                    onToggleDrawer={ () => this.isDrawerOpen = !this.isDrawerOpen }
                />
                <div class="p-10">
                    <div class="flex justify-between items-center mb-8 gap-4">
                        <h2 class="text-3xl font-bold mr-auto">Все кроссовки</h2>
                        <select class="py-2 px-3 border rounded-md outline-none" name="" id=""
                            onChange={(e) => this.onChangeSelect(e.target as HTMLSelectElement)} 
                        >
                            <option value="name">По названию</option>
                            <option value="price">Сначало дешевые</option>
                            <option value="-price">Сначало дорогие</option>
                        </select>
                        <div class="relative">
                            <img class="absolute left-3.5 top-1/2 -translate-y-1/2" src="/images/search.svg" alt="Поиск" />
                            <input class="border border-gray-200 rounded-md py-2 pl-10 pr-4 outline-none focus:border-gray-400 transition" 
                                type="text"
                                placeholder="Поиск"
                                onChange={(e) => this.onChangeSearchInput(e.target as HTMLInputElement)} 
                            />
                        </div>
                    </div>
                    
                    <CardList items={ this.items }/>
                </div>
            </div>
        </>
    )
  },
})

