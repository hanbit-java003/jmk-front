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
        $('.seoul-setting-avatar-img').css('background-image', 'url('+manager.detail.avatar+')');
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

$('.seoul-setting-cancel').on('click', function () {
   history.back();
});

$('.seoul-setting-save').on('click', function () {
   var manager = {
       currentPw: $('#seoul-manager-cpw-input').val().trim(),
       password: $('#seoul-manager-npw-input').val().trim(),
       detail : {
           name: $('#seoul-manager-name-input').val().trim(),
           phone: $('#seoul-manager-phone-input').cleanVal().trim(),
           info: $('#seoul-manager-info-check')[0].checked ? 'Y' : 'N'
       }
   };
   // 벨리데이션
   var npwc = $('#seoul-manager-npwc-input').val().trim();
   // 셋중에 하나라도 있으면 값이 걸린다.
    if (manager.currentPw || manager.password || npwc) {
        // 현재비밀번호
        if(!manager.currentPw) {
            alert('현재 비밀번호 입력!');
            $('#seoul-manager-cpw-input').focus();
            return;
        }// 새 비밀번호
        else if(!manager.password) {
            alert('새 비밀번호 입력!');
            $('#seoul-manager-npw-input').focus();
            return;
        }
        else if(!npwc) {
            alert('새 비밀번호 확인 입력!');
            $('#seoul-manager-npwc-input').focus();
            return;
        }
        else if(manager.password !== npwc) {
            alert('새 비밀번호 다름!');
            $('#seoul-manager-npwc-input').focus();
            return;
        }
    }
    var formData = new FormData();
    // JSON을 String으로 바꿔주는녀석.
    formData.append('manager',JSON.stringify(manager));

    var images = $('#seoul-setting-avatar-input')[0].files;
    if (images.length > 0) {
        formData.append('avatar', images[0]);
    }

    common.ajax({
       url:'/api/manager/save',
       method: 'POST',
       data:formData,
       contentType: false,
       processData: false,
       success: function (result) {
           alert('정상적으로 저장되었다.');

           location.reload();
       }
    });


   /*console.log(manager);*/
});
