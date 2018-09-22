import Vue from 'vue'


const students = {
    namespaced: true,
    state: {
        students: [],
        errors: {}
    },
    mutations: {
        setStudents (state, payload) {
            state.students = payload
        },
        setErrors (state, payload) {
            state.errors = payload
        },
    },
    actions: {
        fetchStudents ({commit}) {
            console.log(Vue.http.headers.common)
            return Vue.http.get('students/', {Authorization: Vue.http.headers.common.Authorization})
                .then(response => {
                    commit('setStudents', response.body)
                    return response
                }).catch(err => {
                    commit('setErrors', err.body)
                    throw err
                })
        }
    },
    getters: {
        getStudents: state => state.students
    },
}

export default students