import { React, useState } from 'react'
import { useNavigate } from "react-router-dom";

const Send = () => {
    let [sendTo, setSendTo] = useState('')
    let [subject, setSubject] = useState('')
    let [text, setText] = useState('')
    let navigate = useNavigate()

    let sendMail = () => {
        if (sendTo === '' || text === '' || subject === '') {
            return window.alert("Musisz wprowadzić odbiorców, temat i treść wiadomości.")
        }

        let requestBody = {
            to_emails: sendTo,
            subject: subject,
            text: text
        }

        fetch(`/api/send/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(requestBody)
        })
        
        navigate('/inbox/all')
    }

  return (
    <div className="mb-3 inbox-list send">
        <div className='send-element'>
            <label htmlFor="exampleFormControlInput1" className="form-label recievers-label">Odbiorca/y</label>
            <input type="email" className="form-control" id="exampleFormControlInput1" value={sendTo}
            onChange={(e) => setSendTo(e.target.value)} placeholder='mail@przyklad.com, imie@nazwa.pl'></input>
        </div>

        <div className='send-element'>
            <label htmlFor="exampleFormControlInput2" className="form-label recievers-label">Nagłowek</label>
            <input type="email" className="form-control" id="exampleFormControlInput2" value={subject}
                   onChange={(e) => setSubject(e.target.value)}></input>
        </div>

        <div className='send-element'>
            <label htmlFor="exampleFormControlTextarea1" className="form-label">Treść wiadomości</label>
            <textarea className="form-control" id="exampleFormControlTextarea1" rows="3" value={text}
            onChange={(e) => setText((e.target.value))}></textarea>
        </div>

        <div className='send-element'>
            <label htmlFor="formFileMultiple" className="form-label">Załącz pliki</label>
            <input className="form-control" type="file" id="formFileMultiple" multiple></input>
        </div>
        <div className='send-element'>
            <button type="submit" className="btn" onClick={sendMail}>Wyslij</button>
        </div>
    </div>
  )
}

export default Send


// to_emails=data.to_emails, subject=data.subject, text=data.text