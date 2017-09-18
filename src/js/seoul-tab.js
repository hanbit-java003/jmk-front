var callback=[]; // 구글 맵 띄우기 위해서 만듦.
var commonCallback;


$('.ht-tab-btns > li').on('click', function () {
    // 엑티브라는 클래스를 가지고 있으면
    if ($(this).hasClass('active')) {
        // 다시 되돌아 간다.
        return;
    }

    // tabContents 의 li 번호를 찾기위해서 만들어줌
    var tabIndex = $(this).index();

    //  부모 btns에서 li를 찾고 그안의 엑티브의 클래스를 지워줌으로써  // 라디오 버튼이라고 해도 무관하다.
    var tabBtns = $(this).parent('.ht-tab-btns').find('li');
    tabBtns.removeClass('active');
    // 클래스를 추가해줌 엑티브가 추가한다.
    $(tabBtns[tabIndex]).addClass('active');
    //$(this).addClass('active');  // 둘중 하나만 써도 상관은 없다.


    // 부모를 계속 찾기위해서 parents사용  btns와 같이 만들어줌.
    var tabContents = $(this).parents('.ht-tab').find('.ht-tab-contents > li');
    tabContents.removeClass('active');

    // jquery를 사용하려면 이렇게 해줘야 한다.
    $(tabContents[tabIndex]).addClass('active');

    if (typeof  callback[tabIndex] === 'function') {

    // 함수 호출을 위해서 Map을 클릭하면 그 안에 지도를 보여주기 위해서
    callback[tabIndex](); // 언디파인드면 안부르니깐 있어야지만 부름.
    }

    var tabId =$(this).attr('tab-id');

    if (tabId && typeof commonCallback === 'function') {
        commonCallback(tabId);
    }
});

module.exports = {
    // 앞에는 탭인댁스/ 뒤에는 함수
    setCallback: function () {
        // 특별한 지시자 파라미터가 몇개인지 뭔지 알 수 있다.
        if (arguments.length > 0
            && typeof arguments[0] === 'function'){
            commonCallback = arguments[0];
        }
        else if(arguments.length > 1
          && typeof arguments[0] === 'number'
          && typeof arguments[1] === 'function'){

            callback[arguments[0]] = arguments[1];
        }

        // 바깥쪽에서 이게 모듈이니깐 불러올수 있으니깐
        // 위에 인댁스를 받아서
        // 핸들러는 이벤트를 주는 함수이다.
    }
};