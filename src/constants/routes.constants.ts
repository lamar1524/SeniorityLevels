import { IRoutesConst, IRoutesHeader } from '@core/interfaces/routes.interface';

export const ROUTES: IRoutesHeader = {
  home: { title: '', path: '' },
  login: { title: 'Login', path: '' },
  register: { title: 'Register', path: 'register' },
  dashboard: { title: '', path: 'dashboard' },
  users: { title: 'Users', path: 'users' },
  usersList: { title: 'Users list', path: 'list' },
  userProfile: { title: 'Users profile', path: 'profile' },
  otherUserProfile: { title: '', path: 'user' },
  skills: { title: 'Fill up your skills', path: 'skills' },
  skill: { title: '', path: 'skill' },
};

export const ROUTES_PATH: IRoutesConst = {
  home: '/',
  register: '/register',
  users: '/dashboard/users',
  usersList: '/dashboard/users/list',
  userProfile: '/dashboard/users/profile',
  otherUserProfile: '/dashboard/users/user/',
  skills: '/dashboard/skills',
  skill: '/dashboard/skills/skill/',
};
