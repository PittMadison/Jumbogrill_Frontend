import React from "react";
import { NavLink } from "react-router-dom";

import s from "./HeaderCatering.module.css";
import one from '../../assets/img/puzzles2/puzzle1.png';
import second from '../../assets/img/puzzles2/puzzle2.png';
import third from '../../assets/img/puzzles2/puzzle3.png';
import fourth from '../../assets/img/puzzles2/puzzle4.png';
import fifth from '../../assets/img/puzzles2/puzzle5.png';
import puzzlesFull from "../../assets/img/puzzlesFull.jpg";
import verticalPuzzles from "../../assets/img/verticalPuzzles.jpg";

const HeaderCatering = props => {
  return (
    <div className={s.Wrapper}>
      <div className={s.Buttons}>
      <a href="tel:+380443339012" className={s.Button}>
              Связаться с нами
            </a>
        
        {/* <NavLink to="/Catering">Собери свой кейтеринг</NavLink> */}
      </div>

      <img
        className={[s.Puzzle, s.Display1].join(" ")}
        src={puzzlesFull}
        alt="puzzle"
      />
      <img
        className={[s.Puzzle2, s.Display2].join(" ")}
        src={verticalPuzzles}
        alt="puzzle"
      />
{/* 
      <div className={s.HeaderCatering}>
                <img className={props.animation ? [s.Animation1, s.FirstPuzzle].join(' ') : s.FirstPuzzle} src={one} alt="puzzle"/>
                <img className={props.animation ? [s.Animation2, s.SecondPuzzle].join(' ') : s.SecondPuzzle} src={second} alt="puzzle"/>
                <img className={props.animation ? [s.Animation3, s.ThirdPuzzle].join(' ') : s.ThirdPuzzle} src={third} alt="puzzle"/>
                <img className={props.animation ? [s.Animation4, s.FourthPuzzle].join(' ') : s.FourthPuzzle} src={fourth} alt="puzzle"/>
                <img className={props.animation ? [s.Animation5, s.FifthPuzzle].join(' ') : s.FifthPuzzle} src={fifth} alt="puzzle"/>
            </div>*/}
    </div> 
  );
};

export default HeaderCatering;
