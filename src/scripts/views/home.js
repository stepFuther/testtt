var tplHome = require('../templates/home.string');

//引用公共方法
var util = require('../utils/fn.js') ;

SPA.defineView('home',{
	
	html :tplHome ,
	
	plugins : ['delegated'] ,
	
	init :{
		mySwiper : null ,
		
	},
	
	bindEvents: {
		'beforeShow':function(){
			
		}
		
	}
	
});














