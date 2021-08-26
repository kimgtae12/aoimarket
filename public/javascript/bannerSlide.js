window.onload = function () {

    //자동 슬라이드
    function autoSlide() {
        let bannerNow = $(".img_con").find(".now").index();
        let bannerLen = $(".img_con .baner").length;

        $(".img_con .baner").eq(bannerNow).removeClass("now");
        $(".img_con .baner").eq(bannerNow).css("opacity", 0);

        bannerNow = bannerNow + 1;

        if (bannerNow == bannerLen) {
            $(".img_con .baner").eq(0).css("opacity", 1);

            $(".img_con .baner").eq(0).addClass("now");
        }
        else {
            $(".img_con .baner").eq(bannerNow).css("opacity", 1);
            $(".img_con .baner").eq(bannerNow).addClass("now");
        }
    }

    //6초에 한번 다음 배너로 이동
    var slideTimer = setInterval(autoSlide, 6000);

    //이전버튼 클릭시 이전 배너로 이동
    $(".prev").on("click", function (e) {
        e.preventDefault();

        //setInterval 초기화후 재시작
        clearInterval(slideTimer);
        slideTimer = setInterval(autoSlide, 6000);

        let bannerNow = $(".img_con").find(".now").index();
        let bannerLen = $(".img_con .baner").length;

        $(".img_con .baner").eq(bannerNow).removeClass("now");
        $(".img_con .baner").eq(bannerNow).css("opacity", 0);

        bannerNow = bannerNow - 1;


        if (bannerNow < 0) {
            $(".img_con .baner").eq(bannerLen - 1).css("opacity", 1);

            $(".img_con .baner").eq(bannerLen - 1).addClass("now");
        }
        else {
            $(".img_con .baner").eq(bannerNow).css("opacity", 1);
            $(".img_con .baner").eq(bannerNow).addClass("now");
        }


    });

    //다음버튼 클릭시 다음배너로 이동
    $(".next").on("click", function (e) {
        e.preventDefault();

        //setInterval 초기화후 재시작
        clearInterval(slideTimer);
        slideTimer = setInterval(autoSlide, 6000);

        let bannerNow = $(".img_con").find(".now").index();
        let bannerLen = $(".img_con .baner").length;

        $(".img_con .baner").eq(bannerNow).removeClass("now");
        $(".img_con .baner").eq(bannerNow).css("opacity", 0);

        bannerNow = bannerNow + 1;


        if (bannerNow == bannerLen) {
            $(".img_con .baner").eq(0).css("opacity", 1);

            $(".img_con .baner").eq(0).addClass("now");
        }
        else {
            $(".img_con .baner").eq(bannerNow).css("opacity", 1);
            $(".img_con .baner").eq(bannerNow).addClass("now");
        }
    });
}