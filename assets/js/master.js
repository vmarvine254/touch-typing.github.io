// home row
let f_j = ["f", "j"];
let d_k = ["d", "k"];
let s_l = ["s", "l"];
let a_semicolon = ["a", ";"];
let g_h = ["g", "h"];
let home_row = f_j.concat(d_k, s_l, a_semicolon, g_h);

// top row
let q_p = ["q", "p"];
let w_o = ["w", "o"];
let e_i = ["e", "i"];
let r_u = ["r", "u"];
let t_y = ["t", "y"];
let top_row = q_p.concat(w_o, e_i, r_u, t_y);

// bottom row
let z_forward_slash = ["z", "/"];
let x_fullstop = ["x", "."];
let c_comma = ["c", ","];
let v_m = ["v", "m"];
let b_n = ["b", "n"];
let bottom_row = z_forward_slash.concat(x_fullstop, c_comma, v_m, b_n);

// fingers
let index_finger = ["y", "u", "h", "j", "n", "m", "r", "t", "f", "g", "v", "b"];
let ring_finger = ["w", "s", "x", "o", "l", "."];
let pinky_finger = ["q", "a", "z", "p", ";", "/"];
let middle_finger = ["e", "d", "c", "i", "k", ","];

let row_keys = home_row.concat(bottom_row, top_row);

let most_typed_letters_1 = ["e", "s", "a", "o", "n", "t"];
let most_typed_letters_2 = ["i", "r", "u", "l", "c", "m", "d"];
let most_typed_letters_3 = ["y", "h", "p", "b", "f", "g"];
let space_array = [""];

let num = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"];
let other_keys_normal = ["-", "=", "`", "[", "]", "'", ",", ".", "/", "\\"];

let most_typed_letters = most_typed_letters_1.concat(most_typed_letters_2, most_typed_letters_3);

var test_cells = document.querySelectorAll(".test-cells");
var letters = document.querySelectorAll(".k-letter");
var normal_keys = document.querySelectorAll(".normal-key");
var shift_keys = document.querySelectorAll(".shift-key");
var time = document.querySelector("#timer");

var overlay = document.querySelector(".overlay");

let capital_letters = [];

for (let i = 0; i < letters.length; i++) {
    capital_letters[i] = letters[i].innerText.toUpperCase();
}

var chosen_time = 60; // seconds
var sec = chosen_time;
let timer_is_counting = false;

var current_click = 0;

var count_mistake = 0;
var count_correct = 0;
var gross_wpm = 0;

var menu_row_content = document.querySelectorAll(".menu-row-content");

var test_array = space_array.concat(home_row, top_row, bottom_row, num, other_keys_normal);

