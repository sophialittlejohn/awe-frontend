import store from '../store/index'


const verifyTokenAction = (accessToken) => {
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
        return !!verified
    } else if (refreshToken) {
        const refreshed = await refreshTokenAction(refreshToken)
        return !!refreshed
    } else {
        return false
    }
}