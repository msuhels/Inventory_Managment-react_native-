import React from "react";
import { Spinner } from "reactstrap";
import { useTranslation } from "react-i18next";

export default function Modal({ showConfermation, setShowConfermation, handleConfirm, title, description, isDelete }) {
    const { t } = useTranslation();
    return (
        <>
            {showConfermation ? (
                <>
                    <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none" >
                        <div className="relative w-auto my-6 mx-auto max-w-3xl">
                            <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                                <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                                    <h3 className=" font-semibold text-center"> {t("Confirmation")}</h3>
                                </div>
                                <div className="relative p-6 flex-auto">
                                   <h4>{title}</h4>
                                   <p className="text-muted">{description}</p>
                                </div>
                                <div className="flex items-center justify-end p-1 border-t border-solid border-slate-200 rounded-b">
                                    <button type="button" onClick={() => setShowConfermation(false)}  className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"> {t("Close")} </button>
                                    {!isDelete ? 
                                    <button className="bg-emerald-500 text-white active:bg-emerald-600 text-sm px-4 py-2 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" type="button" onClick={handleConfirm} >{t("Yes")}</button>
                                    :
                                    <button className="bg-emerald-500 text-white active:bg-emerald-600 text-sm px-4 py-2 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" type="button"><Spinner animation="border" size="sm"></Spinner></button>
                                }
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
                </>
            ) : null}
        </>
    );
}