<template>
    <div class="container">
        <h2 v-clipboard:copy="emails"
            v-clipboard:success="onCopy"
            v-clipboard:error="onError"
            class="copy-email">
            Copy Emails
            <img :src="copyIcon" alt="copyIcon" style="height: 20px"/>
        </h2>
        <div class="tags">
            <span v-for="email in emails" class="tag is-medium my-tag">
                {{email}}
                <button @click="removeEmail(email)" class="delete is-small"></button>
            </span>
        </div>
    </div>
</template>

<script>
    import copyIcon from '../assets/copy.svg'

    export default {
        name: "SelectedEmails",
        data () {
            return {
                copyIcon,
            }
        },
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
            removeEmail (email) {
                return this.$store.commit('students/removeEmailAddress', email)
            },
            onCopy () {
                console.log('successful')
            },
            onError () {
                console.log('failed')
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
        max-width: inherit
    }

    .copy-email {
        margin-right: 10px;
        &:hover {
            cursor: pointer;
        }
    }
</style>