function check_current_url() {
    if (window.location.pathname == "/keys/f-j.html") {
        test_array = space_array.concat(f_j);
    }
    else if (window.location.pathname == "/keys/a-semicolon.html") {
        test_array = space_array.concat(a_semicolon);
    }
    else if (window.location.pathname == "/keys/b-n.html") {
        test_array = space_array.concat(b_n);
    }
    else if (window.location.pathname == "/keys/bottom-keys.html") {
        test_array = space_array.concat(bottom_row);
    }
    else if (window.location.pathname == "/keys/common-1.html") {
        test_array = space_array.concat(most_typed_letters_1);
    }
    else if (window.location.pathname == "/keys/common-2.html") {
        test_array = space_array.concat(most_typed_letters_2);
    }
    else if (window.location.pathname == "/keys/common-3.html") {
        test_array = space_array.concat(most_typed_letters_3);
    }
    else if (window.location.pathname == "/keys/common-all.html") {
        test_array = space_array.concat(most_typed_letters);
    }
    else if (window.location.pathname == "/keys/d-k.html") {
        test_array = space_array.concat(d_k);
    }
    else if (window.location.pathname == "/keys/e-i.html") {
        test_array = space_array.concat(e_i);
    }
    else if (window.location.pathname == "/keys/g-h.html") {
        test_array = space_array.concat(g_h);
    }
    else if (window.location.pathname == "/keys/home-keys.html") {
        test_array = space_array.concat(home_row);
    }
    else if (window.location.pathname == "/keys/index-fingers.html") {
        test_array = space_array.concat(index_finger);
    }
    else if (window.location.pathname == "/keys/middle-fingers.html") {
        test_array = space_array.concat(middle_finger);
    }
    else if (window.location.pathname == "/keys/pinky-fingers.html") {
        test_array = space_array.concat(pinky_finger);
    }
    else if (window.location.pathname == "/keys/q-p.html") {
        test_array = space_array.concat(q_p);
    }
    else if (window.location.pathname == "/keys/r-u.html") {
        test_array = space_array.concat(r_u);
    }
    else if (window.location.pathname == "/keys/ring-fingers.html") {
        test_array = space_array.concat(ring_finger);
    }
    else if (window.location.pathname == "/keys/s-l.html") {
        test_array = space_array.concat(s_l);
    }
    else if (window.location.pathname == "/keys/t-y.html") {
        test_array = space_array.concat(t_y);
    }
    else if (window.location.pathname == "/keys/top-keys.html") {
        test_array = space_array.concat(top_row);
    }
    else if (window.location.pathname == "/keys/v-m.html") {
        test_array = space_array.concat(v_m);
    }
    else if (window.location.pathname == "/keys/w-o.html") {
        test_array = space_array.concat(w_o);
    }
    else if (window.location.pathname == "/keys/x-fullstop.html") {
        test_array = space_array.concat(x_fullstop);
    }
    else if (window.location.pathname == "/keys/z-forward-slash.html") {
        test_array = space_array.concat(z_forward_slash);
    }
    else if (window.location.pathname == "/keys/c-comma.html") {
        test_array = space_array.concat(c_comma);
    }
}

check_current_url();
show_timer();
gen_random_letter(test_array);
active_key_btn(current_click);
setInterval(start_timer, 1000);

document.addEventListener("keydown", listener);

function show_timer() {
    if (!timer_is_counting) {
        time.textContent = sec + " s";
    }
}

function gen_random_letter(test_array) {
    for (let i = 0; i < test_cells.length; i++) {
        gen_num = Math.floor(Math.random() * test_array.length);
        test_cells[i].innerHTML = test_array[gen_num];
    }
}

function active_key_btn(c) {
    for (let k = 0; k < normal_keys.length; k++) {
        if (normal_keys[k].innerText.toLowerCase() == test_cells[c].innerHTML) {
            let key = normal_keys[k].parentNode;
            key.classList.add("chosen");
        } else {
            let key = normal_keys[k].parentNode;
            key.classList.remove("chosen");
        }
    }
}

function start_timer() {
    if (timer_is_counting) {
        if (sec > 0) {
            sec--;
        } else {
            show_results()
        }
        time.textContent = sec + " s";
    }
}

function listener() {
    timer_is_counting = true;

    let chosen_key = document.querySelector(".chosen");

    // check capslock press
    if (event.getModifierState("CapsLock")) {

    }
    // check shift key
    if (event.getModifierState("Shift")) {

    }
    // check enter key
    if (event.key === "Enter") {

    }
    // check tab key
    if (event.key === "Tab") {

    }

    let key_press = event.key.toLowerCase();

    check_key_press(key_press, chosen_key);
    chosen_key.classList.remove("chosen");

    reset_cells();
    active_key_btn(current_click);
    typing_errors();
    words_per_min();
    typing_accuracy();
}

function check_key_press(key_press, chosen_key) {
    // check space bar press
    if (key_press == " ") {
        key_press = "";
    }

    normal_keys.forEach((normal_key) => {
        if (normal_key.innerText.toLowerCase() == key_press) {
            normal_key.parentNode.classList.add("key-press");
        }
    });

    if (key_press == chosen_key.innerText.toLowerCase()) {
        is_error = false;
        test_cells[current_click].classList.add("correct-cell");
        count_correct += 1;
    } else {
        is_error = true;
        test_cells[current_click].classList.add("error-cell");
        count_mistake += 1;
    }
}

