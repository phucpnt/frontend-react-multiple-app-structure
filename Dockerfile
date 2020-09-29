## BUILD THE ASSETS
FROM node:12 as build-deps
LABEL maintainer="phucpnt<phuc.phan@sentifi.com>"

RUN npm install -g lerna@3.13.2
RUN npm install

ADD . /proj
RUN mkdir ./build-assets

WORKDIR /proj
RUN lerna bootstrap

RUN cd ./packages/login && rm -f ./.env

## generate the buildNumber.
## this buildNumber is required for forcing reloading frontend assets on user browser.
RUN echo "$(date +'%F %T %Z')" > buildNumber && cat buildNumber
RUN REACT_APP_BUILD_NUMBER="$(cat buildNumber)" npx yarn run build:next

RUN cd ./packages/server && npm install && cd ../..

### copy the final built assets

# write the build number for force client reload assets in browser
RUN echo "{\"buildNumber\":\"$(cat buildNumber)\"}" > version.json && \ 
    cp version.json ./build-assets/sub1 && \ 
    cp version.json ./build-assets/sub2

## RUN THE SERVER
FROM node:12

ADD ./packages/server /proj
COPY --from=build-deps /proj/build-assets /proj/public

WORKDIR /proj
RUN npm install

EXPOSE 8030

ENV NODE_ENV qa
CMD node index.js
