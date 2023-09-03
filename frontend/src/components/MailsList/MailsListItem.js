import React from "react";

import {
  Link
} from "react-router-dom";

const MailsListItem = ({ mail }) => {
  let getTime = (date) => {
    return new Date(date).toLocaleDateString("pl", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  const formatMail = ( from ) => {
    if (from.includes("<") && from.includes(">")){
      if (from.includes("=?UTF-8?")){
        return from.match(/<([^>]+)>/).slice(1)
      }
      return from.slice(0, from.indexOf("<"))
    }
    return from
  }

  return (
    <Link to={`/mail/${mail.uid}`}>
      <div className="mail-list-items">
        <strong className="mail-info mail-from">{formatMail(mail.from)}</strong>
        <span className="mail-info">{mail.subject.length > 50 ? mail.subject.slice(0, 47) + "..." : mail.subject}</span>
        <span className="mail-list-date">{getTime(mail.date)}</span>
      </div>
    </Link>
  );
};

export default MailsListItem;
