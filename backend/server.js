const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();
app.use(cors());
app.use(express.json());

// ฐานข้อมูลร้านค้า (ใช้ชุดข้อมูลที่มี Keywords)
const donmuang_all = [
   { "terminal": 2, "floor": 1, "category": "restaurant", "name": "Bread Talk", "location": "1", "image_key": "mapLevel1", "time": "06:00 - 22:00", "keywords": ["bread talk", "breadtalk", "เบรดทอล์ค", "ขนมปัง"] },
  { "terminal": 2, "floor": 1, "category": "restaurant", "name": "Dao Coffee", "location": "2", "image_key": "mapLevel1", "time": "24 ชั่วโมง", "keywords": ["dao coffee", "dao", "ดาวคอฟฟี่", "กาแฟดาว", "ดาว"] },
  { "terminal": 2, "floor": 1, "category": "restaurant", "name": "Cafe Amazon", "location": "3", "image_key": "mapLevel1", "time": "06:00 - 20:00", "keywords": ["cafe amazon", "amazon", "คาเฟ่อเมซอน", "อเมซอน", "กาแฟอเมซอน"] },
  { "terminal": 2, "floor": 1, "category": "restaurant", "name": "Black Canyon", "location": "4", "image_key": "mapLevel1", "time": "06:00 - 22:00", "keywords": ["black canyon", "black", "canyon", "แบล็คแคนยอน", "แบล็ค"] },
  { "terminal": 2, "floor": 1, "category": "restaurant", "name": "ฮั่วเซ่งฮงติ่มซำ", "location": "5", "image_key": "mapLevel1", "time": "06:00 - 22:00", "keywords": ["ฮั่วเซ่งฮง", "ติ่มซำ", "dim sum", "hua seng hong"] },
  { "terminal": 2, "floor": 1, "category": "restaurant", "name": "Bill Bentley Pub", "location": "6", "image_key": "mapLevel1", "time": "10:00 - 22:00", "keywords": ["bill bentley", "pub", "บิล เบนต์ลีย์", "ผับ", "เบียร์"] },
  { "terminal": 2, "floor": 1, "category": "restaurant", "name": "เย็นตาโฟทรงเครื่อง", "location": "7", "image_key": "mapLevel1", "time": "06:00 - 22:00", "keywords": ["เย็นตาโฟ", "ก๋วยเตี๋ยว", "yen ta fo", "ทรงเครื่อง"] },
  { "terminal": 2, "floor": 1, "category": "restaurant", "name": "Burger King", "location": "8", "image_key": "mapLevel1", "time": "24 ชั่วโมง", "keywords": ["burger king", "burger", "เบอร์เกอร์คิง", "เบอร์เกอร์"] },
  { "terminal": 2, "floor": 1, "category": "restaurant", "name": "Subway", "location": "9", "image_key": "mapLevel1", "time": "24 ชั่วโมง", "keywords": ["subway", "ซับเวย์", "แซนวิช"] },
  { "terminal": 2, "floor": 1, "category": "restaurant", "name": "ซัวเถาคิทเช่น", "location": "10", "image_key": "mapLevel1", "time": "06:00 - 22:00", "keywords": ["ซัวเถา", "shantou", "kitchen", "อาหารจีน"] },

  { "terminal": 2, "floor": 2, "category": "restaurant", "name": "กาแฟมวลชน", "location": "1", "image_key": "mapLevel2", "time": "07:00 - 18:00", "keywords": ["กาแฟมวลชน", "มวลชน", "muon chon", "coffee"] },
  { "terminal": 2, "floor": 2, "category": "service", "name": "7-Eleven เซเว่น", "location": "2", "image_key": "mapLevel2", "time": "24 ชั่วโมง", "keywords": ["7 eleven", "7-eleven", "seven", "เซเว่น", "711"] },
  { "terminal": 2, "floor": 2, "category": "service", "name": "เอ็กซ์ตร้า พลัส Extra Plus", "location": "3", "image_key": "mapLevel2", "time": "08:00 - 20:00", "keywords": ["extra plus", "เอ็กซ์ตร้า", "ร้านยา", "เอ็กตร้า"] },
  { "terminal": 2, "floor": 2, "category": "restaurant", "name": "Magic Zaab Classic", "location": "4", "image_key": "mapLevel2", "time": "06:00 - 21:00", "keywords": ["magic zaab", "เมจิกแซ่บ", "ส้มตำ", "แซ่บ"] },
  { "terminal": 2, "floor": 2, "category": "restaurant", "name": "Airport Street Food ศูนย์อาหาร", "location": "5", "image_key": "mapLevel2", "time": "06:00 - 21:00", "keywords": ["street food", "ศูนย์อาหาร", "ฟู้ดคอร์ด", "food court", "ราคาถูก"] },

  { "terminal": 2, "floor": 3, "category": "restaurant", "name": "ชาตรามือ", "location": "1", "image_key": "mapMain3", "time": "06:00 - 22:00", "keywords": ["ชาตรามือ", "chatramue", "ชาไทย", "milk tea"] },
  { "terminal": 2, "floor": 3, "category": "restaurant", "name": "Garrett Popcorn", "location": "2", "image_key": "mapMain3", "time": "06:00 - 22:00", "keywords": ["garrett", "popcorn", "กาเร็ต", "ป๊อปคอร์น"] },
  { "terminal": 2, "floor": 3, "category": "restaurant", "name": "Ochaya", "location": "3", "image_key": "mapMain3", "time": "06:00 - 22:00", "keywords": ["ochaya", "โอชายะ", "ชานม"] },
  { "terminal": 2, "floor": 3, "category": "restaurant", "name": "กาแฟมวลชน", "location": "4", "image_key": "mapMain3", "time": "06:00 - 20:00", "keywords": ["กาแฟมวลชน", "มวลชน", "muon chon", "coffee"] },
  { "terminal": 2, "floor": 3, "category": "restaurant", "name": "Bread Talk", "location": "5", "image_key": "mapMain3", "time": "06:00 - 22:00", "keywords": ["bread talk", "breadtalk", "เบรดทอล์ค"] },
  { "terminal": 2, "floor": 3, "category": "restaurant", "name": "Milch", "location": "6", "image_key": "mapMain3", "time": "06:00 - 22:00", "keywords": ["milch", "มิลช์", "ชีสเค้ก"] },
  { "terminal": 2, "floor": 3, "category": "restaurant", "name": "Simple W", "location": "7", "image_key": "mapMain3", "time": "06:00 - 22:00", "keywords": ["simple w", "ซิมเพิล ดับเบิลยู"] },
  { "terminal": 2, "floor": 3, "category": "restaurant", "name": "Bee Chiang Hiang", "location": "8", "image_key": "mapMain3", "time": "06:00 - 22:00", "keywords": ["bee chiang hiang", "บีเชียงไฮ"] },
  { "terminal": 2, "floor": 3, "category": "restaurant", "name": "Bread Papa", "location": "9", "image_key": "mapMain3", "time": "06:00 - 22:00", "keywords": ["bread papa", "เบรดปาป้า", "ชูครีม"] },
  { "terminal": 2, "floor": 3, "category": "restaurant", "name": "Bake Cheese Tart", "location": "10", "image_key": "mapMain3", "time": "06:00 - 22:00", "keywords": ["bake cheese tart", "เบค", "ชีสทาร์ต"] },
  { "terminal": 2, "floor": 3, "category": "restaurant", "name": "Ben's Cookies", "location": "11", "image_key": "mapMain3", "time": "06:00 - 22:00", "keywords": ["ben's cookies", "เบน คุกกี้"] },
  { "terminal": 2, "floor": 3, "category": "restaurant", "name": "Starbucks สตาร์บัคส์", "location": "12", "image_key": "mapMain3", "time": "05:00 - 22:00", "keywords": ["starbucks", "สตาร์บัค", "สตาบัค", "กาแฟเงือก"] },
  { "terminal": 2, "floor": 3, "category": "restaurant", "name": "The Coffee Club", "location": "13", "image_key": "mapMain3", "time": "06:00 - 22:00", "keywords": ["the coffee club", "เดอะ คอฟฟี่ คลับ"] },
  { "terminal": 2, "floor": 3, "category": "restaurant", "name": "Krispy Kreme", "location": "14", "image_key": "mapMain3", "time": "06:00 - 22:00", "keywords": ["krispy kreme", "คริสปี้ครีม", "โดนัท"] },
  { "terminal": 2, "floor": 3, "category": "restaurant", "name": "Mr.Cup T", "location": "15", "image_key": "mapMain3", "time": "06:00 - 22:00", "keywords": ["mr cup t", "มิสเตอร์คัพที","มิสเตอร์คับที"] },
  { "terminal": 2, "floor": 3, "category": "service", "name": "โครงการหลวง", "location": "16", "image_key": "mapMain3", "time": "07:00 - 19:00", "keywords": ["โครงการหลวง", "royal project", "ดอยคำ"] },
  { "terminal": 2, "floor": 3, "category": "service", "name": "7-Eleven เซเว่น", "location": "17", "image_key": "mapMain3", "time": "24 ชั่วโมง", "keywords": ["7 eleven", "7-eleven", "seven", "เซเว่น"] },
  { "terminal": 2, "floor": 3, "category": "service", "name": "Boots บู๊ทส์", "location": "18", "image_key": "mapMain3", "time": "06:00 - 22:00", "keywords": ["boots", "บู๊ทส์", "ร้านยา"] },
  { "terminal": 2, "floor": 3, "category": "service", "name": "Food & Souvenir", "location": "19", "image_key": "mapMain3", "time": "06:00 - 22:00", "keywords": ["food souvenir", "ของฝาก"] },
  { "terminal": 2, "floor": 3, "category": "restaurant", "name": "Black Canyon", "location": "20", "image_key": "mapMain3", "time": "06:00 - 22:00", "keywords": ["black canyon", "แบล็คแคนยอน"] },
  { "terminal": 2, "floor": 3, "category": "restaurant", "name": "China Town", "location": "21", "image_key": "mapMain3", "time": "06:00 - 22:00", "keywords": ["china town", "ไชน่าทาวน์"] },
  { "terminal": 2, "floor": 3, "category": "restaurant", "name": "Bill Bentley Pub", "location": "22", "image_key": "mapMain3", "time": "10:00 - 22:00", "keywords": ["bill bentley", "บิล เบนต์ลีย์"] },
  { "terminal": 2, "floor": 3, "category": "restaurant", "name": "Thai Express", "location": "23", "image_key": "mapMain3", "time": "06:00 - 22:00", "keywords": ["thai express", "ไทย เอ็กซ์เพรส"] },
  { "terminal": 2, "floor": 3, "category": "restaurant", "name": "Ajisen Ramen", "location": "24", "image_key": "mapMain3", "time": "06:00 - 22:00", "keywords": ["ajisen", "ramen", "ราเมน", "อาจิเซน"] },
  { "terminal": 2, "floor": 3, "category": "restaurant", "name": "Bonchon บอนชอน", "location": "25", "image_key": "mapMain3", "time": "06:00 - 22:00", "keywords": ["bonchon", "บอนชอน", "ไก่ทอด"] },
  { "terminal": 2, "floor": 3, "category": "restaurant", "name": "Subway", "location": "26", "image_key": "mapMain3", "time": "24 ชั่วโมง", "keywords": ["subway", "ซับเวย์"] },
  { "terminal": 2, "floor": 3, "category": "restaurant", "name": "Burger King", "location": "27", "image_key": "mapMain3", "time": "24 ชั่วโมง", "keywords": ["burger king", "เบอร์เกอร์คิง"] },
  { "terminal": 2, "floor": 3, "category": "restaurant", "name": "McDonald's แมคโดนัลด์", "location": "28", "image_key": "mapMain3", "time": "24 ชั่วโมง", "keywords": ["mcdonald", "แมคโดนัลด์", "mc"] },
  { "terminal": 2, "floor": 3, "category": "restaurant", "name": "KFC เคเอฟซี", "location": "29", "image_key": "mapMain3", "time": "05:00 - 22:00", "keywords": ["kfc", "เคเอฟซี", "ไก่ทอด"] },
  { "terminal": 2, "floor": 3, "category": "restaurant", "name": "Bangmad Halal Food อาหารฮาลาล", "location": "30", "image_key": "mapMain3", "time": "06:00 - 21:00", "keywords": ["bangmad", "halal", "ฮาลาล", "มุสลิม", "อาหารฮาลาล"] },

  { "terminal": 2, "floor": 3, "category": "restaurant", "name": "Dao Coffee", "location": "1", "image_key": "mapPier3", "time": "06:00 - 22:00", "keywords": ["dao coffee", "ดาวคอฟฟี่", "กาแฟดาว"] },
  { "terminal": 2, "floor": 3, "category": "restaurant", "name": "Black Canyon", "location": "2", "image_key": "mapPier3", "time": "06:00 - 22:00", "keywords": ["black canyon", "แบล็คแคนยอน"] },
  { "terminal": 2, "floor": 3, "category": "restaurant", "name": "Au We White Coffee", "location": "3", "image_key": "mapPier3", "time": "06:00 - 22:00", "keywords": ["au we", "white coffee", "โอเว่"] },
  { "terminal": 2, "floor": 3, "category": "service", "name": "Kid Zone สนามเด็กเล่น", "location": "กลางทางเดิน", "image_key": "mapPier3", "time": "เปิดตามเวลาเที่ยวบิน", "keywords": ["kid zone", "สนามเด็กเล่น", "ที่เล่นเด็ก"] },

  { "terminal": 2, "floor": 3, "category": "restaurant", "name": "ดอยช้าง คาเฟ่ Doi Chaang", "location": "1", "image_key": "mapPier4", "time": "06:00 - 22:00", "keywords": ["doi chaang", "ดอยช้าง"] },
  { "terminal": 2, "floor": 3, "category": "restaurant", "name": "Tipco Squeeze", "location": "2", "image_key": "mapPier4", "time": "06:00 - 22:00", "keywords": ["tipco", "squeeze", "ทิปโก้", "น้ำผลไม้"] },
  { "terminal": 2, "floor": 3, "category": "restaurant", "name": "Dao Coffee", "location": "3", "image_key": "mapPier4", "time": "06:00 - 22:00", "keywords": ["dao coffee", "ดาวคอฟฟี่"] },
  { "terminal": 2, "floor": 3, "category": "restaurant", "name": "Black Canyon", "location": "4", "image_key": "mapPier4", "time": "06:00 - 22:00", "keywords": ["black canyon", "แบล็คแคนยอน"] },
  { "terminal": 2, "floor": 3, "category": "restaurant", "name": "Au We White Coffee", "location": "5", "image_key": "mapPier4", "time": "06:00 - 22:00", "keywords": ["au we", "white coffee"] },
  { "terminal": 2, "floor": 3, "category": "restaurant", "name": "Airport Street Food ศูนย์อาหาร", "location": "6", "image_key": "mapPier4", "time": "06:00 - 21:00", "keywords": ["street food", "ศูนย์อาหาร"] },
  { "terminal": 2, "floor": 3, "category": "restaurant", "name": "Noodle Express", "location": "7", "image_key": "mapPier4", "time": "06:00 - 22:00", "keywords": ["noodle express", "ก๋วยเตี๋ยว"] },
  { "terminal": 2, "floor": 3, "category": "restaurant", "name": "Chester's เชสเตอร์เกรลล์", "location": "8", "image_key": "mapPier4", "time": "06:00 - 22:00", "keywords": ["chester", "เชสเตอร์", "ไก่ย่าง"] },

  { "terminal": 2, "floor": 3, "category": "restaurant", "name": "Passenger Life", "location": "1", "image_key": "mapPier5", "time": "06:00 - 22:00", "keywords": ["passenger life"] },
  { "terminal": 2, "floor": 3, "category": "restaurant", "name": "ขนมบ้านโกไข่", "location": "2", "image_key": "mapPier5", "time": "06:00 - 22:00", "keywords": ["โกไข่", "ko kai", "ขนมเปี๊ยะ"] },
  { "terminal": 2, "floor": 3, "category": "restaurant", "name": "Coral Cafe", "location": "3", "image_key": "mapPier5", "time": "06:00 - 22:00", "keywords": ["coral cafe", "คอรัล"] },
  { "terminal": 2, "floor": 3, "category": "restaurant", "name": "Black Canyon", "location": "4", "image_key": "mapPier5", "time": "06:00 - 22:00", "keywords": ["black canyon"] },
  { "terminal": 2, "floor": 3, "category": "restaurant", "name": "Baburu Cha", "location": "5", "image_key": "mapPier5", "time": "06:00 - 22:00", "keywords": ["baburu cha", "ชานม"] }
];

