<template>
    <div class="field">
        <div class="control my-input columns has-icons-left">
            <input class="input is-large column is-three-quarters" type="text" :placeholder="searchPlaceholder()" v-model="searchText" >
             <span class="icon is-small is-left"><i class="fas fa-search"></i></span>
            <Filters />
        </div>
    </div>
</template>

<script>
    import Filters from "./Filters";
    export default {
        name: "Search",
        components: {Filters},
        data() {
            return {
                searchText: '',
                searchFilter: 'first name'
            }
        },
        updated () {
            this.searchFilter = this.$store.getters['students/getActiveFilter']
        },
        methods: {
            handleSearch() {
                this.$store.dispatch('students/searchStudents', {search: this.searchText, filt: this.searchFilter})

            },
            searchPlaceholder () {
                return `Search by ${this.$store.getters['students/getActiveFilter']}...`
            }
        },
        watch: {
            searchText: {
                handler: 'handleSearch',
                immediate: true,
            }
        }
    }
</script>

<style scoped lang="scss">
    /*@import '../scss/main';*/

    .my-input {
        margin: 10px 0;
        justify-content: space-between;
    }

</style>