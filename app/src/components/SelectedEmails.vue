<template>
    <div class="tags">
        <span>Hello</span>
        <div v-for="email in emails" class="tag">{{email}}</div>
    </div>
</template>

<script>
    export default {
        name: "SelectedEmails",
        data () {
            return {
                emails: []
            }
        },
        updated () {
            console.log('here',     this.$store.getters['students/getEmail'])
            this.emails = this.$store.getters['students/getEmail']
        },
        // computed: {
        //     getEmails() {
        //         console.log('hello', this.$store.getters['students/getEmail'])
        //         return this.$store.getters['students/getEmail']
        //     },
        // },
    }
</script>

<style scoped>

</style>