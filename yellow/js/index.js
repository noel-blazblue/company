$(function() {
    var $dd = $('.pro_category dd')
    taggleClass($dd)

    var $li = $('.nav ul li')
    taggleClass($li)

    var $a = $('.nextpage a').slice(1,-1)
    taggleClass($a,'current')

    var $tab_li = $('.recommend_list .tab_hd li')
    taggleClass($tab_li)
})