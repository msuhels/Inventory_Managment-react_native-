import React, { useState, useEffect } from 'react';
import Customer from './CustomersTableItem';
import Image01 from '../../images/user-40-01.jpg';
import defaultImage from '../../images/userImg.jpg';
import Moment from 'moment';
import { useTranslation } from "react-i18next";

function CustomersTable({ selectedItems,
  users,
  getUsers,
  updateUserData,
  remove,
  search,
  setSearch,
  isFetch,
  LOADER,
  handleSearching,
  handleSorting,
  sorting }) {
  const { t } = useTranslation();
  const [selectAll, setSelectAll] = useState(false);
  const [isCheck, setIsCheck] = useState([]);
  const [list, setList] = useState([]);

  const handleSelectAll = () => {
    setSelectAll(!selectAll);
    setIsCheck(list.map(li => li.id));
    if (selectAll) {
      setIsCheck([]);
    }
  };

  const handleClick = e => {
    const { id, checked } = e.target;
    setSelectAll(false);
    setIsCheck([...isCheck, id]);
    if (!checked) {
      setIsCheck(isCheck.filter(item => item !== id));
    }
  };

  useEffect(() => {
    selectedItems(isCheck);
  }, [isCheck]);

  return (
    <div className="bg-white dark:bg-slate-800 shadow-lg rounded-sm border border-slate-200 dark:border-slate-700 relative">
      <header className="sm:flex sm:justify-between sm:items-center p-3">
        <h2 className="font-semibold text-slate-800 dark:text-slate-100">{t("All Users")} <span className="text-slate-400 dark:text-slate-500 font-medium">{users?.length}</span></h2>
        <div>
          <label className="form-label">{t("Search")} :</label>
          <input className='form-control border border-secondary ml-2 p-1 rounded-md' value={search} onChange={(e) => setSearch(e.target.value)} />
        </div>
      </header>
      <div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="table-auto w-full dark:text-slate-300">
            {/* Table header */}
            <thead className="text-xs font-semibold uppercase text-slate-500 dark:text-slate-400 bg-slate-50 dark:bg-slate-900/20 border-t border-b border-slate-200 dark:border-slate-700">
              <tr className='table-heading'>
                {/* <th className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap w-px">
                  <div className="flex items-center">
                    <label className="inline-flex">
                      <span className="sr-only">Select all</span>
                      <input className="form-checkbox" type="checkbox" checked={selectAll} onChange={handleSelectAll} />
                    </label>
                  </div>
                </th> */}

                <th className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                  <div className="cursor-pointer text-left" onClick={() => handleSorting('username')}>{t("Name")}
                    <span className={`${(sorting.column == 'username' && sorting.order == 'ASC') ? 'active-arrow' : ''}`}>↑</span>
                    <span className={`arrow-margin ${(sorting.column == 'username' && sorting.order == 'DESC') ? 'active-arrow' : ''}`}>↓</span>
                  </div>
                </th>
                <th className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                  <div className="cursor-pointer text-left" onClick={() => handleSorting('email')}>{t("Email")}
                    <span className={`${(sorting.column == 'email' && sorting.order == 'ASC') ? 'active-arrow' : ''}`}>↑</span>
                    <span className={`arrow-margin ${(sorting.column == 'email' && sorting.order == 'DESC') ? 'active-arrow' : ''}`}>↓</span>
                  </div>
                </th>
                <th className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                  <div className="cursor-pointer text-left" onClick={() => handleSorting('createdAt')}>{t("Date")}
                    <span className={`${(sorting.column == 'createdAt' && sorting.order == 'ASC') ? 'active-arrow' : ''}`}>↑</span>
                    <span className={`arrow-margin ${(sorting.column == 'createdAt' && sorting.order == 'DESC') ? 'active-arrow' : ''}`}>↓</span>
                  </div>
                </th>
                <th className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                  <div className="font-semibold text-left ">{t("Action")}</div>
                </th>
              </tr>
            </thead>
            <tr className="border border-bottom bg-tr-table">
              <th className="py-1 ">
                <div>
                  <input type="text" onChange={(e) => handleSearching(e)} name="username" placeholder={t("Name")} className="block w-full rounded  border-gray-200 p-1 py-0 mx-1 font-size-weight text-left" />
                </div>
              </th>
              <th className="">
                <div>
                  <input type="text" onChange={(e) => handleSearching(e)} name="email" placeholder={t("Email")} className="block w-full rounded border-gray-200 p-1 py-0 mx-1 font-size-weight text-left" />
                </div>
              </th>
              <th className="">
                </th>
                <th className="">
                </th>

              {/* <th className="">
                <div>
                  <input type="text" onChange={(e) => handleSearching(e)} name="createdAt" placeholder="Date" className="block w-full  border-gray-200 p-1 py-0 mx-1 font-size-weight text-left" />
                </div>
              </th> */}
            </tr>
            <tbody className="text-sm divide-y divide-slate-200 dark:divide-slate-700">
              {
                users?.result?.map(customer => {
                  let createdAt = Moment(customer.createdAt).format('DD-MM-YYYY H:m');
                  return (
                    <Customer
                      key={customer._id}
                      id={customer._id}
                      image={customer?.image ? customer?.image : defaultImage}
                      name={customer.username}
                      email={customer.email}
                      createdAt={createdAt}
                      handleClick={handleClick}
                      isChecked={isCheck.includes(customer._id)}
                      updateUserData={updateUserData}
                      user={customer}
                      remove={remove}
                    />
                  )
                })
              }
            </tbody>
          </table>
          {!isFetch && <div className='p-5 p-3 sm:flex sm:justify-center'>
            <img src={LOADER} className="loader-gif" />
          </div>}
        </div>
      </div>
    </div>
  );
}

export default CustomersTable;
