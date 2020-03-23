import { IRoutesConst } from '@core/interfaces/routes.interface';

export const ROUTES: IRoutesConst = {
  home: '',
  register: 'register',
  dashboard: 'dashboard',
  users: 'users',
  usersList: 'list',
  userProfile: 'profile',
  otherUserProfile: 'user',
  skills: 'skills',
  skill: 'skill'
};

export const ROUTES_PATH: IRoutesConst = {
  home: '/',
  register: '/register',
  users: '/dashboard/users',
  usersList: '/dashboard/users/list',
  userProfile: '/dashboard/users/profile',
  otherUserProfile: '/dashboard/users/user/',
  skills: '/dashboard/skills',
  skill: '/dashboard/skills/skill/'
};
