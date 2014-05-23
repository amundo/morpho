window.Word = Backbone.Model.extend({

  initialize : function(rawWord){
    _.bindAll(this, 'analyze'); 
    this.rawWord = rawWord;
    this.analyze(rawWord);
  },

  analyze : function(rawWord){
    var delimiters = '-=~;';
    var pattern = '[' + delimiters + ']';
    var morphemes = rawWord.split(new RegExp(pattern,'g'));
    this.morphemes = morphemes;
  }

}) 

window.MorphemeTableView = Backbone.View.extend({
  el : $('table'),

  initialize : function(){
    _.bindAll(this, 'render'); 
  },

  render : function(){
    var template = _.template($("#morphemesTemplate").html());
    var html = template(this.model.toJSON());
    this.el.html(html);
    t = _.template($('#morphemesTemplate').html())
    this.$el.find('.analysis').html('<table>' + t(w) + '</table>')
  }
})

window.App = Backbone.View.extend({

  events: { 

    'keyup #analyzer #word' : 'analyzeOnEnter'

  },

  analyzeOnEnter: function(ev){
    if(ev.which == 13 ){  
      ev.preventDefault();
      var raw = $(ev.target).val();
      w = new Word($('#word').val())
      morphemeTableView = new MorphemeTableView({'model': w});
    }
  },

  initialize: function(){
    _.bindAll(this, 'analyzeOnEnter'); 
  }

})

$(function(){

  window.app = new App({ el: $('body')}) ;

})
