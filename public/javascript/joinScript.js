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
})

$(document).ready(function () {
    $('#select_id').change(function () {
        $('#select_id option:selected').each(function () {
            if ($(this).val() == 'self') {
                $('#uEmailSecond').val('');
                $('#uEmailSecond').attr('disabled', false);
            }
            else {
                $("#uEmailSecond").val($(this).text());
                $("#uEmailSecond").attr('disabled', true);
            }
        });
    });
});