<?php
	header("Content-Type: text/html; charset=utf-8");
	require "PHPMailer/PHPMailerAutoload.php";

	$mail = new PHPMailer;
	$mail->CharSet = "UTF-8";
	$mail->isSMTP();
	$mail->Host = "smtp.gmail.com";
	$mail->SMTPAuth = true;
	$mail->Username = "yozhezhi@gmail.com";
	$mail->Password = "8246!5555*";    // Пароль убрал, тк это мой личный ящик
	$mail->SMTPSecure = "tls";
	$mail->From = "yozhezhi@gmail.com";
	$mail->FromName = "Yozh Ezhi";
	$mail->addAddress($_POST["mail"]);

	$mail->WordWrap = 50;
	$mail->isHTML(true);

	$mail->Subject = "Ваш HTML и CSS";
	$mail->Body    = "Здравствуйте! Высылаю ваш код кнопки:<br>
		<p><b>HTML</b></p><br>".
		htmlspecialchars($_POST['html'])."<br>
		<p><b>CSS</b></p><br>".
		$_POST["css"];

	if(!$mail->send()) {
	    echo "Сообщение не было отправлено";
	    echo "Mailer Error: " . $mail->ErrorInfo;
	} else {
	    echo "Вам отправлено письмо с кодом кнопки!";
	}
?>
