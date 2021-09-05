window.onload = function () {
    let go_home = document.getElementById('home_button');
    go_home.addEventListener('click', function () {
        history.back();
    });
}

$(function () {
    $("#password_eq").hide();
    $("#password_neq").hide();
    $("#secondPsw").keyup(function () {
        let firstPw = $("#firstPsw").val();
        let secondPw = $("#secondPsw").val();
        if (firstPw != "" || secondPw != "") {
            if (firstPw == secondPw) {
                $("#password_eq").show();
                $("#password_neq").hide();
                $(".access").removeAttr("disabled");
            }
            else {
                $("#password_eq").hide();
                $("#password_neq").show();
                $(".access").attr("disabled", "disabled");
            }
        }
    });

    $("#phoneinput").on('keydown', function (e) {
        // 숫자만 입력받기
        var trans_num = $(this).val().replace(/-/gi, '');
        var k = e.keyCode;

        if (trans_num.length >= 11 && ((k >= 48 && k <= 126) || (k >= 12592 && k <= 12687 || k == 32 || k == 229 || (k >= 45032 && k <= 55203)))) {
            e.preventDefault();
        }
    }).on('blur', function () { // 포커스를 잃었을때 실행합니다.
        if ($(this).val() == '') return;

        // 기존 번호에서 - 를 삭제합니다.
        var trans_num = $(this).val().replace(/-/gi, '');

        // 입력값이 있을때만 실행합니다.
        if (trans_num != null && trans_num != '') {
            // 총 핸드폰 자리수는 11글자이거나, 10자여야 합니다.
            if (trans_num.length == 11 || trans_num.length == 10) {
                // 유효성 체크
                var regExp_ctn = /^(01[016789]{1}|02|0[3-9]{1}[0-9]{1})([0-9]{3,4})([0-9]{4})$/;
                if (regExp_ctn.test(trans_num)) {
                    // 유효성 체크에 성공하면 하이픈을 넣고 값을 바꿔줍니다.
                    trans_num = trans_num.replace(/^(01[016789]{1}|02|0[3-9]{1}[0-9]{1})-?([0-9]{3,4})-?([0-9]{4})$/, "$1-$2-$3");
                    $(this).val(trans_num);
                }
                else {
                    alert("유효하지 않은 전화번호 입니다.");
                    $(this).val("");
                    $(this).focus();
                }
            }
            else {
                alert("유효하지 않은 전화번호 입니다.");
                $(this).val("");
                $(this).focus();
            }
        }
    });
})

$(document).ready(function () {
    $('#select_id').change(function () {
        $('#select_id option:selected').each(function () {
            if ($(this).val() == 'self') {
                $('#uEmailSecond').val('');
                $('#uEmailSecond').attr('readonly', false);
            }
            else {
                $("#uEmailSecond").val($(this).text());
                $("#uEmailSecond").attr('readonly', true);

            }
        });
    });
});