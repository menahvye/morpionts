type Player = 1 | 2;
type Cell = Player | null;
type Row = Cell[];
type Columns = Cell[];
type Diagonals = Cell[];
type Board = Row[];


let initialBoard: Board = [
	[null, null, null],
	[null, null, null],
	[null, null, null]
];
function getDiagonals(board: Board): Diagonals[] {
	return [board.map((row, y) => row[y]), board.map((row, y) => row[2 - y])];
}
function getColumns(board: Board): Columns[] {
	return board.map((row, y) => row.map((_, x) => board[x][y]));
}
function getRows(board: Board): Row[] {
	return board;
}


function getOwner(cells: Cell[]): Player | null {
	return cells.every((cell) => cell !== null && cell === cells[0])
	? cells[0]
	: null;
}



function getWinner(board: Board): Player | null {
	const diagonals = getDiagonals(board);
	const columns = getColumns(board);
	const rows = getRows(board);
	return [...diagonals, ...columns, ...rows].reduce<Player | null>(
		(winner, cells) => {
			return winner || getOwner(cells);
		},
		null
		);
	}
	
	function isEven(n: number): boolean {
		return n % 2 === 0;
	}
	
	function getNextPlayer(board: Board): Player {
		const getEmptyCellCount = (row: Row): number =>
		row.filter((cell) => cell === null).length;
		
		const emptyCellsCount = board.reduce(
			(sum, row) => sum + getEmptyCellCount(row),
			0
			);
			
			return isEven(emptyCellsCount) ? 2 : 1;
		}
		
		function play(board: Board, x: number, y: number): Board {
			if (!getWinner(board) && !board[y][x]) {
				return board.map((row, rowY) =>
				rowY === y
				? row.map((cell, cellX) => (cellX === x ? getNextPlayer(board) : cell))
				: row
				);
			}
			return board;
		}
		
		
		let board = initialBoard;
		let i = 0
		let tour = 0
		
		// MV
		
		
		const cases = document.querySelectorAll('.case');
		const titre = document.querySelectorAll('#msg');
		
		
			document.querySelectorAll('#w').forEach(div =>{
				div.classList.remove('wrond')
				div.classList.add('wcroix')
			});
		
		cases.forEach(function(div) {
			div.addEventListener('click', function() {
				
				
				
				var string= div.id.toString();
				var char = div.id.split("");
				
				var x = parseInt(char[0]);
				var y = parseInt(char[1]);
				
				if(board[y][x] == null){
					
					if(getWinner(board)==null){
						board = play(board, x, y)
						if(getNextPlayer(board) == 2){
							div.classList.add("croix")
							document.querySelectorAll('#w').forEach(div =>{
								div.classList.remove('wcroix')
								div.classList.add('wrond')
							});
						}else if(getNextPlayer(board) == 1){
							div.classList.add("rond")
							document.querySelectorAll('#w').forEach(div =>{
								div.classList.remove('wrond')
								div.classList.add('wcroix')
							});
						}
						
						tour++
					}
					if(getWinner(board)!=null){
						titre.forEach(function(h1){
							h1.classList.add("msg")
							document.querySelector('#msg').innerHTML = 'Joueur '+getWinner(board)+' gagné<br>Rejouer';
							h1.addEventListener('click', function() {
								board = initialBoard;
								cases.forEach(div => {
									div.classList.remove("croix");
									div.classList.remove("rond");
									h1.classList.remove("msg");
									document.querySelector('#msg').innerHTML = null;
								});
								tour = 0
								document.querySelectorAll('#w').forEach(div =>{
									div.classList.remove('wrond')
									div.classList.add('wcroix')
								});
							});
						});
					}else if(tour == 9){
						titre.forEach(function(h1){
							h1.classList.add("msg")
							document.querySelector('#msg').innerHTML = 'Match nul<br>Rejouer';
							h1.addEventListener('click', function() {
								board = initialBoard;
								cases.forEach(div => {
									div.classList.remove("croix");
									div.classList.remove("rond");
									h1.classList.remove("msg");
									document.querySelector('#msg').innerHTML = null;
								});
								tour = 0
								document.querySelectorAll('#w').forEach(div =>{
									div.classList.remove('wrond')
									div.classList.add('wcroix')
								});
							});
						});
					}
				}//else{
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
		
		