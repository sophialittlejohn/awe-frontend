<template>
    <div class="container">
        <h2 style="margin-right: 10px;">Selected Emails:</h2>
        <div class="tags">
            <span v-for="email in emails" class="tag is-medium my-tag">
                {{email}}
                <button @click="removeEmail(email)" class="delete is-small"></button>
            </span>
        </div>
    </div>
</template>

<script>
    export default {
        name: "SelectedEmails",
        computed: {
            emails() {
                return this.$store.getters['students/getEmails']
            }
        },
        watch: {
            emails: () => {
                console.log('watching emails ')
            }
        },
        methods: {
            removeEmail(email) {
                console.log('removing', email)
                return this.$store.commit('students/removeEmailAddress', email)
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import "../scss/main";

    .container {
        margin: 10px 0 0 0;
        display: flex;
    }

    .my-tag {
        background-color: $color-primary;
        color: white;
    }
</style>