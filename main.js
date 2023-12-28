const url = "blood.json";
let results;
let command_name_array;

window.addEventListener("load", () => {
    fetch(url)
        .then(response => {
            return response.json();
        })
        .then(json_data => {
            results = json_data;
            command_name_array = Object.keys(results);
        });
});

function on_calc_button_click() {
    //テキストボックス取得
    let textbox_element = document.getElementById("combo_text_box");

    //表取得
    tbl = document.getElementById("bop_table");
    tbl_body = document.getElementById("bop_tbody");

    //表初期化
    while (tbl.rows.length > 0) tbl.deleteRow(0);
    let row_1 = document.createElement("tr");
    let heading_1 = document.createElement("th");
    heading_1.innerHTML = "Command Name";
    let heading_2 = document.createElement("th");
    heading_2.innerHTML = "Blood Gain";
    let heading_3 = document.createElement("th");
    heading_3.innerHTML = "Number of Times";

    row_1.appendChild(heading_1);
    row_1.appendChild(heading_2);
    row_1.appendChild(heading_3);
    tbl_body.appendChild(row_1);

    var net_value = 0;
    var f_s, f_ss, f_sss;

    for (var i = 0; i < command_name_array.length; i++) {
        // 表の行を作成
        const row = document.createElement("tr");

        var str = String(textbox_element.value);
        var target_str = String(command_name_array[i])
        var count = (str.match(new RegExp(target_str, "g")) || []).length;

        switch (String(target_str)) {
            case "f.S":
                count = count - f_ss;
                break;
            case "f.SS":
                f_ss = count;
                count = count - f_sss;
                break;
            case "f.SSS":
                f_sss = count;
                break;
        }
        net_value += Number(results[target_str]) * count;

        if (count > 0) {
            for (let j = 0; j < 3; j++) {
                const cell = document.createElement("td");
                let cellText;
                switch (j) {
                    case 0:
                        cellText = document.createTextNode(target_str);
                        break;
                    case 1:
                        cellText = document.createTextNode(results[target_str]);
                        break;
                    case 2:
                        cellText = document.createTextNode(count);
                        break;
                }

                cell.appendChild(cellText);
                row.appendChild(cell);
            }

            // 表の本体の末尾に行を追加
            tbl_body.appendChild(row);
        }
    }

    net_blood_gain = document.getElementById("net");
    net_blood_gain.innerHTML = net_value;

    // <tbody> を <table> の中に追加
    tbl.appendChild(tbl_body);
    // <table> を <body> の中に追加
    document.body.appendChild(tbl);
    // tbl の border 属性を 2 に設定
    tbl.setAttribute("border", "2");
}