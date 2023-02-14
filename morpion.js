var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var initialBoard = [
    [null, null, null],
    [null, null, null],
    [null, null, null]
];
function getDiagonals(board) {
    return [board.map(function (row, y) { return row[y]; }), board.map(function (row, y) { return row[2 - y]; })];
}
function getColumns(board) {
    return board.map(function (row, y) { return row.map(function (_, x) { return board[x][y]; }); });
}
function getRows(board) {
    return board;
}
function getOwner(cells) {
    return cells.every(function (cell) { return cell !== null && cell === cells[0]; })
        ? cells[0]
        : null;
}
function getWinner(board) {
    var diagonals = getDiagonals(board);
    var columns = getColumns(board);
    var rows = getRows(board);
    return __spreadArray(__spreadArray(__spreadArray([], diagonals, true), columns, true), rows, true).reduce(function (winner, cells) {
        return winner || getOwner(cells);
    }, null);
}
function isEven(n) {
    return n % 2 === 0;
}
function getNextPlayer(board) {
    var getEmptyCellCount = function (row) {
        return row.filter(function (cell) { return cell === null; }).length;
    };
    var emptyCellsCount = board.reduce(function (sum, row) { return sum + getEmptyCellCount(row); }, 0);
    return isEven(emptyCellsCount) ? 2 : 1;
}
function play(board, x, y) {
    if (!getWinner(board) && !board[y][x]) {
        return board.map(function (row, rowY) {
            return rowY === y
                ? row.map(function (cell, cellX) { return (cellX === x ? getNextPlayer(board) : cell); })
                : row;
        });
    }
    return board;
}
var board = initialBoard;
var i = 0;
var tour = 0;
// MV
var cases = document.querySelectorAll('.case');
var titre = document.querySelectorAll('#msg');
document.querySelectorAll('#w').forEach(function (div) {
    div.classList.remove('wrond');
    div.classList.add('wcroix');
});
cases.forEach(function (div) {
    div.addEventListener('click', function () {
        var string = div.id.toString();
        var char = div.id.split("");
        var x = parseInt(char[0]);
        var y = parseInt(char[1]);
        if (board[y][x] == null) {
            if (getWinner(board) == null) {
                board = play(board, x, y);
                if (getNextPlayer(board) == 2) {
                    div.classList.add("croix");
                    document.querySelectorAll('#w').forEach(function (div) {
                        div.classList.remove('wcroix');
                        div.classList.add('wrond');
                    });
                }
                else if (getNextPlayer(board) == 1) {
                    div.classList.add("rond");
                    document.querySelectorAll('#w').forEach(function (div) {
                        div.classList.remove('wrond');
                        div.classList.add('wcroix');
                    });
                }
                tour++;
            }
            if (getWinner(board) != null) {
                titre.forEach(function (h1) {
                    h1.classList.add("msg");
                    document.querySelector('#msg').innerHTML = 'Joueur ' + getWinner(board) + ' gagné<br>Rejouer';
                    h1.addEventListener('click', function () {
                        board = initialBoard;
                        cases.forEach(function (div) {
                            div.classList.remove("croix");
                            div.classList.remove("rond");
                            h1.classList.remove("msg");
                            document.querySelector('#msg').innerHTML = null;
                        });
                        tour = 0;
                        document.querySelectorAll('#w').forEach(function (div) {
                            div.classList.remove('wrond');
                            div.classList.add('wcroix');
                        });
                    });
                });
            }
            else if (tour == 9) {
                titre.forEach(function (h1) {
                    h1.classList.add("msg");
                    document.querySelector('#msg').innerHTML = 'Match nul<br>Rejouer';
                    h1.addEventListener('click', function () {
                        board = initialBoard;
                        cases.forEach(function (div) {
                            div.classList.remove("croix");
                            div.classList.remove("rond");
                            h1.classList.remove("msg");
                            document.querySelector('#msg').innerHTML = null;
                        });
                        tour = 0;
                        document.querySelectorAll('#w').forEach(function (div) {
                            div.classList.remove('wrond');
                            div.classList.add('wcroix');
                        });
                    });
                });
            }
        } //else{
        //	document.querySelector('h1').innerHTML = 'Nouveau contenu h1';
        //	console.log('case déjà prise')
        //}
    });
});
// let tour = 0
// while(getWinner(board)==null && tour != 9){
//     let x = parseInt(readline.question("Colonne : "));
//     let y = parseInt(readline.question("Ligne : "));
//         if(x == 0 || x == 1 || x == 2 && y == 0 || y == 1 || y == 2){
//             if(board[y][x] == null){
//                 board = play(board, x, y)
//                 console.log(board)
//                 tour++
//             }else{
//                 console.log('Case déjà prise, réessayez')
//             }
//         }else{
//             console.log('Valeur non valable, réessayez.')
//         }
//     if(tour == 9){
//         console.log('Match nul vous êtes nul')
//     }
// }
//
