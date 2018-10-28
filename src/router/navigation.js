import HelloWorld from '@/components/HelloWorld';
import Profile from '@/pages/Profile';
import CarDetails from '@/pages/CarDetails';
import AddCar from '@/pages/AddCar';
import Map from '@/pages/Map';
import AddMapPoint from '@/pages/AddMapPoint';
import Service from '@/pages/Service';
import Examination from '@/pages/Examination';
import Insurance from '@/pages/Insurance';
import Notifications from '@/pages/Notifications';
import Login from '@/pages/Login';
import Register from '@/pages/Register';

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
  CAR_DETAILS: {
    path: '/car',
    name: 'Car',
    component: CarDetails,
  },
  ADD_CAR: {
    path: '/add-car',
    name: 'AddCar',
    component: AddCar,
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
  SERVICE: {
    path: '/service',
    name: 'Service',
    component: Service,
  },
  EXAMINATION: {
    path: '/examination',
    name: 'Examination',
    component: Examination,
  },
  INSURANCE: {
    path: '/insurance',
    name: 'Insurance',
    component: Insurance,
  },
  NOTIFICATIONS: {
    path: '/notifications',
    name: 'Notifications',
    component: Notifications,
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
