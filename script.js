var slider = document.getElementById("myRange");
//var output = document.getElementById("demo");
var slider1=document.getElementById("myRange2");
var cont=document.getElementById("slidecontainer");
var leg=document.getElementById('len');

var menu = document.getElementById("change_chart");
menu.addEventListener("input", generateData);
var alo=false;
bot=false;
mod1();
function generateData(event) {
  if (menu.value == '1') {
    mod1();
  } else if (menu.value == '2') {
    //if(alo){
    while (cop.firstChild) {
        cop.removeChild(cop.lastChild);
      //}
    }
  } else if (menu.value == '3') {
    //if(alo){
        while (cop.firstChild) {
        cop.removeChild(cop.lastChild);
      }
  //}
}
}

//per cambiare la lunghezza dello slider
function onchange(position){
    if(position==0){
        leg.style.width="350px";
    } else {
        leg.style.width=(83)*position+ 350+"px";
        console.log(leg.style.width);
    }
}

//matrice per settare le posizioni delle note nella tabella
var modelnote= [[1,1,1,1,1,1,1],
                [1,1,1,1,1,1,1],
                [1,1,1,1,1,0,0],
                [1,1,1,1,0,0,0],
                [1,1,1,0,0,0,0]];

//matrice testuale
var allnotes=[["Bb1","A1","Ab1","G1","F#1","F1","E1"],
              ["F2","E2","Eb2","D2","C#2","C2","B1"],
              ["Bb2","A2","Ab2","G2","F#2"],
              ["D3","C#3","C3","B2"],
              ["F3","E3","Eb3"]];

//viene creata una linea per ogni riga della tabella
for(i=0;i<5;i++){
    var line = document.createElement('div');
    line.className = "line";
    document.getElementById('notechart').appendChild(line);
    //si scorre la matrice delle note e viene aggiunto un bottone in quella linea solo se il valore nella matrice è diverso da zero
    for(j=0; j<7; j++){
        if(modelnote[i][j]!=0){
            var button = document.createElement('div');
            button.className = "button";
            line.appendChild(button);
            button.innerHTML=allnotes[i][j];
        };
    };
};
///

var PosLength=[": 0 cm",": 8,25 cm",": 17,14 cm",": 26,67 cm",": 36,83 cm",": 47,62 cm",": 59,69 cm"];
//initialise sliders
//var position=document.getElementById("myRange").value;
document.getElementById("pos").innerHTML = document.getElementById("myRange").value + PosLength[0];
document.getElementById("myRange").oninput = function(){
    document.getElementById("pos").innerHTML = this.value + PosLength[this.value-1];
}


//var pressure=document.getElementById("myRange2").value;
document.getElementById("prep").innerHTML = document.getElementById("myRange2").value;
document.getElementById("myRange2").oninput = function(){
    document.getElementById("prep").innerHTML = this.value ;
}

buttons = document.querySelectorAll(".button");
line=document.querySelectorAll(".line");

var LastNote;//ultima nota selezionata prima del confronto
var selected;//nota selezionata
var startAnime=true;
function click_assignment () {
    //prende i valori degli sliders
    var position= parseInt(document.getElementById("myRange").value);
    var pressure= parseInt(document.getElementById("myRange2").value);
    //chiamata alla funzione che cambia la lunghezza dello slider del trombone in base alla posizione
    onchange(position);
    //si scorre la matrice lungo le righe e le colonne
  
    for(endex=0;endex<5;endex++){
        for(index=0;index<7;index++){
            if(modelnote[endex][index]!=0){ //questo perche le note sono solo in posizioni della matrice con valore !=0
                if(endex==pressure-1){ //pressure-1 perche faccio partire la pressione da 1
                    if(position-1==index){
                        //pressure è il valore dello slide di pressione e position quello dello slide del trombone. se la colonna e la riga della matrice corrispondono alla posizione della nota nella tabella, la nota viene selezionata
                        selected=line.item(endex).children.item(index);
                        selected.classList.add("selected", modelnote[endex][index]);
                        LastNote=selected;
                    }
                    if((position-1)!=index){
                        //qui si deseleziona la nota nel caso lo slider venga mosso in avanti o indietro
                        selected=line.item(endex).children.item(index);
                        selected.classList.remove("selected", modelnote[endex][index]);
                    }
                };
                if(endex!=pressure-1){
                    //si deseleziona la nota se si cambia lo slider di pressione
                    selected=line.item(endex).children.item(index);
                    selected.classList.remove("selected", modelnote[endex][index]);
                } 
            };
 
        };
    }
  
};
//per inizializzare la selezione della nota appena si apre la pagina
buttons.forEach(click_assignment);
//eventlisteners
slider.addEventListener("input", click_assignment);
slider1.addEventListener("input", click_assignment);

