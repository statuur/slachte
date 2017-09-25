<?php
/*
 * Initialize the Mollie API library with your API key.
 *
 * See: https://www.mollie.com/beheer/account/profielen/
 */

if( $_SERVER['SCRIPT_FILENAME'] == __FILE__ ){
	die("Access denied.");
}

require __DIR__ . '/vendor/autoload.php'; 
$mollie 	= new Mollie_API_Client;
$mollie->setApiKey("live_jFNnuecV8xpD2Dv5xDdexHGa9GBsBc");
//live_jFNnuecV8xpD2Dv5xDdexHGa9GBsBc
//test_PJwpgBPSccEx7WE3WQeDrayRGnw8pc
//$issuers = $mollie->issuers->all();	

/** The name of the database for WordPress */
define('DB_NAME', 'slachtem_wp1');

/** MySQL database username */
define('DB_USER', 'root');

/** MySQL database password */
define('DB_PASSWORD', 'sl@chte1!');

/** MySQL hostname */
define('DB_HOST', 'localhost');

/** Database Charset to use in creating database tables. */
define('DB_CHARSET', 'utf8');

/** The Database Collate type. Don't change this if in doubt. */
define('DB_COLLATE', '');

//echo DB_NAME;
// Create connection
$conn = new mysqli(DB_HOST, DB_USER, DB_PASSWORD, DB_NAME);
// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
} 

?>