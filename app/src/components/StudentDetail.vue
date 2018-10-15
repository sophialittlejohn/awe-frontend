<template>
    <div>
        <table class="table is-bordered is-striped is-fullwidth my-container">
            <thead>
            <tr>
                <th>Name</th>
                <th>{{studentDetail.first_name}} {{studentDetail.last_name}}</th>
            </tr>
            </thead>
            <tbody>
            <tr>
                <td>Birthday</td>
                <td>{{studentDetail.birthdate}}</td>
            </tr>
            <tr>
                <td>Email</td>
                <td>{{studentDetail.email}}</td>
            </tr>
            <tr>
                <td>Phone</td>
                <td>{{studentDetail.phones}}</td>
            </tr>
            <tr>
                <td>Mother</td>
                <td v-if="studentDetail.mother_name">{{studentDetail.mother_name}}, {{studentDetail.mother_workplace}}
                </td>
                <td v-else>n/a</td>
            </tr>
            <tr>
                <td>Father</td>
                <td v-if="studentDetail.father_name">{{studentDetail.father_name}} {{studentDetail.father_workplace}}
                </td>
                <td v-else>n/a</td>
            </tr>
            <tr>
                <td>Address</td>
                <td v-if="studentDetail.address">{{studentDetail.address.street}} {{studentDetail.address.number}},
                    {{studentDetail.address.zip}}
                    {{studentDetail.address.city}} {{studentDetail.address.country}}
                </td>
                <td v-else>n/a</td>
            </tr>
            <tr>
                <td>Cambridge Exams</td>
                <td>{{studentDetail.cambridge_exam}}</td>
            </tr>
            <tr>
                <td>Start Date <span v-if="studentDetail.end_date">- End Date</span></td>
                <td>{{studentDetail.start_date}} <span v-if="studentDetail.end_date">- {{studentDetail.end_date}}</span>
                </td>
            </tr>
            <tr>
                <td>Current Class</td>
                <td>
                    <div class="columns" v-for="c in studentDetail.awe_class">
                        <div class="column is-2">{{c.name}}</div>
                        <div class="column is-2">{{c.program}}</div>
                        <div class="column" v-for="t in c.teacher">Teacher(s): {{t.first_name}}, {{t.last_name[0]}}
                        </div>
                        <div class="column">Classroom: {{c.class_room.name}} {{c.class_room.loaction}}</div>
                        <div class="column">{{c.day}} {{c.start_time.slice(0, 5)}} - {{c.end_time.slice(0, 5)}}</div>
                    </div>
                </td>
            </tr>
            <tr>
                <td>Registered (fee payed?)</td>
                <td v-if="studentDetail.registered">Yes</td>
                <td v-else>No</td>
            </tr>
            <tr v-if="studentDetail.discount">
                <td>Discount</td>
                <td>{{studentDetail.discount}}</td>
            </tr>
            <tr>
                <td>Notes</td>
                <td>{{studentDetail.notes}}</td>
            </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
    export default {
        name: "StudentDetail",
        props: ['id'],
        mounted () {
            this.$store.dispatch('students/fetchStudentDetails', this.id)
        },
        computed: {
            studentDetail () {
                return this.$store.getters['students/getStudentDetail']
            }
        }
    }
</script>

<style scoped>


</style>
