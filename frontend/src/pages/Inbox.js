import React, {useState, useEffect} from 'react'

const Inbox = () => {
    let [mails, setMails] = useState([])
    useEffect(() => {
        getMails()
    }, [])

    let getMails = async () => {
        let response = await fetch("inbox/all/")
        let data = await response.json()
        setMails(data)
    }
    console.log(mails)
  return (
    <div>
    <h2>okej</h2>
    </div>
  )
}

export default Inbox
