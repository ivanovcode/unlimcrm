 <?php
class Controller {
    protected $f3;
    protected $db;
    function beforeroute() {
    }
    function afterroute() {
    }
    function __construct($f3) {
        $this->f3=$f3;    
        $this->db=$f3->get('DB');
    }
    function rus2translit($string) {
        $converter = array(
            'а' => 'a',   'б' => 'b',   'в' => 'v',
            'г' => 'g',   'д' => 'd',   'е' => 'e',
            'ё' => 'e',   'ж' => 'zh',  'з' => 'z',
            'и' => 'i',   'й' => 'y',   'к' => 'k',
            'л' => 'l',   'м' => 'm',   'н' => 'n',
            'о' => 'o',   'п' => 'p',   'р' => 'r',
            'с' => 's',   'т' => 't',   'у' => 'u',
            'ф' => 'f',   'х' => 'h',   'ц' => 'c',
            'ч' => 'ch',  'ш' => 'sh',  'щ' => 'sch',
            'ь' => '\'',  'ы' => 'y',   'ъ' => '\'',
            'э' => 'e',   'ю' => 'yu',  'я' => 'ya',
            
            'А' => 'A',   'Б' => 'B',   'В' => 'V',
            'Г' => 'G',   'Д' => 'D',   'Е' => 'E',
            'Ё' => 'E',   'Ж' => 'Zh',  'З' => 'Z',
            'И' => 'I',   'Й' => 'Y',   'К' => 'K',
            'Л' => 'L',   'М' => 'M',   'Н' => 'N',
            'О' => 'O',   'П' => 'P',   'Р' => 'R',
            'С' => 'S',   'Т' => 'T',   'У' => 'U',
            'Ф' => 'F',   'Х' => 'H',   'Ц' => 'C',
            'Ч' => 'Ch',  'Ш' => 'Sh',  'Щ' => 'Sch',
            'Ь' => '\'',  'Ы' => 'Y',   'Ъ' => '\'',
            'Э' => 'E',   'Ю' => 'Yu',  'Я' => 'Ya',
        );
        return strtr($string, $converter);
    }
    function str2url($str) {
        // переводим в транслит
        $str = $this->rus2translit($str);
        // в нижний регистр
        $str = strtolower($str);
        // заменям все ненужное нам на "-"
        $str = preg_replace('~[^-a-z0-9_]+~u', '-', $str);
        // удаляем начальные и конечные '-'
        $str = trim($str, "-");
        return $str;
    }
    function test() {
        echo md5(md5('1q2w3e4drcash'));
    }
    function sqlij($str='') { 
        if (get_magic_quotes_gpc()) { 
            $str = stripslashes($str); 
        }  
        //$str = mysql_real_escape_string($str); 
        $str = trim($str); 
        $str = htmlspecialchars($str); 
        return $str; 
    } 
    function init_sqlij() { 
        $arrs = array($_GET, $_POST, $_COOKIE); 
        foreach($arrs as $arr_key => $arr_value){ 
            if(is_array($arr_value)){ 
                foreach($arr_value as $key => $value){ 
                    $nbz1=substr_count($value,'--'); 
                    $nbz2=substr_count($value,'/*'); 
                    $nbz3=substr_count($value,"'"); 
                    $nbz4=substr_count($value,'"');
                    $nbz5=substr_count($value,'SELECT');  
                    if($nbz1>0 || $nbz2>0 || $nbz3>0 || $nbz4>0 || $nbz5>0){ 
                        $this->pushJSON(false, 'dangerous injection', '', $key);
                        die(); 
                    } 
                } 
            } 
        } 
    }
    function pushJSON($status, $msg=null, $code=null, $target=null, $die=true) { 
        $response = [];
        $response['response']['success'] = $status; 
        if(!empty($msg)) { $response['response']['msg'] = $msg; }
        if(!empty($code)) { $response['response']['code'] = $code; }
        if(!empty($target)) { $response['response']['target'] = $target; }
        echo json_encode($response); 
        if($die==true) die();
    }
    function is_email($email) {
      return preg_match("/^([a-zA-Z0-9])+([\.a-zA-Z0-9_-])*@([a-zA-Z0-9_-])+(\.[a-zA-Z0-9_-]+)*\.([a-zA-Z]{2,6})$/", $email);
    }
    function generateCode($length=6) {
        $chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHI JKLMNOPRQSTUVWXYZ0123456789";
        $code = "";
        $clen = strlen($chars) - 1;  
        while (strlen($code) < $length) {

                $code .= $chars[mt_rand(0,$clen)];  
        }
        return $code;
    }
    function auth($user_id='', $hash='') {        
        $this->f3->set('COOKIE.u_id', $user_id, time()+60*60*24*30); 
        $this->f3->set('COOKIE.u_hash', $hash, time()+60*60*24*30);
    } 
}
?>