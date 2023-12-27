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

    for (var i = 0; i < command_name_array.length; i++) {
        var str = String(textbox_element.value);
        var target_str = String(command_name_array[i])
        var count = (str.match(new RegExp(target_str, "g")) || []).length;
        //console.log(target_str + ":" + String(count));
        net_value += Number(results[target_str])*count
    }

    net_blood_gain = document.getElementById("net");
    net_blood_gain.innerHTML = net_value;

}