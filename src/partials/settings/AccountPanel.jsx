import React, { useState, useRef, useEffect } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import Image from '../../images/userImg.jpg';
import axios from '../../api/axios';
import { CHANGE_PASSWORDS, GET_USER_DETAILS, UPDATE_PROFILE } from '../../api/apiUrl';
import { Spinner } from "reactstrap";
import { useSelector,useDispatch } from 'react-redux';
import {getUserData } from '../../store/actions/action';
import { useTranslation } from "react-i18next";

function AccountPanel() {
  let { admin, token } = JSON.parse(sessionStorage.getItem('userDetails'));
  const { t } = useTranslation();
  const {userData} =useSelector((state)=>state);
  const dispatch=useDispatch();

  const [img, setImg] = useState(false);
  const fileInputRef = useRef(null);
  const [user, setUser] = useState({ name: "", email: "", role: "" })
  const [showimg, setShowimg] = useState("");
  const [passwordDetails, setPasswordDetails] = useState({ oldpassword: '', newpassword: '', confirmpassword: '' });
  const [isUpdate, setIsUpdate] = useState(false);
  const [isProfileUpdate, setIsProfileUpdate] = useState(false);


  useEffect(() => {
    if(userData){
      setUser({ name: userData.username, email: userData.email, role: userData.role });
      setShowimg(userData.image);
    }
  }, [userData])

  useEffect(() => {
    dispatch(getUserData());
  }, [])

  const handleinput = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  }

  const handleSubmit = async () => {
    setIsProfileUpdate(true);
    const formdata = new FormData();
    formdata.append("image", img);
    formdata.append("username", user.name);
    formdata.append("email", user.email);
    formdata.append("role", user.role);
    try {
      const response = await axios.post(UPDATE_PROFILE, formdata, { headers: { "Authorization": "Bearer " + token } });
      toast.success('successfully Updated!');
      dispatch(getUserData());
      setIsProfileUpdate(false);
    } catch (error) {
      setIsProfileUpdate(false);
      toast.error(error.response.data.msg);
    }
  };

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (event) => {
    setImg(event.target.files[0])
  };

  const upatePaasword = async () => {
    setIsUpdate(true);
    try {
      const response = await axios.post(CHANGE_PASSWORDS, passwordDetails, { headers: { "Authorization": "Bearer " + token } });
      toast.success('successfully Updated!');
      setIsUpdate(false);
      setPasswordDetails({ oldpassword: '', newpassword: '', confirmpassword: '' });
    } catch (error) {
      setIsUpdate(false);
      toast.error(error.response.data.msg);
    }
  }

 

  return (
    <div className="grow">
      <div className="p-6 space-y-6">
        <h2 className="text-2xl text-slate-800 dark:text-slate-100 font-bold mb-5">{t("My Account")}</h2>
        <section>
          <div className="flex items-center">
            <div className="mr-4">
              {showimg ?
                <img className="w-20 h-20 rounded-full" src={showimg} width="80" height="80" alt="User upload" />
                :
                <img className="w-20 h-20 rounded-full" src={Image} width="80" height="80" alt="User upload" />
              }
            </div>
            <button className="btn-sm bg-indigo-500 hover:bg-indigo-600 text-white" onClick={handleButtonClick}>{t("Change")}</button>
            <input
              type="file"
              ref={fileInputRef}
              style={{ display: 'none' }}
              onChange={handleFileChange}
            />
          </div>
        </section>

        <div className="space-y-8 divide-y divide-gray-200 sm:space-y-5">
          <div>
            <div className="mt-6 sm:mt-5 space-y-6 sm:space-y-5">
              <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                <label htmlFor="new_pwd" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2" > {t("Name")} </label>
                <div className="mt-1 sm:mt-0 sm:col-span-2">
                  <input type="text" name="name" value={user.name} onChange={(e) => handleinput(e)} id="new_pwd" className="max-w-lg block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md" />
                </div>
              </div>

              <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:pt-5">
                <label htmlFor="og_pwd" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"> {t("Email")} </label>
                <div className="mt-1 sm:mt-0 sm:col-span-2">
                  <input type="email" name="email" value={user.email} onChange={(e) => handleinput(e)} id="og_pwd" className="max-w-lg block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md" />
                </div>
              </div>
              <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                <label htmlFor="new_pwd" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"> {t("Your role")} </label>
                <select name="role" onChange={(e) => handleinput(e)} className="max-w-lg block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md" disabled>
                  <option value="user" selected={user.role=='user' ? true : false}>{t("User")}</option>
                  <option value="admin" selected={user.role=='admin' ? true : false}>{t("Admin")}</option>
                  <option value="super admin" selected={user.role=='super admin' ? true : false}>{t("Super Admin")}</option>
                </select>
              </div>
            </div>
          </div>
        </div>
        <footer>
          <div className="flex flex-col px-6 py-5 border-b border-slate-200 dark:border-slate-700">
            <div className="flex self-end">
              {/* <button className="btn dark:bg-slate-800 border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 text-slate-600 dark:text-slate-300">Cancel</button> */}
              {!isProfileUpdate ?
                <button className="btn bg-indigo-500 hover:bg-indigo-600 text-white ml-3" onClick={() => handleSubmit()}>{t("Save Changes")}</button>
                :
                <button className="btn bg-indigo-500 hover:bg-indigo-600 text-white ml-3"><Spinner animation="border" size="sm"></Spinner></button>
              }
            </div>
          </div>
        </footer>

        <section>
          <h2 className="text-xl leading-snug text-slate-800 dark:text-slate-100 font-bold mb-1">{t("Change Password")}</h2>
          <div className="text-sm">{t("You can change your password from here.")}</div>
          <div className="space-y-8 divide-y divide-gray-200 sm:space-y-5">
            <div>
              <div className="mt-6 sm:mt-5 space-y-6 sm:space-y-5">
                <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:pt-5">
                  <label htmlFor="og_pwd" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"> {t("Old Password")} </label>
                  <div className="mt-1 sm:mt-0 sm:col-span-2">
                    <input type="password" name="oldpassword" onChange={(e) => setPasswordDetails({ ...passwordDetails, [e.target.name]: e.target.value })} value={passwordDetails?.oldpassword} id="og_pwd" className="max-w-lg block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md" />
                  </div>
                </div>
                <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                  <label htmlFor="new_pwd" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"> {t("New Password")} </label>
                  <div className="mt-1 sm:mt-0 sm:col-span-2">
                    <input type="password" name="newpassword" onChange={(e) => setPasswordDetails({ ...passwordDetails, [e.target.name]: e.target.value })} value={passwordDetails?.newpassword} id="new_pwd" className="max-w-lg block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md" />
                  </div>
                </div>
                <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                  <label htmlFor="confirm_pwd" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2" > {t("Confirm Password")} </label>
                  <div className="mt-1 sm:mt-0 sm:col-span-2">
                    <input type="password" name="confirmpassword" onChange={(e) => setPasswordDetails({ ...passwordDetails, [e.target.name]: e.target.value })} value={passwordDetails?.confirmpassword} id="confirm_pwd" className="max-w-lg block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
      <footer>
        <div className="flex flex-col px-6 py-5 border-b border-slate-200 dark:border-slate-700">
          <div className="flex self-end">
            {!isUpdate ?
              <button className="btn bg-indigo-500 hover:bg-indigo-600 text-white ml-3" onClick={upatePaasword}>{t("Change Password")}</button>
              :
              <button className="btn bg-indigo-500 hover:bg-indigo-600 text-white ml-3"><Spinner animation="border" size="sm"></Spinner></button>
            }
          </div>
        </div>
      </footer>
      <Toaster />
    </div>
  );
}

export default AccountPanel;