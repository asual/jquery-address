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
    $xml = new SimpleXMLElement(file_get_contents('data.xml'));    
    
?>
<!DOCTYPE html>
<html>
    <head>
        <title>jQuery Address Crawling</title>
        <meta http-equiv="content-type" content="text/html; charset=utf-8">
        <link type="text/css" href="styles.css" rel="stylesheet">
        <script type="text/javascript" src="jquery-1.4.2.min.js"></script>
        <script type="text/javascript" src="jquery.address-1.2.min.js?crawlable=true"></script>
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
                    $pages = $xml->xpath('/data/page');
                    foreach ($pages as $p) {
                        echo('<li><a href="#!' . $p['href'] . '"' 
                            . ($page == $p['href'] ? ' class="selected"' : '') . '>' 
                            . $p['title'] . '</a></li>');
                    }
                
                ?>

            </ul>
            <div class="content">
                <?php
                    
                    // Renders the content with support for a simple "More..." link
                    $content = $xml->xpath('/data/page[@href="' . $page . '"]');
                    foreach($content[0]->children() as $child) {
                        $childAsXML = $child->asXML();
                        if (isset($parameters['more'])) {
                            if (!strstr($childAsXML, '>More...<')) {
                                echo($childAsXML);
                            }
                        } else {
                            echo($childAsXML);
                            if (strstr($childAsXML, '>More...<')) {
                                break;
                            }
                        }
                    }
                    
                ?>
            
            </div>
        </div>
    </body>
</html>