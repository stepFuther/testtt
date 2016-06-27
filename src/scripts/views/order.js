var tplOrder = require('../templates/order.string');

SPA.defineView('order', {
  html: tplOrder ,
  
  plugins : ['delegated',{
		name: 'avalon' ,
		options: function(vm) {
			vm.livelist = [] ;
		}
		
	}] ,

  bindActions: {
		'goto.market': function (e,data) {
      SPA.open('market', {
        param: data
      });
   }	
	},

  bindEvents: {
    show: function () {
      
    }
  }
  
  
  
  
});


















