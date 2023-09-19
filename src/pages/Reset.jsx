import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router';
import axios from './../api/axios';
import { ADMIN_RESET_PASSWORD } from './../api/apiUrl'
import toast, { Toaster } from 'react-hot-toast';
import AuthImage from '../images/newImage/auth-image.png';
import AuthDecoration from '../images/auth-decoration.png';
import Logo from '../logo.png';

function ResetPassword() {
  const [password, setPassword] = useState("");
  const [cpassword, setCpassword] = useState("")
  const search = useLocation().search;
  const token = new URLSearchParams(search).get("token");
  const navigate = useNavigate()
  const resetp = () => {
    if (!password || !cpassword) {
      toast.error("Please provide all details !");
      return;
    }
    if (password !== cpassword) {
      toast.error("password doesn't match !");
      return;
    }
    let URL = ADMIN_RESET_PASSWORD(token);
    axios.post(URL,{ newPassword: password })
      .then((response) => {
        toast.success("Password changed successfully!")
        setTimeout(() => {
          navigate("/signin")
        }, 1000)
      })
      .catch((error) => {
        toast.error("Token expired, please try again!")
      });
  }

  return (
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
              </div>
            </div>

            <div className="max-w-sm mx-auto w-full px-4 py-8">
              <h1 className="text-3xl text-slate-800 dark:text-slate-100 font-bold mb-6">Reset your Password ✨</h1>
              {/* Form */}
              {/* <form> */}
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1" htmlFor="email" >Enter Password <span className="text-rose-500">*</span></label>
                  <input id="email" className="form-input w-full" value={password} onChange={(e) => setPassword(e.target.value)} type="password" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1" htmlFor="email" >Enter Confirm Password <span className="text-rose-500">*</span></label>
                  <input id="email" className="form-input w-full" value={cpassword} onChange={(e) => setCpassword(e.target.value)} type="password" />
                </div>
              </div>
              <div className="flex justify-end mt-6">
                <button className="btn bg-indigo-500 hover:bg-indigo-600 text-white whitespace-nowrap" onClick={() => resetp()}>Reset Password</button>
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
  );
}

export default ResetPassword;