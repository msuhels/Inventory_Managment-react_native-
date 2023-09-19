import React, { useState, useEffect } from "react";

 const CssStyleRTL = () => {
  console.log(localStorage.getItem('selected_language'),'==================================>>>');
    if (localStorage.getItem('selected_language') == 'ar') {
      return (
        <>
          <link href="css/rtl.css" rel="stylesheet" />
        </>
      );
    }
};

export default CssStyleRTL;