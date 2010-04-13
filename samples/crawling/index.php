<?php 
    
	class Crawling { 
	   
		const fragment = '_escaped_fragment_';
	    
	    function Crawling(){ 

		    // Initializes the fragment value
		    $fragment = (!isset($_REQUEST[self::fragment]) || $_REQUEST[self::fragment] == '') ? '/' : $_REQUEST[self::fragment];
		 
		    // Parses parameters if any
            $this->parameters = array();
		    $arr = explode('?', $fragment);
		    if (count($arr) > 1) {
		        parse_str($arr[1], $this->parameters);
		    }
		
		    // Adds support for both /name and /?page=name
		    if (isset($this->parameters['page'])) {
		        $this->page = '/?page=' . $this->parameters['page'];
		    } else {
		        $this->page = $arr[0];
		    }
		    
		    // Loads the data file
		    $this->doc = new DOMDocument();
		    $this->doc->load('data.xml');
		    $this->xp = new DOMXPath($this->doc);
		    $this->pageNodes = $this->xp->query('/data/page');
		    $this->pageNode = $this->xp->query('/data/page[@href="' . $this->page . '"]')->item(0);
	    }
	    
	    function title() {
	        if (isset($this->pageNode)) {
	            $title = $this->pageNode->getAttribute('title');
	        } else {
	            $title = 'Page not found';
	        }
	        echo($title);
	    }
	    
	    function nav() {
	        $nav = '';
	        
	        // Prepares the navigation links
	        foreach ($this->pageNodes as $node) {
	            $href = $node->getAttribute('href');
	            $title = $node->getAttribute('title');
	            $nav .= '<li><a href="' . ($href == '/' ? '#' : '#!' . $href) . '"' 
	                . ($this->page == $href ? ' class="selected"' : '') . '>' 
	                . $title . '</a></li>';
	        }
	        echo($nav);
	    }
	
	    function content() {
	        $content = '';
	        
	        // Prepares the content with support for a simple "More..." link
	        if (isset($this->pageNode)) {
	            foreach ($this->pageNode->childNodes as $node) {
	                if (!isset($this->parameters['more']) && $node->nodeType == XML_COMMENT_NODE && $node->nodeValue == ' page break ') {
	                    $content .= '<p><a href="' . ($this->page == '/' ? '#' : '#!' . $this->page) . '&amp;more=true">More...</a></p>';
	                    break;
	                } else {
	                    $content .= $this->doc->saveXML($node);
	                }
	            }
	        } else {
	            $content .= '<p>Page not found.</p>';
	            header("HTTP/1.0 404 Not Found");
	        }
	        echo($content);
	    }
	} 
	
	$crawling = new Crawling();

?>
<!DOCTYPE html>
<html>
    <head>
        <title><?php $crawling->title(); ?> | jQuery Address Crawling</title>
        <meta http-equiv="content-type" content="text/html; charset=utf-8">
        <link type="text/css" href="styles.css" rel="stylesheet">
        <script type="text/javascript">
            if (/Android|iPad|iPhone/.test(navigator.platform)) 
                document.write('<style type="text/css" media="screen">' + 
                        'body { -webkit-text-size-adjust: none; } ' +
                        '.nav a:hover { background: none; text-decoration: underline; color: #fff; } ' + 
                        '</style>');
        </script> 
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
                    if ($(this).attr('href') == (page == '/' ? '#' : '#!' + page)) {
                        $(this).addClass('selected').focus();
                    } else {
                        $(this).removeClass('selected');
                    }
                });

                var handler = function(data) {
                    $('.content').html($('.content', data).html()).parent().show();
                    $.address.title(/>([^<]*)<\/title/.exec(data)[1]);
                };

                // Loads the page content and inserts it into the content area
                $.ajax({
                    url: location.pathname + '?<?php echo(Crawling::fragment); ?>=' + encodeURIComponent(event.value),
                    error: function(XMLHttpRequest, textStatus, errorThrown) {
                        handler($(XMLHttpRequest.responseText));
                    },
                    success: function(data, textStatus, XMLHttpRequest) {
                    	handler(data);
	                }
                });

            });
            
            // Hides the page during initialization
            document.write('<style type="text/css"> .page { display: none; } </style>');

        </script>
    </head>
    <body>
        <div class="page">
            <h1>jQuery Address Crawling</h1>
            <ul class="nav"><?php $crawling->nav(); ?></ul>
            <div class="content"><?php $crawling->content(); ?></div>
        </div>
    </body>
</html>