$(function() {

    var $dd = $('.pro_category dd'),
        $li = $('.nav ul li'),
        $a = $('.nextpage a').slice(1,-1),
        $tab_li = $('.recommend_list .tab_hd li'),
        tab_list = [{ele:$dd},{ele:$li},{ele:$a},{ele:$tab_li}],
        $phone = $('.block2')

        toggleClass(tab_list)
        hidden($phone)

})

// tab标签切换
function toggleClass(list) {
    list.forEach(function (item) {
        click(item.ele, item.params || 'active')
    });
    function click(ele, params) {
        ele.on('click',function() {
            var $self = $(this),
                $self_idx = $self.data('idx'),
                $content_list = $('.recommend_list .tab_bd ul')
            $self.addClass(params).siblings().removeClass(params)
            if ($self.eq('.recommend_list .tab_hd li')) {
                $content_list.eq($self_idx - 1).addClass('content_current').siblings().removeClass('content_current')
            }
        })
    }
}

function hidden(ele) {
    ele.on('click',function (){
        $(this).css('display','none')
    })
}