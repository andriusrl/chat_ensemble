import React, { useEffect, useState } from "react"
import { parseISO, format } from 'date-fns';
import axios from "axios";
import {
    ButtonSend,
    InputMessage,
    InputMessageWrapper,
    Message,
    MessagesWrapper,
    WrapperFeed
} from "./style"

const baseUrl = "https://job.ensemble.com.br/api"
const ens_api_token = "R0VEEQ8vfMhpiBS1Yuzc"
const token = window.localStorage.getItem("authToken")
const username = window.localStorage.getItem("username")

function Feed() {
    const [feed, setFeed] = useState(undefined)
    const [inputMessage, setInputMessage] = useState("")

    const handleInputChange = e => {
        setInputMessage(e.target.value)
    }

    const getFeed = async () => {
        try {
            const response = await axios.get(
                `${baseUrl}/feed?startSeq=1&limit=number&order=asc`,
                {
                    headers: {
                        'ens-api-token': ens_api_token,
                        'ens-auth-token': token,
                        'Accept': "application/json",
                        'Content-Type': "application/json"
                    }
                }
            )
            setFeed(response.data)
            setTimeout(() => { getFeed() }, 5000)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getFeed()

    }, [])

    function showFeed() {
        console.log("Entrou no feed");
        console.log(username);
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
            getFeed()
        } catch (error) {
            console.log(error)
        }
    }

    const checkKey = (e) => {
        if (e.keyCode === 13) {
            sentMessage()
        }

    }

    return <WrapperFeed>
        <MessagesWrapper>
            {showFeed()}
        </MessagesWrapper>
        <InputMessageWrapper onSubmit={sentMessage}>
            <InputMessage placeholder="Message" onChange={handleInputChange} value={inputMessage} onKeyDown={checkKey} />
            <ButtonSend type="submit">Send</ButtonSend>
        </InputMessageWrapper>
    </WrapperFeed>
}

export default Feed;