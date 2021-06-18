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
    @media (min-width: 768px) {
        width: 60%;
    };
`
export const InputMessageWrapper = styled.form`
    margin-top: 3%;
    width: 90%;
    height: 9%;
    @media (min-width: 768px) {
        width: 60%;
    };
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
export const Logout = styled.button`
    position: absolute;
    justify-content: flex-end;
    margin: 0 0 90vh 0;
    width: 100px;
    height: 30px;
`
export const Loading = styled.div`
    width: fit-content;
    align-self: center;
    margin: auto 0 auto 0;
    box-sizing: border-box;
    border: 1px solid black;
    border-radius: 5px;
    padding: 3px;
    font-size: 26px;
`