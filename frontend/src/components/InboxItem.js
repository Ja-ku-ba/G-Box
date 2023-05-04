import React from 'react'

import { Link } from 'react-router-dom'

import Mail from '../pages/Mail'

const InboxList = ({mail}) => {
  return (
    <Link to={`mail/${mail.date}/${mail.date}`}>
        <li class="list-group-item d-flex justify-content-between align-items-start">
            <div class="ms-2 me-auto">
            <div class="fw-bold">{mail.index}</div>
            {mail.date}
            </div>
            <span class="badge bg-primary rounded-pill">{mail.date}</span>
        </li>
    </Link>
  )
}

export default InboxList
