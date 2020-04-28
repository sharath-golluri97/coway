# Coway
Coway client side services(UI)

## Project File structure
Follow these guidelines for developing custom components
* **Strictly use only functional components and ES6/7 scripting.**
* Path: src/components/<componentname>
* Create separate folder a custom component if and only if needed.
* File format: <componentname>.component.jsx
* Each component will have its own .scss file with format <componentname>.scss
* Similar methodology for commons too.
* Have all the API calls and responses fetched from APICalls.commons.js file.

```It is ideal to have components set page wise or container-wise(if there are too many UI components in a view/page)```
``This means we divide our app into multiple sub-apps i.e following organism model to some extent.``
 
For example, Landing page will be a sub-app,
```
src->components->landingPage --|
                               |_ LandingPageView.component.jsx
                               |_ SignInUp.jsx
                               |_Authenticator.jsx```
                               
                
    





