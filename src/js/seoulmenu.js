require('bootstrap');
require('../less/soeulmenu.less');
require('../less/main.less');

var common = require('./common');

var tab = require('./about-tab');

var facilitiesTab = require('./facilities2-tab');
var aboutTab = require('./about-tab');

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
    var template = require('../template/seoulmenu/facilities2-tab-tab.hbs');
    var seoulmenu = $('.facilities2-tab');

    seoulmenu.html(template);

    facilitiesTab.addEvent();
}

facilities2TabTab();

function initPreview() {
    var template = require('../template/seoulmenu/preview.hbs');
    var previewMain = $('.preview-main');

    previewMain.html(template());
}
initPreview();

if(aboutId==='com'){
function initCom() {
    var template = require('../template/seoulmenu/com.hbs');
    var previewMain = $('.com-main');

    previewMain.html(template());

    var loadGoogleMapsApi = require('load-google-maps-api-2');

    // 구글에서 키값을 받아온거를 가져옴.
    loadGoogleMapsApi.key = 'AIzaSyD-15nHLBCmVSqlz3yr_yOoasR9QVrO6-Q';
// 한국어를 사용하기 위해서
    loadGoogleMapsApi.language= 'ko';
    loadGoogleMapsApi.version = '3';

    var $googleMaps;
    var areaMap;

// 성공하면 then으로 떨어지고  실패하면 catch로 떨어진다.
    loadGoogleMapsApi().then(function (googleMaps) {
        $googleMaps = googleMaps;
        // 구글 맵을 가져오기 위해서 사용하는데
        // jquery이기 때문에 배열을 활용 해서 오브젝트를 빼온다.
        areaMap= new googleMaps.Map($('.com-map')[0],{
            center: {lat: 37.594973, lng: 126.962540},
            scrollwheel: false, // true 로 하면 지도에 마우스 휠이 적용된다.
            zoom: 14

        });
        var marker = new googleMaps.Marker({
            position: {lat: 37.594973, lng: 126.962540},
            map : areaMap
        });
    }).catch(function (error) {
        console.error(error);
    });
}

initCom();
}

$.ajax({
    url: '/api/seoul/notice',
    success: function (result) {
        initNotice(result);
        console.log(result);

    }
});

function initNotice(notices) {
    var template = require('../template/seoulmenu/notice.hbs');
    var noticeMain = $('.notice-main');

    noticeMain.html(template(notices));
}




