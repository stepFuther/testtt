var tplModule = require('../templates/module.string');

SPA.defineView('module', {
  html: tplModule,
  
	styles: {
		background:'transparent !important',
	},
	
  plugins: ['delegated'],

  bindActions: {
    'close': function() {
      // 视图切换
     	this.hide() ;
    },
    'confirm': function() {
      // 视图切换
     	this.hide() ;
    }
  },

  bindEvents: {
    show: function () {
      
    }
  }
});


























