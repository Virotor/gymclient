
import './App.css';

import { enableMapSet } from 'immer';
import { Navigate, Route, Routes } from 'react-router';
import Home from './components/Home/Home';
import Layout from './components/Layout ';
import Login from './components/Login/Login';
import { UserPage } from './components/Client/User/UserPage';
import { useAppDispatch, useAppSelector } from './hooks';
import { RootState } from './store';
import { useEffect } from 'react';
import { getUser, isAuth } from './redux/utils/auth';
import { auth } from './redux/reducers/UserSlice';
import { UserPageEmployee } from './components/Employee/User/UserPage';

enableMapSet();

function App() {

  useEffect(() => {
    if (isAuth()) {
      let user = getUser();
      dispatch(auth(user))
    }
  }, [])

  const user = useAppSelector((state: RootState) => state.user)
  const dispatch = useAppDispatch();

  return (
    <Layout >
      <Routes >
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        {
          user.user.role === 'role_user'
            ?
            <Route path="/account" element={<UserPage />} />
            :
            user.user.role === 'role_admin'
              ?
              <Route path="/account" element={<UserPage />} />
              :
              user.user.role === 'role_trainer'
                ?
                <Route path="/account" element={<UserPageEmployee />} />
                :
                <>
                </>
        }
        <Route
          path="*"
          element={<Navigate to="/" />}
        />
      </Routes>
    </Layout>
  );
}

export default App;
