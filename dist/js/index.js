function closeContact(){$("#contact_form").removeClass("has-errors"),$("#contact_form").find(".has-error").removeClass("has-error"),$("#cf_phone").val(""),$("#cf_name").val(""),$("#cf_email").val(""),$("#cf_addr1").val(""),$("#cf_addr2").val(""),$("#cf_city").val(""),$("#cf_state").val(""),$("#cf_zip").val(""),$("#cf_count").val(""),$("#cf_preschool").val(""),$("#cf_elemiddle").val(""),$("#cf_highschool").val("")}function sendContact(c){var e=$("#cf_phone").val(),a=$("#cf_name").val(),s=$("#cf_email").val(),o=$("#cf_addr1").val(),t=$("#cf_addr2").val(),l=$("#cf_city").val(),n=$("#cf_state").val(),r=$("#cf_zip").val(),d=$("#cf_count").val(),i=$("#cf_preschool").val(),f=$("#cf_elemiddle").val(),h=$("#cf_highschool").val(),_=!0,p=validateEmail(s);""!=s&&0==p&&(_=!1,$("#contact_form").addClass("has-errors"),$("#cf_email").addClass("has-error")),""==e&&(_=!1,$("#contact_form").addClass("has-errors"),$("#cf_phone").addClass("has-error")),_?(console.log("submitting ajax"),$.ajax({url:"includes/sendContact.php?_cb=<?php echo time(); ?>",type:"POST",data:{action:"add",selectedLang:c,cf_phone:e,cf_name:a,cf_email:s,cf_addr1:o,cf_addr2:t,cf_city:l,cf_state:n,cf_zip:r,cf_count:d,cf_preschool:i,cf_elemiddle:f,cf_highschool:h},dataType:"json",beforeSend:function(){$("#spinner").show()},success:function(c){console.log("success?"),"success"==c.mail_send?(closeContact(),$("#spinner").hide(),$("body").addClass("popup_contact_success")):$("#spinner").hide()},error:function(c,e,a){console.log("something went wrong",e,a)}})):console.log("Not a valid submission")}function validateEmail(c){return/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(c)}!function(c){c(function(){FastClick.attach(document.body),c(".popupClose, #popupModal").click(function(e){"#formSuccessWindow"!==e.target.id&&c("body").removeClass("popup_contact_success")}),c("#langSwapTrigger").click(function(e){e.preventDefault();var a=c(this),s=c("body");s.hasClass("showEs")?(s.removeClass("showEs"),a.html("En espa&ntilde;ol"),selectedLang="EN"):(s.addClass("showEs"),a.html("In English"),selectedLang="ES")}),c('.popup-form input[type="checkbox"]').click(function(){"checked"!=c(this).attr("checked")?(c(this).attr("checked",!0),c(this).parent().addClass("selected")):(c(this).attr("checked",!1),c(this).parent().removeClass("selected"))}),c("form select").length&&c("form select").change(function(){c(this).css("color","#184855")})})}(jQuery);