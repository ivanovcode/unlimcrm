<?php echo $this->render('admin/header.html',NULL,get_defined_vars(),0); ?>
<!-- Main Content -->
<div id="article"></div>
<script>
    var items = document.querySelectorAll('nav[role=navigation] li');
    var route = function (event) {
        let hash = (window.location.hash.substr(1) ? window.location.hash.substr(1) : 'deals');

        includeHTML('admin/' + hash, document.getElementById('article'), function(){
            includeHTML('app/views/assets/js/app/test.js?244212');
        });
        [].forEach.call(items, function (el) { el.className = el.className.replace(/\bactive\b/, "") });
        document.getElementsByClassName(hash)[0].className += " active";
    };
    document.addEventListener("DOMContentLoaded", route, false);
    window.addEventListener("hashchange", route, false);
    /*[].forEach.call(items, function (item) { item.childNodes[1].addEventListener("click", route, true); });*/
</script>
<?php echo $this->render('admin/footer.html',NULL,get_defined_vars(),0); ?>