document.onkeydown = function(key){

    if(key.keyCode == 90){ //z
        document.getElementById("myRange").value = 1;
        click_assignment(); 
    }else if(key.keyCode == 88){ //x
        document.getElementById("myRange").value = 2;
        click_assignment();
    }else if(key.keyCode == 67){ //c
        document.getElementById("myRange").value = 3;
        click_assignment();
    }else if(key.keyCode == 86){ //v
        document.getElementById("myRange").value = 4;
        click_assignment();
    }else if(key.keyCode == 66){ //b
        document.getElementById("myRange").value = 5;
        click_assignment();
    }else if(key.keyCode == 78){ //n
        document.getElementById("myRange").value = 6;
        click_assignment();
    }else if(key.keyCode == 77){ //m
        document.getElementById("myRange").value = 7;
        click_assignment();
    }else if(key.keyCode == 49){ //1
        document.getElementById("myRange2").value = 1;
        click_assignment();
    }else if(key.keyCode == 50){ //2
        document.getElementById("myRange2").value = 2;
        click_assignment();
    }else if(key.keyCode == 51){ //3
        document.getElementById("myRange2").value = 3;
        click_assignment();
    }else if(key.keyCode == 52){ //4
        document.getElementById("myRange2").value = 4;
        click_assignment();
    }else if(key.keyCode == 53){ //5
        document.getElementById("myRange2").value = 5;
        click_assignment();
    }
}

//funzione che rimuove il bordo colorato alla fine del gioco
function remo(buttons){
    buttons.classList.remove("button-true");
    buttons.classList.remove("button-false");
}

var boo=false;
var conta;
var cop;
//sempre per la lista
function change(note,start,time, pause){

    setTimeout(function(){
        if(boo==true){
            return;
        }
        //note.style.borderColor="green";
        //appena la nota si ferma viene fatto il confronto fra la nota selezionata dall'utente e quella in uscita dal trombone, qui si cambia il colore del bordo in base al risultato del confronto  
        if(note.innerHTML==LastNote.innerHTML){

            note.style.borderColor="green";
            LastNote.classList.add("button-true");
            playSound(note.innerHTML);
        }
        else{
            note.style.borderColor="red";
            LastNote.classList.add("button-false");
            playSound("wrong");
            //if(menu.value==1){
                if(fixMod==1){
                console.log(conta)
                conta=conta-1;
                cop.lastElementChild.remove();
                if(conta==0){
                    boo=true;
                    screen.innerHTML = "GAME OVER";
                    playSound("game_over1");
                    swal({
                        title: "GAME OVER :(",
                        confirmButtonText: 'Play Again',
                      })
                      .then((value) => {
                        location.reload();
                        boo=true;
                        note.remove();
                        start=[];
                        model=[];
                        render();
                        boolSelectionNotes = 1;
                        boolPlaying = 0;
                        menu.addEventListener("input", generateData);
                        generateData();
                        selectNotes();
                        LastNote.classList.remove("button-false");
                      });
                   //playSound("game_over");
                    //LastNote.classList.remove("button-false");
                }
            }
            //if(menu.value==2){
                if(fixMod==2){
                boo=true;
                screen.innerHTML = "GAME OVER";
                playSound("game_over1");
                swal({
                    title: "GAME OVER :(",
                    confirmButtonText: 'Play Again',
                  })
                  .then((value) => {
                    location.reload();
                    boo=true;
                    note.remove();
                    start=[];
                    model=[];
                    render();
                    boolSelectionNotes = 1;
                    boolPlaying = 0;
                    menu.addEventListener("input", generateData);
                    generateData();
                    selectNotes();
                    LastNote.classList.remove("button-false");
                  });
            }
        }
            //funzione per cancellare la nota uscita dal trombone e far partire la successiva
        setTimeout(function(){
            if(boo==true){
                return;
            }
            note.remove();
            note.style.borderColor="black";
            buttons.forEach(remo);
            cont3.appendChild(note);
            start.shift();
            
            if(start.length!=0){

                note.innerHTML=start[0];
                click_assignment();
                change(note, start,time, pause);
                
            } else {
                console.log("Game finished")
                note.remove();
                buttons.forEach(remo);
                boolPlaying = 0;
                boolSelectionNotes = 1;
                screen.innerHTML = "YOU WIN!";
                swal({
                    title: "YOU WIN! :)",
                    confirmButtonText: 'Play Again',
                  })
                  .then((value) => {
                    location.reload();
                    boo=true;
                    note.remove();
                    start=[];
                    model=[];
                    render();
                    boolSelectionNotes = 1;
                    boolPlaying = 0;
                    menu.addEventListener("input", generateData);
                    generateData();
                    selectNotes();
                    LastNote.classList.remove("button-false");
                  });
            // Game=false;
            } 
        },pause*1000);
    },time * 1000);
   
}
//swal("hello word")

