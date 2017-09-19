require('../../less/admin/common.less');

var common = require('./common.js');

$.ajax({
    url: '/api/manager/get',
    success : function (result) {
        if (!result.signedIn) {
            alert('로그인이 필요한 관리자 페이지입니다.');
            location.href = '/';
        }
    }
});