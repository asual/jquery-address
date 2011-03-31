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
            $this->nodes = $this->xp->query('/data/page');
            $this->node = $this->xp->query('/data/page[@href="' . $this->page . '"]')->item(0);
            
            if (!isset($this->node)) {
                header("HTTP/1.0 404 Not Found");
            }
        }
        
        function base() {
            $arr = explode('?', $_SERVER['REQUEST_URI']);
            return $arr[0] != '/' ? preg_replace('/\/$/', '', $arr[0]) : $arr[0];
        }
        
        function title() {
            if (isset($this->node)) {
                $title = $this->node->getAttribute('title');
            } else {
                $title = 'Page not found';
            }
            echo($title);
        }
        
        function nav() {
            $str = '';
            
            // Prepares the navigation links
            foreach ($this->nodes as $node) {
                $href = $node->getAttribute('href');
                $title = $node->getAttribute('title');
                $str .= '<li><a href="' . $this->base() . ($href == '/' ? '' : '?' . self::fragment . '=' . urlencode(html_entity_decode($href))) . '"' 
                    . ($this->page == $href ? ' class="selected"' : '') . '>' 
                    . $title . '</a></li>';
            }
            echo($str);
        }
    
        function content() {
            $str = '';
            
            // Prepares the content with support for a simple "More..." link
            if (isset($this->node)) {
                foreach ($this->node->childNodes as $node) {
                    if (!isset($this->parameters['more']) && $node->nodeType == XML_COMMENT_NODE && $node->nodeValue == ' page break ') {
                        $str .= '<p><a href="' . $this->page . 
                            (count($this->parameters) == 0 ? '?' : '&') . 'more=true' . '">More...</a></p>';
                        break;
                    } else {
                        $str .= $this->doc->saveXML($node);
                    }
                }
            } else {
                $str .= '<p>Page not found.</p>';
            }
            
            echo(preg_replace_callback('/href="(\/[^"]+|\/)"/', array(get_class($this), 'callback'), $str));
        }
        
        private function callback($m) {
        	return 'href="' . ($m[1] == '/' ? $this->base() : ($this->base() . '?' . self::fragment . '=' . urlencode($m[1]))) . '"';
        }
    }
    
    $crawling = new Crawling();

?>
<!DOCTYPE html>
<html>
    <head>
        <meta http-equiv="content-type" content="text/html; charset=utf-8">
        <meta name="fragment" content="!">
        <title><?php $crawling->title(); ?> | jQuery Address Crawling</title>
        <link type="text/css" href="styles.css" rel="stylesheet">
        <script type="text/javascript" src="jquery-1.5.2.min.js"></script>
        <script type="text/javascript" src="jquery.address-1.4.min.js"></script>
        <script type="text/javascript">
        
            $.address.crawlable(true).init(function(event) {

                // Initializes plugin support for links
                $('a:not([href^=http])').address();

                // Adds a simple hover effect
                $('.nav a').hover(function() {
                    $(this).addClass('hover');
                }, function() {
                    $(this).removeClass('hover');
                });

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
                        handler(XMLHttpRequest.responseText);
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