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

  function readAlphabet(){
    return $('#alphabet').val().split(' '); //['a','-', 'pʰ','n','h','p','o','w'];
  }

  function letterize(word, alphabet){
    /* split up word according to alphabet */
    var pattern = '(' + alphabet.join('|') + ')';
    var letters = word.match(new RegExp(pattern,'g'));
      return letters
  };

  function letterize(word){
    /* split up marked up word according to morphemes */
    var delimiters = '-=~;';
    var pattern = '(' + alphabet.join('|') + ')';
    var letters = word.match(new RegExp(pattern,'g'));
      return letters
  };

  function main(){
    var word = $('#word').val();
    var alphabet = readAlphabet();
    var letters = letterize(word, alphabet);
    _.each(letters, function(letter){
      $('.morphemes').append('<span class=letter>' + letter + '</span>')
    })
  }

  $('#word').keyup(function(ev){ 
    main();
  });

})
