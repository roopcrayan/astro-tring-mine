import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
/**
 * HOC to protect routes
 * @param {React.Component} WrappedComponent
 */


 

const AuthHOC = (WrappedComponent) => {
    return (props) => {
        const navigate = useNavigate();
        const { token } = useSelector((state) => state.userAuth);

        useEffect(() => {
            // Check token in redux state or localStorage
            const storedToken = token || localStorage.getItem("token");

            if (!storedToken) {
                navigate("/"); // Redirect to login if no token
                toast.error('Please login to access this page', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: false,
                    pauseOnHover: true,
                    draggable: true,
                   
                    theme: "light",
                   
                });
            }
        }, [token, navigate]);

        // If token exists, render the protected component
        return <WrappedComponent {...props} />;
    }
};

export default AuthHOC;
