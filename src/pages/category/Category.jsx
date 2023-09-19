import React, { useEffect, useState } from 'react';

import Sidebar from '../../partials/Sidebar';
import Header from '../../partials/Header';
import PaginationClassic from '../../components/PaginationClassic';
import Categorypopup from "../Models/category/Category";
import UpdateCategorypopup from "../Models/category/UpdateCategory";
import Confermation from "../../components/Confermation";
import Moment from 'moment';
import toast, { Toaster } from 'react-hot-toast';
import axios from '../../api/axios';
import { GET_ALL_CATEGORIES, UPDATE_CATEGORY, DELETE_CATEGORY, GET_ALL_CATEGORIES_BY_PAGINATION } from '../../api/apiUrl';
import LOADER from '../../images/loader.gif';
import CategoryIcon from '../../images/newImage/Category.png';
import {useSearchParams} from "react-router-dom";
import { useTranslation } from "react-i18next";

function Customers() {
    let { admin, token } = JSON.parse(sessionStorage.getItem('userDetails'));
    const { t } = useTranslation();
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [showAddModal, setShowAddModal] = useState(false);
    const [categories, setCategories] = useState(null);
    const [category, setCategory] = useState(null);
    const [showUpdateModal, setShowUpdateModal] = useState(false);
    const [showConfermation, setShowConfermation] = useState(false);
    const [deletedId, setDeletedId] = useState(null);
    const [isDelete, setIsDelete] = useState(false);
    const [pageNum, setPageNum] = useState(1);
    const [search, setSearch] = useState('');
    const [isFetch, setIsFetch] = useState(false);
    const [searchBycolumn, setSearchBycolumn] = useState(null);
    const [sorting, setSorting] = useState({ column: 'createdAt', order: 'ASC' });
    const [searchParams,setSearchParam] = useSearchParams();

    const getCategories = async () => {
        try {
            let URL = GET_ALL_CATEGORIES_BY_PAGINATION(pageNum, search, sorting.column, sorting.order, JSON.stringify(searchBycolumn));
            const response = await axios.get(URL, { headers: { "Authorization": "Bearer " + token } });
            setCategories(response.data);
            setIsFetch(true);
        } catch (error) {
            console.log(error);
        }
    }

    const updateCategory = (cat) => {
        setCategory(cat);
        setShowUpdateModal(true);
    }

    const remove = (id) => {
        setShowConfermation(true);
        setDeletedId(id);
    }

    const handleSorting = (column) => {
        let sort = { ...sorting };
        sort.column = column;
        sort.order = sort.order == 'ASC' ? 'DESC' : 'ASC';
        setSorting(sort);
    }

    const handleSearching = (e) => {
        let searchCol = { ...searchBycolumn };
        searchCol[e.target.name] = e.target.value;
        setSearchBycolumn(searchCol);
    }

    const deleteCategory = async () => {
        setIsDelete(true);
        try {
            let URL = DELETE_CATEGORY(deletedId);
            const response = await axios.delete(URL, { headers: { "Authorization": "Bearer " + token } });
            getCategories();
            setShowConfermation(false);
            toast.success('successfully deleted!');
            setIsDelete(false);
        } catch (error) {
            toast.error(error.response.data.msg);
            setShowConfermation(false);
            setIsDelete(false);
        }
    }

    useEffect(() => {
        getCategories();
    }, [pageNum, search, sorting, searchBycolumn]);

    useEffect(()=>{
        if(searchParams.get('action') == 'add'){
          setShowAddModal(true);
        }
      },[]);

    return (
        <div className="flex h-[100dvh] overflow-hidden">
            <Categorypopup showModal={showAddModal} setShowModal={setShowAddModal} getCategories={getCategories} />
            <UpdateCategorypopup showModal={showUpdateModal} setShowModal={setShowUpdateModal} getCategories={getCategories} category={category} />
            <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
            <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
                <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
                <main className="grow">
                    <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">
                        <div className="sm:flex sm:justify-between sm:items-center mb-8">

                            <div className="mb-4 sm:mb-0 sm:flex sm:justify-start sm:items-start mb-8 display-inline-flex">
                                <h1 className="text-2xl md:text-3xl text-slate-800 dark:text-slate-100 font-bold">{t("Category")}</h1>
                                <img className='my-1 mx-3' src={CategoryIcon} width="35px" />
                            </div>
                            <div className="grid grid-flow-col sm:auto-cols-max justify-start sm:justify-end gap-2">
                                <button className="btn bg-indigo-500 hover:bg-indigo-600 text-white" onClick={() => setShowAddModal(true)}>
                                    <svg className="w-4 h-4 fill-current opacity-50 shrink-0" viewBox="0 0 16 16">
                                        <path d="M15 7H9V1c0-.6-.4-1-1-1S7 .4 7 1v6H1c-.6 0-1 .4-1 1s.4 1 1 1h6v6c0 .6.4 1 1 1s1-.4 1-1V9h6c.6 0 1-.4 1-1s-.4-1-1-1z" />
                                    </svg>
                                    <span className="xs:block ml-2">{t("Add Category")}</span>
                                </button>
                            </div>
                        </div>
                        <div className="bg-white dark:bg-slate-800 shadow-lg rounded-sm border border-slate-200 dark:border-slate-700 relative">
                            <header className="sm:flex sm:justify-between sm:items-center p-3">
                                <h2 className="font-semibold text-slate-800 dark:text-slate-100">{t("All Category")}</h2>
                                <div>
                                    <label className="form-label">{t("Search")} :</label>
                                    <input className='form-control border border-secondary ml-2 p-1 rounded-md' value={search} onChange={(e) => setSearch(e.target.value)} />
                                </div>
                            </header>
                            <div>
                                <div className="overflow-x-auto">
                                    <table className="table-auto w-full dark:text-slate-300">
                                        <thead className="text-xs font-semibold uppercase text-slate-500 dark:text-slate-400 bg-slate-50 dark:bg-slate-900/20 border-t border-b border-slate-200 dark:border-slate-700">
                                            <tr className='table-heading'>
                                                <th className="py-5">
                                                    <div className="">SN</div>
                                                </th>
                                                <th className="">
                                                    <div className="cursor-pointer" onClick={() => handleSorting('name')}>{t("Category")}
                                                        <span className={`${(sorting.column == 'name' && sorting.order == 'ASC') ? 'active-arrow' : ''}`}>↑</span>
                                                        <span className={`arrow-margin ${(sorting.column == 'name' && sorting.order == 'DESC') ? 'active-arrow' : ''}`}>↓</span>
                                                    </div>
                                                </th>
                                                <th className="">
                                                    <div className="cursor-pointer" onClick={() => handleSorting('createdAt')}>{t("Created At")}
                                                        <span className={`${(sorting.column == 'createdAt' && sorting.order == 'ASC') ? 'active-arrow' : ''}`}>↑</span>
                                                        <span className={`arrow-margin ${(sorting.column == 'createdAt' && sorting.order == 'DESC') ? 'active-arrow' : ''}`}>↓</span>
                                                    </div>
                                                </th>
                                                {/* <th className="">
                                                    <div className="cursor-pointer" onClick={() => handleSorting('updatedAt')}>Updated At
                                                        <span className={`${(sorting.column == 'updatedAt' && sorting.order == 'ASC') ? 'active-arrow' : ''}`}>↑</span>
                                                        <span className={`arrow-margin ${(sorting.column == 'updatedAt' && sorting.order == 'DESC') ? 'active-arrow' : ''}`}>↓</span>
                                                    </div>
                                                </th> */}
                                                <th className="">
                                                    <div className="">{t("Actions")}</div>
                                                </th>

                                            </tr>
                                        </thead>
                                        <tr className="border border-bottom bg-tr-table">
                                            <th className=""></th>
                                            <th className="">
                                                <div>
                                                    <input type="text" onChange={(e) => handleSearching(e)} name="name" placeholder={t("Category")} className="block w-full rounded border-gray-200 p-1 py-0 mx-1 font-size-weight text-center" />
                                                </div>
                                            </th>
                                            <th className=""></th>
                                            <th className=""></th>
                                        </tr>
                                        <tbody className="text-sm divide-y divide-slate-200 dark:divide-slate-700">
                                            {isFetch && categories?.result?.map((cat, i) => {
                                                let createdAt = Moment(cat.createdAt).format('DD-MM-YYYY H:m');
                                                let updatedAt = Moment(cat.updatedAt).format('DD-MM-YYYY H:m');
                                                return (<tr className key={i}>
                                                    <td className="py-4">
                                                        <div className="text-center">{i + 1}</div>
                                                    </td>
                                                    <td className="">
                                                        <div className="text-center">{cat.name}</div>
                                                    </td>
                                                    <td className="">
                                                        <div className="text-center font-medium text-sky-500">{createdAt}</div>
                                                    </td>
                                                    {/* <td className="">
                                                        <div className="text-center font-medium text-emerald-500">{updatedAt}</div>
                                                    </td> */}
                                                    <td className="text-center">
                                                        <div className="text-center py-1">
                                                            <button className='mt-1 bg-rose-500 hover:bg-rose-600 text-white font-bold py-1 px-4 rounded-full mr-2' onClick={() => remove(cat._id)}>{t("Delete")}</button>
                                                            <button className='mt-1 bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-1 px-4 rounded-full' onClick={() => updateCategory(cat)}>{t("Edit")}</button>
                                                        </div>
                                                    </td>
                                                </tr>)
                                            })}
                                        </tbody>
                                    </table>
                                    {!isFetch && <div className='p-5 p-3 sm:flex sm:justify-center'>
                                        <img src={LOADER} className="loader-gif" />
                                    </div>}
                                </div>
                            </div>
                        </div>
                        {categories?.result?.length > 0 &&
                            <div className="mt-8">
                                <PaginationClassic
                                    records={categories}
                                    handleFun={setPageNum}
                                    pageNum={pageNum}
                                />
                            </div>
                        }
                    </div>

                </main>
            </div>
            <Confermation
                showConfermation={showConfermation}
                setShowConfermation={setShowConfermation}
                handleConfirm={deleteCategory}
                title={t('Are you sure want to delete?')}
                isDelete={isDelete}
            />
            <Toaster />
        </div>
    );
}

export default Customers;