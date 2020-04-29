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

###Glimpse of  organism model
_Organism < compounds < components < molecules < atoms_

* Organism = app
* Compound = sub-app
* Components = Collection of components
* molecules = Collection of molecules build a component
* atoms = Collection of atoms build a molecule

```It is ideal to have components set page wise or container-wise(if there are too many UI components in a view/page)```
``This means we divide our app into multiple sub-apps i.e following organism model to some extent.``
 
For example, Landing page will be a sub-app,
```
src->components->landingPage --|
                               |_ LandingPageView.component.jsx
                               |_ SignInUp.jsx
                               |_ Authenticator.jsx
                               
```                
## Progressive Web App(PWA)
Following two things are very important to convert a Web App into PWA:
* ServiceWorker - Runs as separate thread in the background to offer functionalities of a native mobile app. 
* PWA Manifest - The web app manifest is a JSON file that tells the browser about your Progressive Web App and how it should behave when installed on the user's desktop or mobile device

Files Associated:
* ServiceWorker (Tool used: Workbox):
```
  src --|
        |_ serviceWoker.js
        |_ sw-build.js
        |_ sw-custom.js
                               
``` 
* Manifest:
```$xslt
  public --|
           |_ manifest.json

```

To Test ServiceWorker : (localhost:5000)
```$xslt
$ npm run build
$ npx serve build
```


                        



