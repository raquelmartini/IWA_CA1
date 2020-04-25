// function draw_table()
// {
// 	$("#results").empty();
// 	$.getJSONuncached = function (url)
// 	{
// 		return $.ajax(
// 		{
// 			url: url,
// 			type: 'GET',
// 			cache: false,
// 			success: function (html)
// 			{
//                 console.log(html);
// 				$("#results").append(html);
// 				select_row();
// 			}
// 		});
// 	};
// 	$.getJSONuncached("get/html")
// };

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
    $.getJSONuncached("get/html")
};

function select_row() {
    $("#menuTable tbody tr[id]").click(function () {
        $(".selected").removeClass("selected");
        $(this).addClass("selected");
        var section = $(this).prevAll("tr").children("td[colspan='3']").length - 1;
        var entree = $(this).attr("id") - 1;
        delete_row(section, entree);
    })
};

function delete_row(sec, ent) {
    $("#delete").click(function () {
        $.ajax(
            {
                url: "post/delete",
                type: "POST",
                data:
                {
                    section: sec,
                    entree: ent
                },
                cache: false,
                success: setTimeout(draw_table, 1000)
            })
    })
};

function convertJSONAndAddToDOM(cssSelectorParent, jsonEntreeArray) {

    console.log(jsonEntreeArray);
    
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
        tr.setAttribute("id", count++);
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

    table.appendChild(tbody);
    df.appendChild(table);

    let anchor = document.querySelector(cssSelectorParent);
    anchor.appendChild(df);
}

$(document).ready(function () {
    draw_table();
});


