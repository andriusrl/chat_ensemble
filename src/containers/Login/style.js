import styled from "styled-components"

export const WrapperLogin = styled.div`
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
`
export const WrapperForm = styled.form`
    display: flex;
    flex-direction: column;
    text-align: center;
    border: 1px solid black;
    border-radius: 16px;
    padding: 19px;
    h1{
        color: #ADADAD;
        margin-bottom: 6px;
    };
    h1:nth-of-type(2){
        margin-top: 15px;
    };
`
export const InputLogin = styled.input`
    background-color: red;
    border-radius: 9px;
    height: 100%;
    background-color: #5C5C5C;
    color: #ADADAD;
    padding-left: 16px;
    font-size: 20px;
    height: 35px;
`
export const ButtonLogin = styled.button`
    color: #ADADAD;
    font-size: 20px;
    font-weight: 800;
    margin-top: 20px;
    border-radius: 15px;
    padding: 3px;
    height: 40px;
`
export const LoadingLogin = styled.div`
    padding: 15px;
    color: #ADADAD;
    font-size: 20px;
    font-weight: 800;
`