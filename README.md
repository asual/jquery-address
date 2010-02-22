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

### 02/21/2010 - jQuery Address 1.2

- New queryString, parameter and path setters.
- New autoUpdate mode
- New Accordion sample
- Switched to the Closure compiler.
- Simple test suite.

### 12/23/2009 - jQuery Address 1.1

- New internalChange and externalChange events.
- New Events sample.
- Improved IE support.
- Frameset support.

### 04/28/2009 - jQuery Address 1.0

Initial release.