import csv

d = {}
col0 = [] #First column of edge file
col1 = [] #Second column of edge file

fileName = "data/facebook/0.edges"

with open(fileName, 'r') as f:
	for line in f:
		(key, val) = line.split(" ")
		col0.append(int(key))
		t_val = val.rstrip()
		col1.append(int(t_val))

d = zip(col0, col1) #Each element in d is tuple

#To access either element, for i(to get key) and then i[0](to get value)
with open("data/csvfiles/edges0.csv", 'w') as csvfile:
		fieldnames = ['first_node', 'second_node']
		writer = csv.DictWriter(csvfile, fieldnames=fieldnames)
		writer.writeheader()

		for pair in d:
			writer.writerow({'first_node': pair[0], 'second_node': pair[1]})


