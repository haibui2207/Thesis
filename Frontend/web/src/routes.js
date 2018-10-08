import React from 'react';
import Loadable from 'react-loadable'

import DefaultLayout from './containers/DefaultLayout';

function Loading() {
  return <div>Loading...</div>;
}

const Dashboard = Loadable({
  loader: () => import('./views/Dashboard'),
  loading: Loading,
});

const Monitoring = Loadable({
  loader: () => import('./views/Pages/Monitoring'),
  loading: Loading,
});

const Controls = Loadable({
  loader: () => import('./views/Pages/Controls'),
  loading: Loading,
});

const UserProfile = Loadable({
  loader: () => import('./views/Pages/UserProfile'),
  loading: Loading,
});

const UserManagement = Loadable({
  loader: () => import('./views/Pages/UserManagement'),
  loading: Loading,
});

const routes = [
  { path: '/', exact: true, name: 'Home', component: DefaultLayout },
  { path: '/dashboard', name: 'Dashboard', component: Dashboard },
  { path: '/monitoring', name: 'Monitoring', component: Monitoring},
  { path: '/controls', name: 'Controls', component: Controls},
  { path: '/profile', name: 'Profile', component: UserProfile},
  { path: '/users', name: 'Users', component: UserManagement}
];

export default routes;
