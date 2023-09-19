import React, { useState, useEffect } from 'react';

import Sidebar from '../../partials/Sidebar';
import Header from '../../partials/Header';
import DeleteButton from '../../partials/actions/DeleteButton';
import DateSelect from '../../components/DateSelect';
import FilterButton from '../../components/DropdownFilter';
import CustomersTable from '../../partials/customers/CustomersTable';
import PaginationClassic from '../../components/PaginationClassic';
import UserInvitation from "../Models/user/UserInvitation";
import toast, { Toaster } from 'react-hot-toast';
import axios from '../../api/axios';
import { GET_ALL_USERS_BY_PAGGINATION, DELETE_USER } from '../../api/apiUrl';
import AddUserPopup from "../Models/user/AddUser";
import UpdateUserPopup from "../Models/user/UpdateUser";
import Confermation from "../../components/Confermation";
import LOADER from '../../images/loader.gif';
import usersIcon from '../../images/newImage/users.png';
import {useSearchParams} from "react-router-dom";
import { useTranslation } from "react-i18next";

function Customers() {
  let { admin, token } = JSON.parse(sessionStorage.getItem('userDetails'));
  const { t } = useTranslation();
  const [showSendModal, setShowSendModal] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectedItems, setSelectedItems] = useState([]);
  const [users, setUsers] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [updateUser, setUpdateUser] = useState(null);
  const [deletedId, setDeletedId] = useState(null);
  const [showConfermation, setShowConfermation] = useState(false);
  const [isDelete, setIsDelete] = useState(false);
  const [pageNum, setPageNum] = useState(1);
  const [search, setSearch] = useState('');
  const [isFetch, setIsFetch] = useState(false);
  const [searchBycolumn, setSearchBycolumn] = useState(null);
  const [sorting, setSorting] = useState({ column: 'name', order: 'ASC' });
  const [searchParams,setSearchParam] = useSearchParams();

  const handleSelectedItems = (selectedItems) => {
    setSelectedItems([...selectedItems]);
  };

  const getUsers = async () => {
    try {
      let URL = GET_ALL_USERS_BY_PAGGINATION(pageNum, search, sorting.column, sorting.order, JSON.stringify(searchBycolumn));
      const response = await axios.get(URL, { headers: { "Authorization": "Bearer " + token } });
      setUsers(response.data);
      setIsFetch(true);
    } catch (error) {
      console.log(error);
    }
  };

  const updateUserData = (cat) => {
    setUpdateUser(cat);
    setShowUpdateModal(true);
  }

  const remove = (id) => {
    setShowConfermation(true);
    setDeletedId(id);
  }

  const deleteCategory = async () => {
    setIsDelete(true);
    try {
      let URL = DELETE_USER(deletedId);
      const response = await axios.delete(URL, { headers: { "Authorization": "Bearer " + token } });
      getUsers();
      setShowConfermation(false);
      toast.success('successfully deleted!');
      setIsDelete(false);
    } catch (error) {
      toast.error(error.response.data.msg);
      setIsDelete(false);
    }
  }

  const handleSearching = (e) => {
    let searchCol = { ...searchBycolumn };
    searchCol[e.target.name] = e.target.value;
    setSearchBycolumn(searchCol);
}

const handleSorting = (column) => {
  let sort = { ...sorting };
  sort.column = column;
  sort.order = sort.order == 'ASC' ? 'DESC' : 'ASC';
  setSorting(sort);
}

  useEffect(() => {
    getUsers();
  }, [pageNum, search, sorting, searchBycolumn]);

  useEffect(()=>{
    if(searchParams.get('action') == 'add'){
      setShowAddModal(true);
    }
  },[]);

  return (
    <div className="flex h-[100dvh] overflow-hidden">
      <UserInvitation showModal={showSendModal} setShowModal={setShowSendModal} />
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      {showAddModal &&
        <AddUserPopup showModal={showAddModal} setShowModal={setShowAddModal} getUsers={getUsers} />
      }
      {showUpdateModal &&
        <UpdateUserPopup showModal={showUpdateModal} setShowModal={setShowUpdateModal} getUsers={getUsers} updateUser={updateUser} />
      }

      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        <main className="grow">
          <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">
            <div className="sm:flex sm:justify-between sm:items-center mb-8">
              <div className="mb-4 sm:mb-0 sm:flex sm:justify-start sm:items-start mb-8 display-inline-flex">
                <h1 className="text-2xl md:text-3xl text-slate-800 dark:text-slate-100 font-bold">{t("Users")}</h1>
                <img className='my-1 mx-3' src={usersIcon} width="35px"/>
              </div>
              <div className="grid grid-flow-col sm:auto-cols-max justify-start sm:justify-end gap-2">
                {/* <DeleteButton selectedItems={selectedItems} />
                <DateSelect />
                <FilterButton align="right" /> */}
                <button className="btn bg-indigo-500 hover:bg-indigo-600 text-white" onClick={() => setShowSendModal(true)}>
                  <svg className="w-4 h-4 fill-current opacity-50 shrink-0" viewBox="0 0 16 16">
                    <path d="M15 7H9V1c0-.6-.4-1-1-1S7 .4 7 1v6H1c-.6 0-1 .4-1 1s.4 1 1 1h6v6c0 .6.4 1 1 1s1-.4 1-1V9h6c.6 0 1-.4 1-1s-.4-1-1-1z" />
                  </svg>
                  <span className="xs:block ml-2">{t("Invitation")}</span>
                </button>
                <div className="grid grid-flow-col sm:auto-cols-max justify-start sm:justify-end gap-2">
                  <button className="btn bg-indigo-500 hover:bg-indigo-600 text-white" onClick={() => setShowAddModal(true)}>
                    <svg className="w-4 h-4 fill-current opacity-50 shrink-0" viewBox="0 0 16 16">
                      <path d="M15 7H9V1c0-.6-.4-1-1-1S7 .4 7 1v6H1c-.6 0-1 .4-1 1s.4 1 1 1h6v6c0 .6.4 1 1 1s1-.4 1-1V9h6c.6 0 1-.4 1-1s-.4-1-1-1z" />
                    </svg>
                    <span className="xs:block ml-2">{t("Add User")}</span>
                  </button>
                </div>
              </div>
            </div>
            <CustomersTable
              selectedItems={handleSelectedItems}
              users={users}
              getUsers={getUsers}
              updateUserData={updateUserData}
              remove={remove}
              search={search}
              setSearch={setSearch}
              isFetch={isFetch}
              LOADER={LOADER}
              handleSearching={handleSearching}
              handleSorting={handleSorting}
              sorting={sorting}
            />

            {users?.result?.length > 0 &&
              <div className="mt-8">
                <PaginationClassic
                  records={users}
                  handleFun={setPageNum}
                  pageNum={pageNum}
                />
              </div>
            }
          </div>
        </main>
      </div>
      <Confermation
        showConfermation={showConfermation}
        setShowConfermation={setShowConfermation}
        handleConfirm={deleteCategory}
        title={t('Are you sure want to delete?')}
        isDelete={isDelete}
      />
      <Toaster />
    </div>
  );
}

export default Customers;