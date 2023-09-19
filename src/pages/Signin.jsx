import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
// import AuthImage from '../images/auth-image.jpg';
import AuthImage from '../images/newImage/auth-image.png';
import AuthDecoration from '../images/auth-decoration.png';
import axios from './../api/axios';
import { ADMIN_LOGIN } from './../api/apiUrl'
import Logo from '../logo.png';
import { useSelector, useDispatch } from 'react-redux';
import { getUserData } from '../store/actions/action';
import { Spinner } from "reactstrap";
import welcomeIcon from '../images/newImage/welcome.png';
import { useTranslation } from "react-i18next";
import i18next from "i18next";
import CssStyleRTL from '../CssStyleRTL';

function Signin() {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmit, setIsSubmit] = useState(false);
  const [msg, setMsg] = useState(false);
  const navigate = useNavigate()
  const login = (event) => {
    event.preventDefault();
    if (!email || !password) {
      toast.error("Please provide all deatails !");
      return;
    }
    setIsSubmit(true);
    axios.post(ADMIN_LOGIN,
      { email, password }
    )
      .then((response) => {
        sessionStorage.setItem('userDetails', JSON.stringify(response.data));
        dispatch(getUserData());
        setTimeout(function () {
          navigate("/");
          setIsSubmit(false);
          if (!msg) {
            setTimeout(function () { toast.success("Logged in successfully!"); }, 500);
            setMsg(true);
          }
        }, 3000);

      }).catch((error) => {
        setIsSubmit(false);
        toast.error("Invalid credentials!")
      });
  };

  const selectLanguage = async (e) => {
    localStorage.setItem('selected_language', e);
    i18next.changeLanguage(e);
  };

  useEffect(() => {
    if (localStorage.getItem('selected_language')) {
      i18next.changeLanguage(localStorage.getItem('selected_language'));
    } else {
      i18next.changeLanguage('en');
    }
  }, [])


  return (
    <>
    {/* <CssStyleRTL /> */}
   
    <main className="bg-white dark:bg-slate-900">
      <div className="relative md:flex">
        <div className="md:w-1/2">
          <form onSubmit={login}>
            <div className="min-h-[100dvh] h-full flex flex-col after:flex-1">
              <div className="flex-1">
                <div className="flex items-center justify-between h-16 px-4 sm:px-6 lg:px-8">
                  <Link className="block" to="/">
                    <img src={Logo} className="logo" />
                  </Link>
                  <select className='py-1 border-none' onChange={(e) => { selectLanguage(e.target.value); }}>
                    <option value="en" selected={localStorage.getItem('selected_language') == 'en' ? true : false}>English</option>
                    <option value="ar" selected={localStorage.getItem('selected_language') == 'ar' ? true : false}>Hebrew</option>
                  </select>
                </div>
              </div>
              <div className="max-w-sm mx-auto w-full px-4 py-8">
                <div className="mb-4 sm:mb-0 sm:flex sm:justify-start sm:items-start mb-8 display-inline-flex">
                  <h1 className="text-2xl md:text-3xl text-slate-800 dark:text-slate-100 font-bold">{t("Welcome back!")}</h1>
                  <img className='my-1 mx-3' src={welcomeIcon} width="35px" />
                </div>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-1" htmlFor="email">{t("Email Address")}</label>
                    <input id="email" onChange={(e) => setEmail(e.target.value)} value={email} className="form-input w-full" type="email" required />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1" htmlFor="password">{t("Password")}</label>
                    <input id="password" onChange={(e) => setPassword(e.target.value)} value={password} className="form-input w-full" type="password" autoComplete="on" required />
                  </div>
                </div>
                <div className="flex items-center justify-between mt-6">
                  <div className="mr-1">
                    <Link className="text-sm underline hover:no-underline" to="/reset-password">{t("Forgot Password?")}</Link>
                  </div>
                  {!isSubmit ?
                    <button type='submit' className="btn bg-indigo-500 hover:bg-indigo-600 text-white ml-3">{t("Sign In")}</button>
                    :
                    <button className="btn bg-indigo-500 hover:bg-indigo-600 text-white ml-3"><Spinner animation="border" size="sm"></Spinner></button>
                  }
                </div>
              </div>
            </div>
          </form>

        </div>

        <div className="hidden md:block absolute top-0 bottom-0 right-0 md:w-1/2" aria-hidden="true">
          <img className="object-cover object-center w-full h-full" src={AuthImage} width="760" height="1024" alt="Authentication" />
          <img className="absolute top-1/4 left-0 -translate-x-1/2 ml-8 hidden lg:block" src={AuthDecoration} width="218" height="224" alt="Authentication decoration" />
        </div>
      </div>
      <Toaster />
    </main>
    </>
  );
}

export default Signin;