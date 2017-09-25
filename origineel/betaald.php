<?php
include "initialize.php";
//$data 		= json_decode($_COOKIE['formData']);

$paymentID 	= $_COOKIE['paymentID'];
$payment 	= $mollie->payments->get($paymentID);


if ($payment->isPaid()){
    header("Location: tickets.html#!/bedankt");
}else if ($payment->isOpen()){
	echo"Nog niet betaald";
	//TODO: iets doen hier
}else{
	echo"Betalingsstatus onbekend";
	//TODO: iets doen hier
}

//unset($_COOKIE['betalingsinfo']);//aanzetten bij live
//unset($_COOKIE['paymentID']);//aanzetten bij live
//unset($_COOKIE['orderID']);//aanzetten bij live
//unset($_COOKIE['meelopers']);//aanzetten bij live 

?>	