function dump(obj){ 
  console.log(JSON.stringify(obj, null, 2));
}

$(function(){
  App = {};

  
  App.Morpheme = Backbone.Model.extend({ 
    defaults: {
      type : 'unknown',
      form : 'unknown',
      gloss : 'unknown'
    },
  
    initialize: function(){
      _.bindAll(this, 'suggest');
    },
  
    addGloss: function(gloss){
      this.set('gloss', gloss)
    },
  
    suggest: function(){
      _.bindAll(this);
    }
  
  });
  
  App.MorphemeRegistry = Backbone.Collection.extend({ 
    model: App.Morpheme,

    initialize : function(){
    },

    search : function(query){
      if(query == "") return this;
      
      var pattern = new RegExp(query,'gi');

      return _(this.filter(function(morpheme) {
        return pattern.test(morpheme.get('form'));
      }));
    }
  })

  Word = Backbone.Model.extend({ 
    initialize: function(){
      _.bindAll(this, 'analyze', 'wtf');
      this.on('change:morphemes', this.wtf);
      this.analyze();
    },
  
    analyze: function(){
      var delimiterRE = new RegExp('[-=~]', 'g');
      var morphemes = this.get('form').split(delimiterRE); 
      this.set({'morphemes': morphemes});
      App.morphemeRegistry.add({'morphemes': morphemes});
    },
    wtf: function(){
      console.log('wtf');
    }
  });

  App.WordView = Backbone.View.extend({ 
    events : {
      'keyup input' : 'createWordOnEnter'
    },
  
    initialize : function(){
      _.bindAll(this, 'render', 'createWordOnEnter');
    },
  
    createWordOnEnter : function(ev){
      if (ev.which == 13){
        var form = $(ev.target).val();
        App.word = new Word({form: form}); 
        ev.preventDefault();
      } 
    },
  
    render : function(){
      $(this.el).append();
      console.log(this.el);
      return this;
    },
      
  });
  

  App.wordView = new App.WordView({ el : $('#word')  });
  App.morphemeRegistry = new App.MorphemeRegistry([ 
    { 'form': 'nohpʰo', 'gloss': 'to.live' },
    { 'form': 'w', 'gloss': 'ABSOLUTIVE' },
    { 'form': 'mu', 'gloss': 'IP-energy' }
  ]);

  
})