//--------------------------------------------------------------------------

//MODEL
var model = [];
var start = [];
//notes = ["E1", "F1","F#1", "G1","Ab1", "A1", "Bb1", "B1", "C2", "C#2","D2","Eb2", "E2", "F2","F#2", "G2","Ab2", "A2", "Bb2", "B2", "C3", "C#3","D3","Eb3", "E3", "F3"];
//pos = [7,6,5,4,3,2,1,7,6,5,4,3,2,1,5,4,3,2,1,4,3,2,1,3,2,1];
//pres = [1,1,1,1,1,1,1,2,2,2,2,2,2,2,3,3,3,3,3,4,4,4,4,5,5,5];
notes = ["Bb1","A1","Ab1","G1","F#1","F1","E1","F2","E2","Eb2","D2","C#2","C2","B1","Bb2","A2","Ab2","G2","F#2","D3","C#3","C3","B2","F3","E3","Eb3"];
pos = [1,2,3,4,5,6,7,1,2,3,4,5,6,7,1,2,3,4,5,1,2,3,4,1,2,3];
pres = [1,1,1,1,1,1,1,2,2,2,2,2,2,2,3,3,3,3,3,4,4,4,4,5,5,5];
var menu_vel = document.getElementById("velocity");


// INTERNAL STATE
var boolSelectionNotes = 0;
var boolPlaying = 0;

function createNoteEl() {
    const button = document.createElement("div");
    button.classList.add("note_el");
    return button;
}

function render(){
    const note_to_play_cont = document.getElementById("note_to_play_cont");

    while (note_to_play_cont.lastElementChild) { 
        note_to_play_cont.removeChild(note_to_play_cont.lastElementChild);
    }

    for(i = 0 ;i < model.length; i++) {   note_to_play_cont.appendChild(createNoteEl());
       // note_to_play_cont.lastElementChild.style.backgroundColor = 'green';
        note_to_play_cont.lastElementChild.innerHTML = notes[model[i]];
        note_to_play_cont.lastElementChild.style.cursor = 'auto';
    }
}

