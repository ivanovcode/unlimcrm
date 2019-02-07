<?php
class SettingsController extends AdminController {

    function index() {
        $template = \Template::instance();
        echo $template->render('settings.html');
    }

}
?>
