import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import CityView from '../views/CityView'

const router = createRouter({
  history: createWebHistory("/"),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: HomeView
    },
    {
      path: "/weather/:state/:city",
      name: "cityView",
      component: CityView,
      meta: {
        title: "Weather",
      },
    },

  ]
})

router.beforeEach((to, from, next) => {
  document.title = `${to.params.state
    ? `${to.params.city}, ${to.params.state}`
    : to.meta.title
    } | The Local Weather`;
  next();
});
export default router

