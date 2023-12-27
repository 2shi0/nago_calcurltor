const url = "blood.json";    // JSONファイル名
let result;

// 起動時の処理
window.addEventListener("load", () => {
    fetch(url)
        .then(response => {
            return response.json();
        })
        .then(json_data => {
            result = json_data;
        });
});


function on_calc_button_click() {

    let textbox_element = document.getElementById("combo_text_box");
    max_blood_gain = document.getElementById("max");
    max_blood_gain.innerHTML = textbox_element.value;
    net_blood_gain = document.getElementById("net");
    net_blood_gain.innerHTML = textbox_element.value;

    console.log(result["236K"]);
}