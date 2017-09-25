<?php
include "initialize.php";


//$sql 		= "SELECT * FROM wp_orders";
//$result 	= $conn->query($sql);
//while($row = $result->fetch_assoc()) {print_r($row);}
//print_r($result);	

/*
 * Retrieve the payment's current state.
*/
$payment  	= $mollie->payments->get($_POST["id"]);
$order_id 	= $payment->metadata->order_id;

/*
 * Update the order in the database. database_write($order_id, $payment->status);
*/
if($order_id!=null){
$nu 		= date('Y-m-d H:i:s', time()+3600);
$basisinfo  = array("_POSTid"=>$_POST["id"],"payment status"=>$payment->status, "last_update"=> $nu, "order_id"=>$order_id);
$sql 		= "update wp_orders set status='{$payment->status}', last_update='{$nu}' where order_id='{$order_id}'";
$result 	= $conn->query($sql);
}
	$fp = fopen('webhook.json', 'w');
 	fwrite($fp, json_encode($basisinfo));
 	fclose($fp);

?>	