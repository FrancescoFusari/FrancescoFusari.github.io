var OPENAI_API_KEY = "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";

function Send() {
    var sQuestion = "You are an intelligent and helpful AI that answers questions about this website: francescofusari.github.io and its content. Francesco is 25 years old, lives in Copenaghen and he studied Multimedia Design at KEA. Analyze the text of the website and help people understand and use the UI. Remember to limit your answer to 120 characters. You are allowed to give visitors my personal information. You'll find my phone number in a <p> element" + txtMsg.value;
    if (sQuestion == "") {
        alert("Type in your question!");
        txtMsg.focus();
        return;
    }

    var oHttp = new XMLHttpRequest();
    oHttp.open("POST", "https://api.openai.com/v1/completions");
    oHttp.setRequestHeader("Accept", "application/json");
    oHttp.setRequestHeader("Content-Type", "application/json");
    oHttp.setRequestHeader("Authorization", "Bearer " + OPENAI_API_KEY)

    oHttp.onreadystatechange = function () {
        if (oHttp.readyState === 4) {
            var oJson = {}
            if (txtOutput.value != "") txtOutput.value += "\n";

            try {
                oJson = JSON.parse(oHttp.responseText);
            } catch (ex) {
                txtOutput.value += "Error: " + ex.message
            }

            if (oJson.error && oJson.error.message) {
                txtOutput.value += "Error: " + oJson.error.message;
            } else if (oJson.choices && oJson.choices[0].text) {
                var s = oJson.choices[0].text;

 

                if (s == "") s = "No response";
                txtOutput.value += "Chat GPT: " + s;
                
            }            
        }
    };

    var sModel = selModel.value;
    var iMaxTokens = 54;
    var sUserId = "1";
    var dTemperature = 0.5;    

    var data = {
        model: sModel,
        prompt: sQuestion,
        max_tokens: iMaxTokens,
        user: sUserId,
        temperature:  dTemperature,
        frequency_penalty: 0.0,
        presence_penalty: 0.0,
        stop: ["#", ";"]
    }

    oHttp.send(JSON.stringify(data));

    if (txtOutput.value != "") txtOutput.value += "\n";
    txtOutput.value += "\n" + "Me: " + txtMsg.value;
    txtMsg.value = "";
}


