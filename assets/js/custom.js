// Wyświetlanie różnych wartości w zależności od liczby punktów pobranych z wyniku
const url_string = window.location.href;
const url = new URL(url_string);
const score = url.searchParams.get("score");

const get_score_text = (score) => {
    if(score != null){        
        if(score <= 10){
            return 'Masz dużo pracy nad profilem, ale nie przejmuj się - dostaniesz porady.';
        }else if(score <= 20){
            return 'Jest jeszcze wiele do poprawy, ale spokojnie - pomożemy Ci!';
        }else if(score < 50){
            return 'Twój profil można jeszcze dopracować.';
        }else if(score <= 80){
            return 'Twój profil wydaje się być dobrze uzupełniony, jednak wciąż można poprawić kilka rzeczy.';
        }else if(score < 100){
            return 'Brawo! Twój profil wygląda świetnie!';
        }else{
            return 'Rewelacja! Twój profil jest idealny!';
        }
    }else{
        return 'Ups! Coś poszło nie tak z pobieraniem Twojego wyniku. Spróbuj ponownie przesłać formularz.';
    }
}

let test = "";
const makeScreenshot = () => {
    html2canvas(document.getElementById("screenshot"), {scale: 1, allowTaint: true, useCORS: true}).then(canvas => {
        canvas.id = "canvasID";
        let main = document.getElementById("main");
        while (main.firstChild){ main.removeChild(main.firstChild);}
        main.appendChild(canvas);
    });
}

$('#diagram').attr('data-circles-value', score);
$('#punktacja').text(score + " / 100 pkt.");
$('#opis').text(get_score_text(score));
$('#a-make').on('click', makeScreenshot);
document.getElementById("a-download").addEventListener('click', function(){
    this.href = document.getElementById("canvasID").toDataURL();
    this.download = `${score}%.png`;
});

const autoScreen = (delay) => {
    setTimeout(() => {document.getElementById("a-make").click()}, delay);
    setTimeout(() => {document.getElementById("a-download").click()}, delay*2);
    setTimeout(() => {window.open(window.location.href.replace(`?&score=${score}`, `?&score=${parseInt(score) + 1}`), '_self')}, delay*4);
}

// Odkomentuj jak chcesz, żeby generowało screeny automatycznie :)
// Testowane na Firefoxie, Chrome blokuje pobieranie mimo wyłączonych opcji bezpieczeństwa nie wiem czemu
// if(score < 100){
//     autoScreen(2000);
// }