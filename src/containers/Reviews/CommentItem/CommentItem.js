import React from 'react';
import moment from 'moment';

import s from './CommentItem.module.css';

const CommentItem = (props) => {

    let {name, date, comment} = props;

    return (
        <li className={s.Item}>
            <div className={s.NameCommentDate}>
                <p className={s.Name}>{name}</p>
                <p className={s.CommentDate}>{moment.utc(date).local().format('YYYY-MM-DD')}</p>
            </div>
            <p className={s.Comment}>{comment}</p>
        </li>
    )
}

export default CommentItem;
