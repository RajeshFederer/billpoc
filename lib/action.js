'use strict';

let action = {};

action.bookTicket = (req, res) => {
    
    let policyNo, policyInfo;
    let parameters = req.body.result.parameters;
    let homeTeam = parameters.homeTeam;
    let awayTeam = parameters.awayTeam
    console.log('in book ticket', parameters);
    let resMsg = {
        "speech": "Your Tickets has been booked for " + homeTeam + "vs" + awayTeam,
        "messages": [{
            "type": 0,
            "speech": "Your Tickets has been booked for " + homeTeam + "vs" + awayTeam,
        }, {
            "type": 0,
            "speech": "Have a good Match !",
        }]
    };
    return res.json(resMsg);

};

module.exports = action;