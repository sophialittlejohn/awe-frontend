<template>
    <div class="container">
        <h1>Student Overview</h1>
        <Search/>
        <table class="table table is-bordered is-striped is-narrow is-hoverable is-fullwidth">
            <thead>
            <tr>
                <th>#</th>
                <th>First Name</th>
                <th @click="toggleLastNameOrder">Last Name
                    <span class="icon is-small ordering">
                        <i v-if="lastNameOrder ==='asc'" class="fas fa-arrow-circle-down icon-placement"></i>
                        <i v-if="lastNameOrder ==='desc'" class="fas fa-arrow-circle-up icon-placement"></i>
                    </span>
                </th>
                <th>Email</th>
                <th>Mother</th>
                <th>Father</th>
                <th>Registered</th>
                <th @click="toggleStartDateOrder">Start Date
                    <span class="icon is-small ordering">
                        <i v-if="startOrder ==='asc'" class="fas fa-arrow-circle-down icon-placement"></i>
                        <i v-if="startOrder ==='desc'" class="fas fa-arrow-circle-up icon-placement"></i>
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
            <tbody>
            <tr v-for="student in getStudents" @click="viewStudentDetail(student.id)" :key="student.id">
                <th>{{getStudents.indexOf(student) + 1}}</th>
                <td>{{student.first_name}}</td>
                <td>{{student.last_name}}</td>
                <td>{{student.email}}</td>
                <td>{{student.mother_name}}</td>
                <td>{{student.father_name}}</td>
                <td v-if="student.registered" class="registered">Yes</td>
                <td v-else class="not-registered">No</td>
                <td>{{student.start_date}}</td>
            </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
    import Search from './Search'
    import Filters from "./Filters";

    export default {
        name: 'Students',
        data () {
            return {
                startOrder: 'asc',
                lastNameOrder: 'asc'
            }
        },
        components: {
            Filters,
            Search
        },
        mounted () {
            this.$store.dispatch('students/fetchStudents')
        },
        computed: {
            getStudents () {
                return this.$store.getters['students/getStudents']
            }
        },
        methods: {
            viewStudentDetail (studentId) {
                this.$router.push({name: 'StudentDetail', params: {id: studentId}})
            },
            toggleStartDateOrder () {
                this.startOrder === 'asc' ? this.startOrder = 'desc' : this.startOrder = 'asc'
                this.$store.dispatch('students/fetchCurrentStudents', {order: this.startOrder})
            },
            toggleLastNameOrder () {
                this.lastNameOrder === 'asc' ? this.lastNameOrder = 'desc' : this.lastNameOrder = 'asc'
                this.$store.getters['students/getStudents'].reverse()
            }
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
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
</style>
