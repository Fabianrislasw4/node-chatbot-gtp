import { Configuration, OpenAIApi } from "openai";
import * as dotenv from 'dotenv';
import  express  from "express";
import cors from 'cors';


dotenv.config();

const PORT = process.env.PORT || 9500;

const configuration = new Configuration({
    apiKey:"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",
});

const openAI = new OpenAIApi(configuration);

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static('public'));


app.get('/' , (req , res)=>{

   res.send('Inicio el server....');

});

const openAIReplay = async(req, res) => {
    try{
        const prompt = req.body.prompt;
        console.log({prompt});

        const response = await openAI.createCompletion({
            model: 'text-davinci-003',
            prompt,
            temperature: 0,
            max_tokens: 3000,
            top_p: 1,
            frequency_penalty: 0.5,
            presence_penalty: 0,
        });

        console.log({response});
        res.status(200).send({
            bot: response.data.choices[0].text,
        });

    }catch(error){
        console.error({error});
        res.status(500).send(error || 'Ocurrio un problema');
    }
}


app.post('/', openAIReplay);

app.listen(PORT, () => console.log(`Servidor de IA corriendo.... ${PORT}`));