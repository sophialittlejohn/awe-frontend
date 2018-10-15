<template>
    <div>
        <h1>Welcome to AWE's People Management System</h1>
        <div class="container my-container">
            <div class="field">
                <p class="control has-icons-left my-input-field">
                    <input class="input" type="email" placeholder="Email" v-model="username">
                    <span class="icon is-small is-left"><i class="fas fa-envelope"></i></span>
                </p>
            </div>
            <div class="field">
                <p class="control has-icons-left my-input-field">
                    <input class="input" type="password" placeholder="Password" v-model="password" @keyup.enter="login">
                    <span class="icon is-small is-left"><i class="fas fa-lock"></i></span>
                </p>
            </div>
            <div>
                <input class="button is-primary" type="submit" value="Login" @click="login"/>
            </div>
            <div class="error-container">
                <span class="error" v-if="errors.non_field_errors">{{errors.non_field_errors[0]}}</span>
                <span class="error" v-else-if="errors.username">Username: {{errors.username[0]}}</span>
                <span class="error" v-else-if="errors.password">Password: {{errors.password[0]}}</span>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'login',
        data () {
            return {
                username: '',
                password: ''
            }
        },
        methods: {
            async login () {
                await this.$store.dispatch('login/fetchTokens', {username: this.username, password: this.password})
                this.$router.push({name: 'TabNav'})
            },
        },
        computed: {
            errors () {
                return this.$store.getters['login/getErrors']
            },
        },
    }
</script>

<style lang="scss">
    @import "~bulma";

    .my-input-field {
        max-width: 400px;
        margin: auto;
    }

    .my-container {
        border: 1px solid rgba(0, 0, 0, 0.2);
        padding: 60px;
        border-radius: 10px;
        margin: 30px auto;
    }

    h1 {
        font-weight: 800;
        font-size: 2em;
        margin: 20px;
    }

    .error-container {
        margin: 20px;
    }

    .error {
        color: red;
    }

</style>