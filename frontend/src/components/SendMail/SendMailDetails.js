import React, { useState } from "react";

const SendMailDetails = () => {
    const [sendTo, setSendTo] = useState([]);
    const [person, setPerson] = useState("")
    const handleSubmit = (e) => {
        e.preventDefault();
        if (sendTo.includes(person)){
            alert("Ten mail już został dodany")
        }
        else if (person !== ""){
            setSendTo((prevSendTo) => [...prevSendTo, person]);
        }
        e.target.reset();
    };

    return (
        <div className="send-mail-nav">
            <ul>
                {sendTo.map((person, index) => (
                    <li key={index}>
                        <span>{person}</span>
                        <i className={"delete-person"}></i>
                    </li>
                ))}
            </ul>
            <form onSubmit={handleSubmit}>
                <input type="email" id="toMail" onChange={(e) => setPerson(e.target.value)}/>
                <input type="submit" value="Dodaj" />
            </form>
        </div>
    );
};

export default SendMailDetails;
