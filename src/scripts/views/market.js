var tplMarket = require('../templates/market.string');

// 引用公共方法
var util = require('../utils/fn.js');

//
SPA.defineView('market',{
  html: tplMarket,

   // 载入插件列表
  // delegated 实现tab事件的绑定
  plugins : ['delegated',{
		name: 'avalon' ,
		options: function(vm) {
			vm.livelist = [] ;
		}
	}] ,
  
  init: {
    vm: null,
    livelistArray: [],
    homeHotSwiper: null,
    formatData: function (arr) {
      var tempArr = [];
      for (var i = 0; i < Math.ceil(arr.length/2); i++) {
        tempArr[i] = [];
        tempArr[i].push(arr[2*i]);
        tempArr[i].push(arr[2*i+1]);
      }
      return tempArr;
    }
  },
  
	 // 绑定tab 事件
  bindActions: {
  	'back': function (){
      this.hide();
    },
    
    'market-tabs': function (e, data) {
      this.homeHotSwiper.slideTo($(e.el).index());
      
    }
  },
  
  bindEvents: {  
    'beforeShow':function(){
			var that = this ;
			that.vm = that.getVM() ;
			$.ajax({
				url :'/api/getLivelist.php' ,
			//	  /api/getLivelist.php
			//    /mobiletask/mock/mock.json
				type : 'get' ,
				data:{
		           rtype: 'origin'
		        },
				success:function(rs){
			//	console.log(rs) ;
			//	console.log(that.formatData(rs.data))
			//	vm.downloadmore = that.formatData(rs.data) ;
			  that.livelistArray = rs.data;
				that.vm.livelist = that.formatData(rs.data)  ;
					
				}	
			})
		},
		
	'show': function () {
      var that = this;
      // 下拉刷新，上拉加载更多
      
      that.homeHotSwiper = new Swiper('#home-hot-swiper', {
        loop: false,
        onSlideChangeStart: function (swiper) {
          var index = swiper.activeIndex;
          var $lis = $('.m-market nav li');
          util.setFocus($lis.eq(index));
        }
        // freeMode : true,
        // freeModeMomentum : false
      });
      
      var scrollSize = 40;
      var myScroll = this.widgets.homeHotScroll;
      myScroll.scrollBy(0, -scrollSize);

      var head = $('.head img'),
          topImgHasClass = head.hasClass('up');
      var foot = $('.foot img'),
          bottomImgHasClass = head.hasClass('down');
      myScroll.on('scroll', function () {
          var y = this.y,
              maxY = this.maxScrollY - y;
          if (y >= 0) {
              !topImgHasClass && head.addClass('up');
              return '';
          }
          if (maxY >= 0) {
              !bottomImgHasClass && foot.addClass('down');
              return '';
          }
      });

      myScroll.on('scrollEnd', function () {
          if (this.y >= -scrollSize && this.y < 0) {
              myScroll.scrollTo(0, -scrollSize);
              head.removeClass('up');
          } else if (this.y >= 0) {
              head.attr('src', '/mobiletask/images/ajax-loader.gif');
              // ajax下拉刷新数据

              $.ajax({
                url: '/api/getLivelist.php',
                data: {
                  rtype: 'refresh'
                },
                success: function (rs) {
                  var newArray = rs.data.concat(that.livelistArray);
                  that.vm.livelist = that.formatData(newArray);
                  that.livelistArray = newArray;

                  myScroll.scrollTo(0, -scrollSize);
                  head.removeClass('up');
                  head.attr('src', '/mobiletask/images/arrow.png');
                }
              })

              // setTimeout(function () {
              // }, 1000);
          }

          var maxY = this.maxScrollY - this.y;
          var self = this;
          if (maxY > -scrollSize && maxY < 0) {
              myScroll.scrollTo(0, self.maxScrollY + scrollSize);
              foot.removeClass('down')
          } else if (maxY >= 0) {
              foot.attr('src', '/mobiletask/images/ajax-loader.gif');
              // ajax上拉加载数据

              $.ajax({
                url: '/api/getLivelist.php',
                data: {
                  rtype: 'more'
                },
                success: function (rs) {
                //	console.log(that.livelistArray) ;
                  var newArray = that.livelistArray.concat(rs.data);
                  that.vm.livelist = that.formatData(newArray);
                  that.livelistArray = newArray;
                  myScroll.refresh();

                  myScroll.scrollTo(0, self.y + scrollSize);
                  foot.removeClass('down');
                  foot.attr('src', '/mobiletask/images/arrow.png');
                }
              });
          }
      })
    }

	}
    
    
     
});
