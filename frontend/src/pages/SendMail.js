import React from "react";
import SendMailDetails from "../components/SendMail/SendMailDetails";
const SendMail = ({ showSidebar }) => {

    return (
        <div
            className={`mail-list-container ${
                showSidebar ? "small-sidebar" : "normal-sidebar"
            }`}
        >
            <SendMailDetails></SendMailDetails>

        </div>
    );
};

export default SendMail;
