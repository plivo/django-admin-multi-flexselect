(function($, that) {

// Namespace.
var flexselect_multiple = flexselect_multiple || {};

/**
 * Binds base and trigger fields.
 Overriden due to compatibility issues
 */

flexselect_multiple.bind_events = function() {
    if (typeof that.flexselect_multiple === 'undefined') return;
    var fields = that.flexselect_multiple.fields;
    for (hashed_name in fields) {
    	field = fields[hashed_name];
    	var base_field = field.base_field;
    	flexselect_multiple.bind_base_field(base_field, hashed_name);


    	for (var i in field.trigger_fields) {
    		var trigger_field = field.trigger_fields[i];
    		flexselect_multiple.bind_trigger_field(trigger_field, hashed_name,
    			                          base_field);
    	}
	}
};


/*
The original flexselect.js has been edited by Nishad Musthafa. Have added some
parts to make this script work with chosen.js. For this to work, chosen.js must
be included before this include.
*/
  $(document).ready(function() {
  	 $('select').chosen();
/**
 * Binds the change event of a base field to the flexselect_multiple.ajax() function.
 */
flexselect_multiple.bind_base_field = function(base_field, hashed_name) {
	flexselect_multiple.get_element(base_field).chosen().live('change', {
		'base_field': base_field,
		'hashed_name': hashed_name,
		'success': function(data) {

			$(this).parent().find('span.flexselect_multiple_details').html(data.details);
		},
		'data': '&include_options=0',
	}, flexselect_multiple.ajax);
}
/**
 * Binds the change event of a trigger field to the flexselect_multiple.ajax() function.
 */
flexselect_multiple.bind_trigger_field = function(trigger_field, hashed_name,
base_field) {
	flexselect_multiple.get_element(trigger_field).chosen().live('change', {
		'base_field': base_field,
		'hashed_name': hashed_name,
		'success': function(data) {
			console.error($(this))
			$(this).html(data.options);
			flexselect_multiple.get_element(base_field).trigger("liszt:updated");
			$('select').chosen();
			console.error($(this))
			$(this).parent().parent().parent().find('span.flexselect_multiple_details').html("");
			// If jQueryUI is installed, flash the dependent form field row.
			if (typeof $.ui !== 'undefined') {
				$(this).parents('.form-row').stop()
							    .css('background-color', '#F49207')
					            .animate({ backgroundColor: "white" }, 4000);
			}
	    },
	    'data': '&include_options=1',
	}, flexselect_multiple.ajax);
};
});
/**
 * Performs a ajax call that options the base field. In the event.data it needs
 * the keys "hashed_name", "base_field", "data" and "success".
 */
flexselect_multiple.ajax = function(event) {

	$.ajax({
		url: '/flexselect_multiple/field_changed_multiple',
		data: $('form').serialize() + '&hashed_name=' + event.data.hashed_name
			  + event.data.data,
		type: 'post',
		context: flexselect_multiple.get_element(event.data.base_field),
		success: event.data.success,
	    error: function(data,e) {

	    	alert("Something went wrong with flexselect_multiple.");
	    },
	});
}

/**
 * Returns the form element from a field name in the model.
 */
flexselect_multiple.get_element = function(field_name) {
	return $('#id_' + field_name);
};

/**
 * Moves all details fields to after the green plussign.
 */
flexselect_multiple.move_after_plussign = function() {
	// Delay execution to after all other initial js have been run.
	window.setTimeout(function() {
		$('span.flexselect_multiple_details').each(function() {
			$(this).next('.add-another').after($(this));
		});
	}, 0);
};

/**
 * Overrides the original dismissAddAnotherPopup and triggers a change event on
 * the field after the popup has been added.
 */
var _dismissAddAnotherPopup = dismissAddAnotherPopup;

dismissAddAnotherPopup = function(win, newId, newRepr) {
	_dismissAddAnotherPopup(win, newId, newRepr);
	$('#' + windowname_to_id(win.name)).trigger('change');
};
dismissAddAnotherPopup.original = _dismissAddAnotherPopup;

// On Document.ready().
$(function() {
	flexselect_multiple.bind_events();
	flexselect_multiple.move_after_plussign();
});

})(jQuery || django.jQuery, this);
