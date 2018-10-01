// player object
// players stats will change based on a function that runs through battle, 
// and one that runs after battle to check for level ups (stat increases)
 const player = {
    x: 5,
    y: 1,
    health: 10,
    strength: 4,
    agility: 3,
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

// event listener for key presses.  Four arrow keys will move the player around the grid.
$('body').keydown((event)=>{
    if(event.which == 37){
        moveLeft();
    }else if(event.which == 39){
        moveRight()
    }else if(event.which == 38){
        moveUp();
    }else if(event.which == 40)
        moveDown();
})
$(`.square-5-1`).attr('id', 'player')

// function for moving left
const moveLeft = () => {
    if(player.x > 1){
        const currentPos = $('#player');
        currentPos.removeAttr('id');
        player.x--;
        $(`.square-${player.x}-1`).attr('id', 'player');
    }
}

// function for moving right
const moveRight = () => {
    if(player.x < 10){
        const currentPos = $('#player');
        currentPos.removeAttr('id');
        player.x++;
        $(`.square-${player.x}-1`).attr('id', 'player');
    }
}

// function for moving up 
const moveUp = () => {
    if(player.y < 10){
        const currentPos = $('#player');
        currentPos.removeAttr('id');
        player.y++;
        $(`.square-${player.y}-1`).attr('id', 'player');
    }
}