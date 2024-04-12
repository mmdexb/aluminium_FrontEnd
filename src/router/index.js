//导入vue-router
import { createRouter, createWebHistory } from 'vue-router'
//导入组件
import LayoutVue from '@/views/Layout.vue'
import ActivityInfo from '@/views/Activity/ActivityInfo.vue'
import DashBoard from "@/views/DashBoard/DashBoard.vue";
import FeedBack from "@/views/User/FeedBack.vue";
import UserInfo from "@/views/User/UserInfo.vue";
import BeforeFly from "@/views/BeforeFlight/BeforeFly.vue";
import FlightInfo from "@/views/User/FlightInfo.vue";
import UserControl from "@/views/Admin/UserControl.vue";
import ActivityControl from "@/views/Admin/ActivityControl.vue";

//定义路由关系
const routes = [
    { path: '/login',  component: () => import('@/views/Login.vue')  },
    {
        path: '/',
        component: LayoutVue,
        //重定向
        redirect: '/DashBoard',
        //子路由
        children: [
            { path: '/DashBoard', component: DashBoard},
            { path: '/ActivityInfo', component: ActivityInfo },
            { path: '/User/FeedBack', component: FeedBack },
            { path: '/BeforeFlight', component: BeforeFly },
            { path: '/User/UserInfo', component: UserInfo },
            { path: '/User/FlightInfo', component: FlightInfo },
            { path: '/Admin/UserControl', component: UserControl },
            { path: '/Admin/ActivityControl', component: ActivityControl },
        ]
    }
]

//创建路由器
const router = createRouter({
    history: createWebHistory(),
    routes: routes
});

export default router