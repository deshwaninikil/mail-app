import { createContext, useReducer } from "react";
import { mails } from "../Data/Mail";

export const MailContext = createContext();

export const MailProvider = ({ children }) => {
  const reducerFunction = (mailState, action) => {
    const { type, payload } = action;
    switch (type) {
      case "unreadMail":
        return {
          ...mailState,
          allMail: mailState.allMail.map((mail) =>
            mail.mId === payload ? { ...mail, unread: !mail.unread } : mail
          ),
        };
      case "spamMail":
        return {
          ...mailState,
          allMail: mailState.allMail.filter(({ mId }) => mId !== payload),
          spam: [
            ...mailState.spam,
            mailState.allMail.find(({ mId }) => mId === payload),
          ],
        };
      case "notSpamMail":
        return {
          ...mailState,
          spam: mailState.spam.filter(({ mId }) => mId !== payload),
          allMail: [
            ...mailState.allMail,
            mailState.spam.find(({ mId }) => mId === payload),
          ],
        };
      case "trashMail":
        return {
          ...mailState,
          allMail: mailState.allMail.filter(({ mId }) => mId !== payload),
          trash: [
            ...mailState.trash,
            mailState.allMail.find(({ mId }) => mId === payload),
          ],
        };
      case "restoreTrashMail":
        return {
          ...mailState,
          trash: mailState.trash.filter(({ mId }) => mId !== payload),
          allMail: [
            ...mailState.allMail,
            mailState.trash.find(({ mId }) => mId === payload),
          ],
        };
      case "isStarred":
        return {
          ...mailState,
          allMail: mailState.allMail.map((mail) =>
            mail.mId === payload
              ? { ...mail, isStarred: !mail.isStarred }
              : mail
          ),
        };
      case "showUnreadMail":
        return {
          ...mailState,
          unReadValue: payload,
        };
      case "starredMail":
        return {
          ...mailState,
          isStarredValue: payload,
        };
      default:
        return mailState;
    }
  };
  const initialState = {
    allMail: mails,
    spam: [],
    trash: [],
    unReadValue: false,
    isStarredValue: false,
  };
  const [mailState, mailDispatch] = useReducer(reducerFunction, initialState);
  const { allMail, spam, trash } = mailState;
  const UnreadMessage = allMail.reduce(
    (acc, curr) => (curr.unread ? acc + 1 : acc),
    0
  );

  console.log("UnreadMessage", allMail);
  return (
    <>
      <MailContext.Provider value={{ mailState, mailDispatch, UnreadMessage }}>
        {children}
      </MailContext.Provider>
    </>
  );
};
