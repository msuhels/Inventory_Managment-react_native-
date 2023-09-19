import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import axios from './../api/axios';
import { USER_REGISTER, GET_USER_EMAIL } from './../api/apiUrl'
import AuthImage from '../images/newImage/auth-image.png';
import AuthDecoration from '../images/auth-decoration.png';
import { useParams, useSearchParams } from "react-router-dom";
import { Spinner } from "reactstrap";
import Logo from '../logo.png';

function UserInvitation() {
    const [searchParam, setSearchParam] = useSearchParams(location.search);
    const token = searchParam.get('token');
    const [user, setUser] = useState({ email: "", username: "", password: "", re_password: '', token:token});
    const navigate = useNavigate();
    const [isSave, setIsSave] = useState(false);

    const handleinput = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    }

    const register = async () => {
        setIsSave(true);
        if (!user.username) { toast.error("Please enter name !");  return; }
        if (user.password != user.re_password) { toast.error("Password dose not matched"); return; }
        try {
            const response = await axios.post(USER_REGISTER, user);
            toast.success('successfully registerd!');
            setTimeout(function() { 
                setIsSave(false);
                navigate('/');
            }, 1000);
           
           
        } catch (error) {
            toast.error(error.response.data.message);
            setIsSave(false);
        }
    };

    const getEmail = async () => {
        try {
            let URL = GET_USER_EMAIL(token);
            const response = await axios.get(URL);
            setUser({ ...user, ['email']: response.data });
        } catch (error) {
            toast.error(error.response.data.msg);
        }
    };

    useEffect(()=>{
        getEmail();
    },[]);

    return (
        <main className="bg-white dark:bg-slate-900">
            <div className="relative md:flex">
                <div className="md:w-1/2">
                    <div className="min-h-[100dvh] h-full flex flex-col after:flex-1">
                        <div className="flex-1">
                            <div className="flex items-center justify-between h-16 px-4 sm:px-6 lg:px-8">
                                <Link className="block" to="/">
                                <img src={Logo} className="logo"/>
                                    {/* <svg width="32" height="32" viewBox="0 0 32 32">
                                        <defs>
                                            <linearGradient x1="28.538%" y1="20.229%" x2="100%" y2="108.156%" id="logo-a">
                                                <stop stopColor="#A5B4FC" stopOpacity="0" offset="0%" />
                                                <stop stopColor="#A5B4FC" offset="100%" />
                                            </linearGradient>
                                            <linearGradient x1="88.638%" y1="29.267%" x2="22.42%" y2="100%" id="logo-b">
                                                <stop stopColor="#38BDF8" stopOpacity="0" offset="0%" />
                                                <stop stopColor="#38BDF8" offset="100%" />
                                            </linearGradient>
                                        </defs>
                                        <rect fill="#6366F1" width="32" height="32" rx="16" />
                                        <path d="M18.277.16C26.035 1.267 32 7.938 32 16c0 8.837-7.163 16-16 16a15.937 15.937 0 01-10.426-3.863L18.277.161z" fill="#4F46E5" />
                                        <path d="M7.404 2.503l18.339 26.19A15.93 15.93 0 0116 32C7.163 32 0 24.837 0 16 0 10.327 2.952 5.344 7.404 2.503z" fill="url(#logo-a)" />
                                        <path d="M2.223 24.14L29.777 7.86A15.926 15.926 0 0132 16c0 8.837-7.163 16-16 16-5.864 0-10.991-3.154-13.777-7.86z" fill="url(#logo-b)" />
                                    </svg> */}
                                </Link>
                            </div>
                        </div>

                        <div className="max-w-sm mx-auto w-full px-4 py-8">
                            <h1 className="text-3xl text-slate-800 dark:text-slate-100 font-bold mb-6">Create your Account ✨</h1>
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium mb-1" htmlFor="name">Full Name <span className="text-rose-500">*</span></label>
                                    <input id="username" name="username" value={user.username} onChange={(e) => handleinput(e)} placeholder="Enter Full Name" className="form-input w-full" type="text" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-1" htmlFor="email">Email Address <span className="text-rose-500">*</span></label>
                                    <input id="email" name='email' value={user.email} onChange={(e) => handleinput(e)} placeholder="Enter Email" className="form-input w-full" type="email" readOnly/>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-1" htmlFor="password">Password <span className="text-rose-500">*</span></label>
                                    <input id="password" name="password" value={user.password} onChange={(e) => handleinput(e)} placeholder="Enter Password" className="form-input w-full" type="password" autoComplete="on" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-1" htmlFor="password">Re-Password <span className="text-rose-500">*</span></label>
                                    <input id="re_password" name="re_password" value={user.re_password} onChange={(e) => handleinput(e)} placeholder="Enter Re-Password" className="form-input w-full" type="password" autoComplete="on" />
                                </div>
                            </div>
                            <div className="flex items-center justify-center mt-6">
                                {!isSave ?
                                    <button className="btn bg-indigo-500 hover:bg-indigo-600 text-white ml-3 whitespace-nowrap" onClick={() => register()}>Sign Up</button>
                                    :
                                    <button className="btn bg-indigo-500 hover:bg-indigo-600 text-white ml-3 whitespace-nowrap"><Spinner animation="border" size="sm"></Spinner></button>
                                }
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
    );
}

export default UserInvitation;