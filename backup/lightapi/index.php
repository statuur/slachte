<?php
header('Access-Control-Allow-Origin: *');
/*ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);
*/
//print_r($_GET);
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
	
//$link = mysqli_connect(DB_HOST, DB_USER, DB_PASSWORD, DB_NAME);
$conn = new mysqli(DB_HOST, DB_USER, DB_PASSWORD, DB_NAME);



if(method_exists("API", $_GET['function'])){
			$functie = $_GET['function'];
			"API"::$functie();
}			
			
class API{
	
 
	
	function __construct(){
		
	}
	
	function status(){
		global $conn;
		$sql = "SELECT option_value as inschrijving_status FROM wp_options where option_name='inschrijvingenstatus'";
		$result = $conn->query($sql);
		//{"status":"ok","inschrijving_status":"1",
		$status = $result->fetch_assoc()['inschrijving_status'];
		$return = array("status"=>"ok","inschrijving_status"=>$status);
		echo json_encode($return);
	}
	
	function basisinfo(){
		global $conn, $or;
		$sql1 		= "SELECT option_value as inschrijving_status FROM wp_options where option_name='inschrijvingenstatus'";
		$result1 	= $conn->query($sql1);
		$status 	= $result1->fetch_assoc()['inschrijving_status'];
		$sql2 		= "SELECT selector, DATE_FORMAT(van, '%H:%i') as van, DATE_FORMAT(tot, '%H:%i') as tot, capaciteit, inschrijvingen FROM wp_starttijden";
		$result2 	= $conn->query($sql2);
		$starttijden = array();
		
		while($starttijd = $result2->fetch_assoc()) {
			$starttijden[] = $starttijd;//print_r($row);
		}
		
		
		$sql3 		= "SELECT m1.post_title, 
m1.post_content, 
m2.meta_value as afstand, 
m3.meta_value as inschrijf_status,
m4.meta_value as typering, 
m5.meta_value as uniek, 
m6.meta_value as c_groepsaccomodaties,
m7.meta_value as groepsaccomodaties,

m8.meta_value as c_thuis,
m9.meta_value as thuis,
m10.meta_value as c_festipi,
m11.meta_value as festipi,

m12.meta_value as c_tenten,
m13.meta_value as tenten,

m14.meta_value as c_campers,
m15.meta_value as campers

FROM wp_posts m1 
join wp_postmeta m2 on (m1.ID = m2.post_id and m2.meta_key = 'afstand')
join wp_postmeta m3 on (m1.ID = m3.post_id and m3.meta_key = 'inschrijf_status')
join wp_postmeta m4 on (m1.ID = m4.post_id and m4.meta_key = 'typering')
join wp_postmeta m5 on (m1.ID = m5.post_id and m5.meta_key = 'unieke_naam')
join wp_postmeta m6 on (m1.ID = m6.post_id and m6.meta_key = 'c_groepsaccomodaties')
join wp_postmeta m7 on (m1.ID = m7.post_id and m7.meta_key = 'groepsaccomodaties')

join wp_postmeta m8 on (m1.ID = m8.post_id and m8.meta_key = 'c_thuis')
join wp_postmeta m9 on (m1.ID = m9.post_id and m9.meta_key = 'thuis')
join wp_postmeta m10 on (m1.ID = m10.post_id and m10.meta_key = 'c_festipi')
join wp_postmeta m11 on (m1.ID = m11.post_id and m11.meta_key = 'festipi')

join wp_postmeta m12 on (m1.ID = m12.post_id and m12.meta_key = 'c_tenten')
join wp_postmeta m13 on (m1.ID = m13.post_id and m13.meta_key = 'tenten')

join wp_postmeta m14 on (m1.ID = m14.post_id and m14.meta_key = 'c_campers')
join wp_postmeta m15 on (m1.ID = m15.post_id and m15.meta_key = 'campers')

where m1.post_type='dorp' 
and m1.post_status='publish' 
ORDER BY m1.ID ASC limit 0,5";
		$dorpen 	= array();
		$result3 	= $conn->query($sql3);
		while($dorp = $result3->fetch_assoc()) {
			$dorp['groepsaccomodaties'] = $dorp['c_groepsaccomodaties'] - $dorp['groepsaccomodaties'];
			$dorp['thuis'] 				= $dorp['c_thuis'] - $dorp['thuis'];
			$dorp['festipi'] 			= $dorp['c_festipi'] - $dorp['festipi'];
			$dorp['tenten'] 			= $dorp['c_tenten'] - $dorp['tenten'];
			$dorp['campers'] 			= $dorp['c_campers'] - $dorp['campers'];	
			$dorp[post_content] 		= iconv('UTF-8', 'UTF-8//IGNORE', utf8_encode($dorp[post_content]));
			$dorpen[$dorp[post_title]] 	= $dorp;
			//$starttijden[] = $row;//print_r($row);
		}
		//print_r($dorpen);
		//die();
		/*	
		$post->groepsaccomodaties	= get_field("c_groepsaccomodaties", $translatedID) - get_field("groepsaccomodaties", $translatedID);
		$post->thuis				= get_field("c_thuis", $translatedID) - get_field("thuis", $translatedID);
		$post->festipi			= get_field("c_festipi", $translatedID) - get_field("festipi", $translatedID);
		$post->tenten				= get_field("c_tenten", $translatedID) - get_field("tenten", $translatedID);
		$post->campers			= get_field("c_campers", $translatedID) - get_field("campers", $translatedID);
		
		*/
		
		
		$sql4 		= "SELECT * from modellen order by modelID";
		$result4 	= $conn->query($sql4);
		$return 	= array("status"=>"ok","inschrijving_status"=>$status, "starttijden"=>$starttijden, "dorpen"=>$dorpen);
		
		$return["Trainingsshirt"]					= array();
		$return["Trainingsshirt"]['sizes'] 			= array();
		$return["Trainingsshirt"]['sizes']["v"] 	= array();
		$return["Trainingsshirt"]['sizes']["m"] 	= array();
		$return["Hoodie"]							= array();
		$return["Hoodie"]['sizes'] 					= array();
		/**/
		while($model 	= $result4->fetch_assoc()) {
			//print_r($model );
			if($model['product']=="Trainingsshirt"){
				$return[$model['product']]['sizes'][$model['model']][] = $model['maat'];
			}else{
				$return[$model['product']]['sizes'][$model['maat']] = $model['maat'];	
				$basisinfo[$model->product]['sizes'][$model->maat] = $model->maat; 	
			}	
		}	
		
		
			
		
		echo json_encode($return);
		//echo json_last_error();
		//print_r($r);
	}
}


new API();
?>	