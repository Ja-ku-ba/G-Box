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

  let getBody = (body) => {
    if (body.length > 50) {
      return `${body.slice(0, 47)}...`
    }
    return body
  }

  let getDate = (date) => {
    return date.slice(5, 21)
  }

  return (
    <ol className="list-group list-group-numbered inbox-list">
      <Link to={`mail/${mail.form}/${mail.date}`} style={{ textDecoration: 'none' }}>
          <li className="list-group-item d-flex justify-content-between align-items-start inbox-list-box">
              <div className="ms-2 me-auto">
                <div className="fw-bold">{getFrom(mail.from)}</div>
                {getBody(mail.body)}
              </div>
              <span>{getDate(mail.date)}</span>
          </li>
      </Link>
    </ol>
  )
}

export default InboxList