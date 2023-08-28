import React, { useState } from "react";
import {useNavigate} from "react-router-dom";
const SendMail = ({ showSidebar }) => {
    const navigate = useNavigate()

    const [sendTo, setSendTo] = useState([]);
    const [person, setPerson] = useState("")
    const [subject, setSubject] = useState("")
    const [body, setBody] = useState("")
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

    const send = async (e) => {
        e.preventDefault()
        console.log(sendTo)
        const response = await fetch("/send/",{
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body:JSON.stringify({
                "to_emails": sendTo,
                "subject": subject,
                "text": body
            })
        })
        if (response.status === 200){
            navigate("/SENT")
        }
        else {
            alert("Coś poszło nie tak")
        }
    }
    return (
        <div
            className={`mail-list-container ${
                showSidebar ? "small-sidebar small-send-page" : "normal-sidebar send-page" 
            }`}
        >
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
            <form onSubmit={(e) => send(e)} className={"email-body"}>
                <input onChange={(e) => setSubject(e.target.value) }
                       type={"text"} maxLength={1024} className={"subject"} placeholder={"Dodaj nagłówek"}/>
                <textarea onChange={(e) => setBody(e.target.value)} className={"email-body-text"} rows={25}></textarea>
                <input className={"email-body-button"} type={"submit"} value={"Wyślij"}/>
            </form>
        </div>

        </div>
    );
};

export default SendMail;
