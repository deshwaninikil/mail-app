import { useContext } from "react";
import { MailContext } from "../context/MailContext";
import { Link } from "react-router-dom";

export const Trash = () => {
  const { mailState, mailDispatch } = useContext(MailContext);
  const { trash } = mailState;
  return (
    <>
      <h1>Trash</h1>
      <ul>
        {trash.length === 0 ? (
          <h3 className="trashMailBtn">Nothing In Trash</h3>
        ) : (
          trash.map(({ mId, subject, content }) => (
            <>
              <li key={mId} className="mailContent">
                <h4>{subject}</h4>
                <p className="commonPara">{content}</p>
                <div className="mailDetails">
                  <Link to={`/maildetail/${mId}`} className="viewDetail">
                    View Details
                  </Link>
                  <button
                    className="trashMailBtn"
                    onClick={() =>
                      mailDispatch({ type: "restoreTrashMail", payload: mId })
                    }
                  >
                    Restore
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
