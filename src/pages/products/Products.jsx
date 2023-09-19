import React, { useEffect, useState } from 'react';

import Sidebar from '../../partials/Sidebar';
import Header from '../../partials/Header';
import PaginationClassic from '../../components/PaginationClassic';
import AddProductPopup from "../Models/product/AddProduct";
import UpdateProductPopup from "../Models/product/UpdateProduct";
import DeleteProduct from "../Models/product/DeleteProduct";
import ViewProduct from "../Models/product/ViewProduct";
import EditInventory from "../Models/product/EditInventory";
import PrintBarcode from "../Models/product/PrintBarcode";
import Confermation from "../../components/Confermation";
import Moment from 'moment';
import toast, { Toaster } from 'react-hot-toast';
import axios from '../../api/axios';
import Logo from '../../logo.png';
import {
    GET_ALL_CATEGORIES,
    GET_ALL_SUBCATEGORIES,
    GET_ALL_ARCHIVE_PRODUCTS_BY_PAGINATION,
    DELETE_PRODUCTS,
    REMOVE_PRODUCTS,
    GET_ALL_PRODUCTS_BY_PAGINATION,
    REVERT_TO_ACTIVE_PRODUCTS,
    GET_ALL_MEASUREMENT,
    GET_ALL_PRODUCTS,
    PRINT_TO_DYMO
} from '../../api/apiUrl';
import LOADER from '../../images/loader.gif';
import { Link } from 'react-router-dom';
import ProductsIcon from '../../images/newImage/Products.png';
import Barcode from 'react-barcode';
import QRCode from "react-qr-code";
import { printLabel, useDymoOpenLabel, useDymoCheckService } from "react-dymo-hooks";

import viewIcon from '../../images/newImage/btnicon/view.png';
import editIcon from '../../images/newImage/btnicon/edit.png';
import archiveIcon from '../../images/newImage/btnicon/archive.png';
import qrIcon from '../../images/newImage/btnicon/qr.png';
import deleteIcon from '../../images/newImage/btnicon/delete.png';

import html2canvas from "html2canvas";
import {useSearchParams} from "react-router-dom";
import { useTranslation } from "react-i18next";

