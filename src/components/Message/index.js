import React from 'react'
import { parseISO, format } from 'date-fns';
import { Date, MessageText, MessageWrapper, User } from './style';

function Message(props) {
    return (
        <MessageWrapper>
            {
                props.user ? <User>{props.user}</User> : false
            }
            <MessageText>
                {props.message}
            </MessageText>
            <Date>
                {props.date === "Enviando..." ? props.date : format(parseISO(props.date), "dd MMMM HH:mm")}
            </Date>
        </MessageWrapper>
    );
}
export default Message;