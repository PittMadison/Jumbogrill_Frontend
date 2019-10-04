import React from 'react'
import Header from '../Header/Header';
import Bucket from '../Bucket/Bucket';

import s from './BucketMain.module.css';
import MainFooter from '../MainFooter/MainFooter';

const BucketMain = (props) => {
    console.log(props)
    return (
        <div className={s.Wrapper}>
            <Header
                boxDeliveryBucket={props.boxDeliveryBucket} 
                categories={props.categories} 
                path={props.path}/>
            <Bucket
            history={props.history}
            clearBucket={props.clearBucket}
            takeMessage={props.takeMessage}
                modalToggle={props.modalToggle}
                orderForm={props.orderForm} 
                removeFromBucketBox={props.removeFromBucketBox} 
                boxDeliveryBucket={props.boxDeliveryBucket}
                addBoxCount={props.addBoxCount}
                subBoxCount={props.subBoxCount}
                ordering={props.ordering}
                orderingChange={props.orderingChange}
            />
            <MainFooter path={props.path}/>
        </div>
    )
}

export default BucketMain
