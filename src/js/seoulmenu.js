require('bootstrap');
require('../less/soeulmenu.less');
require('../less/main.less');

var common = require('./common');

var tab = require('./about-tab');

var facilitiesTab = require('./facilities2-tab');

var URLSearchParams = require('url-search-params');

var params = new URLSearchParams(location.search);
var aboutId = params.get('id');

var model = require('./model/all/' + aboutId);




function initAbout() {
    $('.about-info1').html(model.name);
    $('.about-info2').html(model.contents);
}

initAbout();


function facilities2TabTab() {
    var template = require('../template/seoulmenu/facilities2-tab-tab.hbs')
    var seoulmenu = $('.facilities2-tab');

    seoulmenu.html(template);

    facilitiesTab.addEvent();
}

facilities2TabTab();
