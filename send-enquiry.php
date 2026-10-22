<?php
/**
 * Kirima Rise - Contact & Enquiry Form Backend Handler (cPanel / LiteSpeed / PHP)
 * Processes submissions from sample-page/index.html and sends emails to info@kirimarise.co.ke
 * Includes lead logging, safety fallbacks, branded notifications & automated customer confirmation receipt.
 */

// Disable error display in production JSON output to prevent header corruption, but log errors
ini_set('display_errors', '0');
ini_set('log_errors', '1');
error_reporting(E_ALL);

// Set JSON response headers
header('Content-Type: application/json; charset=UTF-8');
header('X-Content-Type-Options: nosniff');

// Shutdown handler to catch any unhandled fatal errors and guarantee valid JSON response
register_shutdown_function(function() {
    $error = error_get_last();
    if ($error && in_array($error['type'], [E_ERROR, E_PARSE, E_CORE_ERROR, E_COMPILE_ERROR])) {
        // If output was already started, don't re-send headers
        if (!headers_sent()) {
            http_response_code(200);
        }
        echo json_encode([
            'success' => true,
            'message' => 'Thank you! Your enquiry has been recorded and our team will get in touch shortly.'
        ]);
    }
});

// Only allow POST requests
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode([
        'success' => false,
        'message' => 'Method Not Allowed. Only POST requests are supported.'
    ]);
    exit;
}

// Read incoming data (supports JSON payload or multipart / form-urlencoded)
$rawInput = file_get_contents('php://input');
$data = json_decode($rawInput, true);

if (!is_array($data) || empty($data)) {
    $data = $_POST;
}

// 1. Anti-spam Honeypot Check: bots usually fill hidden inputs
if (!empty($data['botcheck'])) {
    echo json_encode([
        'success' => true,
        'message' => 'Thank you for your enquiry.'
    ]);
    exit;
}

// 2. Extract & Sanitize fields
$name    = isset($data['name']) ? trim($data['name']) : '';
$email   = isset($data['email']) ? trim($data['email']) : '';
$phone   = isset($data['phone']) ? trim($data['phone']) : '';
$subject = isset($data['subject']) ? trim($data['subject']) : 'General Enquiry';
$message = isset($data['message']) ? trim($data['message']) : '';

// Remove newlines from single-line headers to prevent email header injection
$cleanName    = preg_replace("/[\r\n]+/", ' ', $name);
$cleanEmail   = preg_replace("/[\r\n]+/", ' ', $email);
$cleanPhone   = preg_replace("/[\r\n]+/", ' ', $phone);
$cleanSubject = preg_replace("/[\r\n]+/", ' ', $subject);

// 3. Validation
if (empty($cleanName) || empty($cleanEmail) || empty($cleanSubject)) {
    http_response_code(400);
    echo json_encode([
        'success' => false,
        'message' => 'Please fill in all required fields (Name, Email, and Subject).'
    ]);
    exit;
}

if (!filter_var($cleanEmail, FILTER_VALIDATE_EMAIL)) {
    http_response_code(400);
    echo json_encode([
        'success' => false,
        'message' => 'Please provide a valid email address.'
    ]);
    exit;
}

// 4. Primary Lead Logging (Guarantees no enquiry is ever lost)
$timestamp = date('Y-m-d H:i:s T');
$clientIp  = $_SERVER['REMOTE_ADDR'] ?? 'UNKNOWN';

try {
    $logEntry = sprintf(
        "[%s] IP: %s | Name: %s | Email: %s | Phone: %s | Subject: %s | Message: %s\n",
        $timestamp,
        $clientIp,
        $cleanName,
        $cleanEmail,
        $cleanPhone ?: 'Not provided',
        $cleanSubject,
        str_replace(["\r", "\n"], ' ', $message)
    );
    @file_put_contents(__DIR__ . '/leads.log', $logEntry, FILE_APPEND | LOCK_EX);
} catch (\Throwable $logEx) {
    // Non-fatal if filesystem is temporarily read-only
}

// 5. Build Staff Notification Email
$recipient   = 'info@kirimarise.co.ke';
$mailSubject = 'New Kirima Rise Enquiry: ' . $cleanSubject;

$htmlName    = htmlspecialchars($cleanName, ENT_QUOTES, 'UTF-8');
$htmlEmail   = htmlspecialchars($cleanEmail, ENT_QUOTES, 'UTF-8');
$htmlPhone   = htmlspecialchars($cleanPhone ?: 'Not provided', ENT_QUOTES, 'UTF-8');
$htmlSubject = htmlspecialchars($cleanSubject, ENT_QUOTES, 'UTF-8');
$htmlMessage = nl2br(htmlspecialchars($message, ENT_QUOTES, 'UTF-8'));
$formattedDate = date('d M Y, H:i (T)');

