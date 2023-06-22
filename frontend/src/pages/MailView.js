import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const MailView = () => {
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

    return (
        <div>
            {mail ? <h1>{mail.date}</h1> : <h1>Loading mail...</h1>}
        </div>
    );
};

export default MailView;
