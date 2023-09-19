import React, { useEffect, useState, useRef } from "react";
import axios from '../../../api/axios';
import { UPDATE_INVENTORY } from '../../../api/apiUrl';
import toast, { Toaster } from 'react-hot-toast';
import { Spinner } from "reactstrap";
import html2canvas from "html2canvas";
import QRCode from "react-qr-code";
import Logo from '../../../logo.png';
import { useTranslation } from "react-i18next";

export default function Modal({ showModal, setShowModal, printContent, printQty, setPrintQty, isPrinter, printOnDymoPrinter, productid, productName }) {
    let { admin, token } = JSON.parse(sessionStorage.getItem('userDetails'));
    const { t } = useTranslation();
    const [Inventory, setInventory] = useState({ quantity: '' });
    const [isSave, setIsSave] = useState(false);
    const exportRef = useRef();

    const updateInventory = async (event) => {
        event.preventDefault();
        printOnDymoPrinter();
    }

    const exportAsImage = async (el, imageFileName) => {
        setShowModal(false);
        el.style = "display:block";
        el.style = "width:260px";
        const canvas = await html2canvas(el);
        el.style = "display:none";
        const image = canvas.toDataURL("image/png", 1.0);
        console.log(image);
        downloadImage(image, imageFileName);
    };

    const downloadImage = (blob, fileName) => {
        const fakeLink = window.document.createElement("a");
        fakeLink.style = "display:none;";
        fakeLink.download = fileName;
        fakeLink.href = blob;
        document.body.appendChild(fakeLink);
        fakeLink.click();
        document.body.removeChild(fakeLink);
        fakeLink.remove();
    };

    return (
        <>
            {showModal ? (
                <>
                    <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none" >
                        <div className="relative w-auto my-6 mx-auto max-w-3xl">
                            <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                                <form onSubmit={updateInventory}>
                                    <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                                        <h3 className="text-3xl font-semibold text-center"> {t("Print")}</h3>
                                    </div>
                                    <div className="relative p-6 flex-auto">
                                        <div style={{ width: '260px', padding: "5px", textAlign:"center", display:'none'}} ref={exportRef}>
                                            <table>
                                                <tr >
                                                    <td><img src={Logo} width='25px'/></td>
                                                    <td>
                                                        <p className='ml-3' style={{ fontSize: '12px', marginBottom: '10px', marginTop: '-10px' }}>
                                                            {productName}
                                                        </p>
                                                    </td>
                                                </tr>
                                            </table>
                                            <QRCode
                                                value={productid.toString() + '\n' + productName}
                                                size={250}
                                            />
                                        </div>
                                        <div className="py-2">
                                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                                                {t("Print Quantity")}
                                            </label>
                                            <input type="text" name="quantity" onChange={(e) => setPrintQty(e.target.value)} value={printQty} placeholder="Enter quantity" className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 width-input-400" required />
                                        </div>
                                    </div>
                                    <div className="flex items-center justify-between p-1 border-t border-solid border-slate-200 rounded-b">
                                        <button type="button" onClick={() => setShowModal(false)} className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"> {t("Close")} </button>
                                        <div>
                                            <button onClick={printContent} className="bg-emerald-500 text-white active:bg-emerald-600 text-sm px-4 py-2 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" type="button" > {t("Print")}</button>
                                            <button onClick={() => exportAsImage(exportRef.current, productid)} className="bg-emerald-500 text-white active:bg-emerald-600 text-sm px-4 py-2 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" type="button" > {t("Download Qr")}</button>
                                            {!isPrinter ?
                                                <button className="bg-emerald-500 text-white active:bg-emerald-600 text-sm px-4 py-2 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" type="submit" >{t("Dymo Print")} </button>
                                                :
                                                <button className="bg-emerald-500 text-white active:bg-emerald-600 text-sm px-4 py-2 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" type="button"> <Spinner animation="border" size="sm"></Spinner></button>
                                            }
                                        </div>
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