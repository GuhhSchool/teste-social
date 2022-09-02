let text_etapas = [];
let etapa;
let pontos;
let travar;

function load() {
    etapa = 1;
    pontos = 0;
    text_etapas = [
        'Você se preocupa bastante durante o seu dia?',
        'Você tem insonia ou dificuldades para dormir?',
        'Você tem "medo" de ir em eventos sociais (casamentos, aniversários) e ser julgado(a)?',
        'Você tem crises com frequência?',
        'Você tem perfeccionismo?',
        'Você dúvida sobre sua capacidade?',
        'Você se estressa facilmente?'
    ];
}

function botao(value) {
    if (travar) return;

    etapa++;
    travar = true;
    pontos += Number(value);
    
    if (etapa < 8) newEtapa();
    else finishEtapa();
}

function newEtapa() {
    effectEtapa();
    setTimeout(continuar, 1000);
}

function effectEtapa() {
    const container = document.querySelector('div#textos');

    container.animate([{ opacity: 0 }], {
        duration: 500,
        fill: "forwards",
    });
}

function effectEtapa2() {
    const container = document.querySelector('div#textos');

    container.animate([{ opacity: 1 }], {
        duration: 500,
        fill: "forwards",
    });
}

function continuar() {
    effectEtapa2();
    let text_title = document.querySelector('div#textos').childNodes[1];
    let text_subtitle = document.querySelector('div#textos').childNodes[3];

    text_title.innerHTML = `${etapa}.`;
    text_subtitle.innerHTML = text_etapas[etapa - 1];
    travar = false;
}

function finishEtapa() {
    effectEtapa();
    setTimeout(finish, 1000);
}

function finish() {
    let botao = document.querySelector('div.botoes');
    let text_title = document.querySelector('div#textos').childNodes[1];
    let text_subtitle = document.querySelector('div#textos').childNodes[3];

    const respostas = adjust();
    effectEtapa2();

    text_title.innerHTML = respostas.title;
    const sub_styles = text_subtitle.style;

    text_subtitle.innerHTML = respostas.subtitle;
    sub_styles.fontSize = '20px';
    sub_styles.marginTop = '20px';
    sub_styles.fontWeight = 'normal';
    sub_styles.textAlign = 'left';
    sub_styles.lineHeight = '25px';

    botao.remove();
    travar = false;
}

function adjust() {
    const res_title = [
        'Está tudo bem!',
        'Ansiedade moderada',
        'Você está bem?'
    ];

    const res_subtitle = [
        'De acordo com suas respostas, parece estar tudo bem com você! <br>Porém continue se cuidando tanto fisicamente quanto mentalmente (ambos são importantes, okay?)',
        'Parece que você tem rastros de ansiedade, mesmo não sendo tão forte você precisa se cuidar!! <br>Tente relaxar mais, ser mais positivo(a) e conversar mais com as pessoas. <br>Mesmo sendo dicas simples, pode te ajudar muito <3',
        'Você não parece estar muito bem, recomendo ir ao médico para ter um diagnóstico mais profissional! <br><br>Aqui vai algumas dicas: <br>• Invista no seu autoconhecimento (olhe para si mesmo e tente aprender a lidar com suas emoções); <br>• Aprenda e controle sua respiração, sendo uma pessoa mais calma; <br>• Desconfie de pensamentos negativos, eles não fazem bem; <br>• Não exija tanto de si mesmo!',
    ];

    if (pontos <= 5) pontos = 0;
    else if (pontos > 5 && pontos <= 11) pontos = 1;
    else pontos = 2; 

    return {
        title: res_title[pontos],
        subtitle: res_subtitle[pontos],
    };
}

function exit(value) {

    document.body.animate([ { opacity: 0 },
    ], {
        duration: 1000,
        fill: "forwards",
    })
    setTimeout(() => location.href = './index.html', 1000);
}