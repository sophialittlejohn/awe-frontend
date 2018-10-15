<template>
    <div class="container">
        <h1>{{activeTab.replace(/^\w/, c => c.toUpperCase())}} Students Overview</h1>
        <div class="main-container">
            <div class="tab-container">
                <div class="tab" :class="activeTab==='all' ? 'activeTab' : '' " @click="renderAll">All</div>
                <div class="tab" :class="activeTab==='current' ? 'activeTab' : '' " @click="renderCurrent">Current</div>
                <div class="tab" :class="activeTab==='past' ? 'activeTab' : '' " @click="renderPast">Past</div>
                <div class="tab" :class="activeTab==='staff' ? 'activeTab' : '' " @click="renderStaff">Staff</div>
            </div>
            <div class="active-page">
                <Students />
                <SelectedEmails />
            </div>
        </div>
    </div>
</template>

<script>
    // use comma separated list to paste into email

    import Students from "./Students";
    import SelectedEmails from "./SelectedEmails";

    export default {
        name: "TabNav",
        components: {SelectedEmails, Students},
        data () {
            return {
                activeTab: 'all'
            }
        },
        methods: {
            renderAll () {
                this.activeTab = 'all'
                this.$store.dispatch('students/fetchStudents')
            },
            renderCurrent () {
                this.activeTab = 'current'
                this.$store.dispatch('students/fetchCurrentStudents', 'asc')
            },
            renderPast () {
                this.activeTab = 'past'
                this.$store.dispatch('students/fetchPastStudents')
            },
            renderStaff () {
                this.activeTab = 'staff'
                // this.$store.dispatch('students/fetchCurrentStudents', 'asc')
            }
        }
    }
</script>

<style scoped lang="scss">
    .main-container {
        background-color: rgb(111, 181, 240);
        padding: 10px;
        border-radius: 5px;
    }

    .tab-container {
        /*border: 1px solid rgba(5, 2, 5, 0.5);*/
        margin-top: 20px;
        display: flex;
    }

    .tab {
        font-size: 1.5em;
        width: 100px;
        transition: background-color ease 0.3s;
    }

    .tab, .activeTab {
        padding: 5px;
        border-radius: 5px 5px 0 0;
    }

    .activeTab {
        background-color: white;
    }

    .my-title {
        position: fixed;
    }

    .active-page {
        background-color: white;
        padding: 10px;
        border-radius: 0 5px 5px 5px;
    }
</style>