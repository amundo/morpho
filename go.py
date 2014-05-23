from automorph import *

words = [x.split()[0] for x in open('morphs.txt').read().decode('utf-8').split('\n\n') if x ]

for a, b in [(w,turkRE.findall(w)) for w in words]: 
 print a, '\n', '-'.join(b), '\n'



