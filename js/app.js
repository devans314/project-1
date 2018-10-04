
const gameObjects = []
let requiredExperience = 10
const player = {
    name: name,
    x: 5,
    y: 1,
    health: 10,
    strength: 4,
    agility: 3,
    level: 1,
    potion: 1,
    experience: 0,
    floor: 1,
    attack(target){
        target.health -= player.strength
        if(target.health <= 0){
            target.health = 0
        }
    },
    usePotion(){
        player.health += 10
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
        let validSquareChosen = false;
        let noConflicts = true;
        while(!validSquareChosen){
            let randomX = (Math.ceil(Math.random()* 10))
            let randomY = (Math.ceil(Math.random()* 10))
            if((randomX != player.x || randomY !=player.y) && (randomX != kobold.x || randomY != kobold.y)){
                    validSquareChosen = true;
                    this.x = randomX
                    this.y = randomY
                    
        }
    }   
    }
}


const kobold = new Enemy (Math.ceil(Math.random()* 10), Math.ceil(Math.random()* 10), 10, 3, 1)
console.log(kobold);

// function to place kobold on the map
const placeKobold =()=>{
    $(`.square-${kobold.x}-${kobold.y}`).addClass('kobold')
    console.log(`kobold coords ${kobold.x}, ${kobold.y}`);
 } 

const trap = new Event()

const placeTrap =()=>{
    $(`.square-${trap.x}-${trap.y}`).addClass('trap')
    console.log(`trap coords ${trap.x}, ${trap.y}`)
}

const healthBonus = new Event ()

const placeHealthBonus =()=>{
    $(`.square-${healthBonus.x}-${healthBonus.y}`).addClass('healthBonus')

    console.log(`health bonus coords ${healthBonus.x}, ${healthBonus.y}`)
}
    
const statUpdate =() => {
    $('#level').text(player.level)
    $('#health').text(player.health)
    $('#strength').text(player.strength)
    $('#potions').text(player.potion)
    $('#floor').text(player.floor)
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

placeTrap();
placeHealthBonus();
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
            $(`.square-${trap.x}-${trap.y}`).removeClass('trap')
    }
        if($('#player').hasClass('healthBonus')){
            player.health += 2
            alert("You've been blessed with additional health! Stay blessed!")
            $(`.square-${healthBonus.x}-${healthBonus.y}`).removeClass('healthBonus')
        }
        if($('#player').hasClass('kobold')){
        $(".modal").modal("show");
    }
    }      
)

$('.potion').on('click', () => {
    $('.log').empty();
    if(player.potion > 0){
        player.usePotion();
        player.potion -= 1;
    $('.log').text(`You recovered 10 health!`)
    } else {
        $('.log').text(`You don't have any potions!`)
    }
})

$('.attack').on('click', () => {
    $('.log').empty();
    player.attack(kobold)
        $('.log').text(`You dealt ${player.strength} damage!`)
        enemyDeath();
        console.log(`kobold health = ${kobold.health}`);
    setTimeout(()=>{
        if(kobold.health > 0){
            kobold.attack(player)
    $('.log').text(`Kobold dealt ${kobold.strength} damage!`)
        }}, 2000)
        attackDisable();
})
    

const attackDisable=()=>{
        $('.attack').attr("disabled","disabled");
        const enableButton=()=>{
            $('.attack').removeAttr("disabled","disabled");
        }
        setTimeout(enableButton,2000)
    }

const levelUp = () => {
        if(player.experience >= requiredExperience){
            player.experience = 0
            requiredExperience += 5
            player.level++
            player.health += Math.ceil(Math.random() * 4)
            player.strength += Math.ceil(Math.random() * 1)
            
        }
}
const enemyDeath = () => {
    if(kobold.health === 0){
        $('.modal').modal('hide')
        player.experience += 10
        $(`.square-${kobold.x}-${kobold.y}`).removeClass('kobold')
    }
}

const death = () => {
    if(player.health === 0){
        const retry = confirm("YOU DIED...RETRY?")
        if (retry === true) {
            document.location.reload();
        } 
    }    
}
setInterval(()=>{
    levelUp();
    statUpdate();
    death();
    
},100)

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

