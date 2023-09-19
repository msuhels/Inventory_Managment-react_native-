import React, { useState,useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from './../api/axios';
import { ADMIN_FORGOT_PASSWORD } from './../api/apiUrl'
import toast, { Toaster } from 'react-hot-toast';
import AuthImage from '../images/newImage/auth-image.png';
import AuthDecoration from '../images/auth-decoration.png';
import Logo from '../logo.png';
import { useTranslation } from "react-i18next";
import i18next from "i18next";
import CssStyleRTL from '../CssStyleRTL';

function ResetPassword() {
  const [email, setEmail] = useState("");
  const { t } = useTranslation();
  const resetp = () => {
    if(!email) {
      toast.error("Please provide email !");
      return;
    }
    axios.post(ADMIN_FORGOT_PASSWORD,
        { verifyEmail: email }
      )
      .then((response) => {
        toast.success("Please check your email!");
        // setTimeout(() => {
        //   navigate("/login")
        // }, 1000)
      })
      .catch((error) => {
        toast.error("email doesn't exist !")
      });
  }

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
                  <img src={Logo} className="logo"/>
                </Link>
                <select className='py-1 border-none' onChange={(e) => { selectLanguage(e.target.value); }}>
                    <option value="en" selected={localStorage.getItem('selected_language') == 'en' ? true : false}>English</option>
                    <option value="ar" selected={localStorage.getItem('selected_language') == 'ar' ? true : false}>Hebrew</option>
                  </select>
              </div>
            </div>

            <div className="max-w-sm mx-auto w-full px-4 py-8">
              <h1 className="text-3xl text-slate-800 dark:text-slate-100 font-bold mb-6">{t("Reset your Password")} ✨</h1>
              {/* Form */}
              {/* <form> */}
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-1" htmlFor="email">{t("Email Address")} <span className="text-rose-500">*</span></label>
                    <input id="email" className="form-input w-full" value={email} onChange={(e) => setEmail(e.target.value)} type="email" />
                  </div>
                </div>
                <div className="flex justify-end mt-6">
                  <button className="btn bg-indigo-500 hover:bg-indigo-600 text-white whitespace-nowrap" onClick={() => resetp()}>{t("Send Reset Link")}</button>
                </div>
              {/* </form> */}
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

export default ResetPassword;