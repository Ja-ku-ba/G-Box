import React from 'react'

import { Link } from 'react-router-dom'

const InboxList = ({mail}) => {
  let getFrom = (subject) => {
    if (subject.slice(0, 2) != "=?") {
      return subject.match(/^(.*?)(?=\s?<|$)/)[1]
    }
    return subject.match(/([a-z0-9_\.\-])+\@(([a-z0-9\-])+\.)+([a-z0-9]{2,4})+/i)[0]
  }
  let getTime = (date) => {
    return new Date(date.updated).toLocaleDateString()
  }

  return (
    <ol className="list-group list-group-numbered">
      <Link to={`mail/${mail.form}/${mail.date}`}>
          <li className="list-group-item d-flex justify-content-between align-items-start">
              <div className="ms-2 me-auto">
                <div className="fw-bold">{getFrom(mail.from)}</div>
              </div>
              <span className="badge bg-primary rounded-pill">{typeof mail.date}</span>
          </li>
      </Link>
    </ol>
  )
}

export default InboxList