## Project structure

* /components  

  This folder would contains presentation UI component, it should not contains any logic related to the data the business logic  
  Each component defined should come with attached stylesheet.  
  Use JSS for stylesheet  
* /containers  

  this folder contains stateful UI container, which orchestrating different components and connect to redux store  
  the business logic should be defined here

* /redux  

  This folder contains sub reducer file manage the state of redux store
  * /store.js would define the store for whole app

## Creating a component

* Start with creating a Component UI
* The UI would define `props` to receiving the data from parent component
  * Input = The UI would consume the data and render the data correctly
  * Output = The UI would allow binding event handle to parent component
* Decide if the Component should connect to store
  * When a component would connect to store consider adding `Container wrapper` to the `Component UI`

