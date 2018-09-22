import Vue from 'vue';
import VueRouter from 'vue-router';
import Login from '../components/Login.vue';
import Students from '../components/Students.vue';
import StudentDetail from '../components/StudentDetail.vue';
import {verifyLogin} from './helpers'

Vue.use(VueRouter);

const stayLoggedIn = (to, from, next) => {
    verifyLogin()
        .then(status => {
            if (status) {
                console.log('guard found token', status)
                next()
            } else {
                console.log('no token', status)
                next({name: 'login'})
            }
        })
}

const router = new VueRouter({
        routes: [
            {
                path: '/',
                name: 'Students',
                component: Students,
                beforeEnter: stayLoggedIn,
                children: [
                    {
                        path: ':id',
                        component: StudentDetail
                    },
                ]
            },
            {
                path: '/login',
                name: 'login',
                component: Login
            }
            ,
// {
//     path: '/newreview/:id/',
//     name: 'newReview',
//     component: NewReview,
//     props: true,
// }
        ]
    })
;


export default router
