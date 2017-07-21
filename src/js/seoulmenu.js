require('bootstrap');
require('../less/soeulmenu.less');
require('../less/main.less');

var common = require('./common');

var tab = require('./about-tab');

var URLSearchParams = require('url-search-params');

var params = new URLSearchParams(location.search);
var aboutId = params.get('id');

var model = require('./model/about/' + aboutId);




function initAbout() {
    $('.about-info1').html(model.name);
    $('.about-info2').html(model.contents);
}

initAbout();

