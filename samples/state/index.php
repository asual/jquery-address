<!DOCTYPE html> 
<html> 
    <head> 
        <title>jQuery Address State</title> 
        <meta http-equiv="content-type" content="text/html; charset=utf-8">
        <link type="text/css" href="styles.css" rel="stylesheet">
        <script type="text/javascript" src="jquery-1.4.2.min.js"></script>
        <script type="text/javascript" src="jquery.address-1.3.min.js?state=<?php echo(substr($_SERVER['PHP_SELF'], 0, strrpos($_SERVER['PHP_SELF'], '/'))); ?>"></script>
        <script type="text/javascript">
            
            var title = document.title,
                home = 'Home';
            
            $.address.init(function() {
                $('a').address();
            }).change(function(event) {
                $('a').each(function() {
                    var selection = event.pathNames.length ? 
                        event.pathNames[0].substr(0, 1).toUpperCase() + event.pathNames[0].substr(1) : home;
                    $(this).toggleClass('selected', $(this).text() == selection);
                    $.address.title(selection + ' | ' + title);
                });
            });
            
        </script> 
    </head> 
    <body> 
        <div class="page"> 
            <h1>jQuery Address State</h1> 
            <ul class="nav">
                <li><a href="./">Home</a></li>
                <li><a href="./about">About</a></li>
                <li><a href="/jquery/address/samples/state/portfolio">Portfolio</a></li>
                <li><a href="http://localhost/jquery/address/samples/state/contact">Contact</a></li>
            </ul>
        </div>
    </body> 
</html>