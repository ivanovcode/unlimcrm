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
    <link rel="stylesheet" type="text/css" href="//code.jquery.com/ui/1.12.1/themes/base/jquery-ui.css">
    <!-- CSS App -->
    <link rel="stylesheet" type="text/css" href="/cdn/flat-admin-bootstrap-templates/dist/css/style.css?23433522ss2">
    <link rel="stylesheet" type="text/css" href="/app/views/assets/css/flat-blue.css?12312311">
    <link rel="stylesheet" type="text/css" href="/app/views/assets/css/app.css?1121224444ddsd44s4ss2444s34344ss8wf242ss7ss22334355578ss7sdd322ds3ssssssssssssssssssddddss638892113">

    <link rel="apple-touch-icon" sizes="180x180" href="/favicons/apple-touch-icon.png">
    <link rel="icon" type="image/png" sizes="32x32" href="/favicons/favicon-32x32.png">
    <link rel="icon" type="image/png" sizes="16x16" href="/favicons/favicon-16x16.png">
    <link rel="manifest" href="/favicons/manifest.json">
    <link rel="mask-icon" href="/favicons/safari-pinned-tab.svg" color="#db385e">
    <meta name="theme-color" content="#ffffff">

</head>

<body class="flat-blue">
    <div class="app-container">
        <div class="context-nav">
            <div class="col-nav" style="border-top:solid 4px #5E8728;margin-right:0px;">Успешно завершена</div>
            <div class="col-nav" style="border-top:solid 4px #c3c2c3">Не реализована</div>
            <div class="col-nav-2" style="border-top:solid 4px #f37575;color:#f37575;"><i class="fa fa-lg fa-trash" aria-hidden="true"></i></div>
        </div>


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
                                <div class="icon fa fa-paper-plane hidden"></div>
                                <div class="title hidden">unlimCRM <sup>Beta</sup></div>
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