import { Grid } from '@mui/material'
import ButtonUploadFile from '../components/UploadFile/ButtonUploadFile'
import { ChatContainer } from '../components/Chat'

const Home = () => {
    return (
        <Grid container direction="row">
            <Grid item xs={12} style={{ margin: 10 }}>
                <ButtonUploadFile text="Upload Chat" />
            </Grid>
            <Grid item xs={12}>
                <ChatContainer />
            </Grid>
        </Grid>
    )
}

export default Home;