/**
 * 小程序配置文件
 */

// 此处主机域名修改成腾讯云解决方案分配的域名
var host = 'https://sprog.makepolo.net';

var config = {

    // 下面的地址配合云端 Demo 工作
    service: {
        host,

        // 产品详情接口
        productDetailUrl: `${host}/smallprogram/product_medium_page.php`,
        // 企业黄页
        productYellowUrl: `${host}/smallprogram/corp_info.php`,
        // 产品分类
        proSpaciesUrl: `${host}/smallprogram/product_category.php`,
        // 在线询盘
        xunPanUrl: `${host}/smallprogram/inquire_add.php`


    }
};

module.exports = config;