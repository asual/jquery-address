<?php 
                
    $ebits = ini_get('error_reporting');
    error_reporting($ebits ^ (E_NOTICE | E_WARNING));
    
    $fragment = $_REQUEST['_escaped_fragment_'];
    $file = 'data/' . (isset($fragment) && $fragment != '' && $fragment != '/' ? preg_replace('/\//', '', $fragment) : 'home') . '.xml';
    
    $handle = fopen($file, 'r');
    if ($handle != false) {
        $content = preg_replace('/(^<\?(?>!(\?>)).*?>)|(\n|\r\n|\t|    )*/', '', fread($handle, filesize($file)));
        fclose($handle);
    } else {
    	$content = 'Page not found!';
        header(php_sapi_name() == 'cgi' ? 'Status: 404' : 'HTTP/1.1 404');
    }
                    
?>
<!DOCTYPE html>
<html>
    <head>
        <title>jQuery Address Crawling</title>
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
                
                $('.content').load('data/' + (event.value == '/' ? 'home' : event.value) + '.xml');
            });
    
        </script>
    </head>
    <body>
        <div class="page">
            <h1>jQuery Address Ajax Crawling</h1>
            <ul class="nav">
                <li>
                    <a href="#!/">Home</a>
                </li>
                <li>
                    <a href="#!/history">History</a>
                </li>
                <li>
                    <a href="#!/technologies">Technologies</a>
                </li>
                <li>
                    <a href="#!/justification">Justification</a>
                </li>
            </ul>
            <div class="content"><?php echo($content); ?></div>
        </div>
    </body>
</html>