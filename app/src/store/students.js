import Vue from 'vue'

const students = {
    namespaced: true,
    state: {
        students: [],
        errors: {},
        studentDetail: {},
        searchFilter: 'first name',
        emailAddress: []
    },
    mutations: {
        setStudents (state, payload) {
            state.students = payload
        },
        setErrors (state, payload) {
            state.errors = payload
        },
        setStudentDetail (state, payload) {
            state.studentDetail = payload
        },
        setActiveFilter (state, payload) {
            state.searchFilter = payload
        },
        setEmailAddress (state, payload) {
            state.emailAddress = payload
        },
        removeEmailAddress (state, payload) {
            state.emailAddress =  state.emailAddress.filter(item => item !== payload)
        }
    },
    actions: {
        fetchStudents ({commit}) {
            return Vue.http.get('students/', {Authorization: Vue.http.headers.common.Authorization})
                .then(response => {
                    commit('setStudents', response.body);
                    return response
                }).catch(err => {
                    commit('setErrors', err.body);
                    throw err
                })
        },
        fetchCurrentStudents ({commit}, args) {
            return Vue.http.get(`students/current/?desc=true`, {Authorization: Vue.http.headers.common.Authorization})
                .then(response => {
                    commit('setStudents', response.body);
                    return response
                }).catch(err => {
                    console.log('in the error', err.body);
                    commit('setErrors', err.body);
                    throw err
                })
        },
        fetchPastStudents ({commit}) {
            return Vue.http.get('students/past/', {Authorization: Vue.http.headers.common.Authorization})
                .then(response => {
                    commit('setStudents', response.body);
                    return response
                }).catch(err => {
                    commit('setErrors', err.body);
                    throw err
                })
        },
        fetchStudentDetails ({commit}, studentId) {
            return Vue.http.get(`students/${studentId}`, {Authorization: Vue.http.headers.common.Authorization})
                .then(response => {
                    commit('setStudentDetail', response.body);
                    return response
                }).catch(err => {
                    commit('setErrors', err.body);
                    throw err
                })
        },
        searchStudents ({commit}, args) {
            let url = '';
            if (args.filt === 'first name') {
                url = `students/?first_name=${args.search}`
            } else if (args.filt === 'last name') {
                url = `students/?last_name=${args.search}`
            } else if (args.filt === 'teacher') {
                url = `students/?teacher=${args.search}`
            } else {
                url = `students/`
            }
            return Vue.http.get(url, {Authorization: Vue.http.headers.common.Authorization})
                .then(response => {
                    if (!response.body.length) {
                        commit('setStudents', [{first_name: 'No student found'}])
                    } else {
                        commit('setStudents', response.body)
                    }
                    return response
                }).catch(err => {
                    commit('setErrors', err.body);
                    throw err
                })
        },
        fetchStudentsOrderStartDate ({commit}, args) {
            let url = '';
            if (args.filt === 'asc') {
                url = `students/?current=all_asc`
            } else if (args.filt === 'desc') {
                url = `students/?current=all_desc`
            } else {
                url = `students/`
            }
            return Vue.http.get(url, {Authorization: Vue.http.headers.common.Authorization})
                .then(response => {
                    commit('setStudents', response.body);
                }).catch(err => {
                    commit('setErrors', err.body);
                    throw err
                })
        }
    },
    getters: {
        getStudents: state => state.students,
        getStudentDetail: state => state.studentDetail,
        getActiveFilter: state => state.searchFilter,
        getEmails: state => state.emailAddress,
    },
};

export default students