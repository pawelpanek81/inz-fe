import HelloWorld from '@/components/HelloWorld';
import Map from '@/pages/Map';
import Login from '@/pages/Login';
import Register from '@/pages/Register';

export default {
  HELLOWORD: {
    path: '/',
    name: 'HelloWorld',
    component: HelloWorld,
  },
  PROFILE: {

  },
  MAP: {
    path: '/map',
    name: 'Map',
    component: Map,
  },
  SERVICE: {

  },
  LOGIN: {
    path: '/login',
    name: 'Login',
    component: Login,
  },
  REGISTER: {
    path: '/register',
    name: 'Register',
    component: Register,
  },
};
