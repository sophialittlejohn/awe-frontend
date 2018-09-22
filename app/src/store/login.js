import Vue from 'vue'

const login = {
    namespaced: true,
    state: {
        tokens: {},
        errors: {},
        loggedIn: false
    },
    mutations: {
        setTokens (state, payload) {
            state.tokens = payload
            state.loggedIn = true
        },
        setErrors (state, errors) {
            state.errors = errors
            state.loggedIn = false
        },
    },
    getters: {
        getErrors: state => state.errors,
        getTokens: state => state.tokens,
        getLoggedIn: state => state.loggedIn
    },
    actions: {
        fetchTokens ({commit}, credentials) {
            return Vue.http.post('auth/token/', credentials)
                .then(response => {
                    localStorage.setItem('accessToken', response.body.access)
                    localStorage.setItem('refreshToken', response.body.refresh)
                    commit('setTokens', {access: response.body.access, refresh: response.body.refresh})
                    return response
                }).catch(err => {
                    console.log('in da catch', err)
                    commit('setErrors', err.body)
                    throw err
                })
        },
        verifyToken ({commit, dispatch}, accessToken) {
            console.log('in da actions', accessToken)
            return Vue.http.post('auth/token/verify/', {token: accessToken})
                .then(response => {
                    console.log('response from verifyToken action', response)
                    return true
                }).catch(err => {
                    console.log('in da verifyToken catch', err)
                    const refreshToken = localStorage.getItem('refreshToken')
                     refreshToken ? dispatch('refreshToken', refreshToken) : commit('setErrors', err.body)
                })
        },
        refeshToken ({commit}, refreshToken) {
            return Vue.http.post('auth/token/refresh', {refresh: refreshToken})
                .then(response => {
                    console.log('response from refeshToken action')
                    localStorage.setItem('accessToken', response.body.access)
                    commit('setTokens', {access: response.body.access, refresh: refreshToken})
                    return response
                }).catch(err => {
                    console.log('in da refeshToken catch', err)
                    commit('setErrors', err.body)
                    throw err
                })
        },
    }
}

export default login