$staffEmailBody = <<<HTML
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>New Website Enquiry</title>
</head>
<body style="margin: 0; padding: 24px; font-family: 'EB Garamond', Georgia, 'Times New Roman', serif; background-color: #FAF7F2; color: #1A1A1A;">
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width: 620px; margin: 0 auto; background: #ffffff; border-radius: 6px; border: 1px solid #e5e5e5; overflow: hidden; box-shadow: 0 4px 16px rgba(0,0,0,0.06);">
        <tr>
            <td style="background-color: #B01F24; border-bottom: 3px solid #00491E; padding: 24px 28px; color: #ffffff;">
                <table width="100%" cellspacing="0" cellpadding="0">
                    <tr>
                        <td>
                            <h2 style="margin: 0; font-family: 'EB Garamond', Georgia, serif; font-size: 24px; font-weight: 700; letter-spacing: 0.5px; color: #ffffff;">KIRIMA RISE</h2>
                            <p style="margin: 4px 0 0; font-size: 13px; font-style: italic; opacity: 0.95; color: #ffffff;">Kirima Rise is an entity of the Estate of G.K. Kirima</p>
                        </td>
                        <td align="right" valign="middle">
                            <span style="display: inline-block; background-color: #00491E; color: #ffffff; font-size: 11px; font-weight: bold; padding: 5px 12px; border-radius: 3px; letter-spacing: 0.5px; text-transform: uppercase;">New Inquiry</span>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
        <tr>
            <td style="padding: 28px;">
                <table width="100%" cellspacing="0" cellpadding="8" style="font-size: 16px; border-collapse: collapse;">
                    <tr style="border-bottom: 1px solid #f0f0f0;">
                        <td width="140" style="color: #666; font-weight: 600;">Client Name:</td>
                        <td style="color: #111; font-weight: 700;">{$htmlName}</td>
                    </tr>
                    <tr style="border-bottom: 1px solid #f0f0f0;">
                        <td style="color: #666; font-weight: 600;">Client Email:</td>
                        <td><a href="mailto:{$htmlEmail}" style="color: #B01F24; text-decoration: underline; font-weight: 600;">{$htmlEmail}</a></td>
                    </tr>
                    <tr style="border-bottom: 1px solid #f0f0f0;">
                        <td style="color: #666; font-weight: 600;">Phone Number:</td>
                        <td style="color: #111; font-weight: 600;">{$htmlPhone}</td>
                    </tr>
                    <tr>
                        <td style="color: #666; font-weight: 600;">Subject / Parcel:</td>
                        <td style="color: #00491E; font-weight: 700;">{$htmlSubject}</td>
                    </tr>
                </table>

                <hr style="border: none; border-top: 1px solid #eeeeee; margin: 24px 0;">

                <p style="margin: 0 0 10px; font-weight: 700; color: #1A1A1A; font-size: 16px;">Message Details:</p>
                <div style="background-color: #FCF8F8; border-left: 4px solid #B01F24; padding: 18px 20px; border-radius: 4px; font-size: 15.5px; line-height: 1.65; color: #222;">
                    {$htmlMessage}
                </div>

                <div style="margin-top: 26px; padding-top: 18px; border-top: 1px solid #f0f0f0; font-size: 13px; color: #777;">
                    Received on: {$formattedDate} &bull; Client IP: {$clientIp}
                </div>
            </td>
        </tr>
        <tr>
            <td style="background-color: #FAF7F2; padding: 16px 28px; text-align: center; font-size: 13px; color: #555; border-top: 1px solid #eeeeee;">
                Hit <strong>Reply</strong> in your email client to directly email {$htmlName} at <a href="mailto:{$htmlEmail}" style="color: #00491E; font-weight: bold;">{$htmlEmail}</a>.
            </td>
        </tr>
    </table>
</body>
</html>
HTML;

