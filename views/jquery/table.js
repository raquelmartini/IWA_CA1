

$(document).ready(function () {
    draw_table();
})


function draw_table() {
    $("#results").empty();
    $.getJSONuncached = function (url) {
        return $.ajax(
            {
                url: url,
                type: 'GET',
                cache: false,
                success: function (jsonArray) {
                    jsonToDOM("#results", jsonArray);
                  //  select_row();
                }
            });
    };
    $.getJSONuncached("/read")
}

function select_row() {
    $("#menuTable tbody tr[id]").click(function () {
        $(".selected").removeClass("selected");
        $(this).addClass("selected");
        var id = $(this).attr("id");
        delete_row(id);
    });
}

function create_row(name, isVegetarian) {

    $.ajax({
        url: "/create",
        type: "POST",
        data: {
            name: name,
            price: $('#entree_price').val(),
            section: $('#entree_section').val(),
            vegetarian: isVegetarian,
            createdby: $('#entree_createdby').val()
        },
        cache: false,
        success: setTimeout(draw_table, 1000)
    });
}

function removeAllChildren(cssSelector) {
    let child = cssSelector.lastElementChild;
    while (child) {
        cssSelector.removeChild(child);
        child = cssSelector.lastElementChild;
    }
}

/**
 * Takes a array of JSON objects returned from the server API (read) and converts to a HTML table
 * 
 * @param cssSelectorParent CSS selector of the HTML element to append the table to
 * @param jsonEntreeArray Array of JSON objects (entrees)
 */
function jsonToDOM(cssSelectorParent, jsonEntreeArray) {

    jsonEntreeArray.sort((a, b) => (a.section - b.section));

    let headingsArray = ["Select", "Item", "Price per item(EU)"];
    let sectionTitleArray = ["Yoy's Burgers", "Snack Attack", "Step to the Side", "Signature Shakes", "Classic Shakes"];

    let parent = document.querySelector(cssSelectorParent);
    removeAllChildren(parent);

    let df = document.createDocumentFragment();
    let table = document.createElement("table");
    table.setAttribute("id", "menuTable");
    table.setAttribute("class", "indent");

    //heading
    let table_head = document.createElement("thead");
    let tr = document.createElement("tr");
    tr.setAttribute("style", "color: #fff; background: #2c3e50;");

    for (let heading of headingsArray) {
        let th = document.createElement("th");
        th.innerText = heading;
        tr.appendChild(th);
    }
    table_head.appendChild(tr);
    table.appendChild(table_head);

    //section
    let count = 0;
    let td = null;
    let input = null;
    let itemNumber = 0;
    let currentSection = -1;
    let tbody = document.createElement("tbody");

    let selectionParent = document.querySelector("#entree_section.form-control");
    removeAllChildren(selectionParent);
    let selectionIndex = 0;
    for (let selectionTitle of sectionTitleArray) {
        let option = document.createElement("option");
        option.innerText = selectionTitle;
        option.setAttribute("value", selectionIndex++);
        selectionParent.appendChild(option);
    }

    for (let entree of jsonEntreeArray) {
        if (entree.section != currentSection) {
            tr = document.createElement("tr");
            tr.setAttribute("style", "color: #fff; background-color:#1abc9c");
            td = document.createElement("td");
            td.setAttribute("colspan", "3");
            td.innerHTML = "<b>" + sectionTitleArray[entree.section] + "</b>";
            tr.appendChild(td);
            tbody.appendChild(tr);
            currentSection = entree.section;
            count = 1;
        }

        tr = document.createElement("tr");
        tr.setAttribute("id", entree._id);
        tr.setAttribute("vegetarian", entree.vegetarian ? "true" : "false");

        td = document.createElement("td");
        td.setAttribute("align", "center");
        input = document.createElement("input");
        input.type = "checkbox";
        input.name = entree._id;
        input.value = 1;
        input.setAttribute("class", "dish-input-select");
        td.appendChild(input);
        tr.appendChild(td);

        td = document.createElement("td");
        td.innerText = entree.name;
        tr.appendChild(td);

        td = document.createElement("td");
        td.setAttribute("align", "right");
        td.innerText = entree.price;
        tr.appendChild(td);

        tbody.appendChild(tr);
    }

    if (jsonEntreeArray.length == 0) {
        tr = document.createElement("tr");
        tr.setAttribute("align", "center");
        td = document.createElement("td");
        td.setAttribute("colspan", "3");
        td.innerHTML = `<b>There are no menu entrees</b>`;
        tr.appendChild(td);
        tbody.appendChild(tr);
    }

    table.appendChild(tbody);
    df.appendChild(table);
    parent.appendChild(df);
}

/**
    * Validates and submits the dishes form
    */
function submitDish() {
    //added this because regular expressions in HTML did not prevent submission if invalid
    if (validateForm()) {
        //problems accessing checkbox so added this code
        create_row(capitalizeFirstLetter(document.forms["addEntreeForm"]["entree_name"].value),
            document.getElementById("entree_vegetarian").checked);
    }
}

/**
 * Validate the dishes form
 * @returns true if valid
 */
function validateForm() {
    let name = document.forms["addEntreeForm"]["entree_name"].value;
    if (name.match("^([A-Za-z]{1}[A-Za-z0-9\s]{0,64})") == null) {
        return false;
    }

    let price = document.forms["addEntreeForm"]["entree_price"].value;
    if (price.match("^(([1-9][0-9]{0,4})|([0-9][0-9]{0,4}\.[0-9]{1,2}))$") == null) {
        return false;
    }

    return true;
}

/**
 * Capitalise the first letter of a string
 * @returns String in first letter capitalized format
 * @tutorial https://stackoverflow.com/questions/32589197/capitalize-first-letter-of-each-word-in-a-string-javascript/45620677
 */
function capitalizeFirstLetter(str) {
    str = str.trim();
    var splitStr = str.toLowerCase().split(' ');
    for (var i = 0; i < splitStr.length; i++) {
        splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
    }
    return splitStr.join(' ');
}

function deleteDish() {
    let checkedCount = 0;
    let idArray = new Array();
    let rows = document.querySelectorAll("input.dish-input-select");
    for (let row of rows) {
        if (row.checked){
            checkedCount++;
            idArray.push(row.name);
        }
           
    }

    console.log("deleting..."  + idArray);

    //only delete if something is selected
    if (checkedCount > 0) {
        $.ajax(
            {
                url: "/delete/many",
                type: "DELETE",
                data: JSON.stringify(idArray),
                contentType: "application/json",
                processData: false,
                cache: false,
                success: setTimeout(draw_table, 1000)
            })
    }
}

