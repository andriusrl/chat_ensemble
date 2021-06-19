import React, { useState } from "react"
import { WrapperForm, WrapperLogin } from "./style";
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
                username
                <input type="text" value={inputUsername} onChange={handleInputUsernameChange}></input>
                password
                <input type="password" value={inputPassword} onChange={handleInputPasswordChange}></input>
                <button type="submit">LOGIN</button>
            </WrapperForm>
        </WrapperLogin>
    );
}

export default Login;