# danjs
<h4>General</h4>
danjs is a library/API for making responsive web apps using VDOM management.  The API has functions for accessing the DOM, checking or adding and removing classes from html elements.  The API also includes a class for creating and managing a VDOM.  There are serveral examples provided in the repo to show off some of the use cases of danjs.

<h4>Functions</h4>
Most functions can be ignored as they are used by the VDOM class which will offload more work.  There are a few functions that can be used to create more responsive web page. The danAddClasses, danRemoveClasses, danHasClasses functions will help programmatically change css classes of elements in the DOM or VDOM.

<h4>Classes</h4>
The only class provided is the VDOM class, called Delement.  The Delement class will contain all of the html data output to the app, it has 1 constructor with 4 arguments (tagName, id, classes, text) and all element added to the VDOM must be a Delement.  The Delement class handles element ancestory, and provides functions for add and removing children.  Loading and unloading of VDOM data is also handled by the Delement object.

<h4>Usage</h4>
There are two ways of setting up a danjs app.  One way is to use the attach() function of a Delement, this will make your app render as a child of the body tag in html.  The other way is create the body tag as a Delement.  There are examples provided for a very simple hello world app for both use cases; helloWorld_attach.html and helloWorld_noattach.html.
