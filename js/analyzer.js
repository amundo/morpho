window.Word = Backbone.Model.extend({

  initialize : function(rawWord){
    _.bindAll(this, 'analyze'); 
    this.rawWord = rawWord;
    /*this.morphemes = this.analyze(rawWord);*/
    this.analyze(rawWord);
  },

  analyze : function(rawWord){
    var delimiters = '-=~;';
    var pattern = '[' + delimiters + ']';
    //return rawWord.split(new RegExp(pattern,'g'));
    var morphemes = rawWord.split(new RegExp(pattern,'g'));
    this.morphemes = morphemes;
  }

}) 

window.MorphTableView = Backbone.View.extend({
  el : $('table'),

  initialize : function(){
    _.bindAll(this, 'render'); 
  },

  rowTemplate : $("#morphemesTemplate").html(),

  render : function(){
    var template = _.template(this.rowTemplate);
    var html = template(this.model.toJSON());
    this.el.html(html);
  }
})

window.Morpheme = Backbone.Model.extend({ })

window.Morphemes = Backbone.Collection.extend({

  model: Morpheme,
  url: '/morphemes'

})

window.App = Backbone.View.extend({

  events: { 

    'keyup #analyzer #word' : 'analyze'

  },

  analyze: function(ev){
    if(ev.which == 13 ){  
      ev.preventDefault();
      var raw = $(ev.target).val();
      var word = new Word(raw);
      w = new Word($('#word').val())
      t = _.template($('#morphemesTemplate').html())
      this.$el.append('<table>' + t(w) + '</table>')
    }
  },

  initialize: function(){
  //  _.bindAll(this, 'analyze'); 
  }

})

$(function(){

  window.app = new App({ el: $('body')}) ;

})
