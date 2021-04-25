const Home = () => import(/* webpackChunkName: "Home" */ '@/views/Home')

export default [
  {
    path: '/',
    name: 'Home',
    component: Home
  }
]
