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




//<![CDATA[
// 사용할 앱의 JavaScript 키를 설정해 주세요.
Kakao.init('53aaee2d65e52a4b5117bf7ed31572fc');

// 카카오 로그인 버튼을 생성합니다.
Kakao.Auth.createLoginButton({
    container: '#kakao-login-btn1',
    success: function(authObj) {
        console.log(JSON.stringify(aythObj))
        alert(JSON.stringify(authObj));
    },
    fail: function(err) {
        alert(JSON.stringify(err));
    }
});
//]]>


// 카카오 로그인 버튼을 생성합니다.
Kakao.Auth.createLoginButton({
    container: '#kakao-login-btn',
    success: function(authObj) {
        // 로그인 성공시, API를 호출합니다.
        Kakao.API.request({
            url: '/v1/user/me',
            success: function(res) {
                console.log(JSON.stringify(res));
                alert(JSON.stringify(res));
            },
            fail: function(error) {
                alert(JSON.stringify(error));
            }
        });
    },
    fail: function(err) {
        alert(JSON.stringify(err));
    }
});
//]]>

//<![CDATA[
// 스토리 공유 버튼을 생성합니다.
Kakao.Story.createShareButton({
    container: '#kakaostory-share-button',
    url: 'https://developers.kakao.com',
    text: '카카오 개발자 사이트로 놀러오세요! #개발자 #카카오 :)'
});
//]]>

//<![CDATA[
// 스토리 구독 버튼을 생성합니다.
Kakao.Story.createFollowButton({
    container: '#kakaostory-follow-button',
    id: 'kakao'
});
//]]>