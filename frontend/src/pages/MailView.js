import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import arrowLeft from "../assets/arrowLeft.svg"
import trashBin from "../assets/trashBin.svg";
import archiveIcon from "../assets/archiveIcon.svg";

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
        var newDate = new Date(date);
        var day = newDate.getDay()
        if (`${day}`.length < 2){
            day = "0" + day
        }
        var month = newDate.getMonth()
        if (`${month}`.length < 2){
            month = "0" + month
        }
        var year = newDate.getFullYear()
        var time = `${newDate.getHours()}:${newDate.getMinutes()}`
        return `${time} ${day}.${month}.${year}`
    }

    const getEmail = () => {

    }

    return (
        <div className={`mail-view-container ${showSidebar ? "small-sidebar" : "normal-sidebar"}`}>
            <div className="mail-nav">
                <button type="button">
                    <img src={arrowLeft} alt="ArrowLeft" className="mail-nav-icons" height="20px" width="20px" />
                </button>
                <button type="button">
                    <img src={trashBin} alt="ArchiveIcon" className="mail-nav-icons" height="20px" width="20px" />
                </button>
                <button type="button">
                    <img src={archiveIcon} alt="TrashBin" className="mail-nav-icons" height="20px" width="20px" />
                </button>
            </div>
            <hr/>

            <div>
                {mail ? (
                    <div className={"mail-info"}>
                        <h1 className={"mail-subject"}>{mail.subject}</h1>
                        <div className={"mail-delivery-info"}>
                            <span>{mail.from}</span>
                            <span>{getDate(mail.date)}</span>
                        </div>
                        <div>
                            {mail.html_body ? <div dangerouslySetInnerHTML={{ __html: mail.html_body }}></div> : mail.body}
                        </div>
                    </div>
                ) : (
                    <h1>Loading mail...</h1>
                )}
            </div>
        </div>
    );
};

export default MailView;
