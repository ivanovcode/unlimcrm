function validateCompany(f) {

    if (!validateTxt(f.elements['name'].value) || f.elements['name'].value == 'Инкогнито') {
        return false;
    }
    if (!validateTxt(f.elements['phone'].value) || f.elements['phone'].value == '9876543210') {
        return false;
    }
    return true;   
} 
document.addEventListener("DOMContentLoaded", function(){ 
    var f = document.getElementsByClassName('createForm')[0];  
    var e = document.querySelector('[type="submit"]');
    var p = document.getElementsByClassName('preloader')[0];
    var a = document.getElementsByClassName('alert')[0];
    var m = document.getElementsByClassName('msg')[0];
    console.log(f.elements['name'].value);
    if(validateCompany(f)) {     
        e.className += " btn-info";
        e.classList.remove("btn-default");
        e.disabled = false;
    } else {
        e.className += " btn-default";
        e.classList.remove("btn-info");
        e.disabled = true;            
    }  
    f.addEventListener("keyup", function(event) {
        event.preventDefault();          
        e.disabled = false;

        if(validateCompany(f)) {     
            e.className += " btn-info";
            e.classList.remove("btn-default");
            e.disabled = false;
        } else {
            e.className += " btn-default";
            e.classList.remove("btn-info");
            e.disabled = true;            
        }        
    });
    f.addEventListener("submit", function(event) {   
        event.preventDefault();           
        p.style.display = 'block'; 
        e.disabled = true;
        var arg = serialize(this);   

        /*var arg_ = [];        
        arg_['indate'] = $("#datetimepicker2").data('DateTimePicker').date();
        if(arg_['indate']) arg_['indate'] = arg_['indate'].format('YYYY-MM-DD');
        arg_['intime'] = $("#datetimepicker3").data('DateTimePicker').date();     
        if(arg_['intime']) arg_['intime'] = arg_['intime'].format('HH:mm');
        arg_['outime'] = $("#datetimepicker4").data('DateTimePicker').date();
        if(arg_['outime']) arg_['outime'] = arg_['outime'].format('HH:mm');
        var _arg = $.extend({}, arg_);*/

        ajax('/admin/orders/create', arg, function(data){ 
                         
            if(isValidJSON(data)) var data = JSON.parse(data);
            if(data['response']['success']) { 
                window.location = '/admin/orders/';
            } else {            
                p.style.display = 'none';
                e.className += " btn-default";
                e.classList.remove("btn-info"); 
                a.style.display = 'block';
                m.innerHTML = data['response']['msg'];
                f.elements[data['response']['target']].style.borderColor = '#ffb400';
            }                  
        }); 
    });             
}, false);