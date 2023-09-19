import React, { useEffect, useState, useRef } from "react";
import axios from '../../../api/axios';
import { UPDATE_PRODUCTS } from '../../../api/apiUrl';
import toast, { Toaster } from 'react-hot-toast';
import { Spinner } from "reactstrap";
import Image from '../../../images/default_product.png';
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import SelectSearch from 'react-select-search';
import 'react-select-search/style.css'
import parse from 'html-react-parser';
import Barcode from 'react-barcode';
import QRCode from "react-qr-code";
import { useTranslation } from "react-i18next";

export default function Modal({ showModal, setShowModal, getProducts, subCategories, categories, measurement, productData }) {
    let { admin, token } = JSON.parse(sessionStorage.getItem('userDetails'));
    const { t } = useTranslation();
    const [Products, setProducts] = useState({ id: '', title: '', description: '', quantity: '', size: '', price: '', image: '', category_id: '', subcategory_id: '', measurement_id: '' });
    const [isSave, setIsSave] = useState(false);
    const [subCats, setSubCats] = useState(null);
    const [size, setSize] = useState(null);
    const fileInputRef = useRef(null);
    const [optionCategory, setOptionCategory] = useState(null);


    const updateProduct = async () => {
        if (!Products.title) { toast.error('Enter product title'); return }
        if (!Products.quantity) { toast.error('Enter product quantity'); return }
        if (!Products.price) { toast.error('Enter product price'); return }
        if (!Products.category_id) { toast.error('Select product category'); return }

        const formdata = new FormData();
        formdata.append("category_id", Products.category_id);
        formdata.append("subcategory_id", Products.subcategory_id);
        formdata.append("measurement_id", Products.measurement_id);
        formdata.append("title", Products.title);
        formdata.append("description", Products.description);
        formdata.append("quantity", Products.quantity);
        formdata.append("price", Products.price);
        formdata.append("image", Products.image);
        formdata.append("id", Products.id);
        setIsSave(true);
        try {
            const response = await axios.post(UPDATE_PRODUCTS, formdata, { headers: { "Authorization": "Bearer " + token } });
            toast.success('successfully Updated!');
            setShowModal(false);
            getProducts();
            setIsSave(false);
            setProducts(null);
        } catch (error) {
            setIsSave(false);
            toast.error(error.response.data);
        }
    }

    const handleCats = () => {
        let cat = [];
        subCategories?.map(item => {
            if (Products?.category_id == item.category_id._id) {
                cat.push({ name: item.name, value: item._id });
            }
        });
        setSubCats(cat);
    }

    const handleSize = () => {
        let siz = [];
        measurement?.map(item => {
            if (Products?.subcategory_id == item.subcategory_id._id) {
                siz.push({ name: item.size, value: item._id });
            }
        });
        setSize(siz);
    }

    useEffect(() => {
        handleCats();
    }, [Products?.category_id])

    useEffect(() => {
        handleSize();
    }, [Products?.subcategory_id])

    const handleButtonClick = () => {
        fileInputRef.current.click();
    };

    useEffect(() => {
        let op = [];
        categories?.forEach((element, i) => {
            op[i] = { name: element.name, value: element._id };
        });
        setOptionCategory(op);
    }, [categories])

    useEffect(() => {
        setProducts({
            id: productData?._id,
            title: productData?.title,
            description: productData?.description,
            quantity: productData?.quantity,
            price: productData?.price,
            image: '',
            category_id: productData?.category[0]?._id,
            subcategory_id: productData?.subcategory[0]?._id ? productData?.subcategory[0]?._id : '',
            measurement_id: productData?.measurement[0]?._id ? productData?.measurement[0]?._id : '',
        });
    }, [productData]);


    return (
        <>
            {showModal ? (
                <>
                    <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none" >
                        <div className="relative w-auto my-6 mx-auto max-w-3xl">
                            <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none width-modal">
                                <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                                    <div>
                                        <p className="text-xl font-semibold">{productData?.title}</p>
                                    </div>
                                    <div>
                                        <h5 className="font-semibold text-center mt-1">{t('Product Id')} : {productData?.barcode}</h5>
                                    </div>
                                </div>
                                <div className="relative p-3 flex-auto modal-contant-width">
                                    <div className="sm:flex sm:justify-start px-3 pb-5">
                                        <div className="pro-img-width2-Box sm:flex sm:justify-center">
                                            <div className="text-center">
                                                {productData?.image ?
                                                    <img className="pro-img-width" src={productData?.image} alt="Product Image" />
                                                    :
                                                    <img className="pro-img-width2" src={Image} alt="Product Image" />
                                                }
                                               {productData?.barcode && <div className="pt-2 barcode-Div text-center">
                                                    <QRCode 
                                                        value={productData.barcode.toString()+'\n'+productData.title}
                                                    />
                                                </div>}
                                            </div>
                                        </div>
                                        <div className="px-2">
                                            <div className="ck-editer-contant-view">
                                                {productData?.description && parse(productData?.description)}
                                            </div>
                                            <div className="">
                                                <table>
                                                    <tr>
                                                        <td><p className="mt-2 font-semibold">{t("Quantity")}</p></td>
                                                        <td className="pl-3"><p className="mt-2"> {productData?.quantity}</p></td>
                                                    </tr>
                                                    <tr>
                                                        <td><p className="mt-2 font-semibold">{t("Price")}($)</p></td>
                                                        <td className="pl-3"><p className="mt-2"> {productData?.price}</p></td>
                                                    </tr>
                                                    <tr>
                                                        <td><p className="mt-2 font-semibold">{t("Category")}</p></td>
                                                        <td className="pl-3"><p className="mt-2"> {productData?.category[0]?.name}</p></td>
                                                    </tr>
                                                    <tr>
                                                        <td><p className="mt-2 font-semibold">{t("Subcategory")}</p></td>
                                                        <td className="pl-3"><p className="mt-2"> {productData?.subcategory[0]?.name ? productData?.subcategory[0]?.name : 'None'}</p></td>
                                                    </tr>
                                                    <tr>
                                                        <td><p className="mt-2 font-semibold">{t("Size")}</p></td>
                                                        <td className="pl-3"><p className="mt-2"> {productData?.measurement[0]?.size ? productData?.measurement[0]?.size : 'None'}</p></td>
                                                    </tr>
                                                </table>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex items-center justify-end p-1 border-t border-solid border-slate-200 rounded-b">
                                    <button type="button" onClick={() => setShowModal(false)} className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"> {t("Close")} </button>
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