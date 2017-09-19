require('bootstrap');
require('jquery-mask-plugin');
require('../less/setting.less');


var common = require('./common.js');
var tab = require('./seoul-tab.js');

common.ajax({
   url: 'api/manager/get',
   success : function (result) {
       if (!result.signedIn) {
           alert('로그인이 필요한 관리자 페이지입니다.');
           location.href = '/';
       }
       getManagerDetail();
   }
});

function getManagerDetail() {
    common.ajax({
       url:'/api/manager/detail',
       success: function (result) {
           init(result);
       }
    });
}

function init(manager) {
    $('.seoul-setting-email').html(manager.email+'님');
    $('#seoul-manager-name-input').val(manager.detail.name);
    $('#seoul-manager-phone-input').val(manager.detail.phone);
    $('#seoul-manager-phone-input').mask('000-0000-0000');

    if (manager.detail.info === 'Y') {
        $('#seoul-manager-info-check').attr('checked', true);
    }
    if (manager.detail.avatar) {
        $('#seoul-setting-avatar-select').css('background-image', 'url('+manager.detail.avatar+')');
    }

    $('#seoul-setting-avatar-select').on('click', function () {
       $('#seoul-setting-avatar-input').click();
    });

    $('#seoul-setting-avatar-input').on('change', function () {
        if (this.files.length === 0 ) {
            return;
        }
        var file = this.files[0];
        var fileReader = new FileReader();

        fileReader.addEventListener('load', function (evnet) {
            var preview = event.target.result;

            $('.seoul-setting-avatar-img').css('background-image', 'url('+preview+')');
        });
        fileReader.readAsDataURL(file);

    });



}