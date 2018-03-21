<?php
date_default_timezone_set('America/Boise');
//handle contact request

include("class.phpmailer.php");
include("class.pop3.php");
include("class.smtp.php");

$fromName = 'Weekend Food';
$adminEmail = 'weekendfooddelivery@gmail.com';
$adminName = 'Weekend Food Site';
$infoEmail = 'weekendfooddelivery@gmail.com';

$regdate = date( "Y-m-d H:i", time() );

$selectedLang   = addslashes( $_POST['selectedLang'] );
$phone          = addslashes( $_POST['cf_phone'] );
$name           = addslashes( $_POST['cf_name'] );
$emailContact   = addslashes( $_POST['cf_email'] );
$addr1          = addslashes( $_POST['cf_addr1'] );
$addr2          = addslashes( $_POST['cf_addr2'] );
$city           = addslashes( $_POST['cf_city'] );
$state          = addslashes( $_POST['cf_state'] );
$zip            = addslashes( $_POST['cf_zip'] );
$count          = addslashes( $_POST['cf_count'] );
$presch         = addslashes( $_POST['cf_preschool'] );
$elemid         = addslashes( $_POST['cf_elemiddle'] );
$highsch        = addslashes( $_POST['cf_highschool'] );

$json=array();
if($_POST) {

    // send to user
    $subject = "Your request for WeekendFood has been received.";
    $message = '';
    if( $selectedLang == 'EN' ) {
        $message .= '<p>Thank you for signing up for the Free Weekend Food Delivery for Kids! Our goal is to help your family by dropping off extra food for your children over the weekend.</p>';
        $message .= '<p>You will be added to our delivery list promptly.</p>';
        $message .= '<p>If you sign up anytime before noon this Tuesday, your first delivery will arrive this coming Saturday.</p>';
        $message .= '<p>If you sign up anytime after noon this Tuesday, your delivery will arrive in two Saturdays. Don’t worry when your delivery doesn’t come this week!</p>';
        $message .= '<p>This program is a new idea. We are trying it out for just a few weeks - from April 15, 2017 through June 10, 2017. Thank you for your patience as we work through challenges in the trial.</p>';
        $message .= '<p>If you have any questions, concerns, or suggestions about the program, please feel free to email us at <a href="mailto:weekendfooddelivery@gmail.com">weekendfooddelivery@gmail.com</a>, or give us a call at (855) 856-2211 ext. 3.</p>';
        $message .= '<p>Thank you!</p>';     
    }
    if( $selectedLang == 'ES' ) {
        $message .= '<p>¡Gracias por inscribirse para la Entrega de Comida Gratis para Fines de Semana! Nuestro objetivo es fortalecer su familia y sus niños para complementar su dieta con esta comida.</p>';
        $message .= '<p>Estará añadido a nuestra lista de entrega rápidamente.</p>';
        $message .= '<p>Si se inscribió antes de mediodía este martes, su primera entrega llegará este sábado.</p>';
        $message .= '<p>Si se inscribió después de mediodía este martes, su primera entrega llegará el sábado siguiente. ¡No se preocupe si su entrega no llega esta semana!</p>';
        $message .= '<p>Este programa es una prueba desde el 15 abril, 2017 a 10 junio, 2017. Continuará si la prueba resulta bien. Gracias por su paciencia mientras trabajamos los retos de la prueba.</p>';
        $message .= '<p>Si tiene preguntas o recomendaciones sobre el programa, por favor envíe un correo electrónico a <a href="mailto:weekendfooddelivery@gmail.com">weekendfooddelivery@gmail.com</a> o llame a (855) 856-2211 ext. 3.</p>';
        $message .= '<p>¡Gracias!</p>';
    }
    $response = send_message_mailer($emailContact, $subject, $message, $adminEmail, $adminName, $infoEmail, $fromName);

    // send to admin
    $email = $adminEmail;
    $subject = "WeekendFood request for ".$fromName;
    $message  = "<p>Someone has requested more information.</p>";
    $message .= "<p>&nbsp;&nbsp;&nbsp;&nbsp;Phone: $phone</p>";
    $message .= "<p>&nbsp;&nbsp;&nbsp;&nbsp;Name: $name</p>";
    $message .= "<p>&nbsp;&nbsp;&nbsp;&nbsp;Email: $emailContact</p>";
    $message .= "<p>&nbsp;&nbsp;&nbsp;&nbsp;Address&nbsp;Line1: $addr1</p>";
    $message .= "<p>&nbsp;&nbsp;&nbsp;&nbsp;Address&nbsp;Line2: $addr2</p>";
    $message .= "<p>&nbsp;&nbsp;&nbsp;&nbsp;City: $city</p>";
    $message .= "<p>&nbsp;&nbsp;&nbsp;&nbsp;State: $state</p>";
    $message .= "<p>&nbsp;&nbsp;&nbsp;&nbsp;Zip: $zip</p>";
    $message .= "<p>&nbsp;&nbsp;&nbsp;&nbsp;Kids&nbsp;in&nbsp;house: $count</p>";
    $message .= "<p>&nbsp;&nbsp;&nbsp;&nbsp;Preschool: $presch</p>";
    $message .= "<p>&nbsp;&nbsp;&nbsp;&nbsp;Elementary&nbsp;&amp;&nbsp;Middle: $elemid</p>";
    $message .= "<p>&nbsp;&nbsp;&nbsp;&nbsp;High&nbsp;School: $highsch</p>";

    $response = send_message_mailer($email, $subject, $message, $adminEmail, $adminName, $infoEmail, $fromName);

    // writing a second set if data for the csv file
    //$csvContent = "Date/Time, Phone, Name, Email Contact, Address 1, Address 2, City, State, Zip, Count In House, Pre-School, Elementary/Middle, High School\n";
    $csvContent = "$regdate, $phone, $name, $emailContact, $addr1, $addr2, $city, $state, $zip, $count, $presch, $elemid, $highsch\n";
    $fh = fopen("../formdata.csv", "a");
    fwrite($fh, $csvContent);
    fclose($fh);

    // fill json donut
    $json['post'] = $_POST;
    $json['message'] = "Success";
    $json['mail_send'] = $response;

} else {

    // send to dev
    $subject = "Test Subject HERE";
    $message  = "<p>This is a test message through send_message.</p>";
    $message .= "<p>We'll see you there!</p>";
    $response = send_message_mailer('daminitronar@gmail.com', $subject, $message, $adminEmail, $adminName, $infoEmail, $fromName);

}

function send_message_mailer($email,$subject,$message,$adminEmail,$adminName,$infoEmail,$fromName)
{
    $mail = new PHPMailer;
    if($debug){
        $mail->SMTPDebug = 3;
    }
    $mail->IsMail();
    $mail->isHTML(true);
    $mail->From = $adminEmail;
    $mail->Sender = $infoEmail;
    $mail->FromName = $fromName;
    $mail->addAddress($email);
    $mail->addReplyTo($adminEmail, $adminName);
    //$mail->addCC($infoEmail);
    $mail->Subject = $subject;
    $mail->msgHTML($message);
    if(!$mail->send()) {
        return $mail->ErrorInfo;
    } else {
        return 'success';
    }
}

print json_encode($json);
