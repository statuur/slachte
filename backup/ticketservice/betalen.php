<?php
$data = json_decode($_COOKIE['betalingsinfo']);
//print_r($data);
//die();

//if($data->totaalbedrag=="" || $_SERVER[HTTP_REFERER]!="https://www.slachtemarathon.nl/ticketservice/tickets.html"){
//	die("no access");
//}

include "initialize.php";
//$data->orderID		= time() . mt_rand() . $data->reg->userID;
$orderID			= time() . mt_rand() . $data->userID;
$payment		 	= $mollie->payments->create(array(
    "amount"      => $data->totaalbedrag,
    "description" => $data->kaarten." startkaarten voor ".$data->voornaam." ".$data->achternaam,
    "redirectUrl" => "https://www.slachtemarathon.nl/ticketservice/betaald.php?order_id={$data->order_id}",
    "webhookUrl"  => "https://www.slachtemarathon.nl/ticketservice/webhook.php",
));

//$data->paymentID  = $payment->id;

//setcookie("formData", json_encode($data), time()+3600, "/ticketservice","", true);
setcookie("orderID", $orderID, time()+3600, "/ticketservice","", true);
setcookie("paymentID", $payment->id, time()+3600, "/ticketservice","", true);


/***** misschien de introducees ook updaten ****/
$service_url = 'https://www.slachtemarathon.nl/api/freon/storePayment';
$curl = curl_init( $service_url);

curl_setopt( $curl, CURLOPT_POST, true );
curl_setopt( $curl, CURLOPT_POSTFIELDS, array(
'userID' 	=> $data->userID,
'paymentID' => $payment->id,
'order_id'	=> $orderID,
'amount'	=> $data->totaalbedrag
) );

curl_setopt( $curl, CURLOPT_RETURNTRANSFER, 1);
$auth 		= curl_exec( $curl );
$succes 	= json_decode($auth);

if($succes->status=="ok"){
	//print_r($succes);
	header("Location: " . $payment->getPaymentUrl());
}else{
	 throw new Exception('Het opslaan van gegevens is helaas mislukt, herlaadt de pagina.');
	 die;
}
?>	
<!doctype html>
<html class="welkom">
  <head>
    <meta charset="utf-8">
    <title>Slachtemarathon 2018  | Ticketservice</title>
    <link rel="shortcut icon" href="images/icons/favicon.ico" type="image/x-icon" />
	<link rel="apple-touch-icon" href="images/icons/apple-touch-icon.png" />
	<link rel="apple-touch-icon" sizes="57x57" href="images/icons/apple-touch-icon-57x57.png" />
	<link rel="apple-touch-icon" sizes="72x72" href="images/icons/apple-touch-icon-72x72.png" />
	<link rel="apple-touch-icon" sizes="76x76" href="images/icons/apple-touch-icon-76x76.png" />
	<link rel="apple-touch-icon" sizes="114x114" href="images/icons/apple-touch-icon-114x114.png" />
	<link rel="apple-touch-icon" sizes="120x120" href="images/icons/apple-touch-icon-120x120.png" />
	<link rel="apple-touch-icon" sizes="144x144" href="images/icons/apple-touch-icon-144x144.png" />
	<link rel="apple-touch-icon" sizes="152x152" href="images/icons/apple-touch-icon-152x152.png" />
	<link rel="apple-touch-icon" sizes="180x180" href="images/icons/apple-touch-icon-180x180.png" />
	<meta name="description" content="Ticketservice Slachtemarathon">
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no">
    <link rel="stylesheet" href="styles/main.css">
    <!-- automatisch posten form uw wordt doorgeschakeld. -->
 </head>
<body>
<h1 style="position:absolute;left:50%;top:50%;transform: translate(-50%,-50%)">doorschakelen...</h1>
		
</body> 
</html>	