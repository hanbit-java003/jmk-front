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

$('.seoul-first > li').on('click',function () {
    var count = $('.photo > li').length;
    var index = $('.photo > li.active').index();
    var nextIndex = index;

    if($(this).hasClass('btn-left')) {
        nextIndex = index - 1;

        if (nextIndex < 0) {
            nextIndex = count - 1;
        }
    }
    else if ($(this).hasClass('btn-right')) {
        nextIndex = index + 1;

        if(nextIndex >= count){
            nextIndex = 0;
        }
    }
    $('.photo > li').removeClass('active');
    $($('.photo > li')[nextIndex]).addClass('active');

});


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