function Products() {
    let { admin, token } = JSON.parse(sessionStorage.getItem('userDetails'));
    const { t } = useTranslation();
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [showAddModal, setShowAddModal] = useState(false);
    const [categories, setCategories] = useState(null);
    const [productData, setProductData] = useState(null);
    const [showUpdateModal, setShowUpdateModal] = useState(false);
    const [showViewModal, setShowViewModal] = useState(false);
    const [showConfermation, setShowConfermation] = useState(false);
    const [showConfermationActive, setShowConfermationActive] = useState(false);
    const [deletedId, setDeletedId] = useState(null);
    const [activeProductId, setActiveProductId] = useState(null);
    const [isDelete, setIsDelete] = useState(false);
    const [pageNum, setPageNum] = useState(1);
    const [search, setSearch] = useState('');
    const [subCategories, setSubCategories] = useState(null);
    const [measurement, setMeasurement] = useState(null);
    const [products, setProducts] = useState(null);
    const [isFetch, setIsFetch] = useState(false);
    const [sorting, setSorting] = useState({ column: 'barcode', order: 'ASC' });
    const [searchBycolumn, setSearchBycolumn] = useState(null);
    const [note, setNote] = useState('');
    const [activeTab, setActiveTab] = useState('Active');
    const [isActive, setIsActive] = useState(false);
    const [isPrinter, setIsPrinter] = useState(null);
    const [showInventoryModal, setShowInventoryModal] = useState(false);
    const [showBarcodeModal, setShowBarcodeModal] = useState(false);
    const [productid, setPrintProductid] = useState(null);
    const [productName, setPrintProductName] = useState(null);
    const [printQty, setPrintQty] = useState(1);
    const [allProducts, setAllProducts] = useState(null);
    const [deleteProductsConfermation, setDeleteProductsConfermation] = useState(false);
    const [searchParams,setSearchParam] = useSearchParams();


    const getProd = async () => {
        try {
            const response = await axios.get(GET_ALL_PRODUCTS, { headers: { "Authorization": "Bearer " + token } });
            setAllProducts(response.data.result);
        } catch (error) {
            console.log(error);
        }
    }

    const getProducts = async () => {
        try {
            let URL = GET_ALL_PRODUCTS_BY_PAGINATION(pageNum, search, sorting.column, sorting.order, JSON.stringify(searchBycolumn));
            if (activeTab == 'Archive') {
                URL = GET_ALL_ARCHIVE_PRODUCTS_BY_PAGINATION(pageNum, search, sorting.column, sorting.order, JSON.stringify(searchBycolumn));
            }
            const response = await axios.get(URL, { headers: { "Authorization": "Bearer " + token } });
            setProducts(response.data);
            setIsFetch(true);
        } catch (error) {
            console.log(error);
        }
    }

    const updateProduct = (cat) => {
        setProductData(cat);
        setTimeout(function () { setShowUpdateModal(true); }, 500);
    }

    const viewProduct = (cat) => {
        setProductData(cat);
        setTimeout(function () { setShowViewModal(true); }, 500);
    }

    const remove = (item) => {
        setShowConfermation(true);
        setProductData(item);
        setDeletedId(item._id);
    }

    const removeProduct = async () => {
        setIsDelete(true);
        try {
            let URL = DELETE_PRODUCTS(deletedId, note);
            const response = await axios.delete(URL, { headers: { "Authorization": "Bearer " + token } });
            getProducts();
            setShowConfermation(false);
            toast.success('successfully deleted!');
            setIsDelete(false);
        } catch (error) {
            toast.error(error.response.data.msg);
            setIsDelete(false);
        }
    }

    const activeProduct = async (product) => {
        setShowConfermationActive(true);
        setActiveProductId(product._id);
    }

    const revertToactiveProduct = async () => {
        setIsActive(true);
        try {
            let URL = REVERT_TO_ACTIVE_PRODUCTS(activeProductId);
            const response = await axios.get(URL, { headers: { "Authorization": "Bearer " + token } });
            getProducts();
            setShowConfermationActive(false);
            toast.success('successfully revert to active list!');
            setIsActive(false);
        } catch (error) {
            toast.error(error.response.data.msg);
            setIsActive(false);
        }
    }


    const getCategories = async () => {
        try {
            const response = await axios.get(GET_ALL_CATEGORIES, { headers: { "Authorization": "Bearer " + token } });
            setCategories(response.data);
        } catch (error) {
            console.log(error);
        }
    }

    const getSubCategories = async () => {
        try {
            const response = await axios.get(PRINT_TO_DYMO, { headers: { "Authorization": "Bearer " + token } });
            setSubCategories(response.data);
        } catch (error) {
            console.log(error);
        }
    }

    const getMeasurement = async () => {
        try {
            const response = await axios.get(GET_ALL_MEASUREMENT, { headers: { "Authorization": "Bearer " + token } });
            setMeasurement(response.data);
        } catch (error) {
            console.log(error);
        }
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

    useEffect(() => {
        getProducts();
    }, [pageNum, search, sorting, searchBycolumn, activeTab]);

    useEffect(() => {
        getMeasurement();
        getSubCategories();
        getCategories();
        getProd();
    }, []);


    const printOnDymoPrinter = async (id) => {
        setIsPrinter(true);
        const printableContent = document.getElementById("barcode-id" + productid);
        console.log(printableContent.innerHTML);
        try {
            // const response = await printLabel('DYMO LabelWriter 450', printableContent.innerHTML);
            const response = await axios.get(PRINT_TO_DYMO+'?html='+printableContent.innerHTML, { headers: { "Authorization": "Bearer " + token } });
            setIsPrinter(false);
            setShowBarcodeModal(false);
        } catch (error) {
            toast.error('Dymo printer not connected!');
            setIsPrinter(false);
            setShowBarcodeModal(false);
        }
    };

    const printContent = async () => {
        setShowBarcodeModal(false);
        const printableContent = document.getElementById("barcode-id" + productid);
        const printWindow = window.open("", "", "height=1000,width=1000");
        printWindow.document.write(printableContent.innerHTML);
        printWindow.print();
        setIsPrinter(false);
    };

    const deleteProduct = async() => {
        setIsDelete(true);
        try {
            let URL = REMOVE_PRODUCTS(deletedId);
            const response = await axios.delete(URL, { headers: { "Authorization": "Bearer " + token } });
            getProducts();
            setDeleteProductsConfermation(false);
            toast.success('successfully deleted!');
            setIsDelete(false);
        } catch (error) {
            toast.error(error.response.data.msg);
            setIsDelete(false);
        }
    }

    useEffect(()=>{
        if(searchParams.get('action') == 'add'){
          setShowAddModal(true);
        }
      },[]);


    return (
        <div className="flex h-[100dvh] overflow-hidden">
            <PrintBarcode
                showModal={showBarcodeModal}
                setShowModal={setShowBarcodeModal}
                printContent={printContent}
                printOnDymoPrinter={printOnDymoPrinter}
                printQty={printQty}
                setPrintQty={setPrintQty}
                isPrinter={isPrinter}
                productName={productName}
                productid={productid}
            />

            <EditInventory
                showModal={showInventoryModal}
                setShowModal={setShowInventoryModal}
                allProducts={allProducts}
                getProducts={getProducts}
            />

            <AddProductPopup
                showModal={showAddModal}
                setShowModal={setShowAddModal}
                getProducts={getProducts}
                categories={categories}
                subCategories={subCategories}
                measurement={measurement} />

            <UpdateProductPopup
                showModal={showUpdateModal}
                setShowModal={setShowUpdateModal}
                getProducts={getProducts} categories={categories}
                subCategories={subCategories}
                measurement={measurement}
                productData={productData}
            />

            <ViewProduct
                showModal={showViewModal}
                setShowModal={setShowViewModal}
                getProducts={getProducts} categories={categories}
                subCategories={subCategories}
                measurement={measurement}
                productData={productData}
            />

            <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
            <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
                <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
                <main className="grow">
                    <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">
                        <div className="sm:flex sm:justify-between sm:items-center mb-8">
                            <div className="mb-4 sm:mb-0 sm:flex sm:justify-start sm:items-start mb-8 display-inline-flex">
                                <h1 className="text-2xl md:text-3xl text-slate-800 dark:text-slate-100 font-bold">{t("Products")}</h1>
                                <img className='my-1 mx-3' src={ProductsIcon} width="35px" />
                            </div>
                            <div className="grid grid-flow-col sm:auto-cols-max justify-start sm:justify-end gap-2">
                                <button className="btn bg-indigo-500 hover:bg-indigo-600 text-white" onClick={() => setShowInventoryModal(true)}>
                                    <svg className="w-4 h-4 fill-current opacity-50 shrink-0" viewBox="0 0 16 16">
                                        {/* <path d="M15 7H9V1c0-.6-.4-1-1-1S7 .4 7 1v6H1c-.6 0-1 .4-1 1s.4 1 1 1h6v6c0 .6.4 1 1 1s1-.4 1-1V9h6c.6 0 1-.4 1-1s-.4-1-1-1z" /> */}
                                        <path d="M2 8a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11A.5.5 0 0 1 2 8Z" />
                                    </svg>
                                    <span className="xs:block ml-2">{t("Stock Out")}</span>
                                </button>

                                <button className="btn bg-indigo-500 hover:bg-indigo-600 text-white" onClick={() => setShowAddModal(true)}>
                                    <svg className="w-4 h-4 fill-current opacity-50 shrink-0" viewBox="0 0 16 16">
                                        <path d="M15 7H9V1c0-.6-.4-1-1-1S7 .4 7 1v6H1c-.6 0-1 .4-1 1s.4 1 1 1h6v6c0 .6.4 1 1 1s1-.4 1-1V9h6c.6 0 1-.4 1-1s-.4-1-1-1z" />
                                    </svg>
                                    <span className="xs:block ml-2">{t("Add Products")}</span>
                                </button>
                            </div>
                        </div>
                        <div>
                            <div className='sm:flex sm:justify-start sm:items-center tab-div'>
                                <div onClick={() => { setActiveTab('Active'); setIsFetch(false); }} className={`px-5 py-2 border bg-white cursor-pointer ${activeTab == 'Active' ? 'active-tab' : ''}`}>
                                    {t("Active")}
                                </div>
                                <div onClick={() => { setActiveTab('Archive'); setIsFetch(false); }} className={`px-5 py-2 border bg-white cursor-pointer ${activeTab == 'Archive' ? 'active-tab' : ''}`}>
                                    {t("Archive")}
                                </div>
                            </div>
                        </div>
                        <div className="bg-white dark:bg-slate-800 shadow-lg rounded-sm border border-slate-200 dark:border-slate-700 relative">

                            <header className="sm:flex sm:justify-between sm:items-center p-3">
                                <h2 className="font-semibold text-slate-800 dark:text-slate-100">{t("All Product")}</h2>
                                <div>
                                    <label className="form-label">{t("Search")} :</label>
                                    <input className='form-control border border-secondary ml-2 p-1 rounded-md' value={search} onChange={(e) => setSearch(e.target.value)} />
                                </div>
                            </header>
                            <div>

                                <div className="overflow-x-auto">
                                    <table className="table-auto w-full dark:text-slate-300">
                                        <thead className="text-xs font-semibold uppercase text-slate-500 dark:text-slate-400 bg-slate-50 dark:bg-slate-900/20 border-t border-b border-slate-200 dark:border-slate-700">
                                            <tr className='table-heading tbl-tr-head-mobile'>
                                                <th className="py-3 cursor-pointer tbl-head-mobile" style={{ width: "11%" }}>
                                                    <div className="cursor-pointer" onClick={() => handleSorting('barcode')}>{t("Product Id")}
                                                        <span className={`${(sorting.column == 'barcode' && sorting.order == 'ASC') ? 'active-arrow' : ''}`}>↑</span>
                                                        <span className={`arrow-margin ${(sorting.column == 'barcode' && sorting.order == 'DESC') ? 'active-arrow' : ''}`}>↓</span>
                                                    </div>
                                                </th>
                                                <th className="cursor-pointer tbl-head-mobile" style={{ width: "18%" }}>
                                                    <div className="cursor-pointer" onClick={() => handleSorting('title')}>{t("Title")}
                                                        <span className={`${(sorting.column == 'title' && sorting.order == 'ASC') ? 'active-arrow' : ''}`}>↑</span>
                                                        <span className={`arrow-margin ${(sorting.column == 'title' && sorting.order == 'DESC') ? 'active-arrow' : ''}`}>↓</span>
                                                    </div>
                                                </th>
                                                <th className="cursor-pointer tbl-head-mobile" style={{ width: "10%" }}>
                                                    <div className="cursor-pointer" onClick={() => handleSorting('price')}>{t("Price")}($)
                                                        <span className={`${(sorting.column == 'price' && sorting.order == 'ASC') ? 'active-arrow' : ''}`}>↑</span>
                                                        <span className={`arrow-margin ${(sorting.column == 'price' && sorting.order == 'DESC') ? 'active-arrow' : ''}`}>↓</span>
                                                    </div>
                                                </th>
                                                <th className="cursor-pointer tbl-head-mobile" style={{ width: "10%" }}>
                                                    <div className="cursor-pointer" onClick={() => handleSorting('quantity')}>{t("Quantity")}
                                                        <span className={`${(sorting.column == 'quantity' && sorting.order == 'ASC') ? 'active-arrow' : ''}`}>↑</span>
                                                        <span className={`arrow-margin ${(sorting.column == 'quantity' && sorting.order == 'DESC') ? 'active-arrow' : ''}`}>↓</span>
                                                    </div>
                                                </th>
                                                <th className="cursor-pointer tbl-head-mobile" style={{ width: "10%" }}>
                                                    <div className="cursor-pointer" onClick={() => handleSorting('category.name')}>{t("Category")}
                                                        <span className={`${(sorting.column == 'category.name' && sorting.order == 'ASC') ? 'active-arrow' : ''}`}>↑</span>
                                                        <span className={`arrow-margin ${(sorting.column == 'category.name' && sorting.order == 'DESC') ? 'active-arrow' : ''}`}>↓</span>
                                                    </div>
                                                </th>
                                                <th className="cursor-pointer tbl-head-mobile" style={{ width: "10%" }}>
                                                    <div className="cursor-pointer" onClick={() => handleSorting('subcategory.name')}>{t("Subcategory")}
                                                        <span className={`${(sorting.column == 'subcategory.name' && sorting.order == 'ASC') ? 'active-arrow' : ''}`}>↑</span>
                                                        <span className={`arrow-margin ${(sorting.column == 'subcategory.name' && sorting.order == 'DESC') ? 'active-arrow' : ''}`}>↓</span>
                                                    </div>
                                                </th>
                                                <th className="cursor-pointer tbl-head-mobile" style={{ width: "8%" }}>
                                                    <div className="cursor-pointer" onClick={() => handleSorting('measurement.size')}>{t("Size")}
                                                        <span className={`${(sorting.column == 'measurement.size' && sorting.order == 'ASC') ? 'active-arrow' : ''}`}>↑</span>
                                                        <span className={`arrow-margin ${(sorting.column == 'measurement.size' && sorting.order == 'DESC') ? 'active-arrow' : ''}`}>↓</span>
                                                    </div>
                                                </th>
                                                <th className="cursor-pointer tbl-head-mobile" style={{ width: "20%" }}>
                                                    <div className="cursor-pointer">{t("Actions")}</div>
                                                </th>
                                            </tr>
                                        </thead>
                                        <tr className="border border-bottom bg-tr-table">
                                            <th className="py-1 ">
                                                <div>
                                                    <input type="text" onChange={(e) => handleSearching(e)} name="barcode" placeholder={t("Product Id")} className="block w-full rounded border-gray-200 p-1 py-0 mx-1 font-size-weight text-center" />
                                                </div>
                                            </th>
                                            <th className="">
                                                <div>
                                                    <input type="text" onChange={(e) => handleSearching(e)} name="title" placeholder={t("Title")} className="block w-full rounded border-gray-200 p-1 py-0 mx-1 font-size-weight text-center" />
                                                </div>
                                            </th>
                                            <th className="">
                                                <div>
                                                    <input type="text" onChange={(e) => handleSearching(e)} name="price" placeholder={t("Price")} className="block w-full rounded border-gray-200 p-1 py-0 mx-1 font-size-weight text-center" />
                                                </div>
                                            </th>
                                            <th className="">
                                                <div>
                                                    <input type="text" onChange={(e) => handleSearching(e)} name="quantity" placeholder={t("Quantity")} className="block w-full rounded  border-gray-200 p-1 py-0 mx-1 font-size-weight text-center" />
                                                </div>
                                            </th>
                                            <th className="">
                                                <div>
                                                    <input type="text" onChange={(e) => handleSearching(e)} name="category.name" placeholder={t("Category")} className="block w-full rounded border-gray-200 p-1 py-0 mx-1 font-size-weight text-center" />
                                                </div>
                                            </th>
                                            <th className="">
                                                <div>
                                                    <input type="text" onChange={(e) => handleSearching(e)} name="subcategory.name" placeholder={t("Subcategory")} className="block w-full rounded border-gray-200 p-1 py-0 mx-1 font-size-weight text-center" />
                                                </div>
                                            </th>
                                            <th className="">
                                                <div>
                                                    <input type="text" onChange={(e) => handleSearching(e)} name="measurement.size" placeholder={t("Size")} className="block w-full rounded border-gray-200 p-1 py-0 mx-1 font-size-weight text-center" />
                                                </div>
                                            </th>
                                            <th className="">
                                            </th>
                                        </tr>
                                        <tbody className="text-sm divide-y divide-slate-200 dark:divide-slate-700">
                                            {isFetch && products?.result?.map((product, i) => {
                                                return (<tr className key={i}>
                                                    <td className="py-4">
                                                        <div className="text-center">{product.barcode}</div>
                                                    </td>
                                                    <td className="">
                                                        <div className="text-center">{product.title}</div>
                                                    </td>
                                                    <td className="">
                                                        <div className="text-center">{product.price}</div>
                                                    </td>
                                                    <td className="">
                                                        <div className="text-center">{product.quantity}</div>
                                                    </td>
                                                    <td className="">
                                                        <div className="text-center">{product?.category[0]?.name}</div>
                                                    </td>
                                                    <td className="">
                                                        <div className="text-center">{product?.subcategory[0]?.name}</div>
                                                    </td>
                                                    <td className="">
                                                        <div className="text-center">{product?.measurement[0]?.size}</div>
                                                    </td>
                                                    <td style={{ display: "none" }}>
                                                        <div className="pt-2" id={`barcode-id${product?.barcode}`} >
                                                            <table>
                                                                <tr>
                                                                    <td><img src={Logo} width='30px' /></td>
                                                                    <td><p className='ml-3' style={{ fontSize: '22px' }}>{product.title}</p></td>
                                                                </tr>
                                                            </table>
                                                            <QRCode
                                                                value={product.barcode.toString() + '\n' + product.title}
                                                                size={180}
                                                            />
                                                        </div>

                                                        {/* <QRCodeForDownload
                                                            id={`qr-id${product?.barcode}`}
                                                            value={product.barcode.toString() + '\n' + product.title}
                                                            size={180}
                                                        /> */}
                                                    </td>
                                                    <td className="text-center py-1">
                                                        <div className="text-center">
                                                            <button onClick={() => viewProduct(product)}><img className='product-icons' src={viewIcon} /></button>
                                                            {activeTab == 'Active' && <button onClick={() => updateProduct(product)}><img className='product-icons' src={editIcon} /></button>}
                                                            {activeTab == 'Active' && <button onClick={() => remove(product)}><img className='product-icons' src={archiveIcon} /></button>}
                                                            {activeTab == 'Active' && <> {isPrinter != product?.barcode ?
                                                                <button onClick={() => { setPrintProductid(product?.barcode); setPrintProductName(product?.title); setPrintProductid(product?.barcode); setShowBarcodeModal(true); }}><img className='product-icons' src={qrIcon} /></button>
                                                                :
                                                                <button disabled={true}><img className='product-icons' src={qrIcon} /></button>
                                                            }</>
                                                            }
                                                            {activeTab == 'Archive' && <button onClick={() => activeProduct(product)}><img className='product-icons' src={archiveIcon} /></button>}
                                                            {activeTab == 'Archive' && <button onClick={() => {setDeleteProductsConfermation(true); setDeletedId(product._id);}}><img src={deleteIcon} style={{ height: '23px' }} /></button>}

                                                        </div>
                                                    </td>
                                                </tr>)
                                            })}
                                        </tbody>
                                    </table>
                                    {!isFetch && <div className='p-5 p-3 sm:flex sm:justify-center'>
                                        <img src={LOADER} className="loader-gif" />
                                    </div>}

                                    {!isFetch && products?.length == 0 && <div className='p-5 p-3 sm:flex sm:justify-center'>
                                        No record Found
                                    </div>}
                                </div>
                            </div>
                        </div>
                        {products?.result?.length > 0 &&
                            <div className="mt-8">
                                <PaginationClassic
                                    records={products}
                                    handleFun={setPageNum}
                                    pageNum={pageNum}
                                />
                            </div>
                        }
                    </div>
                </main>
            </div>
            <DeleteProduct
                showModal={showConfermation}
                setShowModal={setShowConfermation}
                removeProduct={removeProduct}
                isDelete={isDelete}
                note={note}
                setNote={setNote}
                productData={productData}
            />

            <Confermation
                showConfermation={showConfermationActive}
                setShowConfermation={setShowConfermationActive}
                handleConfirm={revertToactiveProduct}
                title='Are you sure want to revert to active list?'
                isDelete={isActive}
            />

            <Confermation
                showConfermation={deleteProductsConfermation}
                setShowConfermation={setDeleteProductsConfermation}
                handleConfirm={deleteProduct}
                title='Are you sure want to remove this product?'
                isDelete={isActive}
            />
            <Toaster />
        </div>
    );
}

export default Products;