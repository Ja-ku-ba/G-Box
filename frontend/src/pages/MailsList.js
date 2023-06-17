import React, { useState, useEffect } from "react";
import MailsListItem from "../components/MailsList/MailsListItem";

const MailsList = ({ showSidebar }) => {
  const [mails, setMails] = useState([]);

  useEffect(() => {
    getMails();
  }, []);

  const getMails = async () => {
    try {
      const response = await fetch("/inbox/ALL");
      const data = await response.json();
      setMails(data.reverse());
    } catch (error) {
      console.error("Error fetching mails:", error);
    }
  };

  return (
      <div
          className={`mail-list-container Mailslist ${
              showSidebar ? "small-sidebar" : "normal-sidebar"
          }`}
      >
        {mails.map((mail) => (
            <MailsListItem key={mail.index} mail={mail} />
        ))}
      </div>
  );
};

export default MailsList;
