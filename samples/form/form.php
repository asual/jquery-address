<?php 
    
    function form($name) {
    	if (isset($_REQUEST[$name])) {
            echo($name . ': ' . $_REQUEST[$name] . '<br>');
    	}
    	if (isset($_FILES[$name])) {
            echo($name . ': ' . $_FILES[$name]['name'] . '<br>');
    	}    	
    }
    
    form('input');
    form('textarea');
    form('select');
    form('checkbox1');
    form('checkbox2');
    form('checkbox3');
    form('radio');
    form('file');
    
?>