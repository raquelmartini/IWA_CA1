
function draw_table() {
    $("#results").empty();
    $.getJSONuncached = function (url) {
        return $.ajax(
            {
                url: url,
                type: 'GET',
                cache: false,
                success: function (jsonArray) {
                    //$("#results").append(jsonArray);
                    convertJSONAndAddToDOM("#results", jsonArray);
                    select_row();
                }
            });
    };
    $.getJSONuncached("/web/read")
}

function select_row() {
    $("#menuTable tbody tr[id]").click(function () {
        $(".selected").removeClass("selected");
        $(this).addClass("selected");
        var section = $(this).prevAll("tr").children("td[colspan='3']").length - 1;
        var id = $(this).attr("id");
        delete_row(id);
    })
}

function create_row() {

    console.log("creating...");
    
    $.ajax({
        url: "web/create",
        type: "POST",
        data: { 
            name: $('#entree_name').val(), 
            price: $('#entree_price').val() 
        },
        success: setTimeout(draw_table, 1000),
        error: function (jqXhr, textStatus, errorThrown) {
            console.log(errorThrown);
        }
    });

}

function delete_row(id) {
    $("#delete").click(function () {
        $.ajax(
            {
                url: "web/delete",
                type: "POST",
                data:
                {
                    id: id
                },
                cache: false,
                success: setTimeout(draw_table, 1000)
            })
    })
}

function convertJSONAndAddToDOM(cssSelectorParent, jsonEntreeArray) {

    let parent = document.querySelector(cssSelectorParent);

    let child = parent.lastElementChild;
    while (child) {
        parent.removeChild(child);
        child = parent.lastElementChild;
    }

    let df = document.createDocumentFragment();

    let table = document.createElement("table");
    table.setAttribute("id", "menuTable");
    table.setAttribute("class", "indent");

    //heading
    let table_head = document.createElement("thead");
    let tr = document.createElement("tr");
    tr.setAttribute("style", "color: #fff; background: #2c3e50;");

    let headingsArray = ["Select", "Item", "Price per item(EU)"];
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
    let itemNumber = 0;
    let currentSectionName = null;
    let tbody = document.createElement("tbody");

    for (let entree of jsonEntreeArray) {
        if (entree.section != currentSectionName) {
            tr = document.createElement("tr");
            tr.setAttribute("style", "color: #fff; background-color:#1abc9c");
            td = document.createElement("td");
            td.setAttribute("colspan", "3");
            td.innerHTML = `<b>${entree.section}</b>`;
            tr.appendChild(td);
            tbody.appendChild(tr);
            currentSectionName = entree.section;
            count = 1;
        }

        tr = document.createElement("tr");
        tr.setAttribute("id", entree._id);
        tr.setAttribute("vegetarian", entree.vegetarian ? "true" : "false");
        td = document.createElement("td");
        td.setAttribute("align", "center");
        td.innerHTML = `<input name="item${itemNumber}" type="checkbox"/>`;
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

$(document).ready(function () {
    draw_table();
})