app.post('/api/chat', async (req, res) => {
  try {
    const userQuestion = req.body.messages[req.body.messages.length - 1].content.trim();
    const q = userQuestion.toLowerCase();

    // 1. ค้นหาแบบฉลาด: เช็คทั้งชื่อร้านและ Keywords
    const matchedShops = donmuang_all.filter(shop => {
      const nameMatch = shop.name.toLowerCase().includes(q) || q.includes(shop.name.toLowerCase());
      const keywordMatch = shop.keywords && shop.keywords.some(k => q.includes(k));
      return nameMatch || keywordMatch;
    });

    let context = "";
    let image_keys = [];

    if (matchedShops.length > 0) {
      context = matchedShops.map(shop => 
        `- ร้าน ${shop.name} อยู่ชั้น ${shop.floor} เปิดให้บริการเวลา ${shop.time}`
      ).join('\n');
      image_keys = [...new Set(matchedShops.map(s => s.image_key))];
    } else {
      context = "ไม่มีข้อมูลร้านนี้ในระบบ";
    }

    // 2. ปรับ Prompt ให้ AI ทำงานร่วมกับ Context
    const systemInstruction = `คุณคือ 'น้องใส่ใจ' พนักงาน AI ประชาสัมพันธ์สนามบินดอนเมือง Terminal 2

ข้อมูลอ้างอิงจริง: 
${context}

กฎเหล็กที่ต้องทำตาม:
- หากในข้อมูลอ้างอิงมีร้านชื่อเดียวกัน "หลายสาขา" คุณต้องบอกตำแหน่งและเวลาของ "ทุกสาขา" ให้ครบถ้วน
- ห้ามเลือกตอบเพียงสาขาเดียวเด็ดขาด
- ห้ามตอบว่า "ค่ะ ค่ะ" หรือคำสั้นซ้ำกันเด็ดขาด
- ใช้ข้อมูลจาก "ข้อมูลอ้างอิงจริง" ด้านบนเท่านั้นในการตอบ
- ถ้าในข้อมูลระบุว่า "24 ชั่วโมง" ต้องตอบว่า "24 ชั่วโมง" ห้ามเปลี่ยนเอง
- หากไม่พบข้อมูล ให้บอกว่า "ขออภัยครับ ยังไม่มีข้อมูลร้านนี้ในระบบสนามบินดอนเมือง T2"
- ตอบสุภาพ ลงท้ายด้วย "ครับ" `;

    const ollamaResponse = await axios.post('http://127.0.0.1:11434/api/chat', {
     model: 'gemma3:1b',
      messages: [
        { role: "system", content: systemInstruction },
        { role: "user", content: userQuestion }
      ],
      stream: false,
      options: { 
        temperature: 0.0, // บังคับให้ตอบตามจริง
        top_p: 0.1, 
        num_predict: 300 
      }
    });

    const aiReply = ollamaResponse.data.message.content;
    
    // --- แสดงผลใน Terminal เพื่อตรวจสอบความถูกต้อง ---
    console.log(`🤖 AI ตอบว่า: ${aiReply}`);
    console.log(`🖼️  ส่งแผนที่: ${image_keys.length > 0 ? image_keys.join(', ') : 'ไม่มีรูป'}\n`);

    res.json({
      reply: aiReply,
      image_keys: image_keys
    });

  } catch (error) {
    console.error("❌ Error:", error.message);
    res.status(500).json({ reply: "ขออภัยครับ ระบบขัดข้องชั่วคราว" });
  }
});

app.listen(5000, () => console.log('🚀 AI Server Running on Port 5000'));