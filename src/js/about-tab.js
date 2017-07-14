var menus = require('./model/about-menu');

function initMenu() {
    $('.about-menu').empty();

    var template =require('../template/seoulmenu/about-menu.hbs');
    var menu = $('.about-menu');

    var menuHtml = template(menus);
    menu.html(menuHtml);

}

initMenu();

