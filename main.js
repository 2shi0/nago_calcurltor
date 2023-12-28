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

    var net_value = 0;
    var f_s, f_ss, f_sss;

    for (var i = 0; i < command_name_array.length; i++) {
        // 表の行を作成
        const row = document.createElement("tr");

        var str = String(textbox_element.value);
        var target_str = String(command_name_array[i])
        var count = (str.match(new RegExp(target_str, "g")) || []).length;

        switch (target_str) {
            case "f.S":
                f_s = count;
                break;
            case "f.SS":
                f_ss = count;
                break;
            case "f.SSS":
                f_sss = count;
                break;
            default:
                if (count > 0) {
                    console.log(target_str + ": " + count);
                }
                net_value += Number(results[target_str]) * count;
                break;
        }

        if (count > 0) {
            for (let j = 0; j < 3; j++) {
                // <td> 要素とテキストノードを作成し、テキストノードを
                // <td> の内容として、その <td> を表の行の末尾に追加
                const cell = document.createElement("td");
                let cellText;
                switch (j) {
                    case 0:
                        cellText = document.createTextNode(target_str);
                        break;
                    case 1:
                        cellText = document.createTextNode(count);
                        break;
                    case 2:
                        cellText = document.createTextNode(results[target_str]);
                        break;
                }

                cell.appendChild(cellText);
                row.appendChild(cell);
            }

            // 表の本体の末尾に行を追加
            tbl_body.appendChild(row);
        }

    }
    f_s = f_s - f_ss - f_sss;
    f_ss = f_ss - f_sss;

    if (f_s > 0) console.log("f.S: " + f_s);
    if (f_ss > 0) console.log("f.SS: " + f_ss);
    if (f_sss > 0) console.log("f.SSS: " + f_sss);

    net_value += Number(results["f.S"]) * f_s + Number(results["f.SS"]) * f_ss + Number(results["f.SSS"]) * f_sss;

    net_blood_gain = document.getElementById("net");
    net_blood_gain.innerHTML = net_value;

    // <tbody> を <table> の中に追加
    tbl.appendChild(tbl_body);
    // <table> を <body> の中に追加
    document.body.appendChild(tbl);
    // tbl の border 属性を 2 に設定
    tbl.setAttribute("border", "2");
}