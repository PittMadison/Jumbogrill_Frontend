import React from "react";

import s from "./PuzzleBuilder.module.css";

import MenuPuzzle from "./MenuPuzzle/MenuPuzzle";
import BuffetPuzzle from "./BuffetPuzzle/BuffetPuzzle";
import GrillPuzzle from "./GrillPuzzle/GrillPuzzle";
import RestPuzzle from "./RestPuzzle/RestPuzzle";
import CarPuzzle from "./CarPuzzle/CarPuzzle";

const PuzzleBuilder = props => {
  const puzzles = [
    MenuPuzzle,
    BuffetPuzzle,
    GrillPuzzle,
    RestPuzzle,
    CarPuzzle
  ];
  return (
    <div className={s.PuzzleBuilder}>
      {puzzles.map(el =>
        React.createElement(el, {
          steps: props.steps,
          key: puzzles.indexOf(el)
        })
      )}
    </div>
  );
};

export default PuzzleBuilder;
