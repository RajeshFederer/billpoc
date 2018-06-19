'use strict';

const express = require('express');
const request = require('request');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');
let action = require('./lib/action');

const app = express();

const port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/chatDialogflowAPI', function (req, res) {
	console.log('I am In', req.query);
	var options = {
		method: 'POST',
		url: 'https://api.api.ai/v1/query?v=20150910',
		headers: {
			"Authorization": "Bearer aa3c4bf166e14cdbaa1d46d3a3fbe4b4"
		},
		body: JSON.parse(req.query),
		json: true
	};
	request(options, function (error, response, body) {
		if (error) {
			res.json({ error: "error in chat server api call" }).end();
		} else {
			
			if(body.result && body.result.action && body.result.action=='discount'){

				body.result.fulfillment.messages[2].speech = '<a class="pdfClass" data-toggle="modal" data-target="#fundModal">Click here</a> to refer the discount chart for more details'
				res.json(body).end();
			} else if(body.result && body.result.action && body.result.action =="riskClass"){
				
				let riskClass = body.result.parameters && body.result.parameters.RiskClass ? body.result.parameters.RiskClass : null;
				console.log('YEAH', riskClass, body.result.parameters);
				if(riskClass){

					var options = {
						method: 'POST',
						url: "http://10.76.1.53:7999/aa/industry",
						headers: {},
						body: {"code": riskClass},
						json: true
					};
					request(options, function (error, response, responseBody) {
						if (error) {
							console.log('ERROR IN GUIDEWIRE API CALL');
							res.json(body).end();
						} else {
							console.log('SUCCESS IN GUIDEWIRE API CALL', response, responseBody);
							if(responseBody && responseBody.description){
								body.result.fulfillment.messages[0].speech = body.result.fulfillment.messages[0].speech.replace('Candy & Confectionery Products Manufacturing', responseBody.description);
							}
							res.json(body).end();
						}
					});					
				} else {
					res.json(body).end();
				}
			} 
			else{
				res.json(body).end();
			}
		}
	});
});

app.post('/', (req, res) => {
    console.log('INC REQUEST', JSON.stringify(req.body));
    return action[req.body.queryResult.action](req, res);
});

app.listen(port, function () {
  console.log('AGENT is running my app on  PORT: ' + port);
});
