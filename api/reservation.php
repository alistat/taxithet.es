<?php
require '../bootstrap.php';
use PHPMailer\PHPMailer\PHPMailer;

function verify_captcha() {
    return true;
}

const VIEWER_MAIL = /** @lang HTML */
<<<EOD
<div style="text-align: center">Η κράτησή σας για την παράσταση Ελέφαντας έχει καταχωρηθεί επιτυχώς.</div>

<table style="margin: 1rem auto">
    <tbody>
        <tr>
            <th>Ημερομηνία</th>
            <td>__DATE__</td>
        </tr>
        <tr>
            <th>Όνομα</th>
            <td>__NAME__</td>
        </tr>
        <tr>
            <th>Θέσεις</th>
            <td>__PERSONS__</td>
        </tr>
        <tr>
            <th>Θέσεις</th>
            <td>__PERSONS__</td>
        </tr>
        <tr>
            <th>Το τηλέφωνό σας</th>
            <td>__PHONE__</td>
        </tr>
        <tr>
            <th>Σχόλια</th>
            <td>__COMMENTS__</td>
        </tr>
    </tbody>
</table>

<div style="text-align: center;">Οι Ταξιθέτες σας εύχονται <span style="font-style: italic">καλή θέαση</span>!</div>
EOD;


function send_mail(array $reservation_info) {
    $mail = new PHPMailer();
    $mail->isSMTP();
    $mail->CharSet = "UTF-8";
    $mail->Encoding = 'base64';
    $mail->SMTPDebug = false;
    //Set the hostname of the mail server
    $mail->Host = $_ENV['EMAIL_SERVER'];
    //Set the SMTP port number - 587 for authenticated TLS, a.k.a. RFC4409 SMTP submission
    $mail->Port = 587;
    $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
    $mail->SMTPAuth = true;
    $mail->Username = $_ENV['EMAIL'];
    $mail->Password = $_ENV['EMAIL_PASSWORD'];
    echo $_ENV['EMAIL'];
    echo $_ENV['RESERVATION_MANAGER_MAIL'];

    $mail->setFrom($_ENV['EMAIL'], "Ταξιθέτες");
    $mail->addAddress($_ENV['RESERVATION_MANAGER_MAIL'], $_ENV['RESERVATION_MANAGER_NAME']);
    $mail->Subject = "Ταξιθέτες | Νέα κράτηση";

    $body_message = VIEWER_MAIL;
    $body_message = str_replace("__DATE__", htmlspecialchars($reservation_info["date"]), $body_message);
    $body_message = str_replace("__NAME__", htmlspecialchars($reservation_info["name"]), $body_message);
    $body_message = str_replace("__PERSONS__", htmlspecialchars($reservation_info["persons"]), $body_message);
    $body_message = str_replace("__PHONE__", htmlspecialchars($reservation_info["phone"]), $body_message);
    $body_message = str_replace("__COMMENTS__", htmlspecialchars($reservation_info["comments"]), $body_message);

    echo $body_message;
    $mail->msgHTML($body_message);
    echo "\n sending\n";
    return $mail->send();
}

function process_request() {
    $data = json_decode(file_get_contents('php://input'), true);
    if (verify_captcha()) {
        echo send_mail($data);
    }
}

process_request();
echo "\n nocras\n";
?>
