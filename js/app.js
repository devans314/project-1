

const player = {
    name: name,
    x: 5,
    y: 1,
    health: 10,
    strength: 4,
    agility: 3,
    level: 1,
    experience: 0,
    attack(target){
        target.health -= player.strength
        if(target.health <= 0){
            target.health = 0
        }
    }
 }
console.log(player.health);

class Enemy {
     constructor(x, y, health, strength, agility) {
        this.x = x;
        this.y = y;
        this.health = health;
        this.strength = strength;
        this.agility = agility;
     }

        attack(target){
            target.health -= this.strength
            if(target.health <= 0){
                target.health = 0
            }
     }
}

class Event {
    constructor(x,y) {
        this.x = x
        this.y = y
    }
    }


const kobold = new Enemy (Math.ceil(Math.random()* 10), Math.ceil(Math.random()* 10), 10, 5, 6)
console.log(kobold);

// function to place kobold on the map
const placeKobold =()=>{
    $(`.square-${kobold.x}-${kobold.y}`).addClass('kobold')
    console.log(kobold.x, kobold.y);
 } 
const createHiddenEvents =()=>{
    const hiddenEvent = new Event (Math.ceil(Math.random()* 10), Math.ceil(Math.random()* 10))
    $(`.square-${hiddenEvent.x}-${hiddenEvent.y}`).addClass('trap')
    console.log(hiddenEvent.x, hiddenEvent.y)
}

    
const statUpdate =() => {
    $('#level').text(player.level)
    $('#health').text(player.health)
    $('#strength').text(player.strength)
    $('#agility').text(player.agility)
}
 

 

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

$(`.square-5-1`).attr('id', 'player')


createHiddenEvents();


placeKobold();  

// event listener for key presses.  Four arrow keys will move the player around the grid.
// also contains if checks for events such as battles and traps
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
    }   if($('#player').hasClass('trap')){
        player.health -= 2
        alert("You've stepped on a trap!");
        $(`.square-${hiddenEvent.x}-${hiddenEvent.y}`).remove('trap')
    }
        if($('#player').hasClass('kobold')){
        $(".modal").modal("show");
        
    }
    }      
)

$('.attack').on('click', () => {
    player.attack(kobold);
    console.log(kobold.health);

})


setInterval(statUpdate,100)

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

