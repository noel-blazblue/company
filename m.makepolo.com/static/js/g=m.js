
/* jquery.scrollLoading.js */

/* 1  */ /*
/* 2  *|  * jquery.scrollLoading.js
/* 3  *|  * wengkeqi
/* 4  *|  * 2013-09-09
/* 5  *| */
/* 6  */ (function($) {
/* 7  */ 	$.fn.scrollLoading = function(options) {
/* 8  */ 		var defaults = {
/* 9  */ 			attr: "img-url",
/* 10 */ 			container: $(window),
/* 11 */ 			callback: $.noop
/* 12 */ 		};
/* 13 */ 		var params = $.extend({}, defaults, options || {});
/* 14 */ 		params.cache = [];
/* 15 */ 		$(this).each(function() {
/* 16 */ 			var node = this.nodeName.toLowerCase(), url = $(this).attr(params["attr"]);
/* 17 */ 			//重组
/* 18 */ 			var data = {
/* 19 */ 				obj: $(this),
/* 20 */ 				tag: node,
/* 21 */ 				url: url
/* 22 */ 			};
/* 23 */ 			params.cache.push(data);
/* 24 */ 		});
/* 25 */ 
/* 26 */ 		var callback = function(call) {
/* 27 */ 			if ($.isFunction(params.callback)) {
/* 28 */ 				params.callback.call(call.get(0));
/* 29 */ 			}
/* 30 */ 		};
/* 31 */ 		//动态显示数据
/* 32 */ 		var loading = function() {
/* 33 */ 
/* 34 */ 			var contHeight = params.container.height();
/* 35 */ 			if ($(window).get(0) === window) {
/* 36 */ 				contop = $(window).scrollTop();
/* 37 */ 			} else {
/* 38 */ 				contop = params.container.offset().top;
/* 39 */ 			}
/* 40 */ 
/* 41 */ 			$.each(params.cache, function(i, data) {
/* 42 */ 				var o = data.obj, tag = data.tag, url = data.url, post, posb;
/* 43 */ 
/* 44 */ 				if (o) {
/* 45 */ 					post = o.offset().top - contop, post + o.height();
/* 46 */ 
/* 47 */ 					if ((post >= 0 && post < contHeight) || (posb > 0 && posb <= contHeight)) {
/* 48 */ 						if (url) {
/* 49 */ 							//在浏览器窗口内
/* 50 */ 							if (tag === "img") {

/* jquery.scrollLoading.js */

/* 51 */ 								//图片，改变src
/* 52 */ 								callback(o.attr("src", url));
/* 53 */ 							} else {
/* 54 */ 								o.load(url, {}, function() {
/* 55 */ 									callback(o);
/* 56 */ 								});
/* 57 */ 							}
/* 58 */ 						} else {
/* 59 */ 							// 无地址，直接触发回调
/* 60 */ 							callback(o);
/* 61 */ 						}
/* 62 */ 						data.obj = null;
/* 63 */ 					}
/* 64 */ 				}
/* 65 */ 			});
/* 66 */ 		};
/* 67 */ 
/* 68 */ 		//事件触发
/* 69 */ 		//加载完毕即执行
/* 70 */ 		loading();
/* 71 */ 		//滚动执行
/* 72 */ 		params.container.bind("scroll", loading);
/* 73 */ 	};
/* 74 */ })(jQuery);
/* 75 */ 

;
/* ad_component.js */

/* 1  */ (function($){
/* 2  */ 	//�����˹�汻���κ����վ����
/* 3  */ 			$.fn.ad_component=function(options){
/* 4  */ 
/* 5  */ 				var self = $(this);
/* 6  */ 				/*
/* 7  *| 				var defaults = {
/* 8  *| 					ad_content:""//�Ǳ�������
/* 9  *| 				};
/* 10 *| 
/* 11 *| 				var options=$.extend(defaults,options);
/* 12 *| 				//console.log(options.ad_content);
/* 13 *| 				*/
/* 14 */ 				var ad_content_json=options;
/* 15 */ 				//var ad_content_json = eval("("+options.ad_content+")");
/* 16 */ 				$.each(ad_content_json, function(x, n){
/* 17 */ 					var id='#'+x;
/* 18 */ 					var ad_height = self.find(id).height();
/* 19 */ 					//console.log(ad_height);
/* 20 */ 					if(ad_height==0 && n!="")
/* 21 */ 					{
/* 22 */ 						$(id).empty();
/* 23 */ 						$(id).append(n);
/* 24 */ 					}
/* 25 */ 				})
/* 26 */ 
/* 27 */ 
/* 28 */ 			}
/* 29 */ 
/* 30 */ 
/* 31 */ })(jQuery);
/* 32 */ 

;
/* log_makepolo.js */

