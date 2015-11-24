// DOM MUTATION
(function(win) {
    'use strict';

    var listeners = [],
        doc = win.document,
        MutationObserver = win.MutationObserver || win.WebKitMutationObserver,
        observer;
  
    function waitForElement(selector, repeat, fn) {
      
        // Store the selector and callback to be monitored
        listeners.push({
            selector: selector,
            fn: fn,
            repeat: repeat,
        });
        if (!observer) {
            // Watch for changes in the document
            observer = new MutationObserver(check);
            observer.observe(doc.documentElement, {
                childList: true,
                subtree: true
            });
        }
        // Check if the element is currently in the DOM
        check();
    }

    function check() {
        // Check the DOM for elements matching a stored selector
        for (var i = 0, len = listeners.length, listener, elements; i < len; i++) {
            listener = listeners[i];
            // Query for elements matching the specified selector
            elements = doc.querySelectorAll(listener.selector);
            for (var j = 0, jLen = elements.length, element; j < jLen; j++) {
                element = elements[j];              
              if (!element.ready || listener.repeat) {
                    // Invoke the callback with the element
                    listener.fn.call(element, element);
                }
            }
        }
    }
  
    function activateOnDOMMutation(selector, activate, repeat) {
      repeat = repeat === undefined ? false : repeat;
      if (window.MutationObserver || window.WebKitMutationObserver) {
        waitForElement(selector, repeat, function(element) {
           activate();
        });
      } else {
        // this solution does not handle older browsers (IE10 for example)
      }
    }


    // Expose functions
    win.waitForElement = waitForElement;
    win.activateOnDOMMutation = activateOnDOMMutation;

})(this);


