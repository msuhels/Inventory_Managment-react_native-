import React from 'react';
import { useTranslation } from "react-i18next";

function CustomersTableItem(props) {
  const { t } = useTranslation();
  return (
    <tr>
      {/* <td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap w-px">
        <div className="flex items-center">
          <label className="inline-flex">
            <span className="sr-only">Select</span>
            <input id={props.id} className="form-checkbox" type="checkbox" onChange={props.handleClick} checked={props.isChecked} />
          </label>
        </div>
      </td> */}

      <td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
        <div className="flex items-center">
          <div className="w-10 h-10 shrink-0 mr-2 sm:mr-3">
            <img className="rounded-full" src={props.image} width="40" height="40" alt={props.name} />
          </div>
          <div className="font-medium text-slate-800 dark:text-slate-100">{props.name}</div>
        </div>
      </td>
      <td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
        <div className="text-left">{props.email}</div>
      </td>
      <td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
        <div className="text-left">{props.createdAt}</div>
      </td>
      <td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
        <div className="text-center">
          <button className='bg-rose-500 hover:bg-rose-600 text-white font-bold py-1 px-4 rounded-full mr-2' onClick={() => props.remove(props.id)}>{t("Delete")}</button>
          <button className='bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-1 px-4 rounded-full' onClick={() => props.updateUserData(props.user)}>{t("Edit")}</button>
        </div>
      </td>
    </tr>
  );
}

export default CustomersTableItem;
