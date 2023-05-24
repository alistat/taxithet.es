<?php
require '../bootstrap.php';
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;


$mail = new PHPMailer();
$mail->isSMTP();
// $mail->SMTPDebug = SMTP::DEBUG_SERVER;
$mail->SMTPDebug = false;
//Set the hostname of the mail server
$mail->Host = 'smtp.gmail.com';
//Set the SMTP port number - 587 for authenticated TLS, a.k.a. RFC4409 SMTP submission
$mail->Port = 587;
$mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
$mail->SMTPAuth = true;
$mail->Username = $_ENV['email'];
$mail->Password = $_ENV['email_password'];

$mail->setFrom($_ENV['email'], "Ταξιθέτες");
$mail->addAddress($_ENV['reservation_manager_mail'], 'Reservation Manager');
$mail->Subject = "Ταξιθέτες | Νέα κράτηση";

$body_message = file_get_contents('php://input');
$mail->msgHTML($body_message);
?>
