<template>
    <div class="container">
        <div class="main-container">
            <h1>AWE Student Management</h1>
            <hr/>
            <div class="tab-container">
                <div class="tab" :class="activeTab==='all' ? 'activeTab' : '' " @click="renderAll">All</div>
                <div class="tab" :class="activeTab==='current' ? 'activeTab' : '' " @click="renderCurrent">Current</div>
                <div class="tab" :class="activeTab==='past' ? 'activeTab' : '' " @click="renderPast">Past</div>
                <div class="tab" :class="activeTab==='staff' ? 'activeTab' : '' " @click="renderStaff">Staff</div>
                <div class="logout">
                    <router-link @click="logout" to="/login">Logout</router-link>
                </div>
            </div>
            <div class="active-page">
                <Students/>
                <SelectedEmails/>
            </div>
        </div>
    </div>
</template>

<script>
    // use comma separated list to paste into email

    import Students from "./Students";
    import SelectedEmails from "./SelectedEmails";
    import Search from "./Search";

    export default {
        name: "TabNav",
        components: {SelectedEmails, Students},
        data() {
            return {
                activeTab: 'all'
            }
        },
        methods: {
            renderAll() {
                this.activeTab = 'all'
                this.$store.dispatch('students/fetchStudents')
            },
            renderCurrent() {
                this.activeTab = 'current'
                this.$store.dispatch('students/fetchCurrentStudents', 'asc')
            },
            renderPast() {
                this.activeTab = 'past'
                this.$store.dispatch('students/fetchPastStudents')
            },
            renderStaff() {
                this.activeTab = 'staff'
                // this.$store.dispatch('students/fetchCurrentStudents', 'asc')
            },
            logout() {
                localStorage.clear()
                this.$router.push({name: 'login'})
            }
        }
    }
</script>

<style scoped lang="scss">
    @import "../scss/main";

    .main-container {
        background-color: $color-bg;
        padding: 10px;
        border-radius: 5px;
    }

    .tab-container {
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

    .logout {
        display: flex;
        flex: 1;
        align-self: center;
        justify-content: flex-end;
        margin-right: 10px;
    }
</style>