/* 1    */ /*jslint newcap:false*/
/* 2    */ /*global
/* 3    *| g_st_time:false,
/* 4    *| window:false,
/* 5    *| ActiveXObject:false,
/* 6    *| g_ouinfo:false,
/* 7    *| $j:false,
/* 8    *| g_st_time:false,
/* 9    *| K:false*/
/* 10   */ 
/* 11   */ /**
/* 12   *|  * 统计客户端Javascript文件 log_t_mp_source.js
/* 13   *|  *
/* 14   *|  * @date   2012-05-21
/* 15   *|  * @version $Revision: 1.0.0.0 $
/* 16   *|  * 采集到的信息将通过url后面的参数传递给服务器,参数说明如下:
/* 17   *|  * 'br' browser 浏览器类别及版本,如ie8.0
/* 18   *|  * 'ck' cookie 是否支持cookie 1支持 0不支持
/* 19   *|  * 'cl' color 颜色深度,如24
/* 20   *|  * 'fl' flash flash版本,如10.0
/* 21   *|  * 'ja' java 是否支持java 1 支持 0不支持
/* 22   *|  * 'ln' language 语言支持,如zh-cn
/* 23   *|  * 'rnd' random 随机数,防止缓存
/* 24   *|  * 'sc' screen 屏幕分别率 ,如1280x800
/* 25   *|  * 'su' source 来源,上上一个网页地址
/* 26   *|  * 'uid' 用户账号ID,从cookie中取出
/* 27   *|  * 'vid' 访问ID,标示一台机器上同一类浏览器,使用UUID,存入cookie
/* 28   *|  * 'ou_type' 受访页面属主类型0其他1普通用户2明星3机构
/* 29   *|  * 'ou' 受访页面
/* 30   *|  * 'ti' time 页面加载时间,单位毫秒
/* 31   *|  *	''
/* 32   *|  */
/* 33   */ if ( typeof g_st_time == 'undefined' || g_st_time == '' )
/* 34   */ {
/* 35   */ 	var g_st_time = new Date( ).getTime( );
/* 36   */ }
/* 37   */ if ( typeof g_error_404 == 'undefined' || g_error_404 == '' )
/* 38   */ {
/* 39   */ 	g_error_404 = 200;
/* 40   */ }
/* 41   */ 
/* 42   */ ( function( ) {
/* 43   */ 
/* 44   */ 	if (typeof(static_arr) != 'undefined')
/* 45   */ 	{
/* 46   */ 		//页面加载后google  统计
/* 47   */ 		google_static();
/* 48   */ 		//百度统计
/* 49   */ 		baidu_static();
/* 50   */ 	}

/* log_makepolo.js */

/* 51   */     var config = {
/* 52   */ 
/* 53   */         cookie_uid_name: 'uid',
/* 54   */         //易变参数
/* 55   */         cookie_tuid_name: '_tuid',
/* 56   */ 
/* 57   */         cookie_main_domain: '.makepolo.com',
/* 58   */         //易变参数
/* 59   */ 
/* 60   */         rcv: "china.makepolo.com/log/r.gif", //记录
/* 61   */ 
/* 62   */         rcv_error: "jic.makepolo.cn/log/e.gif",//错误信息
/* 63   */ 
/* 64   */         rcv_monitor: "jic.makepolo.cn/log/m.gif",//监控信息
/* 65   */ 
/* 66   */         log_load_sign: "makepolo_log_loaded",
/* 67   */ 
/* 68   */         cookie_vid_name: "_vid",
/* 69   */ 
/* 70   */         cookie_vid_expires: 100 * 365 * 24 * 3600000,
/* 71   */         //vid过期时间，单位毫秒,100年
/* 72   */         _n: ( new Date( ) ).getTime( ),
/* 73   */ 
/* 74   */         isSent: 0,
/* 75   */ 
/* 76   */         onloadready: 0,
/* 77   */ 
/* 78   */         domready: 0,
/* 79   */ 
/* 80   */         timer: 0,
/* 81   */ 
/* 82   */         scroll_height: 0,
/* 83   */ 
/* 84   */         maxInt: 2147483647,
/* 85   */ 
/* 86   */         _t: [
/* 87   */             'br',
/* 88   */             'ck',
/* 89   */             'cl',
/* 90   */             'fl',
/* 91   */             'ja',
/* 92   */             'ln',
/* 93   */             'rnd',
/* 94   */             'sc',
/* 95   */             'su',
/* 96   */             'uid',
/* 97   */             'vid',
/* 98   */             'ou_type',
/* 99   */             'ou',
/* 100  */             'ti' ,

/* log_makepolo.js */

/* 101  */             'e404']
/* 102  */     },
/* 103  */     g_log_home_news = [ ],
/* 104  */     g_log_home_right = [ ],
/* 105  */     g_log_home_top = [ ];
/* 106  */ 
/* 107  */     /**
/* 108  *|      * 临时变量集散地
/* 109  *|      */
/* 110  */     var D = document;
/* 111  */     var L = D.location;
/* 112  */     var R = D.referrer;
/* 113  */     var W = window;
/* 114  */     var E = encodeURIComponent;
/* 115  */ 
/* 116  */     /**
/* 117  *|      * 绑定事件函数
/* 118  *|      */
/* 119  */ 
/* 120  */     function on( obj, type, fn ) {
/* 121  */         type = type.replace( /^on/i, '' ).toLowerCase( );
/* 122  */         if ( obj.attachEvent ) {
/* 123  */             obj.attachEvent( 'on' + type, function( evt ) {
/* 124  */                 fn.call( obj, evt );
/* 125  */             } );
/* 126  */         }
/* 127  */         else if ( obj.addEventListener ) {
/* 128  */             obj.addEventListener( type, fn, false );
/* 129  */         }
/* 130  */     }
/* 131  */ 
/* 132  */     function UUID( ) {
/* 133  */         this.id = this.createUUID( );
/* 134  */     }
/* 135  */     UUID.prototype.valueOf = function( ) {
/* 136  */         return this.id;
/* 137  */     };
/* 138  */     UUID.prototype.toString = function( ) {
/* 139  */         return this.id;
/* 140  */     };
/* 141  */     UUID.prototype.createUUID = function( ) {
/* 142  */         var dg = new Date( 1582, 10, 15, 0, 0, 0, 0 );
/* 143  */         var dc = new Date( );
/* 144  */         var t = dc.getTime( ) - dg.getTime( );
/* 145  */         var tl = UUID.getIntegerBits( t, 0, 31 );
/* 146  */         var tm = UUID.getIntegerBits( t, 32, 47 );
/* 147  */         var thv = UUID.getIntegerBits( t, 48, 59 ) + '1';
/* 148  */         var csar = UUID.getIntegerBits( UUID.rand( 4095 ), 0, 7 );
/* 149  */         var csl = UUID.getIntegerBits( UUID.rand( 4095 ), 0, 7 );
/* 150  */ 

/* log_makepolo.js */

/* 151  */         var n =
/* 152  */             UUID.getIntegerBits( UUID.rand( 8191 ), 0, 7 ) +
/* 153  */             UUID.getIntegerBits( UUID.rand( 8191 ), 8, 15 ) +
/* 154  */             UUID.getIntegerBits( UUID.rand( 8191 ), 0, 7 ) +
/* 155  */             UUID.getIntegerBits( UUID.rand( 8191 ), 8, 15 ) +
/* 156  */             UUID.getIntegerBits( UUID.rand( 8191 ), 0, 15 );
/* 157  */ 
/* 158  */         return tl + tm + thv + csar + csl + n;
/* 159  */     };
/* 160  */     UUID.getIntegerBits = function( val, start, end ) {
/* 161  */         var base16 = UUID.returnBase( val, 16 );
/* 162  */         var quadArray = [];
/* 163  */         var quadString = '';
/* 164  */         var i = 0;
/* 165  */         for ( i = 0; i < base16.length; i++ ) {
/* 166  */             quadArray.push( base16.substring( i, i + 1 ) );
/* 167  */         }
/* 168  */         for ( i = Math.floor( start / 4 ); i <= Math.floor( end / 4 ); i++ ) {
/* 169  */             if ( !quadArray[ i ] || quadArray[ i ] == '' ) {
/* 170  */                 quadString += '0';
/* 171  */             }
/* 172  */             else {
/* 173  */                 quadString += quadArray[ i ];
/* 174  */             }
/* 175  */         }
/* 176  */         return quadString;
/* 177  */     };
/* 178  */     UUID.returnBase = function( number, base ) {
/* 179  */         return ( number ).toString( base ).toUpperCase( );
/* 180  */     };
/* 181  */     UUID.rand = function( max ) {
/* 182  */         return Math.floor( Math.random( ) * ( max + 1 ) );
/* 183  */     };
/* 184  */ 
/* 185  */     /**
/* 186  *|      * 基础跟踪类
/* 187  *|      *
/* 188  *|      * @param tags
/* 189  *|      *            需要向后台提交的参数
/* 190  *|      * @return
/* 191  *|      */
/* 192  */ 
/* 193  */     function Tracker( ) {
/* 194  */         this.clicks = [ ];
/* 195  */         this.news = [ ];
/* 196  */         this.tags = {};
/* 197  */         this.getTracker( );
/* 198  */     }
/* 199  */ 
/* 200  */     Tracker.prototype = {

/* log_makepolo.js */

/* 201  */ 
/* 202  */         /**
/* 203  *|          * 设置Cookie
/* 204  *|          *
/* 205  *|          * @param {string}
/* 206  *|          *            key cookie的名称
/* 207  *|          * @param {string}
/* 208  *|          *            value cookie的值
/* 209  *|          * @param {string}
/* 210  *|          *            d domain的简写，设置cookie网站域
/* 211  *|          * @param {string}
/* 212  *|          *            p path的简写，设置cookie路径
/* 213  *|          * @param {String}
/* 214  *|          *            t cookie过期时间,单位毫秒
/* 215  *|          */
/* 216  */         setCookie: function( key, value, d, p, t ) {
/* 217  */             var exdate = new Date( );
/* 218  */             exdate.setTime( exdate.getTime( ) + t );
/* 219  */             D.cookie =
/* 220  */                 key + "=" + value + (
/* 221  */                     ( !t ) ? "" :
/* 222  */                         "; expires=" +
/* 223  */                         exdate.toGMTString( ) ) +
/* 224  */                         "; domain=" + d + ( p ? "; path=" + p : "" );
/* 225  */ 
/* 226  */         },
/* 227  */ 
/* 228  */ 
/* 229  */         /**
/* 230  *|          * 读取当前域网站Cookie
/* 231  *|          *
/* 232  *|          * @param {string}
/* 233  *|          *            key cookie的名称
/* 234  *|          */
/* 235  */         getCookie: function( key ) {
/* 236  */             var reg = new RegExp( "(^| )" + key + "=([^;]*)(;|$)" );
/* 237  */             var result = reg.exec( D.cookie );
/* 238  */             if ( result ) {
/* 239  */                 return result[ 2 ] || '';
/* 240  */             }
/* 241  */             return '';
/* 242  */         },
/* 243  */ 
/* 244  */ 				getSupField: function(name) {
/* 245  */     				var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
/* 246  */     				var sup = decodeURIComponent(this.getCookie('sup'));
/* 247  */ 
/* 248  */    					var r = sup.match(reg);
/* 249  */ 						if (r != null)
/* 250  */ 							return unescape(r[2]);

/* log_makepolo.js */

/* 251  */ 						return null;
/* 252  */     		},
/* 253  */         /**
/* 254  *|          * 判断是否是IE
/* 255  *|          */
/* 256  */         ie: function( ) {
/* 257  */             var i = /msie (\d+\.\d)/i.test( navigator.userAgent );
/* 258  */             return i;
/* 259  */         },
/* 260  */ 
/* 261  */         /**
/* 262  *|          * 获取屏幕分辨率
/* 263  *|          *
/* 264  *|          * @return
/* 265  *|          */
/* 266  */         getSc: function( ) {
/* 267  */             this.tags.sc = ( W.screen.width + "x" + W.screen.height );
/* 268  */         },
/* 269  */         /**
/* 270  *|          * 屏幕颜色
/* 271  *|          *
/* 272  *|          * @return
/* 273  *|          */
/* 274  */         getCl: function( ) {
/* 275  */             this.tags.cl = ( W.screen ? W.screen.colorDepth + "-bit" : "" );
/* 276  */         },
/* 277  */ 
/* 278  */         /**
/* 279  *|          * 是否支持cookie
/* 280  *|          *
/* 281  *|          * @return
/* 282  *|          */
/* 283  */         getCk: function( ) {
/* 284  */             this.tags.ck = ( navigator.cookieEnabled ? "1" : "0" );
/* 285  */         },
/* 286  */ 
/* 287  */         /**
/* 288  *|          * 获得Flash版本号
/* 289  *|          *
/* 290  *|          * @return
/* 291  *|          */
/* 292  */         getFl: function( ) {
/* 293  */             if ( navigator.plugins && navigator.mimeTypes.length ) {
/* 294  */                 var a = navigator.plugins[ "Shockwave Flash" ];
/* 295  */                 if ( a && a.description ) {
/* 296  */                     this.tags.fl =
/* 297  */                         parseInt(
/* 298  */                             a.description.replace( /([a-zA-Z]|\s)+/, "" ).replace( /(\s)+r/, "." ),
/* 299  */                             10
/* 300  */                         ) + ".0";

/* log_makepolo.js */

/* 301  */                 }
/* 302  */             }
/* 303  */             else if ( W.ActiveXObject ) {
/* 304  */                 var f = 0;
/* 305  */                 for ( var i = 10; i >= 2; i-- ) {
/* 306  */                     try {
/* 307  */                         var c = new ActiveXObject( 'ShockwaveFlash.ShockwaveFlash.' + i );
/* 308  */                         if ( c ) {
/* 309  */                             f = i + '.0';
/* 310  */                             break;
/* 311  */                         }
/* 312  */                     }
/* 313  */                     catch ( e ) {}
/* 314  */                 }
/* 315  */                 this.tags.fl = parseInt( f, 10 ) + ".0";
/* 316  */             }
/* 317  */         },
/* 318  */ 
/* 319  */         /**
/* 320  *|          * 是否支持Java
/* 321  *|          *
/* 322  *|          * @return
/* 323  *|          */
/* 324  */         getJa: function( ) {
/* 325  */             this.tags.ja = ( navigator.javaEnabled( ) ? "1" : "0" );
/* 326  */         },
/* 327  */ 
/* 328  */         /**
/* 329  *|          * 系统语言
/* 330  *|          *
/* 331  *|          * @return
/* 332  *|          */
/* 333  */         getLn: function( ) {
/* 334  */             var _l;
/* 335  */             var nav = navigator;
/* 336  */             if ( nav.systemLanguage ) {
/* 337  */                 _l = nav.systemLanguage;
/* 338  */             }
/* 339  */             else if ( nav.browserLanguage ) {
/* 340  */                 _l = nav.browserLanguage;
/* 341  */             }
/* 342  */             else if ( nav.language ) {
/* 343  */                 _l = nav.language;
/* 344  */             }
/* 345  */             else if ( nav.userLanguage ) {
/* 346  */                 _l = nav.userLanguage;
/* 347  */             }
/* 348  */             else {
/* 349  */                 _l = '-';
/* 350  */             }

/* log_makepolo.js */

/* 351  */             this.tags.ln = _l.toLowerCase( );
/* 352  */         },
/* 353  */ 
/* 354  */         /**
/* 355  *|          * 返回url来源referer
/* 356  *|          *
/* 357  *|          * @return {String} su soure_url 简写
/* 358  *|          */
/* 359  */         getSu: function( ) {
/* 360  */             var s = R;
/* 361  */             this.tags.su = s;
/* 362  */         },
/* 363  */ 
/* 364  */         getBr: function( ) {
/* 365  */             var ua = decodeURIComponent( navigator.userAgent.toLowerCase( ) );
/* 366  */             /*
/* 367  *|             var s;
/* 368  *|             var browser = ( s = ua.match( /msie ([\d.]+)/ ) ) ?
/* 369  *|                                 browser = "ie" + s[ 1 ] :
/* 370  *|                                 ( s = ua.match( /firefox\/([\d.]+)/ ) ) ?
/* 371  *|                                     browser = "firefox" + s[ 1 ] :
/* 372  *|                                     ( s = ua.match( /chrome\/([\d.]+)/ ) ) ?
/* 373  *|                                         browser = "chrome" + s[ 1 ] :
/* 374  *|                                         ( s = ua.match( /opera.([\d.]+)/ ) ) ?
/* 375  *|                                             browser = "opera" + s[ 1 ] :
/* 376  *|                                             ( s = ua.match( /version\/([\d.]+).*safari/ ) ) ?
/* 377  *|                                                 browser = "safari" + s[ 1 ] :
/* 378  *|                                                 ( s = ua.match( /maxthon\/([\d.]+)/ ) ) ?
/* 379  *|                                                     browser = "maxthon" + s[ 1 ] :
/* 380  *|                                                     ( s = ua.match( /gecko/ ) ) ?
/* 381  *|                                                         browser = "gecko" :
/* 382  *|                                                         '';
/* 383  *| 
/* 384  *|             if ( browser ) {
/* 385  *|                 var arr = browser.split( "." );
/* 386  *|                 this.tags.br = arr[ 0 ];
/* 387  *|             }
/* 388  *|             else {
/* 389  *|                 this.tags.br = ua;
/* 390  *|             }
/* 391  *|            */
/* 392  */            this.tags.br = ua;
/* 393  */         },
/* 394  */ 
/* 395  */         /**
/* 396  *|          * 返回uid
/* 397  *|          *
/* 398  *|          * @return
/* 399  *|          */
/* 400  */         getUid: function( ) {

/* log_makepolo.js */

/* 401  */             /*var domain = window.location.hostname;
/* 402  *|             if ( domain ) {
/* 403  *|                 var uid = this.getCookie( this.cookie_uid_name );
/* 404  *| 
/* 405  *| 
/* 406  *|                 this.tags.uid = uid;
/* 407  *|             }
/* 408  *|             */
/* 409  */            this.tags.uid = this.getSupField('uid');
/* 410  */         },
/* 411  */ 
/* 412  */         /**
/* 413  *|          * vid是永久保存在主域cookie中的UUID,标示一个浏览器访客
/* 414  *|          * 如果cookie没有设置则为新访客。 本次访问是一个新访问的开始时，更新该cookie为当前时间。
/* 415  *|          *
/* 416  *|          * @return
/* 417  *|          */
/* 418  */         getVid: function( ) {
/* 419  */             var vid = this.getCookie( this.cookie_vid_name );
/* 420  */             if ( vid == '' ) {
/* 421  */                 vid = new UUID( ).id;
/* 422  */                 var domain = window.location.hostname;
/* 423  */                 if ( domain ) {
/* 424  */                       domain = this.cookie_main_domain;
/* 425  */                     }
/* 426  */                     this.setCookie( this.cookie_vid_name,
/* 427  */                                     vid, domain,
/* 428  */                                     "/",
/* 429  */                                     this.cookie_vid_expires );
/* 430  */                 }
/* 431  */ 
/* 432  */ 
/* 433  */             this.tags.vid = vid;
/* 434  */         },
/* 435  */ 
/* 436  */         /**
/* 437  *|          * 生成随机数
/* 438  *|          *
/* 439  *|          * @return
/* 440  *|          */
/* 441  */         getRnd: function( ) {
/* 442  */             var s = Math.round( Math.random( ) * config.maxInt );
/* 443  */             this.tags.rnd = s;
/* 444  */         },
/* 445  */ 
/* 446  */ 
/* 447  */         /**
/* 448  *|          * 页面拥有者信息
/* 449  *|          *
/* 450  *|          * @return

/* log_makepolo.js *|

/* 451  *|          */
/* 452  */         getOuinfo: function( ) {
/* 453  */             try {
/* 454  */                 if ( typeof g_ouinfo != 'undefined' && g_ouinfo != '' ) {
/* 455  */                     var ouinfo = $j.parseJSON( g_ouinfo );
/* 456  */                     for ( var i in ouinfo ) {
/* 457  */                         if( ouinfo.hasOwnProperty( i ) ) {
/* 458  */                             this.tags[ i ] = ouinfo[ i ];
/* 459  */                         }
/* 460  */                     }
/* 461  */                 }
/* 462  */             }
/* 463  */             catch ( e ) {
/* 464  */ 
/* 465  */             }
/* 466  */         },
/* 467  */ 
/* 468  */         /**
/* 469  *|          * 页面加载时间,单位ms
/* 470  *|          *
/* 471  *|          * @return
/* 472  *|          */
/* 473  */         getTi: function( ) {
/* 474  */             try {
/* 475  */                 if ( typeof g_st_time != 'undefined' && g_st_time != '' ) {
/* 476  */                     var endtime = new Date( ).getTime( );
/* 477  */                     var load_time = endtime - g_st_time;
/* 478  */                     if ( load_time < 300000 ) {
/* 479  */                         this.tags.ti = load_time;
/* 480  */                     }
/* 481  */                 }
/* 482  */             }
/* 483  */             catch ( e ) {
/* 484  */ 
/* 485  */             }
/* 486  */         },
/* 487  */ 
/* 488  */         getCUrl: function( ){
/* 489  */ 
/* 490  */             this.tags.ou = E(L);
/* 491  */         },
/* 492  */ 				get404: function( ){
/* 493  */ 
/* 494  */             this.tags.e404 = g_error_404;
/* 495  */         },
/* 496  */ 
/* 497  */         /**
/* 498  *|          * 序列化参数对象
/* 499  *|          *
/* 500  *|          * @param a

/* log_makepolo.js *|

/* 501  *|          *            参数对象
/* 502  *|          * @return
/* 503  *|          */
/* 504  */         serialize: function( a ) {
/* 505  */             var s = [ ];
/* 506  */             var T = config._t;
/* 507  */             for ( var i = 0, n = T.length; i < n; i++ ) {
/* 508  */                 var j = T[ i ],
/* 509  */                     v;
/* 510  */                 v = a[ j ] ? j + '=' + E( a[ j ] ) : j + '=';
/* 511  */                 s.push( v );
/* 512  */             }
/* 513  */             return s.join( "&" );
/* 514  */         },
/* 515  */ 
/* 516  */         /**
/* 517  *|          * 给参数对象赋值
/* 518  *|          *
/* 519  *|          * @return
/* 520  *|          */
/* 521  */         getParameter: function( ) {
/* 522  */ 
/* 523  */             this.getVid( ); //访问id
/* 524  */             this.getUid( ); //用户id
/* 525  */             this.getBr( ); //浏览器类型及版本
/* 526  */             this.getSu( ); //来源
/* 527  */             this.getLn( ); //语言
/* 528  */             this.getJa( ); //java支持
/* 529  */             this.getFl( ); //flash支持
/* 530  */             this.getCk( ); //cookie支持
/* 531  */             this.getCl( ); //颜色
/* 532  */             this.getSc( ); //屏幕分辨率
/* 533  */             this.getRnd( ); //随机数
/* 534  */             this.getOuinfo( ); //页面拥有者信息
/* 535  */             this.getTi( ); //页面加载时间
/* 536  */             this.getCUrl();//当前页面的url
/* 537  */             this.get404();//当前页面结果是否是404
/* 538  */         },
/* 539  */ 
/* 540  */         /**
/* 541  *|          * 获得当期网址协议
/* 542  *|          *
/* 543  *|          * @return
/* 544  *|          */
/* 545  */         protocol: function( ) {
/* 546  */             return ( L.protocol == "https:" ? "https://" : "http://" );
/* 547  */         },
/* 548  */ 
/* 549  */ 
/* 550  */         /**

/* log_makepolo.js *|

/* 551  *|          * 发送数据
/* 552  *|          */
/* 553  */         postData: function( ) {
/* 554  */             this.getParameter( );
/* 555  */             var i = new Image( 1, 1 );
/* 556  */             i.onload = function( ) {
/* 557  */                 config.isSent = 1;
/* 558  */             };
/* 559  */             i.src = this.protocol( ) + this.rcv + "?" + this.serialize( this.tags );
/* 560  */         },
/* 561  */ 
/* 562  */ 
/* 563  */         /**
/* 564  *|          * 发送监控数据
/* 565  *|          */
/* 566  */         postMonitorHandler: function( monitorURL ) {
/* 567  */             var me = this;
/* 568  */             return function( e ) {
/* 569  */                 var img = new Image( 1, 1 ),
/* 570  */                     /*性能数据始终会发送*/
/* 571  */                     data = '';
/* 572  */ 
/* 573  */                 img.onload = function( ) {
/* 574  */                     config.isSent = 1;
/* 575  */                 };
/* 576  */                 //首页数据
/* 577  */                 if( window.document.URL == monitorURL ) {
/* 578  */                     var now = Number( new Date( ) ),
/* 579  */                         domready;
/* 580  */ 
/* 581  */                     try {
/* 582  */                         domready = K.Performance.timing.domContentLoadedEventStart - g_st_time;
/* 583  */                     }
/* 584  */                     catch ( ex ) {
/* 585  */                         domready = me.domready - g_st_time;
/* 586  */                     }
/* 587  */ 
/* 588  */                     //！！！！注意：由于后端Parse数据时，严格按照参数的先后顺序的，因此确保这些数据在URL中的位置不变化
/* 589  */                     data = 'height=' + window.document.body.scrollHeight +
/* 590  */                             '&scroll=' + me.scroll_height +
/* 591  */                             '&domready=' + domready +
/* 592  */                             '&onloadready=' + ( me.onloadready - g_st_time ) +
/* 593  */                             '&staytime=' + ( now - g_st_time ) +
/* 594  */                             '&click=' + me.clicks.join( ',' ) +
/* 595  */                             '&screen=' + me.tags.sc +
/* 596  */                             '&uid=' + me.tags.uid +
/* 597  */                             '&news=' + g_log_home_news.join( ',' ) +
/* 598  */                             '&right=' + g_log_home_right.join( ',' ) +
/* 599  */                             '&rnd=' + me.tags.rnd;
/* 600  */                 }

/* log_makepolo.js */

/* 601  */ 
/* 602  */                 //性能数据
/* 603  */                 if( data !== '' ) {
/* 604  */                     data += '&';
/* 605  */                 }
/* 606  */ /*
/* 607  *|                 data += K.Perf.getMarks();
/* 608  *| 
/* 609  *|                 if ( g_log_home_top.length > 0 ) {
/* 610  *|                     data += '&top=' + g_log_home_top.join( ',' ) + '&rnd=' + me.tags.rnd;
/* 611  *|                 }
/* 612  *| */
/* 613  */                 img.src = me.protocol( ) + me.rcv_monitor + '?' + data;
/* 614  */             };
/* 615  */         },
/* 616  */         /**
/* 617  *|          * 监控鼠标滚动，统计屏幕下滑最大深度
/* 618  *|          */
/* 619  */         monitorScroll: function( ) {
/* 620  */             var me = this;
/* 621  */             return function( evt ) {
/* 622  */                 var yScroll;
/* 623  */                 if ( evt && evt.pageYOffset ) {
/* 624  */                     yScroll = evt.pageYOffset;
/* 625  */                 }
/* 626  */                 // Explorer 6 Strict
/* 627  */                 else if ( document.documentElement
/* 628  */                         && document.documentElement.scrollTop ) {
/* 629  */                     yScroll = document.documentElement.scrollTop;
/* 630  */                 }
/* 631  */                 else if ( document.body ) { // all other Explorers
/* 632  */                     yScroll = document.body.scrollTop;
/* 633  */                 }
/* 634  */ 
/* 635  */                 if ( yScroll > me.scroll_height ) {
/* 636  */                     me.scroll_height = yScroll;
/* 637  */ 
/* 638  */                 }
/* 639  */             };
/* 640  */         },
/* 641  */ 
/* 642  */         /**
/* 643  *|          * 记录dom加载完成的时间
/* 644  *|          */
/* 645  */         recordDomReady: function( isIe ) {
/* 646  */             var me = this;
/* 647  */             return function( isIE ) {
/* 648  */                 if ( isIe ) {
/* 649  */                     try {
/* 650  */                         document.body.doScroll( 'left' );

/* log_makepolo.js */

/* 651  */                         me.domready = Number( new Date( ) );
/* 652  */                         clearInterval( me.timer );
/* 653  */                     }
/* 654  */                     catch ( ex ) {}
/* 655  */                 }
/* 656  */                 else {
/* 657  */                     me.domready = Number( new Date( ) );
/* 658  */                 }
/* 659  */ 
/* 660  */             };
/* 661  */         },
/* 662  */ 
/* 663  */ 
/* 664  */         /**
/* 665  *|          * 记录onload完成的时间
/* 666  *|          */
/* 667  */         recordOnloadReady: function( ) {
/* 668  */             var me = this;
/* 669  */             return function( ) {
/* 670  */                 me.onloadready = Number( new Date( ) );
/* 671  */                 //记录onload时间
/* 672  */                 //K.Perf.markTime( 'wpo_onload' );
/* 673  */             };
/* 674  */         },
/* 675  */ 
/* 676  */ 
/* 677  */ 
/* 678  */         /**
/* 679  *|          * 跟踪点击
/* 680  *|          */
/* 681  */         trackClick: function( ) {
/* 682  */             var me = this;
/* 683  */             return function( e ) {
/* 684  */                 e = e || W.event;
/* 685  */                 var targetX, targetY;
/* 686  */                 if ( me.ie( ) ) {
/* 687  */                     var scrollTop = Math.max( D.documentElement.scrollTop, D.body.scrollTop );
/* 688  */                     var scrollLeft = Math.max( D.documentElement.scrollLeft, D.body.scrollLeft );
/* 689  */                     targetX = e.clientX + scrollLeft;
/* 690  */                     targetY = e.clientY + scrollTop;
/* 691  */                 }
/* 692  */                 else {
/* 693  */                     targetX = e.pageX;
/* 694  */                     targetY = e.pageY;
/* 695  */                 }
/* 696  */ 
/* 697  */                 var click = targetX + '|' + targetY;
/* 698  */                 me.clicks.push( click );
/* 699  */             };
/* 700  */         },

/* log_makepolo.js */

/* 701  */ 
/* 702  */         /**
/* 703  *|          * 初始化统计站点ID
/* 704  *|          *
/* 705  *|          * @param
/* 706  *|          */
/* 707  */         getTracker: function( ) {
/* 708  */             for ( var i in config ) {
/* 709  */                 if ( i.indexOf( "_" ) !== 0 ) {
/* 710  */                     this[ i ] = config[ i ];
/* 711  */                 }
/* 712  */             }
/* 713  */ 
/* 714  */             if ( typeof window[ this.log_load_sign ] == 'undefined' ) {
/* 715  */                 window[ this.log_load_sign ] = true;
/* 716  */                 try {
/* 717  */                     this.postData( );
/* 718  */                 }
/* 719  */                 catch ( e1 ) {
/* 720  */                     var a = [ ];
/* 721  */                     a.push( "hostname=" + L.hostname );
/* 722  */                     a.push( "message=" + E( e1.message ) );
/* 723  */                     a.push( "name=" + E( e1.name ) );
/* 724  */                     i = new Image( 1, 1 );
/* 725  */                     i.src = this.protocol( ) + this.rcv_error + "?" + a.join( "&" );
/* 726  */                 }
/* 727  */             }
/* 728  */ 
/* 729  */             var uid = this.tags.uid;
/* 730  */ 
/* 731  */             //抽样1%监控首页最大滑动高度和首页加载时间及点击
/* 732  */             var monitorURL = "http://china.makepolo.com/";
/* 733  */             //var enableMonitor = 1;
/* 734  */ 						var enableMonitor = 0;
/* 735  */             if ( enableMonitor ) {
/* 736  */                 //记录onload时间
/* 737  */                 on( W, 'load', this.recordOnloadReady( ) );
/* 738  */                 //unload时发送日志
/* 739  */                 on( W, 'unload', this.postMonitorHandler( monitorURL ) );
/* 740  */                 //记录日志
/* 741  */                 try {
/* 742  */                     $j( "#head .h1 a" ).click( function( ) {
/* 743  */                         g_log_home_top.push( "top_img_home" );
/* 744  */                     } );
/* 745  */                     $j( "#index_dropdown li.t_title" ).eq( 0 ).click( function( ) {
/* 746  */                         g_log_home_top.push( "top_home" );
/* 747  */                     } );
/* 748  */                     $j( "#index_dropdown li.t_title" ).eq( 1 ).click( function( ) {
/* 749  */                         g_log_home_top.push( "top_friend" );
/* 750  */                     } );

/* log_makepolo.js */

/* 751  */                     $j( "#index_dropdown li.t_title" ).eq( 2 ).click( function( ) {
/* 752  */                         g_log_home_top.push( "top_app" );
/* 753  */                     } );
/* 754  */                     $j( "#index_dropdown li.t_title" ).eq( 3 ).click( function( ) {
/* 755  */                         g_log_home_top.push( "top_msg" );
/* 756  */                     } );
/* 757  */                     $j( "#head1_mkt1" ).click( function( ) {
/* 758  */                         g_log_home_top.push( "top_service" );
/* 759  */                     } );
/* 760  */                     $j( "#head1_mkt1 .i_serv5" ).click( function( ) {
/* 761  */                         g_log_home_top.push( "top_service_haibei" );
/* 762  */                     } );
/* 763  */                     $j( "#head1_mkt1 .i_serv2" ).click( function( ) {
/* 764  */                         g_log_home_top.push( "top_service_teambuy" );
/* 765  */                     } );
/* 766  */                     $j( "#head1_mkt1 .i_serv4" ).click( function( ) {
/* 767  */                         g_log_home_top.push( "top_service_lite" );
/* 768  */                     } );
/* 769  */                     $j( "#head2_mkt1" ).click( function( ) {
/* 770  */                         g_log_home_top.push( "top_zhaoren" );
/* 771  */                     } );
/* 772  */                     $j( "#id_common_account" ).click( function( ) {
/* 773  */                         g_log_home_top.push( "top_account" );
/* 774  */                     } );
/* 775  */                     $j( "#head a[href='/login/logout.php']" ).click( function( ) {
/* 776  */                         g_log_home_top.push( "top_logout" );
/* 777  */                     } );
/* 778  */                     $j( "#appMenu .app_photo" ).click( function( ) {
/* 779  */                         g_log_home_top.push( "left_photo" );
/* 780  */                     } );
/* 781  */                     $j( "#appMenu .app_diary" ).click( function( ) {
/* 782  */                         g_log_home_top.push( "left_diary" );
/* 783  */                     } );
/* 784  */                     $j( "#appMenu .app_records" ).click( function( ) {
/* 785  */                         g_log_home_top.push( "left_records" );
/* 786  */                     } );
/* 787  */                     $j( "#appMenu .app_repaste" ).click( function( ) {
/* 788  */                         g_log_home_top.push( "left_repaste" );
/* 789  */                     } );
/* 790  */                     $j( "#appMenu .app_gift" ).click( function( ) {
/* 791  */                         g_log_home_top.push( "left_gift" );
/* 792  */                     } );
/* 793  */                     $j( "#appMenu .app_teambuy" ).click( function( ) {
/* 794  */                         g_log_home_top.push( "left_teambuy" );
/* 795  */                     } );
/* 796  */                 }
/* 797  */                 catch ( e2 ) {
/* 798  */ 
/* 799  */                 }
/* 800  */ 

/* log_makepolo.js */

/* 801  */                 //首页需要记录的日志
/* 802  */                 if( window.document.URL == monitorURL ) {
/* 803  */                     //Domready时间，今后需要去掉，统一使用K.Perf.markTime解决
/* 804  */                     if ( this.ie( ) ) {
/* 805  */                         this.timer = setInterval( this.recordDomReady( true ), 50 );
/* 806  */                     }
/* 807  */                     else {
/* 808  */                         window.addEventListener(
/* 809  */                             'DOMContentLoaded',
/* 810  */                             this.recordDomReady( false ),
/* 811  */                             false );
/* 812  */                     }
/* 813  */ 
/* 814  */                     on( W, 'scroll', this.monitorScroll( ) );
/* 815  */                     on( D, "mouseup", this.trackClick( ) );
/* 816  */ 
/* 817  */                     try {
/* 818  */                         // 动态点击
/* 819  */                         $j( "#divnews .gw1 a" ).click( function( ) {
/* 820  */                             var news =
/* 821  */                                 $j( this )
/* 822  */                                 .parents( "div.gw1" )
/* 823  */                                 .find( ">div.gw14" )
/* 824  */                                 .attr( 'class' )
/* 825  */                                 .split( " " )[ 2 ]
/* 826  */                                 .split( "_" )[ 1 ];
/* 827  */ 
/* 828  */                             g_log_home_news.push( news );
/* 829  */                         } );
/* 830  */                         // 动态主folder点击
/* 831  */                         $j( "#Feed_Navigation li[id], " +
/* 832  */                             "#newsdivhead li[id], " +
/* 833  */                             "#newsdivhead2 li[id], " +
/* 834  */                             "#recordsnewsdivhead li[id]" ).click( function( ) {
/* 835  */ 
/* 836  */                             g_log_home_news.push( $j( this ).attr( 'id' ) );
/* 837  */                         } );
/* 838  */                         // 动态子folder点击
/* 839  */                         $j( "#Feed_Navigation #newsMoreList a[data-jsaction]" ).click( function( ) {
/* 840  */                             g_log_home_news.push( 'tab2_' + $j( this ).attr( 'data-jsaction' ) );
/* 841  */                         } );
/* 842  */ 
/* 843  */                         $j( "#eleSlideBox_visit a" ).click( function( ) {
/* 844  */                             g_log_home_right.push( "right_visit" );
/* 845  */                         } );
/* 846  */                         $j( "#eleSlidePrev_visit" ).click( function( ) {
/* 847  */                             g_log_home_right.push( "right_visit_prev" );
/* 848  */                         } );
/* 849  */                         $j( "#eleSlideNext_visit" ).click( function( ) {
/* 850  */                             g_log_home_right.push( "right_visit_next" );

/* log_makepolo.js */

/* 851  */                         } );
/* 852  */ 
/* 853  */                         $j( "#homeflist a" ).click( function( ) {
/* 854  */                             g_log_home_right.push( "right_friend" );
/* 855  */                         } );
/* 856  */                         $j( "#searchuser" ).click( function( ) {
/* 857  */                             g_log_home_right.push( "rightuser_search" );
/* 858  */                         } );
/* 859  */                         $j( "#allfriendlistdiv a" ).click( function( ) {
/* 860  */                             g_log_home_right.push( "right_friend_all" );
/* 861  */                         } );
/* 862  */ 
/* 863  */                         setTimeout( function( ) {
/* 864  */                             $j( "#calendar_box a" ).click( function( ) {
/* 865  */                                 g_log_home_right.push( "right_calendar" );
/* 866  */                             } );
/* 867  */ 
/* 868  */                             $j( "#rollBox_1 a" ).click( function( ) {
/* 869  */                                 g_log_home_right.push( "right_hot" );
/* 870  */                             } );
/* 871  */                             $j( "#rollSlidePrev_1" ).click( function( ) {
/* 872  */                                 g_log_home_right.push( "right_hot_prev" );
/* 873  */                             } );
/* 874  */                             $j( "#rollSlideNext_1" ).click( function( ) {
/* 875  */                                 g_log_home_right.push( "right_hot_next" );
/* 876  */                             } );
/* 877  */ 
/* 878  */                             $j( "#rollBox_2 a" ).click( function( ) {
/* 879  */                                 g_log_home_right.push( "right_star" );
/* 880  */                             } );
/* 881  */                             $j( "#rollSlidePrev_2" ).click( function( ) {
/* 882  */                                 g_log_home_right.push( "right_star_prev" );
/* 883  */                             } );
/* 884  */                             $j( "#rollSlideNext_2" ).click( function( ) {
/* 885  */                                 g_log_home_right.push( "right_star_next" );
/* 886  */                             } );
/* 887  */ 
/* 888  */                             $j( "#rollBox_3 a" ).click( function( ) {
/* 889  */                                 g_log_home_right.push( "right_app" );
/* 890  */                             } );
/* 891  */                             $j( "#rollSlidePrev_3" ).click( function( ) {
/* 892  */                                 g_log_home_right.push( "right_app_prev" );
/* 893  */                             } );
/* 894  */                             $j( "#rollSlideNext_3" ).click( function( ) {
/* 895  */                                 g_log_home_right.push( "right_app_next" );
/* 896  */                             } );
/* 897  */ 
/* 898  */                             $j( "#rollBox_4 a" ).click( function( ) {
/* 899  */                                 g_log_home_right.push( "right_act" );
/* 900  */                             } );

/* log_makepolo.js */

/* 901  */                             $j( "#rollSlidePrev_4" ).click( function( ) {
/* 902  */                                 g_log_home_right.push( "right_act_prev" );
/* 903  */                             } );
/* 904  */                             $j( "#rollSlideNext_4" ).click( function( ) {
/* 905  */                                 g_log_home_right.push( "right_act_next" );
/* 906  */                             } );
/* 907  */                         }, 2000 );
/* 908  */                     }
/* 909  */                     catch ( ex ) {}
/* 910  */                 }
/* 911  */ 
/* 912  */             }
/* 913  */         }
/* 914  */ 
/* 915  */ 
/* 916  */     };
/* 917  */ 
/* 918  */     /**
/* 919  *|      * 闭包函数初始化处
/* 920  *|      */
/* 921  */     window.KX_TRACKER = new Tracker( );
/* 922  */ 
/* 923  */ } )( );
/* 924  */ 
/* 925  */ /*用户点击行为统计*/
/* 926  */ ( function( ) {
/* 927  */ /**
/* 928  *| 	 * @method	_marmotGetParam
/* 929  *| 	 * 获取url参数
/* 930  *| 	 *
/* 931  *| 	 * 默认从全局配置中获取参数
/* 932  *| 	 * 如果无默认配置会从脚本src中获取参数
/* 933  *| 			1. 属性中拥有data-common-log=true的脚本src
/* 934  *| 			2. 当前脚本的src
/* 935  *| 	 */
/* 936  */ 
/* 937  */     //配置变量名
/* 938  */     var globalConfigField = 'COMMON_LOG_CONF',
/* 939  */         _marmot_js_href = null;
/* 940  */ 
/* 941  */     //如果没有配置则不开启统计
/* 942  */     if ( !window[ globalConfigField ] || !window.KX_TRACKER.tags.vid ) {
/* 943  */         return;
/* 944  */     }
/* 945  */ 
/* 946  */     function _marmotGetParam( param ) {
/* 947  */         if ( window[ globalConfigField ] ) {
/* 948  */             var config = window[ globalConfigField ];
/* 949  */             return config[ param ];
/* 950  */         }

/* log_makepolo.js */

/* 951  */ 
/* 952  */         if ( !_marmot_js_href ) {
/* 953  */             var js = document.getElementsByTagName( 'script' );
/* 954  */             for ( var i = 0, len = js.lenth; i < len; i++ ) {
/* 955  */                 if ( js[ i ].getAttribute( 'marmot' ) == 'true' ) {
/* 956  */                     _marmot_js_href = js[ i ].src;
/* 957  */                     break;
/* 958  */                 }
/* 959  */             }
/* 960  */             if ( !_marmot_js_href ) {
/* 961  */                 _marmot_js_href = js[ js.length - 1 ].src;
/* 962  */             }
/* 963  */         }
/* 964  */         var match = _marmot_js_href.match( new RegExp( param + '=([^?#&=]*)', 'i' ) );
/* 965  */         if ( match ) {
/* 966  */             return match[ 1 ];
/* 967  */         }
/* 968  */         return null;
/* 969  */     }
/* 970  */     /**
/* 971  *|      * 处理采样率(0 - 1)
/* 972  *|      */
/* 973  */     var _ratio = _marmotGetParam( 'ratio' );
/* 974  */     if ( _ratio !== null ) {
/* 975  */         //取VID最后两位数字
/* 976  */         var vid = window.KX_TRACKER.tags.vid.toString( ),
/* 977  */             num = parseInt( ( /(\w{2})$/.exec( vid ) )[ 1 ], 16 );
/* 978  */ 
/* 979  */         //最后两位为16进制，取值范围为0 - 255
/* 980  */         if ( num > ( _ratio * 255 ) ) {
/* 981  */             return;
/* 982  */         }
/* 983  */     }
/* 984  */ 
/* 985  */     /**
/* 986  *|      * @class	Marmot
/* 987  *|      * Marmot静态类
/* 988  *|      */
/* 989  */     var Marmot = {
/* 990  */         //页面开始时间
/* 991  */         _startTime: window.g_st_time,
/* 992  */         _pageID: _marmotGetParam( 'pid' ),
/* 993  */         //用户行为数据的真实容器，储存数据
/* 994  */         _logData: [ ],
/* 995  */         //最大采集数据量，达到此数据量，自动提交
/* 996  */         _maxEvt: 50,
/* 997  */         //上一个事件，用于处理表单域的点击自动触发focus事件情况
/* 998  */         _preEvt: {
/* 999  */             t: 'f',
/* 1000 */             path: [ ]

/* log_makepolo.js */

/* 1001 */         },
/* 1002 */         //log发送地址
/* 1003 */         _logUrl: "http://jic.makepolo.com/log/path.gif",
/* 1004 */ 
/* 1005 */         //获取页面大小
/* 1006 */         _getPageWidth: function( ) {
/* 1007 */             var doc = document,
/* 1008 */                 body = doc.body,
/* 1009 */                 html = doc.documentElement,
/* 1010 */                 client = doc.compatMode == 'BackCompat' ? body : doc.documentElement;
/* 1011 */ 
/* 1012 */             return Math.max( html.scrollWidth, body.scrollWidth, client.clientWidth );
/* 1013 */         },
/* 1014 */         //log函数
/* 1015 */         log: function( arg ) {
/* 1016 */ 
/* 1017 */             //数据量达到最大值，自动提交
/* 1018 */             if ( Marmot._logData.length >= Marmot._maxEvt ) {
/* 1019 */                 Marmot.pushLog( );
/* 1020 */                 Marmot.pushLog = function( ) {};
/* 1021 */                 return;
/* 1022 */             }
/* 1023 */             //处理表单域的点击事件与focus事件重复
/* 1024 */             if (
/* 1025 */                 arg.t == 'c'
/* 1026 */                 && Marmot._preEvt !== null
/* 1027 */                 && Marmot._preEvt.t == 'f'
/* 1028 */                 && arg.path.join( '' ) == Marmot._preEvt.path.join( '' ) ) {
/* 1029 */                 Marmot._logData.pop( );
/* 1030 */             }
/* 1031 */ 
/* 1032 */             Marmot._logData.push( arg.x + '*' + arg.y + '*' + arg.path.join( '' ) );
/* 1033 */             Marmot._preEvt = arg;
/* 1034 */         },
/* 1035 */         stop: function( ) {
/* 1036 */             Marmot.pushLog = function( ) {};
/* 1037 */         },
/* 1038 */         //将用户点击数据发送到服务端
/* 1039 */         pushLog: function( ) {
/* 1040 */             var data = Marmot._logData.join( '!' );
/* 1041 */             var refer = document.referrer;
/* 1042 */             if ( refer.length > 100 ) {
/* 1043 */                 refer = refer.split( '?' )[ 0 ];
/* 1044 */             }
/* 1045 */ 
/* 1046 */             var params = [
/* 1047 */                 'vid=' + window.KX_TRACKER.tags.vid,
/* 1048 */                 'pid=' + encodeURIComponent( this._pageID ),
/* 1049 */                 'data=' + data,
/* 1050 */                 'px=' + window.screen.width + '*' + window.screen.height,

/* log_makepolo.js */

/* 1051 */                 'uid=' + window.KX_TRACKER.tags.uid ];
/* 1052 */ 
/* 1053 */             if ( this._startTime ) {
/* 1054 */                 params.push( 'st=' + ( new Date( ) - this._startTime ) );
/* 1055 */             }
/* 1056 */             var img = document.createElement( 'img' );
/* 1057 */             img.src = Marmot._logUrl + '?' + params.join( '&' );
/* 1058 */             //			document.body.appendChild(img);
/* 1059 */         },
/* 1060 */         //开启数据检测功能，捕获用户行为
/* 1061 */         inspect: function( ) {
/* 1062 */             //返回事件的target
/* 1063 */ 
/* 1064 */ 
/* 1065 */             function getTarget( e ) {
/* 1066 */                 return e.target || e.srcElement;
/* 1067 */             }
/* 1068 */             //返回事件对象
/* 1069 */ 
/* 1070 */ 
/* 1071 */             function getEvent( event, element ) {
/* 1072 */                 if ( event ) {
/* 1073 */                     return event;
/* 1074 */                 }
/* 1075 */                 else if ( element ) {
/* 1076 */                     if ( element.document ) {
/* 1077 */                         return element.document.parentWindow.event;
/* 1078 */                     }
/* 1079 */                     if ( element.parentWindow ) {
/* 1080 */                         return element.parentWindow.event;
/* 1081 */                     }
/* 1082 */                 }
/* 1083 */                 return window.event || null;
/* 1084 */             }
/* 1085 */             //侦听事件
/* 1086 */             var listen = function( ) {
/* 1087 */                     if ( document.addEventListener ) {
/* 1088 */                         return function( element, name, handler ) {
/* 1089 */                             element.addEventListener( name, handler, true );
/* 1090 */                         };
/* 1091 */                     }
/* 1092 */                     else if ( document.attachEvent ) {
/* 1093 */                         return function( element, name, handler ) {
/* 1094 */                             element.attachEvent( 'on' + name, handler );
/* 1095 */                         };
/* 1096 */                     }
/* 1097 */                 }( );
/* 1098 */ 
/* 1099 */             function getDoc( evt ) {
/* 1100 */                 var target = getTarget( evt ),

/* log_makepolo.js */

/* 1101 */                     doc = document;
/* 1102 */                 if ( target ) {
/* 1103 */                     doc = target.document
/* 1104 */                         || target.ownerDocument
/* 1105 */                         || ( target.window || target.defaultView )
/* 1106 */                         && target
/* 1107 */                         || document;
/* 1108 */                 }
/* 1109 */                 return doc;
/* 1110 */             }
/* 1111 */             //返回事件的触发坐标
/* 1112 */ 
/* 1113 */ 
/* 1114 */             function getXY( evt ) {
/* 1115 */                 var e = evt,
/* 1116 */                     doc = getDoc( evt );
/* 1117 */                 var x = ( 'pageX' in e ) ?
/* 1118 */                             e.pageX :
/* 1119 */                             ( e.clientX +
/* 1120 */                               ( doc.documentElement.scrollLeft || doc.body.scrollLeft ) -
/* 1121 */                               2
/* 1122 */                             );
/* 1123 */ 
/* 1124 */                 var y = ( 'pageY' in e ) ?
/* 1125 */                             e.pageY :
/* 1126 */                             ( e.clientY +
/* 1127 */                               ( doc.documentElement.scrollTop || doc.body.scrollTop ) -
/* 1128 */                               2 );
/* 1129 */ 
/* 1130 */                 return {
/* 1131 */                     x: x,
/* 1132 */                     y: y
/* 1133 */                 };
/* 1134 */             }
/* 1135 */             //返回元素的绝对坐标
/* 1136 */ 
/* 1137 */ 
/* 1138 */             function getPos( el ) {
/* 1139 */                 var x = el.offsetTop;
/* 1140 */                 var y = el.offsetLeft;
/* 1141 */                 el = el.offsetParent;
/* 1142 */ 
/* 1143 */                 while ( el ) {
/* 1144 */                     x += el.offsetTop;
/* 1145 */                     y += el.offsetLeft;
/* 1146 */                     el = el.offsetParent;
/* 1147 */                 }
/* 1148 */                 return {
/* 1149 */                     x: x,
/* 1150 */                     y: y

/* log_makepolo.js */

/* 1151 */                 };
/* 1152 */             }
/* 1153 */ 
/* 1154 */             try {
/* 1155 */                 listen( document, 'mousedown', function( e ) {
/* 1156 */                     var evt = getEvent( e, this );
/* 1157 */                     var target = getTarget( evt );
/* 1158 */                     var path = Marmot.getPath( target );
/* 1159 */                     var pos = getXY( evt );
/* 1160 */                     Marmot.log( {
/* 1161 */                         x: pos.x,
/* 1162 */                         y: pos.y,
/* 1163 */                         path: path,
/* 1164 */                         t: 'c'
/* 1165 */                     } );
/* 1166 */                 } );
/* 1167 */                 listen( document, 'focus', function( e ) {
/* 1168 */                     var evt = getEvent( e, this );
/* 1169 */                     var target = getTarget( evt );
/* 1170 */                     if ( target.tagName ) {
/* 1171 */                         var tag = target.tagName.toUpperCase( );
/* 1172 */                         if (
/* 1173 */                             tag == 'INPUT'
/* 1174 */                             || tag == 'TEXTAREA'
/* 1175 */                             || tag == 'BUTTON'
/* 1176 */                             || tag == 'SELECT'
/* 1177 */                             || tag == 'OBJECT'
/* 1178 */                             || tag == 'EMBED' ) {
/* 1179 */ 
/* 1180 */                             var path = Marmot.getPath( target );
/* 1181 */                             var pos = getPos( target );
/* 1182 */ 
/* 1183 */                             Marmot.log( {
/* 1184 */                                 x: pos.x,
/* 1185 */                                 y: pos.y,
/* 1186 */                                 path: path,
/* 1187 */                                 t: 'f'
/* 1188 */                             } );
/* 1189 */                         }
/* 1190 */                         else {
/* 1191 */                             return;
/* 1192 */                         }
/* 1193 */                     }
/* 1194 */                 } );
/* 1195 */                 listen( window, 'beforeunload', function( e ) {
/* 1196 */                     Marmot.pushLog( );
/* 1197 */                     Marmot.pushLog = function( ) {};
/* 1198 */                 } );
/* 1199 */             }
/* 1200 */             catch ( e ) {}

/* log_makepolo.js */

/* 1201 */         },
/* 1202 */         //返回元素的MDP路径
/* 1203 */         getPath: function( node, path ) {
/* 1204 */             path = path || [ ];
/* 1205 */             var count;
/* 1206 */             if (
/* 1207 */                 node == document.body
/* 1208 */                 || ( node.tagName && node.tagName.toUpperCase( ) == "HTML" ) ) {
/* 1209 */                 return path;
/* 1210 */             }
/* 1211 */ 
/* 1212 */             if (
/* 1213 */                 node.getAttribute
/* 1214 */                 && node.getAttribute( 'id' ) != ''
/* 1215 */                 && node.getAttribute( 'id' ) ) {
/* 1216 */                 path.push( node.nodeName.toLowerCase( ) + '.' + node.getAttribute( 'id' ) );
/* 1217 */                 return path;
/* 1218 */             }
/* 1219 */ 
/* 1220 */             if ( node.parentNode && node.parentNode.tagName.toUpperCase( ) != "BODY" ) {
/* 1221 */                 path = Marmot.getPath( node.parentNode, path );
/* 1222 */             }
/* 1223 */ 
/* 1224 */             if ( node.previousSibling ) {
/* 1225 */                 count = 1;
/* 1226 */                 var sibling = node.previousSibling;
/* 1227 */                 do {
/* 1228 */                     //if(sibling.nodeType == 1 && sibling.nodeName == node.nodeName) {
/* 1229 */                     if ( sibling.nodeType == 1 && sibling.nodeName == node.nodeName ) {
/* 1230 */                         count++;
/* 1231 */                     }
/* 1232 */                     sibling = sibling.previousSibling;
/* 1233 */                 } while ( sibling );
/* 1234 */             }
/* 1235 */ 
/* 1236 */             if ( node.nodeType == 1 ) {
/* 1237 */                 path.push( '~' + ( count > 1 ? count : 1 ) + node.nodeName.toLowerCase( ) );
/* 1238 */             }
/* 1239 */ 
/* 1240 */             return path;
/* 1241 */         }
/* 1242 */     };
/* 1243 */ 
/* 1244 */     /**
/* 1245 *|      * 启动Marmot
/* 1246 *|      */
/* 1247 */     Marmot.inspect( );
/* 1248 */ } )( );
/* 1249 */ 
/* 1250 */ 

