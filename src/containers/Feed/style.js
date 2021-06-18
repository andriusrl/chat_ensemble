import styled from "styled-components"

export const WrapperFeed = styled.div`
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`
export const MessagesWrapper = styled.div`
    border: 1px solid black;
    border-radius: 9px;
    width: 90%;
    height: 80%;
    padding: 9px;
    overflow: auto;
    display: flex;
    flex-direction: column-reverse;
    /* flex-direction: ; */
    /* scroll-behavior: smooth; */
`
export const InputMessageWrapper = styled.form`
    margin-top: 3%;
    width: 90%;
    height: 9%;
`
export const InputMessage = styled.input`
    border-radius: 9px;
    width: 75%;
    height: 100%;
`
export const ButtonSend = styled.button`
    width: 25%;
    height: 100%;
`
export const Message = styled.div`
    border: 1px solid black;
    margin: 6px 0 6px 0;
    border-radius: 5px;
`
export const Logout = styled.button`
    position: absolute;
    justify-content: flex-end;
    margin: 0 0 90vh 0;
    width: 100px;
    height: 30px;
`