import React from "react";

import s from "./JumboGrillThatIs.module.css";

const JumboGrillThatIs = props => {
  return (
    <div className={s.Wrapper}>
      <h5 className={s.Title}>Jumbo Grill это</h5>
      <ul className={s.List}>
        <li className={s.Item}>
          <div className={s.Years} />
          <p>25 лет опыта в приготовлении гриля</p>
        </li>
        <li className={s.Item}>
          <div className={s.Recipe} />
          <p>Используем авторские рецепты маринада</p>
        </li>
        <li className={s.Item}>
          <div className={s.Patent} />
          <p>Разработали и запатентовали собственную гриль систему</p>
        </li>
        <li className={s.Item}>
          <div className={s.Clock} />
          <p>Детально по минутам отточенный процесс выездного обслуживания</p>
        </li>
      </ul>
    </div>
  );
};

export default JumboGrillThatIs;
