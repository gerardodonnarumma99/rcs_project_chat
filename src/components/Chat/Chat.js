import { useState } from "react";
import PropTypes from 'prop-types';
import useStyleChat from "./style";
import {
    List,
    ListItem,
    ListItemText,
    TextField,
    Fab,
    Grid,
    Divider,
    Paper,
    AppBar,
    Toolbar,
    IconButton,
    Typography,
    Avatar,
    ListItemAvatar
} from '@mui/material'
import { Menu as MenuIcon, ChevronRight as ChevronRightIcon } from '@mui/icons-material'
import Drawer from '@mui/material/Drawer';
import { styled } from '@mui/material/styles';
import Message from '../Message/Message'
import useMembersChat from '../../hooks/useMembersChat'

const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
    justifyContent: 'flex-start',
  }));

const ListUsers = ({ users = [] }) => {
    return (
        <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
            <Typography sx={{ mt: 4, mb: 2 }} variant="h6" component="div">
                Members
            </Typography>
                <List>
                {users && Array.isArray(users) && users.map(({ id, name }) => (
                    <ListItem key={id}>
                        <ListItemAvatar>
                            <Avatar>{name ? name.charAt(0) : ""}</Avatar>
                        </ListItemAvatar>
                        <ListItemText
                            primary={name}
                        />
                    </ListItem>
                ))}
                </List>
            </Grid>
        </Grid>
    )
}

ListUsers.propTypes = {
    users: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
        is_group: PropTypes.bool,
        is_me: PropTypes.bool
    })).isRequired,
};

const ChatAppBar = ({ user = {}, usersGroup = [] }) => {
    const classes = useStyleChat();
    const [anchorElMenu, setAnchorElMenu] = useState(null);

    const handleMenu = (event) => {
        setAnchorElMenu(event.currentTarget);
    };
    
    const handleClose = () => {
        setAnchorElMenu(null);
    };
      
    return (
        <AppBar position="static">
            <Toolbar>
                <Avatar>{user?.name ? user.name.charAt(0) : ""}</Avatar>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }} style={{ marginLeft: '0.5em' }} >
                    {user?.name ? user.name : ""}
                </Typography>
                <div>
                <IconButton
                    size="large"
                    aria-label="account of current user"
                    aria-controls="menu-appbar"
                    aria-haspopup="true"
                    color="inherit"
                    onClick={handleMenu}
                    sx={{ mr: 2, ...(Boolean(anchorElMenu) && { display: 'none' }) }}
                >
                    <MenuIcon />
                </IconButton>
                {Boolean(anchorElMenu) && 
                    (<Drawer
                        sx={{
                            width: 240,
                            flexShrink: 0,
                            '& .MuiDrawer-paper': {
                                width: 240,
                            }
                        }}
                        variant="persistent"
                        anchor="right"
                        open={Boolean(anchorElMenu)} >
                        <DrawerHeader>
                            <IconButton onClick={handleClose}>
                                <ChevronRightIcon />
                            </IconButton>
                        </DrawerHeader>
                        <Grid
                            container
                            direction="row" 
                            style={{ padding: 5 }} >
                            <Grid item xs={12} className={classes.avatarInfoHeader}>
                                <Avatar 
                                    sx={{ width: 100, height: 100 }}
                                    style={{ fontSize: '3em' }} >
                                        {user?.name ? user.name.charAt(0) : ""}
                                </Avatar>
                            </Grid>
                            <Grid item xs={12} style={{ display: 'flex', justifyContent: 'center' }}>
                                <Typography>{user?.name ? user.name : ""}</Typography>
                            </Grid>
                            <Grid item xs={12}>
                                {usersGroup && Array.isArray(usersGroup) && usersGroup.length > 0 && 
                                    (<ListUsers users={usersGroup}/>)
                                }
                            </Grid>
                        </Grid>
                    </Drawer>)}
                </div>
            </Toolbar>
        </AppBar>
    )
}

ChatAppBar.propTypes = {
    user: PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
        is_group: PropTypes.bool,
        is_me: PropTypes.bool
    }).isRequired,
    usersGroup: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
        is_group: PropTypes.bool,
        is_me: PropTypes.bool
    })).isRequired,
};

const Chat = ({ userIsMe = {}, userDestination = {}, messages = [] }) => {
    const classes = useStyleChat();
    const [usersGroup, setUsersGroup] = useMembersChat(userDestination);

    const getMessageReplay = (replyId = -1) => {
        const messageReply = messages.find((message) => message.id === replyId)
        return messageReply;
    }

    return (
        <Grid container component={Paper} direction="column" color="secondary">
            <Grid item xs={12}>
                <ChatAppBar user={userDestination} usersGroup={usersGroup}/>
            </Grid>
            <Grid item xs={12}>
                <List className={classes.messageArea} >
                    {messages && Array.isArray(messages) 
                        ? messages.map((message) => (
                            message?.id && (
                                <ListItem key={message.id}>
                                    <Grid container>
                                        <Grid item xs={12}>
                                            <Message 
                                                message={{
                                                    ...message,
                                                    direction: userIsMe.id === message.from_id ? 'right' : 'left'
                                                }}
                                                reply={0} />
                                            {message.reply_id && getMessageReplay(message.id) && (
                                                <Paper 
                                                    elevation={3} 
                                                    className={classes.messageReplyPaper}
                                                    style={{
                                                        float: userIsMe.id === message.from_id ? 'right' : 'left'
                                                    }}
                                                >
                                                    <Typography fontSize={9}>Risposta al messaggio:</Typography>
                                                <Message 
                                                    message={{
                                                        ...getMessageReplay(message.reply_id)
                                                    }}
                                                    reply={1} />
                                                </Paper>
                                            )}
                                        </Grid>
                                    </Grid>
                                </ListItem>
                            )
                        ))
                        : null
                    }
                </List>
                <Divider />
                <Grid container style={{padding: '20px'}}>
                    <Grid item xs={11}>
                        <TextField id="outlined-basic-email" label="Type Something" fullWidth />
                    </Grid>
                    <Grid xs={1} align="right">
                        <Fab color="primary" aria-label="add"></Fab>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    )
}

ChatAppBar.propTypes = {
    userIsMe: PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
        is_group: PropTypes.bool,
        is_me: PropTypes.bool
    }).isRequired,
    userDestination: PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
        is_group: PropTypes.bool,
        is_me: PropTypes.bool
    }).isRequired,
    messages: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.number.isRequired,
        media_path: PropTypes.string,
        msg_type: PropTypes.string.isRequired,
        reply_id: PropTypes.number,
        timestamp: PropTypes.string.isRequired,
        to_id: PropTypes.number.isRequired,
        from_id: PropTypes.number.isRequired,
        from_username: PropTypes.string,
        to_username: PropTypes.string,
    })).isRequired,
};

export default Chat;