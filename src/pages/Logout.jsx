import { useEffect } from "react";
import { useNavigate } from 'react-router-dom';

function Logout() {

    const navigate = useNavigate();

    useEffect(() => {
        sessionStorage.removeItem('userDetails');
        navigate("/signin")
    })

  return (
    <div></div>
  );
}

export default Logout;
