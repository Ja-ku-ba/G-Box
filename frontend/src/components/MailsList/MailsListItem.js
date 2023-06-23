import React from "react";

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";

const MailsListItem = ({ mail }) => {
  let getFrom = (subject) => {
    if (subject.slice(0, 2) !== "=?") {
      return subject.match(/^(.*?)(?=\s?<|$)/)[1];
    }
    return subject.match(
      /([a-z0-9_\.\-])+\@(([a-z0-9\-])+\.)+([a-z0-9]{2,4})+/i
    )[0];
  };
  let getTime = (date) => {
    return new Date(date.updated).toLocaleDateString();
  };

  let getBody = (body) => {
    const encodedHeader = body.replace(/\?=/g, '').replace(/=\?UTF-8\?Q\?/g, '');
    body = encodedHeader.replace(/=([A-F0-9]{2})/g, (_, hex) => String.fromCharCode(parseInt(hex, 16)));
    if (body.length > 50) {
      return `${body.slice(0, 47)}...`;
    }
    return body;
  };

  let getDate = (date) => {
    return date.slice(5, 21);
  };

  const getSubject = (subject) => {
  };

  return (
    <Link to={`/mail/${mail.index}`}>
      <div className="mail-list-items">
        <strong className="mail-info mail-from">{getFrom(mail.from)}</strong>
        <span className="mail-info">{getBody(mail.subject)}</span>
        <span className="mail-list-date">{getDate(mail.date)}</span>
      </div>
    </Link>
  );
};

export default MailsListItem;
