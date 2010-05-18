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