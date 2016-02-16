from __future__ import division
import random
import csv

index = []
results = []
j = 0

for i in range(0,1000):
	if random.randint(0,1) == 1:
		j = j + 1
	#print j / (i + 1)
	r = j / (i + 1)
	index.append(i + 1)
	results.append(r)

with open('data.csv', 'wb') as csvfile:
    writer = csv.writer(csvfile, delimiter=',', quotechar='|', quoting=csv.QUOTE_MINIMAL)
    for i in range(0,len(index)):
    	writer.writerow([index[i], results[i]])