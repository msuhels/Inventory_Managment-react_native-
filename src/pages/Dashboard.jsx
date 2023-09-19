import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import Sidebar from '../partials/Sidebar';
import Header from '../partials/Header';

import axios from './../api/axios';
import { GET_ALL_PRODUCTS_FOR_EXPORT } from './../api/apiUrl';
import { useSelector, useDispatch } from 'react-redux';
import { getDashboardData } from '../store/actions/action';

import ProductsIcon from '../images/newImage/Products.png';
import SettingsIcon from '../images/newImage/Settings.png';
import usersIcon from '../images/newImage/users.png';
import activityIcon from '../images/newImage/activity.png';
import dashboardIcon from '../images/newImage/Dashboard.png';
import CategoryIcon from '../images/newImage/Category.png';

import PieUserChartCard from '../partials/dashboard/PieUserChartCard';
import DashboardUserCard from '../partials/dashboard/DashboardUsreCard';
import CategoryCard from '../partials/dashboard/CategoryCard';
import SubcategoryCart from '../partials/dashboard/SubcategoryCart';
import ProductCard from '../partials/dashboard/ProductCard';
import Barchart from '../partials/dashboard/Barchart';
import Barchart2 from '../charts/BarChart02';
import LowQuantityProducts from '../partials/dashboard/LowQuantityProducts';
import SoldProducts from '../partials/dashboard/SoldProducts';
import { tailwindConfig } from '../utils/Utils';
import * as XLSX from "xlsx";
import * as FileSaver from "file-saver";
import LineChart from '../partials/dashboard/DashboardCard05';
import { useTranslation } from "react-i18next";

function Dashboard() {
  let { admin, token } = JSON.parse(sessionStorage.getItem('userDetails'));
  const { t } = useTranslation();
  const { dashboardData } = useSelector((state) => state);
  const dispatch = useDispatch();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [barChartData, setBarChartData] = useState(null);
  const [exportdata, setexportdata] = useState(null);
  const [serach, setSearch] = useState({ search: '', period: 'monthly' });

  const arrangBarchartdata = () => {
    let lable = [];
    let value = [];
    dashboardData?.product_acording_category?.map((itm, i) => {
      lable[i] = itm.name;
      value[i] = itm.quantity;
    });

    const chartData = {
      labels: lable,
      datasets: [
        {
          label: 'Stack 1',
          data: value,
          backgroundColor: tailwindConfig().theme.colors.indigo[500],
          hoverBackgroundColor: tailwindConfig().theme.colors.indigo[600],
          barPercentage: 0.66,
          categoryPercentage: 0.66,
        },
      ],
    };
    setBarChartData(chartData);
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
    if (dashboardData) {
      arrangBarchartdata();
    }
  }, [dashboardData])

  useEffect(() => {
    dispatch(getDashboardData(serach));
    getAllProducts();
  }, [serach])

  return (
    <div className="flex h-[100dvh] overflow-hidden">
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        <main className="grow">
          <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">
            <div className="sm:flex sm:justify-between sm:items-center mb-8">
              <div className="mb-4 sm:mb-0 sm:flex sm:justify-start sm:items-start mb-8 display-inline-flex">
                <h1 className="text-2xl md:text-3xl text-slate-800 dark:text-slate-100 font-bold">{t('Dashboard')}</h1>
                <img className='my-1 mx-3' src={dashboardIcon} width="40px" />
              </div>
              <div className='sm:flex sm:justify-between'>
                <div>
                  <label>{t("Search")} : </label>
                  <input className='form-control border border-secondary ml-2 p-2 rounded-md' onChange={(e) => setSearch({ ...serach, ['search']: e.target.value })} />
                </div>
                <button onClick={exportToCSV} className="ml-2 bg-emerald-500 text-white active:bg-emerald-600 text-sm px-4 py-2 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150">{t("Export Report")}</button>
              </div>
            </div>
            <div className="grid grid-cols-12 gap-6">
              {dashboardData &&
                <>
                  {/* <DashboardUserCard
                    dashboardData={dashboardData}
                    usersIcon={usersIcon}
                  /> */}

                  <ProductCard
                    dashboardData={dashboardData}
                    Icon={ProductsIcon}
                  />

                  <CategoryCard
                    dashboardData={dashboardData}
                    usersIcon={CategoryIcon}
                  />

                  <SubcategoryCart
                    dashboardData={dashboardData}
                    usersIcon={CategoryIcon}
                  />
                  
                </>
              }
            </div>

            <div className="grid grid-cols-12 gap-6 mt-5">
              {barChartData &&
                <>
                  {/* <PieUserChartCard
                    dashboardData={dashboardData}
                    usersIcon={usersIcon}
                  /> */}
                  <div className="col-span-full xl:col-span-12 bg-white dark:bg-slate-800 shadow-lg rounded-sm border border-slate-200 dark:border-slate-700">
                    <header className="px-5 py-4 border-b border-slate-100 dark:border-slate-700 flex items-center">
                      <h2 className="font-semibold text-slate-800 dark:text-slate-100">{t("Products According to Category")}</h2>
                    </header>
                    <div className="px-5 py-3"></div>
                    <div className="grow">
                      <Barchart2 data={barChartData} width={595} height={248} />
                    </div>
                  </div>
                </>
              }
            </div>

            <div className="grid grid-cols-12 gap-6 mt-5">
              {barChartData &&
                <>
                  <LowQuantityProducts dashboardData={dashboardData} />
                  <SoldProducts dashboardData={dashboardData} />
                </>
              }
            </div>
            
            <div className="grid grid-cols-12 gap-6 mt-5">
              {dashboardData &&
                <>
                  <LineChart dashboardData={dashboardData} setSearch={setSearch} serach={serach} />
                </>
              }
            </div>
            <div className="grid grid-cols-12 gap-6 mt-5">
              {dashboardData &&
                <>
                  <PieUserChartCard
                    dashboardData={dashboardData}
                    usersIcon={usersIcon}
                  />
                  <DashboardUserCard
                    dashboardData={dashboardData}
                    usersIcon={usersIcon}
                  />
                </>
              }
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default Dashboard;