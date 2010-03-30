/**
 * This function sets the values of form element variables from an array
 * This is the reverse process of Mark Constable's serialize function
 * It is expected to be used as a call back for an ajax call that retrieves the form data
 * @param data : array or hash containing name,value pairs for elements in the form
 *
 * Examples
 *
 * 1. Deserialize from an array
 *    $('#form-id').deserialize([{'name':'firstname','value':'John'},{'name':'lastname','value':'Resig'}]);
 *
 * 2. Deserialize from a hash(object)
 *    $('#form-id').deserialize({'firstname':'John','lastname':'Resig'});
 *
 * 3. Deserialize multiple config for select/radio/checkbox
 *    $('#form-id').deserialize({'toppings':['capsicum','mushroom','extra_cheese'],'size':'medium'})
 * which will set the corresponding select/radio/checkbox config for toppings
 *
 * 3. Deserialize multiple config for select/radio/checkbox and with isPHPnaming = true
 *    $('#form-id').deserialize({'toppings':['capsicum','mushroom','extra_cheese'],'size':'medium'},{isPHPnaming:true})
 * which will set the corresponding select/radio/checkbox config for toppings, but will ignore select names ending with []
 *
 * @return         the jQuery Object
 * @author         Ashutosh Bijoor (bijoor@reach1to1.com)
 * @version        0.35
 */
$.fn.deserialize = function(d,config) {
	var data= d;
	me  = this;
 
	if (d === undefined) {
		return me;
	}
 
	config = $.extend({ isPHPnaming	: false,
						overwrite	: true},config);
	
	// check if data is an array, and convert to hash, converting multiple entries of 
	// same name to an array
	if (d.constructor == Array)	{
		data={};
		for(var i=0; i<d.length; i++) {
			if (typeof data[d[i].name] != 'undefined') {
				if (data[d[i].name].constructor!= Array) {
					data[d[i].name]=[data[d[i].name],d[i].value];
				} else {
					data[d[i].name].push(d[i].value);
				}
			} else {
				data[d[i].name]=d[i].value;
			}
		}
	}
 
	// now data is a hash. insert each parameter into the form
	$('input,select,textarea',me)
	.each(function() {
			  var p=this.name;
			  var v = [];
			  
			  // handle wierd PHP names if required
			  if (config.isPHPnaming) {
				  p=p.replace(/\[\]$/,'');
			  }
			  if(p && data[p] != undefined) {
				  v = data[p].constructor == Array ? data[p] : [data[p]];
			  }
			  // Additional parameter overwrite
			  if (config.overwrite === true || data[p]) {
				  switch(this.type || this.tagName.toLowerCase()) {
				  case "radio":
				  case "checkbox":
					  this.checked=false;
					  for(var i=0;i<v.length;i++) {
						  this.checked|=(this.value!='' && v[i]==this.value);
					  }
					  break;
				  case "select-multiple" || "select":
					  for( i=0;i<this.options.length;i++) {
						  this.options[i].selected=false;
						  for(var j=0;j<v.length;j++) {
							  this.options[i].selected|=(this.options[i].value!='' && this.options[i].value==v[j]);
						  }
					  }
					  break;
				  case "button":
				  case "submit":
					  this.value=v.length>0?v.join(','):this.value;
						  break;
				  default:
					  this.value=v.join(',');
				  }
			  }
		  });
	return me;
};