window.Analyzer = Backbone.View.extend({

  el: $('body'),

  events : {
    'keyup input' : 'log' 
  },

  initialize: function(){
    _.bindAll(this, 'log')
  },

  log: function(){
    console.log($(this.el).find('input').val());
  },


}) 

window.Letter = Backbone.Model.extend({
})

window.Word = Backbone.Collection.extend({

  model : Letter,

}) 


$(function(){

 window.analyzer = new Analyzer;  

function letterize(word, alphabet){
  /* split up word according to alphabet */
  var pattern = '(' + alphabet.join('|') + ')';
  var letters = word.match(new RegExp(pattern,'g'));
    return letters
};

var alphabet = ['pʰ','n','h','p','o','w'];
var word = $('.word').text();
var letters = letterize(word, alphabet);
$('.morphemes').text(letters.join('-'));

})
