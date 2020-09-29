import React, { Component } from "react"; // eslint-disable-line
import moment from "moment";
import PropTypes from "prop-types";
import injectStyle from 'react-jss';
import Image from 'shared/common/image';
import styles from "./MessageItem.style";
import defaultAvatar from "./avatar.png";
import Tooltip from "shared/common/tooltip";
import IconBlog from "shared/assets/icon-blog.svg";
import IconNews from "shared/assets/icon-news.svg";
import IconTwitter from "shared/assets/icon-twitter.svg";
import IconReply from "shared/assets/icon-reply.svg";
import IconLike from "shared/assets/icon-like.svg";
import IconRetweet from "shared/assets/icon-retweet.svg";
import IconInfoInactive from "shared/assets/icon-info-inactive.svg";

const MessageItem = ({ classes, message }) => {
  let messageIcon = '';
  switch(message.channel) {
    case 'twitter': {
      messageIcon = IconTwitter;
      break;
    }
    case 'blogs': {
      messageIcon = IconBlog;
      break;
    }
    case 'news': {
      messageIcon = IconNews;
      break;
    }
  }

  const renderMessage = (message) => {
    return (
      <article className={classes.msgItem}>
        <div className={classes.msgItemLeft}>
          <a target="_blank" href={message.url}>
            <Image
              imgKlass={classes.imgThumbnail}
              alt="avatar"
              defaultSrc={defaultAvatar}
              src={(message.publisher.avatarUrl === null || !message.publisher.avatarUrl)
                ? defaultAvatar
              : message.publisher.avatarUrl} />
          </a>
        </div>
        <div className={classes.msgItemMain}>
          <div className={classes.msgHeadline}>
            <a target="_blank" href={message.url}>
              <p className={classes.title}>{message.publisher.displayName}</p>
            </a>
            {
              message.channel === 'twitter' && (
                <a target="_blank" href={message.url}>
                  <p className={classes.subTitle}>@{message.publisher.screenName}</p>
                </a>
              )
            }
            {
              message.channel === 'news' && (
                <p className={classes.msgDate}>
                  {moment.utc(message.createdAt).format("HH:mm A DD MMMM YYYY")}
                </p>
              )
            }
            <span className={classes.msgIcon} style={{backgroundImage: `url(${messageIcon})`}}/>
            
            {/* <Tooltip position="left" offset={{top: 10, left: -220}}>
              <span className={classes.msgIcon} style={{backgroundImage: `url(${messageIcon})`}}/>
              <div className={classes.tooltipContainer}>
                <p className={classes.tooltipTitle}>News</p>
                <p className={classes.tooltipContent}>News range from the reliable source  focus on one narrow subject or a whole range of subjects.</p>
              </div>
            </Tooltip> */}
          </div>
          <a className={classes.msgUrl} target="_blank" href={message.url}>
            <span
              className={classes.msgCt}
              dangerouslySetInnerHTML={{
                __html: message.contentHtml || message.content
              }}
            />
          </a>
          <div className={classes.msgFooter}>
            {
              message.channel === 'twitter' && renderTwitterButtons(message)
            }
            {
              message.channel !== 'news' && (
                <p className={classes.msgDate}>
                  {moment.utc(message.createdAt).format("DD MMMM YYYY")}
                </p>
              )
            }
          </div>
        </div>
      </article>
    )
  }

  const renderTwitterButtons = (message) => {

    let url = message.url;
    console.assert(url && typeof url === 'string', 'tweet does not having url', message);

    if(!url){
      return (<div className={classes.footerIconList}></div>);
    }

    let tweetId = url.split('/').slice(-1)[0];
    return (
      <div  className={classes.footerIconList}>
        <a 
          className={classes.footerIcon} 
          style={{backgroundImage: `url(${IconReply})`}} 
          target="_blank" 
          href={`https://twitter.com/intent/tweet?in_reply_to=${tweetId}`}></a>
        <a 
          className={classes.footerIcon} 
          style={{backgroundImage: `url(${IconRetweet})`}} 
          target="_blank" 
          href={`https://twitter.com/intent/retweet?tweet_id=${tweetId}`}></a>
        <a 
          className={classes.footerIcon} 
          style={{backgroundImage: `url(${IconLike})`}} 
          target="_blank" 
            href={`https://twitter.com/intent/favorite?tweet_id=${tweetId}`}></a>
      </div>
    );
  }

  return (
    <div className={classes.msgItemWrapper}>
      <div className={classes.msgItemHeader}>
        <Tooltip>
          <div className={classes.msgItemInfluenceScoreWrapper}>
            <span className={classes.msgItemInfluenceScore}>
              {message.influencerScore}
            </span>
            <span 
              className={classes.infoIcon} 
              style={{backgroundImage: `url(${IconInfoInactive})`}}></span>
          </div>
          <div className={classes.tooltipContainer}>
            <p className={classes.tooltipTitle}>Influencer Score</p>
            <p className={classes.tooltipContent}>A score on a scale from 0 to 100 that measures the level of influence an influencer has when mentioning a particular asset.</p>
          </div>
        </Tooltip>
      </div>
      {renderMessage(message)}
    </div>
  );
}

MessageItem.propTypes = {
  classes: PropTypes.object,
  message: PropTypes.object
};

MessageItem.defaultProps = {
  message: {
    channel: "twitter",
    createdAt: "2018-11-19T14:36:32Z",
    title: "",
    content:
      "Welcome to the week: stocks opened slightly lower this morning, as declines in Apple and semiconductor shares dragg… https://t.co/8FukGtseVG",
    publishedAt: "2018-11-19T14:36:32Z",
    lang: "en",
    url: "http://twitter.com/CNBC/status/1064527853881053184",
    publisher: {
      snsName: "tw",
      snsId: "20402945",
      avatarUrl:
        "https://pbs.twimg.com/profile_images/875399584477962241/CsazvyAF_400x400.jpg",
      displayName: "CNBC",
      screenName: "CNBC"
    },
    id: "5bf2ca7da09487009726efa2",
    contentHtml:
      'Welcome to the week: stocks opened slightly lower this morning, as declines in Apple and semiconductor shares dragg… <a href="https://twitter.com/i/web/status/1064527853881053184" rel="nofollow" target="_blank">twitter.com/i/web/status/1…</a>',
    influencerScore: 97.69400024414062
  }
};

export default injectStyle(styles)(MessageItem);
