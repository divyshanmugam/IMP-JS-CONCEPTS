import { Trans } from "@lingui/react/macro";

export default function Inbox() {
  const messages = [{}, {}];
  const messagesCount = messages.length;
  const lastLogin = new Date();
  const markAsRead = () => {
    alert("Marked as read.");
  };

  return (
    <div>
      <h1><Trans>Message Inbox</Trans></h1>

      <p>
        See all <a href="/unread">unread messages</a>
        {" or "}
        <a onClick={markAsRead}>mark them</a> as read.
      </p>

      <p>
        {messagesCount === 1
          ? `There's ${messagesCount} message in your inbox.`
          : `There are ${messagesCount} messages in your inbox.`}
      </p>

      <footer>Last login on {lastLogin.toLocaleDateString()}.</footer>
    </div>
  );
}