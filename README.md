# jQuery Address

The jQuery Address plugin provides powerful deep linking capabilities and allows the 
creation of unique virtual addresses that can point to a website section or an 
application state. It enables a number of important capabilities including:

* Bookmarking in a browser or social website
* Sending links via email or instant messenger
* Finding specific content using the major search engines
* Utilizing browser history and reload buttons

## Usage

A basic implementation in pure JavaScript can look like this:

    $.address.change(function(event) {  
        // do something depending on the event.value property, e.g.  
        // $('#content').load(event.value + '.xml');  
    });  
    $('a').click(function() {  
        $.address.value($(this).attr('href'));  
    });  

The plugin also provides a jQuery function which can be directly used in the following way:

    $('a').address();  

The above snippet can be extended with an additional function that processes the link value:

    $('a').address(function() {  
        return $(this).attr('href').replace(/^#/, '');  
    });  

By default the plugin automatically adds the appropriate JavaScript event handler to every 
link that has a rel attribute in the following format:

    <a href="/deep-link" rel="address:/deep-link">Deep link</a> 

## Changes

### 01/22/2013 - jQuery Address 1.6

- Support for jQuery 1.9.
- Removes the crawlable feature.

### 11/18/2012 - jQuery Address 1.5

- Introduces feature detection where possible.
- Improves event handling.
- Fixes various issues.
- Adds a new subtabs sample.

### 05/04/2011 - jQuery Address 1.4

- Support for jQuery 1.6.
- Drops the internal de/encoding magic.
- Drops the Safari 2 support.
- Fixes various issues.
- Updates the Express sample.

### 02/04/2011 - jQuery Address 1.3.2

- Support for jQuery 1.5.
- Issue 48: IE7 "Permission Denied" error.
- Issue 47: Issues for non-Latin urls and State update to change title on click event.
- Issue 40: Encoding problem in parameter().
- Issue 38: Issue when form actions containing query variables.
- Issue 37: Using live events for form submissions.

### 11/29/2010 - jQuery Address 1.3.1

- Issue 26: Values should no longer be only strings.
- Issue 20: Improves the encoding of special characters.
- Fixed issue with state value detection.
- Fixed issue with the global ajaxComplete event.

### 09/26/2010 - jQuery Address 1.3

- Support for the HTML5 onpopstate/pushState/replaceState API.
- Support for tracker function reference.
- Support for document.domain in IE6/7.
- Improved value encoding scheme.
- New State and Express samples.
- Improved jQuery UI Tabs sample.
- Improved event cancellation.
- GA tracker function lookup is performed only against the top window.
- Fixes an issue with manual address changes in IE7.
- Removes IE specific code applicable only for local testing.

### 07/19/2010 - jQuery Address 1.2.2

- Issue 12: Fixes the opening of tab links in a new browser tab.
- Issue 11: Fixes the rel attr handling for Ajax loaded links.
- Issue 10: Cannot turn off Google Analytics page tracking.
- Fixed lazy loading support.
- Fixed form submission support in IE.
- Fixed issue with the href attribute in older versions of IE.
- Tabs sample improvements.

### 05/18/2010 - jQuery Address 1.2.1

- Issue 6: Using links without a href attribute causes an error.
- Issue 5: Setting parameter = 0 removes it from address.

### 05/05/2010 - jQuery Address 1.2

- New queryString, parameter and path setters.
- New autoUpdate, crawling and wrap options.
- New generic bind method.
- New Accordion, Crawling and Form samples.
- Support for hash fragments as a part of the value.
- Basic support for forms.
- Improved onhashchange support.
- Switched samples to HTML5.
- Switched to the Closure compiler.
- JSLint compatibility.
- Simple test suite.
- Support for jQuery 1.4.2 and jQuery UI 1.8.

### 12/23/2009 - jQuery Address 1.1

- New internalChange and externalChange events.
- New Events sample.
- Improved IE support.
- Frameset support.

### 04/28/2009 - jQuery Address 1.0

Initial release.