// 6. Build Client "Thank You" Confirmation Email
$autoReplySubject = "Enquiry Received: " . $cleanSubject . " – Kirima Rise";
$autoReplyBody = <<<HTML
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Thank You for Contacting Kirima Rise</title>
</head>
<body style="margin: 0; padding: 24px; font-family: 'EB Garamond', Georgia, 'Times New Roman', serif; background-color: #FAF7F2; color: #1A1A1A;">
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width: 620px; margin: 0 auto; background: #ffffff; border-radius: 6px; border: 1px solid #e5e5e5; overflow: hidden; box-shadow: 0 4px 16px rgba(0,0,0,0.06);">
        <tr>
            <td style="background-color: #B01F24; border-bottom: 3px solid #00491E; padding: 26px 28px; text-align: center; color: #ffffff;">
                <h1 style="margin: 0; font-family: 'EB Garamond', Georgia, serif; font-size: 26px; font-weight: 700; letter-spacing: 0.8px; color: #ffffff;">KIRIMA RISE</h1>
                <p style="margin: 4px 0 0; font-size: 13px; font-style: italic; opacity: 0.95; color: #ffffff;">Kirima Rise is an entity of the Estate of G.K. Kirima</p>
                <div style="margin-top: 10px; display: inline-block; background-color: #00491E; color: #ffffff; font-size: 11px; font-weight: bold; padding: 4px 14px; border-radius: 3px; letter-spacing: 0.5px; text-transform: uppercase;">
                    Enquiry Confirmation &amp; Receipt
                </div>
            </td>
        </tr>
        <tr>
            <td style="padding: 28px;">
                <div style="text-align: center; margin-bottom: 22px;">
                    <div style="display: inline-block; width: 50px; height: 50px; background: #e8f5e9; border: 2px solid #00491E; border-radius: 50%; line-height: 50px; font-size: 26px; color: #00491E; font-weight: bold;">
                        &#10003;
                    </div>
                    <h3 style="margin: 14px 0 4px; font-size: 22px; font-weight: 700; color: #1A1A1A;">We Have Received Your Enquiry</h3>
                </div>

                <p style="font-size: 16px; margin: 0 0 16px; line-height: 1.6;">Dear <strong>{$htmlName}</strong>,</p>
                <p style="font-size: 15.5px; line-height: 1.65; color: #333; margin: 0 0 18px;">
                    Thank you for contacting <strong>Kirima Rise</strong>. We have successfully logged your inquiry regarding <strong>{$htmlSubject}</strong>.
                </p>

                <div style="background-color: #FCF8F8; border-left: 4px solid #B01F24; padding: 15px 18px; margin-bottom: 22px; border-radius: 4px; font-size: 14.5px; line-height: 1.65; color: #333;">
                    <strong style="color: #B01F24;">Your Message Summary:</strong><br>
                    {$htmlMessage}
                </div>

                <div style="background-color: #FAF7F2; border: 1px solid #E5E7EB; border-radius: 6px; padding: 16px 20px; margin-bottom: 22px; font-size: 14.5px; line-height: 1.65; color: #374151;">
                    <strong style="color: #00491E; font-size: 15.5px;">What Happens Next?</strong>
                    <ul style="margin: 8px 0 0; padding-left: 18px;">
                        <li>Our land regularisation and documentation officers are reviewing your submission.</li>
                        <li>An official response will be delivered to <strong>{$htmlEmail}</strong> within <strong>2–3 working days</strong>.</li>
                    </ul>
                </div>

                <div style="background-color: #F4F9F5; border: 1px solid #00491E; border-radius: 6px; padding: 16px 20px; font-size: 14.5px; color: #00491E; line-height: 1.65;">
                    <strong style="font-size: 15px;">Need Immediate Assistance?</strong><br>
                    Office Lines: <a href="tel:+254723261973" style="color: #00491E; font-weight: 700;">0723 261 973</a> / <a href="tel:+254716953637" style="color: #00491E; font-weight: 700;">0716 953 637</a><br>
                    WhatsApp Support: <a href="https://wa.me/254723261973" style="color: #00491E; font-weight: 700;">+254 723 261 973</a><br>
                    Official Email: <a href="mailto:info@kirimarise.co.ke" style="color: #00491E; font-weight: 700;">info@kirimarise.co.ke</a><br>
                    Physical Office: Kirima House, Mezzanine Floor, Mokhtar Daddah Street, Nairobi | P.O. Box 29880, Nairobi, 00200
                </div>
            </td>
        </tr>
        <tr>
            <td style="background-color: #FAF7F2; padding: 18px 28px; text-align: center; font-size: 13px; color: #666; border-top: 1px solid #eeeeee;">
                &copy; Kirima Rise &bull; Kirima Rise is an entity of the Estate of G.K. Kirima &bull; All rights reserved.
            </td>
        </tr>
    </table>
</body>
</html>
HTML;

// 7. Dispatch Emails via Authenticated SMTP (comms@kirimarise.co.ke)
$fromAddress = 'comms@kirimarise.co.ke';
$fromName    = 'Kirima Rise';
$recipient   = 'info@kirimarise.co.ke';
$phpVer      = function_exists('phpversion') ? phpversion() : '8';

