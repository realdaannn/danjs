# danjs
<h4>General</h4>
danjs is a library/API for VDOM management, focused on responsive web design.  The API has functions for accessing the DOM, checking or adding and removing classes from html elements.  The API also includes a class for creating and managing a VDOM.

<h4>Functions</h4>
Most functions can be ignored as they are used by the VDOM class which will offload more work.  There are a few functions that can be used to create more responsive web page. The danAddClasses, danRemoveClasses, danHasClasses functions will help programmatically change css classes of elements in the DOM or VDOM.

<h4>Classes</h4>
The only class provided is the VDOM class, called Delement.  The Delement class will contain all of the html data output to the app, it has 1 constructor with 4 arguments (tagName, id, classes, text) and all element added to the VDOM must be a Delement.  The Delement class handles element ancestory, and provides functions for add and removing children.  Loading and unloading of VDOM data is also handled by the Delement object.
