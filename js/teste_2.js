let text_etapas = [];
let etapa;
let pontos;
let travar;

function load() {
    etapa = 1;
    pontos = 0;
    text_etapas = [
        'Você se sente desanimado(a) ultimamente?',
        'Você sente dificuldade em se sentir feliz?',
        'Você se sente desmotivado(a) a fazer deveres?',
        'Você se sente uma pessoa inútil ou fracassada?',
        'Você tem constante insegurança ou desespero?',
        'Você é uma pessoa muito negativa?',
        'Você sente dores dentro de si ou um pequeno vazio...?'
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
        'Você parece estar bem!',
        'Você parece estar um pouco mal...',
        'Você é especial!'
    ];

    const res_subtitle = [
        'Apesar de ter um sintoma ou outro, você aparenta estar bem! Continue se cuidando e ver o lado bom que a vida tem a oferecer a você <3<br>Acredite, a vida realmente tem muitas coisas boas!',
        'De acordo com suas respostas, você tem alguns sintomas de depressão...<br><br>Recomendo você a fazer algumas atividades físicas, sair com amigos e ter um hobby! <br>Lembre-se que pequenas atitudes podem gerar grandes resultados para o seu bem <3',
        'Ops, você parece ter vários sintomas de depressão... Isso não é bom.<br>Bem, só especialistas podem realmente definir o que você tem, então eu estou te recomendando a ir em um psicólogo ou psiquiatra para saber se você realmente tem depressão.<br>Eles realmente podem te ajudar a melhorar e saber como lidar com isso <3<br><br>Agora aqui está algumas dicas do que você pode fazer:<br>• Fale sobre seus problemas com alguém que te entenda;<br>• Reduza seu estresse ao máximo; <br>• Tente regular seu sono; <br>• Se alimente regularmente; <br>• Evite muito os pensamentos negativos!!; <br>• Combata a procastinação.',
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