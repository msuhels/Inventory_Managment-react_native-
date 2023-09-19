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
function Activities() {
    let { admin, token } = JSON.parse(sessionStorage.getItem('userDetails'));
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
                            <div className="mb-4 sm:mb-0">
                                <h1 className="text-2xl md:text-3xl text-slate-800 dark:text-slate-100 font-bold">Product ✨</h1>
                            </div>
                        </div>
                        <div className="bg-white dark:bg-slate-800 shadow-lg rounded-sm border border-slate-200 dark:border-slate-700 relative">
                            <div>
                                <div className="overflow-x-auto ">
                                    123
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
            <Toaster />
        </div>
    );
}

export default Activities;