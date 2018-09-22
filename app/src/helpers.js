import store from './store'


const verifyTokenAction = (accessToken) => {
    console.log('from helpers verfiy', store)
    return store.dispatch('login/verifyToken', accessToken)
}

const refreshTokenAction = (refreshToken) => {
    store.dispatch('login/refreshToken', refreshToken)
}

export const verifyLogin = async () => {
    // make sure user is always logged in
    const accessToken = localStorage.getItem('accessToken')
    const refreshToken = localStorage.getItem('accessToken')
    if (accessToken) {
        const verified = await verifyTokenAction(accessToken)
        console.log('verified', verified)
        return !!verified
    } else if (refreshToken) {
        const refreshed = await refreshTokenAction(refreshToken)
        console.log('refreshed', refreshed)
        return !!refreshed
    } else {
        console.log('Token expired from helper')
        return false
    }
}