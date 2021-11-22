import PropTypes from 'prop-types';
import { 
    List, 
    ListItem,
    ListItemText,
    ListItemIcon,
    Grid,
    TextField, 
    Avatar, 
    Divider 
} from '@mui/material'

const ChatList = ({ userIsMe = {}, chatList = [], handleChat }) => {

    const getItemIsMe = () => {
        if(userIsMe?.id) {
            return (
                <ListItem button key={userIsMe.id}>
                    <ListItemIcon>
                        <Avatar>{userIsMe.name ? userIsMe.name.charAt(0) : ""}</Avatar>
                    </ListItemIcon>
                    <ListItemText primary={userIsMe.name || ""} />
                </ListItem>
            )
        }

        return null;
    }
    return (
        <>
            <List>
                {getItemIsMe()}
            </List>
            <Divider />
            <Grid item xs={12} style={{padding: '10px'}}>
                <TextField id="outlined-basic-email" label="Search" variant="outlined" fullWidth />
            </Grid>
            <Divider />
            <List>
                {chatList.map((user) => (
                    user && user.id && !user.is_me && 
                        (<ListItem button key={user.id} onClick={(e) => handleChat(e, user)}>
                            <ListItemIcon>
                                <Avatar>{user.name ? user.name.charAt(0) : ""}</Avatar>
                            </ListItemIcon>
                            <ListItemText primary={user.name || ""} />
                            {user.is_group === 1 && (<ListItemText secondary="group" align="right" />)}
                        </ListItem>)
                ))}
            </List>
        </>
    )
}

ChatList.propTypes = {
    userIsMe: PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
        is_group: PropTypes.bool,
        is_me: PropTypes.bool
    }).isRequired,
    chatList: PropTypes.array,
    handleChat: PropTypes.func.isRequired
};

export default ChatList;