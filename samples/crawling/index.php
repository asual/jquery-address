<?php 
    
    define('FRAGMENT', '_escaped_fragment_');

    if (!isset($_REQUEST[FRAGMENT]) || $_REQUEST[FRAGMENT] == '') {
        $fragment = '/';
    } else {
        $fragment = $_REQUEST[FRAGMENT];
    }

    $arr = explode('?', $fragment, 2);

    if (count($arr) > 1) {
        $fragment = $arr[0];
        parse_str($arr[1], $params);
    }
    
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
                $('.nav a').address();
            }).change(function(event) {
                $('.nav a').each(function() {
                    $(this).toggleClass('selected', $(this).attr('href') == '#!' + event.path);
                });
                $.get(location.pathname + '?<?php echo(FRAGMENT); ?>=' + event.value, function(data) {
                    $('.content')
                        .show()
                        .html($('.content', data).html());
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
    
                    $pages = $xml->xpath('//pages/page');
                
                    foreach ($pages as $page) {
                        echo('<li><a href="#!' . $page['href'] . '"' 
                            . ($fragment == $page['href'] ? ' class="selected"' : '') . '>' 
                            . $page['title'] . '</a></li>');
                    } 
                
                ?>

            </ul>
            <div class="content">
                <?php
                
                    $content = $xml->xpath('//pages/page[@href="' . $fragment . '"]');

                    $more = !isset($params['more']) && count($content[0]->children()) > 1;

                    foreach($content[0]->children() as $child) {
                        echo $child->asXML();
                        if ($more) {
                            echo('<p><a href="#!' . $fragment . '?more=true">More</a></p>');
                            break;
                        }
                    }
                    
                    if (isset($params['source']) && count($content[0]->children()) > 1) {
                        $source = $xml->xpath('//meta/source');
                        foreach($source[0]->children() as $child) {
                            echo $child->asXML();
                        }
                    }
                    
                ?>
            
            </div>
        </div>
    </body>
</html>