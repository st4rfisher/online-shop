import { defineStore } from "pinia";
import { reactive } from "vue";

export const useFiltersStore = defineStore('filters', () => {
    const filters = reactive({
        sortBy: 'title',
        searchQuery: ''
    })

    function setSortBy(filterName: string) {
        filters.sortBy = filterName
    }

    function setSearchQuery(searchQuery: string) {
        filters.searchQuery = searchQuery
    }

    return { filters, setSortBy, setSearchQuery }
})