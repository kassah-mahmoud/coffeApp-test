import chroma from "chroma-js";
import { pickRandomArrayElement } from "./helpers";

class TilesGame {
  dimension: number = 0;
  numberOfColors: number = 0;
  maxAdjacentTiles: number = 4;
  colors: string[] = [];
  tiles: string[][] = [[]];

  constructor(
    dimension: number,
    numberOfColors: number,
    maxAdjacentTiles: number = 4
  ) {
    if (dimension <= 0) {
      throw new Error("Board dimension must be greater than 0");
    }
    if (numberOfColors <= 0) {
      throw new Error("Colors count must be greater than 0");
    }

    if (numberOfColors <= 0) {
      throw new Error("Max adjacent tiles must be greater than 0");
    }

    if (dimension * dimension <= numberOfColors) {
      throw new Error("Tiles count must be greater than colors count");
    }
    this.dimension = dimension;
    this.numberOfColors = numberOfColors;
    this.maxAdjacentTiles = maxAdjacentTiles;

    this.generateColors();
    this.initiateBoard();
  }
  private generateColors() {
    this.colors = chroma.scale().mode("lch").colors(this.numberOfColors);
  }

  private getTileAvailableColors(row: number = 0, col: number = 0) {
    const restrictedColors: string[] = [];
    const farthestAdjacentRow = row - (this.maxAdjacentTiles + 1);
    if (farthestAdjacentRow >= 0) {
      const rowAdjacentItems = this.tiles
        .map((value) => value[col])
        .slice(farthestAdjacentRow, row);

      if (rowAdjacentItems.every((color) => color === rowAdjacentItems[0])) {
        restrictedColors.push(rowAdjacentItems[0]);
      }
    }

    const farthestAdjacentCol = col - (this.maxAdjacentTiles + 1);
    if (farthestAdjacentCol >= 0) {
      const colAdjacentItems = this.tiles[row].slice(farthestAdjacentCol, col);

      if (colAdjacentItems.every((color) => color === colAdjacentItems[0])) {
        restrictedColors.push(colAdjacentItems[0]);
      }
    }

    return this.colors.filter((color) => !restrictedColors.includes(color));
  }

  private initiateBoard() {
    for (let i = 0; i < this.dimension; i++) {
      this.tiles[i] = [];
      for (let j = 0; j < this.dimension; j++) {
        const availableColors = this.getTileAvailableColors(i, j);

        this.tiles[i][j] = pickRandomArrayElement(
          availableColors.length > 0 ? availableColors : this.colors
        );
      }
    }
  }
}

export default TilesGame;
