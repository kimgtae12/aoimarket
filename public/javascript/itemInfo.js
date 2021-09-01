
window.onload = function () {
    let sellingload = $('#selling').text();
    let sellstat = $.trim(sellingload);


    if (sellstat == '판매중') {
        $('#selling').css('color', '#FFAA00');
    }
    else if (sellstat == '판매완료') {
        $('#selling').css('color', 'gray');
        $('#completearea').append('<div class= "sellcomp">판매완료</div >');
    }

    let itemStatLoad = $('#item_stat').text();
    let itemStat = $.trim(itemStatLoad);

    if (itemStat == '양호') {
        $('#item_stat').css('color', '#03C75A');
    }
    else if (itemStat == '보통') {
        $('#item_stat').css('color', 'orange');
    }
    else if (itemStat == '불량') {
        $('#item_stat').css('color', '#f05650');
    }

}
function openWindowPop(url, name) {
    var option = 'top=10, left=10, width:400, height:300, status=no, menubar=no, toolbar=no, resizeble=no ';
    window.open(url, name, option);
}

function openReplyArea(idx) {
    var test = '#second_reply' + idx;
    console.log(test);
    if ($(test).is(":visible")) {
        $(test).slideUp();
    }
    else {
        $('.second_reply').slideUp();
        $(test).slideDown();
    }
}
