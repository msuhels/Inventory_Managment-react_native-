import React, { useEffect, useState } from 'react';
import Sidebar from '../../partials/Sidebar';
import Header from '../../partials/Header';
import toast, { Toaster } from 'react-hot-toast';
import axios from '../../api/axios';
import { UPDATE_SETTING, GET_SETTING, GENRATE_REPORTS, GET_ALL_PRODUCTS_FOR_EXPORT, UPDATE_DYMO_SETTING } from '../../api/apiUrl';
import LOADER from '../../images/loader.gif';
import { Spinner } from "reactstrap";
import SettingsIcon from '../../images/newImage/Settings.png';
import * as XLSX from "xlsx";
import * as FileSaver from "file-saver";
import { useTranslation } from "react-i18next";

function Setting() {
    let { admin, token } = JSON.parse(sessionStorage.getItem('userDetails'));
    const { t } = useTranslation();
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [settingData, setSettingdata] = useState({ email: '' });
    const [isSave, setIsSave] = useState(false);
    const [isUpdate, setIsUpdate] = useState(false);
    const [exportdata, setexportdata] = useState(null);

    const updateSetting = async () => {
        setIsSave(true);
        try {
            const response = await axios.post(UPDATE_SETTING, settingData, { headers: { "Authorization": "Bearer " + token } });
            toast.success('successfully updated!');
            getSetting();
            setIsSave(false);
        } catch (error) {
            toast.error(error.response.data.msg);
            setIsSave(false);
        }
    }

    const updateDymoSetting = async () => {
        setIsUpdate(true);
        try {
            const response = await axios.post(UPDATE_DYMO_SETTING, settingData, { headers: { "Authorization": "Bearer " + token } });
            toast.success('successfully updated!');
            getSetting();
            setIsUpdate(false);
        } catch (error) {
            toast.error(error.response.data.msg);
            setIsUpdate(false);
        }
    }    

    const getSetting = async () => {
        try {
            const response = await axios.get(GET_SETTING, { headers: { "Authorization": "Bearer " + token } });
            setSettingdata({
                email:response?.data?.setting?.email,
                host:response?.data?.setting?.host,
                port:response?.data?.setting?.port,

            });

        } catch (error) {
            console(error.response.data.msg);
        }
    }

    const getAllProducts = async () => {
        try {
            const response = await axios.get(GET_ALL_PRODUCTS_FOR_EXPORT, { headers: { "Authorization": "Bearer " + token } });
            let products = response.data.result;
            let exportdata = [];
            products.map((item, i) => {
                let obj = {
                    'Product Id': item?.barcode,
                    'Product Name': item?.title,
                    'Category': item?.category?.length > 0 ? item?.category[0].name : '',
                    'Subcategory': item?.subcategory?.length > 0 ? item?.subcategory[0].name : '',
                    'Size': item?.measurement?.length > 0 ? item?.measurement[0].size : '',
                    'Quantity': item?.quantity,
                }
                exportdata[i] = obj;
            })
            setexportdata(exportdata);
        } catch (error) {
            console(error.response.data.msg);
        }
    }

    const downloadImage = async (fileUrl) => {

        try {
            const response = await axios.get(GENRATE_REPORTS);
            const link = document.createElement('a');
            link.href = response.data;
            link.target = '_blank';
            link.setAttribute('download', 'filename.pdf');
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        } catch (error) {
            console(error.response.data.msg);
        }


        //    try {
        //     const response = await fetch(fileUrl);
        //     const blob = await response.blob();
        //     const filename = 'filename.pdf';

        //     const url = window.URL.createObjectURL(new Blob([blob]));
        //     const link = document.createElement('a');
        //     link.href = url;
        //     link.setAttribute('download', filename);

        //     document.body.appendChild(link);
        //     link.click();

        //     link.parentNode.removeChild(link);
        //     window.URL.revokeObjectURL(url);
        //   } catch (error) {
        //     console.error('Error downloading the file:', error);
        //   }
    }

    const exportToCSV = () => {
        const fileType = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
        const fileExtension = ".xlsx";
        let fileName = "reports"
        const ws = XLSX.utils.json_to_sheet(exportdata);
        const wb = { Sheets: { data: ws }, SheetNames: ["data"] };
        const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
        const data = new Blob([excelBuffer], { type: fileType });
        FileSaver.saveAs(data, fileName + fileExtension);
    };

    useEffect(() => {
        getSetting();
        getAllProducts();
    }, []);

    return (
        <div className="flex h-[100dvh] overflow-hidden">
            <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
            <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
                <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
                <main className="grow">
                    <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">
                        <div className="sm:flex sm:justify-between sm:items-center mb-8">
                            <div className="mb-4 sm:mb-0 sm:flex sm:justify-start sm:items-start mb-8 display-inline-flex">
                                <h1 className="text-2xl md:text-3xl text-slate-800 dark:text-slate-100 font-bold">{t("Settings")}</h1>
                                <img className='my-1 mx-3' src={SettingsIcon} width="35px" />
                            </div>
                        </div>
                        <div className="bg-white dark:bg-slate-800 shadow-lg rounded-sm border border-slate-200 dark:border-slate-700 relative py-4">
                            <header className="sm:flex sm:justify-between sm:items-center p-3">
                                <h2 className="font-semibold text-slate-800 dark:text-slate-100">{t("Set email to stock notification")}</h2>
                            </header>
                            <div>
                                <div className="sm:flex sm:justify-between sm:items-center px-3">
                                    <div>
                                        <input type="text" name="email" onChange={(e) => setSettingdata({ ...settingData, [e.target.name]: e.target.value })} value={settingData?.email} placeholder="Enter Email" className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 width-input-400" />
                                        <p className='text-muted-class'>Exp : example1@example.com,example2@example.com</p>
                                    </div>
                                    {!isSave ?
                                        <button className="bg-emerald-500 text-white active:bg-emerald-600 text-sm px-4 py-2 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" type="button" onClick={updateSetting} >{t("Update")}</button>
                                        :
                                        <button className="bg-emerald-500 text-white active:bg-emerald-600 text-sm px-4 py-2 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" type="button"> <Spinner animation="border" size="sm"></Spinner></button>
                                    }
                                </div>
                            </div>
                        </div>

                        <div className="mt-3 bg-white dark:bg-slate-800 shadow-lg rounded-sm border border-slate-200 dark:border-slate-700 relative py-4">
                            <header className="sm:flex sm:justify-between sm:items-center p-3">
                                <h2 className="font-semibold text-slate-800 dark:text-slate-100">{t("Dymo Printer Settings")}</h2>
                            </header>
                            <div>
                                <div className="sm:flex sm:justify-between sm:items-center px-3">
                                    <div className='sm:flex sm:justify-start'>
                                        <div>
                                            <input type="text" name="host" onChange={(e) => setSettingdata({ ...settingData, [e.target.name]: e.target.value })} value={settingData?.host} placeholder="Enter Host" className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" />
                                            <p className='text-muted-class'>Exp : 127.0.0.1</p>
                                        </div>
                                        <div className='ml-3'>
                                            <input type="text" name="port" onChange={(e) => setSettingdata({ ...settingData, [e.target.name]: e.target.value })} value={settingData?.port} placeholder="Enter Port" className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" />
                                        </div>
                                    </div>
                                    <div>
                                        {!isUpdate ?
                                            <button className="bg-emerald-500 text-white active:bg-emerald-600 text-sm px-4 py-2 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" type="button" onClick={updateDymoSetting} > {t("Update")}</button>
                                            :
                                            <button className="bg-emerald-500 text-white active:bg-emerald-600 text-sm px-4 py-2 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" type="button"> <Spinner animation="border" size="sm"></Spinner></button>
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="mt-3 bg-white dark:bg-slate-800 shadow-lg rounded-sm border border-slate-200 dark:border-slate-700 relative py-4">
                            <header className="sm:flex sm:justify-between sm:items-center p-3">
                                <button onClick={downloadImage} className="bg-emerald-500 text-white active:bg-emerald-600 text-sm px-4 py-2 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150">{t("Download Inventory Report")}</button>
                                <button onClick={exportToCSV} className="bg-emerald-500 text-white active:bg-emerald-600 text-sm px-4 py-2 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150">{t("Export Report")}</button>
                            </header>

                        </div>
                    </div>
                </main>
            </div>
            <Toaster />
        </div>
    );
}

export default Setting;