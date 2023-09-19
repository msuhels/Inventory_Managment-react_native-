import React, { useEffect } from 'react';
import {
  Routes,
  Route,
  BrowserRouter,
  useLocation
} from 'react-router-dom';

import './css/style.css';

import './charts/ChartjsConfig';

// Import pages
import Dashboard from './pages/Dashboard';
import Account from './pages/settings/Account';
import Notifications from './pages/settings/Notifications';
import Apps from './pages/settings/Apps';
import Plans from './pages/settings/Plans';
import Billing from './pages/settings/Billing';
import Feedback from './pages/settings/Feedback';
import Signin from './pages/Signin';
import UserInvitation from './pages/UserInvitation';
import Logout from './pages/Logout';
import Signup from './pages/Signup';
import ResetPassword from './pages/ResetPassword';
import Reset from './pages/Reset';
import Users from './pages/users/Users';
import Category from './pages/category/Category';
import Subcategory from './pages/category/Subcategory';
import Measurement from "./pages/category/Measurement"
import Products from "./pages/products/Products"
import Activities from "./pages/products/Activities"
import ProductDetail from "./pages/products/ProductDetail"
import Protected from "./Components/Auth/Protected";
import { store, persistor } from "./store";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import Setting from './pages/settings/Setting';



function App() {
  const location = useLocation();
  useEffect(() => {
    document.querySelector('html').style.scrollBehavior = 'auto'
    window.scroll({ top: 0 })
    document.querySelector('html').style.scrollBehavior = ''
  }, [location.pathname]); // triggered on route change

  return (
    <>
      <Provider store={store}>
        <PersistGate persistor={persistor} loading={"loading..."}>
          <Routes>
            <Route exact path="/signin" element={<Signin />} />
            <Route exact path="/invitation" element={<UserInvitation />} />
            <Route exact path="/signup" element={<Signup />} />
            <Route exact path="/reset-password" element={<ResetPassword />} />
            <Route exact path="/forget-password" element={<Reset />} />
            <Route exact path="/logout" element={<Logout />} />


            {/*auth routes */}
            <Route exact path="/" element={<Protected cmp={Dashboard} />} />
            <Route exact path="/categories" element={<Protected cmp={Category} />} />
            <Route exact path="/sub-categories" element={<Protected cmp={Subcategory} />} />
            <Route exact path="/measurement" element={<Protected cmp={Measurement} />} />
            <Route exact path="/users" element={<Protected cmp={Users} />} />
            <Route exact path="/account" element={<Protected cmp={Account} />} />
            <Route exact path="/products" element={<Protected cmp={Products} />} />
            <Route exact path="/activities" element={<Protected cmp={Activities} />} />
            <Route exact path="/product/detail/:id" element={<Protected cmp={ProductDetail} />} />
            <Route exact path="/settings" element={<Protected cmp={Setting} />} />
          </Routes>
        </PersistGate>
      </Provider>
    </>
  );
}

export default App;