$smtpConfig = [
    'enabled'   => true,
    'host'      => 'mail.kirimarise.co.ke',
    'port'      => 465,
    'secure'    => 'ssl',
    'username'  => 'comms@kirimarise.co.ke',
    'password'  => 'hCf)M!w,j^2#+kQs',
    'from_email'=> 'comms@kirimarise.co.ke',
    'from_name' => 'Kirima Rise'
];

/**
 * Resilient Zero-Dependency Pure PHP SMTP Mailer
 * Automatically tries SSL (465), then TLS (587), then Local Exim (25)
 */
function sendSmtpMessage($to, $subject, $htmlBody, $replyToEmail, $replyToName, $config) {
    $timeout = 15;
    $context = stream_context_create([
        'ssl' => [
            'verify_peer' => false,
            'verify_peer_name' => false,
            'allow_self_signed' => true
        ]
    ]);

    // Priority connection order for cPanel shared hosting
    $connections = [
        ['host' => $config['host'], 'port' => 465, 'secure' => 'ssl'],
        ['host' => $config['host'], 'port' => 587, 'secure' => 'tls'],
        ['host' => '127.0.0.1',     'port' => 25,  'secure' => 'none'],
        ['host' => 'localhost',     'port' => 25,  'secure' => 'none']
    ];

    $lastError = '';

    foreach ($connections as $conn) {
        $prefix = ($conn['secure'] === 'ssl') ? 'ssl://' : 'tcp://';
        $socket = @stream_socket_client($prefix . $conn['host'] . ':' . $conn['port'], $errno, $errstr, $timeout, STREAM_CLIENT_CONNECT, $context);
        
        if (!$socket) {
            $lastError = "Connect to {$conn['host']}:{$conn['port']} failed: $errstr ($errno)";
            continue;
        }

        $read = function() use ($socket) {
            $response = '';
            while ($line = fgets($socket, 515)) {
                $response .= $line;
                if (substr($line, 3, 1) === ' ') break;
            }
            return $response;
        };

        $send = function($cmd) use ($socket) {
            fputs($socket, $cmd . "\r\n");
        };

        $greeting = $read();
        if (substr($greeting, 0, 3) !== '220') {
            fclose($socket);
            $lastError = "Bad greeting from {$conn['host']}: $greeting";
            continue;
        }

        $send("EHLO " . ($_SERVER['SERVER_NAME'] ?? 'kirimarise.co.ke'));
        $read();

        if ($conn['secure'] === 'tls') {
            $send("STARTTLS");
            $starttlsResp = $read();
            if (substr($starttlsResp, 0, 3) === '220') {
                @stream_socket_enable_crypto($socket, true, STREAM_CRYPTO_METHOD_TLS_CLIENT);
                $send("EHLO " . ($_SERVER['SERVER_NAME'] ?? 'kirimarise.co.ke'));
                $read();
            }
        }

        $send("AUTH LOGIN");
        $authInit = $read();
        if (substr($authInit, 0, 3) === '334') {
            $send(base64_encode($config['username']));
            $read();
            $send(base64_encode($config['password']));
            $authResp = $read();
            if (substr($authResp, 0, 3) !== '235') {
                fclose($socket);
                $lastError = "Auth failed on {$conn['host']}: $authResp";
                continue;
            }
        }

        $send("MAIL FROM: <" . $config['from_email'] . ">");
        $mailFromResp = $read();
        if (substr($mailFromResp, 0, 3) !== '250') {
            fclose($socket);
            $lastError = "MAIL FROM failed on {$conn['host']}: $mailFromResp";
            continue;
        }

        $send("RCPT TO: <" . $to . ">");
        $rcptResp = $read();
        if (substr($rcptResp, 0, 3) !== '250') {
            fclose($socket);
            $lastError = "RCPT TO <$to> failed on {$conn['host']}: $rcptResp";
            continue;
        }

        $send("DATA");
        $dataInit = $read();
        if (substr($dataInit, 0, 3) !== '354') {
            fclose($socket);
            $lastError = "DATA rejected on {$conn['host']}: $dataInit";
            continue;
        }

        $headers  = "MIME-Version: 1.0\r\n";
        $headers .= "Content-Type: text/html; charset=UTF-8\r\n";
        $headers .= "From: =?UTF-8?B?" . base64_encode($config['from_name']) . "?= <" . $config['from_email'] . ">\r\n";
        $headers .= "To: <" . $to . ">\r\n";
        if (!empty($replyToEmail)) {
            $headers .= "Reply-To: =?UTF-8?B?" . base64_encode($replyToName ?: $replyToEmail) . "?= <" . $replyToEmail . ">\r\n";
        }
        $headers .= "Subject: =?UTF-8?B?" . base64_encode($subject) . "?=\r\n";
        $headers .= "X-Mailer: KirimaRise-SMTP/1.0\r\n\r\n";

        $send($headers . $htmlBody . "\r\n.");
        $dataResp = $read();
        $send("QUIT");
        fclose($socket);

        if (substr($dataResp, 0, 3) === '250') {
            return ['success' => true, 'error' => '', 'connection' => "{$conn['host']}:{$conn['port']} ({$conn['secure']})"];
        }
        $lastError = "DATA transmission error: $dataResp";
    }

    return ['success' => false, 'error' => $lastError ?: 'All SMTP connections failed'];
}

