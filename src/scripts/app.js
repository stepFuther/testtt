// 引入类库
require('./lib/spa.min.js');
//require('./lib/iscroll-probe.js');
require('./lib/swiper-3.3.1.min.js');

// 引入views
require('./views/index.js');
require('./views/moment.js');
require('./views/guide.js');
require('./views/order.js');
require('./views/home.js');
require('./views/detail.js');
require('./views/my.js');
require('./views/module.js');
require('./views/market.js');






//SPA設置,定義首先進入的视图

SPA.config({
	indexView :'guide'  
});











