<?php
class ListsController extends AdminController {

    function index() {
        $template = \Template::instance();
        echo $template->render('lists.html');
    }

}
?>
