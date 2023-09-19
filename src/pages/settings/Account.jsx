import React, { useState } from 'react';

import Sidebar from '../../partials/Sidebar';
import Header from '../../partials/Header';
import SettingsSidebar from '../../partials/settings/SettingsSidebar';
import AccountPanel from '../../partials/settings/AccountPanel';
import SettingsIcon from '../../images/newImage/Settings.png';
import { useTranslation } from "react-i18next";

function Account() {
  const { t } = useTranslation();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-[100dvh] overflow-hidden">
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        <main className="grow">
          <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">
            <div className="sm:flex sm:justify-between sm:items-center mb-8">

              <div className="mb-4 sm:mb-0 sm:flex sm:justify-start sm:items-start mb-8 display-inline-flex">
                <h1 className="text-2xl md:text-3xl text-slate-800 dark:text-slate-100 font-bold">{t("Account Settings")}</h1>
                <img className='my-1 mx-3' src={SettingsIcon} width="35px" />
              </div>
            </div>
            <div className="mt-5 bg-white dark:bg-slate-800 shadow-lg rounded-sm mb-8">
              <div className="flex flex-col md:flex-row md:-mr-px">
                {/* <SettingsSidebar /> */}
                <AccountPanel />
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default Account;