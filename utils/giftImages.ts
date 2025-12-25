export const getGiftImage = (name: string = ""): string | null => {
  const lowerName = name.toLowerCase();

  const giftMap: Record<string, string> = {
    // Electronics
    "iphone": "https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?w=600&auto=format&fit=crop&q=80",
    "phone": "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=600&auto=format&fit=crop&q=80",
    "mobile": "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=600&auto=format&fit=crop&q=80",
    "laptop": "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=600&auto=format&fit=crop&q=80",
    "macbook": "https://images.unsplash.com/photo-1517336714731-489689fd1ca4?w=600&auto=format&fit=crop&q=80",
    "computer": "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=600&auto=format&fit=crop&q=80",
    "watch": "https://images.unsplash.com/photo-1524805444758-089113d48a6d?w=600&auto=format&fit=crop&q=80",
    "rolex": "https://images.unsplash.com/photo-1523170335258-f5ed11844a49?w=600&auto=format&fit=crop&q=80",
    "headphones": "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&auto=format&fit=crop&q=80",
    "camera": "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=600&auto=format&fit=crop&q=80",
    "console": "https://images.unsplash.com/photo-1605901309584-818e25960b8f?w=600&auto=format&fit=crop&q=80",
    "ps5": "https://images.unsplash.com/photo-1605901309584-818e25960b8f?w=600&auto=format&fit=crop&q=80",
    "tablet": "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=600&auto=format&fit=crop&q=80",
    "ipad": "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=600&auto=format&fit=crop&q=80",
    "radio": "https://images.unsplash.com/photo-1588665516999-563b71946399?w=600&auto=format&fit=crop&q=80",
    
    // Vehicles
    "car": "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=600&auto=format&fit=crop&q=80",
    "tesla": "https://images.unsplash.com/photo-1560958089-b8a1929cea89?w=600&auto=format&fit=crop&q=80",
    "ferrari": "https://images.unsplash.com/photo-1592198084033-aade902d1aae?w=600&auto=format&fit=crop&q=80",
    "truck": "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=600&auto=format&fit=crop&q=80",
    "bike": "https://images.unsplash.com/photo-1558981403-c5f9899a28bc?w=600&auto=format&fit=crop&q=80",
    
    // Luxury & Lifestyle
    "shoe": "https://images.unsplash.com/photo-1560769629-975ec94e6a86?w=600&auto=format&fit=crop&q=80",
    "sneaker": "https://images.unsplash.com/photo-1552346154-21d32810aba3?w=600&auto=format&fit=crop&q=80",
    "bag": "https://images.unsplash.com/photo-1590874103328-3607bac6a643?w=600&auto=format&fit=crop&q=80",
    "perfume": "https://images.unsplash.com/photo-1541643600914-78b084683601?w=600&auto=format&fit=crop&q=80",
    "guitar": "https://images.unsplash.com/photo-1516924962500-2b4b3b99ea02?w=600&auto=format&fit=crop&q=80",
    "money": "https://images.unsplash.com/photo-1559526324-593bc8142758?w=600&auto=format&fit=crop&q=80",
    
    // Inspiration / Advice
    "wisdom": "https://images.unsplash.com/photo-1518495973542-4542c06a5843?w=600&auto=format&fit=crop&q=80", // Light bulb / sun
    "advice": "https://images.unsplash.com/photo-1499209974431-9dddcece7f88?w=600&auto=format&fit=crop&q=80", // Peaceful morning
    "goal": "https://images.unsplash.com/photo-1506784365847-bbad939e9335?w=600&auto=format&fit=crop&q=80", // Mountains
    "dream": "https://images.unsplash.com/photo-1496337589254-7e19d01cec44?w=600&auto=format&fit=crop&q=80", // Stars
    "serenity": "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&auto=format&fit=crop&q=80", // Ocean
    "hope": "https://images.unsplash.com/photo-1501004318641-b39e6451bec6?w=600&auto=format&fit=crop&q=80", // Plants
  };

  // Check for keywords
  for (const key in giftMap) {
    if (lowerName.includes(key)) {
      return giftMap[key];
    }
  }

  // Fallback (A generic beautiful gift box)
  return "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=600&auto=format&fit=crop&q=80";
};