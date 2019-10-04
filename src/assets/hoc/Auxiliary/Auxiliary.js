import React from 'react'
import Header from '../../../components/Header/Header';
import MainFooter from '../../../components/MainFooter/MainFooter';

import s from './Auxiliary.module.css';
import MenuSubCategory from '../../../components/Menu/MenuSubCategory/MenuSubCategory';


const Auxiliary = (props) => {
    console.log(props)
    return (
        <div className={s.Wrapper}>
        <Header
            boxDeliveryBucket={props.boxDeliveryBucket} 
            categories={props.categories}
            path={props.path}/>
            <div className={s.Title}>
                <img className={s.Img} src={props.category.sub_image} alt={props.category.name}/>
                <h4 className={s.TitleHead}>{props.category.name}</h4>
            </div>
            <div className={s.CategoryBoxes}>
                {props.category.items.map(el=>
                    <MenuSubCategory 
                    key={el.slug}
                    subCategory={el}/>
                )}
            </div>
        <MainFooter path={props.path}/>

    </div>
    )
}

export default Auxiliary;