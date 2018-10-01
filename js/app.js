// player object

// const player = {
//     x:
//     y:
//     name: ,
//     health: 10
//     strength: 4
//     agility: 3

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
