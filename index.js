const express = require('express');
const axios = require('axios');
const app = express();

app.use(express.json());

app.post('/send-message', async (req, res) => {
    const { chat_id, message } = req.body;
    const telegramToken = 'YOUR_TELEGRAM_BOT_TOKEN';
    const url = `https://api.telegram.org/bot${telegramToken}/sendMessage`;

    try {
        const response = await axios.post(url, {
            chat_id: chat_id,
            text: message
        });

        // Mengirimkan respons sukses
        res.json(response.data);
    } catch (error) {
        console.error('Error saat mengirim pesan:', error);

        // Mengirimkan respons error ke PHP client
        res.status(500).json({ error: "Gagal mengirim pesan" });
    }
});

app.listen(3000, () => {
    console.log('Server berjalan di http://localhost:3000');
});
