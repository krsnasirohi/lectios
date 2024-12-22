Lectios is a simple-to-implement online book catalog software for a library. A library just needs to upload a list of book titles and accession number, the software will display book details such as author(s), description, title and cover image with the help of Google's books API. Search is limited to title search, this allows for a simple database based system without the need for a full search engine.

Architecture

- The project currently runs on AWS. The front end is HTML, CSS and JS and is hosted on S3 with a CloudFront based CDN in front. The backend is implemented using API Gateway, Lambda and DynamoDB. In this implementation all services are server-less, for easier maintenance, and lower costs for what would presumably be a low volume and intermittent usage. \

Note: this project could be hosted elsewhere - the front end just needs an API to fetch books that match a search term; this API can be implemented on any cloud service.\

How to install

- Database
  - Create a database called "lectios" in DynamoDB with partition key "school" (in case you want a multi-school system) and sort key "accno". Import data into DynamoDB using a CSV file. The CSV file should have data with 3 columns - school, accno, title.

- Lambda
  - Implement a Lambda function with the code provided. Select runtime as NodeJS 18.x. 

- API Gateway
  - Deploy an API with a GET method for "/". The method request should have a required URL query string parameter "q". The integration request should have a mapping template: \{ "school": "$input.params('school')","expression": "$input.params('expression')"\}.
  - The URL of your API deployment should be configured in search.js (line 2) in the front end app. 

- Front End
  - Configure API URL (line 2), this is the URL of your API deployment in API Gateway. Configure the school code (line 23), this is the school code imported as partition key in your DynamoDB table.}
