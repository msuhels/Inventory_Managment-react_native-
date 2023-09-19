import React, { useEffect, useState, useRef } from "react";
import axios from '../../../api/axios';
import { ADD_PRODUCTS } from '../../../api/apiUrl';
import toast, { Toaster } from 'react-hot-toast';
import { Spinner } from "reactstrap";
import Image from '../../../images/default_product.png';
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { useTranslation } from "react-i18next";

export default function Modal({ showModal, setShowModal, removeProduct,isDelete, note,setNote, productData }) {
    const { t } = useTranslation();
    return (
        <>
            {showModal ? (
                <>
                    <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none" >
                        <div className="relative w-auto my-6 mx-auto max-w-3xl">
                            <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                                <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                                    <h3 className="text-3xl font-semibold text-center"> {t("Confirmation")}</h3>
                                </div>
                                <div className="relative p-3 flex-auto">
                                    <div className="sm:flex sm:justify-between sm:items-center px-3 pb-5">
                                        {productData.quantity==0 ?<div className="px-2 ">
                                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                                                {t("Note")} <span className="text-danger">*</span>
                                            </label>
                                            <input type="text" name="title" onChange={(e) => setNote(e.target.value)} value={note} placeholder="Enter Note" className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-2 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 width-input-400" />
                                        </div>
                                        : <p className="text-danger">{t("Removal is not possible as the product is still in stock")}</p>
                                        }
                                    </div>
                                </div>
                                <div className="flex items-center justify-end p-1 border-t border-solid border-slate-200 rounded-b">
                                    <button type="button" onClick={() => setShowModal(false)} className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"> {t("Close")} </button>
                                    {productData.quantity == 0 && <>
                                        {!isDelete ?
                                        <button className="bg-emerald-500 text-white active:bg-emerald-600 text-sm px-4 py-2 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" type="button" onClick={removeProduct} > {t("Delete")}</button>
                                        :
                                        <button className="bg-emerald-500 text-white active:bg-emerald-600 text-sm px-4 py-2 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" type="button"> <Spinner animation="border" size="sm"></Spinner></button>
                                    }
                                    </>}
                                </div>
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