<?php 
    
    define('FRAGMENT', '_escaped_fragment_');

    if (!isset($_REQUEST[FRAGMENT]) || $_REQUEST[FRAGMENT] == '') {
        $fragment = '/';
    } else {
        $fragment = $_REQUEST[FRAGMENT];
    }
    
    $xml = new SimpleXMLElement(file_get_contents('data.xml'));
    $pages = $xml->xpath('//page');
    
?>
<!DOCTYPE html>
<html>
    <head>
        <title>jQuery Address Ajax Crawling</title>
        <meta http-equiv="content-type" content="text/html; charset=utf-8">
        <link type="text/css" href="styles.css" rel="stylesheet">
        <script type="text/javascript" src="jquery-1.4.2.min.js"></script>
        <script type="text/javascript" src="jquery.address-1.2.min.js"></script>
        <script type="text/javascript">
            
            $.address.init(function(event) {
                $('.nav a').address();
            }).change(function(event) {
                $('.nav a').each(function() {
                    $(this).toggleClass('selected', $(this).attr('href') == '#!' + event.value);
                });
                $.get(location.pathname + '?<?php echo(FRAGMENT); ?>=' + event.value, function(data) {
                    $('.content')
                        .show()
                        .html($('.abstract', data));
                });
            });

            // Graceful FOUC
            document.write('<style type="text/css"> .content { display: none; } </style>');
                        
        </script>
    </head>
    <body>
        <div class="page">
            <h1>jQuery Address Ajax Crawling</h1>
            <ul class="nav">
                <?php
                    foreach ($pages as $page) {
                        echo('<li><a href="#!' . $page['href'] . '"' 
                            . ($fragment == $page['href'] ? ' class="selected"' : '') . '>' 
                            . $page['title'] . '</a></li>');
                    } 
                ?>

            </ul>
            <div class="content">
                <?php
                    $content = $xml->xpath('//page[@href="' . $fragment . '"]/div[@class="abstract"]');
                    echo($content[0]->asXml());
                ?>
            
            </div>
        </div>
    </body>
</html>