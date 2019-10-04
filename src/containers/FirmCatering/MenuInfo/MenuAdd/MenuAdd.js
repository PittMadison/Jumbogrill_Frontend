import React, { Component, Fragment } from "react";

import deleteBtn from "../../../../assets/img/deleteBtn.svg";
import closeIcon from "../../../../assets/img/closeIcon.svg";
import newIcon from "../../../../assets/img/newIcon.svg";
import leftArrowBlack from "../../../../assets/img/leftArrowBlack.svg";

import s from "./MenuAdd.module.css";
import SubMenuAdd from "./SubMenuAdd/SubMenuAdd";

class MenuAdd extends Component {
  state = {
    details: false,
    id: 0
  };

  getCategoryId = event => {
    console.log(event.currentTarget.id);
    this.setState({ id: Number(event.currentTarget.id) });
  };
  detailsHandler = () => this.setState({ details: !this.state.details });

  render() {
    const linkAction = async event => {
      event.preventDefault();
      await this.getCategoryId(event);
      await this.detailsHandler();
    };
    const category = this.props.categories.find(el => el.id === this.state.id);
    return (
      <Fragment>
        <div className={s.Wrapper}>
          <div style={this.props.window < 500 && this.state.details ? {width: '38%'}:{}} className={s.SetArea}>
            <h5 className={s.SetTitle}>{(this.props.window > 500 ? 'Меню: ' : '') + this.props.set.name}</h5>
            <p className={s.SetNaming}>Наименование</p>
            <div className={s.ListWrapper}>
              <ul className={s.List}>
                {this.props.set.products.map(el => (
                  <li key={el.id} className={s.Item}>
                    <img
                      onClick={this.props.deleteDish}
                      id={el.id}
                      name={this.props.set.name}
                      className={s.Delete}
                      src={deleteBtn}
                      alt="delete_pic"
                    />
                    <p className={s.Name}>{el.name}</p>
                    {el.is_added && (
                      <img className={s.New} src={newIcon} alt="new_pic" />
                    )}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          {this.state.details && category ? (
            <SubMenuAdd
            window={this.props.window}
              addDishToSet={this.props.addDishToSet}
              set={this.props.set}
              category={category}
              detailsHandler={this.detailsHandler}
            />
          ) : null}
          {!this.state.details && (
            <div className={s.MenuArea}>

                <h5 className={s.Categories}>{this.props.window < 500 ? 'Категории' : 'Категории блюд'}</h5>
                <img
                  onClick={this.props.addToggle}
                  className={s.Close}
                  src={closeIcon}
                  alt="close_icon"
                />

              <div className={s.MenuWrapper}>
                <ul className={s.Menu}>
                  {this.props.categories.map(el => (
                    <li
                      className={s.MenuItem}
                      key={el.id}
                      style={{
                        backgroundImage: `url(${el.image})`,
                        backgroundSize: "cover",
                        backgroundPosition: "center"
                      }}
                    >
                      <a
                        onClick={linkAction}
                        id={el.id}
                        className={s.Link}
                        href="null"
                      >
                        <p className={s.LinkText}>{el.name}</p>
                      </a>
                    </li>
                  ))}
                  <li className={s.MenuItem}>
                    <button
                      onClick={this.props.addToggle}
                      className={s.BackBtn}
                    >
                      <img
                        className={s.Arrow}
                        src={leftArrowBlack}
                        alt="left_arrow"
                      />
                      <p>Назад</p>
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          )}
        </div>
      </Fragment>
    );
  }
}

export default MenuAdd;
