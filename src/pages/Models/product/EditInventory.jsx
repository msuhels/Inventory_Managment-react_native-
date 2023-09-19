import React, { useEffect, useState } from "react";
import axios from '../../../api/axios';
import { UPDATE_INVENTORY } from '../../../api/apiUrl';
import toast, { Toaster } from 'react-hot-toast';
import { Spinner } from "reactstrap";
import SelectSearch from 'react-select-search';
import QrScanner from './QrScanner';
import { useTranslation } from "react-i18next";

export default function Modal({ showModal, setShowModal, allProducts, getProducts }) {
    let { admin, token } = JSON.parse(sessionStorage.getItem('userDetails'));
    const { t } = useTranslation();
    const [Inventory, setInventory] = useState({ barcode: '', quantity:'' });
    const [isSave, setIsSave] = useState(false);
    const [ProductOption, setProductOption] = useState([{ name: 'None', value: '' }]);


    const updateInventory = async (event) => {
        event.preventDefault();
        setIsSave(true);
        try {
            const response = await axios.post(UPDATE_INVENTORY, Inventory, { headers: { "Authorization": "Bearer " + token } });
            toast.success('successfully Added!');
            setShowModal(false);
            setIsSave(false);
            setInventory({ barcode: '', quantity:'' });
            getProducts();
        } catch (error) {
            setIsSave(false);
            toast.error(error.response.data.msg);
        }
    }

    const handleProducts = () => {
        let option = [{ name: 'None', value: '' }];
        allProducts?.map(item=>{
            option.push({ name: item.title, value:item.barcode });
        });
        setProductOption(option);
    }

    useEffect(()=>{
        if(allProducts?.length > 0){
            handleProducts();
        }
    },[allProducts])
    return (
        <>
            {showModal ? (
                <>
                    <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none" >
                        <div className="relative w-auto my-6 mx-auto max-w-3xl">
                            <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                            <form onSubmit={updateInventory}>
                                <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                                    <h3 className="text-3xl font-semibold text-center"> {t("Stock")}</h3>
                                </div>
                                <div className="relative p-6 flex-auto">
                                    <div className="py-1">
                                        <QrScanner setInventory={setInventory} Inventory={Inventory} t={t}/>
                                    </div>
                                    <div className="py-1">
                                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                                            {t("Product Id")}
                                        </label>
                                        <input type="number" name="barcode" onChange={(e) => setInventory({ ...Inventory, [e.target.name]: e.target.value })} value={Inventory?.barcode} placeholder="Enter product id" className="appearance-none block w-full text-gray-700 border border-gray-200 rounded py-2 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 width-input-400" required />
                                    </div>
                                    <div className="select-box-dev2">
                                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                                                {t("Product")}
                                            </label>
                                            <SelectSearch
                                                search={true}
                                                options={ProductOption}
                                                value={Inventory?.barcode}
                                                placeholder="Choose product"
                                                onChange={(value) => {setInventory({ ...Inventory, ['barcode']: value });}}
                                            />
                                        </div>
                               
                                    <div className="pt-4">
                                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                                            {t("Quantity")}
                                        </label>
                                        <input type="text" name="quantity" onChange={(e) => setInventory({ ...Inventory, [e.target.name]: e.target.value })} value={Inventory?.name} placeholder="Enter quantity" className="appearance-none block w-full text-gray-700 border border-gray-200 rounded py-2 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 width-input-400" required />
                                    </div>

                                </div>
                                <div className="flex items-center justify-end p-1 border-t border-solid border-slate-200 rounded-b">
                                    <button type="button" onClick={() => setShowModal(false)} className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"> {t("Close")} </button>
                                    {!isSave ?
                                        <button className="bg-emerald-500 text-white active:bg-emerald-600 text-sm px-4 py-2 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" type="submit" > {t("ADD")}</button>
                                        :
                                        <button className="bg-emerald-500 text-white active:bg-emerald-600 text-sm px-4 py-2 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" type="button"> <Spinner animation="border" size="sm"></Spinner></button>
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