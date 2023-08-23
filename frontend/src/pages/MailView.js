import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import {
    Link
} from "react-router-dom";

import arrowLeft from "../assets/arrowLeft.svg"
import trashBin from "../assets/trashBin.svg";
import archiveIcon from "../assets/archiveIcon.svg";
import LoadingAnimation from "../components/LoadingAnimation";

const MailView = ({showSidebar}) => {
    const { id } = useParams();
    const [mail, setMail] = useState(null);

    useEffect(() => {
        getMail();
    }, [id]);

    const getMail = async () => {
        try {
            const response = await fetch(`/mail/${id}`);
            if (response.ok) {
                const data = await response.json();
                setMail(data);
            } else {
                throw new Error('Failed to fetch mail');
            }
        } catch (error) {
            console.error(error);
            setMail(null);
        }
    };

    return (
        <div
            className={`mail-list-container ${
                showSidebar ? "small-sidebar" : "normal-sidebar"
            }`}
        >
            <div className={"round-corners"}>
                <div className="mail-nav">
                    <Link to={"/ALL"}>
                        <button type="button" className={"tooltip"}>
                            <img src={arrowLeft} alt="ArrowLeft" className="mail-nav-icons" height="20px" width="20px" />
                            <span className="tooltiptext">Wyjdź</span>
                        </button>
                    </Link>

                    <button type="button" className={"tooltip"}>
                        <img src={trashBin} alt="ArchiveIcon" className="mail-nav-icons" height="20px" width="20px" />
                        <span className="tooltiptext">Usuń</span>
                    </button>
                    <button type="button" className={"tooltip"}>
                        <img src={archiveIcon} alt="TrashBin" className="mail-nav-icons" height="20px" width="20px" />
                        <span className="tooltiptext">Zarchiwizuj</span>
                    </button>
                </div>
                <hr/>

                {mail ? (
                    <div className={"mail-info"}>
                        <h1 className={"mail-subject"}>{mail.subject}</h1>
                        <div className={"mail-delivery-info"}>
                            <span>{mail.headers.from}</span>
                            <span>{mail.date}</span>
                        </div>
                        <div>
                            {mail.html_body ? <div dangerouslySetInnerHTML={{ __html: mail.html_body }}></div> : mail.body}
                        </div>
                    </div>
                ) : (
                    <LoadingAnimation />
                )}
            </div>
        </div>
    );
};

export default MailView;
