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


$or = json_decode('{"status":"ok","inschrijving_status":"1","Trainingsshirt":{"sizes":{"v":["xs","s","m","l","xl","xxl"],"m":["s","m","l","xl","xxl","xxxl"]}},"Hoodie":{"sizes":{"s":"s","m":"m","l":"l","xl":"xl","xxl":"xxl"}},"dorpen":{"Easterein":{"ID":9,"post_author":"1","post_date":"2017-08-27 21:11:03","post_date_gmt":"2017-08-27 19:11:03","post_content":"In Easterein is het dorp zelf een bont en kleurrijk festivalterrein. De deuren van de huizen gaan open en de inwoners ontvangen de gasten (wandelaars en publiek) met een persoonlijk, intiem en cultureel warm programma. Knusse huismakerconcerten, een broeierige verhalenzolder, brass in een verborgen tuin, vijverkunst met <em>kwakende kikkers<\/em>, een s\u00fbn&amp;streekfoodplein, exposities in de stal van de boer of tuinhuisbioscoopjes. Het zijn zomaar wat voorbeelden van wat we zouden kunnen verwachten in Easterein. De inwoners laten zien wat ze kunnen, wat ze fascineert of waar ze zich zorgen over maken, samen met bekende kunstenaars.","post_title":"Easterein","post_excerpt":"","post_status":"publish","comment_status":"closed","ping_status":"closed","post_password":"","post_name":"easterein-2","to_ping":"","pinged":"","post_modified":"2017-09-22 15:14:46","post_modified_gmt":"2017-09-22 13:14:46","post_content_filtered":"","post_parent":0,"guid":"http:\/\/slachtemarathon.nl\/?post_type=dorp&#038;p=9","menu_order":0,"post_type":"dorp","post_mime_type":"","comment_count":"0","filter":"raw","afbeelding":"http:\/\/109.71.51.192\/wp-content\/uploads\/2017\/07\/easterein.svg","typering":"open thuis","afstand":"na 40 km op dag 1","uniek":"Easterein","inschrijf_status":"1","groepsaccomodaties":50,"thuis":60,"festipi":22,"tenten":170,"campers":41},"Wommels":{"ID":11,"post_author":"1","post_date":"2017-08-26 21:14:32","post_date_gmt":"2017-08-26 19:14:32","post_content":"In Wommels werken de organisaties van it Greidhoekfestival en Slachtepop samen met de Slachtecommissie. Een festival in het dorp waar op verschillende plekken muziek wordt geprogrammeerd. Het dorp is het festivalterrein. Op verschillende hoeken en in allerlei gebouwen kun je van muziek genieten.","post_title":"Wommels","post_excerpt":"","post_status":"publish","comment_status":"closed","ping_status":"closed","post_password":"","post_name":"wommels","to_ping":"","pinged":"","post_modified":"2017-09-23 05:45:18","post_modified_gmt":"2017-09-23 03:45:18","post_content_filtered":"","post_parent":0,"guid":"http:\/\/slachtemarathon.nl\/?post_type=dorp&#038;p=11","menu_order":0,"post_type":"dorp","post_mime_type":"","comment_count":"0","filter":"raw","afbeelding":"http:\/\/109.71.51.192\/wp-content\/uploads\/2017\/07\/wommels.svg","typering":"Muzieknacht","afstand":"na 42,5 km op dag 1","uniek":"Wommels","inschrijf_status":"1","groepsaccomodaties":100,"thuis":87,"festipi":150,"tenten":679,"campers":407},"Kubaard":{"ID":12,"post_author":"1","post_date":"2017-08-25 21:15:05","post_date_gmt":"2017-08-25 19:15:05","post_content":"K\u00fbbaard is het dorp waar landart\/landschapskunst centraal staat. Grote gebaren in de openbare ruimte. Uitgevoerd door spraakmakende kunstenaars \u00e9n inwoners van K\u00fbbaard en omgeving. Het landschap als canvas voor spannende grote beelden en verrassende acties die de fantasie prikkelen. In K\u00fbbaard beleven we door beeldende kunst de schoonheid van het landschap.","post_title":"Kubaard","post_excerpt":"","post_status":"publish","comment_status":"closed","ping_status":"closed","post_password":"","post_name":"kubaard","to_ping":"","pinged":"","post_modified":"2017-09-23 05:45:47","post_modified_gmt":"2017-09-23 03:45:47","post_content_filtered":"","post_parent":0,"guid":"http:\/\/slachtemarathon.nl\/?post_type=dorp&#038;p=12","menu_order":0,"post_type":"dorp","post_mime_type":"","comment_count":"0","filter":"raw","afbeelding":"http:\/\/109.71.51.192\/wp-content\/uploads\/2017\/07\/kubaard.svg","typering":"Landschapskunst","afstand":"na 44,5 km op dag 1","uniek":"Kubaard","inschrijf_status":"1","groepsaccomodaties":100,"thuis":15,"festipi":23,"tenten":1190,"campers":507},"Tsjom":{"ID":14,"post_author":"1","post_date":"2017-07-27 21:16:04","post_date_gmt":"2017-07-27 21:16:04","post_content":"Drones, dj\u2019s en vj\u2019s. Tsjom wordt een\u00a0videokunstdorp. Met digitale media en met techniek gaan kunstenaars samen met de inwoners aan de slag. Projecties op de meest gekke plekken, films, lichtkunstwerken of multimediale kunst. Verbazing voert de boventoon.","post_title":"Tsjom","post_excerpt":"","post_status":"publish","comment_status":"closed","ping_status":"closed","post_password":"","post_name":"tsjom","to_ping":"","pinged":"","post_modified":"2017-09-23 05:46:42","post_modified_gmt":"2017-09-23 03:46:42","post_content_filtered":"","post_parent":0,"guid":"http:\/\/slachtemarathon.nl\/?post_type=dorp&#038;p=14","menu_order":0,"post_type":"dorp","post_mime_type":"","comment_count":"0","filter":"raw","afbeelding":"http:\/\/109.71.51.192\/wp-content\/uploads\/2017\/07\/tsjom.svg","typering":"videokunst","afstand":"na bijna 50 km op dag 1","uniek":"Tzum","inschrijf_status":"1","groepsaccomodaties":99,"thuis":12,"festipi":23,"tenten":348,"campers":-2},"Tritzum":{"ID":13,"post_author":"1","post_date":"2017-08-24 21:15:34","post_date_gmt":"2017-08-24 19:15:34","post_content":"In Tritzum staat het programma van Ontwakend Landschap centraal. Bij Ontwakend Landschap breng je de nacht door met het mooiste uitzicht van de wereld: de prachtige sterrenhemel. Je overnacht in een tent. Bij het krieken van de dag ontwaak je met het geluid van het landschap, verstrengeld met klanken en po\u00ebzie uit landen die de grutto aandoet op zijn migratieroute.\r\n<p class=\"p1\"><span class=\"s1\"><b>Let op! Tritzum is alleen een extra keuzemogelijkheid voor Freonen. Hierbij is een avondmaaltijd (driegangendiner van streekproducten) inbegrepen.<\/b><\/span><\/p>\r\n<a href=\"http:\/\/www.pier21.nl\/page\/actueel\/ontwakend-landschap\/\">Kijk op de website van Ontwakend Landschap <\/a>voor meer informatie. Ontwakend Landschap tijdens de Slachtemarathon is overigens zonder de theatervoorstelling. Op de site staat ook een mooi filmpje!","post_title":"Tritzum","post_excerpt":"","post_status":"publish","comment_status":"closed","ping_status":"closed","post_password":"","post_name":"tritzum","to_ping":"","pinged":"","post_modified":"2017-09-23 05:47:26","post_modified_gmt":"2017-09-23 03:47:26","post_content_filtered":"","post_parent":0,"guid":"http:\/\/slachtemarathon.nl\/?post_type=dorp&#038;p=13","menu_order":0,"post_type":"dorp","post_mime_type":"","comment_count":"0","filter":"raw","afbeelding":"http:\/\/109.71.51.192\/wp-content\/uploads\/2017\/07\/tritzum.svg","typering":"ontwakend landschap","afstand":"na 46,5 km op dag 1 (alleen voor Freonen) ","uniek":"Tritzum","inschrijf_status":"1","groepsaccomodaties":0,"thuis":0,"festipi":-1,"tenten":106,"campers":0}},"starttijden":[{"selector":"06:30-07:00","van":"06:30","tot":"07:00","capaciteit":"1140","inschrijvingen":"66"},{"selector":"07:00-08:00","van":"07:00","tot":"08:00","capaciteit":"2360","inschrijvingen":"41"},{"selector":"08:00-09:00","van":"08:00","tot":"09:00","capaciteit":"3000","inschrijvingen":"4"},{"selector":"09:00-10:00","van":"09:00","tot":"10:00","capaciteit":"2500","inschrijvingen":"2"}]}');
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
		
		
		$sql3 		= "SELECT m1.post_title, m1.post_content , m2.meta_value as afstand, m3.meta_value as inschrijf_status,
