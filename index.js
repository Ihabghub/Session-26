const express = require('express');
const axios = require('axios');
const app = express();
const port = 3000;

app.use(express.json());

app.get('/palindromes', (req,res) => {
    const palindromes = ['ihab','rami','karim','hassoun','iyad'];
    res.json(palindromes);
});

app.get('/age-in-seconds',(req,res) => {
    const birthDate = new Date('2004-06-13');
    const now = new Date();
    const ageInSeconds = Math.floor((now - birthDate) / 1000);
    res.json(ageInSeconds);
});

app.get('/get-text', async (req,res) => {
    try {
        const response = await axios.get('https://icanhazdadjoke.com/slack');
        const joke = response.data.attachments[0].text;
        res.json({ joke });
      } catch (error) {
        res.status(500).json({ error: 'Failed to fetch joke' });
      }
});

app.get('/random-recipe', async (req,res) => {
    try{
        const response = await axios.get('https://api.spoonacular.com/recipes/random', {
            params: {}
        });
        res.json(response.data);
    } catch (error) {
        res.status(500).json({error: 'Failed to fetch random recipe'});
    }
});

app.get('/groups-of-two', (req,res) => {
    const students = ['Charbel','Leyan','Miso','Zeina','Kamal','Allisen'];
    const groups = [];
    for (let i=0 ; i < students.length ; i += 2){
        groups.push(students.slice(i , i + 2));
    }
    res.json(groups);
});

app.get('/random-student', (req,res) => {
    const students = ['Charbel','Leyan','Miso','Zeina','Kamal','Allisen'];
    const randomStudent = students[Math.floor(Math.random() * students.length)];
    res.json({student : randomStudent});
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});