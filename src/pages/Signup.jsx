import React, { useState,useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import axios from './../api/axios';
import { ADMIN_REGISTER } from './../api/apiUrl'
import AuthImage from '../images/newImage/auth-image.png';
import AuthDecoration from '../images/auth-decoration.png';
import Logo from '../logo.png';
import { useTranslation } from "react-i18next";
import i18next from "i18next";
import CssStyleRTL from '../CssStyleRTL';

function Signup() {
  const [user, setUser] = useState({ email: "", name: "", role: "", password: "" });
  const navigate = useNavigate();
  const { t } = useTranslation();
  const handleinput = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  }

  const register = () => {
    if (!user.email || !user.password || !user.name || !user.role) {
      toast.error("Please provide all deatails !");
      return;
    }

    axios.post(ADMIN_REGISTER, user).then((response) => {
      toast.success("Registered successfully!");
      navigate("/signin");
    })
      .catch((response) => {
        toast.error("User already exist!");
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

        {/* Content */}
        <div className="md:w-1/2">
          <div className="min-h-[100dvh] h-full flex flex-col after:flex-1">

            {/* Header */}
            <div className="flex-1">
              <div className="flex items-center justify-between h-16 px-4 sm:px-6 lg:px-8">
                {/* Logo */}
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
              <h1 className="text-3xl text-slate-800 dark:text-slate-100 font-bold mb-6">{t("Create your Account")} ✨</h1>
              {/* Form */}
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1" htmlFor="email">{t("Email Address")} <span className="text-rose-500">*</span></label>
                  <input id="email" name='email' value={user.email} onChange={(e) => handleinput(e)} className="form-input w-full" type="email" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1" htmlFor="name">{t("Full Name")} <span className="text-rose-500">*</span></label>
                  <input id="name" name="name" value={user.name} onChange={(e) => handleinput(e)} className="form-input w-full" type="text" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1" htmlFor="role">{t("Your Role")} <span className="text-rose-500">*</span></label>
                  <select id="role" name='role' value={user.role} onChange={(e) => handleinput(e)} className="form-select w-full">
                    <option>Designer</option>
                    <option>Developer</option>
                    <option>Accountant</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1" htmlFor="password">{t("Password")}</label>
                  <input id="password" name="password" value={user.password} onChange={(e) => handleinput(e)} className="form-input w-full" type="password" autoComplete="on" />
                </div>
              </div>
              <div className="flex items-center justify-between mt-6">
                <div className="mr-1">
                  <label className="flex items-center">
                    {/* <input type="checkbox" className="form-checkbox" /> */}
                    {/* <span className="text-sm ml-2">{t("Email me about product news.")}</span> */}
                  </label>
                </div>
                <button className="btn bg-indigo-500 hover:bg-indigo-600 text-white ml-3 whitespace-nowrap" onClick={() => register()}>{t("Sign Up")}</button>
              </div>
              {/* Footer */}
              <div className="pt-5 mt-6 border-t border-slate-200 dark:border-slate-700">
                <div className="text-sm">
                  {t("Have an account?")} <Link className="font-medium text-indigo-500 hover:text-indigo-600 dark:hover:text-indigo-400" to="/signin">{t("Sign In")}</Link>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Image */}
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

export default Signup;