*Javascript Sample Class Structure*

This is a sample of how I generally would write javascript classes.

Basically, in essance, Core.js would be included on every page. In a templated scripting language, this would be included with the 'layout' of your page. But aModule would be a page specific javscript module. Which would get fired automatically upon being included. Although normally you wouldn't want to add code in the core that depended on it's existance, I wrote a few test cases to show that the module can communicate to the core and vice versa. This is a necessity when you have multiple modules that could or would need to talk with each other. Or in the case when a module as submodules that it needs to access.