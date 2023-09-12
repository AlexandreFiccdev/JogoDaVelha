let x = document.querySelector(".x");
let o = document.querySelector(".o");
let boxes = document.querySelectorAll(".box");
let buttons = document.querySelectorAll("#buttons-container button");
let messageContainer = document.querySelector("#message");
let messageText = document.querySelector("#message p");
let secondPlayer;

let player1 = 0;
let player2 = 0;

const StatusPartida = {
    JOGANDO: 0,
    FINALIZADA: 1,
};

for(let i = 0; i < boxes.length; i++){
    boxes[i].addEventListener("click", function(){
        let el = checkEl(player1, player2);


        if(this.childNodes.length == 0){
            let cloneEl = el.cloneNode(true);

            this.appendChild(cloneEl);
    
            if(player1 == player2){
                player1++;
            }else{
                player2++
            }

            checkWinCondtion();
        }

    });
}

function checkEl(player1, player2){
    if(player1 == player2){
        el = x;
    }else{
        el = o;
    }
    return el;
}

function checkWinCondtion(){
    let b1 = document.getElementById("block-1");
    let b2 = document.getElementById("block-2");
    let b3 = document.getElementById("block-3");
    let b4 = document.getElementById("block-4");
    let b5 = document.getElementById("block-5");
    let b6 = document.getElementById("block-6");
    let b7 = document.getElementById("block-7");
    let b8 = document.getElementById("block-8");
    let b9 = document.getElementById("block-9");
    let statusPartida = StatusPartida.JOGANDO;

    // Horizontals
    lookForWinner(b1, b2, b3);
    lookForWinner(b4, b5, b6);
    lookForWinner(b7, b8, b9);

    // Verticals
    lookForWinner(b1, b4, b7);
    lookForWinner(b2, b5, b8);
    lookForWinner(b3, b6, b9);
    
    // Diagonals
    lookForWinner(b1, b5, b9);
    lookForWinner(b3, b5, b7);
    
    playCounter++;
    const isTie = playCounter == 9 && statusPartida == StatusPartida.JOGANDO;
    if(isTie) declareWinner();
}

function lookForWinner(blockA, blockB, blockC) {
    const isBlocksFulfilled = blockA.childNodes.length > 0 && blockB.childNodes.length > 0 && blockC.childNodes.length > 0;
    if(isBlocksFulfilled){
        const optionPlayedA = blockA.childNodes[0].className;
        const optionPlayedB = blockB.childNodes[0].className;
        const optionPlayedC = blockC.childNodes[0].className;
        
        const winner = checkWinner(optionPlayedA, optionPlayedB, optionPlayedC);
        if (!winner) return;
        statusPartida = StatusPartida.FINALIZADA;
        declareWinner(winner);
    }
}

function checkWinner(playA, playB, playC) {
    const isWinner = playA && playA == playB && playB == playC;
    if(isWinner) return playA;
    return null;
}

function declareWinner(winner){
    let scoreboardX = document.querySelector("#scoreboard-1");
    let scoreboardY = document.querySelector("#scoreboard-2");
    let msg = '';

    if(winner == 'x'){
        scoreboardX.textContent = parseInt(scoreboardX.textContent) + 1;
        msg = "Jogador 1 venceu!";
    }else if(winner == 'o'){
        scoreboardY.textContent = parseInt(scoreboardY.textContent) + 1;
        msg = "Jogador 2 venceu!";
    }else{
        msg = "Deu Velha!";
    }


    messageText.innerHTML = msg;
    messageContainer.classList.remove("hide");

    setTimeout(function(){
        messageContainer.classList.add("hide");
    },3000);    

    player1 = 0;
    player2 = 0;

    let boxesToRemove = document.querySelectorAll(".box div");

    for(let i = 0; i < boxesToRemove.length; i++){
        boxesToRemove[i].parentNode.removeChild(boxesToRemove[i]);
    }


}

