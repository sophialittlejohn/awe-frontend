<template>
    <div class="container">
        <table class="table is-bordered is-striped is-fullwidth my-container">
            <thead>
            <tr class="is-selected">
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
                <td v-if="studentDetail.mother_name">{{studentDetail.mother_name}}, {{studentDetail.mother_workplace}}</td>
                <td v-else>n/a</td>
            </tr>
            <tr>
                <td>Father</td>
                <td v-if="studentDetail.father_name">{{studentDetail.father_name}} {{studentDetail.father_workplace}}</td>
                <td v-else>n/a</td>
            </tr>
            <tr>
                <td>Address</td>
                <td v-if="studentDetail.address">{{studentDetail.address.street}} {{studentDetail.address.number}}, {{studentDetail.address.zip}}
                    {{studentDetail.address.city}} {{studentDetail.address.country}}
                </td>
                <td v-else>No Address</td>
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
                        <div class="column" v-for="t in c.teacher">Teacher(s): {{t.first_name}}, {{t.last_name[0]}}</div>
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

// AWE Class (left over data:
// books: (...)
// session: (...)
// total_classes: (...)

    // { "id": 1, "street": "Charming Ave", "number": 102, "city": "Zurich", "zip": 2309, "country": "GER

    // fields = [
    //     'id',


    //     'cost_per_class',
    //     'discount',
    //     'notes',
    // ]
    export default {
        name: "StudentDetail",
        mounted () {
            this.$store.dispatch('students/fetchStudentDetails', this.$router.history.current.params.id)
        },
        computed: {
            studentDetail () {
                console.log(this.$store.getters['students/getStudentDetail'])
                return this.$store.getters['students/getStudentDetail']
            }
        }
    }
</script>

<style scoped>
    .my-container {
        margin: 20px auto;
    }
</style>
