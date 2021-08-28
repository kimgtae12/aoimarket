
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

