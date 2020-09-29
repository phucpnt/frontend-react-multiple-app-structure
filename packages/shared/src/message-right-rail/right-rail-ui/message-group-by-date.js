import React from "react";
import MessageItem from "./MessageItem";
import moment from "moment";

export function MessageGroupByDate({ classes, messages: orderedMessages, loading }) {
  let currentDate = null;
  const groupedMessages = orderedMessages.reduce((accum, msg) => {
    const mDate = moment.utc(msg.publishedAt);
    if (mDate.isSame(currentDate, "day")) {
      accum[accum.length - 1].messages.push(msg);
    } else {
      accum.push({ date: mDate, messages: [msg] });
    }
    currentDate = mDate;
    return accum;
  }, []);

  if (!loading &&
    (!groupedMessages || (Array.isArray(groupedMessages) && groupedMessages.length <= 0))) {
    return (
      <div className={classes.messagesList}>
        <span className={classes.noMessages}>No messages found</span>
      </div>
    )
  }

  return (
    <div className={classes.messagesList}>
      {groupedMessages.map(({ date, messages }) => (
        <div style={{marginBottom: '1em'}} key={date.toISOString()}>
          <h4 className={classes.messagesTitle}>
            {date.format('DD MMMM YYYY')} •&nbsp;
            <span className={classes.fontLight}>{messages.length} Messages</span>
          </h4>
          <div>
            {messages &&
              messages.map(item => (
                <MessageItem key={item.id} message={item} />
              ))}
          </div>
        </div>
      ))}
    </div>
  );
}
