import  express from 'express';
import * as dotenv from 'dotenv';
import OpenAI from 'openai';

dotenv.config();

const router = express.Router();

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
})

router.route('/').get((req,res) => {
    res.send('hello from DALL_E !!!');
})

router.route('/').post(async (req,res) => {
    try {
        const { prompt } = req.body;
        const options = {
            method: 'POST',
            headers: {
              accept: 'application/json',
              'content-type': 'application/json',
              authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiZDNmYzk5NDUtZGNiZi00MTExLTllNmEtNzE4ZjBhMDVlOTUyIiwidHlwZSI6ImFwaV90b2tlbiJ9.-mFCH7hD3RYgtVEk0QCJshAtQT7jBPfZ6On9s_9QKYM'
            },
            body: JSON.stringify({
              response_as_dict: true,
              attributes_as_list: false,
              show_original_response: false,
              resolution: '1024x1024',
              num_images: 1,
              providers: 'openai',
              text: prompt
            })
          };
          
          fetch('https://api.edenai.run/v2/image/generation', options)
            .then(response => response.json())
            .then(response => {
                res.status(200).json(response);
            })
            .catch(err => console.error(err));
    } catch (error) {
        console.error(error);
        res.status(500).json({errormsg: error});
    }
})

export default router;