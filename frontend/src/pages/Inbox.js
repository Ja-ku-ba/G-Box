import React, {useState, useEffect} from 'react'
import { useParams  } from "react-router-dom";

import InboxItem from '../components/InboxItem'
import HelpBar from '../components/HelpBar'

const Inbox = () => {
  let { filter } = useParams()
  console.log(filter)
  let [mails, setMails] = useState([])
  useEffect(() => {
      getMails()
  }, [])

  let getMails = async () => {
      let response = await fetch('/api/inbox/SEEN')
      let data = await response.json()
      setMails(data)
  }
  console.log(filter)
  return (      
    <div>
      <HelpBar />
      {mails.map((mail) => (
          <InboxItem key={mail.index} mail={mail} />
        ))}
    </div>
  )
}

export default Inbox
