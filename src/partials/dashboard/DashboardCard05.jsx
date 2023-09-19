import React, { useState, useEffect } from 'react';
import Tooltip from '../../components/Tooltip';
import RealtimeChart from '../../charts/RealtimeChart';
import { useTranslation } from "react-i18next";
// Import utilities
import { tailwindConfig, hexToRGB } from '../../utils/Utils';

function DashboardCard05({dashboardData, setSearch, serach}) {
  const { t } = useTranslation();

  const [chartData, setChartData] = useState(null);
  

  let arrangData = () =>{
    let inStock = [];
    let outStock = [];
    let lable=[];
    dashboardData?.stockIn?.map((act,i)=>{
      inStock[i]=act.current_quantity;
      if(dashboardData?.stockIn?.length >= dashboardData?.stockOut?.length){
        lable[i]='';
      }
    });

    dashboardData?.stockOut?.map((act,i)=>{
      outStock[i]=act.current_quantity;
      if(dashboardData?.stockOut?.length > dashboardData?.stockIn?.length){
        lable[i]='';
      }
    });

    const DataC = {
      labels: lable,
      datasets: [
        {
          label: 'Stock Out',
          data: outStock,
          fill: true,
          products:dashboardData.stockOut,
          backgroundColor: `rgba(${hexToRGB(tailwindConfig().theme.colors.red[500])}, 0.08)`,
          borderColor: tailwindConfig().theme.colors.red[500],
          borderWidth: 2,
          tension: 0,
          pointRadius: 0,
          pointHoverRadius: 3,
            pointBackgroundColor: tailwindConfig().theme.colors.red[500],
            pointHoverBackgroundColor: tailwindConfig().theme.colors.red[500],
            pointBorderWidth: 0,
            pointHoverBorderWidth: 0,          
            clip: 20,
        },
        {
          label: 'Stock In',
          data: inStock,
          fill: true,
          products:dashboardData.stockIn,
          backgroundColor: `rgba(${hexToRGB(tailwindConfig().theme.colors.green[500])}, 0.08)`,
          borderColor: tailwindConfig().theme.colors.green[500],
          borderWidth: 2,
          tension: 0,
          pointRadius: 0,
          pointHoverRadius: 3,
            pointBackgroundColor: tailwindConfig().theme.colors.green[500],
            pointHoverBackgroundColor: tailwindConfig().theme.colors.green[500],
            pointBorderWidth: 0,
            pointHoverBorderWidth: 0,          
            clip: 20,
        },
      ],
    };

    setChartData(DataC);
  }

  useEffect(()=>{
      arrangData()
  },[dashboardData]);

// console.log(chartData);
  return (
    <div className="col-span-full xl:col-span-12 bg-white dark:bg-slate-800 shadow-lg rounded-sm border border-slate-200 dark:border-slate-700">
      <header className="px-5 py-4 border-b border-slate-100 dark:border-slate-700 flex sm:flex sm:justify-between">
        <h2 className="font-semibold text-slate-800 dark:text-slate-100">{t("Activity Log")}</h2>
        <select onChange={(e) => setSearch({ ...serach, ['period'] : e.target.value })}>
          <option value="monthly"> {t("Monthly")} </option>
          <option value="weekly"> {t("weekly")} </option>
          <option value="daily"> {t("daily")} </option>
        </select>
      </header>
      {chartData && <RealtimeChart data={chartData} width={595} height={248}/>}
    </div>
  );
}

export default DashboardCard05;
