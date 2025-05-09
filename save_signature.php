<?php
if (isset($_POST['signature'])) {
    $data = $_POST['signature'];
 
    $data = str_replace('data:image/png;base64,', '', $data);
    $data = str_replace(' ', '+', $data);
    $signatureData = base64_decode($data);
 
    $fileName = 'signatures/signature_' . time() . '.png';
    file_put_contents($fileName, $signatureData);
 
    echo "<p>Your signature saved successfully.</p>";
    echo "<img src='$fileName' width='400'/>";
} else {
    echo "<p> No signature data received!</p>";
}
