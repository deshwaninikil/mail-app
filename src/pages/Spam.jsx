import { useContext } from "react";
import { MailContext } from "../context/MailContext";
import { Link } from "react-router-dom";

export const Spam = () => {
  const { mailState, mailDispatch } = useContext(MailContext);
  const { spam } = mailState;

  return (
    <>
      <h1>Spam Folder</h1>
      <ul>
        {spam.length === 0 ? (
          <h3 className="trashMailBtn">No Spam Messages</h3>
        ) : (
          spam.map(({ mId, subject, content }) => (
            <>
              <li key={mId - content} className="mailContent">
                <h4>{subject}</h4>
                <p className="commonPara">{content}</p>
                <div className="mailDetails">
                  <Link to={`/maildetail/${mId}`} className="viewDetail">
                    View Details
                  </Link>
                  <button
                    className="reportSpamBtn"
                    onClick={() =>
                      mailDispatch({ type: "notSpamMail", payload: mId })
                    }
                  >
                    Not Spam
                  </button>
                </div>
              </li>
              <hr />
            </>
          ))
        )}
      </ul>
    </>
  );
};
