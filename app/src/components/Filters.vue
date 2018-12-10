<template>
    <div class="field">
        <div class="control">
            <div class="select is-one-quarter">
                <select @change="changeSel">
                    <option v-for="filt in filters" :key="filt.label">{{filt.label}}</option>
                </select>
            </div>
        </div>
    </div>
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
                this.$store.commit('students/setActiveFilter', e.target.value)
            }
        }
    }
</script>

<style scoped>
</style>