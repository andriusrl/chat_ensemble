import React,{ useState } from "react"
import { WrapperForm, WrapperLogin } from "./style";
import axios from "axios";
import { Redirect } from "react-router-dom"

const baseUrl = "https://job.ensemble.com.br/api"
const ens_api_token = "R0VEEQ8vfMhpiBS1Yuzc"

function Login() {
    const [loginStatus, setLoginStatus] = useState(false)

    const signIn = async (e)=>{
        e.preventDefault()
        try{
            const response = await axios.post(
                `${baseUrl}/auth`,
                {
                    "username": "test1",
                    "password": "49716685"
                },
                {
                    headers:{
                        'ens-api-token': ens_api_token,
                        'Accept': "application/json",
                        'Content-Type': "application/json"
                    }
                }
            )
            console.log(response.data.authToken)
            window.localStorage.setItem("authToken", response.data.authToken)
            setLoginStatus(true)
        } catch(error) {
            console.log(error)
        }
    }
    
    if(loginStatus){
        return <Redirect to="feed" />
    }

    return (
      <WrapperLogin>
        <WrapperForm onSubmit={signIn}>
            username
            <input type="text"></input>
            password
            <input type="text"></input>
            <button type="submit">LOGIN</button>
        </WrapperForm>
      </WrapperLogin>
    );
  }

export default Login;