let gameContainer = document.querySelector('.game-blocks');
let blocks = Array.from(document.querySelectorAll('.block'));

document.querySelector('.start-mode button').onclick = function(){
    let username = prompt("What's your name?");

    if(username == null || username == "")
        document.querySelector('.player-name span').innerHTML = "Stranger!";
    else
        document.querySelector('.player-name span').innerHTML = username;

    document.querySelector('.start-mode').style.display = "none";
    //OR remove it from DOM: document.querySelector('.start-mode').remove();

    shuffleBlocks();
    InitializeBlocks();
};

function shuffleBlocks(){
    let ArrOfIndices = [...blocks.keys()];
    let currentLength = ArrOfIndices.length;

    while(currentLength > 0){
        let random = Math.floor(Math.random() * currentLength);
        currentLength--;

        // Swapping current index with the random index
        let temp = ArrOfIndices[currentLength];
        ArrOfIndices[currentLength] = ArrOfIndices[random];
        ArrOfIndices[random] = temp;
    }

    // Giving order value to blocks
    blocks.forEach((elem,i) => {
        elem.style.order = ArrOfIndices[i];
    });
}

function InitializeBlocks(){
    blocks.forEach(elem => {
        elem.addEventListener('click',function(){
            elem.classList.add('isFlipped');
            checkIfWin();
        }); 
    });
}

function checkIfWin(){
    let flipped = blocks.filter(flippedBlock => flippedBlock.classList.contains('isFlipped'));
    let wrongTrials = document.querySelector('.wrong-trials span');

    if(flipped.length === 2){
        // Clear their isFlipped class  
        setTimeout(()=>{
            flipped[0].classList.remove('isFlipped');
            flipped[1].classList.remove('isFlipped');
        },1000);

        // Prevent clicking
        gameContainer.classList.add('no-click');
        setTimeout(()=>{
            gameContainer.classList.remove('no-click');
        },1000);

        // Check if winning
        if(flipped[0].getAttribute('data-photo') === flipped[1].getAttribute('data-photo')){
            flipped[0].classList.add('isDone');
            flipped[1].classList.add('isDone');
        }
        else{
            wrongTrials.innerHTML = parseInt(wrongTrials.innerHTML) + 1;
        }
    }
}