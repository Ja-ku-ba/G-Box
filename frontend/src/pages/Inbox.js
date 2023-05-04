import React, {useState, useEffect} from 'react'

import InboxItem from '../components/InboxItem'

const Inbox = () => {
    let [mails, setMails] = useState([])
    useEffect(() => {
        getMails()
    }, [])

    let getMails = async () => {
        let response = await fetch('/api/inbox/All')
        let data = await response.json()
        setMails(data)
    }
  return (      
    <ol classname="list-group list-group-numbered">
      
      {mails.map((mail) => (
          <InboxItem key={mail.index} mail={mail} />
        ))}
    </ol>
  )
}

export default Inbox
