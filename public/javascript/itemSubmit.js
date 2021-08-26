
window.onload = function () {
    let go_home = document.getElementById('home_button');
    go_home.addEventListener('click', function () {
        history.back();
    });
}

$(document).ready(function () {
    $(".input_img_area").append(createLayer());
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

async function handleImgsFilesSelect(e) {
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
}