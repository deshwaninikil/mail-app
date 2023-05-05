import { useContext } from "react";
import { useParams } from "react-router-dom";
import { MailContext } from "../context/MailContext";

export const MailDetail = () => {
  const { mailId } = useParams();
  const { mailState } = useContext(MailContext);
  const { allMail, spam, trash } = mailState;
  const filterDetail =
    allMail.find(({ mId }) => mId === mailId) ||
    spam.find(({ mId }) => mId === mailId) ||
    trash.find(({ mId }) => mId === mailId);
  const { mId, subject, content } = filterDetail;
  return (
    <>
      <h2>Details</h2>
      <div key={mId} className="mailDeatls">
        <h4>{subject}</h4>
        <p>{content}</p>
      </div>
    </>
  );
};
