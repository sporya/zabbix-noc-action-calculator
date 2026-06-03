try {
    var params = JSON.parse(value);
    var tagsArray = JSON.parse(params.EventTags || "[]");
    var hostScore = null;
    var incidentScore = null;
    
    for (var i = 0; i < tagsArray.length; i++) {
        if (tagsArray[i].tag === "Host Score") {
            hostScore = parseInt(tagsArray[i].value, 10);
        }
        if (tagsArray[i].tag === "IncidentScore") {
            incidentScore = parseInt(tagsArray[i].value, 10);
        }
    }
    
     if (hostScore === null || incidentScore === null) {
        Zabbix.log(4, '[ NOC Webhook ] Missing HostScore or IncidentScore. Exiting.');
        return JSON.stringify({ status: "skipped" });
    }
    
    var riskScore = hostScore * incidentScore;
    var nocAction = "";

        if (riskScore >= 25 ) {
        nocAction = "P1: Announce -> Call -> Ticket";
    } else if (riskScore >= 18 ) {
        nocAction = "P2: Announce -> Ticket -> Call";
    } else if (riskScore >= 7 ) {
        nocAction = "P3: Announce -> Ticket";
    } else  {
        nocAction = "P4: Announce";
    }
    
    var result = {
        tags: {
            "RiskScore": riskScore.toString(),
           "Noc Action": nocAction
        }
   };
    
    Zabbix.log(4, '[ NOC Webhook ] Calculated Risk: ' + riskScore + ', Action: ' + nocAction);
     return JSON.stringify(result);
} catch (error) {
    Zabbix.log(3, '[ NOC Webhook ] ERROR: ' + error);
    throw 'Failed to calculate NOC Action: ' + error;
}
