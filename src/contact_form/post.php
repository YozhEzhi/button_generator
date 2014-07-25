<?php

	define("CONTACT_FORM", 'yozhezhi@gmail.com');

	function ValidateEmail($value){
		$regex = '/^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i';

		if($value == '') {
			return false;
		} else {
			$string = preg_replace($regex, '', $value);
		}

		return empty($string) ? true : false;
	}

	$post = (!empty($_POST)) ? true : false;

	if($post){

		$email = stripslashes($_POST['email']);
		$error = '';
		$message = '
			<html>
				<head>
					<title>CSS3 Button Generator</title>
				</head>
				<body>
					<p>Email : '.$email.'</p>
				</body>
			</html>';

		if (!ValidateEmail($email)) {
			$error = 'Wrong Email, bro!';
		}

		if(!$error) {
			$mail = mail(CONTACT_FORM, $message,
				 "From: <".$email.">\r\n"
				."Reply-To: ".$email."\r\n"
				."Content-type: text/html; charset=utf-8 \r\n"
				."X-Mailer: PHP/" . phpversion());

			if($mail){
				echo 'OK';
			}
		} else {
			echo '<div class="bg-danger">'.$error.'</div>';
		}

	}
?>
