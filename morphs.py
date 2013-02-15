#!/usr/bin/env python
# -*- coding: utf-8 -*-
import fileinput
import json
import sys, codecs
from pystache import  render
sys.stdout = codecs.getwriter('utf-8')(sys.stdout)

content = ''.join([line.decode('utf-8') for line in fileinput.input()])

words = content.strip().split('\n\n')

#for i, word in enumerate(words):
  #print i
  #print word 
 
def dequote(word):
  return word.replace(u'‘', '').replace(u'’','')

def process_word(word):
  glossed_word = {}  
  headline, morphs, analysis = word.splitlines()

  form = headline.split()[0]
  definition = dequote(' '.join(headline.split()[1:]))

  glossed_word['form'] = form
  glossed_word['definition'] = definition

  #if len(morphs.split('-')) != len(analysis.split('-')): 
  #  print word; exit()

  glossed_word['morphemes'] = []
  for morph, gloss in zip(morphs.split('-'), analysis.split('-')):
    glossed_word['morphemes'].append({'morph': morph, 'gloss': gloss})

  return glossed_word

glossed_words = [process_word(word) for word in words]

inventory = set()
for glossed_word in glossed_words: 
  for morpheme  in glossed_word['morphemes']:
    inventory.add((morpheme['morph'], morpheme['gloss']))


#print json.dumps(glossed_words, indent=2)
#print json.dumps(inventory, indent=2)

for morph, gloss in sorted(inventory): 
  print morph, gloss


