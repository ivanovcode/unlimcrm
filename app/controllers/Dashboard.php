<?php
class DashboardController extends AdminController {

    function index() {
        $template = \Template::instance();
        echo $template->render('dashboard.html');
    }

}
?>