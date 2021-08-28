
window.onload = function () {
    let go_home = document.getElementById('home_button');
    go_home.addEventListener('click', function () {
        history.back();
    });
}


$(document).ready(function () {
    $(".input_img_area").append(createLayer());

    $("#item_kate").attr('readonly', true);

    $('#item_kate').click(function () {
        if ($('.selectarea').is(":visible")) {
            $(".selectarea").slideUp();
        }
        else {
            $('.selectarea').slideDown();
        }
    });
    //first kategory;
    let firstKate = ['남성의류', '여성의류', '신발', '패션 악세서리', 'IT', '음반/악기', '디지털/가전', '뷰티/미용', '굿즈'];

    //second kategory;
    let manscloth = ['반팔', '반바지', '긴팔', '슬렉스', '와이드팬츠', '청바지', '바람막이', '가디건', '스웨터', '패딩', '코트', '후드티', '기타 의류'];
    let womanscloth = ['반팔', '반바지', '긴팔', '슬렉스', '와이드팬츠', '청바지', '바람막이', '가디건', '스웨터', '패딩', '코트', '후드티', '기타 의류'];
    let shoes = ['운동화', '단화', '스니커즈', '남성구두', '여성구두', '슬리퍼', '조리', '기타 신발'];
    let fessionac = ['지갑', '반지', '목걸이', '귀걸이', '목도리', '장갑', '시계', '팔찌', '기타 악세서리'];
    let it = ['컴퓨터', '키보드', '마우스', '본체', '그래픽카드', 'RAM', 'CPU', '주변 악세서리'];
    let music = ['CD/DVD', '피아노', '바이올린', '기타', '첼로', '기타 악기']
    let digital = ['스마트폰', '충전기', '휴대폰케이스', '냉장고', '전자렌지', '선풍기', '에어컨', '난로', '기타 제품'];
    let makeup = ['드라이기', '화장품', '셀프미용', '기타 메이크업'];
    let goods = ['피규어', '브로마이드', '기타 굿즈'];

    for (let i = 0; i <= firstKate.length - 1; i++) {
        $('.kate_ul').append('<li class="first_kate_list">' + firstKate[i] + '</li>');
    }
    let select_kate;


    //1차 카테고리 선택
    $('.first_kate_list').click(function () {
        $('.first_kate_list').removeClass('first_selected');
        $(this).addClass('first_selected');

        select_kate = $(this).text();
        let second_kate = "<p class='kategory_title'>" + select_kate + " &#10095;</p><hr class='kate_line'><ul class='kate_ul second_ul'></ul>";
        $('#second_kate').empty();
        $('#second_kate').append(second_kate);

        switch (select_kate) {
            case '남성의류':
                for (let j = 0; j <= manscloth.length - 1; j++) {
                    $('.second_ul').append('<li class="second_kate_list">' + manscloth[j] + '</li > ');
                }
                break;
            case '여성의류':
                for (let j = 0; j <= womanscloth.length - 1; j++) {
                    $('.second_ul').append('<li class="second_kate_list">' + womanscloth[j] + '</li > ');
                }
                break;
            case '신발':
                for (let j = 0; j <= shoes.length - 1; j++) {
                    $('.second_ul').append('<li class="second_kate_list">' + shoes[j] + '</li > ');
                }
                break;
            case '패션 악세서리':
                for (let j = 0; j <= fessionac.length - 1; j++) {
                    $('.second_ul').append('<li class="second_kate_list">' + fessionac[j] + '</li > ');
                }
                break;
            case 'IT':
                for (let j = 0; j <= it.length - 1; j++) {
                    $('.second_ul').append('<li class="second_kate_list">' + it[j] + '</li > ');
                }
                break;
            case '음반/악기':
                for (let j = 0; j <= music.length - 1; j++) {
                    $('.second_ul').append('<li class="second_kate_list">' + music[j] + '</li > ');
                }
                break;
            case '디지털/가전':
                for (let j = 0; j <= digital.length - 1; j++) {
                    $('.second_ul').append('<li class="second_kate_list">' + digital[j] + '</li > ');
                }
                break;
            case '뷰티/미용':
                for (let j = 0; j <= makeup.length - 1; j++) {
                    $('.second_ul').append('<li class="second_kate_list">' + makeup[j] + '</li > ');
                }
                break;
            case '굿즈':
                for (let j = 0; j <= goods.length - 1; j++) {
                    $('.second_ul').append('<li class="second_kate_list">' + goods[j] + '</li > ');
                }
                break;

            default:
                break;
        }

        $('#item_kate').val(select_kate);

        $(document).on('click', '.second_kate_list', function () {
            $('.second_kate_list').removeClass('first_selected');
            $(this).addClass('first_selected');
            let second_kate = $(this).text();
            console.log(select_kate);
            console.log(second_kate);
            $('#item_kate').val(select_kate + ' - ' + second_kate);
        });
    });

});



var createLayer = function () {
    // Element 생성
    var $el = $("<div class='submmit_img_list'>" +
        "<label class='img_selector'>" +
        '<input type="file" id="imgSelector" name="img_name" accept="image/*" style="display:none;" />' +
        '</label >' +
        '</div >');
    console.log($el);

    // Event 설정
    $el.find('#imgSelector').change(function (e) {
        let files = e.target.files;
        let filesarray = Array.prototype.slice.call(files);

        filesarray.forEach(function (f) {
            var reader = new FileReader();
            reader.onload = function (e) {
                $(".input_img_area").append(createLayer());
                var img_url = e.target.result;
                $el.find('.img_selector').css({ "background-image": "url('" + img_url + "')" });
                $el.find('.img_selector').css("background-size", "230px 230px");
            }
            reader.readAsDataURL(f);
        }.bind($el))

    }.bind($el));
    return $el;
}





/*async function handleImgsFilesSelect(e) {
    let files = e.target.files;
    let filesarray = Array.prototype.slice.call(files);
    console.log(filesarray);

    let img_url = new Promise((resolve, reject) => {
        filesarray.forEach(function (f) {
            var reader = new FileReader();
            reader.onload = function (e) {
                var img_html = "<div class='submmit_img_list'>" +
                    "<label class='img_selector'>" +
                    '<input type="file" id="imgSelector" name="img_name" accept="image/*" />' +
                    '</label >' +
                    '</div >';
                $(".input_img_area").append(img_html);
                resolve(e.target.result);
            }
            reader.readAsDataURL(f);
        });
    });

    let img_result_url = await img_url;
    $(this).closest('label').css({ "background-image": "url('" + img_result_url + "')" });
    $(this).closest('label').css("background-size", "230px 230px");
}*/