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

    const deleteFromList = (person) => {
        setSendTo(sendTo.filter((e) => e !== person))
    }

    return (
        <div className="send-mail-nav">
            <ul>
                {sendTo.map((person, index) => (
                    <li key={index}>
                        <span>{person}</span>
                        <i onClick={() => deleteFromList(person)} className={"delete-person"}></i>
                    </li>
                ))}
            </ul>
            <form className={"add-receivers"} onSubmit={handleSubmit}>
                <input className={"add-receivers-input"} type="email" id="toMail"
                       onChange={(e) => setPerson(e.target.value)} placeholder={"Dodaj odbiorców"}/>
                <input className={"add-receivers-submit"} type="submit" value="Dodaj" />
            </form>
            <form className={"email-body"}>
                <textarea rows={25}></textarea>
                <input type={"submit"} value={"Wyślij"}/>
            </form>
        </div>
    );
};

export default SendMailDetails;
