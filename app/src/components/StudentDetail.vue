<template>
    <div>
      <div class="detail-item" style="border-bottom: 1px solid black">
        <div class="input-container">
          <label class="my-label" for="fullName">Full Name</label>
          <div class="flex">
            <input class="input" type="text" id="fullName" v-model="studentDetail.first_name" placeholder="First Name"/>
            <input class="input" type="text" id="fullName" v-model="studentDetail.last_name" placeholder="Last Name"/>
          </div>
        </div>
        <div class="input-container">
          <label class="my-label" for="birthday">Birthday</label>
          <input class="input" type="date" id="birthday" v-model="studentDetail.birthdate" placeholder="Birthday"/>
        </div>
        <div class="input-container">
          <label class="my-label" for="phone">Phone</label>
          <input class="input" type="text" id="phone" v-model="studentDetail.phones"/>
        </div>
        <div class="input-container">
          <label class="my-label" for="email">Email</label>
          <input class="input" type="text" id="email" v-model="studentDetail.email"/>
        </div>
        <img class="svg-style" id="gender" :src="studentDetail.gender === 'f' ? girlSvg : boySvg"/>
      </div>

    
      <div class="flex">
        <div class="detail-item left-container">
          <div class='input-container'>
            <div class="inner-container">
              <div style="margin-right: 10px">
                <label class="my-label" for="m_name">Mother</label>
                <input class="input" type="text" id="m_name" v-model="studentDetail.mother_name"/>
              </div>
              <div>
                <label class="my-label" for="m_work">Work</label>
              <input class="input" type="text" id="m_work" v-model="studentDetail.mother_workplace"/>
              </div> 
            </div>
          </div>
          <div class='input-container'>
            <div class="inner-container">
              <div style="margin-right: 10px">
                <label class="my-label" for="f_name">Father</label>
                <input class="input" type="text" id="f_name" v-model="studentDetail.father_name"/>
              </div>
              <div>
                <label class="my-label" for="f_work">Work</label>
                <input class="input" type="text" id="f_work" v-model="studentDetail.father_workplace"/>
              </div> 
            </div>
          </div>
          <div class='input-container'>
            <div class="inner-container">
              <div>
                <label class="my-label" for="address">Billing Address</label>
                <div class="flex">
                  <input 
                    class="input" 
                    placeholder="Stree" 
                    type="text" 
                    id="address" 
                    v-model="studentDetail.address.street"/>
                  <input 
                    class="input short-input" 
                    placeholder="#" 
                    type="text" 
                    id="address" 
                    v-model="studentDetail.address.number"/>
                </div>
                 <div class="flex">
                  <input class="input short-input" placeholder="ZIP" type="text" id="address" v-model="studentDetail.address.zip"/>
                  <input class="input" placeholder="City" type="text" id="address" v-model="studentDetail.address.city"/>
                  <input class="input short-input" placeholder="Country" type="text" id="address" v-model="studentDetail.address.country"/>
                </div>
              </div>
            </div>
          </div> 
        </div>


        <div class="detail-item right-container field">
          <div class='control'>
            <div class="select is-hovered">
              <select v-model="selectedClass">
                <option v-for="cls in aweClasses" :key="cls.id">{{cls.name}}</option>
              </select>
            </div>
          </div>
          <div id="class" style="color: black">
              <div class="">{{getAweClassDetail.name}}</div>
              <div class="">{{getAweClassDetail.program}}</div>
              <div 
                class="" 
                v-for="t in getAweClassDetail.teacher" 
                :key="t.id">Teacher(s): {{t.first_name}}, {{t.last_name[0]}}
              </div>
              <div class="">Classroom: {{getAweClassDetail.class_room.name}} {{getAweClassDetail.class_room.loaction}}</div>
              <div class="">{{getAweClassDetail.day}} {{getAweClassDetail.start_time.slice(0, 5)}} - {{getAweClassDetail.end_time.slice(0, 5)}}</div>
          </div>
          <div class='input-container'>
            <label class="my-label" for="birthday">Notes</label>
            <input class="input" type="text" id="birthday" v-model="studentDetail.notes"/>
          </div>
        </div>
        <button style="align-self: flex-end" class="button is-danger">Save</button>
      </div>
      

    </div>

       <!-- <label class="my-label" for="class">Class</label> -->
          
        <!-- 
        <div class="detail-item">
            <label class="my-label" for="additional-info">Additional Information</label>
            <div class="" id="additional">
                <div class="  input is-small" v-if="studentDetail.cambridge_exam">Cambridge Exams: {{studentDetail.cambridge_exam}}</div>
                <div class="  input is-small" v-if="studentDetail.discount">Disount: {{studentDetail.discount}}</div>
                <div class="  input is-small" v-if="studentDetail.notes">Notes: {{studentDetail.notes}}</div>
            </div>
        </div> -->
</template>

<script>
import boySvg from '../assets/boy.png';
import girlSvg from '../assets/girl.png';
import {RotateSquare2} from 'vue-loading-spinner'

// todo: selected clasd slected whats in between the tags, find out how to select whole object

export default {
  name: 'StudentDetail',
  props: ['id'],
  components: {
      RotateSquare2
  },
  data() {
    return {
      boySvg,
      girlSvg,
      selectedClass: '',
    };
  },
  mounted() {
    this.$store.dispatch('students/fetchStudentDetails', this.id);
    this.$store.dispatch('aweClass/fetchAweClasses');
    this.selectedClass = 'Hello'
  },
  updated() {
    // const id = this.getAweClassDetail.id
    // if selectedClass is different from prev selceted class the dispatch the action, otherwise do nothing
    // this.$store.dispatch('aweClass/fetchAweClassDetail', 3)
    console.log('selectedClass', this.selectedClass)
  },
  computed: {
    studentDetail: {
      get () {
        return this.$store.getters['students/getStudentDetail']
      },
      set (value) {
        console.log('in da set', value)
        return this.$store.dispatch('students/updateStudentDetail', value)
      },
    },
    aweClasses() {
      return this.$store.getters['aweClass/getAweClasses']
    },
    getAweClassDetail() {
      console.log('in da class selector', this.selectedClass)
      return this.selectedClass
        ? this.$store.getters['aweClass/getAweClassDetail', 3]
        : this.studentDetail.awe_class
    }
  },
  watch: {
    selectedClass: () => {
      console.log("watching classes ");
    }
  },
};
</script>

<style lang="scss" scoped>
@import '../scss/main';

.detail-item {
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  padding: 15px 0px;
}

.flex {
  display: flex;
}

.contact {
  display: flex;
  align-items: center;
  justify-content: center;
}

.my-label {
  margin-left: 5px;
  font-weight: bold;
  font-size: $font-small;
  color: $color-text;
}

// make sure this is being used
.class-container {
  display: flex;
  width: 100%;
  justify-content: space-evenly;
}

.svg-style {
  height: 24px;
}

.input-container {
  display: flex;
  flex-direction: column;
}

.left-container {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  border-right: 1px solid black;
}

.right-container {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding-left: 10px;
}

.inner-container {
  width: 100%;
  display: flex;
  justify-content: space-between;
}

.short-input {
  width: 70px;
}
</style>
