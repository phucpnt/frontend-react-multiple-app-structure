import { configure } from '@storybook/react';

// automatically import all files ending in *.stories.js
const reqSub1 = require.context('../packages/sub1', true, /\.stories\.js$/);
function loadStories() {
  reqSub1.keys().forEach((filename) => {
    reqSub1(filename);
  });

  // reqShared.keys().forEach((filename) => reqShared(filename));
}

configure(loadStories, module);
