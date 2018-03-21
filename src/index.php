<?php
$baseSuf = '';
$baseUrl = '//' . $_SERVER['HTTP_HOST'] . substr( __DIR__ , strlen($_SERVER['DOCUMENT_ROOT'])) . $baseSuf;
?><!DOCTYPE html>
<html>
<head>
	<meta charset="UTF-8">
	<meta http-equiv="X-UA-Compatible" content="IE=Edge">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<title>Weekend Food</title>
	<link rel="icon" type="image/png" href="<?= $baseUrl; ?>/img/favicon.png" />
	<link href="https://fonts.googleapis.com/css?family=Josefin+Sans:400,400i,700,700i|Reenie+Beanie" rel="stylesheet">
	<link rel="stylesheet" type="text/css" href="./style.css" />
	<script type="text/javascript" src="//use.fontawesome.com/470e90bd1a.js"></script>
</head>
<body class="home">
	<script>var selectedLang = 'EN';</script>
	<main>


		<section id="heroSection">
			<div class="sectionContainer">
				<h1 class="heroTitle">
					<div class="langEn">Free Weekend Food Delivery for Kids</div>
					<div class="langEs">Entrega de Comida Gratis para Fines de Semana</div>
				</h1>
				<div class="heroImage"><img src="<?= $baseUrl ?>/img/hero-pic.jpg" alt="Free Weekend Food Delivery for Kids" /></div>
				<a href="#" id="langSwapTrigger" class="langSwapTrigger">En español</a>
			</div>
		</section>


		<section id="introSection">
			<div class="sectionContainer">
				<div class="introText">
					<div class="langEn">We are currently serving the Sedro-Woolley school district. In mid-January we will begin serving Mount Vernon children within the bounds of Centennial and Washington elementary schools.</div>
					<div class="langEs">Actualmente estamos sirviendo al distrito escolar de Sedro-Woolley. A mediados de enero, comenzaremos a prestar servicios a los niños de Mount Vernon dentro de los límites de las escuelas primarias Centennial y Washington.</div>
				</div>
			</div>
		</section>


		<section id="infoSection">
			<div class="sectionContainer">
				<a class="infoPic alignright" href="https://donatenow.networkforgood.org/cuttinghungeronweekends" target="_blank">
					<img src="<?= $baseUrl ?>/img/info-pic.jpg" alt="Cutting Hunger on Weekends (CHOW)" />
				</a>
				<div class="infoCopy langEn">
					<p>If you have kids from ages 0-18, we want to help your children get already available, FREE, supplemental food by delivering it directly to your door on Saturday mornings. No questions asked. Delivery times are typically Noon Friday to 9 AM Saturday.</p>
					<h2 style="text-align:center;">Fill out the form below to sign up.</h2>
					<p>Questions or concerns? Email <a href="mailto:weekendfooddelivery@gmail.com">weekendfooddelivery@gmail.com</a> or call <a href="tel:8558562211">(855) 856-2211</a> ext. 3. Thank you!</p>
					<p>Sponsored by: 1095 Skagit Coalition; Community Action Skagit Food Distribution Center; Helping Hands Food Bank (Sedro-Woolley); Skagit Publishing; United Way of Skagit County; WSU Extension Skagit</p>
				</div>
				<div class="infoCopy langEs">
					<p>Si tiene niños de edades entre 0 y 18 años, queremos ayudarle a que tenga acceso a comida suplementaria y GRATIS que ya esta disponible para distribuirla directamente a su casa los sábados por la mañana. Sin preguntas. Los tiempos de entrega son típicamente del mediodía del viernes al sábado 9AM.</p>
					<h2 style="text-align:center;">Rellene el siguiente formulario para inscribirse.</h2>
					<p>¿Tiene preguntas? Envíe un correo electrónico a <a href="mailto:weekendfooddelivery@gmail.com">weekendfooddelivery@gmail.com</a> o llame a <a href="tel:8558562211">(855) 856-2211</a> ext. 3. ¡Gracias!</p>
					<p>Patrocinado por: 1095 Skagit Coalition; Community Action Skagit Food Distribution Center; Helping Hands Food Bank (Sedro-Woolley); Skagit Publishing; United Way of Skagit County; WSU Extension Skagit</p>
				</div>
			</div>
		</section>


		<section id="formSection">
			<div class="sectionContainer">
				<form id="contact_form" name="contact_form" class="form-horizontal">
					<div class="errors"><div class="langEn">Please fix errors marked in red.</div><div class="langEs">Por favor, corrija los errores marcados en rojo.</div></div>

					<div class="field-group">
						<label><span class="isRequired">*</span><span><div class="langEn">Phone</div><div class="langEs">Telefono</div></span></label>
						<input type="text" id="cf_phone" name="cf_phone" aria-describedby="phoneErrorStatus" required>
					</div>
					<div class="field-group">
						<label><div class="langEn">Name</div><div class="langEs">Nombre</div></label>
						<input type="text" id="cf_name" name="cf_name" aria-describedby="nameErrorStatus">
					</div>
					<div class="field-group">
						<label><div class="langEn">Email</div><div class="langEs">Correo electrónico</div></label>
						<input type="text" id="cf_email" name="cf_email" aria-describedby="emailErrorStatus">
					</div>

					<br><hr><br>

					<div class="field-group">
						<label><span class="isRequired">*</span><div class="langEn">Street Address 1</div><div class="langEs">Número de Casa, Calle 1</div></label>
						<input type="text" id="cf_addr1" name="cf_addr1" aria-describedby="addr1ErrorStatus" required>
					</div>
					<div class="field-group">
						<label><div class="langEn">Street Address 2</div><div class="langEs">Dirección</div></label>
						<input type="text" id="cf_addr2" name="cf_addr2" aria-describedby="addr2ErrorStatus">
					</div>
					<div class="field-group" style="width:99%;margin-left:0.5%;">
						<div class="field-col" style="width:50%;">
							<label><span class="isRequired">*</span><div class="langEn">City</div><div class="langEs">Ciudad</div></label>
							<input type="text" id="cf_city" name="cf_city" aria-describedby="cityErrorStatus" required>
						</div><div class="field-col" style="width:25%;">
							<label><span class="isRequired">*</span><div class="langEn">State</div><div class="langEs">Estado</div></label>
							<input type="text" id="cf_state" name="cf_state" aria-describedby="stateErrorStatus" required>
						</div><div class="field-col" style="width:25%;">
							<label><span class="isRequired">*</span><div class="langEn">Zipcode</div><div class="langEs">Código postal</div></label>
							<input type="text" id="cf_zip" name="cf_zip" aria-describedby="zipErrorStatus" required>
						</div>
					</div>
					<div class="field-group">
						<label><span class="isRequired">*</span><div class="langEn">Number of kids under 18 at this address</div><div class="langEs">Número de menores de 18 años</div></label>
						<input type="text" id="cf_count" name="cf_count" aria-describedby="countErrorStatus" required>
					</div>
					<div class="field-group" style="width:99%;margin-left:0.5%;">
						<label><span class="isRequired">*</span><div class="langEn">Number of kids in each age group</div><div class="langEs">Número de niños en cada grupo de edad</div></label>
						<div class="field-col" style="width:33.333%">
							<label><div class="langEn">Preschool</div><div class="langEs">Preescolar</div></label>
							<input type="text" id="cf_preschool" name="cf_preschool" aria-describedby="preschoolErrorStatus" value="0" required>
						</div><div class="field-col" style="width:33.333%">
							<label><div class="langEn">Elementary or Middle School</div><div class="langEs">Elemental o Escuela intermedia</div></label>
							<input type="text" id="cf_elemiddle" name="cf_elemiddle" aria-describedby="elemiddleErrorStatus" value="0" required>
						</div><div class="field-col" style="width:33.333%">
							<label><div class="langEn">High School</div><div class="langEs">Escuela secundaria</div></label>
							<input type="text" id="cf_highschool" name="cf_highschool" aria-describedby="highschoolErrorStatus" value="0" required>
						</div>
					</div>

					<div class="errors"><div class="langEn">Please fix errors marked in red.</div><div class="langEs">Por favor, corrija los errores marcados en rojo.</div></div>
					<button type="button" onclick="sendContact(selectedLang);"><div class="langEn">Submit</div><div class="langEs">Enviar</div></button>
				</form>
			</div>
		</section>


	</main>
	<footer>
		<div class="footerContainer">
			<div class="copyright">Copyright &copy; <?php date_default_timezone_set('UTC'); echo date('Y'); ?> WeekendFood. All rights reserved.</div>
		</div>
	</footer>

	<div id="spinner"></div>
	<div id="formSuccess">
		<div id="popupModal"></div>
		<div id="formSuccessWindow" class="popupWindow">
			<div class="popupClose"></div>
			<div class="langEn">
				<h2>Thank you!</h2>
				<p>Thank you for signing up for the Free Weekend Food Delivery for Kids! Our goal is to help your family by dropping off extra food for your children over the weekend.</p>
				<p>You will be added to our delivery list promptly.</p>
			</div>
			<div class="langEs">
				<h2>¡Gracias!</h2>
				<p>¡Gracias por inscribirse para la Entrega de Comida Gratis para Fines de Semana! Nuestro objetivo es fortalecer su familia y sus niños para complementar su dieta con esta comida.</p>
				<p>Estará añadido a nuestra lista de entrega rápidamente.</p>
			</div>
		</div>
	</div>

	<script type="text/javascript" src="//ajax.googleapis.com/ajax/libs/jquery/2.1.4/jquery.min.js"></script>
	<script type="text/javascript" src="./js/vendor.js"></script>
	<script type="text/javascript" src="./js/index.js"></script>
</body>
</html>

