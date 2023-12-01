
import logo from './logo.svg';
import './App.css';

import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Post } from './redux/interfaces/Post';
import { RootState } from './store';
import { Counter } from './components/Counter/Counter';
import { Navigate, Route, RouteProps, Routes } from 'react-router';
import Layout from './components/Layout ';
import Home from './components/Home';
import Login from './components/Login/Login';
import { UserPage } from './components/User/UserPage';
import { useAppSelector } from './hooks';


function App() {


  const user = useAppSelector((state: RootState) => state.user)

  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/account" element={<UserPage /> } />
        <Route path="/logOut" element={<></>} />
        <Route
          path="*"
          element={<Navigate to="/" />}
        />
      </Routes>
    </Layout>
  );
}

export default App;
