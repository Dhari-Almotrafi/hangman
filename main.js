//letters
const letters ="abcdefghijklmnopqrstuvwxyz123456789";

let lettersArray = Array.from (letters);

let lettersContainer =document.querySelector(".letters");

//generaate letters
lettersArray.forEach(letter => {
    //create span
    let span = document.createElement("span");

    //create letter tes=xrt nide
    let theLetter = document.createTextNode(letter);

    span.appendChild(theLetter);

    span.className= 'letter-box';

    lettersContainer.appendChild(span);
});

const words = {
    animes: ["One Piece","Attack On Titan","Moriarty","Naruto","HunterXHunter","Kingdom","Jujutsu","Vinland Saga","Monster","Demon Slayer","One Punch Man","Neverland","Slam Dunk","Death Note","Bleach","Gintama"],
    movies:["ShawShank","The Prestige","Intersteller","Shutter Island","Cast Away","Scent Of a Woman","1917","Top Gun","The Godfather","The Dark Knight","Pulp Fiction","The Good, the Bad and the Ugly","The Departed","Gladiator","The Pianist","The Green Mile","Se7en","Goodfellas","Inception","Fight Club","Forrest Gump","","","",""],
    youtubers:["LLE","3Adel","Abu 3beer","Banderita","Mrfifa","shongxbong","opiilz","oden","Drb7h","FZX","d7oomy999","RAED","6rba","Bo3omar","Ai Show","Ahmed Show","MrMrSnb","Rakanoo","MjrmGames","FFearFFul","xxYjYxx"],
    esports:["Falcons","Power","Tu","R8","Peaks","25"]
}

//random property

let allkeys = Object.keys(words);
//random Number
let randomPropNumber = Math.floor(Math.random() * allkeys.length);
//category
let randomPropName = allkeys[randomPropNumber];
//category words
let randomPropValue = words[randomPropName];
// random number depends on words
let randomValueNumber = Math.floor(Math.random() * randomPropValue.length);
// the chosen word
let randomValueValue = randomPropValue[randomValueNumber];


// set category onfo 
document.querySelector(".game-info .category span").innerHTML = randomPropName;
//select letters guess element
let lettersGuessContainer = document.querySelector(".letters-guess");

let lettersAndSpace = Array.from(randomValueValue);

//creaate apan on word

lettersAndSpace.forEach(letter => {
    //create aspna
    let emtySpan = document.createElement("span");
    //if there is space
    if (letter === ' ') {
        emtySpan.className = 'with-space';
    }

    lettersGuessContainer.appendChild(emtySpan);
});

let guessSpans = document.querySelectorAll(".letters-guess span");

//set wrong attemots
let wrongAttempts = 0;

//select the draw
let theDraw = document.querySelector(".hangman-draw");
//handle clicking on letters
document.addEventListener("click", (e)=> {

    // set status of letter if correct or no 
    let theStatus = false;

    if (e.target.className === 'letter-box'){

        e.target.classList.add("clicked");

        //get letter that clicked
        let theClickedLetter = e.target.innerHTML.toLowerCase();
        
        // chhosen word
        let theChosenword = Array.from(randomValueValue.toLowerCase());

        //the chosen word is => console.log(lettersAndSpace);
        theChosenword.forEach((wordLetter, wordIndex ) => {

            //if the clicked letter =  to one of the chosen letters
            if (theClickedLetter == wordLetter){

                // set status of letter if correct or no 
                theStatus = true;

                guessSpans.forEach((span, spanIndex) => {

                    if (wordIndex === spanIndex){
                        
                        span.innerHTML = theClickedLetter;
                    }
                });
            }
        });
                // Check if the player has won
                let allCorrect = true;
                guessSpans.forEach(span => {
                    if (span.innerHTML === '') {
                        allCorrect = false;
                    }
                });
        
                if (allCorrect) {
                    wonGame();
                    lettersContainer.classList.add("finished");
                }
        
        //outside loop
        
        if (theStatus !== true) {
            //incresre wrong attempts
            wrongAttempts++;

            //add class wrong to the draw
            theDraw.classList.add(`wrong-${wrongAttempts}`);

            //play fail sound
            document.getElementById("fail").play();
            if (wrongAttempts === 8){
                
                
                endGame();
                lettersContainer.classList.add("finished");
                document.getElementById("lose").play();
            }
        }else{
            //play seccess
            document.getElementById("success").play();
        }
        console.log(wrongAttempts);
    }
});
// End Game Function
function endGame() {

    // Create Popup Div
    let div = document.createElement("div");
    
    // Create Text
    let divText = document.createTextNode(`(${randomValueValue}) :انشنق الرجال خلاص, الجواب الصح كان`);
    
    
    // Append Text To Div
    // divText.appendChild(span);
    div.appendChild(divText);
    

    // Add Class On Div
    div.className = 'popup';

    // Append To The Body
    document.body.appendChild(div);

}
function wonGame() {
    // Create Popup Div
    let div = document.createElement("div");

    // Create the text with a span for the variable
    div.innerHTML = `(${randomValueValue}) :صح عليك الجواب`;

    // Append the div to the body or a specific container
    document.body.appendChild(div);

    // Add the popup class to the div
    div.className = 'popup';
}