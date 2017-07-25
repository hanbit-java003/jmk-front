function addEvent() {
    $('.facilities2-tab-btns > li').on('click', function () {

        if($(this).hasClass('active')) {
            return;
        }

        var tabIndex = $(this).index();


        var tabBtns = $(this).parent('.facilities2-tab-btns').find('li');

        tabBtns.removeClass('active');

        $(tabBtns[tabIndex]).addClass('active');



        var tabContents=$(this).parents('.facilities2-tab').find('.facilities2-tab-contents > li');
        tabContents.removeClass('active');

        $(tabContents[tabIndex]).addClass('active');

    });


    $('.facilities2-tab-tab-btns > li ').on('click', function () {
        if($(this).hasClass('active')) {
            return;
        }

        var tabIndex = $(this).index();

        var tabBtns = $(this).parent('.facilities2-tab-tab-btns').find('li');

        tabBtns.removeClass('active');

        $(tabBtns[tabIndex]).addClass('active');

        var tabContents = $(this).parents('.facilities2-tab-tab').find('.facilities2-tab-tab-contents > li');
        tabContents.removeClass('active');

        $(tabContents[tabIndex]).addClass('active');

    });
}

module.exports = {
    addEvent: addEvent
};