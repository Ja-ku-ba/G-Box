import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import MailsListItem from "../components/MailsList/MailsListItem";
import LoadingAnimation from "../components/LoadingAnimation";
const MailsList = ({ showSidebar }) => {
  const { filter, query } = useParams();
  const [mails, setMails] = useState([]);
  const [loaded, setLoaded] = useState(false)
  
  const getMails = async () => {
    try {
      const response = await fetch(`/inbox/${filter}/${encodeURIComponent(query)}`);
      const data = await response.json();
      setMails(data.reverse());
      setLoaded(true);
    } catch (error) {
      alert(`Error fetching mails: ${error}`);
    }
  };
  
  useEffect(() => {
    getMails();
  }, []);

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
        ) : !loaded ? 
          (
              <LoadingAnimation />
          ) :

          <span className="no-content-msg">Nie masz żadnych wiadomości</span>

       }
      </div>
  );
};

export default MailsList;
