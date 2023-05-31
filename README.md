# RestfulAPI-ClinicSearch
**RESTful API endpoint(s) to allow search in multiple clinic providers.**

This project is a simple application to carry out searches of veterinary and dental clinics present at the following addresses:
https://storage.googleapis.com/scratchpay-code-challenge/dental-clinics.json
https://storage.googleapis.com/scratchpay-code-challenge/vet-clinics.json

These clinics have attributes such as name, state in which they are located and availability.

**How to do a search**

To perform a search, consider the following example data:
Clinic name: Good Health Home
State: Alaska
Availability: 10:00-19:30

When doing the search, you must structure the endpoint as follows:
http://localhost:3000/api/clinic?name=Good+Health+Home&state=Alaska&from=10:00&to=19:30
Where localhost is the machine's local address and 3000 is the server port.

**Evaluation metrics**
- Simple, clear, readable code
	- As it is a small application, there was no need to create other files besides the main one. The code was separated into regions, making it easier to understand.
- Correctness
	- The application performs the search operations correctly. The treatment of the case where the user can type the name of the entire state or just its abbreviation was treated. The case in which the clinic has a name with more than one word was also treated. Improvements could be made to handle cases where the search is not done using the parameters correctly or there are errors in the HTTP responses.
- Security 
	- As it is a basic application, no treatments were made regarding the vulnerability of the application.
- Memory efficiency
	- For large datasets, a database could be used to manage and store the information, since the implementation was done by storing the data in memory.
- Documentation
	- The code has been organized and can be understood by without requiring additional documentation
