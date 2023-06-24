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
        if (id === 'new') return;
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

    const getDate = (date) => {
        const newDate = new Date(date);
        const day = newDate.getDate().toString().padStart(2, '0');
        const month = (newDate.getMonth() + 1).toString().padStart(2, '0');
        const year = newDate.getFullYear();
        const time = `${newDate.getHours()}:${newDate.getMinutes()}`;
        return `${time} ${day}.${month}.${year}`;
    };

    const getSubject = (subject) => {
        const encodedHeader = subject.replace(/\?=/g, '').replace(/=\?UTF-8\?Q\?/g, '');
        return encodedHeader.replace(/=([A-F0-9]{2})/g, (_, hex) => String.fromCharCode(parseInt(hex, 16)));
    };

    const getProperFormat = (data) => {
        return decodeURIComponent(data.replace(/=([a-fA-F0-9]{2})/g));
    };

    return (
        <div className={`mail-view-container ${showSidebar ? "small-sidebar" : "normal-sidebar"}`}>
            <div className="mail-nav">
                <Link to={"/"}>
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
                    <h1 className={"mail-subject"}>{getSubject(mail.subject)}</h1>
                    <div className={"mail-delivery-info"}>
                        <span>{getProperFormat(mail.from)}</span>
                        <span>{getDate(mail.date)}</span>
                    </div>
                    <div>
                        {mail.html_body ? <div dangerouslySetInnerHTML={{ __html: mail.html_body }}></div> : mail.body}
                    </div>
                </div>
            ) : (
                <LoadingAnimation />
            )}
        </div>
    );
};

export default MailView;
