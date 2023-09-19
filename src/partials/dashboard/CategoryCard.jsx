import React from 'react';
import { Link } from 'react-router-dom';
import LineChart from '../../charts/LineChart01';
import Icon from '../../images/icon-01.svg';
import { useTranslation } from "react-i18next";

// Import utilities
import { tailwindConfig, hexToRGB } from '../../utils/Utils';

function CategoryCard({dashboardData, usersIcon}) {
  const { t } = useTranslation();

  const chartData = {
    labels: ['User', 'admin'],
    datasets: [
      {
        label: 'counts',
        data: [dashboardData.userConut, 2],
        backgroundColor: [
          tailwindConfig().theme.colors.indigo[500],
          tailwindConfig().theme.colors.blue[200],
        ],
        hoverBackgroundColor: [
          tailwindConfig().theme.colors.indigo[600],
          tailwindConfig().theme.colors.blue[500],
        ],
        borderWidth: 0,
      },
    ],
  };
  return (
    <div className="flex flex-col col-span-full sm:col-span-6 xl:col-span-4 bg-white dark:bg-slate-800 shadow-lg rounded-sm border border-slate-200 dark:border-slate-700">
      <div className="px-5 py-5">
        <header className="flex justify-between items-start mb-2">
          <img src={usersIcon} width="32" height="32" alt="Icon 01" />
          <h2 className="text-lg font-semibold text-slate-800 dark:text-slate-100 mb-2">{t("Category")}</h2>
        </header>
        
        {/* <div className="text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase mb-1">Sales</div> */}
        <div className="flex items-center flex justify-between">
          <div className="text-3xl font-bold text-slate-800 dark:text-slate-100 mr-2">{dashboardData?.categoryConut}</div>
          <div className="pt-2 ">
            <Link to={'categories?action=add'}  className="flex justify-start">
              <svg className="w-3 h-3 fill-current opacity-50 shrink-0 mt-1 slid-add-btn" viewBox="0 0 16 16">
                <path d="M15 7H9V1c0-.6-.4-1-1-1S7 .4 7 1v6H1c-.6 0-1 .4-1 1s.4 1 1 1h6v6c0 .6.4 1 1 1s1-.4 1-1V9h6c.6 0 1-.4 1-1s-.4-1-1-1z" />
              </svg>
              <span className="xs:block ml-2 slid-add-btn">{t("ADD")}</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CategoryCard;
