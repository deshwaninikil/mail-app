export const useCurrentMail = (allMail, unReadValue, isStarredValue) => {
  let currentMails = allMail;
  if (unReadValue) currentMails = currentMails.filter((mail) => mail.unread);
  if (isStarredValue)
    currentMails = currentMails.filter((mail) => mail.isStarred);
  return currentMails;
};
