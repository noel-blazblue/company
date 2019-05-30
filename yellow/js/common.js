// 去除样式，添加样式
function taggleClass(ele,params) {
    if(!params){
        var params = 'active'
    }
    ele.on('click',function() {
        $(this).siblings().removeClass(params)
        $(this).addClass(params)
    })
}

