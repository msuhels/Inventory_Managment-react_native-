import React, { useState, useEffect, useRef } from 'react';
import { NavLink, useLocation, Link } from 'react-router-dom';

import SidebarLinkGroup from './SidebarLinkGroup';
import Logo from '../logo.png';
import Moment from 'moment';
import ProductsIcon from '../images/newImage/Products.png';
import SettingsIcon from '../images/newImage/Settings.png';
import usersIcon from '../images/newImage/users.png';
import activityIcon from '../images/newImage/activity.png';
import dashboardIcon from '../images/newImage/Dashboard.png';
import CategoryIcon from '../images/newImage/Category.png';
import { useTranslation } from "react-i18next";


function Sidebar({
  sidebarOpen,
  setSidebarOpen
}) {
  let { admin, token } = JSON.parse(sessionStorage.getItem('userDetails'));
  const { t } = useTranslation();
  const location = useLocation();
  const { pathname } = location;

  const trigger = useRef(null);
  const sidebar = useRef(null);

  const storedSidebarExpanded = localStorage.getItem('sidebar-expanded');
  const [sidebarExpanded, setSidebarExpanded] = useState(storedSidebarExpanded === null ? false : storedSidebarExpanded === 'true');

  // close on click outside
  useEffect(() => {
    const clickHandler = ({ target }) => {
      if (!sidebar.current || !trigger.current) return;
      if (!sidebarOpen || sidebar.current.contains(target) || trigger.current.contains(target)) return;
      setSidebarOpen(false);
    };
    document.addEventListener('click', clickHandler);
    return () => document.removeEventListener('click', clickHandler);
  });

  // close if the esc key is pressed
  useEffect(() => {
    const keyHandler = ({ keyCode }) => {
      if (!sidebarOpen || keyCode !== 27) return;
      setSidebarOpen(false);
    };
    document.addEventListener('keydown', keyHandler);
    return () => document.removeEventListener('keydown', keyHandler);
  });

  useEffect(() => {
    localStorage.setItem('sidebar-expanded', sidebarExpanded);
    if (sidebarExpanded) {
      document.querySelector('body').classList.add('sidebar-expanded');
    } else {
      document.querySelector('body').classList.remove('sidebar-expanded');
    }
  }, [sidebarExpanded]);
  
  return (
    <div className="min-w-fit">
      <div
        className={`fixed inset-0 bg-slate-900 bg-opacity-30 z-40 lg:hidden lg:z-auto transition-opacity duration-200 ${sidebarOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
          }`}
        aria-hidden="true"
      ></div>

      <div
        id="sidebar"
        ref={sidebar}
        className={`flex flex-col absolute z-40 left-0 top-0 lg:static lg:left-auto lg:top-auto lg:translate-x-0 h-[100dvh] overflow-y-scroll lg:overflow-y-auto no-scrollbar w-64 lg:w-20 lg:sidebar-expanded:!w-64 2xl:!w-64 shrink-0 bg-slate-800 p-4 transition-all duration-200 ease-in-out ${sidebarOpen ? 'translate-x-0' : '-translate-x-64'
          }`}
      >
        <div className="flex justify-between mb-10 pr-3 sm:px-2">
          {/* <button
            ref={trigger}
            className="lg:hidden text-slate-500 hover:text-slate-400"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            aria-controls="sidebar"
            aria-expanded={sidebarOpen}
          >
            <span className="sr-only">Close sidebar</span>
            <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M10.7 18.7l1.4-1.4L7.8 13H20v-2H7.8l4.3-4.3-1.4-1.4L4 12z" />
            </svg>
          </button> */}
          {/* <NavLink end to="/" className="block"> */}
          <img src={Logo} className="logo cursor-pointer mt-0" onClick={() => {setSidebarExpanded(!sidebarExpanded); setSidebarOpen(!sidebarOpen)}} />
          {/* </NavLink> */}
        </div>

        <div className="space-y-8">
          <div>
            <h3 className="text-xs uppercase text-slate-500 font-semibold pl-3">
              <span className="hidden lg:block lg:sidebar-expanded:hidden 2xl:hidden text-center w-6" aria-hidden="true">
                •••
              </span>
              <span className="lg:hidden lg:sidebar-expanded:block 2xl:block">{t("Pages")}</span>
            </h3>
            <ul className="mt-3">
              <SidebarLinkGroup activecondition={pathname === '/'}>
                {(handleClick, open) => {
                  return (
                    <React.Fragment>
                      <Link
                        onClick={(e) => {
                          handleClick();
                          setSidebarExpanded(true);
                        }}
                        to="/" className={`block text-slate-200 truncate transition duration-150 ${pathname === '/' ? 'hover:text-slate-200' : 'hover:text-white'}`} >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <img src={dashboardIcon} className="side-bar-icons" width="23px"/>
                            <span className="text-sm font-medium ml-3 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                              {t("Dashboard")}
                            </span>
                          </div>
                        </div>
                      </Link>
                    </React.Fragment>
                  );
                }}
              </SidebarLinkGroup>
              {admin?.role == 'admin' || admin?.role == 'super admin' ?
                <>
                  <SidebarLinkGroup activecondition={pathname === '/users'}>
                    {(handleClick, open) => {
                      return (
                        <React.Fragment>
                          <Link
                            onClick={(e) => {
                              handleClick();
                              setSidebarExpanded(true);
                            }}
                            to="/users"
                            className={`block text-slate-200 truncate transition duration-150 ${pathname === '/users' ? 'hover:text-slate-200' : 'hover:text-white'}`}
                          >
                            <div className="flex items-center justify-between">
                              <div className="flex items-center">
                               <img src={usersIcon} className="side-bar-icons" width="23px"/>
                                <span className="text-sm font-medium ml-3 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                                  {t("Users")}
                                </span>
                              </div>
                            </div>
                          </Link>
                        </React.Fragment>
                      );
                    }}
                  </SidebarLinkGroup>

                  <SidebarLinkGroup activecondition={(pathname.includes('categories') || pathname.includes('sub-categories') || pathname.includes('measurement'))}>
                    {(handleClick, open) => {
                      return (
                        <React.Fragment>
                          <a
                            href="#0"
                            className={`block text-slate-200 truncate transition duration-150 ${(pathname.includes('categories') || pathname.includes('sub-categories') || pathname.includes('measurement')) ? 'hover:text-slate-200' : 'hover:text-white'
                              }`}
                            onClick={(e) => {
                              e.preventDefault();
                              handleClick();
                              setSidebarExpanded(true);
                            }}
                          >
                            <div className="flex items-center justify-between">
                              <div className="flex items-center">
                              <img src={CategoryIcon} className="side-bar-icons" width="23px"/>
                                <span className="text-sm font-medium ml-3 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                                  {t("Categories")}
                                </span>
                              </div>
                              {/* Icon */}
                              <div className="flex shrink-0 ml-2">
                                <svg className={`w-3 h-3 shrink-0 ml-1 fill-current text-slate-400 ${open && 'rotate-180'}`} viewBox="0 0 12 12" > <path d="M5.9 11.4L.5 6l1.4-1.4 4 4 4-4L11.3 6z" /></svg>
                              </div>
                            </div>
                          </a>
                          <div className="lg:hidden lg:sidebar-expanded:block 2xl:block">
                            <ul className={`pl-9 mt-1 ${!open && 'hidden'}`}>

                              <li className="mb-1 last:mb-0">
                                <NavLink end to="/categories" className={({ isActive }) => 'block transition duration-150 truncate ' + (isActive ? 'text-indigo-500' : 'text-slate-400 hover:text-slate-200')} >
                                  <span className="text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                                    {t("Category")}
                                  </span>
                                </NavLink>
                              </li>
                              <li className="mb-1 last:mb-0">
                                <NavLink end to="/sub-categories" className={({ isActive }) => 'block transition duration-150 truncate ' + (isActive ? 'text-indigo-500' : 'text-slate-400 hover:text-slate-200')} >
                                  <span className="text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                                    {t("Subcategory")}
                                  </span>
                                </NavLink>
                              </li>
                              <li className="mb-1 last:mb-0">
                                <NavLink end to="/measurement" className={({ isActive }) => 'block transition duration-150 truncate ' + (isActive ? 'text-indigo-500' : 'text-slate-400 hover:text-slate-200')}>
                                  <span className="text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                                    {t("Measurement")}
                                  </span>
                                </NavLink>
                              </li>
                            </ul>
                          </div>
                        </React.Fragment>
                      );
                    }}
                  </SidebarLinkGroup>


                  <SidebarLinkGroup activecondition={pathname === '/activities'}>
                    {(handleClick, open) => {
                      return (
                        <React.Fragment>
                          <Link
                            onClick={(e) => {
                              handleClick();
                              setSidebarExpanded(true);
                            }}
                            to="/activities"
                            className={`block text-slate-200 truncate transition duration-150 ${pathname === '/activities' ? 'hover:text-slate-200' : 'hover:text-white'}`}
                          >
                            <div className="flex items-center justify-between">
                              <div className="flex items-center">
                              <img src={activityIcon} className="side-bar-icons" width="23px"/>
                                {/* <svg className="shrink-0 h-6 w-6" viewBox="0 0 24 24">
                                  <path className={`fill-current ${pathname === '/activities' ? 'text-indigo-600' : 'text-slate-600'}`} d="M20 7a.75.75 0 01-.75-.75 1.5 1.5 0 00-1.5-1.5.75.75 0 110-1.5 1.5 1.5 0 001.5-1.5.75.75 0 111.5 0 1.5 1.5 0 001.5 1.5.75.75 0 110 1.5 1.5 1.5 0 00-1.5 1.5A.75.75 0 0120 7zM4 23a.75.75 0 01-.75-.75 1.5 1.5 0 00-1.5-1.5.75.75 0 110-1.5 1.5 1.5 0 001.5-1.5.75.75 0 111.5 0 1.5 1.5 0 001.5 1.5.75.75 0 110 1.5 1.5 1.5 0 00-1.5 1.5A.75.75 0 014 23z"></path>
                                  <path className={`fill-current ${pathname === '/activities' ? 'text-indigo-600' : 'text-slate-600'}`} d="M17 23a1 1 0 01-1-1 4 4 0 00-4-4 1 1 0 010-2 4 4 0 004-4 1 1 0 012 0 4 4 0 004 4 1 1 0 010 2 4 4 0 00-4 4 1 1 0 01-1 1zM7 13a1 1 0 01-1-1 4 4 0 00-4-4 1 1 0 110-2 4 4 0 004-4 1 1 0 112 0 4 4 0 004 4 1 1 0 010 2 4 4 0 00-4 4 1 1 0 01-1 1z"></path>
                                </svg> */}
                                <span className="text-sm font-medium ml-3 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                                  {t("Activities")}
                                </span>
                              </div>
                            </div>
                          </Link>
                        </React.Fragment>
                      );
                    }}
                  </SidebarLinkGroup>
                </>
                : ''}

              <SidebarLinkGroup activecondition={pathname === '/products'}>
                {(handleClick, open) => {
                  return (
                    <React.Fragment>
                      <Link
                        onClick={(e) => {
                          handleClick();
                          setSidebarExpanded(true);
                        }}
                        to="/products"
                        className={`block text-slate-200 truncate transition duration-150 ${pathname === '/products' ? 'hover:text-slate-200' : 'hover:text-white'}`}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <img src={ProductsIcon} className="side-bar-icons" width="23px"/>
                            {/* <svg className="shrink-0 h-6 w-6" viewBox="0 0 24 24">
                              <path className={`fill-current ${pathname === '/products' ? 'text-indigo-600' : 'text-slate-600'}`} d="M4.418 19.612A9.092 9.092 0 0 1 2.59 17.03L.475 19.14c-.848.85-.536 2.395.743 3.673a4.413 4.413 0 0 0 1.677 1.082c.253.086.519.131.787.135.45.011.886-.16 1.208-.474L7 21.44a8.962 8.962 0 0 1-2.582-1.828Z"></path>
                              <path className={`fill-current ${pathname === '/products' ? 'text-indigo-600' : 'text-slate-600'}`} d="M10.034 13.997a11.011 11.011 0 0 1-2.551-3.862L4.595 13.02a2.513 2.513 0 0 0-.4 2.645 6.668 6.668 0 0 0 1.64 2.532 5.525 5.525 0 0 0 3.643 1.824 2.1 2.1 0 0 0 1.534-.587l2.883-2.882a11.156 11.156 0 0 1-3.861-2.556Z"></path><path className="fill-current text-indigo-300" d="M21.554 2.471A8.958 8.958 0 0 0 18.167.276a3.105 3.105 0 0 0-3.295.467L9.715 5.888c-1.41 1.408-.665 4.275 1.733 6.668a8.958 8.958 0 0 0 3.387 2.196c.459.157.94.24 1.425.246a2.559 2.559 0 0 0 1.87-.715l5.156-5.146c1.415-1.406.666-4.273-1.732-6.666Zm.318 5.257c-.148.147-.594.2-1.256-.018A7.037 7.037 0 0 1 18.016 6c-1.73-1.728-2.104-3.475-1.73-3.845a.671.671 0 0 1 .465-.129c.27.008.536.057.79.146a7.07 7.07 0 0 1 2.6 1.711c1.73 1.73 2.105 3.472 1.73 3.846Z"></path>
                            </svg> */}
                           
                            <span className="text-sm font-medium ml-3 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                              {t("Products")}
                            </span>
                          </div>
                        </div>
                      </Link>
                    </React.Fragment>
                  );
                }}
              </SidebarLinkGroup>

              <SidebarLinkGroup activecondition={pathname.includes('settings')}>
                {(handleClick, open) => {
                  return (
                    <React.Fragment>
                      <a
                        href="#0"
                        className={`block text-slate-200 truncate transition duration-150 ${pathname.includes('settings') ? 'hover:text-slate-200' : 'hover:text-white'
                          }`}
                        onClick={(e) => {
                          e.preventDefault();
                          handleClick();
                          setSidebarExpanded(true);
                        }}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                          <img src={SettingsIcon} className="side-bar-icons" width="23px"/>
                            <span className="text-sm font-medium ml-3 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                              {t("Settings")}
                            </span>
                          </div>
                          {/* Icon */}
                          <div className="flex shrink-0 ml-2">
                            <svg
                              className={`w-3 h-3 shrink-0 ml-1 fill-current text-slate-400 ${open && 'rotate-180'}`}
                              viewBox="0 0 12 12"
                            >
                              <path d="M5.9 11.4L.5 6l1.4-1.4 4 4 4-4L11.3 6z" />
                            </svg>
                          </div>
                        </div>
                      </a>
                      <div className="lg:hidden lg:sidebar-expanded:block 2xl:block">
                        <ul className={`pl-9 mt-1 ${!open && 'hidden'}`}>
                          {(admin?.role == 'admin' || admin?.role == 'super admin') && <li className="mb-1 last:mb-0">
                            <NavLink end to="/settings" className={({ isActive }) =>
                                'block transition duration-150 truncate ' + (isActive ? 'text-indigo-500' : 'text-slate-400 hover:text-slate-200')
                              }
                            >
                              <span className="text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                                {t("Main")}
                              </span>
                            </NavLink>
                          </li>}

                          <li className="mb-1 last:mb-0">
                            <NavLink end to="/account" className={({ isActive }) =>
                                'block transition duration-150 truncate ' + (isActive ? 'text-indigo-500' : 'text-slate-400 hover:text-slate-200')
                              }
                            >
                              <span className="text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                                {t("My Account")}
                              </span>
                            </NavLink>
                          </li>

                        </ul>
                      </div>
                    </React.Fragment>
                  );
                }}
              </SidebarLinkGroup>
            </ul>
          </div>
        </div>
        <div className="pt-3  lg:inline-flex justify-end mt-auto ">
          {/* <div className="px-3 py-2 closearrow">
            <button onClick={() => {setSidebarExpanded(!sidebarExpanded); setSidebarOpen(!sidebarOpen)}}>
              <span className="sr-only">Expand / collapse sidebar</span>
              <svg className="w-6 h-6 fill-current sidebar-expanded:rotate-180" viewBox="0 0 24 24">
                <path className="text-slate-400" d="M19.586 11l-5-5L16 4.586 23.414 12 16 19.414 14.586 18l5-5H7v-2z" />
                <path className="text-slate-600" d="M3 23H1V1h2z" />
              </svg>
            </button>
          </div> */}
        </div>
        {(sidebarExpanded) &&
          <div>
            <p className='font-bold text-center' style={{ fontSize: "12px" }}> {t("Crafted by Continaz for Mcan LTD Exclusively")}  {Moment().format("YYYY")}</p>
          </div>
        }
      </div>
    </div>
  );
}

export default Sidebar;