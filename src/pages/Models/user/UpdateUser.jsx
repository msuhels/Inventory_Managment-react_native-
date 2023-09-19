import React, { useEffect, useState } from "react";
import axios from '../../../api/axios';
import { ADMIN_UPDATE_USER } from '../../../api/apiUrl';
import toast, { Toaster } from 'react-hot-toast';
import { Spinner } from "reactstrap";
import { useTranslation } from "react-i18next";

export default function Modal({ showModal, setShowModal, getUsers, updateUser }) {
    let { admin, token } = JSON.parse(sessionStorage.getItem('userDetails'));
    const [usreDetails, setUsreDetails] = useState({ username: '', email: '', role: '', id:''});
    const [isSave, setIsSave] = useState(false);
    const { t } = useTranslation();
    const updateUserData = async (event) => {
        event.preventDefault();
        setIsSave(true);
        try {
            const response = await axios.post(ADMIN_UPDATE_USER, usreDetails, { headers: { "Authorization": "Bearer " + token } });
            toast.success('successfully Updated!');
            setShowModal(false);
            getUsers();
            setIsSave(false);
            setUsreDetails({ name: '' });
        } catch (error) {
            setIsSave(false);
            toast.error(error.response.data.msg);
        }
    }

    useEffect(() => {
        setUsreDetails({ username: updateUser.username, email: updateUser.email, role: updateUser.role, id:updateUser._id });
    }, [updateUser])

    return (
        <>
            {showModal ? (
                <>
                    <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none" >
                        <div className="relative w-auto my-6 mx-auto max-w-3xl">
                            <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                            <form onSubmit={updateUserData}>
                                <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                                    <h3 className="text-3xl font-semibold text-center"> {t("Update User")}</h3>
                                </div>
                                <div className="relative p-6 flex-auto">
                                    <div className="py-2">
                                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                                            {t("Name")}
                                        </label>
                                        <input type="text" name="username" onChange={(e) => setUsreDetails({ ...usreDetails, [e.target.name]: e.target.value })} value={usreDetails?.username} placeholder="Enter Name" className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 width-input-400" required />
                                    </div>
                                    <div className="py-2">
                                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                                            {t("Email")}
                                        </label>
                                        <input type="email" name="email" onChange={(e) => setUsreDetails({ ...usreDetails, [e.target.name]: e.target.value })} value={usreDetails?.email} placeholder="Enter Email" className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 width-input-400" required />
                                    </div>
                                    <div className="py-2">
                                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                                            {t("Role")}
                                        </label>
                                        <select name="role" onChange={(e) => setUsreDetails({ ...usreDetails, [e.target.name]: e.target.value })} className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" required >
                                            <option>Select Role</option>
                                            <option value="user" selected={updateUser.role == 'user'}>User</option>
                                            {admin?.role == 'super admin' && <option value="admin" selected={updateUser.role == 'admin'}>Admin</option>}
                                        </select>
                                    </div>
                                </div>
                                <div className="flex items-center justify-end p-1 border-t border-solid border-slate-200 rounded-b">
                                    <button type="button" onClick={() => setShowModal(false)} className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"> {t("Close")} </button>
                                    {!isSave ?
                                        <button className="bg-emerald-500 text-white active:bg-emerald-600 text-sm px-4 py-2 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" type="submit" > {t("Update")}</button>
                                        :
                                        <button className="bg-emerald-500 text-white active:bg-emerald-600 text-sm px-4 py-2 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" type="button"> <Spinner animation="border" size="sm"></Spinner></button>
                                    }
                                </div>
                                </form>
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