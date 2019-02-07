<?php
class DealsController extends AdminController {

    function index() {
        $template = \Template::instance();
        echo $template->render('deals.html');
    }

}
?>
