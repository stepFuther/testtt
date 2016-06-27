var tplDetail = require('../templates/detail.string');

//引用公共方法
var util = require('../utils/fn.js') ;
SPA.defineView('detail', {
   html: tplDetail ,
   
   plugins: ['delegated', {
    name: 'avalon',
    options: function (vm) {
      vm.imgsrc = "";
      vm.title = "";
      vm.detail = "" ;
      vm.isShowLoading = true;
    }
  }],

  bindActions: {
    'back': function (){
      this.hide();
    },
    'tabslide':function(){
    	
    }
  },

  bindEvents: {
    'show': function () {
      var vm = this.getVM();
      var d = this.param;
    //  console.log(this.param)
//    console.log(d)
//    console.log(d.id);

      $.ajax({
        url: '/api/getLiveDetail.php',
        type:"get" ,
        data: {
          id: d.id
        },
        success: function (rs) {
          vm.title = rs.data.title;
          vm.imgsrc = rs.data.imgsrc;
          vm.detail = rs.data.detail;
          vm.isShowLoading = false;
        }
      })
    }
  }
});
   
  
  
  
  
  
  




















