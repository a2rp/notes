import { ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

function Notifications() {
    return (
        <ToastContainer
            position="top-right"
            autoClose={2500}
            hideProgressBar={false}
            newestOnTop
            closeOnClick
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="dark"
        />
    );
}

export default Notifications;
