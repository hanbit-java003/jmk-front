var menus = require('./model/about-menu');

function initMenu() {
    $('.about-menu').empty();

    var template =require('../template/seoulmenu/about-menu.hbs');
    var menu = $('.about-menu');

    var menuHtml = template(menus);
    menu.html(menuHtml);

}

initMenu();



$('.about-menu > li').on('click', function (event) {
    event.stopPropagation();  // 상위 태그의 
    // 이벤트를 막아주는 함수

    var aboutId =$(this).attr('about-id');

    location.href='./seoulmenu.html?id=' + aboutId;
});

$('.about-menu-sub > li').on('click', function (event) {
    event.stopPropagation();

    var aboutId =$(this).attr('about-id');

    location.href='./seoulmenu.html?id=' + aboutId;
});


$('.about-menu-sub-sub > li').on('click', function (event) {
    event.stopPropagation();

    var aboutId =$(this).attr('about-id');

    location.href='./seoulmenu.html?id=' + aboutId;
});