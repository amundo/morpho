
$(function(){
  var Router = Backbone.Router.extend({

    routes: { 

      '*action' : 'func',
      'search/:query' : 'search'

    },

    func: function(action){
      console.log(action)
    },

    search: function(query){
      console.log('search says: ' + query)
    }


  })

  var r = new Router();

  Backbone.history.start({pushState: true});

})
