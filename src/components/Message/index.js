import React from 'react'
import { parseISO, format } from 'date-fns';
import { MessageWrapper } from './style';

function Message(props) {
    return (
        <MessageWrapper>
            <div>
                {props.user}
            </div>
            {props.message}
            <div>
                {format(parseISO(props.date), "dd MMMM HH:mm")}
            </div>
        </MessageWrapper>
    );
}
export default Message;