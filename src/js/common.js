/**
 * Created by 1027 on 2017-07-06.
 */

var menus = require('./model/menu');


function initMenu() {
    var template = require('../template/seoul-menu.hbs');
    var menu = $('.seoul-menus');

    /!*menu.empty();*!/

    for(var i=0; i<menus.length; i++){
        var menuHtml =template(menus[i]);

        menu.append(menuHtml);

    }
}



initMenu();



$('.seoul-menus > li').on('mouseover' , function () {
   $(this).find('.seoul-sub-menu').show();
});

$('.seoul-menus > li').on('mouseout' , function () {
    $(this).find('.seoul-sub-menu').hide();
});