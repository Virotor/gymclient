
import './App.css';

import { enableMapSet } from 'immer';
import { Navigate, Route, Routes } from 'react-router';
import Home from './components/Home/Home';
import Layout from './components/Layout ';
import Login from './components/Login/Login';
import { UserPage } from './components/Client/User/UserPage';
import { useAppSelector } from './hooks';
import { RootState } from './store';

enableMapSet();

function App() {


  const user = useAppSelector((state: RootState) => state.user)

  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        {
          user.user.username!=='' 
          ?
          <Route path="/account" element={<UserPage />} />
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
