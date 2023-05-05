import * as React from "react";
import { useContext } from "react";
import { MailContext } from "../context/MailContext";
import { Link } from "react-router-dom";
import { useCurrentMail } from "../hooks/currentMailHook";

export const Inbox = () => {
  const { mailState, mailDispatch, UnreadMessage } = useContext(MailContext);
  const { allMail, unReadValue, isStarredValue } = mailState;

  const currentMails = useCurrentMail(allMail, unReadValue, isStarredValue);

  return (
    <>
      <h1>Mail Box</h1>
      <fieldset className="filterBox">
        <legend>Filters</legend>
        <label>
          <input
            type="checkbox"
            onChange={() =>
              mailDispatch({ type: "showUnreadMail", payload: !unReadValue })
            }
            value={unReadValue}
          />
          Show Unread Mails
        </label>
        <label>
          <input
            type="checkbox"
            onChange={() =>
              mailDispatch({ type: "starredMail", payload: !isStarredValue })
            }
            value={isStarredValue}
          />
          Show Starred Mails
        </label>
      </fieldset>
      <h2 className="unreadHeading">Unread:{UnreadMessage}</h2>
      <ul>
        {currentMails.map(({ mId, subject, content, unread, isStarred }) => (
          <React.Fragment key={mId}>
            <li className="mailContent">
              <div className="inboxContent">
                <h4>{subject}</h4>
                <button
                  onClick={() =>
                    mailDispatch({ type: "isStarred", payload: mId })
                  }
                >
                  {/* {isStarred ? "UnStarred" : "Starred"} */}
                  <i
                    style={{
                      color: isStarred
                        ? "rgb(253, 213, 15)"
                        : "rgb(198, 193, 193)",
                    }}
                    class="fa-solid fa-star fa-lg"
                  ></i>
                </button>
              </div>

              <p className="commonPara">{content}</p>
              <div className="mailDetails">
                <Link to={`/maildetail/${mId}`} className="viewDetail">
                  View Details
                </Link>
                <div className="mailBtn">
                  <button
                    className="trashMailBtn"
                    onClick={() =>
                      mailDispatch({ type: "trashMail", payload: mId })
                    }
                  >
                    <i class="fa-solid fa-trash-can"></i>
                  </button>
                  <button
                    className="markReadBtn"
                    onClick={() =>
                      mailDispatch({ type: "unreadMail", payload: mId })
                    }
                  >
                    {unread ? "Mark as Read" : "Mark as unread"}
                  </button>
                  <button
                    className="reportSpamBtn"
                    onClick={() =>
                      mailDispatch({ type: "spamMail", payload: mId })
                    }
                  >
                    Report Spam
                  </button>
                </div>
              </div>
            </li>
            <hr />
          </React.Fragment>
        ))}
      </ul>
    </>
  );
};
