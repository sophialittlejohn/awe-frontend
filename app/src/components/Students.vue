<template>
    <div class="container">
        <h1>Student Overview</h1>
        <table class="table table is-bordered is-striped is-narrow is-hoverable is-fullwidth">
            <thead>
            <tr>
                <th>#</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Email</th>
                <th>Mother</th>
                <th>Father</th>
                <th>Registered</th>
                <th>Start Date</th>
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
            <tr v-for="student in getStudents">
                <th>{{getStudents.indexOf(student) + 1}}</th>
                <td>{{student.first_name}}</td>
                <td>{{student.last_name}}</td>
                <td>{{student.email}}</td>
                <td>{{student.mother_name}}</td>
                <td>{{student.father_name}}</td>
                <td v-if="student.registered">Yes</td>
                <td v-else>No</td>
                <td>{{student.start_date}}</td>
            </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
    export default {
        name: 'Students',
        props: {
            msg: String
        },
        mounted () {
            this.$store.dispatch('students/fetchStudents')
        },
        computed: {
            getStudents () {
                const students = this.$store.getters['students/getStudents']
                console.log(students)
                students.forEach(stu => {
                    console.log('stu', stu)
                })
                return this.$store.getters['students/getStudents']
            }
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
