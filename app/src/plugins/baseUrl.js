import {baseUrl} from "../store/types";

function install (Vue) {
    Vue.prototype.$baseUrl = baseUrl
}

export default install