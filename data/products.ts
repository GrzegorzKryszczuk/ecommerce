export interface Product {
  id: number;
  code: string;
  name: string;
  category: string;
  nettoPrice: number;
  bruttoPrice: number;
  description: string;
  unit: string;
  stock: number;
}

const VAT = 1.23;
function b(netto: number): number {
  return Math.round(netto * VAT * 100) / 100;
}

export const NAV_CATEGORIES = ["Windy dekarskie", "Wciągarki", "Narzędzia", "Zaginarki"];

export const PRODUCTS: Product[] = [
  // ── Windy dekarskie ─────────────────────────────────────────────────────────
  { id: 1,  code: "WD-001", name: "Winda dekarska 200 kg / 10 m",           category: "Windy dekarskie", nettoPrice: 2890,   bruttoPrice: b(2890),   description: "Elektryczna winda budowlana na dach, udźwig 200 kg, skok 10 m, 230V.", unit: "szt", stock: 8 },
  { id: 2,  code: "WD-002", name: "Winda dekarska 200 kg / 15 m",           category: "Windy dekarskie", nettoPrice: 3490,   bruttoPrice: b(3490),   description: "Elektryczna winda dekarska, udźwig 200 kg, skok 15 m, lina stalowa.", unit: "szt", stock: 6 },
  { id: 3,  code: "WD-003", name: "Winda dekarska 300 kg / 10 m",           category: "Windy dekarskie", nettoPrice: 3990,   bruttoPrice: b(3990),   description: "Winda budowlana 300 kg, wysuwana szyna aluminiowa 10 m, 400V.", unit: "szt", stock: 5 },
  { id: 4,  code: "WD-004", name: "Winda dekarska 300 kg / 20 m",           category: "Windy dekarskie", nettoPrice: 4990,   bruttoPrice: b(4990),   description: "Profesjonalna winda dekarska 300 kg, skok 20 m, pilot zdalny.", unit: "szt", stock: 4 },
  { id: 5,  code: "WD-005", name: "Winda dekarska 500 kg / 15 m",           category: "Windy dekarskie", nettoPrice: 6490,   bruttoPrice: b(6490),   description: "Ciężka winda budowlana 500 kg, skok 15 m, hamulec elektromagnetyczny.", unit: "szt", stock: 3 },
  { id: 6,  code: "WD-006", name: "Winda dekarska aluminiowa 150 kg / 8 m", category: "Windy dekarskie", nettoPrice: 2290,   bruttoPrice: b(2290),   description: "Lekka winda na dach, profil aluminiowy, 150 kg, skok 8 m.", unit: "szt", stock: 10 },
  { id: 7,  code: "WD-007", name: "Szyna przedłużająca 5 m do windy",       category: "Windy dekarskie", nettoPrice: 490,    bruttoPrice: b(490),    description: "Przedłużenie szyny aluminiowej 5 m, pasuje do serii WD.", unit: "szt", stock: 20 },
  { id: 8,  code: "WD-008", name: "Wózek transportowy do windy dekarskiej", category: "Windy dekarskie", nettoPrice: 390,    bruttoPrice: b(390),    description: "Wózek ładunkowy stalowy, szerokość 40 cm, antypoślizgowy.", unit: "szt", stock: 15 },
  { id: 9,  code: "WD-009", name: "Lina stalowa 6 mm / 20 m do windy",     category: "Windy dekarskie", nettoPrice: 189,    bruttoPrice: b(189),    description: "Lina stalowa ocynkowana 6 mm × 20 m z zaciskami.", unit: "szt", stock: 30 },
  { id: 10, code: "WD-010", name: "Lina stalowa 8 mm / 25 m do windy",     category: "Windy dekarskie", nettoPrice: 269,    bruttoPrice: b(269),    description: "Lina stalowa ocynkowana 8 mm × 25 m, wzmocniony rdzeń.", unit: "szt", stock: 20 },
  { id: 11, code: "WD-011", name: "Podstawa stojaka windy 200 kg",         category: "Windy dekarskie", nettoPrice: 699,    bruttoPrice: b(699),    description: "Regulowana podstawa stojaka do wind dekarskich 200–300 kg.", unit: "szt", stock: 12 },
  { id: 12, code: "WD-012", name: "Silnik elektryczny 0.75 kW do windy",   category: "Windy dekarskie", nettoPrice: 890,    bruttoPrice: b(890),    description: "Silnik wymienny 0.75 kW / 230V do wind serii WD-001/002.", unit: "szt", stock: 8 },
  { id: 13, code: "WD-013", name: "Silnik elektryczny 1.5 kW do windy",    category: "Windy dekarskie", nettoPrice: 1190,   bruttoPrice: b(1190),   description: "Silnik wymienny 1.5 kW / 400V do wind serii WD-003/004/005.", unit: "szt", stock: 6 },
  { id: 14, code: "WD-014", name: "Panel sterowania z pilotem do windy",   category: "Windy dekarskie", nettoPrice: 340,    bruttoPrice: b(340),    description: "Panel sterowania 230V z pilotem bezprzewodowym 20 m.", unit: "szt", stock: 18 },
  { id: 15, code: "WD-015", name: "Wspornik ścienny regulowany do windy",  category: "Windy dekarskie", nettoPrice: 220,    bruttoPrice: b(220),    description: "Stalowy wspornik montażowy regulowany, kąt 15–45°.", unit: "szt", stock: 25 },
  { id: 16, code: "WD-016", name: "Winda dekarska z platformą roboczą",    category: "Windy dekarskie", nettoPrice: 5490,   bruttoPrice: b(5490),   description: "Winda 200 kg z platformą roboczą 60×80 cm, barierki zabezpieczające.", unit: "szt", stock: 3 },
  { id: 17, code: "WD-017", name: "Zestaw serwisowy do windy dekarskiej",  category: "Windy dekarskie", nettoPrice: 280,    bruttoPrice: b(280),    description: "Komplet części eksploatacyjnych: rolki, sworznie, śruby.", unit: "kpl", stock: 20 },
  { id: 18, code: "WD-018", name: "Winda dekarska 200 kg / 12 m dwuszybowa", category: "Windy dekarskie", nettoPrice: 3190,   bruttoPrice: b(3190),   description: "Winda dwuszynowa 200 kg, skok 12 m, szerszа platforma transportowa.", unit: "szt", stock: 5 },
  { id: 19, code: "WD-019", name: "Skrzynka transportowa na winde",        category: "Windy dekarskie", nettoPrice: 320,    bruttoPrice: b(320),    description: "Stalowa skrzynka transportowa na części windy, zamykana.", unit: "szt", stock: 10 },
  { id: 20, code: "WD-020", name: "Zaczep hak ładunkowy do windy 500 kg",  category: "Windy dekarskie", nettoPrice: 160,    bruttoPrice: b(160),    description: "Hak ładunkowy stalowy ocynkowany, certyfikat 500 kg.", unit: "szt", stock: 35 },
  { id: 21, code: "WD-021", name: "Winda dekarska 100 kg / 6 m kompaktowa", category: "Windy dekarskie", nettoPrice: 1890,   bruttoPrice: b(1890),   description: "Kompaktowa winda budowlana 100 kg, skok 6 m, waga własna 28 kg.", unit: "szt", stock: 12 },
  { id: 22, code: "WD-022", name: "Siatka zabezpieczająca ładunek 80×60 cm", category: "Windy dekarskie", nettoPrice: 89,     bruttoPrice: b(89),     description: "Siatka elastyczna do zabezpieczenia ładunku na platformie windy.", unit: "szt", stock: 40 },
  { id: 23, code: "WD-023", name: "Winda dekarska 400 kg / 18 m",          category: "Windy dekarskie", nettoPrice: 5990,   bruttoPrice: b(5990),   description: "Winda 400 kg, skok 18 m, podwójna szyna, czujnik przeciążenia.", unit: "szt", stock: 3 },
  { id: 24, code: "WD-024", name: "Przyłącze elektryczne 16A/400V do windy", category: "Windy dekarskie", nettoPrice: 120,    bruttoPrice: b(120),    description: "Gniazdo przyłączeniowe 400V/16A IP44 z przewodem 5 m.", unit: "szt", stock: 25 },
  { id: 25, code: "WD-025", name: "Instrukcja montażu PL + certyfikat CE", category: "Windy dekarskie", nettoPrice: 49,     bruttoPrice: b(49),     description: "Dokumentacja techniczna PL, deklaracja zgodności CE dla serii WD.", unit: "kpl", stock: 50 },

  // ── Wciągarki ────────────────────────────────────────────────────────────────
  { id: 26, code: "WC-001", name: "Wciągarka łańcuchowa 1000 kg",           category: "Wciągarki", nettoPrice: 390,    bruttoPrice: b(390),    description: "Ręczna wciągarka łańcuchowa 1000 kg, łańcuch roboczy 3 m.", unit: "szt", stock: 20 },
  { id: 27, code: "WC-002", name: "Wciągarka łańcuchowa 2000 kg",           category: "Wciągarki", nettoPrice: 590,    bruttoPrice: b(590),    description: "Ręczna wciągarka łańcuchowa 2000 kg, łańcuch 3 m, hak dolny.", unit: "szt", stock: 15 },
  { id: 28, code: "WC-003", name: "Wciągarka łańcuchowa 3000 kg",           category: "Wciągarki", nettoPrice: 890,    bruttoPrice: b(890),    description: "Ręczna wciągarka łańcuchowa 3000 kg, łańcuch 3 m, VB-klasa.", unit: "szt", stock: 10 },
  { id: 29, code: "WC-004", name: "Wciągarka łańcuchowa 5000 kg",           category: "Wciągarki", nettoPrice: 1390,   bruttoPrice: b(1390),   description: "Ręczna wciągarka 5000 kg, podwójny łańcuch, hak obrotowy.", unit: "szt", stock: 8 },
  { id: 30, code: "WC-005", name: "Wciągarka elektryczna 500 kg / 230V",    category: "Wciągarki", nettoPrice: 890,    bruttoPrice: b(890),    description: "Elektryczna wciągarka linowa 500 kg, 230V, lina 12 m.", unit: "szt", stock: 15 },
  { id: 31, code: "WC-006", name: "Wciągarka elektryczna 1000 kg / 230V",   category: "Wciągarki", nettoPrice: 1290,   bruttoPrice: b(1290),   description: "Elektryczna wciągarka linowa 1000 kg, 230V, lina 20 m, hamulec.", unit: "szt", stock: 12 },
  { id: 32, code: "WC-007", name: "Wciągarka elektryczna 2000 kg / 400V",   category: "Wciągarki", nettoPrice: 2190,   bruttoPrice: b(2190),   description: "Elektryczna wciągarka 2000 kg, 400V, lina stalowa 20 m.", unit: "szt", stock: 8 },
  { id: 33, code: "WC-008", name: "Wciągarka linowa ręczna 800 kg / 20 m",  category: "Wciągarki", nettoPrice: 490,    bruttoPrice: b(490),    description: "Ręczna wciągarka linowa 800 kg, lina stalowa 20 m, blokada.", unit: "szt", stock: 18 },
  { id: 34, code: "WC-009", name: "Wciągarka linowa ręczna 2000 kg / 30 m", category: "Wciągarki", nettoPrice: 890,    bruttoPrice: b(890),    description: "Ręczna wciągarka linowa 2000 kg, lina stalowa 30 m.", unit: "szt", stock: 10 },
  { id: 35, code: "WC-010", name: "Wciągarka przesuwna 1000 kg",            category: "Wciągarki", nettoPrice: 490,    bruttoPrice: b(490),    description: "Wózek przesuwny 1000 kg do belek dwuteowych IPE/HEB.", unit: "szt", stock: 20 },
  { id: 36, code: "WC-011", name: "Wciągarka przesuwna 2000 kg",            category: "Wciągarki", nettoPrice: 790,    bruttoPrice: b(790),    description: "Wózek przesuwny 2000 kg, belki IPE 100–300.", unit: "szt", stock: 15 },
  { id: 37, code: "WC-012", name: "Belka podnosząca stalowa 1000 kg / 2 m", category: "Wciągarki", nettoPrice: 690,    bruttoPrice: b(690),    description: "Belka podnosząca z regulacją rozstawu haków 0.4–2.0 m, 1000 kg.", unit: "szt", stock: 10 },
  { id: 38, code: "WC-013", name: "Łańcuch roboczy 6 mm / 3 m (kl.80)",    category: "Wciągarki", nettoPrice: 89,     bruttoPrice: b(89),     description: "Łańcuch kalibrowany klasy 80, 6 mm × 3 m, z ogniwem.", unit: "szt", stock: 50 },
  { id: 39, code: "WC-014", name: "Łańcuch roboczy 8 mm / 3 m (kl.80)",    category: "Wciągarki", nettoPrice: 139,    bruttoPrice: b(139),    description: "Łańcuch kalibrowany klasy 80, 8 mm × 3 m.", unit: "szt", stock: 40 },
  { id: 40, code: "WC-015", name: "Hak obrotowy ocynkowany 500 kg",         category: "Wciągarki", nettoPrice: 49,     bruttoPrice: b(49),     description: "Hak stalowy ocynkowany z zabezpieczeniem, nośność 500 kg.", unit: "szt", stock: 60 },
  { id: 41, code: "WC-016", name: "Hak obrotowy ocynkowany 1000 kg",        category: "Wciągarki", nettoPrice: 89,     bruttoPrice: b(89),     description: "Hak stalowy ocynkowany z zabezpieczeniem, nośność 1000 kg.", unit: "szt", stock: 50 },
  { id: 42, code: "WC-017", name: "Wciągarka elektryczna dźwigowa 500 kg",  category: "Wciągarki", nettoPrice: 1890,   bruttoPrice: b(1890),   description: "Wciągarka dźwigowa łańcuchowa 500 kg, IP54, klasa H3.", unit: "szt", stock: 6 },
  { id: 43, code: "WC-018", name: "Wciągarka elektryczna dźwigowa 1000 kg", category: "Wciągarki", nettoPrice: 2490,   bruttoPrice: b(2490),   description: "Wciągarka dźwigowa łańcuchowa 1000 kg, IP54, 400V.", unit: "szt", stock: 5 },
  { id: 44, code: "WC-019", name: "Wciągarka elektryczna dźwigowa 2000 kg", category: "Wciągarki", nettoPrice: 3490,   bruttoPrice: b(3490),   description: "Wciągarka dźwigowa łańcuchowa 2000 kg, IP54, 400V, H4.", unit: "szt", stock: 4 },
  { id: 45, code: "WC-020", name: "Przedłużenie łańcucha 3 m kl.80 8 mm",  category: "Wciągarki", nettoPrice: 120,    bruttoPrice: b(120),    description: "Przedłużenie łańcucha roboczego 8 mm × 3 m, klasa 80.", unit: "szt", stock: 30 },
  { id: 46, code: "WC-021", name: "Zawiesia łańcuchowe 2-cięgłowe 2×1m kl.80 8mm", category: "Wciągarki", nettoPrice: 290,    bruttoPrice: b(290),    description: "Zawiesie 2-cięgłowe łańcuch 8 mm × 1 m, nośność 2×0.5 t.", unit: "kpl", stock: 20 },
  { id: 47, code: "WC-022", name: "Zawiesia łańcuchowe 4-cięgłowe 4×1m kl.80", category: "Wciągarki", nettoPrice: 590,    bruttoPrice: b(590),    description: "Zawiesie 4-cięgłowe łańcuch 8 mm × 1 m, nośność 4×0.5 t.", unit: "kpl", stock: 12 },
  { id: 48, code: "WC-023", name: "Taśmowe zawiesie 2 t / 2 m",            category: "Wciągarki", nettoPrice: 89,     bruttoPrice: b(89),     description: "Zawiesie pasowe nylonowe 2 t × 2 m, szer. 60 mm.", unit: "szt", stock: 35 },
  { id: 49, code: "WC-024", name: "Klamra łańcuchowa Sackboy 6 mm",         category: "Wciągarki", nettoPrice: 35,     bruttoPrice: b(35),     description: "Klamra stalowa ocynkowana do łańcucha 6 mm.", unit: "szt", stock: 80 },
  { id: 50, code: "WC-025", name: "Szekla śrubowa 2 t ocynkowana",          category: "Wciągarki", nettoPrice: 29,     bruttoPrice: b(29),     description: "Szekla śrubowa stalowa ocynkowana, nośność 2 t.", unit: "szt", stock: 100 },

  // ── Narzędzia ────────────────────────────────────────────────────────────────
  { id: 51, code: "NA-001", name: "Klucz udarowy elektryczny 1/2\" 600 Nm",  category: "Narzędzia", nettoPrice: 690,    bruttoPrice: b(690),    description: "Klucz udarowy elektryczny 1/2\", moment 600 Nm, walizka.", unit: "szt", stock: 15 },
  { id: 52, code: "NA-002", name: "Klucz udarowy akumulatorowy 18V 800 Nm", category: "Narzędzia", nettoPrice: 1290,   bruttoPrice: b(1290),   description: "Klucz udarowy 18V, moment 800 Nm, 2× akumulator 5 Ah.", unit: "szt", stock: 10 },
  { id: 53, code: "NA-003", name: "Wiertarko-wkrętarka udarowa 18V",        category: "Narzędzia", nettoPrice: 590,    bruttoPrice: b(590),    description: "Wiertarko-wkrętarka akumulatorowa 18V, 2× aku 4 Ah, ładowarka.", unit: "szt", stock: 20 },
  { id: 54, code: "NA-004", name: "Szlifierka kątowa 125 mm 1400W",         category: "Narzędzia", nettoPrice: 290,    bruttoPrice: b(290),    description: "Szlifierka kątowa 125 mm, moc 1400W, blokada wrzeciona.", unit: "szt", stock: 25 },
  { id: 55, code: "NA-005", name: "Szlifierka kątowa 230 mm 2400W",         category: "Narzędzia", nettoPrice: 490,    bruttoPrice: b(490),    description: "Szlifierka kątowa 230 mm, moc 2400W, regulacja prędkości.", unit: "szt", stock: 15 },
  { id: 56, code: "NA-006", name: "Młot udarowo-obrotowy SDS-Plus 800W",    category: "Narzędzia", nettoPrice: 490,    bruttoPrice: b(490),    description: "Młot udarowo-obrotowy SDS-Plus, 800W, udźwig 3 J, 3 tryby.", unit: "szt", stock: 18 },
  { id: 57, code: "NA-007", name: "Młot burzący SDS-Max 1500W 12 J",        category: "Narzędzia", nettoPrice: 1190,   bruttoPrice: b(1190),   description: "Młot burzący SDS-Max 1500W, energia 12 J, antywibracja.", unit: "szt", stock: 8 },
  { id: 58, code: "NA-008", name: "Przecinarka do metalu 355 mm 2200W",     category: "Narzędzia", nettoPrice: 690,    bruttoPrice: b(690),    description: "Przecinarka tarczowa do metalu, tarcza 355 mm, moc 2200W.", unit: "szt", stock: 10 },
  { id: 59, code: "NA-009", name: "Pilarka tarczowa 190 mm 1800W",          category: "Narzędzia", nettoPrice: 490,    bruttoPrice: b(490),    description: "Pilarka ręczna tarczowa 190 mm, moc 1800W, prowadnica.", unit: "szt", stock: 12 },
  { id: 60, code: "NA-010", name: "Pilarka szablasta (sabre saw) 1100W",    category: "Narzędzia", nettoPrice: 390,    bruttoPrice: b(390),    description: "Pilarka szablasta 1100W, skok 28 mm, regulacja prędkości.", unit: "szt", stock: 15 },
  { id: 61, code: "NA-011", name: "Spawarka inwertorowa MMA 200A",           category: "Narzędzia", nettoPrice: 790,    bruttoPrice: b(790),    description: "Spawarka inwertorowa MMA 200A, zakres 20–200A, IP21.", unit: "szt", stock: 12 },
  { id: 62, code: "NA-012", name: "Spawarka MIG/MAG 200A",                   category: "Narzędzia", nettoPrice: 1890,   bruttoPrice: b(1890),   description: "Spawarka MIG/MAG 200A, bez gazu i z gazem, drut 0.6–0.9 mm.", unit: "szt", stock: 8 },
  { id: 63, code: "NA-013", name: "Nitownica akumulatorowa 18V",             category: "Narzędzia", nettoPrice: 890,    bruttoPrice: b(890),    description: "Nitownica akumulatorowa 18V, nity 3.2–6.4 mm, 2× aku.", unit: "szt", stock: 10 },
  { id: 64, code: "NA-014", name: "Nożyce do blachy elektryczne 1.8 mm",    category: "Narzędzia", nettoPrice: 590,    bruttoPrice: b(590),    description: "Nożyce elektryczne do blachy 1.8 mm, moc 550W, obustronny cięcia.", unit: "szt", stock: 12 },
  { id: 65, code: "NA-015", name: "Nożyce do blachy akumulatorowe 18V",     category: "Narzędzia", nettoPrice: 890,    bruttoPrice: b(890),    description: "Nożyce akumulatorowe 18V, blacha do 1.6 mm, 2× aku 2 Ah.", unit: "szt", stock: 8 },
  { id: 66, code: "NA-016", name: "Zestaw kluczy płasko-oczkowych 6–32 mm", category: "Narzędzia", nettoPrice: 290,    bruttoPrice: b(290),    description: "Komplet 15 kluczy płasko-oczkowych 6–32 mm, chromowo-wanadowych.", unit: "kpl", stock: 30 },
  { id: 67, code: "NA-017", name: "Zestaw grzechotkowy 1/4\" i 1/2\" 108 el.", category: "Narzędzia", nettoPrice: 490,    bruttoPrice: b(490),    description: "Komplet grzechotkowy w walizce, 108 elementów, 1/4\" i 1/2\".", unit: "kpl", stock: 20 },
  { id: 68, code: "NA-018", name: "Poziomnica laserowa krzyżowa 15 m",      category: "Narzędzia", nettoPrice: 490,    bruttoPrice: b(490),    description: "Poziomica laserowa 2D, zasięg 15 m, samopoziomowanie ±4°.", unit: "szt", stock: 15 },
  { id: 69, code: "NA-019", name: "Poziomnica laserowa 360° 30 m",          category: "Narzędzia", nettoPrice: 990,    bruttoPrice: b(990),    description: "Laser obrotowy 360°, zasięg 30 m, statyw, odbiornik.", unit: "szt", stock: 8 },
  { id: 70, code: "NA-020", name: "Miara laserowa 60 m Bluetooth",          category: "Narzędzia", nettoPrice: 290,    bruttoPrice: b(290),    description: "Dalmierz laserowy 60 m, Bluetooth, pamięć 30 pomiarów.", unit: "szt", stock: 20 },
  { id: 71, code: "NA-021", name: "Wkrętarka do blach akumulatorowa 18V",   category: "Narzędzia", nettoPrice: 590,    bruttoPrice: b(590),    description: "Wkrętarka do blach trapezowych 18V, głębokość, 2× aku.", unit: "szt", stock: 12 },
  { id: 72, code: "NA-022", name: "Pistol do silikonu akumulatorowy 18V",   category: "Narzędzia", nettoPrice: 290,    bruttoPrice: b(290),    description: "Akumulatorowy pistolet do silikonu 18V, wkład 310 ml.", unit: "szt", stock: 15 },
  { id: 73, code: "NA-023", name: "Kompresor przenośny 24L 1.5 kW 8 bar",   category: "Narzędzia", nettoPrice: 890,    bruttoPrice: b(890),    description: "Kompresor tłokowy bezolejowy 24L, 1.5 kW, 8 bar, 200 L/min.", unit: "szt", stock: 8 },
  { id: 74, code: "NA-024", name: "Kompresor warsztatowy 50L 2.2 kW 10 bar", category: "Narzędzia", nettoPrice: 1490,   bruttoPrice: b(1490),   description: "Kompresor olejowy 50L, 2.2 kW, 10 bar, 320 L/min.", unit: "szt", stock: 5 },
  { id: 75, code: "NA-025", name: "Pneumatyczny klucz udarowy 1/2\" 1500 Nm", category: "Narzędzia", nettoPrice: 390,    bruttoPrice: b(390),    description: "Klucz pneumatyczny 1/2\", moment max 1500 Nm, złącze 1/4\".", unit: "szt", stock: 15 },

  // ── Zaginarki ────────────────────────────────────────────────────────────────
  { id: 76, code: "ZG-001", name: "Zaginarka ręczna do blachy 1250 mm / 1 mm",  category: "Zaginarki", nettoPrice: 890,    bruttoPrice: b(890),    description: "Ręczna zaginarka listwowa do blachy, dł. 1250 mm, grubość do 1 mm.", unit: "szt", stock: 10 },
  { id: 77, code: "ZG-002", name: "Zaginarka ręczna do blachy 1250 mm / 1.5 mm", category: "Zaginarki", nettoPrice: 1190,   bruttoPrice: b(1190),   description: "Ręczna zaginarka listwowa 1250 mm, blacha do 1.5 mm, kąt 135°.", unit: "szt", stock: 8 },
  { id: 78, code: "ZG-003", name: "Zaginarka ręczna do blachy 2000 mm / 1 mm",  category: "Zaginarki", nettoPrice: 1490,   bruttoPrice: b(1490),   description: "Ręczna zaginarka listwowa 2000 mm, blacha do 1 mm.", unit: "szt", stock: 6 },
  { id: 79, code: "ZG-004", name: "Zaginarka ręczna do blachy 2500 mm / 1.5 mm", category: "Zaginarki", nettoPrice: 2190,   bruttoPrice: b(2190),   description: "Ręczna zaginarka 2500 mm, do blachy ocynkowanej 1.5 mm.", unit: "szt", stock: 5 },
  { id: 80, code: "ZG-005", name: "Zaginarka elektryczna CNC 1250 mm / 2 mm",   category: "Zaginarki", nettoPrice: 8900,   bruttoPrice: b(8900),   description: "Elektryczna zaginarka CNC 1250 mm, blacha do 2 mm, 4 kW.", unit: "szt", stock: 3 },
  { id: 81, code: "ZG-006", name: "Zaginarka elektryczna CNC 2000 mm / 2 mm",   category: "Zaginarki", nettoPrice: 12900,  bruttoPrice: b(12900),  description: "Elektryczna zaginarka CNC 2000 mm, blacha do 2 mm, 5.5 kW.", unit: "szt", stock: 2 },
  { id: 82, code: "ZG-007", name: "Zaginarka elektryczna CNC 3000 mm / 3 mm",   category: "Zaginarki", nettoPrice: 19900,  bruttoPrice: b(19900),  description: "Elektryczna zaginarka CNC 3000 mm, blacha do 3 mm, 7.5 kW.", unit: "szt", stock: 2 },
  { id: 83, code: "ZG-008", name: "Zaginarka ręczna przelotowa 1000 mm",        category: "Zaginarki", nettoPrice: 790,    bruttoPrice: b(790),    description: "Zaginarka przelotowa (box-and-pan) 1000 mm, palce 50–200 mm.", unit: "szt", stock: 8 },
  { id: 84, code: "ZG-009", name: "Zaginarka hydrauliczna prasowa 2000 mm 40T", category: "Zaginarki", nettoPrice: 14900,  bruttoPrice: b(14900),  description: "Prasa krawędziowa hydrauliczna 40T, długość gięcia 2000 mm.", unit: "szt", stock: 2 },
  { id: 85, code: "ZG-010", name: "Zaginarka hydrauliczna prasowa 3000 mm 80T", category: "Zaginarki", nettoPrice: 24900,  bruttoPrice: b(24900),  description: "Prasa krawędziowa hydrauliczna 80T, długość gięcia 3000 mm.", unit: "szt", stock: 1 },
  { id: 86, code: "ZG-011", name: "Listwa gięca wymienna 1250 mm stl.",         category: "Zaginarki", nettoPrice: 290,    bruttoPrice: b(290),    description: "Wymienna listwa gięca hartowana, 1250 mm, pas. do serii ZG-001/002.", unit: "szt", stock: 20 },
  { id: 87, code: "ZG-012", name: "Listwa gięca wymienna 2000 mm stl.",         category: "Zaginarki", nettoPrice: 390,    bruttoPrice: b(390),    description: "Wymienna listwa gięca hartowana, 2000 mm, pas. do serii ZG-003.", unit: "szt", stock: 15 },
  { id: 88, code: "ZG-013", name: "Kątomierz cyfrowy do zaginarki",             category: "Zaginarki", nettoPrice: 390,    bruttoPrice: b(390),    description: "Cyfrowy kątomierz do kontroli kąta gięcia, zakres 0–360°.", unit: "szt", stock: 18 },
  { id: 89, code: "ZG-014", name: "Palce wymienne do zaginarki przelotowej",    category: "Zaginarki", nettoPrice: 290,    bruttoPrice: b(290),    description: "Zestaw 5 palców wymiennych do zaginarek przelotowych.", unit: "kpl", stock: 25 },
  { id: 90, code: "ZG-015", name: "Podpora blachy do zaginarki 2 m",            category: "Zaginarki", nettoPrice: 390,    bruttoPrice: b(390),    description: "Regulowana podpora blachy ze stali nierdzewnej, dł. 2 m.", unit: "szt", stock: 12 },
  { id: 91, code: "ZG-016", name: "Zaginarka ręczna do blachy 800 mm / 1 mm",  category: "Zaginarki", nettoPrice: 690,    bruttoPrice: b(690),    description: "Kompaktowa zaginarka listwowa 800 mm, blacha do 1 mm.", unit: "szt", stock: 12 },
  { id: 92, code: "ZG-017", name: "Stół roboczy do zaginarki 1250 mm",          category: "Zaginarki", nettoPrice: 590,    bruttoPrice: b(590),    description: "Stalowy stół roboczy z montażem zaginarki, nośność 80 kg.", unit: "szt", stock: 8 },
  { id: 93, code: "ZG-018", name: "Nóż do obcinania blachy 1250 mm",            category: "Zaginarki", nettoPrice: 390,    bruttoPrice: b(390),    description: "Ostrze tnące do zaginarki-gilotyny 1250 mm, st. narzędziowa.", unit: "szt", stock: 15 },
  { id: 94, code: "ZG-019", name: "Nóż do obcinania blachy 2000 mm",            category: "Zaginarki", nettoPrice: 590,    bruttoPrice: b(590),    description: "Ostrze tnące do zaginarki-gilotyny 2000 mm, st. narzędziowa.", unit: "szt", stock: 10 },
  { id: 95, code: "ZG-020", name: "Smar do listwy zaginarki (500 ml)",          category: "Zaginarki", nettoPrice: 49,     bruttoPrice: b(49),     description: "Smar do prowadnic i listew zaginaek, odporny na korozję.", unit: "szt", stock: 50 },
  { id: 96, code: "ZG-021", name: "Zaginarka ręczna 1500 mm / 2 mm blacha gal.", category: "Zaginarki", nettoPrice: 1890,   bruttoPrice: b(1890),   description: "Zaginarka do blachy galwanizowanej 1.5 mm, stalowa dł. 1500 mm.", unit: "szt", stock: 5 },
  { id: 97, code: "ZG-022", name: "Prowadnik kątowy magnetyczny do zaginarki",  category: "Zaginarki", nettoPrice: 129,    bruttoPrice: b(129),    description: "Magnetyczny prowadnik kątowy 45°/90°/135° do ustawiania blachy.", unit: "szt", stock: 30 },
  { id: 98, code: "ZG-023", name: "Zaginarka elektryczna do rur 3/4\" – 2\"",   category: "Zaginarki", nettoPrice: 3490,   bruttoPrice: b(3490),   description: "Elektryczna zaginarka do rur 3/4\"–2\", kąt gięcia do 180°.", unit: "szt", stock: 4 },
  { id: 99, code: "ZG-024", name: "Matryca gięca do rur 1\" do zaginarki",     category: "Zaginarki", nettoPrice: 190,    bruttoPrice: b(190),    description: "Matryca wymienna do rur 1\" pasująca do zaginarki ZG-023.", unit: "szt", stock: 20 },
  { id: 100, code: "ZG-025", name: "Zaginarka do profili aluminiowych 2000 mm", category: "Zaginarki", nettoPrice: 4990,   bruttoPrice: b(4990),   description: "Ręczna zaginarka do profili aluminiowych do 2 mm, dł. 2000 mm.", unit: "szt", stock: 3 },
];

export const CATEGORIES = NAV_CATEGORIES;
