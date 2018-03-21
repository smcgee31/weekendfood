(function($) {
    $(function() {

	    FastClick.attach(document.body);


	    $('.popupClose, #popupModal').click(function(e) {
		    if (e.target.id !== '#formSuccessWindow') {
			    $('body').removeClass('popup_contact_success');
		    }
	    });


	    $('#langSwapTrigger').click(function(e){
		    e.preventDefault();
		    var $this = $(this);
		    var $body = $('body');
		    if( $body.hasClass('showEs') ) {
			    $body.removeClass('showEs');
			    $this.html('En espa&ntilde;ol');
			    selectedLang = 'EN';
		    } else {
			    $body.addClass('showEs');
			    $this.html('In English');
			    selectedLang = 'ES';
		    }
	    });


	    /**********************************************************/
	    /* checkboxes                                             */
	    /**********************************************************/
	    $('.popup-form input[type="checkbox"]').click(function() {
		    if( !($(this).attr('checked') == "checked") ) {
			    $(this).attr('checked', true);
			    $(this).parent().addClass('selected');
		    } else {
			    $(this).attr('checked', false);
			    $(this).parent().removeClass('selected');
		    }
	    });


	    /**********************************************************/
	    /* select placeholders                                    */
	    /**********************************************************/
	    if( $('form select').length ) {
		    $('form select').change(function(){
			    $(this).css('color','#184855');
		    });
	    }


    })
})(jQuery);


function closeContact()
{
	$('#contact_form').removeClass('has-errors');
	$('#contact_form').find('.has-error').removeClass('has-error');
	$('#cf_phone').val('');
	$('#cf_name').val('');
	$('#cf_email').val('');
	$('#cf_addr1').val('');
	$('#cf_addr2').val('');
	$('#cf_city').val('');
	$('#cf_state').val('');
	$('#cf_zip').val('');
	$('#cf_count').val('');
	$('#cf_preschool').val('');
	$('#cf_elemiddle').val('');
	$('#cf_highschool').val('');
}

function sendContact(selectedLang)
{

	var phone = $('#cf_phone').val();
	var name = $('#cf_name').val();
	var email = $('#cf_email').val();
	var addr1 = $('#cf_addr1').val();
	var addr2 = $('#cf_addr2').val();
	var city = $('#cf_city').val();
	var state = $('#cf_state').val();
	var zip = $('#cf_zip').val();
	var count = $('#cf_count').val();
	var preschool = $('#cf_preschool').val();
	var elementaryid = $('#cf_elemiddle').val();
	var highschool = $('#cf_highschool').val();

    
	var valid = true;
	var emailvalid = validateEmail(email);

	if( email != '' && emailvalid == false ){
		valid = false;
		$('#contact_form').addClass('has-errors');
		$('#cf_email').addClass('has-error');
	}
	if( phone == '' ){
		valid = false;
		$('#contact_form').addClass('has-errors');
		$('#cf_phone').addClass('has-error');
	}

	if( valid )
	{
		console.log("submitting ajax");
		$.ajax({
			url: 'includes/sendContact.php?_cb=<?php echo time(); ?>',
			type: 'POST',
			data: {
				action: 'add', 
				selectedLang: selectedLang,
				cf_phone: phone,
				cf_name: name,
				cf_email: email,
				cf_addr1: addr1,
				cf_addr2: addr2,
				cf_city: city,
				cf_state: state,
				cf_zip: zip,
				cf_count: count,
				cf_preschool: preschool,
				cf_elemiddle: elementaryid,
				cf_highschool: highschool
			},
			dataType: 'json',
			beforeSend: function () {
				$("#spinner").show();
			},
			success: function(response){
				console.log('success?');
				if(response.mail_send=='success') {
					closeContact();
					$("#spinner").hide();
					$('body').addClass('popup_contact_success');
				} else {
					$("#spinner").hide();
				}
			},
			error: function( req, status, err ) {
				console.log( 'something went wrong', status, err );
			}
		});
	} else {
		console.log("Not a valid submission");
	}
}


// email validation regex
function validateEmail(email) {
	var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	return re.test(email);
	console.log('validating...');
}
