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

const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoidGVzdDQiLCJpYXQiOjE2MjM5ODAwMjgsImV4cCI6MTYyMzk4MzYyOH0.zPJTGgnQUx3UpkxEMUnhvBSpuontCMGrjkDel6zFXPw"

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
            setTimeout(()=>{
                console.log("testando o intervalo")
                getFeed()
            }, 5000)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getFeed()
    }, [])

    console.log(feed?.posts)
    // console.log(parseISO(feed?.posts[0].date).toString());

    function showFeed() {
        console.log("Entrou no feed");
        return <>
            {feed?.posts.slice(0).reverse().map((post) => {
                return (
                    <Message key={post.seq}>
                        <div>
                            {post.user}
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

    const checkKey = (e) =>{
        if (e.keyCode === 13){
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