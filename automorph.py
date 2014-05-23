# -*- coding: utf-8 -*-
import json
import re

morphemePAT = u'(deniz|imiz|diʃ|ʤɪk|den|ler|ev|el|in|de|im|e)'

turkRE = re.compile(morphemePAT)
w = u"elʤɪklerimizin"

print '-'.join(turkRE.findall(w))
