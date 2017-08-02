require('bootstrap');
require('../less/main.less');
// 리콰이어는 모듈화 하기위해  사용한다.
var common = require('./common');

var URLSearchParams = require('url-search-params');

var params = new URLSearchParams(location.search);
var aboutId = params.get('id');
var allId = params.get('sub-id');

var noticeActivities = require('./model/notice-activities');
var exhibitionActivities = require('./model/exhibition-activities');
var boardActivities = require('./model/board-activities');

var noticeActivitiesInfo = require('./model/notice-activities-info');
var boardActivitiesInfo = require('./model/board-activities-info');




function initBoardActivitiesInfo(boardActivitiesInfo) {
    $('.seoul-border').empty();

    var template=require('../template/main/activity-info.hbs');


    var html=template(boardActivitiesInfo[0]);

    $('.seoul-border').append(html);


}

function initNoticeActivitiesInfo(noticeActivitiesInfo) {
    $('.seoul-notice').empty();

    var template = require('../template/main/activity-info.hbs');


        var html = template(noticeActivitiesInfo[0]);

        $('.seoul-notice').append(html);

}

function initBoardActivities(boardActivities) {
    $('.seoul-border-contents').empty();

    var template=require('../template/main/activity.hbs');

    for(var i=0; i<boardActivities.length;i++){
        var html = template(boardActivities[i]);

        $('.seoul-border-contents').append(html);
    }



}

function initExhibitionActivities(exhibitionActivities){
    $('.seoul-exhibition-contents').empty();

    var template=require('../template/main/activity.hbs');

    for(var i=0; i<exhibitionActivities.length; i++){
        var html=template(exhibitionActivities[i]);

        $('.seoul-exhibition-contents').append(html);
    }

}


function initNoticeActivities(noticeActivities) {
    $('.seoul-notice-contents').empty();

    var template = require('../template/main/activity.hbs');

    for (var i = 0; i < noticeActivities.length; i++) {
        var html = template(noticeActivities[i]);

        $('.seoul-notice-contents').append(html);
    }
}
initBoardActivitiesInfo(boardActivitiesInfo);
initNoticeActivitiesInfo(noticeActivitiesInfo);

initBoardActivities(boardActivities);
initExhibitionActivities(exhibitionActivities);
initNoticeActivities(noticeActivities);



$('.seoul-notice2').on('click',function () {
    var aboutId =$(this).attr('about-id');

    var subId=$(this).attr('sub-id');

    location.href='./seoulmenu.html?id=' + aboutId+(subId ? '&sub-id='+subId : '');
});

$('.seoul-menu-title').on('click',function () {
    var aboutId = $(this).attr('about-id');
    var subId=$(this).attr('sub-id');

    location.href = './seoulmenu.html?id='+ aboutId+'&sub-id='+subId;
});