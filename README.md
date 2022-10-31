# danjs
<h4>General</h4>
danjs is a library/API for making responsive web apps using VDOM management.  The API has functions for accessing the DOM, checking or adding and removing classes from html elements.  The API also includes a class for creating and managing a VDOM.  There are serveral examples provided in the repo to show off some of the use cases of danjs.

<h4>Functions</h4>
Most functions can be ignored as they are used by the VDOM class which will offload more work.  There are a few functions that can be used to create more responsive web page. The danAddClasses, danRemoveClasses, danHasClasses functions will help programmatically change css classes of elements in the DOM or VDOM.

<h4>Classes</h4>
The only class provided is the VDOM class, called Delement.  The Delement class will contain all of the html data output to the app, it has 1 constructor with 4 arguments (tagName, id, classes, text) and all element added to the VDOM must be a Delement.  The Delement class handles element ancestory, and provides functions for add and removing children.  Loading and unloading of VDOM data is also handled by the Delement object.

<h4>Usage</h4>
There are two ways of setting up a danjs app.  One way is to use the attach() function of a Delement, this will make your app render as a child of the body tag in html.  The other way is create the body tag as a Delement.  There are examples provided for a very simple hello world app for both use cases; helloWorld_attach.html and helloWorld_noattach.html.
If the body is created as a Delement it makes it harder to embed the app like a singleton app, if you want to embed or have more than one danjs app running on a page it is advised that you create your app under a div instead.  You can use asynchronous javascript calls to a webpage and extract just the app root (in the examples 'app') and display them in corresponding locations.
Once the VDOM has been created it must be rendered using the load member function.  Once the app is loaded to stop rendering a component, call unload.  Load and unloading has no effect on the VDOM other than setting the isLoaded flag. A component can only be loaded once.  To alter the VDOM add or remove children or siblings using their respecitve functions, these calls will alter the VDOM and the DOM.
