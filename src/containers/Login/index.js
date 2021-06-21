import React, { useState } from "react"
import { ButtonLogin, InputLogin, LoadingLogin, WrapperForm, WrapperLogin } from "./style";
import axios from "axios";
import { Redirect } from "react-router-dom"

const baseUrl = "https://job.ensemble.com.br/api"
const ens_api_token = "R0VEEQ8vfMhpiBS1Yuzc"

function Login() {
    const [loginStatus, setLoginStatus] = useState(false)
    const [inputUsername, setInputUsername] = useState("")
    const [inputPassword, setInputPassword] = useState("")

    const signIn = async (e) => {
        e.preventDefault()
        setLoginStatus(null)
        try {
            const response = await axios.post(
                `${baseUrl}/auth`,
                {
                    "username": inputUsername,
                    "password": inputPassword
                },
                {
                    headers: {
                        'ens-api-token': ens_api_token,
                        'Accept': "application/json",
                        'Content-Type': "application/json"
                    }
                }
            )
            window.localStorage.setItem("authToken", response.data.authToken)
            window.localStorage.setItem("username", inputUsername)
            setLoginStatus(true)
        } catch (error) {
            console.log(error)
            setLoginStatus(false)
            if (error.response.data.error.code === "NOT_AUTHORIZED") {
                alert("Username or password are incorrect!")
            }
        }
    }

    const handleInputUsernameChange = (e) => {
        setInputUsername(e.target.value)
    }

    const handleInputPasswordChange = (e) => {
        setInputPassword(e.target.value)
    }

    if (loginStatus) {
        return <Redirect to="feed" />
    }

    return (
        <WrapperLogin>
            <WrapperForm onSubmit={signIn}>
                {loginStatus !== null ?
                    <>
                        <h1>username</h1>
                        <InputLogin type="text" value={inputUsername} onChange={handleInputUsernameChange} />
                        <h1>password</h1>
                        <InputLogin type="password" value={inputPassword} onChange={handleInputPasswordChange} />
                        <ButtonLogin type="submit">LOGIN</ButtonLogin>
                    </> : <LoadingLogin>Loading account...</LoadingLogin>
                }
            </WrapperForm>
        </WrapperLogin>
    );
}

export default Login;