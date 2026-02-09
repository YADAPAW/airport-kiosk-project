const express = require('express');
const cors = require('cors');
const { GoogleGenerativeAI } = require('@google/generative-ai');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// 1. เชื่อมต่อกับ Gemini
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// 2. ข้อมูลจำลองอ้างอิงจากโปรเจคคุณ (Airport Kiosk)
const AIRPORT_DATA = `
คุณคือผู้ช่วยอัจฉริยะประจำตู้ Kiosk สนามบิน (ต้นแบบจากแอป SAWASDEE)
ข้อมูลร้านค้า: Starbucks (ชั้น 3), Burger King (ชั้น 2 ใกล้ Gate D1)
ข้อมูลเที่ยวบิน: TG123 (เชียงใหม่, Gate D7, 14:00), BA009 (ลอนดอน, Gate E1, 15:30)
คำตอบต้อง: สุภาพ (ครับ/ค่ะ), กระชับ และเน้นช่วยเหลือลูกค้า
`;

app.post('/api/chat', async (req, res) => {
    try {
        const { message } = req.body;
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

        // รวมบริบทสนามบินเข้ากับคำถามลูกค้า
        const prompt = `${AIRPORT_DATA} \n ลูกค้าถามว่า: ${message}`;
        
        const result = await model.generateContent(prompt);
        const response = await result.response;
        
        res.json({ reply: response.text() });
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ error: "ขออภัยครับ ระบบประมวลผลขัดข้อง" });
    }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 สมอง Kiosk รันอยู่ที่พอร์ต ${PORT}`));