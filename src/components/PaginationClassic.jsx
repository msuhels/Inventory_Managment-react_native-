import React from 'react';
import { useTranslation } from "react-i18next";

function PaginationClassic({ records, handleFun, pageNum }) {
  const { t } = useTranslation();
  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
      <div className="text-sm text-slate-500 dark:text-slate-400 text-center sm:text-left mb-2">
        Showing <span className="font-medium text-slate-600 dark:text-slate-300">1</span> to <span className="font-medium text-slate-600 dark:text-slate-300">{records.limit}</span> of <span className="font-medium text-slate-600 dark:text-slate-300">{records.totalCount}</span> results
      </div>
        <ul className="">
          {pageNum > 1 &&
            <li className="ml-1 first:ml-0" onClick={() => handleFun(pageNum - 1)} style={{float:'left',marginTop:"3px"}}>
              <span className="btn bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 text-indigo-500">&lt;- {t("Previous")}</span>
            </li>
          }
          {[...Array(records?.total_page)].map((item, i) => {
            let pageno = i + 1;
            return (
            <li key={i} className={`ml-1 first:ml-0  ${pageno == records?.currentPage ? 'active-page' : ''}`} onClick={() => handleFun(pageno)} style={{float:'left', marginTop:"3px"}}>
              <a className="btn bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 text-indigo-500" href="#0"
                key={i}>
                {pageno}
              </a>
            </li>
            );
          })}
          { pageNum < records?.total_page &&
            <li className="ml-1 first:ml-0" onClick={() => handleFun(pageNum + 1)} style={{float:'left', marginTop:"3px"}}>
              <a className="btn bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 text-indigo-500" >{t("Next")} -&gt;</a>
            </li>
          }
        </ul>
      
    </div>
  );
}

export default PaginationClassic;
