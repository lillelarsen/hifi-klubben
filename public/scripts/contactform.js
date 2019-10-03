/*jslint browser, devel, for, this*/
//Kalder scriptet når sitet er loadet og der trykkes på submit
window.addEventListener('load', function () {
    document.getElementById("contactForm").onsubmit = Valider;
})

//Hele validerings-scriptet
function Valider() {
    var AntalFejl = 0;
    var FejlBesked1 = "";
    var FejlBesked2 = "";
    var FejlBesked3 = "";

    //Hvis InputNavn er lig med tomt, giv fejlbesked
    if (document.getElementById('InputNavn').value == "") {
        AntalFejl += 1;
        FejlBesked1 = "Skriv dit navn!";
    }
    //ellers tjek om der bliver brugt bogstaver
    else {
        var regexpbogstaver = /^[a-zA-Z ]+$/;
        if (!regexpbogstaver.test(document.getElementById('InputNavn').value)) {
            AntalFejl += 1;
            FejlBesked1 = "Navn må kun indeholde bogstaver og mellemrum!";
        }
    }

    if (document.getElementById('InputMail').value == "") {
        AntalFejl += 1;
        FejlBesked2 = "Skriv din mail!";
    } else {
        var regexpmail = /^[A-Za-zÆØÅæøå0-9_.]+[@]{1}[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
        if (!regexpmail.test(document.getElementById('InputMail').value)) {
            AntalFejl += 1;
            FejlBesked2 = "Mail er ikke gyldig!";
        }
    }
     //Hvis InputNavn er lig med tomt, giv fejlbesked
     if (document.getElementById('besked').value == "") {
        AntalFejl += 1;
        FejlBesked3 = "Skriv en besked!";
    }
    //ellers tjek om der bliver brugt bogstaver
    else {
        var regexpbogstaver = /^[A-Za-zÆØÅæøå0-9-,_.\s\S ]+$/;
        if (!regexpbogstaver.test(document.getElementById('besked').value)) {
            AntalFejl += 1;
            FejlBesked3 = "Du skal skrive en besked!";
        }
    }
    //hvis der ingen fejl er gennemføres udfyldelsen af formen
    if (AntalFejl == 0) {
        return true;
    }
    //Ellers gives fejlbeskeder i html'en (p-tagget)
    else {
        document.getElementById('FejlBeskedNavn').innerHTML = FejlBesked1;
        document.getElementById('FejlBeskedMail').innerHTML = FejlBesked2;
        document.getElementById('FejlBeskedBesked').innerHTML = FejlBesked3;
        return false;
    }
}
