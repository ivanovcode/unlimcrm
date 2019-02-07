 <?php
class AdminController extends Controller {
    function beforeroute() {
        $this->db->exec("SET sql_mode = ''");        
        $u_id = $this->f3->get('COOKIE.u_id');
        $u_hash = $this->f3->get('COOKIE.u_hash');
        if (isset($u_id) AND isset($u_hash)) { 
            $auth = $this->db->exec("SELECT * FROM  `users` WHERE  `user_id` =".$u_id." AND  `user_hash` LIKE  '".$u_hash."' LIMIT 1", NULL, 60);
            if(!$auth) {                
                $this->auth();
                //$this->pushJSON(false, "signin invalid");
                $template = \Template::instance();       
                echo $template->render('login.html');
                die();
            }
        } else {
            //$this->pushJSON(false, "cookies invalid");
            $template = \Template::instance();       
            echo $template->render('login.html');
            die();
        }

        $nav = [];
        $this->f3->set('user_name', $auth[0]['user_name']);


        $path = explode('/', 'http://'.$_SERVER['HTTP_HOST'].$_SERVER['REQUEST_URI']);
        $nav['dashboard']['href'] = '#dashboard';
        $nav['dashboard']['class'] = 'class=dashboard';
        $nav['dashboard']['icon'] = 'fa-tachometer';
        $nav['dashboard']['title'] = 'Рабочий стол';
        $nav['deals']['href'] = '#deals';
        $nav['deals']['class'] = 'class=deals';
        $nav['deals']['icon'] = 'fa-rub';
        $nav['deals']['title'] = 'Сделки';
        $nav['tasks']['href'] = '#tasks';
        $nav['tasks']['class'] = 'class=tasks';
        $nav['tasks']['icon'] = 'fa-tasks';
        $nav['tasks']['title'] = 'Задачи';
        $nav['lists']['href'] = '#lists';
        $nav['lists']['class'] = 'class=lists';
        $nav['lists']['icon'] = 'fa-list';
        $nav['lists']['title'] = 'Списки';
        $nav['settings']['href'] = '#settings';
        $nav['settings']['class'] = 'class=settings';
        $nav['settings']['icon'] = 'fa-cog';
        $nav['settings']['title'] = 'Настройки';


        if (intval(strpos($path[4], "?")) > 0) $path[4]=substr($path[4], 0, strpos($path[4], "?"));
        if($path[4]=='places') $path[4]='showrooms';
        if($path[4]=='colors') $path[4]='showrooms';
        if($path[4]=='categories') $path[4]='showrooms';
        if($path[4]=='sizes') $path[4]='showrooms';
        if($path[4]=='reserve') $path[4]='seller';
        if($path[4]=='help') $path[4]='settings';
         
       


        $nav[$path[4]]['class'] = 'class=active';
        $nav[$path[4]]['active'] = 'active';    
        $this->f3->set('nav_list', $nav);  

        $this->f3->set('breadcrumbs', 'CRM');  
        if($path[4]=='seller')  $this->f3->set('breadcrumbs', 'Витрина продавца'); 
        if($path[4]=='finance')  $this->f3->set('breadcrumbs', 'Касса'); 
    }
    function index() {        
        //$this->f3->reroute('/admin');
        $template = \Template::instance();
        echo $template->render('admin.html');
    }


}
?>