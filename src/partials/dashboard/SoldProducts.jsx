import React, { useState, useEffect } from 'react';
import { useTranslation } from "react-i18next";

function SoldProducts({ dashboardData }) {
    const [products, setProducts] = useState(null);
    const { t } = useTranslation();
    const arrangdata = () => {
        let records = [];
        dashboardData?.allProducts?.map((item, i) => {
            if (item.low_quantity && item.quantity <= item.low_quantity) {
                records[i] = item;
            }
        });
        setProducts(records);
    }

    useEffect(() => {
        arrangdata();
    }, [dashboardData]);

    return (
        <div className="flex flex-col col-span-full sm:col-span-6 bg-white dark:bg-slate-800 shadow-lg rounded-sm border border-slate-200 dark:border-slate-700">
            <header className="px-5 py-4 border-b border-slate-100 dark:border-slate-700">
                <h2 className="font-semibold text-slate-800 dark:text-slate-100">{t("Top Selling Products")}</h2>
            </header>
            <div className="p-3">
                <div className="overflow-x-auto">
                    <table className="table-auto w-full dark:text-slate-300">
                        <thead className="text-xs uppercase text-slate-400 dark:text-slate-500 bg-slate-50 dark:bg-slate-700 dark:bg-opacity-50 rounded-sm">
                            <tr>
                                <th className="p-2">
                                    <div className="font-semibold text-center">{t("PRODUCT NAME")}</div>
                                </th>
                                <th className="p-2">
                                    <div className="font-semibold text-center">{t("Category")}</div>
                                </th>
                                <th className="p-2">
                                    <div className="font-semibold text-center">{t("QUANTITY")}</div>
                                </th>
                            </tr>
                        </thead>

                        <tbody className="text-sm font-medium divide-y divide-slate-100 dark:divide-slate-700">
                            {dashboardData?.allSoldProducts?.map((product, i) => {
                                return (<tr key={i}>
                                    <td className="p-2">
                                        <div className="text-center">{product.productName}</div>
                                    </td>
                                    <td className="p-2">
                                        <div className="text-center text-emerald-500">{product.category[0]?.name}</div>
                                    </td>
                                    <td className="p-2">
                                        <div className="text-center">{product.quantity}</div>
                                    </td>
                                </tr>)
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default SoldProducts;
