import React from 'react';
import { storiesOf } from '@storybook/react';
import withStyles from 'react-jss';
import { STORIES_NAME } from './constants';

import Image from '../image';
import ImageSource from '!!raw-loader!../image';
import defaultAvatar from '../images/avatar.png';

const ImageCusto = withStyles({
  yourCustom: {
    background: '#f5f5f5',
    border: '1px dashed #ccc',
    height: 200,
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
  }
})(({classes}) => {
  return (
    <Image
      alt="a blod default avatar"
      defaultSrc={defaultAvatar}
      src={require('../images/blog_icon.jpg')}
      className={classes.yourCustom}
    />
  )
});

storiesOf(STORIES_NAME, module)
  .add("Image", () => {
    return (
      <main>
        <h1 className="stories-h1">Case ::: no params - will show image default</h1>
        <Image />

        <h1 className="stories-h1">Case ::: </h1>
        <Image
          alt="avatar"
          src={require('../images/twitter_icon.jpg') || defaultAvatar}
          style={{width: 100}}
        />
        <Image
          alt="avatar"
          src={'../images/news_icon.jpg' || defaultAvatar}
          style={{width: 100}}
        />
        <Image
          alt="avatar"
          defaultSrc={defaultAvatar}
          src={'../images/missing_avatar.png'}
          style={{width: 100}}
        />
        <ImageCusto />
      </main>
    );
  },
    {
      notes: "😀 😎 👍 💯",
      source: ImageSource,
    }
  )
