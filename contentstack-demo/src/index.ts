import express, { Request, Response } from 'express';
import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to serve static files from the "public" directory
app.use(express.static('public'));

// Route to fetch blog posts from ContentStack
app.get('/posts', async (req: Request, res: Response) => {
    try {
        const response = await axios.get('https://cdn.contentstack.io/v3/content_types/blogpost/entries', {
            headers: {
                api_key: process.env.CONTENTSTACK_API_KEY || '',
                access_token: process.env.CONTENTSTACK_DELIVERY_TOKEN || '',
            }
        });
        res.json(response.data.entries);
    } catch (error: any) {
        console.error('Error fetching blog posts:', {
            message: error.message,
            status: error.response ? error.response.status : 'No status',
            data: error.response ? error.response.data : 'No response data',
            headers: error.response ? error.response.headers : 'No headers',
            stack: error.stack
        });
        res.status(500).send('Error fetching blog posts');
    }
});




// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
