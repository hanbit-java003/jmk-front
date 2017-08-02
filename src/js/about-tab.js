var menus = require('./model/about-menu');
var visitMenus = require('./model/visit-menu');
var noticeMenus = require('./model/notice-menu');
var boardMenus = require('./model/board-menu');

var URLSearchParams = require('url-search-params');

var params = new URLSearchParams(location.search);
var allId = params.get('sub-id');


function initMenu() {
    $('.about-menu').empty();

    var template =require('../template/seoulmenu/about-menu.hbs');
    var menu = $('.about-menu');

    var menuHtml = template(menus);
    menu.html(menuHtml);

}

initMenu();
if('visit'===allId){
    function visitInitMenu() {
        $(initMenu()).empty();

        var template = require('../template/seoulmenu/about-menu.hbs');
        var menu = $('.about-menu');

        var menuHtml = template(visitMenus);
        menu.html(menuHtml);

    }
    visitInitMenu();
}

if('notice'===allId){
    function noticeInitMenu() {
        $(initMenu()).empty();

        var template = require('../template/seoulmenu/about-menu.hbs');
        var menu = $('.about-menu');

        var menuHtml = template(noticeMenus);
        menu.html(menuHtml);
    }
    noticeInitMenu();
}

if('board'===allId){
    function boardInitMenu() {
        $(initMenu()).empty();

        var template = require('../template/seoulmenu/about-menu.hbs');
        var menu = $('.about-menu');

        var menuHtml = template(boardMenus);
        menu.html(menuHtml);
    }
    boardInitMenu();
}

if('exhibition' === allId){
    function exhibitionInitMenu() {
        $(initMenu()).empty();

    }
    exhibitionInitMenu();
}

$('.about-menu > li').on('click', function (event) {
    event.stopPropagation();  // 상위 태그의 
    // 이벤트를 막아주는 함수

    var aboutId =$(this).attr('about-id');

    var subId=$(this).attr('sub-id');

    location.href='./seoulmenu.html?id=' + aboutId+(subId ? "&sub-id="+subId : '');
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




