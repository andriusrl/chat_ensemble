import React, { useEffect, useState } from "react"
import { Redirect } from "react-router-dom"
import axios from "axios";
import {
    ButtonSend,
    InputMessage,
    InputMessageWrapper,
    Loading,
    Logout,
    MessagesWrapper,
    WrapperFeed
} from "./style"
import Message from "../../components/Message";

const baseUrl = "https://job.ensemble.com.br/api"
const ens_api_token = "R0VEEQ8vfMhpiBS1Yuzc"
let totalMessages = undefined

function Feed() {
    const username = window.localStorage.getItem("username")
    const token = window.localStorage.getItem("authToken")
    const [feed, setFeed] = useState(undefined)
    const [inputMessage, setInputMessage] = useState("")
    const [loginStatus, setLoginStatus] = useState(true)

    const handleInputChange = e => {
        setInputMessage(e.target.value)
    }

    const getTotalMessages = async () => {
        try {
            const response = await axios.get(
                `${baseUrl}/feed`,
                {
                    headers: {
                        'ens-api-token': ens_api_token,
                        'ens-auth-token': token,
                        'Accept': "application/json",
                        'Content-Type': "application/json"
                    }
                }
            )
            return (response.data.count)
        } catch (error) {
            console.log(error)
            console.log(error.response)
        }
    }
    const getFeed = async () => {
        try {
            if (totalMessages === undefined) {
                totalMessages = await getTotalMessages()
            }
            if (totalMessages) {
                const response = await axios.get(
                    `${baseUrl}/feed?startSeq=${totalMessages ? totalMessages - 99 : 1}&limit=number&order=asc`,
                    {
                        headers: {
                            'ens-api-token': ens_api_token,
                            'ens-auth-token': token,
                            'Accept': "application/json",
                            'Content-Type': "application/json"
                        }
                    }
                )
                totalMessages = response.data.lastPostSeq
                setFeed(response.data.posts)
            }
            const newToken = window.localStorage.getItem("authToken")
            if (newToken) {
                setTimeout(() => { getFeed() }, 5000)
            }
        } catch (error) {
            console.log(error)
            console.log(error.response)
            setLoginStatus(false)
        }
    }

    function showFeed() {
        if (feed) {
            return <>
                {
                    feed?.slice(0).reverse().map((post) => {
                        return (
                            <Message
                                key={post.seq}
                                user={post.user === username ? false : post.user}
                                message={post.message}
                                date={post.date}
                            />
                        )
                    })}
            </>
        }
        else {
            return <Loading>
                Loading feed...
            </Loading>
        }
    }

    const sentMessage = async (e) => {
        e?.preventDefault()
        const message = inputMessage
        setInputMessage("")
        const newFeed = [
            ...feed,
            {
                date: "Enviando...",
                message: message,
                seq: totalMessages + 1,
                user: username
            }
        ]
        setFeed(newFeed)
        try {
            const response = await axios.post(
                `${baseUrl}/feed`,
                {
                    "message": message
                },
                {
                    headers: {
                        'ens-api-token': ens_api_token,
                        'ens-auth-token': token,
                        'Accept': "application/json",
                        'Content-Type': "application/json"
                    }
                }
            )
            totalMessages = response.data.seq
        } catch (error) {
            console.log(error)
        }
    }

    const logout = () => {
        window.localStorage.removeItem('authToken')
        window.localStorage.removeItem('username')
        setLoginStatus(false)
    }

    useEffect(() => {
        getFeed()
    }, [])

    if (!loginStatus) {
        return <Redirect to="/" />
    }

    return <WrapperFeed>
        <Logout onClick={logout}>Logout</Logout>
        <MessagesWrapper>
            {showFeed()}
        </MessagesWrapper>
        <InputMessageWrapper onSubmit={sentMessage}>
            <InputMessage placeholder="Message" onChange={handleInputChange} value={inputMessage} />
            <ButtonSend type="submit">Send</ButtonSend>
        </InputMessageWrapper>
    </WrapperFeed>
}

export default Feed;