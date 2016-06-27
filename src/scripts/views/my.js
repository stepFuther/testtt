var tplMy = require('../templates/my.string');

SPA.defineView('my', {
  html: tplMy ,
  plugins:['delegated'] ,
  
  bindActions:{
  	
  	'login': function() {
      // 视图切换
      SPA.open('module',{
      	ani:{
      		name:'dialog' ,
      		width:280,
      		height:200,
      		autoHide:true
      	}
      });
    }
  	
  	
  	
  }
  
  
  
  
  
  
});