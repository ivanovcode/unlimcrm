<!DOCTYPE html>
<html>

<head>
    <title>unlimCRM Beta</title>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <!-- Fonts -->
    <link href='http://fonts.googleapis.com/css?family=Roboto+Condensed:300,400' rel='stylesheet' type='text/css'>
    <link href='http://fonts.googleapis.com/css?family=Lato:300,400,700,900' rel='stylesheet' type='text/css'>
    <!-- CSS Libs -->
    <link rel="stylesheet" type="text/css" href="/cdn/flat-admin-bootstrap-templates/dist/lib/css/bootstrap.min.css">
    <link rel="stylesheet" type="text/css" href="/cdn/flat-admin-bootstrap-templates/dist/lib/css/font-awesome.min.css">
    <link rel="stylesheet" type="text/css" href="/cdn/flat-admin-bootstrap-templates/dist/lib/css/animate.min.css">
    <link rel="stylesheet" type="text/css" href="/cdn/flat-admin-bootstrap-templates/dist/lib/css/bootstrap-switch.min.css">
    <link rel="stylesheet" type="text/css" href="/cdn/flat-admin-bootstrap-templates/dist/lib/css/checkbox3.min.css">
    <link rel="stylesheet" type="text/css" href="/cdn/flat-admin-bootstrap-templates/dist/lib/css/jquery.dataTables.min.css">
    <link rel="stylesheet" type="text/css" href="/cdn/flat-admin-bootstrap-templates/dist/lib/css/dataTables.bootstrap.css">
    <link rel="stylesheet" type="text/css" href="/cdn/flat-admin-bootstrap-templates/dist/lib/css/select2.min.css">
    <!-- CSS App -->
    <link rel="stylesheet" type="text/css" href="/cdn/flat-admin-bootstrap-templates/dist/css/style.css">
    <link rel="stylesheet" type="text/css" href="/app/views/assets/css/flat-blue.css?12312311">
    <link rel="stylesheet" type="text/css" href="/app/views/assets/css/app.css">

    <link rel="apple-touch-icon" sizes="180x180" href="/favicons/apple-touch-icon.png">
     <link rel="icon" type="image/png" sizes="32x32" href="/favicons/favicon-32x32.png">
     <link rel="icon" type="image/png" sizes="16x16" href="/favicons/favicon-16x16.png">
     <link rel="manifest" href="/favicons/manifest.json">
     <link rel="mask-icon" href="/favicons/safari-pinned-tab.svg" color="#db385e">
    <meta name="theme-color" content="#ffffff">

</head>

