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


$('.seoul-logo> img').on('click', function () {
    // 왼쪽 상단 로고 버튼을 누르면 본 페이지로 이동.
    location.href = './';
});

$('.seoul-move').on('click', function () {
    // 왼쪽 상단 로고 버튼을 누르면 본 페이지로 이동.
    location.href = './';
});


$('.seoul-sub-menu > li').on('click', function () {
   var seoulId =$(this).attr('seoul-id');

   location.href='./seoulmenu.html?id=' + seoulId;
});

$('.seoul-sub-sub > li').on('click', function () {
    var seoulId =$(this).attr('seoul-id');

    location.href='./seoulmenu.html?id=' + seoulId;
});



$('.seoul-menus > li').on('mouseover' , function () {
   $(this).find('.seoul-sub-menu').show();
});

$('.seoul-menus > li').on('mouseout' , function () {
    $(this).find('.seoul-sub-menu').hide();
});