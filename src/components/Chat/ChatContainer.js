import { useEffect, useState } from 'react'
import { Grid, Paper } from '@mui/material'
import ChatList from './ChatList'
import Chat from './Chat'
import { useRecoilState } from 'recoil'
import { chatsState } from '../../state/atom'
import moment from 'moment'

const ChatContainer = () => {
    const [chats, setChats] = useRecoilState(chatsState)
    const [messages, setMessages] = useState([]);
    const [userIsMe, setUserIsMe] = useState({});
    const [userDestination, setUserDestination] = useState({})

    useEffect(() => getUserIsMe(), [chats])

    const getUserIsMe = () => {
        const user = chats?.['users_and_groups'] && chats['users_and_groups'].find((user) => user.is_me)
        setUserIsMe(user)
    }

    const handleClickChat = (e, user = null) => {
        if(!user || !userIsMe) {
            return;
        }

        if(chats?.messages && Array.isArray(chats.messages)) {
            const messagesCopy = [...chats.messages]
            const chatMessages = [];

            if(user.is_group) {
                const messages = messagesCopy.filter((message) => message.to_id === user.id)
                const newMessages = [];

                //Aggiungo gli username
                messages.forEach((message) => {
                    const oNewMessage = {...message}
                    const userFind = [...chats['users_and_groups']].find((user) => user.id === message.from_id)
                    oNewMessage.from_username = userFind.name;

                    newMessages.push(oNewMessage)
                })

                setUserDestination(user)
                setMessages(getSortedMessagesByDate(newMessages))
            } else {
                messagesCopy.forEach((message) => {
                    const oNewMessage = {...message}

                    //Aggiungo gli username
                    if(user?.id && message?.to_id && message?.from_id) {
                        const isUserFromUserMe = user.id === message.from_id && userIsMe.id === message.to_id
                        const isUserMeFromUser = userIsMe.id === message.from_id && user.id === message.to_id

                        if(isUserFromUserMe || isUserMeFromUser) {
                            oNewMessage.from_username = isUserFromUserMe ? user.name : userIsMe.name
                            oNewMessage.to_username = isUserFromUserMe ? userIsMe.name : user.name
                            return chatMessages.push(oNewMessage);
                        }
                    }
                })
                setMessages(getSortedMessagesByDate(chatMessages))
                setUserDestination(user)
            }
        }
    }

    const getSortedMessagesByDate = (messages = []) => {
        const messagesSorted = messages.sort((a, b) => {
            return moment(a.timestamp).diff(b.timestamp);
          });

        return messagesSorted;
    }
    
    return (
        <Grid container component={Paper}>
            <Grid item xs={3}>
                <ChatList
                    userIsMe={userIsMe}
                    chatList={(chats?.['users_and_groups'] || [])} 
                    handleChat={handleClickChat}
                />
            </Grid>
            <Grid item xs={9}>
                <Chat
                    users={[...chats['users_and_groups']]}
                    userIsMe={userIsMe} 
                    userDestination={userDestination}
                    messages={messages}
                />
            </Grid>
        </Grid>
    )
}

export default ChatContainer;