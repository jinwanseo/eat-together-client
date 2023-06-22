import React from 'react';
import LoginRoutes from './login/LoginRoutes';
import useAuth from '../app/hooks/useAuth';
import useAxios from '../app/hooks/useAxios';
import {MainRoutes} from './main/MainRoutes';

function AppRoutes() {
  const {token} = useAuth();
  useAxios();

  return token ? <MainRoutes /> : <LoginRoutes />;
}

export default AppRoutes;
