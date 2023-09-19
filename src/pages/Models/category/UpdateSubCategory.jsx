import React, { useEffect, useState } from "react";
import axios from '../../../api/axios';
import { UPDATE_SUBCATEGORIES } from '../../../api/apiUrl';
import toast, { Toaster } from 'react-hot-toast';
import { Spinner } from "reactstrap";
import { useTranslation } from "react-i18next";

export default function Modal({ showModal, setShowModal, getSubCategories, subCategory, categories }) {
    let { admin, token } = JSON.parse(sessionStorage.getItem('userDetails'));
    const [subCategories, setSubCategories] = useState(null);
    const [isUpdate, setIsUpdate] = useState(false);
    const { t } = useTranslation();

    const updateCategory = async (event) => {
        event.preventDefault();
        setIsUpdate(true);
        try {
            const response = await axios.post(UPDATE_SUBCATEGORIES, subCategories, { headers: { "Authorization": "Bearer " + token } });
            toast.success('successfully Updated!');
            setShowModal(false);
            getSubCategories();
            setIsUpdate(false);
        } catch (error) {
            toast.error(error.response.data.msg);
            setIsUpdate(false);
        }
    }
    
    useEffect(() => {
        setSubCategories({
            name: subCategory?.name,
            id: subCategory?._id,
            category_id:subCategory?.category_id,
        });
    }, [subCategory]);

    return (
        <>
            {showModal ? (
                <>
                    <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none" >
                        <div className="relative w-auto my-6 mx-auto max-w-3xl">
                            <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                            <form onSubmit={updateCategory}>
                                <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                                    <h3 className="text-3xl font-semibold text-center"> {t("Update Subcategory")}</h3>
                                </div>
                                <div className="relative p-6 flex-auto">
                                    <div className="mb-5">
                                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                                                {t("Category")}
                                            </label>
                                            <select name="category_id" onChange={(e) => setSubCategories({ ...subCategories, [e.target.name]: e.target.value })} className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" required >
                                                <option selected>{t("Choose Category")}</option>
                                                {categories?.map((cat,i)=>{
                                                    let selected =  (cat._id == subCategory?.category[0]?._id) ? true : false;
                                                    return (<option value={cat._id} key={i} selected={selected}>{cat.name}</option>);
                                                })}
                                            </select>
                                    </div>
                                    <div className="py-5">
                                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                                          {t("Subcategory")}
                                        </label>
                                        <input type="text" name="name" onChange={(e) => setSubCategories({ ...subCategories, [e.target.name]: e.target.value })} value={subCategories?.name} placeholder="Enter Category" className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 width-input-400" required />
                                    </div>
                                </div>
                                <div className="flex items-center justify-end p-1 border-t border-solid border-slate-200 rounded-b">
                                    <button type="button" onClick={() => setShowModal(false)} className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"> {t("Close")} </button>
                                    {!isUpdate ?
                                        <button className="bg-emerald-500 text-white active:bg-emerald-600 text-sm px-4 py-2 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" type="submit">{t("Update")}</button>
                                        :
                                        <button className="bg-emerald-500 text-white active:bg-emerald-600 text-sm px-4 py-2 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" type="button" > <Spinner animation="border" size="sm"></Spinner></button>
                                    }
                                </div>
                                </form>
                            </div>
                        </div>
                    </div>
                    <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
                </>
            ) : null}
            <Toaster />
        </>
    );
}