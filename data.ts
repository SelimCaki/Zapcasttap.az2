export interface Offer {
  id: string;
  title: string;
  price: string;
  location: string;
  image: string;
  date: string;
  category: string;
}

export interface Brand {
  id: string;
  name: string;
  logo: string;
}

export const brands: Brand[] = [
  { id: "1", name: "Toyota", logo: "/to_logo.png" },
  { id: "2", name: "Mercedes", logo: "/mb_logo.png" },
  { id: "3", name: "BMW", logo: "/bmw_logo.png" },
  { id: "4", name: "Hyundai", logo: "/hyu_logo.png" },
  { id: "5", name: "Kia", logo: "/kia_logo.png" },
  { id: "6", name: "Lada (VAZ)", logo: "/lada_logo.png" },
  { id: "7", name: "Nissan", logo: "/nissan_logo.png" },
  { id: "8", name: "Chevrolet", logo: "/chevrolet_logo.png" },
  { id: "9", name: "Opel", logo: "/opel_logo.png" },
  { id: "10", name: "Ford", logo: "/ford_logo.png" },
  { id: "11", name: "Volkswagen", logo: "/vw_logo.png" },
  { id: "12", name: "Lexus", logo: "/lexus_logo.png" },
  { id: "13", name: "Mitsubishi", logo: "/mitsubishi_logo.png" },
  { id: "14", name: "Mazda", logo: "/mazda_logo.png" },
  { id: "15", name: "Land Rover", logo: "/landrover_logo.png" }
];

export const myBrands = brands;

export const offers: Offer[] = [
  {
    id: "1",
    title: "Mühərrik yastığı (Paduşka)",
    price: "45 AZN",
    location: "Bakı",
    image: "https://images.unsplash.com/photo-1486006920555-c77dce18193b?w=500&auto=format&fit=crop&q=60",
    date: "Bu gün",
    category: "Ehtiyat hissələri"
  },
  {
    id: "2",
    title: "Ön əyləc bəndi (Naklatka)",
    price: "60 AZN",
    location: "Sumqayıt",
    image: "https://images.unsplash.com/photo-1558981806-ec527fa84c39?w=500&auto=format&fit=crop&q=60",
    date: "Dünən",
    category: "Əyləc sistemi"
  }
];

export const activeRequest = {
  id: "req-1",
  partName: "Toyota Prius 30 kuza ön amortizator",
  status: "Axtarılır",
  date: "2026-10-01"
};

export const initialMessages = [
  { id: "1", sender: "system", text: "ZapçastTap-a xoş gəlmisiniz! Ehtiyat hissəsi axtarışınızı buradan edə bilərsiniz." }
];

export const driverRequests = [
  { id: "d1", title: "Şəhərdaxili ehtiyat hissəsi çatdırılması", distance: "3 km", price: "10 AZN" }
];

export const conditions = [
  "Yeni",
  "İşlənmiş (Orijinal)",
  "Üstdən çıxma (Dublikat)"
];

export const recentRequests = [
  "BMW E46 fara",
  "Kia Optima radiator",
  "Hyundai Elantra suspenziya dəsti"
];
