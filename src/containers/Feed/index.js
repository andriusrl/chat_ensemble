import React, { useEffect, useState } from "react"
import { parseISO, format } from 'date-fns';
import { Redirect } from "react-router-dom"
import axios from "axios";
import {
    ButtonSend,
    InputMessage,
    InputMessageWrapper,
    Loading,
    Logout,
    Message,
    MessagesWrapper,
    WrapperFeed
} from "./style"

const baseUrl = "https://job.ensemble.com.br/api"
const ens_api_token = "R0VEEQ8vfMhpiBS1Yuzc"
let totalMessages = undefined

function Feed() {
    const token = window.localStorage.getItem("authToken")
    const username = window.localStorage.getItem("username")
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
            console.log("entrei aqui a primeira vez")
            console.log(response.data.count)
            return (response.data.count)
        } catch (error) {
            console.log(error)
            console.log(error.response)
        }
    }
    const getFeed = async () => {
        try {
            if (totalMessages === undefined) {
                console.log("Veio como unfined")
                totalMessages = await getTotalMessages()
            }
            console.log(totalMessages)
            if (totalMessages) {
                console.log(totalMessages)
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
                setFeed(response.data)
                // console.log(response.data.lastPostSeq)
                console.log(response.data)
            }

            setTimeout(() => { getFeed() }, 5000)
        } catch (error) {
            console.log(error)
            console.log(error.response)
        }
    }

    useEffect(() => {
        getFeed()
    }, [])

    function showFeed() {
        if (feed?.posts) {
            return <>
                {
                    feed?.posts.slice(0).reverse().map((post) => {
                        return (
                            <Message key={post.seq}>
                                <div>
                                    {post.user === username ? false : post.user}
                                </div>
                                {post.message}
                                <div>
                                    {format(
                                        parseISO(post.date),
                                        "dd MMMM HH:mm"
                                    )}
                                </div>
                            </Message>
                        )
                    })}
            </>
        }
        else {
            return <Loading>
                Carregando...
            </Loading>
        }
    }

    const sentMessage = async (e) => {
        e?.preventDefault()
        const message = inputMessage
        setInputMessage("")
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
            console.log("send message");
            console.log(response.data)
            console.log("Eea bateu" + response.data.seq)
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