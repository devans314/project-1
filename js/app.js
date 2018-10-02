// player object
// players stats will change based on a function that runs through battle, 
// and one that runs after battle to check for level ups (stat increases)
const gameObjects = []
const player = {
    name: name,
    x: 5,
    y: 1,
    health: 10,
    strength: 4,
    agility: 3,
    level: 1,
    experience: 0
 }

// button starts the game
//  $('button').on('click', () => {
//     const $nameInput = $('input').val();
//     player.name = $nameInput;
//     $('.name').text(player.name)
   
//  }
//  );

 class Enemy {
     constructor(x, y, health, strength, agility) {
        this.x = x
        this.y = y
        this.health = health
        this.strength = strength
        this.agility = agility
     }
 }

const createKobold =()=>{
const kobold = new Enemy (Math.ceil(Math.random()* 10), Math.ceil(Math.random()* 10), 10, 5, 6)
$(`.square-${kobold.x}-${kobold.y}`).addClass('kobold')
console.log(kobold.x, kobold.y);
 } 

const statUpdate =() => {
    $('#level').append(player.level)
    $('#health').append(player.health)
    $('#strength').append(player.strength)
    $('#agility').append(player.agility)
}


 setInterval(statUpdate(),1000)

 

 // grid map
for(let y = 1; y < 11; y++){
    $('.map').append(`<div class='game-column game-column-${y}'></div>`)
    for(let x = 10; x > 0; x--){
        const gridSquare = $('<div/>')
        gridSquare.addClass('square')
        gridSquare.addClass(`square-${y}-${x}`)
        $(`.game-column-${y}`).append(gridSquare)
    }
}
createKobold();  

// event listener for key presses.  Four arrow keys will move the player around the grid.
$('body').keydown((event)=>{
    if(event.which == 65){
        moveLeft();
     }
    else if(event.which == 68){
        moveRight()
    }else if(event.which == 87){
        moveUp();
    }else if(event.which == 83){
        moveDown();
    }  if($('.kobold#player').length > 0){
        console.log('lets fight')

    }
    }      
)
$(`.square-5-1`).attr('id', 'player')

// function for moving left
const moveLeft = () => {
    if(player.x > 1){
        const currentPos = $('#player');
        currentPos.removeAttr('id');
        player.x--;
        $(`.square-${player.x}-${player.y}`).attr('id', 'player');
    }
}

// function for moving right
const moveRight = () => {
    if(player.x < 10){
        const currentPos = $('#player');
        currentPos.removeAttr('id');
        player.x++;
        $(`.square-${player.x}-${player.y}`).attr('id', 'player');
    }
}

// function for moving up 
const moveUp = () => {
    if(player.y < 11){
        const currentPos = $('#player');
        currentPos.removeAttr('id');
        player.y++;
        $(`.square-${player.x}-${player.y}`).attr('id', 'player');
    }
    }
// function for moving down
const moveDown = () => {
    if(player.y < 11){
        const currentPos = $('#player');
        currentPos.removeAttr('id');
        player.y--;
        $(`.square-${player.x}-${player.y}`).attr('id', 'player');
        }
    }

