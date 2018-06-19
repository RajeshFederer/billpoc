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
app.use(cookieParser());
app.use(session({
  secret: 'secret',
  resave: false,
  saveUninitialized: true
}));


router.post('/dialogflowAPI', function (req, res) {
	var options = {
		method: 'POST',
		url: "https://api.api.ai/v1/query?v=20150910",
		headers: {
			"Authorization": "Bearer aa3c4bf166e14cdbaa1d46d3a3fbe4b4"
		},
		body: req.body,
		json: true
	};
	request(options, function (error, response, body) {
		if (error) {
			res.json({ error: "error in chat server api call" }).end();
		} else {
			
			if(body.result && body.result.action && body.result.action=='discount.discount-custom'){

				let resolvedQuery = body.result.resolvedQuery;
				let count = resolvedQuery.split(',').length;

				if(count <4){
					body.result.fulfillment.messages[0].speech = body.result.fulfillment.messages[0].speech.replace('2  coverage', count+' coverage')
					body.result.fulfillment.messages[2].speech = '<a class="pdfClass" data-toggle="modal" data-target="#fundModal">Click here</a> to refer the discount chart for more details'
				} else {
					body.result.fulfillment.messages[1].speech = "We already offering an exciting <b>20% discount</b> for a minimum of <b>4 coverage</b> sections";
					body.result.fulfillment.messages.splice(0,1);
					body.result.fulfillment.messages[1].speech = '<a class="pdfClass" data-toggle="modal" data-target="#fundModal">Click here</a> to refer the discount chart for more details'
				}
				res.json(body).end();
			} else if(body.result && body.result.action && body.result.action == "selectDeductible" || body.result && body.result.action && body.result.action == "others"){
				body.result.fulfillment.messages[0].speech = body.result.fulfillment.messages[0].speech.replace('Click here', '<a>Click here</a>')
				res.json(body).end();
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
