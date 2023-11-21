function replaceAt(string, index, replace) 
{
    return string.substring(0, index) + replace + string.substring(index + 1);
}
function processNumber(number)
{
    if (number.length >= 9)
    {
        number = replaceAt(number, 7,"*");
        number = replaceAt(number, 8,"*");
        number = replaceAt(number, 9,"*");
    }
    
    return number;
}

function fillNumbers()
{
    const fs = require("fs");

    var fileContent = fs.readFileSync("Data/grounds.json", "utf8");
    var jsonObject = JSON.parse(fileContent);

    console.log(jsonObject);
    
    for (var i = 0; i < jsonObject.groundsList.length; i++) 
    {
        for (var j = 0; j < jsonObject.groundsList[i].phoneNumbers.length; j++) 
        {
            jsonObject.groundsList[i].phoneNumbers[j].number = processNumber(jsonObject.groundsList[i].phoneNumbers[j].number);
        }
    }

    var newJsonObject = JSON.stringify(jsonObject, null, '\t');
    console.log(newJsonObject);

    fs.writeFileSync("Data/safe-grounds.json", newJsonObject);
}

fillNumbers();
