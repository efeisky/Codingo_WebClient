import React from 'react'
import { Routes, Route} from "react-router-dom";

import Homepage from './pages/router/Home/Homepage';
import Login from './pages/router/Login/Login'
import Register from './pages/router/Register/Register'
import RegisterComplete from './pages/router/Register/RegisterComplete';
import Contact from './pages/router/Contact/Contact';

import SearchProfile from './pages/router/SearchProfile/SearchProfile';
import Profile from './pages/router/userPages/Profile/Profile';

import ForgetPassword from './pages/router/ForgetPassword/ForgetPassword';
import ResetPassword from './pages/router/ForgetPassword/resetPass/ResetPassword';

import RegisterLayout from './pages/router/RegisterLayout'
import MainLayout from './pages/router/MainLayout'
import ForgetPassLayout from './pages/router/ForgetPassLayout';


import Home from './pages/router/userPages/Home/Home'
import Setting from './pages/router/userPages/Setting/Setting';
import DetailLesson from './pages/router/userPages/detailLesson/DetailLesson';
import Order from './pages/router/userPages/order/Order';
import Nots from './pages/router/userPages/notes/Nots';

import {routes} from './Router'
import Footer from './pages/partials/Footer';

function App() {

  const {homepage,login,register,forgetPass,searchProfile,contact} = routes
  return (
    <div className="App">
      <Routes>
        <Route path={homepage.path} element={<Homepage/>}/>
        <Route path={login.path} element={<Login/>}/>
        <Route path={searchProfile.path} element={<SearchProfile/>}/>
        <Route path={contact.path} element={<Contact/>}/>

        <Route path={forgetPass.path} element={<ForgetPassLayout/>}>
          <Route index={true} element={<ForgetPassword/>}/>
          <Route path='resetPass' element={<ResetPassword/>}/>
        </Route>
        
        <Route path={register.path} element={<RegisterLayout/>}>
          <Route index={true} element={<Register/>}/>
          <Route path='complete' element={<RegisterComplete/>}/>
        </Route>

        <Route path='/:usernameParam' element={<MainLayout/>}>
          <Route index={true} element={<Home/>}/>
          <Route path='setting' element={<Setting/>}/>
          <Route path='profile' element={<Profile/>}/>
          <Route path='nots' element={<Nots/>}/>
          <Route path='order' element={<Order/>}/>
          <Route path='detailLesson' element={<DetailLesson/>}/>
        </Route>
        <Route path='*' element='burası 404e çıkacak'/>
      </Routes>
      <Footer/>
    </div>
  );
}

export default App;
