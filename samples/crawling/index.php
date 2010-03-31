<?php 
    
    define('FRAGMENT', '_escaped_fragment_');
    
    // Initializes the fragment value
    $fragment = (!isset($_REQUEST[FRAGMENT]) || $_REQUEST[FRAGMENT] == '') ? '/' : $_REQUEST[FRAGMENT];
 
    // Parses parameters if any
    $arr = explode('?', $fragment);
    $parameters = array();
    if (count($arr) > 1) {
        parse_str($arr[1], $parameters);
    }

    // Adds support for both /name and /?page=name
    if (isset($parameters['page'])) {
        $page = '/?page=' . $parameters['page'];
    } else {
        $page = $arr[0];
    }
    
    // Loads the data file
	$doc = new DOMDocument();
	$doc->load('data.xml');
	$xp = new DOMXPath($doc);
    
?>
<!DOCTYPE html>
<html>
    <head>
        <title>jQuery Address Crawling</title>
        <meta http-equiv="content-type" content="text/html; charset=utf-8">
        <link type="text/css" href="styles.css" rel="stylesheet">
        <script type="text/javascript" src="jquery-1.4.2.min.js"></script>
        <script type="text/javascript" src="jquery.address-1.2rc.min.js?crawlable=true"></script>
        <script type="text/javascript">
            
            $.address.init(function(event) {

                // Initializes plugin support for links
                $('.nav a').address();

            }).change(function(event) {

                // Identifies the page selection 
                var page = event.parameters.page ? '/?page=' + event.parameters.page : event.path;

                // Highlights the selected link
                $('.nav a').each(function() {
                    $(this).toggleClass('selected', $(this).attr('href') == '#!' + page);
                });

                // Loads the page content and inserts it into the content area
                $.get(location.pathname + '?<?php echo(FRAGMENT); ?>=' + encodeURIComponent(event.value), function(data) {
                    $('.content')
                        .show().html($('.content', data).html());
                });
            });

            // Graceful FOUC
            document.write('<style type="text/css"> .content { display: none; } </style>');
                        
        </script>
    </head>
    <body>
        <div class="page">
            <h1>jQuery Address Crawling</h1>
            <ul class="nav">
                <?php
                    
                    // Renders the navigation links
                    $nodes = $xp->query('/data/page');
                    foreach ($nodes as $node) {
                        echo('<li><a href="#!' . $node->getAttribute('href') . '"' 
                            . ($page == $node->getAttribute('href') ? ' class="selected"' : '') . '>' 
                            . $node->getAttribute('title') . '</a></li>');
                    }
                    
                ?>

            </ul>
            <div class="content">
                <?php
                    
                    // Renders the content with support for a simple "More..." link
                    $nodes = $xp->query('/data/page[@href="' . $page . '"]');
                    foreach ($nodes->item(0)->childNodes as $node) {
                    	if (!isset($parameters['more']) && $node->nodeType == XML_COMMENT_NODE && $node->nodeValue == ' page break ') {
                    		echo('<p><a href="#!' . $page . '&amp;more=true">More...</a></p>');
                            break;
                    	} else {
	                        echo($doc->saveXML($node));
                    	}
                    }
                    
                ?>
            
            </div>
        </div>
    </body>
</html>