function click_assignment_selection (key, index) {
    key.onclick = function() {
        if(boolSelectionNotes){
            model.push(index);
            render()
        }
    }
    
}
var fixMod;
var note;
function selectNotes(){
    screen.innerHTML = "Select the notes to create the list of notes you want to play. When you're done, press 'Play' button.";
    if(boolSelectionNotes == 0 && boolPlaying == 0){
        const buttons_cont = document.getElementById("buttons_cont");
        const reset_but = createPulsante();
        buttons_cont.appendChild(reset_but);
        reset_but.innerHTML = "Reset";
        const done_but = createPulsante();
        buttons_cont.appendChild(done_but);
        done_but.innerHTML = "Play!"; 
        
        reset_but.onclick = function res(){
            if(alo==true){note.remove();}
            boo=true;
            start=[];
            model=[];
            render();
            boolSelectionNotes = 1;
            boolPlaying = 0;
            menu.addEventListener("input", generateData);
            generateData();
            selectNotes();
            LastNote.classList.remove("button-false");
        }
        done_but.onclick = function done(){
            if(model.length==0){return;}
            alo=true;
            fixMod=menu.value;
            menu.removeEventListener("input", generateData);
            boo=false;
            if(boolPlaying == 0){
                playingFunc();
            }
        }      
    }

    boolSelectionNotes = 1;

    
    //model = [4,11,18,20];
    render();
    buttons.forEach(click_assignment_selection)
    
    
}
sound_button.onclick = function(){
    if (sound_button.classList == "sound_on"){
      sound_button.innerHTML = "Sound: OFF";
    }else{
      sound_button.innerHTML = "Sound: ON";
    }
    sound_button.classList.toggle("sound_off");
}

screen = document.getElementById("screen");
selectNotes();

function createPulsante(){
    const button = document.createElement("div");
    button.classList.add("pulsante");
    return button;
};


function playingFunc(){
    screen.innerHTML = "Don't miss a note ;) ";
    boolPlaying = 1;
    boolSelectionNotes = 0;
    
    //per l'animazione della nota che esce dal trombone
  note=document.createElement('div');
    note.className = "prov";
    if(menu_vel.value == "2"){
        note.style.webkitAnimationDuration = "3s";
        time = 3;
        pause = 1.5;
    }else if(menu_vel.value == "3"){
        note.style.webkitAnimationDuration = "2s";
        time = 2;
        pause = 1;
    }else{
        time = 5;
        pause = 2;
    }
    
    var cont3=document.getElementById("cont3");
    cont3.appendChild(note)
    
    for(i=0; i<model.length; i++){
        start[i] = notes[model[i]];    
        }
    model = [];
    render();
    note.innerHTML=start[0];
    
    //index=0;
    //note.addEventListener("animationend", change(note,start));
    if(boo==false){
        change(note, start, time, pause);
    }
}

function playSound(note) {
    const sound = new Audio() 
    if(note == "F#1"){
        sound.src = "sounds/Fdies1.wav"; 
    }else if(note == "F#2"){
        sound.src = "sounds/Fdies2.wav"; 
    }else if(note == "C#2"){
        sound.src = "sounds/Cdies2.wav"; 
    }else if(note == "C#3"){
       sound.src = "sounds/Cdies3.wav"
    }else{
        sound.src = "sounds/"+note+".wav"; 
    }
    if(sound_button.classList == "sound_on"){
        sound.play();
    }  
} 
function mod1(){
    cop=
    document.getElementById("cont");
    while (cop.firstChild) {
        cop.removeChild(cop.lastChild);
      }
    for(i=0;i<3;i++){
    var heart = document.createElement('div');
    heart.className = "heart";
    cop.appendChild(heart);
    conta=3;
    }
}


/*swal({
    title: "GAME OVER :(",
    buttons: ["Restart","Try Again"]
})
  .then((value) => {
    switch (value) {

        case "Restart":
         boo=true;
         note.remove();
         start=[];
         model=[];
         render();
         boolSelectionNotes = 1;
         boolPlaying = 0;
         generateData();
         selectNotes();
         LastNote.classList.remove("button-false");
      break;
        case "Try Again":
         
         for (i = 0; i < numbers.length; i++) {
         start[i] = copy[i];
         }
         boo=false;
         if(boolPlaying == 0){
         playingFunc();
         }
      break;
    }
  )};
});


*/