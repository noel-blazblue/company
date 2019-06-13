$(function() {

    var hd_li = $('.condition_list li'),
        bd_li = $('.condition_bd li')


    click(hd_li, 'active')
    click(bd_li, 'active')

})

function click(ele, params) {
    ele.on('click', function() {
        var $self = $(this)
        $self.addClass(params).siblings().removeClass(params)
        console.log($self.is('.condition_list li'))
        if ($self.is('.condition_list li')) {
            var $self_idx = $self.data('cateid'),
                box = $('.condition_bd')
            box.eq($self_idx - 1).addClass(params).siblings().removeClass(params)
            $('.filter_mask').css('display', 'block')
            $('.condition_wrap').addClass('absolute')
        }
        if ($self.is('.condition_bd li')) {
            $('.condition_wrap').removeClass('absolute')
            $('.filter_mask').css('display', 'none')
        }

    })
}

// function toggleClass(list) {
//     list.forEach(function (item) {
//         click(item.ele, item.params || 'active')
//     });
//     function click(ele, params) {
//         ele.on('click',function() {
//             var $self = $(this),
//                 $self_idx = $self.data('idx'),
//                 $content_list = $('.recommend_list .tab_bd ul')
//             $self.addClass(params).siblings().removeClass(params)
//             if ($self.eq('.recommend_list .tab_hd li')) {
//                 $content_list.eq($self_idx - 1).addClass('content_current').siblings().removeClass('content_current')
//             }
//         })
//     }
// }