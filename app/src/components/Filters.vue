<template>
    <div class="field">
        <div class="control">
            <div class="select is-primary is-large is-one-quarter">
                <select @change="changeSel">
                    <option v-for="filt in filters">{{filt.label}}</option>
                </select>
            </div>
        </div>
    </div>
    <!--<select v-model="category" @change="renderCategory(category)">-->
</template>

<script>
    export default {
        name: "Filters",
        data () {
            return {
                filters: [
                    {label: 'first name'},
                    {label: 'last name'},
                    {label: 'teacher'},
                ],
                active: ''
            }
        },
        mounted () {
            this.$store.commit('students/setActiveFilter', this.filters[0].label)
        },
        methods: {
            changeSel (e) {
                console.log('here', e.target.value)
                this.$store.commit('students/setActiveFilter', e.target.value)
            }
        }
    }
</script>

<style scoped>

</style>