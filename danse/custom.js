var take_next = false;
var modified = false;

function each_core() {
    cur_for_img = $(this).attr("src").replace(/.webp/, "_b.webp").replace(/.jpg/, "_b.jpg");
    if (take_next) {
	$("#modal-img").attr("src", cur_for_img);
	take_next = false;
	modified = true;
	return false;
    } else if (cur_for_img == cur_img) {
	take_next = true;
    }
}

function next_img() {
    modified = false;
    cur_img = $("#modal-img").attr("src");
    $('.col-lg-2 img').each(each_core);
    $('.col-lg-3 img').each(each_core);
    if (modified == false) {
	$('.col-lg-2 img').each(each_core);
	$('.col-lg-3 img').each(each_core);
    }
}

function prev_img() {
    modified = false;
    cur_img = $("#modal-img").attr("src");
    $($('.col-lg-2 img').get().reverse()).each(each_core);
    $($('.col-lg-3 img').get().reverse()).each(each_core);
    if (modified == false) {
	$($('.col-lg-2 img').get().reverse()).each(each_core);
	$($('.col-lg-3 img').get().reverse()).each(each_core);
    }
}

function install_modal() {
    $('.modal').on('show.bs.modal', function (e) {
	var image = $(e.relatedTarget).attr('src').replace(/.webp/, "_b.webp").replace(/.jpg/, "_b.jpg");;
	$("#modal-img").attr("src", image);
    });

    $('#btn-next').on('click', next_img);
    $('#modal-img').on('click', next_img);

    $('#btn-prev').on('click', prev_img);

    $(document).keydown(function(e) {
	switch(e.which) {
	case 37: // left
	    prev_img();
	    break;
	case 39: // right
	    next_img();
	    break;
	default: return; // exit this handler for other keys
	}
	e.preventDefault(); // prevent the default action (scroll / move caret)
    });
}

function cache_big_images() {
    // cache big version of each image when document is ready
    var lazyloadImages = document.querySelectorAll("img.cache");
    lazyloadImages.forEach(function(img) {
        var big_src = $(img).attr("src").replace(/.webp/, "_b.webp").replace(/.jpg/, "_b.jpg");
        var image = $('<img />').attr('src', big_src);
    });
}

$(document).ready(function () {
    install_modal();
});

$(window).load(function () {
    cache_big_images();
});
