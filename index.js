var jsonObject;

window.onload = () => 
{
    initizlizeData();
};

function onChangeHandler(groundName)
{
    fillTable(groundName);
};

function initizlizeData()
{
    //fetch("../Data/safe-grounds.json")
    fetch("https://sun-street.github.io/Data/safe-grounds.json")
        .then(response => response.json())
        .then(json => 
                {
                    jsonObject = json;
                    fillSelector();
                    fillTable("Все участки")
                }
            );
};

function fillSelector()
{
    var innerHtml = "<option selected>Все участки</option>";

    for (var i = 0; i < jsonObject.groundsList.length; i++) 
    {
        innerHtml += '<option value="' + jsonObject.groundsList[i].number + '">' + jsonObject.groundsList[i].number + '</option>';
    }
    
    document.getElementById("select").innerHTML = innerHtml;
};

function fillTable(groundName)
{
    var innerHtml = "";
    var phoneNumbersCount = 0;
    var delegatesCount = 0;
    var realDelegatesCount = 0;
    var withNumbersCount = 0;
    var bS = "";
    var bE = "";

    for (var i = 0; i < jsonObject.groundsList.length; i++) 
    {
        if (groundName == "Все участки" || groundName == jsonObject.groundsList[i].number)
        {
            var modStyle = "";

            if (jsonObject.groundsList[i].type === 1)
            {
                delegatesCount++;

                if (jsonObject.groundsList[i].mod2022_05 > 0) 
                {
                    modStyle = ' style="color:green;"';
                    realDelegatesCount++;
                }
                else 
                {
                    modStyle = ' style="color:red;"';
                    
                }
                
                if (jsonObject.groundsList[i].phoneNumbers[0].number.length > 0) 
                {
                    withNumbersCount++;
                }

                bS = "<b>";
                bE = "</b>";
            }

            var maxIndex = jsonObject.groundsList[i].phoneNumbers.length - 1;
            innerHtml += "<tr>"

            innerHtml += "<td>" + (i+1) + "</td>";
            innerHtml += "<td" + modStyle + ">" + bS + jsonObject.groundsList[i].number + bE + "</td>";
            innerHtml += "<td>" + jsonObject.groundsList[i].name + "</td>";

            innerHtml += "<td>"

            for (var j = 0; j < jsonObject.groundsList[i].phoneNumbers.length; j++) 
            {
                innerHtml += fillTableColumn(jsonObject.groundsList[i].phoneNumbers[j].cellNumber, maxIndex)
            }

            innerHtml += "</td>"
            innerHtml += "<td>"

            for (var j = 0; j < jsonObject.groundsList[i].phoneNumbers.length; j++) 
            {
                innerHtml += fillTableColumn(jsonObject.groundsList[i].phoneNumbers[j].number, maxIndex)

                if(jsonObject.groundsList[i].phoneNumbers[j].number.length > 0)
                {
                    phoneNumbersCount++;
                }
            }

            innerHtml += "<td" + modStyle + ">" + bS + jsonObject.groundsList[i].mod2022_05 + bE + "</td>";

            innerHtml += "</td>"
            innerHtml += "</tr>";
        }
    }
    
    document.getElementById("tbody").innerHTML = innerHtml;

    var footer = "<b>Представителей участков: " + delegatesCount + ", с номерами: " + withNumbersCount + ", действующих: " + realDelegatesCount + " Всего номеров: " + phoneNumbersCount + "</b>";
    document.getElementById("footer").innerHTML = footer;
};

function fillTableColumn(columnContent, newLineRequired)
{
    var result = columnContent;

    if(newLineRequired)
    {
        result += "</br>";
    }

    return result;
};