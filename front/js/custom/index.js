

    function addListenerMulti(el, s, fn) {
        s.split(' ').forEach(e => el.addEventListener(e, fn, false));
    }

    function debouncer(fn, timeout) {
        var timeoutID , timeout = timeout || 200;
        return function () {
            var scope = this , args = arguments;
            clearTimeout( timeoutID );
            timeoutID = setTimeout( function () {
                fn.apply( scope , Array.prototype.slice.call( args ) );
            } , timeout );
        }
    } 

    function isIndicators(txt) {
        let re = /^([a-zA-Z0-9]+:([1-9][0-9]*|[0])([.][0-9]+|),){5}$/g;
        return re.test(txt + ",");
    }    
  
    function isSelected(el) {
        let j = [];    
        for (j = el.options.length - 1; j >= 0; j = j - 1) {
            if (el.options[j].selected) {
                    return true;
            }
        }
        return false;
    }
    function isFilled(v) {
        if (v < 1) {
            return false;
        }
        return true;
    }
    function validate(el) {
        if (!isFilled(el.elements['ticker'].value)) {
            return false;
        }
        if (!isSelected(el.elements['groups[]'])) {
            return false;
        }
        if(!isIndicators(el.elements['indicators'].value)) {
              return false;
        }
        return true;   
    } 

    function showForm(el, toggle) {
        let submit = el.querySelector('button[type="submit"]');
        if (toggle) {
            submit.style.color = "#fff";
            submit.style.pointerEvents = 'auto';
        } else {
            submit.style.color = "#68b3dc";
            submit.style.pointerEvents = 'none';
        }
        return toggle;
    }





var canvas, stage, exportRoot, anim_container, dom_overlay_container, fnStartAnimation;
function init() {
    canvas = document.getElementById("canvas");
    anim_container = document.getElementById("animation_container");
    dom_overlay_container = document.getElementById("dom_overlay_container");
    handleComplete();
}
function handleComplete() {

    exportRoot = new lib.pre();
    stage = new createjs.Stage(canvas);
    stage.addChild(exportRoot);

    fnStartAnimation = function() {
        createjs.Ticker.setFPS(lib.properties.fps);
        createjs.Ticker.addEventListener("tick", stage);
    }

    function makeResponsive(isResp, respDim, isScale, scaleType) {
        var lastW, lastH, lastS=1;
        window.addEventListener('resize', resizeCanvas);
        resizeCanvas();
        function resizeCanvas() {
            var w = lib.properties.width, h = lib.properties.height;
            var iw = window.innerWidth, ih=window.innerHeight;
            var pRatio = window.devicePixelRatio || 1, xRatio=iw/w, yRatio=ih/h, sRatio=1;
            if(isResp) {
                if((respDim=='width'&&lastW==iw) || (respDim=='height'&&lastH==ih)) {
                    sRatio = lastS;
                }
                else if(!isScale) {
                    if(iw<w || ih<h)
                        sRatio = Math.min(xRatio, yRatio);
                }
                else if(scaleType==1) {
                    sRatio = Math.min(xRatio, yRatio);
                }
                else if(scaleType==2) {
                    sRatio = Math.max(xRatio, yRatio);
                }
            }
            canvas.width = w*pRatio*sRatio;
            canvas.height = h*pRatio*sRatio;
            canvas.style.width = dom_overlay_container.style.width = anim_container.style.width =  w*sRatio+'px';
            canvas.style.height = anim_container.style.height = dom_overlay_container.style.height = h*sRatio+'px';
            stage.scaleX = pRatio*sRatio;
            stage.scaleY = pRatio*sRatio;
            lastW = iw; lastH = ih; lastS = sRatio;
        }
    }
    makeResponsive(false,'both',false,1);
    fnStartAnimation();
}

(function($) {
    $.fn.removeClassWild = function(mask) {
        return this.removeClass(function(index, cls) {
            var re = mask.replace(/\*/g, '\\S+');
            return (cls.match(new RegExp('\\b' + re + '', 'g')) || []).join(' ');
        });
    };
})(jQuery);


function uuidv4() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

function resetAnimate($elem) {
    $elem.before($elem.clone(true));
    var $newElem = $elem.prev();
    $elem.remove();
    return $newElem;
}

function countProps(obj) {
    var count = 0;
    for (var p in obj) {
        obj.hasOwnProperty(p) && count++;
    }
    return count;
}

function setAnimate(el, className) {
    let $this = el;
    $this.removeClassWild("award-*");
    $this = resetAnimate($this);
    $this.addClass(className);
}
function isEmpty(val){
    return (val === undefined || val == null || val.length <= 0) ? true : false;
}
function first(p){for(var i in p)return p[i];}
function last(p){for(var i in p) return p[countProps(p)];}



NProgress.configure({ showSpinner: false });
NProgress.start();

