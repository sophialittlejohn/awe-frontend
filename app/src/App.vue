<template>
    <div id="app">
        <div>
            <div>
                <Header/>
            </div>
        </div>
        <router-view/>
    </div>
</template>

<script>
    import Header from "./components/Header";

    export default {
        name: "app",
        components: {
            Header,
        },
    };
</script>

<style>
    @import "~bulma";

    html, body {
        box-sizing: border-box;
    }

    #app {
        font-family: "Avenir", Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
    }
</style>