m4.meta_value as typering
FROM wp_posts m1 
join wp_postmeta m2 on (m1.ID = m2.post_id and m2.meta_key = 'afstand')
join wp_postmeta m3 on (m1.ID = m3.post_id and m3.meta_key = 'inschrijf_status')
join wp_postmeta m4 on (m1.ID = m4.post_id and m4.meta_key = 'typering')
where m1.post_type='dorp' 
and m1.post_status='publish' 
ORDER BY m1.ID ASC limit 0,5";
		$dorpen 	= array();
		$result3 	= $conn->query($sql3);
		while($dorp = $result3->fetch_assoc()) {
			$dorp[post_content] = iconv('UTF-8', 'UTF-8//IGNORE', utf8_encode($dorp[post_content]));
			$dorpen[$dorp[post_title]] = $dorp;
			//$starttijden[] = $row;//print_r($row);
		}
		/*	
			print_r($or);//print_r($dorp);
			SELECT * FROM `wp_posts` where post_type="dorp" and post_status="publish" ORDER BY `wp_posts`.`ID` ASC limit 0,5
		
			dorp.inschrijf_status
			dorp.post_title
			dorp.afstand
			dorp.typering
			dorp.post_content
			
			$basisinfo["Trainingsshirt"]['sizes'] 	= array();
			$basisinfo["Trainingsshirt"]['sizes']["v"] 	= array();
			$basisinfo["Trainingsshirt"]['sizes']["m"] 	= array();
			$basisinfo["Hoodie"]['sizes'] 			= array();
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
		
		
		
		//$r = json_encode($return);
		//$return = iconv('UTF-8', 'UTF-8//IGNORE', utf8_encode($return));
		echo json_encode($return);
		//echo json_last_error();
		//print_r($r);
	}
}


new API();


/*
	$basisinfo["Trainingsshirt"]['sizes'] 	= array();
	$basisinfo["Trainingsshirt"]['sizes']["v"] 	= array();
	$basisinfo["Trainingsshirt"]['sizes']["m"] 	= array();
	$basisinfo["Hoodie"]['sizes'] 			= array();
	//$basisinfo["Hoodie"]['sizes']["v"] 	= array();
	//$basisinfo["Hoodie"]['sizes']["m"] 	= array();
	$modellen 				= $wpdb->get_results("SELECT * from modellen order by modelID", OBJECT);
	
 	foreach($modellen as $model){
	 	//if(!is_array($basisinfo['modellen'][$model->product])) ? $basisinfo['modellen'][$model->product]=array() : "";
	 	if($model->product=="Trainingsshirt"){
	 	$basisinfo[$model->product]['sizes'][$model->model][] = $model->maat;
	 	}else{
		$basisinfo[$model->product]['sizes'][$model->maat] = $model->maat; 	
	 	}
	 	//echo $model->product;
 	}
*/	
?>	