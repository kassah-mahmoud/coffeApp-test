import TilesGame from "./Game";

class GamePlayer {
  game: TilesGame;
  constructor(
    dimension: number,
    numberOfColors: number,
    maxAdjacentTiles: number = 4
  ) {
    this.game = new TilesGame(dimension, numberOfColors, maxAdjacentTiles);
  }

  play() {
    console.log(this.game.colors);
    console.table(this.game.tiles);

    // automatice player here
  }
}

export default GamePlayer;
