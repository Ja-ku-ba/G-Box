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

    const getDate = () => {

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

            {mail ? (
                <div>
                    <h1>{mail.subject}</h1>
                    <div>
                        <span>{mail.from}</span>
                        <span>{mail.date}</span>
                    </div>
                    <div>
                        {mail.html_body ? <div dangerouslySetInnerHTML={{ __html: mail.html_body }}></div> : mail.body}
                    </div>
                </div>
            ) : (
                <h1>Loading mail...</h1>
            )}
        </div>

    );
};

export default MailView;
