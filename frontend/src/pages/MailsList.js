import React, { useState, useEffect } from "react";

import {Link} from "react-router-dom";

import MailsListItem from "../components/MailsList/MailsListItem";
import LoadingAnimation from "../components/LoadingAnimation";
import newMailIcon from "../assets/newMailIcon.svg"

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
          className={`mail-list-container ${
              showSidebar ? "small-sidebar" : "normal-sidebar"
          }`}
      >
        {mails.length > 0 ? (
            <div className={"round-corners"}>
              {mails.map((mail) => (

                  <MailsListItem key={mail.index} mail={mail} />
              ))}
            </div>
        ) : (
            <LoadingAnimation />
        )}
        <Link to={"/send/"}>
          <img src={newMailIcon} alt="Send mail" className="add-new-mail" height="75px" width="75px" />
        </Link>
      </div>
  );
};

export default MailsList;
