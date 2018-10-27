import HelloWorld from '@/components/HelloWorld';
import Map from '@/pages/Map';
import AddMapPoint from '@/pages/AddMapPoint';
import Inspection from '@/pages/Inspection';
import Login from '@/pages/Login';
import Register from '@/pages/Register';
import Profile from '@/pages/Profile';

export default {
  HELLOWORD: {
    path: '/',
    name: 'HelloWorld',
    component: HelloWorld,
  },
  PROFILE: {
    path: '/profile',
    name: 'Profile',
    component: Profile,
  },
  MAP: {
    path: '/map',
    name: 'Map',
    component: Map,
  },
  ADD_MAP_POINT: {
    path: '/add-map-point',
    name: 'AddMapPoint',
    component: AddMapPoint,
  },
  INSPECTION: {
    path: '/inspection',
    name: 'Inspection',
    component: Inspection,
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
