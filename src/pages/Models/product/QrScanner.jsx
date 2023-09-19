import React, { useEffect, useState } from 'react';
import QrReader from "react-qr-scanner";
import Image from '../../../images/default_product.png';

function QrScanner({setInventory, Inventory, t}) {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [facingMode, setFacingMode] = useState('environment');
    const [scanerOpen, setScanerOpen] = useState(false);

    const handleScan = (val) => {
        if(val?.text){
            let data = val?.text;
            data = data.split("\n");
            console.log(data);
            console.log(data[0]);
            setInventory({ ...Inventory, ['barcode']: data[0] });
            setScanerOpen(false);
        }
        
    };

    const handleError = (err) => {
        console.error(err);
    };

    return (
        <div className='scanner-div flex justify-center'>
            <div>
                {scanerOpen ? 
                <div>
                    <QrReader
                        constraints={{
                            audio: false,
                            video: { facingMode: facingMode }
                        }}
                        delay={10000}
                        onError={handleError}
                        onScan={handleScan}
                    />
                </div>
                    :
                    <img className="pro-img-width2" src={Image} alt="Product Image" />
                }
                <div className='text-center '>
                    <button className='btn bg-indigo-500 hover:bg-indigo-600 text-white mt-2'
                        onClick={() => setScanerOpen(!scanerOpen)}
                    >
                        {!scanerOpen ? t('Scan QR') : t('Close')}
                    </button>
                </div>
            </div>
        </div>
    );
}

export default QrScanner;