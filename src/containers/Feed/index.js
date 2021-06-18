import React, { useEffect, useState } from "react"
import { parseISO, format } from 'date-fns';
import { Redirect } from "react-router-dom"
import axios from "axios";
import {
    ButtonSend,
    InputMessage,
    InputMessageWrapper,
    Logout,
    Message,
    MessagesWrapper,
    WrapperFeed
} from "./style"

const baseUrl = "https://job.ensemble.com.br/api"
const ens_api_token = "R0VEEQ8vfMhpiBS1Yuzc"
let total = undefined

function Feed() {
    const token = window.localStorage.getItem("authToken")
    const username = window.localStorage.getItem("username")
    const [feed, setFeed] = useState(undefined)
    const [inputMessage, setInputMessage] = useState("")
    const [loginStatus, setLoginStatus] = useState(true)
    const [totalMessages, setTotalMessages] = useState(undefined)

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
            // setTotalMessages(response.data.count)
            return (response.data.count)
        } catch (error) {
            console.log(error)
            console.log(error.response)
        }
    }
    const getFeed = async () => {
        try {
            if (total === undefined) {
                console.log("Veio como unfined")
                total = await getTotalMessages()
            }
            console.log(total)
            if (total) {
                console.log(total)
                const response = await axios.get(
                    `${baseUrl}/feed?startSeq=${total ? total - 99 : 1}&limit=number&order=asc`,
                    {
                        headers: {
                            'ens-api-token': ens_api_token,
                            'ens-auth-token': token,
                            'Accept': "application/json",
                            'Content-Type': "application/json"
                        }
                    }
                )
                total = response.data.lastPostSeq
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
        // getTotalMessages()
        getFeed()
    }, [])

    function showFeed() {
        return <>
            {feed?.posts.slice(0).reverse().map((post) => {
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
            total = response.data.seq
            // if (response.data.LastPostSeq) {
            //     console.log("So entra de segunda");
            //     total = response.data.LastPostSeq
            // }
            // getFeed()
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