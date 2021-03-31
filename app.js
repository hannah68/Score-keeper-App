const resetBtn = document.querySelector('.reset');
const playValue = document.querySelector('#play');
const p1 ={
    score : 0,
    scoreP:document.querySelector('.score1'),
    button:document.querySelector('.player1')
}

const p2 ={
    score : 0,
    scoreP:document.querySelector('.score2'),
    button:document.querySelector('.player2')
}


// default score
let winningScore = 3;
// keep track of whether we game over or not(when one wins, another btn should stop adding score)
let gameOver = false;


// update score==============================
function updateScores(player,opponent){
    if(!gameOver){
        player.score += 1;
        if(player.score === winningScore){
            gameOver = true;
            player.scoreP.classList.add('winner');
            opponent.scoreP.classList.add('loser');
            player.button.disabled ='true';
            opponent.button.disabled ='true';
            
        }
        player.scoreP.innerText = player.score;
        tableShow();
        winnerName();
    }
}



//reset function by creating loop============
function reset(){
    gameOver = false;
    for(let p of [p1,p2]){
        p.score =0;
        p.scoreP.innerText = 0;
        p.scoreP.classList.remove('winner','loser');
        p.button.disabled =false;
    }
}

// Add eventListener===========================
p1.button.addEventListener('click',function(){
    updateScores(p1,p2);
})

p2.button.addEventListener('click',function(){
    updateScores(p2,p1);
})

resetBtn.addEventListener('click',reset);

playValue.addEventListener('change',function(){
    winningScore= parseInt(this.value);
    AddnextRoundRow();
    reset();
    // each time we change the playvalue, score and winner name should update to 0 and '-'
    winnerList.innerText = '-';
    score1List.innerText = 0;
    score2List.innerText = 0;
})

// =================================================================================
// adding player1 and player2'name to start the play
const addBtn1 = document.querySelector('.add1');
const addBtn2 = document.querySelector('.add2');
const input1 = document.querySelector('.text1');
const input2 = document.querySelector('.text2');
const listContainerP1 = document.querySelector('.container1');
const listContainerP2 = document.querySelector('.container2');



addBtn1.addEventListener('click',function(){
    const list = document.createElement('li');
    list.innerText = input1.value;
    list.classList.add('pName1');
    listContainerP1.appendChild(list);
    input1.value ='';
})

addBtn2.addEventListener('click',function(){
    const list = document.createElement('li');
    list.innerText = input2.value;
    list.classList.add('pName2');
    listContainerP2.appendChild(list);
    input2.value ='';
})
// ==================================================================================
// game setup
const startBtn = document.querySelector('.start');
const container = document.querySelector('.Scorecontainer');
const pinkCard =document.querySelector('.pinkCard');
const btn =document.querySelectorAll('#btn');

startBtn.addEventListener('click',function(){
   container.classList.add('show');
   pinkCard.classList.add('hide');
   btn.forEach((b)=>{
       b.style.border ='none';
   })
})

// ========================================================
// back to set game page
const backBtn = document.querySelector('.back');

backBtn.addEventListener('click', function(){
    container.classList.add('hide');
    pinkCard.classList.add('show');
})


// ==========================================================================
// table score display
const table = document.querySelector('.table');
const score1List = document.querySelector('.score1List');
const score2List = document.querySelector('.score2List');
const winnerList = document.querySelector('.winnerList');
const round = document.querySelector('.round');
const tBody = document.querySelector('tbody');


// it shows table with the points
function tableShow(){
    table.classList.add('show');
    // show us the points in the table (for example: 3 - 4)
    score1List.textContent = Number(document.querySelector('.score1').innerText);
    score2List.textContent = Number(document.querySelector('.score2').innerText);
}

// it shows who is the winner
function winnerName(){
    // it assigns the points to the players (reihaneh = 3)
    input1.value = document.querySelector('.score1').innerText;
    input2.value = document.querySelector('.score2').innerText;
    winnerList.innerText = '';

    // compare two points and determine the winner in the table
    if(input1.value > input2.value){
        // when player1 is winner, shows winner's name
        winnerList.innerText = document.querySelector('.pName1').innerText;
    }

    else if(input1.value < input2.value){
        // when player2 is winner, shows winner's name
        winnerList.innerText = document.querySelector('.pName2').innerText;
    }

    // when the points are equal
    else if(input1.value === input2.value){
        winnerList.innerText = '-';
    }

    input1.value ='';
    input2.value ='';
}


// loop through : to append three children(columns) to their parent(row)
function appendChildren(parent, children){
    children.forEach(child => {
        parent.appendChild(child);
    });
}

function AddnextRoundRow(){
    // create new row with three columns and append them to their parent
    const nextRow = document.createElement('tr');
    const roundColumn = document.createElement('th');
    const winnerColumn = document.createElement('th');
    const scoreColumn = document.createElement('th');
    appendChildren(nextRow,[roundColumn, winnerColumn, scoreColumn])
    tBody.appendChild(nextRow);
    
    // show previous winnercolumn in the table
    winnerColumn.classList.add('winnerList');
    winnerColumn.innerText = winnerList.innerText;
    
    // show previous scoreecolumn in the table
    scoreColumn.innerHTML = `<span class="score1List">${score1List.textContent}</span> - <span class="score2List">${score2List.textContent}</span>`;
    
    // show previous roundcolumn in the table and add one to the next roundcolumn
    roundColumn.classList.add('round');
    roundColumn.innerText = Number(round.innerText);
    round.innerText = Number(roundColumn.innerText) + 1;
    
    // update score each time
    updateScores(p1,p2);
    updateScores(p2,p1);
    // add color to new row each time
    nextRow.style.backgroundColor ='#cabdeb';
}

// ======================================================================
// Addding picture of game
const gameType = document.querySelector('#gameType');
const img = document.querySelector('.img');

gameType.addEventListener('change',function(){
    if(this.value === 'tennis'){
        img.src = 'tennis.jpg';
    }

    else if(this.value === 'badminton'){
        img.src = 'badminton.jpg';
    }

    else if(this.value === 'ping pong'){
        img.src = 'pingpong.jpg';
    }
})





