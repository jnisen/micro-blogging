/* Packages */
import axios from 'axios'

import { useEffect, createContext, useState } from 'react'

export const TwitterContext = createContext();

const TwitterProvider = (props) => {

    const serverTweets = 'https://micro-blogging-dot-full-stack-course-services.ew.r.appspot.com/tweet'

    const [tweetsAPI, setTweetsAPI] = useState([])

    useEffect(() => {

        const interval = setTimeout(async () => {

            const api = await axios(serverTweets)
            const data = api.data.tweets

            setTweetsAPI(data)

        }, 1000)

        return () => clearInterval(interval);
    }, [tweetsAPI])

    return (
        <TwitterContext.Provider
            value={{ tweetsAPI }}
        >
            {props.children}
        </TwitterContext.Provider>
    )
}

export default TwitterProvider

