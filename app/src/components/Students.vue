<template>
    <div>
        <Search/>
        <div class="table-container">
            <table class="my-table table is-bordered is-striped is-narrow is-hoverable is-fullwidth">
                <thead>
                <tr>
                    <th>#</th>
                    <th>First Name</th>
                    <th @click="toggleLastNameOrder">Last Name
                        <span class="icon is-small ordering">
                        <!--todo: fix the icon-->
                        <i v-if="lastNameOrder ==='asc'" class="fas icon-placement"
                           :class="lastNameOrder ==='asc' ? 'fa-arrow-circle-down' : 'fa-arrow-circle-up'"></i>
                    </span>
                    </th>
                    <th><span class="email-select">Email</span></th>
                    <th>Mother</th>
                    <th>Father</th>
                    <th>Registered</th>
                    <th @click="toggleStartDateOrder">Start Date
                        <span class="icon is-small ordering">
                        <i class="fas icon-placement"
                           :class="startOrder ==='asc' ? 'fa-arrow-circle-down' : 'fa-arrow-circle-up'"></i>
                    </span>
                    </th>
                </tr>
                </thead>
                <tfoot>
                <tr>
                    <th>Total: {{getStudents.length}}</th>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Email</th>
                    <th>Mother</th>
                    <th>Father</th>
                    <th>Registered</th>
                    <th>Start Date</th>
                </tr>
                </tfoot>
                <tbody v-for="student in getStudents">
                <tr :key="student.id" @click="viewStudentDetail(student.id)">
                    <th>{{getStudents.indexOf(student) + 1}}</th>
                    <td>{{student.first_name}}</td>
                    <td>{{student.last_name}}</td>
                    <td>
                    <span class="email-select">{{student.email}}
                        <img :src="getEmails.includes(student.email) ? grayPlusButton : greenPlusButton" style="height: 20px; cursor: pointer" alt="add" @click="copyEmail(student.email)" @click.stop="viewStudentDetail"/>
                    </span>
                    </td>
                    <td>{{student.mother_name}}</td>
                    <td>{{student.father_name}}</td>
                    <td v-if="student.registered" class="registered">Yes</td>
                    <td v-else class="not-registered">No</td>
                    <td>{{student.start_date}}</td>
                </tr>
                <transition name="fade">
                    <tr v-if="expanded && expanded === student.id">
                        <td colspan="8" class="my-background">
                            <StudentDetail :id="expanded"/>
                        </td>
                    </tr>
                </transition>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script>
    import Search from './Search'
    import Filters from "./Filters";
    import StudentDetail from "./StudentDetail";
    import greenPlusButton from '../assets/plus-button.svg'
    import grayPlusButton from '../assets/gray-plus-button.svg'

    export default {
        name: 'Students',
        data() {
            return {
                startOrder: 'asc',
                lastNameOrder: 'asc',
                expanded: Number,
                selectedEmails: [],
                allChecked: false,
                greenPlusButton,
                grayPlusButton
            }
        },
        components: {
            StudentDetail,
            Filters,
            Search
        },
        mounted() {
            this.$store.dispatch('students/fetchStudents')
        },
        computed: {
            getStudents() {
                return this.$store.getters['students/getStudents']
            },
            getEmails() {
                return this.$store.getters['students/getEmails']
            }
        },
        methods: {
            copyEmail(email) {
                this.selectedEmails.includes(email)
                    ? this.selectedEmails = this.selectedEmails.filter(item => item !== email)
                    : this.selectedEmails.push(email)
                return this.$store.commit('students/setEmailAddress', this.selectedEmails)
            },
            viewStudentDetail(studentId) {
                console.log('id', studentId)
                this.expanded === studentId
                    ? this.expanded = null
                    : this.expanded = studentId
            },
            toggleStartDateOrder() {
                this.startOrder === 'asc' ? this.startOrder = 'desc' : this.startOrder = 'asc'
                this.$store.dispatch('students/fetchStudentsOrderStartDate', {filt: this.startOrder})
            },
            toggleLastNameOrder() {
                // todo: make sure this works the way it should
                this.lastNameOrder === 'asc' ? this.lastNameOrder = 'desc' : this.lastNameOrder = 'asc'
                this.$store.getters['students/getStudents'].reverse()
            },
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
    .table-container {
        height: 50vh;
        overflow: scroll;
    }

    .my-table {
        border-collapse: collapse;
    }

    .not-registered {
        background-color: rgba(250, 50, 50, 0.1)
    }

    .registered {
        background-color: rgba(50, 250, 50, 0.1)
    }

    .ordering {
        & :hover {
            cursor: pointer;
        }
        float: right;
    }

    .icon-placement {
        margin-top: 5px;
    }

    .fade-enter-active, .fade-leave-active {
        transition: opacity 0.2s ease-in-out;
    }

    .fade-enter, .fade-leave-to {
        opacity: 0;
    }

    .my-background {
        border-radius: 5px;
        /*background-color: rgba(0, 215, 177, 1);*/
        background-color: rgb(0, 64, 168);
        color: white
    }

    .email-select {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    .my-icon {
        margin-left: 3px;
        color: lightgray;
    }

    .my-icon:active {
        margin-left: 3px;
        color: darkgray;
    }

    .my-icon::selection {
        margin-left: 3px;
        color: darkgray;
    }


</style>

