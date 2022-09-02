let text_etapas = [];
let etapa;
let pontos;
let travar;

function load() {
    etapa = 1;
    pontos = 0;
    text_etapas = [
        'Você economiza água com banhos curtos e com a torneira deligada ao escovar os dentes?',
        'Você já pensou em diminuir o consumo de sacolas plásticas?',
        'Você separa os lixos orgânicos de lixos recicláveis?',
        'Você joga aquele papel de bala no lixo corretamente?',
        'Você já pensou em usar menos carros e caminhar mais?',
        'Você já plantou alguma sementinha? (pé de feijão é válido)',
        'Você lava a sua calçada com balde de água e sabão ao invés de jato de água de mangueira?'
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
        'Talvez seja hora de mudar algumas atitudes, hein!!',
        'Você está indo pelo caminho certo',
        'A natureza agradece a você!'
    ];

    const res_subtitle = [
        'Mesmo não parecendo, muita coisa muda com nossas atitudes e cada iniciativa que temos ajuda muito! <br>Tente ajudar o meio ambiente um pouco mais em seu dia a dia.<br><br>A natureza vai retribuir!',
        'Mas há um grande caminho pela frente! <br>Fico aliviado de você estar se guiando por esse caminho de ajudar a naruteza, porém eu tenho um desafio a você:<br>Dê uma olhada novamente nessas perguntas do 3º teste e faça uma atividade que você ainda não costuma fazer. <br>E aí, você consegue?',
        'Parabéns, isso significa muito para a natureza!<br><br>Uma informação interessante:<br>Com 5,5 milhões de km² e dona da maior biodiversidade do planeta, a floresta amazônica é uma das 7 novas maravilhas naturais do mundo! E o mais interessante: isto fica no nosso Brasil.<br><br>Então para cuidar dessas maravilhas naturais precisamos de atitudes como as suas, muito obrigado!',
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