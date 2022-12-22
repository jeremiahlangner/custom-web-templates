VCDC (Working Name: Visually Configurable Design Components) is an HTML/JavaScript Framework built exclusively for front-end web components. It utilizes ES6 exclusive features such as Custom Web Elements to allow for template configuration in real time on both local and remote servers. The end goal is to enable non-programmers to design their own applications with an extremely flexible backend without the input of a programmer.

## Use Case

I work primarily with Angular. I disagree with the use of rxjs and most observable patterns. Changes in an application are triggered by events. While the JavaScript Proxy is regarded as "slow" in most cases, it functions "adequately" for identifying changes (recursively) in data objects; Often in versions of Chrome or Node.js (v8 integrated contexts) Proxy may perform faster than classic Object.DefineProperty &c functions. I want to replace rxjs (and its .5mb dependency with an object that's native to most modern browsers, while maintaining the same level of reactivity of a modern JavaScript app.

Angular introduced Elements as a solution for micro-frontends in 2019, but then promptly abandoned attempting to support them. ES6's custom Elements effectively render the dependency on Angular "moot" reducing the amount of JavaScript code necessary to deliver to the browser by ~2mb. Additionally, lazy-loading additional components can be accomplished without the complex (and unnecessary) boilerplate required by the angular modular framework. This is especially advantageous where components can be defined and loaded lazily as a consequence of parsing xml-like or json syntax.

I work primarily "local-first". My goal is to take the local framework and make it applicable to a hosted environment that does not require additional costs. The framework ought be able to exist in S3 and load configurations from a similar static provider and allow for a usable application.

