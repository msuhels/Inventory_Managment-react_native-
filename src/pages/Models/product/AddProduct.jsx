import React, { useEffect, useState, useRef } from "react";
import axios from '../../../api/axios';
import { ADD_PRODUCTS, UPLOAD_IMAGE_ON_CLOUD } from '../../../api/apiUrl';
import toast, { Toaster } from 'react-hot-toast';
import { Spinner } from "reactstrap";
import Image from '../../../images/default_product.png';
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import SelectSearch from 'react-select-search';
import 'react-select-search/style.css';
import LOADER from '../../../images/loader.gif';
import { useTranslation } from "react-i18next";

export default function Modal({ showModal, setShowModal, getProducts, subCategories, categories, measurement }) {
    let { admin, token } = JSON.parse(sessionStorage.getItem('userDetails'));
    const [Products, setProducts] = useState({ title: '', description: '', quantity: '', size: '', price: '', image: '', category_id: '', subcategory_id: '', measurement_id: '' });
    const [isSave, setIsSave] = useState(false);
    const [subCats, setSubCats] = useState(null);
    const [size, setSize] = useState(null);
    const [showimg, setShowimg] = useState("");
    const fileInputRef = useRef(null);
    const [optionCategory, setOptionCategory] = useState(null);
    const [isUpload, setIsUpload] = useState(false);
    const divRef = useRef(null);
    const { t } = useTranslation();

    const addProduct = async () => {
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
        formdata.append("size", Products.size);
        formdata.append("price", Products.price);
        formdata.append("image", Products.image);
        setIsSave(true);
        try {
            const response = await axios.post(ADD_PRODUCTS, formdata, { headers: { "Authorization": "Bearer " + token } });
            toast.success('successfully Added!');
            setShowModal(false);
            getProducts();
            setIsSave(false);
            setProducts({ title: '', description: '', quantity: '', size: '', price: '', image: '', category_id: '', subcategory_id: '', measurement_id: '', image_file_name: '' });
        } catch (error) {
            setIsSave(false);
            toast.error(error.response.data.msg);
        }
    }

    const handleCats = () => {
        let cat = [{ name: 'None', value: '' }];
        subCategories?.map(item => {
            if (Products?.category_id == item.category_id._id) {
                cat.push({ name: item.name, value: item._id });
            }
        });
        setSubCats(cat);
    }

    const handleSize = () => {
        let siz = [{ name: 'None', value: '' }];
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

    const uploadImaigeOnCloud = async (e) => {
        setIsUpload(true);
        const formdata = new FormData();
        formdata.append("file", e.target.files[0]);
        try {
            const response = await axios.post(UPLOAD_IMAGE_ON_CLOUD, formdata, { headers: { "Authorization": "Bearer " + token } });
            let rec = response.data.data;
            let pro = { ...Products };
            pro.image = rec.url;
            pro.image_file_name = rec.filename;
            setProducts(pro);
            setIsUpload(false);
        } catch (error) {
            setIsUpload(false);
            toast.error(error.response.data.msg);
        }
    }

    const scrollupFun = () =>{
        divRef.current.scrollTo({ top: 10000, behavior: 'smooth' });
    }

    useEffect(() => {
        let op = [];
        categories?.forEach((item, i) => {
            op.push({ name: item.name, value: item._id });
        });
        setOptionCategory(op);
    }, [categories])

    return (
        <>
            {showModal ? (
                <>
                    <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none" >
                        <div className="relative w-auto my-6 mx-auto max-w-3xl">
                            <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none width-modal">
                                <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                                    <h3 className="text-xl font-semibold text-center"> {t("Add Products")}</h3>
                                </div>
                                <div className="relative p-3 flex-auto modal-contant-width" ref={divRef}>
                                    <div className="sm:flex sm:justify-between sm:items-center px-3 pb-5">
                                        <div className="text-center">
                                            <div className="sm:flex sm:justify-center sm:items-center img-Box-width">
                                                {!isUpload ?
                                                    <>{Products?.image ?
                                                        <img className="pro-img-width" src={Products?.image} alt="Product Image" />
                                                        :
                                                        <img className="pro-img-width2" src={Image} alt="Product Image" />
                                                    }
                                                    </>
                                                    :
                                                    <div className="sm:flex sm:justify-center p-5">
                                                        <img src={LOADER} className="loader-gif" />
                                                    </div>}
                                            </div>
                                            <input
                                                type="file"
                                                name="image"
                                                ref={fileInputRef}
                                                style={{ display: 'none' }}
                                                onChange={(e) => { uploadImaigeOnCloud(e) }}
                                            />
                                            <button className="btn-sm bg-indigo-500 hover:bg-indigo-600 text-white mt-2" onClick={handleButtonClick}>{t("Upload Image")}</button>
                                        </div>
                                        <div className="px-2">
                                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                                                {t("Title")} <span className="text-danger">*</span>
                                            </label>
                                            <input type="text" name="title" onChange={(e) => setProducts({ ...Products, [e.target.name]: e.target.value })} value={Products?.title} placeholder="Enter Title" className="appearance-none block w-full  text-gray-700 border border-gray-200 rounded py-2 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" />

                                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                                                {t("Description")}
                                            </label>
                                            <div className="ckeditor-class" >
                                                <CKEditor
                                                    editor={ClassicEditor}
                                                    config={{
                                                        removePlugins: ["EasyImage", "ImageUpload", "MediaEmbed"]
                                                    }}
                                                    data={Products?.description ? Products?.description : ''}
                                                    onChange={(event, editor) => {
                                                        const data = editor.getData();
                                                        setProducts({ ...Products, ['description']: data })
                                                    }}
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="sm:flex sm:justify-between sm:items-center px-3" onClick={scrollupFun}>
                                        <div className="px-2">
                                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                                                {t("Quantity")} <span className="text-danger">*</span>
                                            </label>
                                            <input type="number" name="quantity" onChange={(e) => setProducts({ ...Products, [e.target.name]: e.target.value })} value={Products?.quantity} placeholder="Enter Quantity" className="appearance-none block w-full  text-gray-700 border border-gray-200 rounded py-2 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 width-input-100" />
                                        </div>
                                        <div className="px-2">
                                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                                                {t("Price")} <span className="text-danger">*</span>
                                            </label>
                                            <input type="number" name="price" onChange={(e) => setProducts({ ...Products, [e.target.name]: e.target.value })} value={Products?.price} placeholder="Enter Price" className="appearance-none block w-full  text-gray-700 border border-gray-200 rounded py-2 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 width-input-100" />
                                        </div>
                                        <div className="px-2 select-box-dev">
                                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                                                {t("Category")} <span className="text-danger">*</span>
                                            </label>
                                            <SelectSearch
                                                search={true}
                                                options={optionCategory}
                                                value={Products?.category_id}
                                                name="language"
                                                placeholder="Choose Category"
                                                onChange={(value) => {setProducts({ ...Products, ['category_id']: value });}}
                                                
                                            />
                                        </div>
                                        <div className="px-2 select-box-dev">
                                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                                                {t("Subcategory")}
                                            </label>
                                            <SelectSearch
                                                search={true}
                                                options={subCats}
                                                value={Products?.subcategory_id}
                                                name="language"
                                                placeholder="Choose Subcategory"
                                                onChange={(value) => setProducts({ ...Products, ['subcategory_id']: value })}
                                            />
                                        </div>
                                        <div className="px-2 select-box-dev">
                                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                                                {t("Size")}
                                            </label>
                                            <SelectSearch
                                                search={true}
                                                options={size}
                                                value={Products?.measurement_id}
                                                name="language"
                                                placeholder="Choose Size"
                                                onChange={(value) => setProducts({ ...Products, ['measurement_id']: value })}
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="flex items-center justify-end p-1 border-t border-solid border-slate-200 rounded-b">
                                    <button type="button" onClick={() => setShowModal(false)} className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"> {t("Close")} </button>
                                    {!isSave ?
                                        <button className="bg-emerald-500 text-white active:bg-emerald-600 text-sm px-4 py-2 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" type="button" onClick={addProduct} > {t("ADD")}</button>
                                        :
                                        <button className="bg-emerald-500 text-white active:bg-emerald-600 text-sm px-4 py-2 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" type="button"> <Spinner animation="border" size="sm"></Spinner></button>
                                    }
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