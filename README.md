## Gettings started 

* On the root folder of project run the following command:
  * ```npm install```
* Run the following command:
  * ```npm run bootstrap```

## Development
* ```npm run storybook```
  * Go to the storybook and start developing there.
* For each packages eg. pizza, chicken
  * Go to `packages/{module}`

## Technical stacks
* nodejs 12
* yarn
* lerna
* webpack
* storybook
* reactjs
* redux
* jss (css in js)
* react router
* prettier (used with vscode)
* eslint (used with vscode)
* dockerfile (used for deploying frontend server)


## The code structure

This package use monorepos approach. Each frontend packages will be organized as below:

* /packages/sub1/src
  * /components ← presentation UI component, it should not contains any logic related to the data the business logic  
    Each component defined should come with attached stylesheet.  
    Use JSS for stylesheet
  * /containers ← stateful UI container, which orchestrating different components and connect to redux store  
    The business logic should be defined here
  * /redux ← manage the state of redux store
    * /store.js ← master store should be defined here including the middleware of redux
    * /**.js ← more sub state setup defined here
      We would follow the Ducks setup. You can check more [reference here](https://redux.js.org/faq/code-structure#what-should-my-file-structure-look-like-how-should-i-group-my-action-creators-and-reducers-in-my-project-where-should-my-selectors-go)
  * /util ←  utility files with supportive functions
  * /app.js ← the root app
* /packages/shared/src
  * This is where we promote the common components into this module. Those components should be mature enough to be used across difference packages

## How the product would be built

* The source code would be built by the [Webpack](https://webpack.js.org/).
  * The webpack build configuration can be access on `./webpack.config.js`
  * You can run `yarn run build`, check the generated folder `build-assets` to see the final assets of the build
* The deployment pipeline is setup by devops but you can read the `./Dockerfile` to understand how the container is built
  * **Note**: you need to check with pipeline setup by devops for the correct and up-to-date build steps.

