import React, { useState, useEffect } from 'react';
import {
  Aperture, Wand2, Clipboard, Brain, Loader2, ChevronDown,
  Check, User, Mountain, TextQuote, Sparkles
} from 'lucide-react';

// --- TONY 老師，請務必確認這行網址是正確的 ---
// 👇 請將您 n8n 的 Test URL 貼在這裡 (引號內)
const N8N_WEBHOOK_URL = "https://mindnodeai.app.n8n.cloud/webhook/generate-sora"; 


// --- 品牌核心元素 ---
const TONY_STUDIO_PILLARS = [
  { id: 'philosophy', name: '道 × 智：人間智慧系列' },
  { id: 'nature', name: '天地為師：自然法則系列' },
  { id: 'culture', name: '世界人文 × 文化探索系列' },
  { id: 'leadership', name: '力量 × 團隊 × 領導者系列' },
  { id: 'emotion', name: '善良 × 家庭 × 情感系列' },
  { id: 'design', name: '設計師 × 思維架構師系列' },
  { id: 'technology', name: '科技應用 × 未來創新系列' },
  { id: 'surreal', name: '天馬行空 × 超現實創意系列' },
  { id: 'pets', name: '🐾 TONY STUDIO 寵物可愛系列' },
  { id: 'performing_arts', name: 'TONY STUDIO—演奏 × 歌唱 × 舞蹈表演系列' },
  { id: 'street_performer', name: '街頭藝人表演系列 Street Performer Series' },
  { id: 'advertising', name: '🎯 廣告創意 × 品牌洞察' },
  { id: 'disaster', name: '🌪️ 災難片 × 劇情張力' },
  { id: 'retro', name: '🎞️ 復古風 × 時代美學' },
  { id: 'world_landscape', name: '🌍 世界的風景 × 景觀 × 習俗系列' },
  { id: 'solar_terms', name: '🍂 中國 24 節氣 × 時令哲學系列' },
  { id: 'dialogue_celebrity', name: '🌍 與世界名人對話系列' },
  { id: 'dialogue_classics', name: '📚 世界名著 × 童話 × 諺語系列' },
  { id: 'industry', name: '🌱 百工百業 × 生態智慧系列' },
  { id: 'festivals', name: '🎉 世界節日 × 習俗儀式系列' },
  { id: 'youthful_joy', name: '🚀 快樂愉悅 × 創意未來系列 (For Youth)' },
  { id: 'culinary_arts', name: '🍽️ 飲食文化 × 廚藝哲學系列' },
  { id: 'taiwan_local', name: '🇹🇼 台灣寶島 × 地方創生系列' },
  { id: 'animal_dialogue', name: '🦓 萬物有靈 × 奇幻對話系列' },
];

