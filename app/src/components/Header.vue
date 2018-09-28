<template>
    <div class="has-background-white-ter navbar-background">
        <div class="has-background-white-ter container navbar navbar-background">
            <div class="navbar-brand">
                <div class="navbar-burger">
                    <div>
                        <div>Hamburger goes here</div>
                    </div>
                </div>
            </div>
            <div class="navbar-menu">
                <div class="navbar-start go-home" @click="$router.push({name: 'Students'})">
                    <div class="nav-bar-flex">
                        <img class="my-logo" :src="logo" alt="logo"/>
                        <span class="my-logo-description">Ahead With English</span>
                    </div>
                </div>
                <div class="navbar-end" v-if="isLoggedIn">
                    <div class="navbar-item">
                        <router-link to="/">Students</router-link>
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
            logout () {
                localStorage.clear()
                this.$router.push({name: 'login'})
            }
        },
        computed: {
            isLoggedIn () {
                return this.$store.getters['login/getLoggedIn']
            }
        }
    }
</script>

<style lang="scss" scoped>
    .my-logo {
        height: 60px;
        width: 35px;
        margin-right: 10px;
    }

    .nav-bar-flex {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100%;
        width: 120%;
    }

    .go-home {
        &:hover {
            cursor: pointer;
        }
    }

    .navbar-background {
        -webkit-box-shadow: 0px 1px 14px 2px rgba(102, 102, 102, 0.83);
        -moz-box-shadow: 0px 1px 14px 2px rgba(102, 102, 102, 0.83);
        box-shadow: 0px 1px 14px 2px rgba(102, 102, 102, 0.83);
    }

</style>