<body class="flat-blue">
<style>
    .card-header{
        border:none!important;
    }
    .card-title .title{
        color:#fff!important;
    }
    .card {
        background: #0080bd;
        color: #fff!important;
    }
    .navbar-default, .side-menu {
        box-shadow: none!important;
    }
    .navbar-expand-toggle, .dropdown-toggle, .flat-blue .navbar .navbar-breadcrumb li, .flat-blue .navbar.navbar-default .navbar-breadcrumb li{
        color: #ffffff!important;
    }
    .app-container {
        background: #044b8d;
        background: -moz-linear-gradient(-45deg,#0080bd 0,#0170a6 100%);
        background: -webkit-linear-gradient(-45deg,#0080bd 0,#0170a6 100%);
        background: linear-gradient(135deg,#0080bd 0,#0170a6 100%);
    }
    .navbar-default, .container-fluid {
        background: 0!important;
    }
    .dropdown {
        border: 0!important;
    }



</style>
<div class="app-container">
    <div class="row content-container">
        <nav class="navbar navbar-default navbar-fixed-top navbar-top">
            <div class="container-fluid">
                <div class="navbar-header">
                    <button type="button" class="navbar-expand-toggle">
                        <i class="fa fa-bars icon"></i>
                    </button>
                    <ol class="breadcrumb navbar-breadcrumb">
                        <li class="active"><?= ($breadcrumbs) ?></li>
                    </ol>
                    <button type="button" class="navbar-right-expand-toggle pull-right visible-xs">
                        <i class="fa fa-th icon"></i>
                    </button>
                </div>
                <style>
                    .fa-send:before, .fa-paper-plane:before {
                        padding: 0 2px;
                        color:transparent;
                        background: url('/app/views/assets/images/brand.png') center center no-repeat ;
                    }
                    .reserve-header a {
                        color:#db385e!important;
                    }
                    .balance-header {
                        display: none!important;
                    }
                    .balance-header a {
                        color:#db385e!important;
                    }
                </style>
                <ul class="nav navbar-nav navbar-right">

                    <li class="dropdown profile">
                        <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-expanded="false"><?= ($user_name) ?> <span class="caret"></span></a>
                        <ul class="dropdown-menu animated fadeInDown">
                            <li class="profile-img hidden">
                                <!--<img src="/app/views/assets/images/person.png" class="profile-img">-->
                            </li>
                            <li>
                                <div class="profile-info">
                                    <h4 class="username"><?= ($user_name) ?></h4>
                                    <div class="btn-group margin-bottom-2x" role="group">
                                            <a type="button" class="btn btn-default" href="/logout"><i class="fa fa-sign-out"></i> Выход</a>
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </li>
                </ul>
            </div>
        </nav>
        <style>
            .margin-top{
                margin-top: 15px;
            }
        </style>
        <div class="side-menu sidebar-inverse">
            <nav class="navbar navbar-default" role="navigation">
                <div class="side-menu-container">
                    <div class="navbar-header">
                        <a class="navbar-brand" href="#">
                            <div class="icon fa fa-paper-plane"></div>
                            <div class="title">unlimCRM <sup>Beta</sup></div>
                        </a>
                        <button type="button" class="navbar-expand-toggle pull-right visible-xs">
                            <i class="fa fa-times icon"  style="color:#fff!important;"></i>
                        </button>
                    </div>

                    <ul class="nav navbar-nav">
                        <?php foreach (($nav_list?:[]) as $nav_item): ?>
                            <?php if ($nav_item['dropdown']=='1'): ?>
                                
                                    <li class="panel panel-default dropdown <?= ($nav_item['active']) ?>">
                                        <a data-toggle="collapse" href="#dropdown-element">
                                            <span class="icon fa <?= ($nav_item['icon']) ?>"></span><span class="title"><?= ($nav_item['title']) ?></span>
                                        </a>
                                        <!-- Dropdown level 1 -->
                                        <div id="dropdown-element" class="panel-collapse collapse">
                                            <div class="panel-body">
                                                <ul class="nav navbar-nav">
                                                    <li><a href="/admin/categories">Категории</a></li>
                                                    <li><a href="/admin/showrooms">Шоу-румы / Склады</a></li>
                                                    <li><a href="/admin/places">Места</a></li>
                                                    <li><a href="/admin/sizes">Размеры</a></li>
                                                    <li><a href="/admin/colors">Цвета</a></li>
                                                </ul>
                                            </div>
                                        </div>
                                    </li>
                                
                                <?php else: ?>
                                    <li <?= ($nav_item['class']) ?>>
                                        <a href="<?= ($nav_item['href']) ?>">
                                            <span class="icon fa <?= ($nav_item['icon']) ?>"></span><span class="title"><?= ($nav_item['title']) ?></span>
                                        </a>
                                    </li>
                                
                            <?php endif; ?>
                        <?php endforeach; ?>
                    </ul>
                </div>
                <!-- /.navbar-collapse -->
            </nav>
        </div>
<link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-multiselect/0.9.13/css/bootstrap-multiselect.css">
<link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/opentip/2.4.6/css/opentip.min.css">
<link rel="stylesheet" type="text/css" href="/app/views/assets/css/category.css">

<!-- Main Content -->
<div class="container-fluid">
    <div class="side-body">
        <div class="row">
            <div class="col-xs-6">
                <div class="card margin-top">
                    <div class="card-header">
                        <div class="card-title">
                            <div class="title">Виджет</div>
                        </div>
                    </div>
                    <div class="card-body">
                        Sorry for the inconvenience but we’re performing some maintenance at the moment. If you need to you can always contact us, otherwise we’ll be back online shortly!
                    </div>
                    <?php if ($categories && $paddination['total']>$paddination['limit']): ?>
                        
                            <div class="card-footer">
                                <nav>
                                    <em class="pull-left"><a href="#"><?= ($paddination['limit']) ?></a> из <strong><?= ($paddination['total']) ?></strong> записей на <strong><?= ($paddination['page']) ?></strong> из <strong><?= ($paddination['pages']) ?></strong> странице. <a href="#">показать еще..</a></em>  
                                    <ul class="pagination pagination-sm">
                                        <li <?= ($paddination['page']<=1 ? 'class="disabled"' : '') ?>>
                                            <a href="?page=<?= ($paddination['prev']) ?>" aria-label="Previous">
                                                <span aria-hidden="true">&laquo;</span>
                                            </a>
                                        </li>

                                        <?php foreach (($paddination['items']?:[]) as $item): ?>     
                                           <li <?= ($paddination['page']==$item ? 'class="active"' : '') ?>><a href="<?= ($paddination['page']==$item ? '#' : '?page='.$item) ?>"><?= ($item) ?></a></li>
                                        <?php endforeach; ?>

                                        <li <?= ($paddination['page']>=$paddination['pages'] ? 'class="disabled"' : '') ?>>
                                            <a href="?page=<?= ($paddination['next']) ?>" aria-label="Next">
                                                <span aria-hidden="true">&raquo;</span>
                                            </a>
                                        </li>
                                    </ul>
                                </nav>    
                            </div>
                        
                    <?php endif; ?>
   
                </div>

            </div>
        </div>

    </div>
</div>
<style>
    .flat-blue .navbar, .flat-blue .navbar.navbar-default {
        box-shadow: none;
        border-bottom:none!important;
    }
</style>
<script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-multiselect/0.9.13/js/bootstrap-multiselect.min.js"></script>
<script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/opentip/2.4.6/downloads/opentip-jquery.min.js"></script>
<script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/opentip/2.4.6/lib/adapter-jquery.js"></script>
<script type="text/javascript" src="/app/views/assets/js/app/common.js"></script>
