import PropTypes from 'prop-types';
import { Button } from '@mui/material'
import { useRecoilState } from 'recoil'
import { chatsState } from '../../state/atom'

const ButtonUploadFile = ({ text }) => {
    const [chats, setChats] = useRecoilState(chatsState)

    const handleUpload = (event) => {
        try {
            const file = event.target.files[0];
            const reader = new FileReader();
            reader.readAsText(file);
        
            reader.onloadend = function(e) {
                const chatsJson = JSON.parse(reader.result);
                setChats(chatsJson);
            }.bind(this);
        } catch(e) {}
    }

    return (
        <label htmlFor="upload-photo">
            <input
                style={{ display: "none" }}
                id="upload-photo"
                name="upload-photo"
                type="file"
                accept="application/json"
                onChange={handleUpload}
            />
            <Button color="primary" variant="contained" component="span">
                {text}
            </Button>
        </label>
    )
}

ButtonUploadFile.propTypes = {
    text: PropTypes.string
};

export default ButtonUploadFile;