{\rtf1\ansi\ansicpg1252\cocoartf2706
\cocoatextscaling0\cocoaplatform0{\fonttbl\f0\fswiss\fcharset0 Helvetica;\f1\fswiss\fcharset0 Helvetica-Bold;}
{\colortbl;\red255\green255\blue255;}
{\*\expandedcolortbl;;}
\paperw11900\paperh16840\margl1440\margr1440\vieww11520\viewh8400\viewkind0
\pard\tx720\tx1440\tx2160\tx2880\tx3600\tx4320\tx5040\tx5760\tx6480\tx7200\tx7920\tx8640\pardirnatural\partightenfactor0

\f0\fs24 \cf0 Lectios is a simple-to-implement online book catalog software for a library. A library just needs to upload a list of book titles and accession number, the software will display book details such as author(s), description, title and cover image with the help of Google's books API. Search is limited to title search, this allows for a simple database based system without the need for a full search engine.\
\

\f1\b Architecture
\f0\b0 \
\
The project currently runs on AWS. The front end is HTML, CSS and JS and is hosted on S3 with a CloudFront based CDN in front. The backend is implemented using API Gateway, Lambda and DynamoDB. In this implementation all services are server-less, for easier maintenance, and lower costs for what would presumably be a low volume and intermittent usage. \
\
Note: this project could be hosted elsewhere - the front end just needs an API to fetch books that match a search term; this API can be implemented on any cloud service.\
\

\f1\b How to install\

\f0\b0 \

\f1\b Database
\f0\b0 \
\
Create a database called "lectios" in DynamoDB with partition key "school" (in case you want a multi-school system) and sort key "accno". Import data into DynamoDB using a CSV file. The CSV file should have data with 3 columns - school, accno, title.\
\

\f1\b Lambda\

\f0\b0 \
Implement a Lambda function with the code provided. Select runtime as NodeJS 18.x. \
\

\f1\b API Gateway\

\f0\b0 \
Deploy an API with a GET method for "/". The method request should have a required URL query string parameter "q". The integration request should have a mapping template: \{ "school": "$input.params('school')","expression": "$input.params('expression')"\}.\
\
The URL of your API deployment should be configured in search.js (line 2) in the front end app. \
\

\f1\b Front End\

\f0\b0 \
Configure API URL (line 2), this is the URL of your API deployment in API Gateway. Configure the school code (line 23), this is the school code imported as partition key in your DynamoDB table.}