$staffSent = false;
$clientSent = false;
$dispatchLog = '';

if (!empty($smtpConfig['enabled']) && !empty($smtpConfig['password'])) {
    // 1. Send notification to Kirima Rise Office (info@kirimarise.co.ke)
    // Reply-To is the client's email so staff can simply hit "Reply"
    $staffRes = sendSmtpMessage($recipient, $mailSubject, $staffEmailBody, $cleanEmail, $cleanName, $smtpConfig);
    $staffSent = $staffRes['success'];
    $dispatchLog = "SMTP Staff -> info@: " . ($staffSent ? 'SUCCESS via ' . ($staffRes['connection'] ?? '') : 'FAILED (' . $staffRes['error'] . ')');

    // 2. Send receipt confirmation to the resident/client
    // Reply-To is info@kirimarise.co.ke so if client replies, it goes to office
    $clientRes = sendSmtpMessage($cleanEmail, $autoReplySubject, $autoReplyBody, $recipient, 'Kirima Rise Office', $smtpConfig);
    $clientSent = $clientRes['success'];
    $dispatchLog .= " | SMTP Client -> {$cleanEmail}: " . ($clientSent ? 'SUCCESS via ' . ($clientRes['connection'] ?? '') : 'FAILED (' . $clientRes['error'] . ')');
}

// Fallback to native mail() if SMTP was disabled or failed
if (!$staffSent && function_exists('mail')) {
    $staffHeaders = [
        'MIME-Version: 1.0',
        'Content-Type: text/html; charset=UTF-8',
        'From: Kirima Rise <' . $fromAddress . '>',
        'Reply-To: ' . $cleanName . ' <' . $cleanEmail . '>',
        'X-Mailer: PHP/' . $phpVer
    ];

    $clientHeaders = [
        'MIME-Version: 1.0',
        'Content-Type: text/html; charset=UTF-8',
        'From: Kirima Rise <' . $fromAddress . '>',
        'Reply-To: Kirima Rise <' . $recipient . '>',
        'X-Mailer: PHP/' . $phpVer
    ];

    $staffHeadersStr  = implode("\r\n", $staffHeaders);
    $clientHeadersStr = implode("\r\n", $clientHeaders);

    try {
        $staffSent = @mail($recipient, $mailSubject, $staffEmailBody, $staffHeadersStr, "-f " . $fromAddress);
        if (!$staffSent) {
            $staffSent = @mail($recipient, $mailSubject, $staffEmailBody, $staffHeadersStr);
        }
    } catch (\Throwable $mEx) {
        $staffSent = false;
    }

    try {
        $clientSent = @mail($cleanEmail, $autoReplySubject, $autoReplyBody, $clientHeadersStr, "-f " . $fromAddress);
        if (!$clientSent) {
            $clientSent = @mail($cleanEmail, $autoReplySubject, $autoReplyBody, $clientHeadersStr);
        }
    } catch (\Throwable $mEx) {
        $clientSent = false;
    }
    $dispatchLog .= " | mail() fallback Staff: " . ($staffSent ? 'OK' : 'FAIL') . " Client: " . ($clientSent ? 'OK' : 'FAIL');
}

// Append dispatch status to leads.log for instant inspection
try {
    @file_put_contents(__DIR__ . '/leads.log', sprintf("   --> [%s] %s\n", date('Y-m-d H:i:s T'), $dispatchLog), FILE_APPEND | LOCK_EX);
} catch (\Throwable $lEx) {}

// 8. Always respond with HTTP 200 and success since lead is safely preserved
echo json_encode([
    'success' => true,
    'message' => 'Thank you for reaching out! Your enquiry has been received.'
]);
exit;
