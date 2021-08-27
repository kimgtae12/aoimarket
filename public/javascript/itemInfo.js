
window.onload = function () {
    let sellingload = $('#selling').text();
    let sellstat = $.trim(sellingload);
    console.log(sellstat);

    if (sellstat == '판매중') {
        $('#selling').css('color', '#FFAA00');
    }
    else if (sellstat == '판매완료') {
        $('#selling').css('color', 'gray');
        $('#completearea').append('<div class= "sellcomp">판매완료</div >');
    }
}