var interval = setInterval(function() { NProgress.inc(); }, 1000);

String.prototype.toHHMMSS = function () {
    var sec_num = parseInt(this, 10); // don't forget the second param
    var hours   = Math.floor(sec_num / 3600);
    var minutes = Math.floor((sec_num - (hours * 3600)) / 60);
    var seconds = sec_num - (hours * 3600) - (minutes * 60);

    if (hours   < 10) {hours   = "0"+hours;}
    if (minutes < 10) {minutes = "0"+minutes;}
    if (seconds < 10) {seconds = "0"+seconds;}
    return minutes + ':' + seconds;
}

$(document).ready(function(){

    var uuid = localStorage.getItem('uuid');  
    if(isEmpty(uuid)) { uuid = uuidv4();  localStorage.setItem('uuid', uuid); }
    $('#uuid').text(uuid);

    $('#marquee').css("width", Math.round(parseInt($(window).outerWidth())-450));

    


    clearInterval(interval);
    NProgress.done();



    function renderTemplate(name, data) {
        var template = document.getElementById(name).innerHTML;

        for (var property in data) {
            if (data.hasOwnProperty(property)) {
                var search = new RegExp('{' + property + '}', 'g');
                template = template.replace(search, data[property]);
            }
        }
        return template;
    }

    renderTicker = function(data){
        if (!isEmpty(renderTicker_call)) {
           renderTicker_call.clearQueue(); 
           console.log('renderTicker clear');
        }        
        var marquee = $("#marquee");       
        marquee.empty();
        marquee.text(data);
        $('#ticker').val(data);
        marquee.css({"overflow": "hidden"});
        marquee.wrapInner("<span>");
        marquee.find("span").css({ "display": "inline-block", "text-align":"center" });
        marquee.append(marquee.find("span").clone()); // тут у нас два span с текстом
        marquee.wrapInner("<div>");       

        renderTicker_call = function() {
            $(this).css("margin-left", "0%");
            $(this).animate({ "margin-left": "-100%" }, 12000, 'linear', renderTicker_call);
        };
        renderTicker_call.call(marquee.find("div"));
    }
    renderAllStaff = function(data) {
        let groups = data.collection['groups'];
        let groups_list = $('.group-list');
        groups_list.empty();

        for (group_id in groups) {
            if (groups.hasOwnProperty(group_id)) {
                groups_list.append(
                    renderTemplate('groupCard', {
                        group_id: group_id,
                        group_title: groups[group_id]['title']
                    })
                );
                let staff = groups[group_id]['staff'];
                let staff_list = $('.staff-list[data-group="' + group_id + '"]');
                staff_list.empty();
                for (staff_id in staff) {
                    if (staff.hasOwnProperty(staff_id)) {
                        let thumbnail;
                        if (typeof staff[staff_id]['thumbnail'] != 'undefined') {
                            thumbnail = (staff[staff_id]['thumbnail.base64'] ? "background-image: url('" + staff[staff_id]['thumbnail'] + "')" : "");
                        } else {
                            thumbnail = (staff[staff_id]['thumbnail.base64'] ? "background-image: url('data:image/png;base64," + staff[staff_id]['thumbnail.base64'] + "')" : "");
                        }
                        let AHT = staff[staff_id]['AHT'].toHHMMSS();
                        staff_list.append(
                            renderTemplate('staffCard', {
                                staff_name: staff[staff_id]['name'],
                                AHT: AHT,
                                rating: staff[staff_id]['rating'],
                                photo: thumbnail
                            })
                        );
                    }
                }
            }
        }

        let indicators = data.collection['indicators']['staff'];
        let indicators_list = $('.nums-list');
        indicators_list.empty();

        for (login in indicators) {
            if (indicators.hasOwnProperty(login)) {
                let thumbnail;
                let staff = indicators[login];
                if (typeof staff['thumbnail'] != 'undefined') {                  
                    thumbnail = "background-image: url('../../img/profile/"+staff['thumbnail']+".jpg')";
                } else {
                    thumbnail = "background-image: url('../../img/profile/undefined.jpg')";
                }

                indicators_list.append(
                    renderTemplate('indicatorCard', {
                        login: login,
                        name: staff['name'],
                        label: staff['label'],
                        value: staff['value'],
                        thumbnail:  thumbnail
                    })
                );    
            }
        }    


        let genesys = data.collection['diagrams']['genesys'];
        let genesys_list = $('.genesys-container');
        genesys_list.empty();

        for (id in genesys) {
            if (genesys.hasOwnProperty(id)) {             
                let diagram = genesys[id];
                genesys_list.append(
                    renderTemplate('genesysCard', {
                        id: id,
                        group_name: diagram['queue_name']
                    })
                );    
                $('#demo-'+id).waterbubble({
                    radius: 70,
                    lineWidth: undefined,
                    data: 0.5,
                    waterColor: 'rgba(25, 181, 254, 1)',
                    textColor: 'rgba(255, 255, 255, 1)',
                    font: '',
                    wave: true,
                    txt: diagram['total_agents'] + '/' + diagram['ready_agents'],
                    animation: true
                });
                $('.genesys').removeClass('nodata');
            } else {
                $('.genesys').addClass('nodata');
            }
        }


        let ums = data.collection['diagrams']['ums'];
        let ums_list = $('.ums-container');
        ums_list.empty();

        for (id in ums) {
            if (ums.hasOwnProperty(id)) {
                let diagram = ums[id];
                ums_list.append(
                    renderTemplate('umsCard', {
                        id: id,
                        group_name: diagram['queue_name']
                    })
                );
                $('#demo-'+id).waterbubble({
                    radius: 70,
                    lineWidth: undefined,
                    data: 0.5,
                    waterColor: 'rgba(25, 181, 254, 1)',
                    textColor: 'rgba(255, 255, 255, 1)',
                    font: '',
                    wave: true,
                    txt: diagram['total_main_tickets'] + '/' + diagram['total_custom_tickets'],
                    animation: true
                });
                $('.ums').removeClass('nodata');
            } else {
                $('.ums').addClass('nodata');
            }
        }


        let firststaff = first(data.collection['groups'])['staff'];
        renderTicker(data.collection.ticker);

        $('.h2').html(first(firststaff)['name']);
        $('input[name="indicators"]').val(data.collection.indicators.serialized);     

        $('.dashboard').removeClass('hidden');
        SliderGroup = SliderGroup_init();
        SliderNums = SliderNums_init();

        SliderGroup.el.on('next', function(event) {
            rotateAllStaffStart();
        });
        $('.nums-list').find('.bee3D--slide').css("width", Math.round((parseInt($('.nums-list').outerWidth())-260-90)/3)-150);
            $('.setting-in').css("width", Math.round(parseInt($('.genesys').outerWidth())*0.65)+1);

        showForm(form, validate(form))   
       
    }

    requestStaff = function(e) {
        var values = [];
        values['groups'] = $('select[name="groups[]"]').val();
        values['uuid'] = $('span[id="uuid"').text();
        if(parseInt(values['groups'])>0) {
            values = $.extend({}, values);
            $.ajax({
                url: "../rest/",
                type: "POST",
                dataType: 'json',
                data: values,
                beforeSend: function () {
                    $('.dashboard').addClass('hidden');
                    $('.loading').removeClass('hidden');
                    
                },
                complete: function () {
                    $('.loading').addClass('hidden');
                },
                success: function (data) {
                    if (!data) {
                        console.log('%c Return response unknown.', 'color: green; font-weight: bold;');
                    }
                    if (data.response.success === false) {
                        console.log('%c Return status response false.', 'color: green; font-weight: bold;');
                    }
                    if (data.response.success === true) {
                        renderAllStaff(data);
                        
                    }
                },
                error: function (response) {
                    if (response.status === 500) {
                        console.log('%c Service unavailable 500 error.', 'color: red; font-weight: bold;');
                    } else {
                        console.log('%c Service JSON unavailable.', 'color: red; font-weight: bold;');
                    }
                }
            });
        }
    };

    changeSettings = function(e) {
        var values = [];
        values['uuid'] = localStorage.getItem('uuid'); 
        values['groups'] = $('select[name="groups[]"]').val();
        values['ticker'] = $('input[name="ticker"').val();
        values['indicators'] = $('input[name="indicators"').val();        
        if(parseInt(values['groups'])>0) {
            values = $.extend({}, values);
            $.ajax({
                url: "../rest/?m=setting",
                type: "POST",
                dataType: 'json',
                data: values,
                beforeSend: function () {
                    $('.dashboard').addClass('hidden');
                    $('.loading').removeClass('hidden');
                },
                complete: function () {
                    
                },
                success: function (data) {
                    if (!data) {
                        console.log('%c Return response unknown.', 'color: green; font-weight: bold;');
                    }
                    if (data.response.success === false) {
                        console.log('%c Return status response false.', 'color: green; font-weight: bold;');
                    }
                    if (data.response.success === true) {
                         requestStaffStart();
                        
                    }
                },
                error: function (response) {
                    if (response.status === 500) {
                        console.log('%c Service unavailable 500 error.', 'color: red; font-weight: bold;');
                    } else {
                        console.log('%c Service JSON unavailable.', 'color: red; font-weight: bold;');
                    }
                }
            });
        }
    };

    rotateStaff = function(e) {

        return $(e).find('.card:first-child').fadeOut(400, 'swing', function() {
            return $(e).find('.card:first-child').appendTo($(e).find('.container')).hide();
        }).fadeIn(400, 'swing');
    };

    rotateAllStaff = function() {
        var steps = 0;
        rotateStaff_call = setInterval(function () {
            if (steps == 3) {
                setAnimate($('.awards-icon'), "award-3");
                clearInterval(rotateStaff_call);
                let groups = $('select[name="groups[]"]').val();
                if(groups.length>1) {
                    SliderGroup.el.next();
                } else {
                    rotateAllStaffStart();
                }
                return;
            }
            let $staffCard = $('.bee3D--slide__active').find('.cards-container');
            $staffCard = rotateStaff($staffCard);
            let $staff_rating = $staffCard.attr('data-card');
            let staff_name = $staffCard.parents('.cards-container').find('.card:first-child').next(".card").attr('data-name');
            $('.h2').html(staff_name);
            setAnimate($('.awards-icon'), "award-" + $staff_rating);
            steps++;
        }, 5000);
    };

    SliderGroup_init = function() {
        return new Bee3D(group_list, {
            effect: 'cube',
            focus: 0,
            listeners: {
                keys: false
            },
            navigation: {
                enabled: false
            },
            autoplay: {
                enabled: false
            },
            loop: {
                enabled: true,
                continuous: true,
            },
            onInit: function () {
                //requestStaff();
                $('.awards-icon').removeClassWild("award-*").addClass("award-3");
                rotateAllStaff();
            }
        });
    }

    var group_list = document.querySelector('.group-list');
    var nums_list = document.querySelector('.nums-list');
    var staff_list = document.querySelector('.staff-list');
    var SliderGroup;
    var SliderNums;
    var rotateStaff_call;
    var renderTicker_call;

    rotateAllStaffStart = function() {
        let group_title = $('.bee3D--slide__active').next(".bee3D--slide").find('.staff-list').attr('data-title');
        let staff_name = $('.bee3D--slide__active').next(".bee3D--slide").find('.staff-list').find('.card:nth-child(1)').attr('data-name');
        $('.rating-container').find('h2').html(group_title);
        $('.rating-container').find('.h2').html(staff_name);
        rotateAllStaff();
    }

    requestStaffStart = function() {
        requestStaff();

        requestStaff_call = setInterval(function () {
            clearInterval(rotateStaff_call);
            requestStaff();
        }, 60000, rotateStaff_call);
    }

    requestStaffStart();


    SliderNums_init = function() {
        return new Bee3D(nums_list, {
            effect: 'classic',
            listeners: {
                keys: false
            },
            navigation: {
                enabled: false
            },
            autoplay: {
                enabled: true
            },
            loop: {
                enabled: true,
                continuous: true,
            },
            onInit: function () {

            }
        });
    }
   

    var form = document.getElementById('setting'); 

    addListenerMulti(form.elements['ticker'], 'change keyup paste', debouncer(function(){
        showForm(form, validate(form))      
    })); 
    addListenerMulti(form.elements['indicators'], 'change keyup paste', debouncer(function(){
        showForm(form, validate(form))      
    })); 
    form.addEventListener("submit", function(event) {   
        event.preventDefault(); 
        $('.setting').removeClass('open');
        clearInterval(rotateStaff_call);
        clearInterval(requestStaff_call);
        changeSettings();
    });

    $(window).resize(debouncer(function(e) {
        $('.nums-list').find('.bee3D--slide').css("width", Math.round((parseInt($('.nums-list').outerWidth())-260-90)/3));
        $('#marquee').css("width", Math.round(parseInt($(window).outerWidth())-450));
        $('.setting-in').css("width", Math.round(parseInt($('.genesys').outerWidth())*0.65)+1);
    }));

    $('.groups').SumoSelect({
        placeholder: 'Выбрать',
        csvDispCount: 1,
        captionFormat: 'Выбрано {0} группы',
        captionFormatAllSelected: 'Выбраны все группы!',
        selectAll:true
    });
    $('.shifts').SumoSelect({
        placeholder: 'Выбрать',
        csvDispCount: 1,
        captionFormat: 'Выбрано {0} смены',
        captionFormatAllSelected: 'Выбраны все смены!',
        selectAll:true
    });

    $('.groups').on('sumo:closing', function(sumo) {
        let selected = $('select[name="groups[]"] :selected');
        let select = $('select[name="groups[]"]');
        if($.isEmptyObject(select.val()) || selected.length > 1) {
            $('.groups')[0].sumo.selectAll();
        }
    });
    $('.setting').focusout(function (e) {
        let selected = $('select[name="groups[]"] :selected');
        let select = $('select[name="groups[]"]');
        if($.isEmptyObject(select.val()) || selected.length > 1) {
            $('.groups')[0].sumo.selectAll();
        }
    });
    $('.btn-setting').click(function() {
        $("#setting").css("transform", "rotateY(180deg)");
    });

});


