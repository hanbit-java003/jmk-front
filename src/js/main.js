require('bootstrap');
require('../less/main.less');
// 리콰이어는 모듈화 하기위해  사용한다.
var common = require('./common');


var noticeActivities = require('./model/notice-activities');
var exhibitionActivities = require('./model/exhibition-activities');
var boardActivities = require('./model/board-activities');

var noticeActivitiesInfo = require('./model/notice-activities-info');
var exhibitionActivitiesInfo = require('./model/exihibition-activities-info');
var boardActivitiesInfo = require('./model/board-activities-info');

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



function initExhibitionActivitiesInfo(exhibitionActivitiesInfo) {
    $('.seoul-exhibition').empty();

    var template=require('../template/main/activity-info.hbs');

        var html = template(exhibitionActivitiesInfo[0]);

        $('.seoul-exhibition').append(html);


}

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
initExhibitionActivitiesInfo(exhibitionActivitiesInfo);
initBoardActivitiesInfo(boardActivitiesInfo);
initNoticeActivitiesInfo(noticeActivitiesInfo);

initBoardActivities(boardActivities);
initExhibitionActivities(exhibitionActivities);
initNoticeActivities(noticeActivities);