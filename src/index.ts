import TilesGame from "./Game";

const colorsCount = 7;
const tilesDim = 10;

const coffeAppGame = new TilesGame(tilesDim, colorsCount);

console.table(coffeAppGame.tiles);
