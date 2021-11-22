import PropTypes from 'prop-types';
import {
    ListItemText,
    Grid,
    Typography,
    Card,
    CardActionArea,
    CardMedia,
    CardContent,
    IconButton,
    Slider
} from '@mui/material'
import { PlayArrow, SkipNext, SkipPrevious } from '@mui/icons-material'
import moment from 'moment'

const TextMessage = ({ text }) => (
    <Typography>{text}</Typography>
)

TextMessage.propTypes = {
    text: PropTypes.string
};

const ImageMessage = ({ path }) => (
    <Card sx={{ maxWidth: 345 }}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="140"
          image="https://img.myloview.it/quadri/chat-message-vector-icon-on-white-background-flat-vector-chat-message-icon-symbol-sign-from-modern-communications-collection-for-mobile-concept-and-web-apps-design-700-180364594.jpg"
        />
      </CardActionArea>
    </Card>
)

ImageMessage.propTypes = {
    path: PropTypes.string,
};

const VideoMessage = ({ path }) => (
    <Card sx={{ maxWidth: 345 }}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="140"
          image="https://img.myloview.it/quadri/chat-message-vector-icon-on-white-background-flat-vector-chat-message-icon-symbol-sign-from-modern-communications-collection-for-mobile-concept-and-web-apps-design-700-180364594.jpg"
        />
      </CardActionArea>
      <CardContent>
            <div style={{ textAlign: 'center' }}>
                <IconButton aria-label="Previous">
                    <SkipPrevious />
                </IconButton>
                <IconButton aria-label="Play/Pause">
                    <PlayArrow />
                </IconButton>
                <IconButton aria-label="Next">
                    <SkipNext />
                </IconButton>
            </div>
        </CardContent>
    </Card>
)

VideoMessage.propTypes = {
    path: PropTypes.string,
};

const AudioMessage = ({ path }) => (
    <Card sx={{ maxWidth: 345 }}>
      <CardContent style={{ padding: 10 }}>
            <Grid container>
                <Grid item md={2} >
                    <IconButton aria-label="Play/Pause">
                        <PlayArrow size="medium" />
                    </IconButton>
                </Grid>
                <Grid item md={8} >
                    <Slider aria-label="Volume" value={0} />
                </Grid>
            </Grid>
        </CardContent>
    </Card>
)

AudioMessage.propTypes = {
    path: PropTypes.string,
};

const Message = ({ message = {}, reply = 0 }) => {
    let componentTypeMsg;

    switch(message.msg_type) {
        case 'text':
            componentTypeMsg = (<TextMessage text={message.text} />)
            break;
        case 'image':
            componentTypeMsg = (<ImageMessage path={message.media_path} />)
            break;
        case 'gif':
            componentTypeMsg = (<ImageMessage path={message.media_path} />)
            break;
        case 'video':
            componentTypeMsg = (<VideoMessage path={message.media_path} />)
        break;
        case 'audio':
            componentTypeMsg = (<AudioMessage path={message.media_path} />)
        break;
        default:
            componentTypeMsg = null;
    }

    return (
        <ListItemText
            align={message.direction} 
            primary={
                <Grid container >
                    {(message.direction === 'left') && (!reply) ? 
                        (<Grid item xs={12}>
                            <Typography color="primary">{message.from_username}</Typography>
                        </Grid>) :
                        (!message.direction && reply) ? 
                        (<Grid item xs={12}>
                            <Typography color="primary">{message.from_username}</Typography>
                        </Grid>) : null
                    }
                    <Grid item xs={12}>
                        {componentTypeMsg}
                    </Grid>
                    <Grid item xs={12}>
                        <Typography 
                            style={{ 
                                textAlign: message.direction === 'left' ? 'start' : 'end', 
                                fontSize: '0.7em', 
                                color: '#00000085' 
                            }}>
                            {moment(message.timestamp).isValid() ? moment(message.timestamp).format('DD-MM-YYYY HH:mm:ss') : ""}
                        </Typography>
                    </Grid>
                </Grid>
            } />
    )
}

Message.propTypes = {
    messages: PropTypes.shape({
        id: PropTypes.number.isRequired,
        media_path: PropTypes.string,
        msg_type: PropTypes.string.isRequired,
        reply_id: PropTypes.number,
        timestamp: PropTypes.string.isRequired,
        to_id: PropTypes.number.isRequired,
        from_id: PropTypes.number.isRequired,
        from_username: PropTypes.string,
        to_username: PropTypes.string,
        direction: PropTypes.oneOf(['left', 'right'])
    }),
    reply: PropTypes.bool,
};

export default Message;