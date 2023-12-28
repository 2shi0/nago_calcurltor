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

    let textbox_element = document.getElementById("combo_text_box");

    var net_value = 0;
    var f_s, f_ss, f_sss;

    for (var i = 0; i < command_name_array.length; i++) {
        var str = String(textbox_element.value);
        var target_str = String(command_name_array[i])
        var count = (str.match(new RegExp(target_str, "g")) || []).length;

        //f.S処理
        switch (target_str) {
            case "f.S":
                console.log("f.S:"+count);
                f_s = count;
                break;
            case "f.SS":
                console.log("f.SS:"+count);
                f_ss = count;
                break;
            case "f.SSS":
                console.log("f.SS:"+count);
                f_sss = count;
                break;
            default:
                net_value += Number(results[target_str]) * count;
                if (count > 0) {
                    console.log(target_str + ": " + count);
                }
                break;
        }
    }
    f_s = f_s - f_ss - f_sss;
    f_ss = f_ss - f_sss;

    net_value += Number(results["f.S"]) * f_s + Number(results["f.SS"]) * f_ss + Number(results["f.SSS"]) * f_sss;

    net_blood_gain = document.getElementById("net");
    net_blood_gain.innerHTML = net_value;

}