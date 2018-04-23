'use strict';

let action = {};

action.bookTicket = (req, res) => {
    
    let policyNo, policyInfo;
    let parameters = req.body.queryResult.parameters;
    let homeTeam = parameters.homeTeam || "Home";
    let awayTeam = parameters.awayTeam || "Team"
    console.log('in book ticket', parameters, homeTeam, awayTeam);
    let resMsg = {
        "fulfillmentText": "Your Tickets has been booked for " + homeTeam + "vs" + awayTeam,
        "fulfillmentMessages": [{
            "text": {
                "text": [
                  "Your Tickets has been booked for " + homeTeam + "vs" + awayTeam,
                  "Have a good match !"
                ]
            }
        }]
    };
    return res.json(resMsg);

};

module.exports = action;