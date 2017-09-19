/**
 * Created by 1027 on 2017-07-06.
 */

var menus = require('./model/menu');
var carousel = require('./seoul-carousel.js');

function ajax(options) {

    if (!options.error) {
        options.error = function(jqXHR) {
            var errorCode = jqXHR.responseJSON.errorCode;

            if (errorCode === 403) {
                $('.seoul-footer-btn').click();
            }

            alert(jqXHR.responseJSON.message);
        };
    }

    $.ajax(options);
}



function initMenu() {
    var template = require('../template/seoul-menu.hbs');
    var menu = $('.seoul-menus');

    /!*menu.empty();*!/

    for(var i=0; i<menus.length; i++){
        var menuHtml =template(menus[i]);

        menu.append(menuHtml);

    }
}



initMenu();

//로그인 관리자
$('.seoul-footer-btn').on('click', function () {
    $.ajax({
        url: '/api/manager/get',
        success: function (result) {
            openManagerLayer(result);
        }
    });

    function openManagerLayer(managerInfo){
        $('body').append('<div class="overlay-layer dark-layer"></div>');
        $('body').css('overflow','hidden');

        var managerLayerTemplate=require('../template/manager-layer.hbs');
        var managerLayer = managerLayerTemplate(managerInfo);

        $('body').append(managerLayer);
        $('.manager-layer').animate({
            bottom: '0px'
        },{
            duration: 500,
            complete: function () {
                if(!managerInfo.signedIn){
                    $('.seoul-manager-toggle').on('click', function () {
                        console.log('dsadsa');
                        $('.sign-in').toggle();
                        $('.sign-up').toggle();
                    });

                    $('#seoul-sign-up').on('click', function () {
                        signUp();
                    });

                    $('#seoul-sign-in').on('click', function () {
                        signIn();
                    });
                }
                else {
                    $('#seoul-setting').on('click', function () {
                        closeManagerLayer(function () {
                            location.href = '/setting.html';
                        });

                    });

                    $('#seoul-admin').on('click', function () {
                        closeManagerLayer(function () {
                            location.href = '/admin/index.html';
                        });
                    });

                    $('#seoul-main').on('click', function () {
                       closeManagerLayer(function () {
                           location.href = '../'
                       }) ;
                    });

                    $('#seoul-sign-out').on('click', function () {
                       signOut();
                    });
                }

                $('.seoul-manager-cancel').on('click', function () {
                    closeManagerLayer();
                });

                $('.overlay-layer').on('click', function () {
                    closeManagerLayer();
                });
            }
        });
    }
    

});

function signOut(){
    $.ajax({
       url: '/api/manager/signout',
       success : function () {
           closeManagerLayer(function () {
              location.href='/';
           });
       }
    });
}

function signIn() {
    var id = $('#seoul-sign-in-id').val().trim();
    var pw = $('#seoul-sign-in-pw').val().trim();
    var remember = $('#seoul-sign-in-remember').prop('checked');

    if (!id) {
        alert('아이디를 입력해라');
        $('#seoul-sign-in-id').focus();
        return;
    }else if (!pw) {
        alert('비밀번호를 입력해라');
        $('#seoul-sign-in-pw').focus();
        return;
    };

    $.ajax({
        url: '/api/manager/signin',
        method: 'POST',
        data: {
            email: id,
            password: pw,
            remember: remember
        },
        success: function (result) {
            alert(result.email + '님 잘 관리 하세요.');
            closeManagerLayer();
        },
        error: function (jqXHR) {
            alert(jqXHR.responseJSON.message);
        }
    })
}

function signUp(){
    var id = $('#seoul-sign-up-id').val().trim();
    var pw = $('#seoul-sign-up-pw').val().trim();
    var agree = $('#seoul-sign-up-agree').prop('checked');

    if (!id) {
        alert('아이디를 입력해라');
        $('#seoul-sign-up-id').focus();
        return;
    }else if (!pw) {
        alert('비밀번호를 입력해라');
        $('#seoul-sign-up-pw').focus();
        return;
    }else if(!agree){
        alert('약관의 동의 하셔야 합니다.');
        return;
    };

    $.ajax({
        url: '/api/manager/signup',
        method: 'POST',
        data: {
            email: id,
            password: pw
        },
        success: function (result) {
            alert('관리자가 된걸 축하드립니다.');
            closeManagerLayer();
        },
        error: function (jqXHR) {
            alert(jqXHR.responseJSON.message);
        }
    });
}

function closeManagerLayer(callback) {

    $('.manager-layer').animate({
        bottom:'-337px'
    },{
        duration: 500,
        complete : function () {
            $('.manager-layer').remove();
            $('.overlay-layer').remove();
            $('body').css('overflow', 'auto');

            if(typeof callback === 'function') {
                callback();
            }
        }
    });

}

$('.seoul-manager-toggle').on('click', function () {
   $ ('.sign-up').toggle();
});

function init(){
    carousel.init($('.seoul-photos'),[{
        img: '../img/face1.PNG'
    }, {
        img: '../img/face2.PNG'
    }, {
        img: '../img/face3.PNG'
    }, {
        img: '../img/face4.PNG'
    }],function (slide) {
        var slideElement = $('<li></li>');
        slideElement.css('background-image', 'url('+slide.img+')');

        return slideElement;
    },{
        slideDuration: 1000,
        slideInterval: 2000
    });
}

init();




// 사진들을 옆으로 바꾸기위한 버튼들.
/*
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
*/


$('.seoul-logo> img').on('click', function () {
    // 왼쪽 상단 로고 버튼을 누르면 본 페이지로 이동.
    location.href = './';
});

$('.seoul-move').on('click', function () {
    var seoulId =$(this).attr('seoul-id');

    location.href = location.href +(seoulId ? "?id" : '');
});

$('.seoul-logo2').on('click', function(){
   location.href = '../';
});

$('.seoul-menu-text').on('click', function () {
    var seoulId =$(this).attr('seoul-id');
    var subId=$(this).attr('sub-id');



    location.href='./seoulmenu.html?id=' + seoulId+(subId ? "&sub-id="+subId : '');
});


$('.seoul-sub-menu > li').on('click', function (event) {
    event.stopPropagation();
   var seoulId =$(this).attr('seoul-id');
   var subId=$(this).attr('sub-id');

   location.href='./seoulmenu.html?id=' + seoulId+(subId ? "&sub-id="+subId : '');
});

$('.seoul-sub-sub > li').on('click', function (event) {
    event.stopPropagation();
    var seoulId =$(this).attr('seoul-id');

    location.href='./seoulmenu.html?id=' + seoulId;
});



$('.seoul-menus > li').on('mouseover' , function () {
   $(this).find('.seoul-sub-menu').show();
});

$('.seoul-menus > li').on('mouseout' , function () {
    $(this).find('.seoul-sub-menu').hide();
});


module.exports = {
    ajax : ajax
}

/*
$('.seoul-menus > li').on('click', function () {

    if($(this).hasClass('active')) {
        return;
    }

    var menuIndex = $(this).index();

    var seoulMenu = $(this).parent('.seoul-menus').find('li');

    seoulMenu.removeClass('active');

    $(seoulMenu[menuIndex]).addClass('active');


});*/