/* log_makepolo.js */

/* 1251 */ function google_static()
/* 1252 */ {
/* 1253 */ 	  var _gaq = _gaq || [];
/* 1254 */ 	  _gaq.push(['_setAccount', 'UA-16312593-2']);
/* 1255 */ 	  _gaq.push(['_setDomainName', '.makepolo.com']);
/* 1256 */ 	  _gaq.push(['_addOrganic', 'baidu', 'word']);
/* 1257 */ 	  _gaq.push(['_addOrganic', 'soso', 'w']);
/* 1258 */ 	  _gaq.push(['_addOrganic', '3721', 'name']);
/* 1259 */ 	  _gaq.push(['_addOrganic', 'youdao', 'q']);
/* 1260 */ 	  _gaq.push(['_addOrganic', 'so.360.cn', 'q']);
/* 1261 */ 	  _gaq.push(['_addOrganic', 'so.com', 'q']);
/* 1262 */ 	  _gaq.push(['_addOrganic', 'vnet', 'kw']);
/* 1263 */ 	  _gaq.push(['_addOrganic', 'sogou', 'query']);
/* 1264 */ 	  _gaq.push(['_addIgnoredOrganic', '马可波罗']);
/* 1265 */ 	  _gaq.push(['_addIgnoredOrganic', '马可波罗网']);
/* 1266 */ 	  _gaq.push(['_addIgnoredOrganic', 'makepolo']);
/* 1267 */ 	  _gaq.push(['_addIgnoredOrganic', 'www.makepolo.com&#39;']);
/* 1268 */ 	  _gaq.push(['_addIgnoredOrganic', 'china.makepolo.com']);
/* 1269 */ 	  _gaq.push(['_addIgnoredOrganic', 'makepolo.com']);
/* 1270 */ 	  _gaq.push(['_setCustomVar', 1, 'PageType', static_arr[0],3]);
/* 1271 */ 	  _gaq.push(['_setCustomVar', 2, 'FirstClass', static_arr[1],3]);
/* 1272 */ 	  _gaq.push(['_setCustomVar', 3, 'SecondClass',static_arr[2],3]);
/* 1273 */ 	  _gaq.push(['_setCustomVar', 4, 'ThirdClass', static_arr[3],3]);
/* 1274 */ 	  _gaq.push(['_trackPageview', 'N='+static_arr[4]+',P='+static_arr[5]+'T='+static_arr[6]]);
/* 1275 */ 	  var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
/* 1276 */ 	  ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
/* 1277 */ 	  var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
/* 1278 */ }
/* 1279 */ 
/* 1280 */ function baidu_static()
/* 1281 */ {
/* 1282 */ 	var _bdhmProtocol = (("https:" == document.location.protocol) ? " https://" : " http://");
/* 1283 */ 	document.write(unescape("%3Cscript src='" + _bdhmProtocol + "hm.baidu.com/h.js%3F7e7577ecbf4c96abade7fbcaa1d3b519' type='text/javascript'%3E%3C/script%3E"));
/* 1284 */ 
/* 1285 */ }
/* 1286 */ 
