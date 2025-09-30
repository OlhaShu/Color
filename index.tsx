import React, { useState, useEffect } from 'react';
import { Palette, Heart, Zap, Sun, Moon, Droplet, Wind, Cloud, Flame, Sparkles, Star, CloudRain, Coffee, Ghost, Smile, Frown, Angry, Meh, Music } from 'lucide-react';

const ColorHarmonyTrainer = () => {
  const [baseColor, setBaseColor] = useState('#FF6B6B');
  const [harmonyType, setHarmonyType] = useState('complementary');
  const [selectedEmotion, setSelectedEmotion] = useState('');
  const [hoveredColor, setHoveredColor] = useState(null);
  const [category, setCategory] = useState('emotions');

  const colorData = {
    emotions: [
      { name: 'Радість', color: '#FFD93D', icon: Sun, desc: 'Яскравість, оптимізм, щастя' },
      { name: 'Спокій', color: '#6BCB77', icon: Droplet, desc: 'Гармонія, баланс, умиротворення' },
      { name: 'Пристрасть', color: '#FF6B6B', icon: Heart, desc: 'Інтенсивність, любов, емоційність' },
      { name: 'Енергія', color: '#FF8C42', icon: Zap, desc: 'Динаміка, активність, рух' },
      { name: 'Таємниця', color: '#6C5CE7', icon: Moon, desc: 'Загадковість, глибина, інтрига' },
      { name: 'Меланхолія', color: '#4A5568', icon: CloudRain, desc: 'Сум, задумливість, ностальгія' },
      { name: 'Натхнення', color: '#FF69B4', icon: Sparkles, desc: 'Творчість, мрії, уява' },
      { name: 'Тривога', color: '#8B4513', icon: Frown, desc: 'Напруга, хвилювання, занепокоєння' },
    ],
    moods: [
      { name: 'Романтика', color: '#FFB6C1', icon: Heart, desc: 'М\'які рожеві відтінки, ніжність' },
      { name: 'Драма', color: '#8B0000', icon: Flame, desc: 'Темні червоні, напруга, конфлікт' },
      { name: 'Комедія', color: '#FFA500', icon: Smile, desc: 'Яскраві, веселі, життєрадісні тони' },
      { name: 'Трилер', color: '#1C1C1C', icon: Ghost, desc: 'Темні тони, напруга, саспенс' },
      { name: 'Фентезі', color: '#9370DB', icon: Star, desc: 'Магічні, казкові відтінки' },
      { name: 'Нуар', color: '#2F4F4F', icon: Cloud, desc: 'Сірі, чорні, приглушені тони' },
      { name: 'Вестерн', color: '#D2691E', icon: Coffee, desc: 'Земляні, пустельні кольори' },
      { name: 'Sci-Fi', color: '#00CED1', icon: Sparkles, desc: 'Неонові, футуристичні тони' },
    ],
    characters: [
      { name: 'Герой', color: '#4169E1', icon: Star, desc: 'Благородний синій, надійність' },
      { name: 'Лиходій', color: '#800080', icon: Angry, desc: 'Темний пурпур, владність' },
      { name: 'Наставник', color: '#2E8B57', icon: Coffee, desc: 'Мудрий зелений, досвід' },
      { name: 'Комік', color: '#FFD700', icon: Music, desc: 'Веселий жовтий, життєрадісність' },
      { name: 'Трагічний', color: '#483D8B', icon: Frown, desc: 'Глибокий синій, меланхолія' },
      { name: 'Загадковий', color: '#4B0082', icon: Moon, desc: 'Індиго, таємничість' },
      { name: 'Невинний', color: '#F0E68C', icon: Sun, desc: 'Світлий, чистий, наївність' },
      { name: 'Бунтар', color: '#DC143C', icon: Flame, desc: 'Червоний, пристрасть, непокора' },
    ]
  };

  const hslToHex = (h, s, l) => {
    l /= 100;
    const a = s * Math.min(l, 1 - l) / 100;
    const f = n => {
      const k = (n + h / 30) % 12;
      const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
      return Math.round(255 * color).toString(16).padStart(2, '0');
    };
    return `#${f(0)}${f(8)}${f(4)}`;
  };

  const hexToHSL = (hex) => {
    const r = parseInt(hex.slice(1, 3), 16) / 255;
    const g = parseInt(hex.slice(3, 5), 16) / 255;
    const b = parseInt(hex.slice(5, 7), 16) / 255;

    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    let h, s, l = (max + min) / 2;

    if (max === min) {
      h = s = 0;
    } else {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      switch (max) {
        case r: h = ((g - b) / d + (g < b ? 6 : 0)) / 6; break;
        case g: h = ((b - r) / d + 2) / 6; break;
        case b: h = ((r - g) / d + 4) / 6; break;
      }
    }

    return { h: h * 360, s: s * 100, l: l * 100 };
  };

  const getColorInfo = (hex) => {
    const { h, s, l } = hexToHSL(hex);
    const temp = h < 60 || h > 240 ? 'Теплий' : 'Холодний';
    const brightness = l > 50 ? 'Світлий' : 'Темний';
    const saturation = s > 60 ? 'Насичений' : s > 30 ? 'Помірний' : 'Приглушений';
    
    let mood = '';
    if (h >= 0 && h < 30) mood = 'Енергійний, пристрасний';
    else if (h >= 30 && h < 60) mood = 'Радісний, оптимістичний';
    else if (h >= 60 && h < 150) mood = 'Спокійний, природний';
    else if (h >= 150 && h < 210) mood = 'Свіжий, прохолодний';
    else if (h >= 210 && h < 270) mood = 'Довірливий, стабільний';
    else if (h >= 270 && h < 330) mood = 'Креативний, духовний';
    else mood = 'Палкий, сміливий';

    return { temp, brightness, saturation, mood, h: Math.round(h), s: Math.round(s), l: Math.round(l) };
  };

  const generateHarmony = (baseHex, type) => {
    const { h, s, l } = hexToHSL(baseHex);
    const colors = [baseHex];

    switch (type) {
      case 'complementary':
        colors.push(hslToHex((h + 180) % 360, s, l));
        break;
      case 'triadic':
        colors.push(hslToHex((h + 120) % 360, s, l));
        colors.push(hslToHex((h + 240) % 360, s, l));
        break;
      case 'analogous':
        colors.push(hslToHex((h + 30) % 360, s, l));
        colors.push(hslToHex((h - 30 + 360) % 360, s, l));
        break;
      case 'split-complementary':
        colors.push(hslToHex((h + 150) % 360, s, l));
        colors.push(hslToHex((h + 210) % 360, s, l));
        break;
      case 'tetradic':
        colors.push(hslToHex((h + 90) % 360, s, l));
        colors.push(hslToHex((h + 180) % 360, s, l));
        colors.push(hslToHex((h + 270) % 360, s, l));
        break;
      case 'monochromatic':
        colors.push(hslToHex(h, s, Math.min(l + 20, 90)));
        colors.push(hslToHex(h, s, Math.max(l - 20, 10)));
        break;
    }

    return colors;
  };

  const harmonies = generateHarmony(baseColor, harmonyType);

  const harmonyTypes = [
    { value: 'complementary', label: 'Комплементарна', desc: '2 протилежні кольори' },
    { value: 'analogous', label: 'Аналогова', desc: 'Сусідні кольори' },
    { value: 'triadic', label: 'Тріадична', desc: '3 рівновіддалені кольори' },
    { value: 'split-complementary', label: 'Розщеплена комплементарна', desc: 'База + 2 сусіди протилежного' },
    { value: 'tetradic', label: 'Тетрадична', desc: '4 кольори - 2 пари' },
    { value: 'monochromatic', label: 'Монохроматична', desc: 'Відтінки одного кольору' },
  ];

  const categories = [
    { value: 'emotions', label: 'Емоції' },
    { value: 'moods', label: 'Настрої в кіно' },
    { value: 'characters', label: 'Типи персонажів' },
  ];

  const currentData = colorData[category];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-3">
            <Palette className="w-10 h-10 text-purple-300" />
            <h1 className="text-4xl font-bold text-white">Тренажер колірних гармоній</h1>
          </div>
          <p className="text-purple-200">Досліджуйте емоції, настрої та персонажів через кольори</p>
        </div>

        {/* Категорії */}
        <div className="flex justify-center gap-3 mb-6">
          {categories.map((cat) => (
            <button
              key={cat.value}
              onClick={() => {
                setCategory(cat.value);
                setSelectedEmotion('');
              }}
              className={`px-6 py-3 rounded-xl font-semibold transition-all ${
                category === cat.value
                  ? 'bg-purple-500 text-white shadow-lg scale-105'
                  : 'bg-white/10 text-purple-200 hover:bg-white/20'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Емоції/Настрої/Персонажі */}
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 mb-6">
          <h2 className="text-xl font-semibold text-white mb-4">
            {category === 'emotions' && 'Оберіть емоцію'}
            {category === 'moods' && 'Оберіть настрій фільму'}
            {category === 'characters' && 'Оберіть тип персонажа'}
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {currentData.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.name}
                  onClick={() => {
                    setSelectedEmotion(item.name);
                    setBaseColor(item.color);
                  }}
                  className={`p-4 rounded-xl transition-all transform hover:scale-105 relative group ${
                    selectedEmotion === item.name
                      ? 'ring-4 ring-white scale-105'
                      : 'hover:ring-2 ring-white/50'
                  }`}
                  style={{ backgroundColor: item.color }}
                >
                  <Icon className="w-8 h-8 mx-auto mb-2 text-white drop-shadow-lg" />
                  <p className="font-semibold text-white drop-shadow">{item.name}</p>
                  <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-black/90 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-10">
                    {item.desc}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Базовий колір */}
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6">
            <h2 className="text-xl font-semibold text-white mb-4">Базовий колір</h2>
            <div 
              className="w-full h-48 rounded-xl mb-4 shadow-2xl cursor-pointer transition-transform hover:scale-105 relative group"
              style={{ backgroundColor: baseColor }}
              onClick={() => document.getElementById('colorPicker').click()}
              onMouseEnter={() => setHoveredColor(baseColor)}
              onMouseLeave={() => setHoveredColor(null)}
            >
              {hoveredColor === baseColor && (
                <div className="absolute inset-0 bg-black/80 rounded-xl p-4 text-white text-sm">
                  <p className="font-bold mb-2">Інформація про колір:</p>
                  <p>• {getColorInfo(baseColor).temp} тон</p>
                  <p>• {getColorInfo(baseColor).brightness}</p>
                  <p>• {getColorInfo(baseColor).saturation}</p>
                  <p>• Настрій: {getColorInfo(baseColor).mood}</p>
                  <p className="mt-2 font-mono text-xs">
                    HSL({getColorInfo(baseColor).h}°, {getColorInfo(baseColor).s}%, {getColorInfo(baseColor).l}%)
                  </p>
                </div>
              )}
            </div>
            <input
              id="colorPicker"
              type="color"
              value={baseColor}
              onChange={(e) => {
                setBaseColor(e.target.value);
                setSelectedEmotion('');
              }}
              className="w-full h-12 rounded-lg cursor-pointer"
            />
            <p className="text-center text-white font-mono mt-2 text-lg">{baseColor.toUpperCase()}</p>
          </div>

          {/* Тип гармонії */}
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6">
            <h2 className="text-xl font-semibold text-white mb-4">Тип гармонії</h2>
            <div className="space-y-2">
              {harmonyTypes.map((type) => (
                <button
                  key={type.value}
                  onClick={() => setHarmonyType(type.value)}
                  className={`w-full text-left p-3 rounded-lg transition-all ${
                    harmonyType === type.value
                      ? 'bg-purple-500 text-white shadow-lg scale-105'
                      : 'bg-white/5 text-purple-100 hover:bg-white/10'
                  }`}
                >
                  <div className="font-semibold">{type.label}</div>
                  <div className="text-sm opacity-80">{type.desc}</div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Результат гармонії */}
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 mt-6">
          <h2 className="text-xl font-semibold text-white mb-4">Гармонійна палітра</h2>
          <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
            {harmonies.map((color, idx) => {
              const info = getColorInfo(color);
              return (
                <div key={idx} className="group">
                  <div
                    className="h-32 rounded-xl shadow-xl cursor-pointer transition-transform hover:scale-110 relative overflow-hidden"
                    style={{ backgroundColor: color }}
                    onClick={() => {
                      navigator.clipboard.writeText(color);
                    }}
                    onMouseEnter={() => setHoveredColor(color)}
                    onMouseLeave={() => setHoveredColor(null)}
                  >
                    {hoveredColor === color && (
                      <div className="absolute inset-0 bg-black/90 p-2 text-white text-xs flex flex-col justify-center">
                        <p className="font-bold mb-1">Клікни - копіювати</p>
                        <p>• {info.temp}</p>
                        <p>• {info.saturation}</p>
                        <p>• {info.mood.split(',')[0]}</p>
                      </div>
                    )}
                  </div>
                  <p className="text-center text-white font-mono mt-2 text-sm">{color.toUpperCase()}</p>
                  {idx === 0 && <p className="text-center text-purple-300 text-xs mt-1">База</p>}
                </div>
              );
            })}
          </div>
        </div>

        {/* Демонстрація */}
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 mt-6">
          <h2 className="text-xl font-semibold text-white mb-4">Приклад використання в дизайні</h2>
          <div className="grid md:grid-cols-3 gap-4">
            {harmonies.slice(0, 3).map((color, idx) => (
              <div key={idx} className="rounded-xl overflow-hidden shadow-xl transform transition-transform hover:scale-105">
                <div className="h-32" style={{ backgroundColor: color }} />
                <div className="bg-white p-4">
                  <div className="h-3 rounded mb-2" style={{ backgroundColor: color, opacity: 0.7 }} />
                  <div className="h-3 rounded w-4/5 mb-2" style={{ backgroundColor: color, opacity: 0.5 }} />
                  <div className="h-3 rounded w-3/5" style={{ backgroundColor: color, opacity: 0.3 }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ColorHarmonyTrainer;