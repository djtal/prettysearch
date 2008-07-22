/*
	Mac OS/ Safari search field style
	You can now use this to have the same style on safari and Firefix browser
	Not yet tested under IE.
	
	You need the following html for your field
	<div id="wrap" class="search_wrapper">
		<input id="search_field" type="text" value="Search this wiki" name="q"/>
	</div>
	
	And add this javascript snipet after your page loading
	new PrettySearchField("wrap", "search_field");
 
  Version: 
  - 0.1 : 15/06/2007
  
  Requirement :
  - Prototype 1.5.2pre0
  
  Licence
	- MIT
  
	Author: Guillaume Garcera
*/
var PrettySearchField = Class.create();
PrettySearchField.prototype = {
	initialize: function(wrapper, field) {
		this.field = $(field);
    this.wrapper = $(wrapper);
		if(!this.field && !this.wrapper) return;
		this.prettyfy();
    this.addObservers();
	},
  
  prettyfy: function(){
		if (Prototype.Browser.WebKit)
		{
			this.field.writeAttribute("type", "search");
		} else {
			this.reset =  new Element("div", {'class': "reset"});
	    var left_pr = new Element("div", {'class': "pretty_search_left"});
	    var right_pr = new Element("div", {'class': "pretty_search_right"});
	    this.field.addBefore(left_pr, this.field);
	    this.field.addBefore(right_pr, this.field);
	    this.wrapper.insertAfter(this.reset, this.wrapper);
			this.reset.observe('mousedown', this.onResetClick.bindAsEventListener(this)); 
	    new Form.Element.Observer(this.field, 0, this.onSearchChange.bindAsEventListener(this));
	    this.onSearchChange();
		}
  },

  addObservers: function(){
		this.field.observe("focus", this.onFieldFocus.bindAsEventListener(this));
		this.field.observe("blur", this.onFieldBlur.bindAsEventListener(this));
  },

	onFieldFocus: function(){
		this.field.clear();
	},
	
	onFieldBlur: function(){
		if (this.field.getValue() == "")
			this.field.value = "Search this wiki";
	},
	
	onSearchChange: function(ev){
    if (this.field.getValue() == "")
			this.reset.hide();
		else
			this.reset.show();
	},
	
	onResetClick: function(ev){
    Event.stop(ev);
    this.field.clear();
		this.reset.hide();
	}
}
