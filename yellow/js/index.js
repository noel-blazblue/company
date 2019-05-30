$(function() {

    var $dd = $('.pro_category dd'),
        $li = $('.nav ul li'),
        $a = $('.nextpage a').slice(1,-1),
        $tab_li = $('.recommend_list .tab_hd li'),
        tab_list = [$dd,$li,$a,$tab_li]

    taggleClass(tab_list)

})

// tab标签切换
function taggleClass(list,params) {
    var params = params || 'active'
    list.forEach(function (item) {
        click(item)
    });
    function click(ele) {
        ele.on('click',function() {
            var $self = $(this) 
            $self.addClass(params).siblings().removeClass(params)
            if ($self.eq('.recommend_list .tab_hd li')) {
                var $self_idx = $self.data('idx')
                var $content_list = $('.recommend_list .tab_bd ul')
                $content_list.eq($self_idx - 1).addClass('content_current').siblings().removeClass('content_current')
            }
        })
    }
}