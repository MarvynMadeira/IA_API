import express, { Request, Response} from 'express';
import axios from 'axios';
import cors from 'cors';

const app = express();
const model = 'deepseek-r1';
const OLLAMA_URL = 'http://localhost:11434/api/generate';

app.use(cors());
app.use(express.json());

app.post('/prompt', async (req, res) =>{
    try{
        const { prompt } = req.body;

        const ollamaResponse = await axios.post(OLLAMA_URL, {
            model,
            prompt: prompt,
            stream: false,
        });

        const resData = ollamaResponse.data.response.toString();
        res.send(resData);

    } catch(error) {
        console.error('Error interacting with Ollama:', error);
        res.status(500).json({error: 'Failed to process request'});
    }
})

app.listen(3000, () => console.log('Server starting on port 3000'));