function reset_cells() {
    if (current_click == test_cells.length - 1) {
        if (!is_error) {
            current_click = 0;
            remove_error_cell();
            remove_correct_cell();
            gen_random_letter(test_array);
        }
        else {
            current_click = current_click;
        }
    } else {
        if (is_error) {
            current_click = current_click;
        }
        else {
            current_click += 1;
        }
    }
}

function remove_error_cell() {
    test_cells.forEach((cell) => {
        cell.classList.remove("error-cell");
    });
}

function remove_correct_cell() {
    test_cells.forEach((cell) => {
        cell.classList.remove("correct-cell");
    });
}

function typing_errors() {
    let mistakes = document.getElementById("errors");
    mistakes.innerHTML = count_mistake;
}

function words_per_min() {
    let wpm = document.getElementById("wpm");
    let time_in_min = chosen_time / 60;
    gross_wpm = ((count_correct) / 5) / time_in_min;

    wpm.innerHTML = parseInt(gross_wpm) + " WPM";
}

function typing_accuracy() {
    let accuracy = document.getElementById("accuracy");
    if ((count_correct + count_mistake) == 0) {
        accuracy.innerHTML = 0 + " %";
    } else {
        accuracy.innerHTML = parseInt((count_correct / (count_correct + count_mistake)) * 100) + " %";
    }
}

function show_results() {
    results_modal = document.querySelector(".result-modal");
    overlay.style.transitionDelay = "0s";
    overlay.style.width = "100%";
    results_modal.style.height = "450px";
    results_modal.style.width = "400px";

    document.removeEventListener("keydown", listener);

    document.getElementById("time-results").innerHTML = chosen_time + " s";
    document.getElementById("accuracy-results").innerHTML = parseInt((count_correct / (count_correct + count_mistake)) * 100) + " %";
    document.getElementById("wpm-results").innerHTML = parseInt(gross_wpm) + " WPM";
    document.getElementById("errors-results").innerHTML = count_mistake;

    close_show_results(results_modal)
}

function close_show_results(results_modal) {
    let close_results = document.querySelector(".close-results");
    close_results.addEventListener("click", () => {
        overlay.style.transitionDelay = "0.5s";
        overlay.style.width = "0%";
        results_modal.style.height = "0%";
        results_modal.style.width = "0%";

        restart();
    })
    overlay.addEventListener("click", () => {
        overlay.style.transitionDelay = "0.5s";
        overlay.style.width = "0%";
        results_modal.style.height = "0%";
        results_modal.style.width = "0%";

        restart();
    })
}

function restart() {
    sec = chosen_time;
    timer_is_counting = false;
    current_click = 0;
    count_mistake = 0;
    count_correct = 0;
    gross_wpm = 0;
    is_error = false;

    remove_error_cell();
    remove_correct_cell();
    show_timer();
    reset_target();
    gen_random_letter(test_array);
    active_key_btn(current_click);
    document.addEventListener("keydown", listener);
}

function reset_target() {
    typing_errors();
    words_per_min();
    typing_accuracy();
}

function menu() {
    menu_icon = document.querySelector(".menu-icon");
    menu_modal = document.querySelector(".menu-modal");

    menu_icon.addEventListener("click", () => {
        overlay.style.transitionDelay = "0s";
        overlay.style.width = "100%";
        menu_modal.style.width = "380px";
        document.removeEventListener("keydown", listener);
    })

    overlay.addEventListener("click", () => {
        overlay.style.transitionDelay = "0.5s";
        overlay.style.width = "0%";
        menu_modal.style.width = "0%";
        document.addEventListener("keydown", listener);
    })
}

menu();

function darkMode() {
    let lightMode = localStorage.getItem("lightMode");
    let lightModeBtn = document.querySelector(".theme-mode");

    lightModeEnable = () => {
        document.body.classList.add("light-mode");
        localStorage.setItem("lightMode", "true");
    }

    lightModeDisable = () => {
        document.body.classList.remove("light-mode");
        localStorage.setItem("lightMode", null);
    }

    if (lightMode === "true") {
        lightModeEnable();
    }

    lightModeBtn.addEventListener("click", () => {
        lightMode = localStorage.getItem("lightMode");

        if (lightMode == "true") {
            lightModeDisable();
        } else {
            lightModeEnable();
        }
    })
}
darkMode();