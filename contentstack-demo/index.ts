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
        const response = await axios.get('https://cdn.contentstack.io/v3/content_types/blog_post/entries', {
            headers: {
                api_key: process.env.CONTENTSTACK_API_KEY || '', // Fallback to empty string if undefined
                access_token: process.env.CONTENTSTACK_ACCESS_TOKEN || '',
            }
        });
        res.json(response.data.entries);
    } catch (error) {
        console.error('Error fetching blog posts:', error); // Log the error
        res.status(500).send('Error fetching blog posts');
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
