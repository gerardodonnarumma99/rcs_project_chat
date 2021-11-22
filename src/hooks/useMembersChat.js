import { useEffect, useState } from 'react'
import { useRecoilState } from 'recoil'
import { chatsState } from '../state/atom'

const useMembersChat = (chat) => {
    const [chats, setChats] = useRecoilState(chatsState)
    const [usersGroup, setUsersGroup] = useState([]) 

    useEffect(() => getMembersChat(), [chat])

    const getMembersChat = () => {
        const usersMemberGroup = [];

        if((!chat) || (chat && !chat.is_group)) {
            return;
        }

        if(chats?.group_members 
            && Array.isArray(chats.group_members)
            && chats?.users_and_groups
            && Array.isArray(chats.users_and_groups)) {
        
            const groupsFilter = chats.group_members.filter((group) => group.group_id === chat.id)

            for(const group of groupsFilter) {
                const user = chats.users_and_groups.find((user) => !user.is_group && user.id === group.user_id)
                if(user) {
                    usersMemberGroup.push(user)
                }
            }

            setUsersGroup(usersMemberGroup)
        }

    }

    return [usersGroup, setUsersGroup]
}

export default useMembersChat;