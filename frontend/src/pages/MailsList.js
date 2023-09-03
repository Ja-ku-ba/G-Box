import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import MailsListItem from "../components/MailsList/MailsListItem";
import LoadingAnimation from "../components/LoadingAnimation";
const MailsList = ({ showSidebar }) => {
  const [mails, setMails] = useState([]);
  const [loaded, setLoaded] = useState(false)
  const {filter} = useParams()

  const getMails = async () => {
    console.log(filter)
    try {
      let query = window.location.search
      let response

      // if there is no filters from user, other than catalog
      if (query.length !== 0){
        response = await fetch(`/inbox/${filter}/results=${query}`);
      }
      else{
        response = await fetch(`/inbox/${filter}`);
      }
      
      const data = await response.json();
      setMails(data);
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
                  <MailsListItem key={mail.uid} mail={mail} />
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
