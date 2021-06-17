import React, { useEffect, useState } from "react"
import { parseISO, format } from 'date-fns';
import axios from "axios";
import {
    ButtonSend,
    InputMessage,
    InputMessageWrapper,
    Message,
    MessageWrapper,
    WrapperFeed
} from "./style"

const baseUrl = "https://job.ensemble.com.br/api"
const ens_api_token = "R0VEEQ8vfMhpiBS1Yuzc"

const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoidGVzdDIiLCJpYXQiOjE2MjM5NTk1MzUsImV4cCI6MTYyMzk2MzEzNX0.oNw-InV0g9CmnOYevdXqsLOaJqCmrxpsM34v7Zjgns0"

function Feed() {
    const [feed, setFeed] = useState(undefined)

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
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getFeed()
    }, [])

    console.log(feed)
    console.log(parseISO(feed?.posts[0].date).toString());

    const showFeed = () => {
        return <>
            {feed?.posts.map((post) => {
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

    return <WrapperFeed>
        <MessageWrapper>
            <div>
                {showFeed()}
            </div>
        </MessageWrapper>
        <InputMessageWrapper>
            <InputMessage></InputMessage>
            <ButtonSend>Send</ButtonSend>
        </InputMessageWrapper>
    </WrapperFeed>
}

export default Feed;