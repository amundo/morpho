#!/usr/bin/env python
import json, sys


def tokenize(line): 
  return line.strip().split()

def ziplines(a,b):
  return zip(tokenize(a), tokenize(b))

def process_stanza(stanza):
  lines = [line for line in stanza.splitlines() if line]
  sentence, translation, free = lines
  gloss = ziplines(sentence, translation)
  return {
    'sentence' : sentence,
    'translation' : translation,
    'gloss' : gloss
  }

print json.dumps(process_stanza(sys.stdin.read().decode('utf-8')), indent=2)
