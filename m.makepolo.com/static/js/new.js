$(function() {

    var hd_li = $('.condition_list li'),  //标签
        bd_li = $('.condition_bd li')     //标签容器
        mask = $('.tab_mask')          //遮罩


    click(hd_li, 'active')
    click(bd_li, 'active')
    click(mask, 'active')

})

function click(ele, params) {
    ele.on('click', function() {
        var $self = $(this)
        $self.addClass(params).siblings().removeClass(params)
        if ($self.is('.condition_list li')) {
            var $self_idx = $self.data('cateid'),
                box = $('.condition_bd')
            box.eq($self_idx - 1).addClass(params).siblings().removeClass(params)
            $('.tab_mask').css('display', 'block')
            $('.condition_bd').addClass('absolute')   
        }
        if ($self.is('.condition_bd li')) {
            $self.addClass('active').siblings().removeClass('active')
            $('.condition_wrap').removeClass('absolute')
            $('.tab_mask').css('display', 'none')
            $('.condition_bd').removeClass('active')

        }
        if($self.is('.tab_mask')){
            $('.tab_mask').css('display', 'none')
            $('.condition_bd').removeClass('active')
            $('.condition_wrap').removeClass('absolute')
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