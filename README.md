Toby came up with a solution to reduce flickering by using DOM Mutation Observers (https://docs.google.com/document/d/1_qQsgSOWGh_UJiU3hoazGaxcAulEZpsnYNsoZJTZ2lQ/edit)

I extended his solution to conditionally activate experiments based on DOM modifications. This is especially useful for starting experiments on SPA.

You can copy the following code to the project JS
http://jsfiddle.net/christopheperrin/h5pgxs89/1/

This code defines a function (activateOnDOMMutation) that can be used in the conditional activation window. This function takes 3 parameters

* selector: The selector of the DOM element to listen to
* activate: The Optimizely activation function
* repeat: Set to true if the experiment should be activated every time the element is modified in the DOM or to false if the experiment should be started only when the element is first added to the DOM

For example, use the following code if your page has a dynamic element with id 'content' and you want to activate the experiment every time this element is modified

function(activate, options) {
  activateOnDOMMutation('#content', activate, true);
}

One low point is that Mutation Observer does not work for IE10 or older
http://caniuse.com/#feat=mutationobserver
One solution is to have a fall back that uses a setInterval function on the DOM element (to do)