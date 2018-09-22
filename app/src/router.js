import Vue from 'vue';
import VueRouter from 'vue-router';
import Login from './components/Login.vue';
import HelloWorld from './components/HelloWorld.vue';
import {verifyLogin} from './helpers'

Vue.use(VueRouter);


const router = new VueRouter({
        routes: [
            {
                path: '/',
                name: 'HelloWorld',
                component: HelloWorld,
                beforeEnter: (to, from, next) => {
                    verifyLogin()
                        .then(status => {
                            if (status) {
                                console.log('found token from Guard', status)
                                next()
                            } else {
                                console.log('no token from Guard', status)
                                next({name: 'login'})
                            }
                        })
                }
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

// router.afterEach((to, from, next) => {
//     verifyLogin()
//         .then(status => {
//             if (status) {
//                 console.log('found token from Guard')
//                 next()
//             } else {
//                 console.log('no token from Guard', to)
//                 next({name: 'login'})
//             }
//         })
// })

export default router
