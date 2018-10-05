
// grid map is created
for(let y = 1; y < 11; y++){
    $('.map').append(`<div class='game-column game-column-${y}'></div>`)
    for(let x = 10; x > 0; x--){
        const gridSquare = $('<div/>')
        gridSquare.addClass('square')
        gridSquare.addClass(`square-${y}-${x}`)
        $(`.game-column-${y}`).append(gridSquare)
    }
}


const gameObjects = []
let randomItem = (Math.ceil(Math.random()* 3))
console.log(`this is chest item ${randomItem}`)
let requiredExperience = 10
const player = {
    name: name,
    x: 5,
    y: 1,
    currentHealth: 10,
    maxHealth: 10,
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
        if(player.currentHealth += 5 > player.maxhealth){
            player.currentHealth = player.maxHealth
        } else {
            player.currentHealth += 5;
        }
    }
 }
console.log(player.currentHealth);


class Enemy {
     constructor(health, strength) {
        this.health = health;
        this.strength = strength;
        let validSquareChosen = false;
        while(!validSquareChosen){
            let noConflicts = true;
            let randomX = (Math.ceil(Math.random()* 10))
            let randomY = (Math.ceil(Math.random()* 10))
            if((randomX != player.x || randomY !=player.y)){
                validSquareChosen = true;
                this.x = randomX
                this.y = randomY
            } 
            for(let i = 0; i < gameObjects.length; i++){
                if(this.x != randomX || this.y != randomY){}
                else {
                    noConflicts = false;
                }
            }
            if(noConflicts = true)
                gameObjects.push(this);
            }
        }
            attack(target){
                target.currentHealth -= this.strength
                if(target.currentHealth <= 0){
                    target.currentHealth = 0

            }
     }
}

class Event {
    constructor() {
        let validSquareChosen = false;
        while(!validSquareChosen){
            let noConflicts = true;
            let randomX = (Math.ceil(Math.random()* 10))
            let randomY = (Math.ceil(Math.random()* 10))
            if((randomX != player.x || randomY !=player.y) && (randomX != kobold.x || randomY != kobold.y)){
                validSquareChosen = true;
                this.x = randomX
                this.y = randomY
            } 
            for(let i = 0; i < gameObjects.length; i++){
                if(this.x != randomX || this.y != randomY){}
                else {
                    noConflicts = false;
                }
            }
            if(noConflicts = true)
                gameObjects.push(this);
            }
        }
    }

const kobold = new Enemy(10, 3)
const kobold2 = new Enemy(10, 3)
// function to place kobold on the map

const placeKobold =()=>{
    $(`.square-${kobold.x}-${kobold.y}`).addClass('kobold')
    console.log(`kobold coords ${kobold.x}, ${kobold.y}`);
    $(`.square-${kobold2.x}-${kobold2.y}`).addClass('kobold')
    console.log(`kobold2 coords ${kobold2.x},${kobold2.y}`)
} 
placeKobold();  



const trap = new Event()
const chest = new Event()
const healthBonus = new Event()
console.log(gameObjects);

$(`.square-5-1`).attr('id', 'player')
$(`.square-${healthBonus.x}-${healthBonus.y}`).addClass('healthBonus')
console.log(`health bonus coords ${healthBonus.x}, ${healthBonus.y}`)
$(`.square-${trap.x}-${trap.y}`).addClass('trap')
console.log(`trap coords ${trap.x}, ${trap.y}`)
$(`.square-${chest.x}-${chest.y}`).addClass('chest')
console.log(`chest coords ${chest.x}, ${chest.y}`)
    

const statUpdate =() => {
    $('#level').text(player.level)
    $('#health').text(`${player.currentHealth}/${player.maxHealth}`)
    $('#strength').text(player.strength)
    $('#potions').text(player.potion)
    $('#floor').text(player.floor)
}
 
 

// event listener for key presses.  Four keys will move the player around the grid.
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
            player.currentHealth -= 2
            alert("You've stepped on a trap!");
            $(`.square-${trap.x}-${trap.y}`).removeClass('trap')
        }
        if($('#player').hasClass('healthBonus')){
            if(player.currentHealth += 2 >= player.maxHealth){
                player.maxHealth += 2
                player.currentHealth = player.maxHealth
                alert("You've been blessed with additional health! Stay blessed!")
                $(`.square-${healthBonus.x}-${healthBonus.y}`).removeClass('healthBonus')
            }
        }     
        if($('#player').hasClass('chest')){
            if(randomItem === 1){
                alert("You found a potion!")
                player.potion += 1
            } else if(randomItem === 2){
                alert('You found a rusty sword!')
                player.strength += 3
            } else if(randomItem === 3){
                alert('You found some armor!')
                player.maxHealth += 4
            }
            $(`.square-${chest.x}-${chest.y}`).removeClass('chest')
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
    $('.log').text(`You recovered health!`)
    setTimeout(()=>{
        if(kobold.health > 0){
            kobold.attack(player)
    $('.log').text(`Kobold dealt ${kobold.strength} damage!`)
        }}, 2000)
    } else {
        $('.log').text(`You don't have any potions!`)
    }
})

$('.attack').on('click', () => {
    $('.log').empty();
    player.attack(kobold)
        $('.log').text(`You dealt ${player.strength} damage!`)
        
        console.log(`kobold health = ${kobold.health}`);
    setTimeout(()=>{
        if(kobold.health > 0){
            kobold.attack(player)
    $('.log').text(`Kobold dealt ${kobold.strength} damage!`)
        }}, 2000)
        attackDisable();
        potionDisable();
        koboldDeath();
})
    

const attackDisable=()=>{
        $('.attack').attr("disabled","disabled");
        const enableButton=()=>{
            $('.attack').removeAttr("disabled","disabled");
        }
        setTimeout(enableButton,2000)
    }
const potionDisable=()=>{
    $('.potion').attr("disabled","disabled");
    const enableButton=()=>{
        $('.potion').removeAttr("disabled","disabled");
        }   
        setTimeout(enableButton,2000)
    }


const levelUp = () => {
        if(player.experience >= requiredExperience){
            player.experience = 0
            requiredExperience += 5
            player.level++
            player.maxHealth += Math.ceil(Math.random() * 4)
            player.strength += Math.ceil(Math.random() * 1)
            
        }
}
const removeKobold=(target)=>{
    if(kobold.health === 0){
        $(`.square-${target.x}-${target.y}`).removeClass('kobold')
    } 
}
const koboldDeath = () => {
    if(kobold.health === 0){
        $('.log').empty();
        $('.log').text(`You gained 5 experience points!`)
        player.experience += 5
        removeKobold(kobold)
        setTimeout(()=>{
            $('.modal').modal('hide')
            }, 2000)
            
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

