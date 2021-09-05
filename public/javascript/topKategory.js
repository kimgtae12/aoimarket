
$(document).ready(function () {
    $('.menu_toggle').click(function () {
        $(this).toggleClass('on');
    });
    $(document).mouseup(function (e) {
        if (!$('.top_selectarea').has(e.target).length) {
            $('.top_selectarea').slideUp();
            $('#top_second_kate').hide();
        }
    })
    $('.menu_toggle').click(function () {

        if ($('.top_selectarea').is(":visible")) {
            $(".top_selectarea").slideUp();
            $('#top_second_kate').hide();
        }
        else {
            $('.top_selectarea').slideDown();
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

    //1차 카테고리 리스트 생성
    for (let i = 0; i <= firstKate.length - 1; i++) {
        $('.top_kate_ul').append('<li class="top_first_kate_list">' + firstKate[i] + '</li>');
    }
    let select_kate;


    //1차 카테고리 선택
    $('.top_first_kate_list').click(function () {
        //모든 서브클래스 삭제및 선택요소에 클래스 추가
        $('.top_first_kate_list').removeClass('top_first_selected');
        $(this).addClass('top_first_selected');

        //지정한 값의 텍스트 가져오기.
        select_kate = $(this).text();
        //2nd kategorie el생성
        let second_kate = "<p class='top_kategory_title'>" + select_kate + " &#10095;</p><hr class='top_kate_line'><ul class='top_kate_ul top_second_ul'></ul>";
        //두번째 카테고리 비운후 2nd kategorie 추가
        $('#top_second_kate').empty();
        $('#top_second_kate').append(second_kate);

        //두번째 카테고리에 li el 추가
        switch (select_kate) {
            case '남성의류':
                for (let j = 0; j <= manscloth.length - 1; j++) {
                    $('.top_second_ul').append('<li class="top_second_kate_list"><a href="searchItem?itemName=' + manscloth[j] + '">' + manscloth[j] + '</a></li > ');
                }
                break;
            case '여성의류':
                for (let j = 0; j <= womanscloth.length - 1; j++) {
                    $('.top_second_ul').append('<li class="top_second_kate_list"><a href="searchItem?itemName=' + womanscloth[j] + '">' + womanscloth[j] + '</a></li > ');
                }
                break;
            case '신발':
                for (let j = 0; j <= shoes.length - 1; j++) {
                    $('.top_second_ul').append('<li class="top_second_kate_list"><a href="searchItem?itemName=' + shoes[j] + '">' + shoes[j] + '</a></li > ');
                }
                break;
            case '패션 악세서리':
                for (let j = 0; j <= fessionac.length - 1; j++) {
                    $('.top_second_ul').append('<li class="top_second_kate_list"><a href="searchItem?itemName=' + fessionac[j] + '">' + fessionac[j] + '</a></li > ');
                }
                break;
            case 'IT':
                for (let j = 0; j <= it.length - 1; j++) {
                    $('.top_second_ul').append('<li class="top_second_kate_list"><a href="searchItem?itemName=' + it[j] + '">' + it[j] + '</a></li > ');
                }
                break;
            case '음반/악기':
                for (let j = 0; j <= music.length - 1; j++) {
                    $('.top_second_ul').append('<li class="top_second_kate_list"><a href="searchItem?itemName=' + music[j] + '">' + music[j] + '</a></li > ');
                }
                break;
            case '디지털/가전':
                for (let j = 0; j <= digital.length - 1; j++) {
                    $('.top_second_ul').append('<li class="top_second_kate_list"><a href="searchItem?itemName=' + digital[j] + '">' + digital[j] + '</a></li > ');
                }
                break;
            case '뷰티/미용':
                for (let j = 0; j <= makeup.length - 1; j++) {
                    $('.top_second_ul').append('<li class="top_second_kate_list"><a href="searchItem?itemName=' + makeup[j] + '">' + makeup[j] + '</a></li > ');
                }
                break;
            case '굿즈':
                for (let j = 0; j <= goods.length - 1; j++) {
                    $('.top_second_ul').append('<li class="top_second_kate_list"><a href="searchItem?itemName=' + goods[j] + '">' + goods[j] + '</a></li > ');
                }
                break;

            default:
                break;
        }

        if ($('#top_second_kate').is(":visible")) {
        }
        else {
            $('#top_second_kate').show();
        }

        //두번째 요소 클릭시 이벤트 발생.
        $(document).on('click', '.top_second_kate_list', function () {
            $('.second_kate_list').removeClass('first_selected');
            $(this).addClass('first_selected');
            let second_kate = $(this).text();
            //input box에 1차와 2차 카테고리값 올리기.
            $('#item_kate').val(select_kate + ' - ' + second_kate);
        });
    });
});