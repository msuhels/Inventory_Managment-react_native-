import React, { useEffect, useState } from 'react';

import Sidebar from '../../partials/Sidebar';
import Header from '../../partials/Header';
import PaginationClassic from '../../components/PaginationClassic';
import AddProductPopup from "../Models/product/AddProduct";
import UpdateProductPopup from "../Models/product/UpdateProduct";
import DeleteProduct from "../Models/product/DeleteProduct";
import Confermation from "../../components/Confermation";
import Moment from 'moment';
import toast, { Toaster } from 'react-hot-toast';
import axios from '../../api/axios';
import { GET_ALL_ACTIVITIES_BY_PAGINATION } from '../../api/apiUrl';
import LOADER from '../../images/loader.gif';
import Image from '../../images/userImg.jpg';
import activityIcon from '../../images/newImage/activity.png';
import { useTranslation } from "react-i18next";

function Activities() {
    let { admin, token } = JSON.parse(sessionStorage.getItem('userDetails'));
    const { t } = useTranslation();
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [pageNum, setPageNum] = useState(1);
    const [search, setSearch] = useState('');
    const [activities, setActivities] = useState(null);
    const [isFetch, setIsFetch] = useState(false);

    const getActivities = async () => {
        try {
            let URL = GET_ALL_ACTIVITIES_BY_PAGINATION(pageNum, search);
            const response = await axios.get(URL, { headers: { "Authorization": "Bearer " + token } });
            setActivities(response.data);
            setIsFetch(true);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getActivities();
    }, [pageNum, search]);


    return (
        <div className="flex h-[100dvh] overflow-hidden">
            <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
            <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
                <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
                <main className="grow">
                    <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">
                        <div className="sm:flex sm:justify-between sm:items-center mb-8">
                            <div className="mb-4 sm:mb-0 sm:flex sm:justify-start sm:items-start mb-8 display-inline-flex">
                                <h1 className="text-2xl md:text-3xl text-slate-800 dark:text-slate-100 font-bold">{t("Activities")}</h1>
                                <img className='my-1 mx-3' src={activityIcon} width="35px" />
                            </div>
                        </div>
                        <div className="bg-white dark:bg-slate-800 shadow-lg rounded-sm border border-slate-200 dark:border-slate-700 relative">
                            <header className="sm:flex sm:justify-between sm:items-center p-3">
                                <h2 className="font-semibold text-slate-800 dark:text-slate-100 py-2">{t("All Activities")}</h2>
                                {/* <div>
                                    <label className="form-label">Search :</label>
                                    <input className='form-control border border-secondary ml-2 p-1 rounded-md' value={search} onChange={(e) => setSearch(e.target.value)} />
                                </div> */}
                            </header>
                            <hr />
                            <div>
                                <div className="overflow-x-auto ">
                                    {activities?.result?.map((act, i) => {
                                        let createdAt = Moment(act.createdAt).format('LLL');
                                        return (<div key={i}>
                                            <div className='sm:flex sm:justify-between p-3 border border-slate-200'>
                                                <div className='sm:flex sm:justify-start display-inline-flex'>
                                                    <div style={{height:'50px', width:'50px'}}>
                                                        <img  src={act?.userid?.image ? act?.userid?.image : Image} style={{height:'50px', width:'50px'}} alt="User image" />
                                                    </div>
                                                    <div className='ml-3'>
                                                        <h5 className='font-bold text-slate-800 dark:text-slate-100'>{act?.userid?.username}  <span className='ml-1 font-light'>{act?.activity}</span></h5>
                                                        <h5 className=''>{act?.note}</h5>
                                                    </div>
                                                </div>
                                                <div>
                                                <h6>{createdAt}</h6>
                                                </div>
                                            </div>
                                        </div>)
                                    })}
                                    {!isFetch && <div className='p-5 p-3 sm:flex sm:justify-center'>
                                        <img src={LOADER} className="loader-gif" />
                                    </div>}
                                </div>
                            </div>
                        </div>
                        {activities?.result?.length > 0 &&
                            <div className="mt-8">
                                <PaginationClassic
                                    records={activities}
                                    handleFun={setPageNum}
                                    pageNum={pageNum}
                                />
                            </div>
                        }
                    </div>
                </main>
            </div>
            <Toaster />
        </div>
    );
}

export default Activities;