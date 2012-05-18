/*
when the user presses enter
parse the word
for each morpheme
  show the morpheme and a field
when any field is changed
  add the 
*/

var Text = Backbone.Model.extend({ 
  initialize: function(node){
    
  }
});

var WordView = Backbone.View.extend({ 
  events : {
    'keyup' : 'log'
  },
  log : function(ev){
    console.log(ev.which);
  },
    
});

var Word = Backbone.Model.extend({ 
  defaults: {
    delimiters: '=-~',
    form: ''
  },

  initialize: function(){
    _.bindAll(this, 'analyze');
    this.analyze();
  },

  analyze: function(){
    var delimiterRE = new RegExp('[-=~]', 'g');
    this.set({ morphemes: this.get('form').split(delimiterRE) });
  }
});

var Morpheme = Backbone.Model.extend({ 

  suggest: function(){
    // is this morpheme in the database?
  },

  classify: function(){
    // set prefix, suffix, clitic, reduplication
  }

});

var Morphemes = Backbone.Collection.extend({ model: Morpheme });

Lang = { 
  Morpheme: Morpheme,
  WordView: WordView,
  Morphemes: Morphemes
} ;

var word_data = [
  {
    analyzed: 'nohpʰo-w',
    analysis: [
      ['nohpʰo', 'live'],
      ['w', 'ABSOLUTIVE']
    ]
  },

  {
    analyzed: 'beli',
    analysis: [
      ['beli', 'here']
    ]
  }
]