// --- 主題變數資料庫 (保留您的完整資料結構) ---
const THEME_VARIABLES = {
  philosophy: ["看遠才走得穩", "高度在心不是天", "靜下來才聽得見", "選擇比努力重要", "心定，路就不亂", "越善良越有力量", "成長是靜默累積", "真正的勇氣是溫柔", "放下才能向前", "心能看多遠", "方向比速度重要", "用心看世界", "人間智慧", "光在心裡先亮", "走得慢也會到", "不爭而勝", "不語而明", "道在平常", "一切皆選擇", "看懂自己才看懂世界"],
  nature: ["與海同行", "風懂方向", "星光會指路", "山教我堅定", "河流懂得前行", "草原的寬恕", "雲的自由", "鯨魚的靜默", "老鷹的高度", "森林的智慧", "光穿透黑暗", "四季的答案", "雨落有聲", "風起有意", "自然在說話", "大地的耐心", "海浪的節奏", "花開的理解", "夜空的寧靜", "火焰的覺醒"],
  culture: ["威尼斯的眼神", "巴西的心跳", "泰國的祝福", "京都的靜美", "巴黎的靈魂", "紐約的節奏", "祕魯的呼吸", "撒哈拉的低語", "義大利的浪漫", "台灣的溫度", "原民的力量", "城市的人文", "世界的共同語言", "旅途的答案", "雕刻時光", "人文的重量", "文化的呼吸", "舞蹈的靈魂", "面具下的真實", "世界的心跳"],
  leadership: ["最後三秒的力量", "團隊的信任", "不放棄的瞬間", "逆轉開始的時刻", "一起完成不可能", "每一步都算數", "勇氣在心跳之間", "決定勝負的是信念", "站起來才是真力量", "和隊友一起更強大", "贏的是選擇", "高手都是孤獨練成", "真正的領導是支持", "不能被看扁自己", "勇往直前的光", "無畏", "持續前進", "一起走", "信任就是力量", "心跳就是節奏"],
  emotion: ["家是心的方向", "愛是最大的勇氣", "陪伴是最美的語言", "善良會回來", "心軟不是弱", "愛家的人最強大", "溫柔的堅定", "為家而走", "有你在就是光", "記憶比時間更長"],
  design: ["美在平衡", "設計是思考的形狀", "結構創造意義", "邏輯讓世界更美", "把心做成作品", "設計是一種洞察", "思維的高度", "美感的力量", "創作是選擇", "架構決定一切"],
  technology: ["光速的思維", "未來的語言", "科技的心跳", "智慧的邊界", "演算法的靈魂", "人機的共舞", "量子的呼吸", "未來在發光", "破框的創新", "在科技裡思考"],
  surreal: ["夢的邊境", "雲上的城市", "光的翅膀", "飛在想像裡", "超越現實的心", "星河在流動", "重力的逆轉", "詩意的宇宙", "天空的階梯", "心中的宇宙"],
  pets: ["尾巴的故事", "眼神會說話", "你在我就安心", "最暖的陪伴", "心都融化了", "靠著的幸福", "撒嬌的力量", "被愛的瞬間", "最懂我的你", "牽牠一起走"],
  performing_arts: ["靈魂的樂章", "指尖的風", "旋律會說話", "心中的音符", "聽見自己的聲音", "音樂的重量", "光在琴弦上", "靈魂的鼓點", "風中的琴聲", "旋律的溫度"],
  street_performer: ["街角的琴聲", "流浪的旋律", "人行道的音符", "靈魂在彈奏", "世界的街聲", "指尖的自由", "風吹樂章走", "站在街上的歌", "歌在路上走", "唱給城市聽"],
  advertising: ["時間的價值", "選擇的底氣", "習慣的力量", "生活的靈感", "光會找到你", "細節的真相", "慢的哲學", "用心的重量", "選擇會說話", "勇敢是一種姿態"],
  disaster: ["風暴的前奏", "海嘯的眼睛", "火山的呼吸", "地震的裂縫", "暴雨的審判", "黑夜的咆哮", "颶風的邊緣", "烈火的真相", "暴風眼之內", "天空的崩塌"],
  retro: ["老街的風", "時光的味道", "紅磚的記憶", "童年的光", "老相機的眼", "黑膠的旋律", "老車的故事", "石板路的聲音", "舊時代的香氣", "回憶的底片"],
  world_landscape: ["山脈的呼喚", "海岸的節奏", "沙漠的呢喃", "雪國的寧靜", "森林的脈搏", "火山的記憶", "峽谷的迴聲", "瀑布的語言", "草原的心跳", "湖面的祕密"],
  solar_terms: ["立春 春風的開始", "雨水 雨醒大地", "驚蟄 雷動的時刻", "春分 光的平衡", "清明 風裡的思念", "穀雨 潤物無聲", "立夏 光的脈動", "小滿 圓滿的前奏", "芒種 播種的勇氣", "夏至 日長的答案"],
  dialogue_celebrity: ["與老子對話", "與孔子同行", "與柏拉圖談心", "與蘇格拉底提問", "與亞里斯多德思辨", "與尼采望向深淵", "與卡繆聊荒謬", "與紀伯倫談心靈", "與佛陀學智慧", "與莊子看世界"],
  dialogue_classics: ["小王子的星球", "老人與海的力量", "羅密歐的月光", "唐吉訶德的風車", "傲慢與偏見的對白", "百年孤寂的魔幻", "海邊卡夫卡的孤獨", "追風箏的孩子", "當下的力量", "麥田捕手的叛逆"],
  industry: ["木匠的節奏", "漁夫的時序", "農人的耐心", "鐵匠的火光", "裁縫的靈手", "麵包師的晨光", "茶師的節氣感", "花匠的靈魂", "陶匠的溫度", "裁縫的針線心"],
  festivals: ["春節的團圓", "中秋的月光", "泼水的祝福", "花火的夜空", "日本的盂蘭盆", "泰國的天燈", "韓國的秋夕", "越南的春節", "尼泊爾的燈節", "印度的色彩節"],
  youthful_joy: ["快樂是種選擇", "微笑的力量", "創意無極限", "青春正發光", "明天會更好", "一起跳躍吧", "夢想的顏色", "心的節奏", "活在當下", "分享的快樂"],
  culinary_arts: ["廚師的刀工", "食材的語言", "火候的智慧", "醬料的靈魂", "餐桌的風景", "一道菜的故事", "媽媽的味道", "食物的記憶", "品嚐當下", "分享的美味"],
  taiwan_local: ["寶島的心跳", "山的禮物", "海的恩賜", "土地的聲音", "人情味的溫度", "善良的DNA", "勤奮的汗水", "台灣的韌性", "一鄉一味", "巷弄的風景"],
  animal_dialogue: ["萬物的聲音", "老鷹的視角", "鯨魚的低語", "獅子的勇氣", "與猛虎共飲", "聽懂森林", "魚群的秩序", "豹的信任", "候鳥的約定", "大象的記憶"]
};


