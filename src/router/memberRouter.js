import Vue from 'vue'
import VueRouter from 'vue-router'
import memberHome from '@/components/memberHome'
import activityIndex from '@/components/member/activities/activityIndex'
import activityDetail from '@/components/member/activities/activityDetail'
import groupCourses from '@/components/member/groupCourses/groupCourses'
import personalCourses from '@/components/member/personalCourses/personalCourses'
import mine from '@/components/member/mine/mine'

import IndexPage from '@/components/IndexPage'

Vue.use(VueRouter)

const router = new VueRouter({
    mode: 'hash',
    base: __dirname,
    //路由映射map
    routes: [
        { path: '/', redirect: '/index' },
    { path: '*', redirect: '/index' },
    {
      path: '/index',
      name: 'IndexPage',
      component: IndexPage
    },
	    {
	      path: '/',
	      name: 'memberHome',
	      component: memberHome,
	      children:[
	      	   {
			      path: '/activityIndex',
			      name: 'activityIndex',
			      component: activityIndex
			    },
			     {
			      path: '/activityDetail/:activityId',
			      name: 'activityDetail',
			      component: activityDetail
			    },
			    {
			      path: '/groupCourses',
			      name: 'groupCourses',
			      component: groupCourses
			    },
			    {
					path: '/love-lfx',
			      name: 'mine',
			      component: mine
			    },
			    {
			      path: '/personalCourses',
			      name: 'personalCourses',
			      component: personalCourses
			    },

	      ]
	    },
	     
    ]
});

export default router;