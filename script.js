var slider = document.getElementById("myRange");
//var output = document.getElementById("demo");
var slider1=document.getElementById("myRange2");
var cont=document.getElementById("slidecontainer");
var leg=document.getElementById('len');

//per cambiare la lunghezza dello slider
function onchange(position){
    if(position==0){
        leg.style.width="350px";
    } else {
        leg.style.width=(100)*position+ 300+"px";
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
                    //questa è stata traslata alla change function alla fine
                    /*if(note.innerHTML==allnotes[endex][index]){
                        il bordo della nota diventa verde se c'è corrispondenza fra la nota che esce dal trombone e quella selezionata
                        selected.classList.add("button-true", modelnote[endex][index]);
             
                    } else {
                        altrimenti il bordo è rosso
                        selected.classList.add("button-false", modelnote[endex][index]);
                    }
                    */ 
                    if((position-1)!=index){
                        //qui si deseleziona la nota nel caso lo slider venga mosso in avanti o indietro
                        selected=line.item(endex).children.item(index);
                        selected.classList.remove("selected", modelnote[endex][index]);
                    }
                    //questa commentata è stata spostata alla change function alla fine
                    /*if(note.innerHTML==allnotes[endex][index]){
                        //si rimuove la classe nel caso fosse true
                        selected.classList.remove("button-true",modelnote[endex][index]);
           
                    } else{
                        //si rimuove la classe nel caso fosse false
                        selected.classList.remove("button-false",modelnote[endex][index]);
                    }*/
                };
                if(endex!=pressure-1){
                    //si deseleziona la nota se si cambia lo slider di pressione
                    selected=line.item(endex).children.item(index);
                    selected.classList.remove("selected", modelnote[endex][index]);
                } //questa commentata è stata traslata nella "change" function alla fine
                /*if(note.innerHTML==allnotes[endex][index]){
                    selected.classList.remove("button-true",modelnote[endex][index]);
           
                } else {
                    selected.classList.remove("button-false",modelnote[endex][index]);
                }*/
            };
 
        };
        //chiamata alla funzione che cambia la lunghezza dello slider del tromobone
    }
  
};
//per inizializzare la selezione della nota appena si apre la pagina
buttons.forEach(click_assignment);
//eventlisteners
slider.addEventListener("input", click_assignment);
slider1.addEventListener("input", click_assignment);

//funzione che rimuove il bordo colorato alla fine del gioco
function remo(buttons){
    buttons.classList.remove("button-true");
    buttons.classList.remove("button-false");
}



//sempre per la lista
function change(start,note){
    console.log("here")
  //appena la nota si ferma viene fatto il confronto fra la nota selezionata dall'utente e quella in uscita dal trombone, qui si cambia il colore del bordo in base al risultato del confronto  
    if(note.innerHTML==LastNote.innerHTML){

        note.style.borderColor="green";
        LastNote.classList.add("button-true");
    }
    else{
        note.style.borderColor="red";
        LastNote.classList.add("button-false");
    }
    //funzione per cancellare la nota uscita dal trombone e far partire la successiva
    setTimeout(function(){
        note.remove();
        note.style.borderColor="black";
        buttons.forEach(remo);
        cont3.appendChild(note);
        start.shift();
        
        if(start.length!=0){
            note.innerHTML=start[0];
                
            click_assignment();
        } else {
            note.remove();
            note.removeEventListener;
            buttons.forEach(remo);
        // Game=false;
        } 
    },2000);
}

//--------------------------------------------------------------------------

//MODEL
model = [];
//notes = ["E1", "F1","F#1", "G1","Ab1", "A1", "Bb1", "B1", "C2", "C#2","D2","Eb2", "E2", "F2","F#2", "G2","Ab2", "A2", "Bb2", "B2", "C3", "C#3","D3","Eb3", "E3", "F3"];
//pos = [7,6,5,4,3,2,1,7,6,5,4,3,2,1,5,4,3,2,1,4,3,2,1,3,2,1];
//pres = [1,1,1,1,1,1,1,2,2,2,2,2,2,2,3,3,3,3,3,4,4,4,4,5,5,5];
notes = ["Bb1","A1","Ab1","G1","F#1","F1","E1","F2","E2","Eb2","D2","C#2","C2","B1","Bb2","A2","Ab2","G2","F#2","D3","C#3","C3","B2","F3","E3","Eb3"];
pos = [1,2,3,4,5,6,7,1,2,3,4,5,6,7,1,2,3,4,5,1,2,3,4,1,2,3];
pres = [1,1,1,1,1,1,1,2,2,2,2,2,2,2,3,3,3,3,3,4,4,4,4,5,5,5];


// INTERNAL STATE
var boolSelectionNotes = 1;
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
        note_to_play_cont.lastElementChild.style.backgroundColor = 'green';
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

function selectNotes(){
    const buttons_cont = document.getElementById("buttons_cont");
    const reset_but = createPulsante();
    buttons_cont.appendChild(reset_but);
    reset_but.innerHTML = "Reset";
    const done_but = createPulsante();
    buttons_cont.appendChild(done_but);
    done_but.innerHTML = "Done";
    reset_but.onclick = function(){
        model = [];
        render();
        if(document.getElementById("play_but_cont").lastElementChild){
            document.getElementById("play_but_cont").removeChild(document.getElementById("play_but_cont").lastElementChild);
        }
        boolSelectionNotes = 1;
        boolPlaying = 0;
    }
    
    buttons.forEach(click_assignment_selection)
    
    done_but.onclick = function(){
        if(boolPlaying == 0){
            playingFunc();
        }
    }
}

select_notes.onclick = selectNotes;

function createPulsante(){
    const button = document.createElement("div");
    button.classList.add("pulsante");
    return button;
};
var tht=false;
function playingFunc(){
    boolPlaying = 1;
    boolSelectionNotes = 0;
    
    //per l'animazione della nota che esce dal trombone
    var note = document.createElement('div');
    note.className = "prov";
    var cont3=document.getElementById("cont3");
    //cop.appendChild(bett);
    cont3.appendChild(note)
    var start = [];
    for(i=0; i<model.length; i++){
        start[i] = notes[model[i]];    
    }
    console.log(start);
    model = [];
    render();
    note.innerHTML=start[0];
    //index=0;
   note.addEventListener('animationend', change(start,note));
}
