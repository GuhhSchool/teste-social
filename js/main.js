const divPopup = document.querySelector('div#div_popup');
let button_selected;

function load() {
    button_selected = undefined;
    console.log(navigator.platform);
}

function botao(value) {
    if (button_selected) return;
    document.body.animate([ { opacity: 0 },
    ], {
        duration: 1000,
        fill: "forwards",
    })
    setTimeout(() => location.href = `./teste_${value}.html`, 1000);
}

function popup() {
    divPopup.style.display = 'block';
}

function fechar() {
    divPopup.style.display = 'none';
}

window.onclick = function(event) {
    if (event.target == divPopup) divPopup.style.display = 'none';
    console.log(event.target);
}