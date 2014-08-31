<?php
	header("Content-Type: text/html; charset=utf-8");
	require "../PHPMailer/PHPMailerAutoload.php";

	$mail = new PHPMailer;

	$mail->isSMTP();
	$mail->Host = "smtp.gmail.com";
	$mail->SMTPAuth = true;
	$mail->Port = 465;
	$mail->CharSet = "UTF-8";
	$mail->SMTPSecure = "ssl";

	$mail->Username = "thesinnerssoul@gmail.com";
	$mail->Password = "8246!5555*";
	$mail->SetFrom("thesinnerssoul@gmail.com", "Александр Жидовленко");
	$mail->Subject = "Ваш HTML и CSS";
	$mail->MsgHTML("Здравствуйте! Высылаю ваш код кнопки:<br>
		<p><b>HTML:</b></p><br>".
		$_POST["html"]."<br>
		<p><b>CSS:</b></p><br>".
		$_POST["css"]);

	$mail->AddAddress($_POST["email"]);

	if(!$mail->Send()) {
	    echo "Сообщение не было отправлено";
	    echo "Mailer Error: " . $mail->ErrorInfo;
	} else {
	    echo "Вам отправлено письмо с кодом кнопки!";
	}
?>
