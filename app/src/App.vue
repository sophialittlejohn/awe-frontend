 <template>
    <div id="app">
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

<style lang="scss">
    @import "~bulma";
    @import "scss/main";

    * {
        padding: 0;
        margin: 0;
    }

    html, body {
        box-sizing: border-box;
        height: 100%;
        background: linear-gradient(45deg, #ffffff 0%,#e5e5e5 100%); /* W3C, IE10+, FF16+, Chrome26+, Opera12+, Safari7+ */

    }

    h1 {
        color: $color-secondary;
        font-weight: bold !important;
        font-size: 2em;
    }

    h2 {
        color: $color-primary;
        font-size: 1.5em !important;
        text-align: left;
        font-weight: bold;
    }

    #app {
        font-family: $font-stack-primary;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: $color-text;
        padding-top: 20px;
    }
</style>
