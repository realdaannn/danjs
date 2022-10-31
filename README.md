# danjs
<h4>General</h4>
danjs is a library/API for making responsive web apps using VDOM management.  The API has functions for accessing the DOM, checking or adding and removing classes from html elements.  danjs leave the underlying html object exposed to the programmer making programmatic changes to the DOM easier.  The API also includes a class for creating and managing a VDOM.  There are serveral examples provided in the repo to show off some of the use cases of danjs.

<h4>Functions</h4>
Most functions can be ignored as they are used by the VDOM class which will offload more work.  There are a few functions that can be used to create more responsive web page. The danAddClasses, danRemoveClasses, danHasClasses functions will help programmatically change css classes of elements in the DOM or VDOM.

<h4>Classes</h4>
The only class provided is the VDOM class, called Delement.  The Delement class will contain all of the html data output to the app, it has 1 constructor with 4 arguments (tagName, id, classes, text) and all element added to the VDOM must be a Delement.  The Delement class handles element ancestory, and provides functions for adding and removing children.  Loading and unloading of VDOM data is also handled by the Delement object.

<h4>Usage</h4>
There are two ways of setting up a danjs app.  One way is to use the attach() function of a Delement, this will make your app render as a child of the body tag in html.  The other way is create the body tag as a Delement.  There are examples provided for a very simple hello world app for both use cases; helloWorld_attach.html and helloWorld_noattach.html.

<h6>App Creation</h6>
<p>
If the body is created as a Delement it makes it harder to embed the app like a singleton app, if you want to embed or have more than one danjs app running on a page it is advised that you create your app under a div instead.  You can use asynchronous javascript calls to a webpage and extract just the app root (in the examples 'app') and display them in corresponding locations.
</p>
<p>
Each element is created using the Delement constructor.  Elements can be added as either a child or sibling to an existing element using the addChild or addSibling functions. Each creation function returns the element that was just added, making programmatic addition of elements in the hierarchy easier. 
Check the helloWorld html files for a quick example on how to create elements.
</p>
<p>
VDOM elements can be added procedurally or functionally.  The examples/v0.2/ShoppingList is an example of a functional setup of an app.  index.html is an example of precedural setup.
</p>
<h6>Loading/Unloading</h6>
Once the VDOM has been created it must be rendered using the load member function.  Once the app is loaded to stop rendering a component, call unload.  Load and unloading has no effect on the VDOM other than setting the isLoaded flag. A component can only be loaded once.  To alter the VDOM add or remove children or siblings using their respecitve functions, these calls will alter the VDOM and the DOM.

<h6>HTML Object</h6>
Once the Delement object has been created you can change any normal html attribute using the Delement.obj variable which holds the DOM object of that VDOM object.  Using this variable you can change things like the onclick function, css classes (using danAddClass or like functions), or any variable/function of the underlying element that will be displayed or that is being displayed.

