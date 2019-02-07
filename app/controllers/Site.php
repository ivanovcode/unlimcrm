<?php
class SiteController extends Controller {
    function index() {
        $this->f3->reroute('/admin');
    }
}
?>