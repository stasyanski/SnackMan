function createMaze() {
    const numOfRows = mazeMatrix.length;
    const rowLength = mazeMatrix[0].length;

    for (let i = 0; i < 10; i++) {
        let randArray = Math.floor(Math.random() * numOfRows);
        let randPos = Math.floor(Math.random() * rowLength);

        if (mazeMatrix[randArray][randPos] == 0 &&
            (randArray - 1 < 0 || randPos - 1 < 0 || mazeMatrix[randArray - 1][randPos - 1] != 1) &&
            (randArray - 1 < 0 || randPos + 1 >= rowLength || mazeMatrix[randArray - 1][randPos + 1] != 1) &&
            (randArray + 1 >= numOfRows || randPos - 1 < 0 || mazeMatrix[randArray + 1][randPos - 1] != 1) &&
            (randArray + 1 >= numOfRows || randPos + 1 >= rowLength || mazeMatrix[randArray + 1][randPos + 1] != 1)
        ) {
            mazeMatrix[randArray][randPos] = 1;
            console.log('Wall @ ', randArray, randPos);
        } else {
            i--;
        }
    }
}
createMaze();

function mazeMatrixPopulate() {
    const main = document.querySelector('main');
    for (let y of mazeMatrix) {
        for (let x of y) {
            let block = document.createElement('div');
            block.classList.add('block');

            switch (x) {
                case 1:
                    block.classList.add('wall');
                    break;
                case 2:
                    block.id = 'player';
                    let mouth = document.createElement('div');
                    mouth.classList.add('mouth');
                    block.appendChild(mouth);
                    break;
                case 3:
                    block.classList.add('enemy');
                    break;
                default:
                    block.classList.add('point');
                    block.style.height = '1vh';
                    block.style.width = '1vh';
            }
            main.appendChild(block);
        }
    }
}
mazeMatrixPopulate();