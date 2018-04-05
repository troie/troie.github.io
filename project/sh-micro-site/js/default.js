$(document).ready(function () {
    $('#shinho').fullpage({
        navigation: true,
        navigationPosition: 'right',
        showActiveTooltip: 'true',
        navigationTooltips: ['', '', '', '<i>i</i>', '<i>i</i>', '<i>i</i>', '<i>i</i>', '<i>i</i>', '<i>i</i>', '<i>i</i>', ''],
        anchors: ['sec_past', 'sec_now', 'sec_ecosystem', 'sec_sustainable', 'sec_reliable', 'sec_innovation', 'sec_standard', 'sec_sales', 'sec_experience', 'sec_education', 'sec_shinho'],
        slidesNavigation: true,
        slidesNavPosition: 'bottom',
        afterLoad: function (anchorLink, index) {
            var loadedSection = $(this);
            console.log(anchorLink);
            $("." + anchorLink + " .mask").removeClass("on");
            $("." + anchorLink + " h2").removeClass("on");
            if (index >= 3 && index <= 10) {
                $('#fp-nav').addClass('on');
            } else {
                $('#fp-nav').removeClass('on');
            }
            $('.section').removeClass('on');
            loadedSection.addClass('on');
            if (anchorLink == 'secondSlide') {
                alert("Section 2 ended loading");
            }
        }
    });
    $('#fp-nav div').on('click', function () {
        var show_txt_class = "." + $(this).prev().attr('href').slice(1);
        $(show_txt_class + " h2").addClass("on");
        $(show_txt_class + " .mask").addClass("on");
    });
    $(".mask").on("click", function () {
        $(".mask").removeClass("on");
        $(".section h2").removeClass("on");
    })
});