// --- 應用程式主組件 ---
export default function App() {
  const [selectedPillar, setSelectedPillar] = useState(TONY_STUDIO_PILLARS[0].id);
  const [availableThemes, setAvailableThemes] = useState([]);
  const [selectedTheme, setSelectedTheme] = useState(''); 
  const [themeInput, setThemeInput] = useState(''); 
  const [secondCharacter, setSecondCharacter] = useState('');
  const [settingInput, setSettingInput] = useState('');
  
  const [generatedScript, setGeneratedScript] = useState(null); 
  
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  // 保留這兩個 state 但目前不使用自動建議，避免黃色錯誤框
  const [isSuggesting, setIsSuggesting] = useState(false);
  const [suggestionError, setSuggestionError] = useState(null);
  
  const [copied, setCopied] = useState(false); 
  const [quotesCopied, setQuotesCopied] = useState(false); 
  const [zhPromptCopied, setZhPromptCopied] = useState(false); 

  // 初始化
  useEffect(() => {
    setGeneratedScript(getWelcomeScript());
    setAvailableThemes(THEME_VARIABLES[TONY_STUDIO_PILLARS[0].id] || []);
  }, []);

  // 切換系列時
  useEffect(() => {
    const themes = THEME_VARIABLES[selectedPillar] || [];
    setAvailableThemes(themes);
    setSelectedTheme('');
    setThemeInput('');
    setSecondCharacter('');
    setSettingInput('');
  }, [selectedPillar]);


  // --- ✅ 核心修正：寬容檢查機制 ---
  const handleGenerateScript = async () => {
    // ✅ 只有這一行是必填的，其他的我們可以幫他填預設值
    if (!themeInput) {
      setError('請至少填寫「創作主題」。');
      return;
    }

    setIsLoading(true);
    setError(null);
    setGeneratedScript(null);

    const pillarName = TONY_STUDIO_PILLARS.find(p => p.id === selectedPillar)?.name || '未知系列';

    try {
      // 打電話給 n8n
      const response = await fetch(N8N_WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          pillar: pillarName,
          theme: themeInput,
          // ✅ 如果沒填，就傳送 "AI 自動決定" 給後端，這樣就不會報錯了
          character: secondCharacter || "AI 自動決定",
          setting: settingInput || "AI 自動決定"
        })
      });

      if (!response.ok) {
        throw new Error(`後端連線錯誤: ${response.statusText}`);
      }

      const data = await response.json();

      // 處理回傳資料 (相容不同的 n8n 回傳格式)
      if (data.logline_zh) {
        setGeneratedScript(data);
      } else if (data.result) {
        try {
          const parsed = typeof data.result === 'object' ? data.result : JSON.parse(data.result);
          setGeneratedScript(parsed);
        } catch (e) {
          console.error("JSON 解析失敗", e);
          setError("資料格式錯誤，請檢查 n8n 回傳內容。");
        }
      } else {
        setGeneratedScript(data);
      }

    } catch (err) {
      console.error("生成失敗:", err);
      setError(`生成失敗：${err.message}。請確認 n8n 已啟動 (Execute Workflow)。`);
      setGeneratedScript(getWelcomeScript(true));
    } finally {
      setIsLoading(false);
    }
  };

  // --- ✅ 修復：將 AI 建議改為手動輸入提示，避免 API 錯誤 ---
  const handleThemeSelect = (e) => {
    const newTheme = e.target.value;
    setSelectedTheme(newTheme);
    setThemeInput(newTheme);
    
    // TONY 老師：為了安全，我們先關閉這裡的自動 AI 建議
    // 這樣就不會跳出黃色錯誤框了
    if (newTheme) {
       setSecondCharacter(""); // 讓使用者手動輸入
       setSettingInput("");    // 讓使用者手動輸入
    }
  };

  // --- 複製功能 ---
  const copyToClipboard = () => copyText(generatedScript?.sora_prompt_en, setCopied);
  const copyZhPromptToClipboard = () => copyText(generatedScript?.sora_prompt_zh, setZhPromptCopied);
  const copyQuotesToClipboard = () => {
    if (!generatedScript?.quotes) return;
    const { main_zh, sub_zh, main_en } = generatedScript.quotes;
    copyText(`中文主金句: ${main_zh}\n中文副句: ${sub_zh}\n英文金句: ${main_en}`, setQuotesCopied);
  };

  const copyText = (text, setStatus) => {
    if (!text) return;
    const textarea = document.createElement('textarea');
    textarea.value = text.trim();
    document.body.appendChild(textarea);
    textarea.select();
    try { document.execCommand('copy'); setStatus(true); setTimeout(() => setStatus(false), 2000); } 
    catch (err) { console.error(err); }
    document.body.removeChild(textarea);
  };

  // --- 歡迎/錯誤 腳本 ---
  const getWelcomeScript = (isError = false) => {
    if (isError) return { logline_zh: "連線失敗", logline_en: "Connection Failed", sora_prompt_zh: "無法連接到 n8n 後端。", sora_prompt_en: "Cannot connect to n8n backend.", quotes: { main_zh: "請檢查 Webhook URL", sub_zh: "或確認 n8n 已啟動", main_en: "Check your settings" } };
    return {
      logline_zh: "一位現代智者，在竹林中遇見老子，領悟了柔弱勝剛強的道理。",
      logline_en: "A modern mentor meets Laozi in a bamboo forest.",
      sora_prompt_zh: "一部電影感的短片，黃金時刻。Tony 和老子靜坐在陽光灑落的竹林中。",
      sora_prompt_en: "A cinematic film, golden hour. Tony and Laozi sit silently in a sunlit bamboo forest.",
      quotes: { main_zh: "柔，是一種比鋼更大的力量。", sub_zh: "當你不再逞強，世界才看見你的真正高度。", main_en: "When the heart softens, true strength begins." }
    };
  };

  return (
    <div className="flex h-full min-h-screen font-sans bg-gray-900 text-white">
      {/* --- 左側控制面板 --- */}
      <aside className="w-full max-w-md lg:w-1/3 xl:w-1/4 p-6 bg-gray-950 border-r border-gray-700 flex flex-col shadow-2xl">
        <header className="mb-6 border-b border-gray-700 pb-4">
          <h1 className="text-3xl font-bold text-white flex items-center">
            <Aperture className="text-indigo-400 w-8 h-8 mr-3" />
            TONY STUDIO
          </h1>
          <p className="text-lg text-indigo-300 font-light">SORA Prompt 生成器 (V4.0)</p>
        </header>

        {error && (
          <div className="bg-red-800 border border-red-600 text-white p-4 rounded-lg mb-4 text-sm">
            <p className="font-bold">發生錯誤</p>
            <p>{error}</p>
          </div>
        )}

        <form onSubmit={(e) => { e.preventDefault(); handleGenerateScript(); }} className="flex flex-col space-y-5">
          {/* 1. 選擇敘事支柱 */}
          <div className="relative">
            <label className="block text-sm font-medium text-gray-300 mb-2"><Brain className="w-4 h-4 inline-block mr-2" />1. 選擇敘事支柱</label>
            <select value={selectedPillar} onChange={(e) => setSelectedPillar(e.target.value)} className="w-full pl-3 pr-10 py-2.5 bg-gray-800 border border-gray-700 rounded-lg text-white appearance-none">
              {TONY_STUDIO_PILLARS.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
            </select>
            <ChevronDown className="w-5 h-5 text-gray-400 absolute right-3 top-10 pointer-events-none" />
          </div>

          {/* 2. 選擇主題變數 */}
          <div className="relative">
            <label className="block text-sm font-medium text-gray-300 mb-2"><TextQuote className="w-4 h-4 inline-block mr-2" />2. 選擇主題變數 (V2.0)</label>
            <select value={selectedTheme} onChange={handleThemeSelect} className="w-full pl-3 pr-10 py-2.5 bg-gray-800 border border-gray-700 rounded-lg text-white appearance-none">
              <option value="">-- 請從 {availableThemes.length} 個主題中選擇 --</option>
              {availableThemes.map((t, i) => <option key={i} value={t}>{t}</option>)}
            </select>
            <ChevronDown className="w-5 h-5 text-gray-400 absolute right-3 top-10 pointer-events-none" />
          </div>

          {/* 3. 輸入創作主題 */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2"><Wand2 className="w-4 h-4 inline-block mr-2" />3. 創作主題 (可修改)</label>
            <textarea value={themeInput} onChange={(e) => setThemeInput(e.target.value)} className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg text-white" placeholder="可從上方選單自動填入，或手動輸入..." rows={2} />
          </div>

          {/* 4. 輸入第二角色 */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2"><User className="w-4 h-4 inline-block mr-2" />4. 第二角色 (非必填)</label>
            <textarea value={secondCharacter} onChange={(e) => setSecondCharacter(e.target.value)} className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg text-white" placeholder="AI 自動建議暫時關閉，請手動輸入，或留空讓後端生成..." rows={2} />
          </div>

          {/* 5. 輸入場景 */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2"><Mountain className="w-4 h-4 inline-block mr-2" />5. 場景 (非必填)</label>
            <textarea value={settingInput} onChange={(e) => setSettingInput(e.target.value)} className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg text-white" placeholder="AI 自動建議暫時關閉，請手動輸入，或留空讓後端生成..." rows={2} />
          </div>

          {/* 6. 生成按鈕 */}
          <button type="submit" disabled={isLoading} className={`w-full py-3 rounded-lg text-white font-medium flex justify-center items-center ${isLoading ? 'bg-indigo-800 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-700'}`}>
            {isLoading ? <Loader2 className="w-6 h-6 animate-spin" /> : <><Sparkles className="w-5 h-5 mr-2" /> AI 生成 SORA 腳本 (V4.0)</>}
          </button>
        </form>
      </aside>

      {/* --- 右側顯示區 --- */}
      <main className="w-full lg:w-2/3 xl:w-3/4 p-8 overflow-y-auto bg-gray-900">
        {isLoading && (
          <div className="flex flex-col items-center justify-center h-full text-center">
            <Loader2 className="w-16 h-16 animate-spin text-indigo-400" />
            <p className="text-2xl text-gray-300 mt-6 font-light">正在呼叫 n8n 後端生成腳本...</p>
          </div>
        )}

        {!isLoading && generatedScript && (
          <div className="max-w-3xl mx-auto space-y-8 animate-fadeIn">
            {/* 故事線 */}
            <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
              <h3 className="text-3xl font-semibold text-white mb-6">故事線 (Logline)</h3>
              <div className="space-y-4">
                <div>
                   <p className="text-sm font-semibold text-indigo-300 mb-1">中文故事線</p>
                   <p className="text-lg text-gray-200">{generatedScript.logline_zh}</p>
                </div>
                <div className="border-t border-gray-700 pt-4">
                   <p className="text-sm font-semibold text-indigo-300 mb-1">English Logline</p>
                   <p className="text-lg text-gray-200 font-sans italic">{generatedScript.logline_en}</p>
                </div>
              </div>
            </div>

            {/* 金句 */}
            <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-3xl font-semibold text-white">結尾哲學金句</h3>
                <button onClick={copyQuotesToClipboard} className={`px-4 py-2 rounded-lg text-sm font-medium flex items-center ${quotesCopied ? 'bg-green-600' : 'bg-gray-700 hover:bg-gray-600'}`}>
                  {quotesCopied ? <Check className="w-4 h-4 mr-2" /> : <Clipboard className="w-4 h-4 mr-2" />}
                  {quotesCopied ? "已複製" : "複製金句"}
                </button>
              </div>
              {generatedScript.quotes && (
                 <div className="space-y-5">
                   <QuoteLine label="中文主金句" text={generatedScript.quotes.main_zh} />
                   <QuoteLine label="中文副句" text={generatedScript.quotes.sub_zh} />
                   <QuoteLine label="英文金句" text={generatedScript.quotes.main_en} isEnglish />
                 </div>
              )}
            </div>

            {/* SORA Prompt */}
            <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
               <h3 className="text-3xl font-semibold text-white mb-6">SORA 最終腳本 (V4.11)</h3>
               
               {/* 中文 */}
               <div className="mb-6">
                 <div className="flex justify-between items-center mb-3">
                   <h4 className="text-xl font-semibold text-indigo-300">SORA 簡潔中文腳本</h4>
                   <button onClick={copyZhPromptToClipboard} className={`px-4 py-2 rounded-lg text-sm font-medium flex items-center ${zhPromptCopied ? 'bg-green-600' : 'bg-gray-700 hover:bg-gray-600'}`}>
                    {zhPromptCopied ? <Check className="w-4 h-4 mr-2" /> : <Clipboard className="w-4 h-4 mr-2" />}
                    {zhPromptCopied ? "已複製" : "複製中文"}
                   </button>
                 </div>
                 <pre className="text-gray-200 text-base whitespace-pre-wrap break-words font-sans">{generatedScript.sora_prompt_zh}</pre>
               </div>

               {/* 英文 */}
               <div>
                 <div className="flex justify-between items-center mb-3">
                   <h4 className="text-xl font-semibold text-indigo-300">SORA 簡潔英文腳本</h4>
                   <button onClick={copyToClipboard} className={`px-4 py-2 rounded-lg text-sm font-medium flex items-center ${copied ? 'bg-green-600' : 'bg-gray-700 hover:bg-gray-600'}`}>
                    {copied ? <Check className="w-4 h-4 mr-2" /> : <Clipboard className="w-4 h-4 mr-2" />}
                    {copied ? "已複製" : "複製英文"}
                   </button>
                 </div>
                 <pre className="text-gray-200 text-base whitespace-pre-wrap break-words font-sans">{generatedScript.sora_prompt_en}</pre>
               </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

const QuoteLine = ({ label, text, isEnglish }) => (
  <div className="border-l-4 border-indigo-500 pl-4">
    <p className="text-xs font-semibold text-gray-400">{label}</p>
    <p className={`text-lg text-white ${isEnglish ? 'font-serif italic' : 'font-medium'}`}>{text}</p>
  </div>
);

// 樣式
const style = document.createElement('style');
style.innerHTML = `@keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } } .animate-fadeIn { animation: fadeIn 0.5s ease-out forwards; }`;
document.head.appendChild(style);