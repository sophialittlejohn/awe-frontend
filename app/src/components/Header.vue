<template>
    <div class="has-background-grey-light">
        <div class="has-background-grey-light container navbar">
            <div class="navbar-brand">
                <div class="navbar-burger">
                    <div>
                        <div>Hamburger goes here</div>
                    </div>
                </div>
            </div>
            <div class="navbar-menu">
                <div class="navbar-start">
                    <div class="nav-bar-flex">
                    <img class="my-logo" :src="logo" alt="logo"/>
                    <span class="my-logo-description">Ahead With English</span>
                    </div>
                </div>
                <div class="navbar-end" v-if="isLoggedIn">
                    <div class="navbar-item">
                        <router-link to="/login">Hello</router-link>
                    </div>
                    <div class="navbar-item" @click="logout">
                        <router-link to="/login">Logout</router-link>
                    </div>
                </div>
                <div class="navbar-dropdown">
                    <div class="navbar-divider">hiiii</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import Logo from '../assets/awe-logo.png'

    export default {
        name: "Header",
        data () {
            return {
                logo: Logo
            }
        },
        methods: {
            logout() {
                localStorage.clear()
                this.$router.push({name: 'login'})
            }
        },
        computed: {
            isLoggedIn() {
                return this.$store.getters['login/getLoggedIn']
            }
        }
    }
</script>

<style scoped>
    .my-logo {
        height: 60px;
        width: 35px;
    }

    .my-logo-description {

    }

    .nav-bar-flex {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100%;
        width: 120%;
    }

</style>