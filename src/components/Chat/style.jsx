import { makeStyles } from '@mui/styles';

const useStyleChat = makeStyles((theme) => ({
    table: {
      minWidth: 650,
    },
    chatSection: {
      width: '100%',
      height: '80vh'
    },
    headBG: {
        backgroundColor: '#e0e0e0'
    },
    borderRight500: {
        borderRight: '1px solid #e0e0e0'
    },
    messageArea: {
      height: '70vh',
      overflowY: 'auto'
    },
    avatarInfoHeader: {
      backgroundColor: theme.palette.primary,
      display: 'flex', 
      justifyContent: 'center',
      padding: 3
    },
    messageReplyPaper: {
      backgroundColor: 'rgb(0 0 0 / 4%)',
      padding: 15, 
      width: '40%',
      marginLeft: 10
    }
}));

export default useStyleChat;