<?php
class TasksController extends AdminController {

    function index() {
        $template = \Template::instance();
        echo $template->render('tasks.html');
    }

}
?>
