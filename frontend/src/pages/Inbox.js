import React from 'react'
import InboxList from '../components/InboxList'

const Inbox = () => {
  return (
    <div>
      {notes.map((mail, index) => (
        <InboxList key={index} mail={mail} ></InboxList>
      ))}
    </div>
  )
}

export default Inbox
