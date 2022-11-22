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

let most_typed_letters = most_typed_letters_1.concat(most_typed_letters_2, most_typed_letters_3);

var test_cells = document.querySelectorAll(".test-cells");
var letters = document.querySelectorAll(".k-letter");
var normal_keys = document.querySelectorAll(".normal-key");
var shift_keys = document.querySelectorAll(".shift-key");
var time = document.querySelector("#timer");

var overlay = document.querySelector(".overlay");

var chosen_time = 20; // seconds
var sec = chosen_time;
let timer_is_counting = false;

var current_click = 0;

var count_mistake = 0;
var count_correct = 0;
var gross_wpm = 0;

var f_j_key = document.getElementById("f-j");
var d_k_key = document.getElementById("d-k");
var s_l_key = document.getElementById("s-l");
var g_h_key = document.getElementById("g-h");
var a_semicolon_key = document.getElementById("a-semicolon");
var home_key_all = document.getElementById("home-keys-all");

var q_p_key = document.getElementById("q-p");
var w_o_key = document.getElementById("w-o");
var e_i_key = document.getElementById("e-i");
var r_u_key = document.getElementById("r-u");
var t_y_key = document.getElementById("t-y");
var top_key_all = document.getElementById("top-keys-all");

var z_forward_slash_key = document.getElementById("z-forward-slash");
var x_fullstop_key = document.getElementById("x-fullstop");
var c_comma_key = document.getElementById("c-comma");
var v_m_key = document.getElementById("v-m");
var b_n_key = document.getElementById("b-n");
var bottom_key_all = document.getElementById("bottom-keys-all");

var index_key = document.getElementById("index-fingers");
var ring_key = document.getElementById("ring-fingers");
var pinky_key = document.getElementById("pinky-fingers");
var middle_key = document.getElementById("middle-fingers");
var common_1_key = document.getElementById("common-1");
var common_2_key = document.getElementById("common-2");
var common_3_key = document.getElementById("common-3");
var common_all_key = document.getElementById("common-all");

var menu_row_content = document.querySelectorAll(".menu-row-content");

var test_array = space_array.concat(most_typed_letters_1);

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

function home_row_keys() {
    test_array = [];

    f_j_active();
    d_k_active();
    s_l_active();
    a_semicolon_active();
    g_h_active();
    home_key_all_active();
}

function f_j_active() {
    f_j_key.addEventListener("click", () => {
        test_array = space_array.concat(f_j);
    })
}

function d_k_active() {
    d_k_key.addEventListener("click", () => {
        test_array = space_array.concat(d_k);
    })
}
function s_l_active() {
    s_l_key.addEventListener("click", () => {
        test_array = space_array.concat(s_l);
    })
}
function a_semicolon_active() {
    f_j_key.addEventListener("click", () => {
        test_array = space_array.concat(f_j);
    })
}
function g_h_active() {
    g_h_key.addEventListener("click", () => {
        test_array = space_array.concat(g_h);
    })
}
function home_key_all_active() {
    home_key_all.addEventListener("click", () => {
        test_array = space_array.concat(home_row);
    })
}

function top_row_keys() {
    test_array = [];

    q_p_active();
    w_o_active();
    e_i_active();
    r_u_active();
    t_y_active();
    top_key_all_active();
}

function q_p_active() {
    q_p_key.addEventListener("click", () => {
        test_array = space_array.concat(q_p);
    })
}
function w_o_active() {
    w_o_key.addEventListener("click", () => {
        test_array = space_array.concat(w_o);
    })
}
function e_i_active() {
    e_i_key.addEventListener("click", () => {
        test_array = space_array.concat(e_i);
    })
}
function r_u_active() {
    r_u_key.addEventListener("click", () => {
        test_array = space_array.concat(r_u);
    })
}
function t_y_active() {
    t_y_key.addEventListener("click", () => {
        test_array = space_array.concat(t_y);
    })
}
function top_key_all_active() {
    top_key_all.addEventListener("click", () => {
        test_array = space_array.concat(top_row);
    })
}

function bottom_row_keys() {
    z_forward_slash_active();
    x_fullstop_slash_active();
    c_comma_slash_active();
    v_m_slash_active();
    b_n_slash_active();
    bottom_key_all_slash_active();
}

function z_forward_slash_active() {
    z_forward_slash_key.addEventListener("click", () => {
        test_array = space_array.concat(z_forward_slash);
    })
}
function x_fullstop_slash_active() {
    x_fullstop_key.addEventListener("click", () => {
        test_array = space_array.concat(x_fullstop);
    })
}
function c_comma_slash_active() {
    c_comma_key.addEventListener("click", () => {
        test_array = space_array.concat(c_comma);
    })
}
function v_m_slash_active() {
    v_m_key.addEventListener("click", () => {
        test_array = space_array.concat(v_m);
    })
}
function b_n_slash_active() {
    b_n_key.addEventListener("click", () => {
        test_array = space_array.concat(b_n);
    })
}
function bottom_key_all_slash_active() {
    bottom_key_all.addEventListener("click", () => {
        test_array = space_array.concat(bottom_row);
    })
}