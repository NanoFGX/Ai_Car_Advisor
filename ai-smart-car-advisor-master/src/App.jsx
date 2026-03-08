import React, { useEffect, useMemo, useState } from "react";
import {
    AlertTriangle,
    ArrowRight,
    Car,
    CheckCircle2,
    ClipboardList,
    Landmark,
    MapPin,
    Sparkles,
    Star,
    TrendingUp,
    Wallet,
} from "lucide-react";

const BRANDS = ["Any", "Perodua", "Proton", "Toyota", "Honda", "Used Car"];
const STORAGE_KEY = "car-advisor-prototype";

const CAR_CATALOG = [
    // ── Perodua ───────────────────────────────────────────
    { name: "Perodua Axia",          brand: "Perodua",   type: "City Compact",          price: 38600,  tank: 35, details: { engine: "1.0L 3-cyl",      trans: "AMT",   fuel: "18.9 km/L", seats: 5 } },
    { name: "Perodua Bezza",         brand: "Perodua",   type: "Fuel Efficient Sedan",  price: 47200,  tank: 37, details: { engine: "1.0L 3-cyl",      trans: "CVT",   fuel: "20.6 km/L", seats: 5 } },
    { name: "Perodua Myvi",          brand: "Perodua",   type: "Reliable Hatchback",    price: 54200,  tank: 35, details: { engine: "1.3L 4-cyl",      trans: "CVT",   fuel: "17.4 km/L", seats: 5 } },
    { name: "Perodua Ativa",         brand: "Perodua",   type: "Compact SUV",           price: 62000,  tank: 37, details: { engine: "1.0L Turbo",      trans: "CVT",   fuel: "19.6 km/L", seats: 5 } },
    { name: "Perodua Alza",          brand: "Perodua",   type: "Family MPV",            price: 63000,  tank: 43, details: { engine: "1.5L 4-cyl",      trans: "CVT",   fuel: "17.9 km/L", seats: 7 } },
    { name: "Perodua Aruz",          brand: "Perodua",   type: "7-Seater SUV",          price: 74500,  tank: 47, details: { engine: "1.5L 4-cyl",      trans: "CVT",   fuel: "14.8 km/L", seats: 7 } },

    // ── Proton ────────────────────────────────────────────
    { name: "Proton Saga",           brand: "Proton",    type: "Budget Sedan",          price: 39800,  tank: 40, details: { engine: "1.3L 4-cyl",      trans: "CVT",   fuel: "16.5 km/L", seats: 5 } },
    { name: "Proton Iriz",           brand: "Proton",    type: "Urban Hatchback",       price: 42500,  tank: 40, details: { engine: "1.3L 4-cyl",      trans: "CVT",   fuel: "16.1 km/L", seats: 5 } },
    { name: "Proton Persona",        brand: "Proton",    type: "Value Sedan",           price: 49800,  tank: 40, details: { engine: "1.6L 4-cyl",      trans: "CVT",   fuel: "15.7 km/L", seats: 5 } },
    { name: "Proton Exora",          brand: "Proton",    type: "Family MPV",            price: 68800,  tank: 50, details: { engine: "1.6L Turbo",      trans: "CVT",   fuel: "13.2 km/L", seats: 7 } },
    { name: "Proton Ertiga",         brand: "Proton",    type: "7-Seater MPV",          price: 70800,  tank: 43, details: { engine: "1.5L 4-cyl",      trans: "4AT",   fuel: "14.9 km/L", seats: 7 } },
    { name: "Proton S70",            brand: "Proton",    type: "Premium Sedan",         price: 73800,  tank: 45, details: { engine: "1.5L Turbo",      trans: "7DCT",  fuel: "16.9 km/L", seats: 5 } },
    { name: "Proton X50",            brand: "Proton",    type: "Compact SUV",           price: 79200,  tank: 45, details: { engine: "1.5L Turbo",      trans: "7DCT",  fuel: "16.8 km/L", seats: 5 } },
    { name: "Proton X90",            brand: "Proton",    type: "3-Row Premium SUV",     price: 99800,  tank: 35, details: { engine: "1.5L Turbo PHEV", trans: "DHT",   fuel: "32.3 km/L", seats: 7 } },
    { name: "Proton X70",            brand: "Proton",    type: "Premium SUV",           price: 103800, tank: 48, details: { engine: "1.5L Turbo",      trans: "7DCT",  fuel: "14.9 km/L", seats: 5 } },

    // ── Toyota ────────────────────────────────────────────
    { name: "Toyota Avanza",         brand: "Toyota",    type: "7-Seater MPV",          price: 83880,  tank: 45, details: { engine: "1.5L 4-cyl",      trans: "CVT",   fuel: "14.2 km/L", seats: 7 } },
    { name: "Toyota Vios",           brand: "Toyota",    type: "Reliable Sedan",        price: 89900,  tank: 42, details: { engine: "1.5L 4-cyl",      trans: "CVT",   fuel: "17.1 km/L", seats: 5 } },
    { name: "Toyota Rush",           brand: "Toyota",    type: "7-Seater SUV",          price: 93400,  tank: 45, details: { engine: "1.5L 4-cyl",      trans: "CVT",   fuel: "14.0 km/L", seats: 7 } },
    { name: "Toyota Raize",          brand: "Toyota",    type: "Compact SUV",           price: 95000,  tank: 36, details: { engine: "1.0L Turbo",      trans: "CVT",   fuel: "17.0 km/L", seats: 5 } },
    { name: "Toyota Hilux",          brand: "Toyota",    type: "Pickup Truck",          price: 100000, tank: 80, details: { engine: "2.4L Diesel",     trans: "6AT",   fuel: "12.5 km/L", seats: 5 } },
    { name: "Toyota Corolla Cross",  brand: "Toyota",    type: "Hybrid SUV",            price: 139880, tank: 43, details: { engine: "1.8L Hybrid",     trans: "CVT",   fuel: "23.3 km/L", seats: 5 } },
    { name: "Toyota Innova Zenix",   brand: "Toyota",    type: "Premium MPV",           price: 155880, tank: 52, details: { engine: "2.0L Hybrid",     trans: "CVT",   fuel: "21.0 km/L", seats: 7 } },
    { name: "Toyota Fortuner",       brand: "Toyota",    type: "Full-Size SUV",         price: 199880, tank: 80, details: { engine: "2.4L Diesel",     trans: "6AT",   fuel: "12.8 km/L", seats: 7 } },
    { name: "Toyota Camry",          brand: "Toyota",    type: "Executive Sedan",       price: 199900, tank: 50, details: { engine: "2.5L Hybrid",     trans: "CVT",   fuel: "20.0 km/L", seats: 5 } },
    { name: "Toyota Alphard",        brand: "Toyota",    type: "Luxury MPV",            price: 498000, tank: 75, details: { engine: "2.5L Hybrid",     trans: "CVT",   fuel: "17.4 km/L", seats: 7 } },

    // ── Honda ─────────────────────────────────────────────
    { name: "Honda City Hatchback",  brand: "Honda",     type: "Premium Hatchback",     price: 81900,  tank: 40, details: { engine: "1.5L RS Turbo",   trans: "CVT",   fuel: "17.9 km/L", seats: 5 } },
    { name: "Honda City",            brand: "Honda",     type: "Compact Sedan",         price: 83900,  tank: 40, details: { engine: "1.5L 4-cyl",      trans: "CVT",   fuel: "18.5 km/L", seats: 5 } },
    { name: "Honda WR-V",            brand: "Honda",     type: "Urban SUV",             price: 89900,  tank: 40, details: { engine: "1.5L 4-cyl",      trans: "CVT",   fuel: "16.2 km/L", seats: 5 } },
    { name: "Honda BR-V",            brand: "Honda",     type: "7-Seater SUV",          price: 104900, tank: 40, details: { engine: "1.5L 4-cyl",      trans: "CVT",   fuel: "15.5 km/L", seats: 7 } },
    { name: "Honda HR-V",            brand: "Honda",     type: "Compact SUV",           price: 114800, tank: 40, details: { engine: "1.5L Turbo",      trans: "CVT",   fuel: "16.8 km/L", seats: 5 } },
    { name: "Honda Civic",           brand: "Honda",     type: "Sporty Sedan",          price: 125900, tank: 47, details: { engine: "1.5L Turbo",      trans: "CVT",   fuel: "17.0 km/L", seats: 5 } },
    { name: "Honda ZR-V",            brand: "Honda",     type: "Sporty SUV",            price: 139900, tank: 47, details: { engine: "1.5L Turbo",      trans: "CVT",   fuel: "16.5 km/L", seats: 5 } },
    { name: "Honda CR-V",            brand: "Honda",     type: "Premium SUV",           price: 166900, tank: 57, details: { engine: "1.5L Turbo",      trans: "CVT",   fuel: "14.9 km/L", seats: 5 } },
    { name: "Honda Accord",          brand: "Honda",     type: "Executive Sedan",       price: 197900, tank: 47, details: { engine: "1.5L Turbo",      trans: "CVT",   fuel: "17.6 km/L", seats: 5 } },
    { name: "Honda e:N1",            brand: "Honda",     type: "Electric SUV",          price: 219900, tank: 0,  details: { engine: "Electric 204hp",  trans: "Single",fuel: "~5.8 kWh/100km", seats: 5 } },

    // ── Used Car ──────────────────────────────────────────
    { name: "Used Car – Economy",    brand: "Used Car",  type: "Budget Pre-owned",      price: 18000,  tank: 35, details: { engine: "1.0–1.3L",        trans: "Auto",  fuel: "Varies",    seats: 5 } },
    { name: "Used Car – Compact",    brand: "Used Car",  type: "Pre-owned Hatchback",   price: 28000,  tank: 40, details: { engine: "1.3–1.5L",        trans: "Auto",  fuel: "Varies",    seats: 5 } },
    { name: "Used Car – Sedan",      brand: "Used Car",  type: "Pre-owned Sedan",       price: 38000,  tank: 40, details: { engine: "1.5–1.6L",        trans: "Auto",  fuel: "Varies",    seats: 5 } },
    { name: "Used Car – MPV/SUV",    brand: "Used Car",  type: "Pre-owned SUV",         price: 55000,  tank: 45, details: { engine: "1.5–2.0L",        trans: "Auto",  fuel: "Varies",    seats: 7 } },
    { name: "Used Car – Premium",    brand: "Used Car",  type: "Certified Pre-owned",   price: 78000,  tank: 45, details: { engine: "2.0L+",           trans: "Auto",  fuel: "Varies",    seats: 5 } },
];

const DEALERS = [
    {
        name: "Perodua Showroom PJ", brand: "Perodua",
        distance: "4.3 km away", rating: "4.7 / 5.0",
        mapUrl: "https://www.google.com/maps?q=Perodua+Petaling+Jaya&output=embed",
        locationUrl: "https://www.google.com/maps/search/Perodua+Petaling+Jaya",
    },
    {
        name: "Proton 3S Centre Cheras", brand: "Proton",
        distance: "6.1 km away", rating: "4.5 / 5.0",
        mapUrl: "https://www.google.com/maps?q=Proton+Cheras&output=embed",
        locationUrl: "https://www.google.com/maps/search/Proton+Cheras",
    },
    {
        name: "Toyota Showroom Petaling Jaya", brand: "Toyota",
        distance: "5.2 km away", rating: "4.6 / 5.0",
        mapUrl: "https://www.google.com/maps?q=Toyota+showroom+Petaling+Jaya&output=embed",
        locationUrl: "https://www.google.com/maps/search/Toyota+showroom+Petaling+Jaya",
    },
    {
        name: "Honda Authorized Dealer KL", brand: "Honda",
        distance: "7.8 km away", rating: "4.4 / 5.0",
        mapUrl: "https://www.google.com/maps?q=Honda+dealer+Kuala+Lumpur&output=embed",
        locationUrl: "https://www.google.com/maps/search/Honda+dealer+Kuala+Lumpur",
    },
    {
        name: "Used Car Hub Setapak", brand: "Used Car",
        distance: "8.4 km away", rating: "4.2 / 5.0",
        mapUrl: "https://www.google.com/maps?q=Used+Car+Setapak&output=embed",
        locationUrl: "https://www.google.com/maps/search/Used+Car+Setapak",
    },
];

const NAV_ITEMS = [
    { key: "home",        label: "Home"        },
    { key: "input",       label: "Profile"     },
    { key: "analysis",    label: "Analysis"    },
    { key: "dealerships", label: "Dealerships" },
    { key: "summary",     label: "Summary"     },
];

const baseForm = {
    monthlySalary: "",
    currentSavings: "",
    monthlyExpenses: "",
    monthlyCommitments: "",
    desiredCarPrice: "",
    preferredBrand: "Perodua",
    budi95Eligible: "no",
};

const formatRM = (value) => `RM ${Number(value || 0).toLocaleString("en-MY")}`;

const MONTHLY_KM = 1500;

const parseEngineCC = (engineStr) => {
    if (!engineStr) return 1500;
    if (engineStr.toLowerCase().includes("electric")) return 0;
    const m = engineStr.match(/(\d+\.?\d*)\s*[Ll]/);
    return m ? Math.round(parseFloat(m[1]) * 1000) : 1500;
};

const parseFuelEfficiency = (fuelStr) => {
    if (!fuelStr || fuelStr === "Varies" || fuelStr.includes("kWh")) return null;
    const m = fuelStr.match(/(\d+\.?\d*)\s*km\/L/i);
    return m ? parseFloat(m[1]) : null;
};

// Returns { cost, liters } or null for electric
const calcMonthlyFuelCost = (car, eligible) => {
    const pricePerLiter = eligible === "yes" ? 1.99 : 2.60;
    if (car.details?.fuel?.includes("kWh")) return null; // electric
    const efficiency = parseFuelEfficiency(car.details?.fuel);
    if (efficiency) {
        const liters = Math.round((MONTHLY_KM / efficiency) * 10) / 10;
        return { cost: Math.round(liters * pricePerLiter * 100) / 100, liters };
    }
    // Fallback for "Varies" used cars — use tank × 4
    if (car.tank) {
        const liters = car.tank * 4;
        return { cost: Math.round(liters * pricePerLiter * 100) / 100, liters };
    }
    return null;
};

const calcAnnualRoadTax = (engineStr) => {
    const cc = parseEngineCC(engineStr);
    if (cc === 0) return 20;
    if (cc <= 1000) return 20;
    if (cc <= 1200) return 55;
    if (cc <= 1400) return 70;
    if (cc <= 1600) return 90;
    if (cc <= 1800) return 200;
    if (cc <= 2000) return 280;
    if (cc <= 2500) return 380;
    return 380 + (cc - 2500);
};

const calcAnnualInsurance = (price) =>
    Math.round(price * 0.025 + 300);

const calcAnnualService = (engineStr) => {
    const cc = parseEngineCC(engineStr);
    if (cc === 0) return 600;
    if (cc <= 1300) return 800;
    if (cc <= 1600) return 1200;
    if (cc <= 2000) return 1800;
    return 2400;
};

const loadStored = () => {
    try {
        const raw = localStorage.getItem(STORAGE_KEY);
        return raw ? JSON.parse(raw) : null;
    } catch {
        return null;
    }
};

const saveStored = (data) => {
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch {
        // Ignore localStorage write errors.
    }
};

function calculateAnalysis(form) {
    const salary      = Number(form.monthlySalary      || 0);
    const savings     = Number(form.currentSavings     || 0);
    const expenses    = Number(form.monthlyExpenses    || 0);
    const commitments = Number(form.monthlyCommitments || 0);
    const targetCar   = Number(form.desiredCarPrice    || 0);

    const disposableIncome           = Math.max(salary - expenses - commitments, 0);
    const conservativeMonthlyCarCost = Math.max(Math.round(disposableIncome * 0.45), 0);
    const stretchMonthlyCarCost      = Math.max(Math.round(disposableIncome * 0.65), 0);

    const lowBudget        = Math.max(Math.round(conservativeMonthlyCarCost * 72), 12000);
    const highBudget       = Math.max(Math.round(stretchMonthlyCarCost * 84), lowBudget + 8000);
    const safeCarBudgetLow  = Math.round(lowBudget  / 1000) * 1000;
    const safeCarBudgetHigh = Math.round(highBudget / 1000) * 1000;

    const savingsBufferMonths = salary > 0 ? savings / Math.max(expenses + commitments, 1) : 0;
    let score = 35;
    score += Math.min(disposableIncome / 40, 25);
    score += Math.min(savingsBufferMonths * 8, 20);
    score -= Math.min((commitments / Math.max(salary, 1)) * 50, 20);
    const financialHealthScore = Math.max(18, Math.min(92, Math.round(score)));

    const scenarioAPrice = targetCar || Math.max(safeCarBudgetHigh + 30000, 80000);
    const scenarioBPrice = Math.min(Math.max(safeCarBudgetLow, 30000), safeCarBudgetHigh);

    const recommendedCars = (() => {
        const brandAndBudget = CAR_CATALOG.filter((car) => {
            const brandMatch = form.preferredBrand === "Any" || car.brand === form.preferredBrand;
            return brandMatch && car.price >= safeCarBudgetLow * 0.75 && car.price <= safeCarBudgetHigh * 1.2;
        });
        if (brandAndBudget.length) return brandAndBudget.slice(0, 3);

        // Brand matches but none fit the budget — show the brand's cars sorted by price proximity
        const brandOnly = CAR_CATALOG.filter((car) =>
            form.preferredBrand === "Any" || car.brand === form.preferredBrand
        ).sort((a, b) => Math.abs(a.price - safeCarBudgetHigh) - Math.abs(b.price - safeCarBudgetHigh));
        if (brandOnly.length) return brandOnly.slice(0, 3);

        // Last resort — any brand within budget
        return CAR_CATALOG.filter((car) => car.price <= safeCarBudgetHigh).slice(0, 3);
    })();

    const fallbackCars = recommendedCars;
    const recommendedDealers = DEALERS.filter((dealer) =>
        form.preferredBrand === "Any" ? true : dealer.brand === form.preferredBrand || dealer.brand === "Used Car"
    );

    return {
        disposableIncome,
        conservativeMonthlyCarCost,
        stretchMonthlyCarCost,
        financialHealthScore,
        safeCarBudgetLow,
        safeCarBudgetHigh,
        recommendedMonthlyLow:  Math.round(conservativeMonthlyCarCost / 10) * 10,
        recommendedMonthlyHigh: Math.round(stretchMonthlyCarCost      / 10) * 10,
        scenarioA: { label: `Scenario A (${formatRM(scenarioAPrice)})`, monthly: Math.round(scenarioAPrice / 72 + scenarioAPrice * 0.0068 + 190), stress: scenarioAPrice > safeCarBudgetHigh ? "HIGH" : "MEDIUM" },
        scenarioB: { label: `Scenario B (${formatRM(scenarioBPrice)})`, monthly: Math.round(scenarioBPrice / 84 + scenarioBPrice * 0.0055 + 160), stress: scenarioBPrice <= safeCarBudgetHigh ? "LOW" : "MEDIUM" },
        recommendedCars:    recommendedCars.length    ? recommendedCars    : fallbackCars,
        recommendedDealers: recommendedDealers.length ? recommendedDealers : DEALERS,
        recommendationText: financialHealthScore >= 70
            ? `Based on your current profile, keeping your purchase around ${formatRM(safeCarBudgetHigh)} still preserves good flexibility.`
            : `To reduce financial stress, keep your purchase near ${formatRM(safeCarBudgetHigh)} or below.`,
    };
}

const panel = "rounded-3xl border border-white/70 bg-white/70 p-6 shadow-[0_20px_60px_rgba(15,23,42,0.08)] backdrop-blur-xl";

function ScoreRing({ score }) {
    const radius        = 44;
    const circumference = 2 * Math.PI * radius;
    const offset        = circumference - (score / 100) * circumference;
    const color         = score >= 70 ? "#10b981" : score >= 50 ? "#f59e0b" : "#f43f5e";
    return (
        <div className="relative flex items-center justify-center mt-3">
            <svg width="110" height="110" className="rotate-[-90deg]">
                <circle cx="55" cy="55" r={radius} fill="none" stroke="#e2e8f0" strokeWidth="8" />
                <circle cx="55" cy="55" r={radius} fill="none" stroke={color} strokeWidth="8"
                    strokeLinecap="round" strokeDasharray={circumference} strokeDashoffset={offset}
                    className="score-ring" />
            </svg>
            <div className="absolute flex flex-col items-center">
                <span className="text-2xl font-black text-slate-900">{score}</span>
                <span className="text-[10px] font-semibold uppercase tracking-wide text-slate-500">/ 100</span>
            </div>
        </div>
    );
}

function Shell({ page, setPage, onReset, children }) {
    const progress = ((NAV_ITEMS.findIndex((item) => item.key === page) + 1) / NAV_ITEMS.length) * 100;
    return (
        <div className="relative min-h-screen overflow-x-clip text-slate-900">
            <div className="aurora aurora-a" />
            <div className="aurora aurora-b" />
            <header className="header-animate sticky top-0 z-30 border-b border-white/60 bg-white/80 backdrop-blur-2xl">
                <div className="mx-auto flex max-w-6xl items-center gap-4 px-5 py-4 md:px-8">
                    <button onClick={() => setPage("home")} className="btn-animated flex items-center gap-3 rounded-2xl p-1 -ml-1">
                        <div className="grid h-10 w-10 place-items-center rounded-2xl bg-slate-900 text-white">
                            <Car className="h-5 w-5" />
                        </div>
                        <div className="text-left">
                            <div className="text-sm font-bold">DriveWise AI</div>
                            <div className="text-xs text-slate-500">Affordability Intelligence</div>
                        </div>
                    </button>
                    <nav className="ml-auto hidden gap-1 lg:flex">
                        {NAV_ITEMS.map((item, i) => (
                            <button key={item.key} onClick={() => setPage(item.key)}
                                className={`nav-pill rounded-full px-4 py-2 text-sm font-medium ${page === item.key ? "nav-active bg-slate-900 text-white" : "text-slate-600 hover:bg-white"}`}
                                style={{ animationDelay: `${i * 40}ms` }}>
                                {item.label}
                            </button>
                        ))}
                    </nav>
                    <button onClick={onReset} className="btn-animated rounded-full border border-slate-300 bg-white/90 px-4 py-2 text-sm text-slate-700">Reset</button>
                </div>
                <div className="mx-auto max-w-6xl px-5 pb-3 md:px-8">
                    <div className="h-1.5 rounded-full bg-slate-200">
                        <div className="h-full rounded-full bg-gradient-to-r from-sky-400 to-slate-900 transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]"
                            style={{ width: `${progress}%` }} />
                    </div>
                </div>
            </header>
            <main className="mx-auto max-w-6xl px-5 py-10 md:px-8">{children}</main>
        </div>
    );
}

function App() {
    const stored = useMemo(() => loadStored(), []);
    const [page, setPage]         = useState(stored?.page || "home");
    const [form, setForm]         = useState(stored?.form || baseForm);
    const [dp,   setDp]           = useState(0);
    const [years, setYears]       = useState(7);
    const [rate,  setRate]        = useState(0);
    const [selectedCar, setSelectedCar] = useState(null);
    const analysis = useMemo(() => calculateAnalysis(form), [form]);

    useEffect(() => { saveStored({ page, form }); }, [page, form]);

    const reset = () => {
        setForm(baseForm);
        setPage("home");
        try { localStorage.removeItem(STORAGE_KEY); } catch { /* ignore */ }
    };

    const chartMax   = Math.max(analysis.scenarioA.monthly, analysis.scenarioB.monthly, analysis.recommendedMonthlyHigh, 1);
    const basePrice  = Number(form.desiredCarPrice || analysis.safeCarBudgetHigh || 0);
    const financed   = Math.max(Math.round(basePrice * (1 - dp / 100)), 0);
    const emi        = Math.round((financed * (1 + (rate / 100) * years)) / Math.max(years * 12, 1));
    const running    = Math.round(basePrice * 0.0018 + 220);
    const monthlyOwn = emi + running;

    return (
        <Shell page={page} setPage={setPage} onReset={reset}>

            {/* ── HOME ──────────────────────────────────────── */}
            {page === "home" && (
                <div className="space-y-12">
                    {/* Hero */}
                    <section className="grid gap-6 md:grid-cols-[1.2fr_0.8fr]">
                        <div className={`${panel} card-pop reveal s1 p-8 md:p-10`}>
                            <span className="badge-pop inline-flex rounded-full border border-slate-300 bg-white/80 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-600">
                                Built for modern car buyers
                            </span>
                            <h1 className="gradient-text mt-5 text-5xl font-black leading-[1.02] tracking-tight md:text-7xl">
                                Buy your next car with confidence, not guesswork.
                            </h1>
                            <p className="mt-5 max-w-2xl text-slate-600 md:text-lg">
                                A clean affordability planner with AI-style simulation and dealership handoff.
                            </p>
                            <div className="mt-8 flex flex-wrap gap-3">
                                <button onClick={() => setPage("input")}
                                    className="btn-animated inline-flex items-center gap-2 rounded-full bg-slate-900 px-6 py-3.5 text-sm font-semibold text-white">
                                    Start Affordability Check <ArrowRight className="h-4 w-4" />
                                </button>
                                <button onClick={() => setPage("analysis")}
                                    className="btn-animated rounded-full border border-slate-300 bg-white px-6 py-3.5 text-sm">
                                    Preview Dashboard
                                </button>
                            </div>
                        </div>
                        <div className={`${panel} card-pop reveal s2 img-zoom overflow-hidden p-0`}>
                            <img src="https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&w=1400&q=80"
                                alt="Luxury car" className="h-full min-h-[260px] w-full rounded-3xl object-cover" />
                        </div>
                    </section>

                    {/* Stats Strip */}
                    <section className="grid grid-cols-2 gap-4 md:grid-cols-4">
                        {[
                            { value: "29+", label: "Car Models" },
                            { value: "5",   label: "Top Brands" },
                            { value: "5",   label: "Dealers Nearby" },
                            { value: "100%", label: "Free to Use" },
                        ].map(({ value, label }, i) => (
                            <div key={label} className={`${panel} card-pop reveal text-center py-6`} style={{ animationDelay: `${i * 80}ms` }}>
                                <div className="text-3xl font-black text-slate-900">{value}</div>
                                <div className="mt-1 text-sm text-slate-500">{label}</div>
                            </div>
                        ))}
                    </section>

                    {/* Feature Cards */}
                    <section>
                        <h2 className="reveal text-2xl font-black text-slate-900 md:text-3xl">Everything you need to decide smart</h2>
                        <div className="mt-6 grid gap-5 md:grid-cols-3">
                            {[
                                {
                                    icon: <Wallet className="h-6 w-6 text-sky-500" />,
                                    title: "Affordability Engine",
                                    desc: "Instantly calculates your safe car budget based on salary, expenses, and commitments — no spreadsheets needed.",
                                },
                                {
                                    icon: <TrendingUp className="h-6 w-6 text-emerald-500" />,
                                    title: "Scenario Simulation",
                                    desc: "Compare conservative vs stretch buying scenarios and run a What-If Lab to stress-test your own numbers.",
                                },
                                {
                                    icon: <MapPin className="h-6 w-6 text-amber-500" />,
                                    title: "Dealership Handoff",
                                    desc: "Get matched with nearby verified dealers for Perodua, Proton, Toyota, Honda, and used car specialists.",
                                },
                            ].map(({ icon, title, desc }, i) => (
                                <div key={title} className={`${panel} card-pop reveal`} style={{ animationDelay: `${i * 100}ms` }}>
                                    <div className="mb-4 inline-flex rounded-2xl bg-slate-100 p-3">{icon}</div>
                                    <h3 className="text-lg font-bold text-slate-900">{title}</h3>
                                    <p className="mt-2 text-sm leading-relaxed text-slate-600">{desc}</p>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* How It Works */}
                    <section className={`${panel} card-pop reveal`}>
                        <h2 className="text-2xl font-black text-slate-900 md:text-3xl">How it works</h2>
                        <div className="mt-8 grid gap-6 md:grid-cols-4">
                            {[
                                { step: "01", icon: <ClipboardList className="h-5 w-5" />, title: "Enter your profile",   desc: "Fill in your salary, savings, and monthly commitments." },
                                { step: "02", icon: <Sparkles className="h-5 w-5" />,     title: "Get your analysis",   desc: "See your financial health score and safe car budget range." },
                                { step: "03", icon: <Car className="h-5 w-5" />,          title: "Browse matched cars", desc: "Cars are filtered to your budget and brand preference." },
                                { step: "04", icon: <Landmark className="h-5 w-5" />,     title: "Contact a dealer",    desc: "We surface nearby dealers ready to help you close the deal." },
                            ].map(({ step, icon, title, desc }, i) => (
                                <div key={step} className="reveal flex flex-col gap-3" style={{ animationDelay: `${i * 90}ms` }}>
                                    <div className="flex items-center gap-3">
                                        <div className="grid h-10 w-10 place-items-center rounded-2xl bg-slate-900 text-white">{icon}</div>
                                        <span className="text-xs font-bold tracking-widest text-slate-400">STEP {step}</span>
                                    </div>
                                    <h3 className="font-bold text-slate-900">{title}</h3>
                                    <p className="text-sm leading-relaxed text-slate-500">{desc}</p>
                                </div>
                            ))}
                        </div>
                        <div className="mt-8">
                            <button onClick={() => setPage("input")}
                                className="btn-animated inline-flex items-center gap-2 rounded-full bg-slate-900 px-7 py-3.5 text-sm font-semibold text-white">
                                Get Started Now <ArrowRight className="h-4 w-4" />
                            </button>
                        </div>
                    </section>
                </div>
            )}

            {/* ── PROFILE ───────────────────────────────────── */}
            {page === "input" && (
                <div className="grid gap-6 md:grid-cols-[1.15fr_0.85fr]">
                    <div className={`${panel} card-pop reveal s1`}>
                        <h1 className="text-4xl font-black md:text-5xl">Tell us about your finances</h1>
                        <p className="mt-3 text-slate-600">Inputs are local-only and used for simulated affordability analysis.</p>
                        <div className="mt-7 grid gap-4 md:grid-cols-2">
                            {[
                                ["Monthly salary (RM)",          "monthlySalary"     ],
                                ["Current savings (RM)",         "currentSavings"    ],
                                ["Monthly living expenses (RM)", "monthlyExpenses"   ],
                                ["Monthly commitments (RM)",     "monthlyCommitments"],
                                ["Desired car price (optional)", "desiredCarPrice"   ],
                            ].map(([label, key], i) => (
                                <label key={key} className="reveal" style={{ animationDelay: `${100 + i * 60}ms` }}>
                                    <span className="mb-2 block text-sm text-slate-600">{label}</span>
                                    <input type="number" value={form[key]}
                                        onChange={(e) => setForm((p) => ({ ...p, [key]: e.target.value }))}
                                        className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 outline-none focus:border-slate-900 focus:ring-4 focus:ring-slate-200" />
                                </label>
                            ))}
                            <label className="reveal" style={{ animationDelay: "400ms" }}>
                                <span className="mb-2 block text-sm text-slate-600">Preferred brand</span>
                                <select value={form.preferredBrand}
                                    onChange={(e) => setForm((p) => ({ ...p, preferredBrand: e.target.value }))}
                                    className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3">
                                    {BRANDS.map((b) => <option key={b}>{b}</option>)}
                                </select>
                            </label>
                            <label className="reveal md:col-span-2" style={{ animationDelay: "460ms" }}>
                                <span className="mb-2 block text-sm text-slate-600">Are you eligible for BUDI95?</span>
                                <select value={form.budi95Eligible}
                                    onChange={(e) => setForm((p) => ({ ...p, budi95Eligible: e.target.value }))}
                                    className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3">
                                    <option value="no">No</option>
                                    <option value="yes">Yes</option>
                                </select>
                            </label>
                        </div>
                        <button onClick={() => setPage("analysis")}
                            className="btn-animated mt-7 inline-flex w-full items-center justify-center gap-2 rounded-full bg-slate-900 px-6 py-3.5 text-sm font-semibold text-white">
                            Analyze My Financial Situation <ArrowRight className="h-4 w-4" />
                        </button>
                    </div>

                    <div className="space-y-6">
                        {/* Live Budget Preview */}
                        <div className={`${panel} card-pop reveal s2`}>
                            <div className="flex items-center gap-2 text-xl font-semibold text-slate-900">
                                <Sparkles className="h-5 w-5 text-sky-500" /> Live Budget Preview
                            </div>
                            <p className="mt-2 text-sm text-slate-500">Readable live estimate while you type.</p>
                            <div className="mt-5 space-y-3">
                                <div className="rounded-2xl bg-slate-100 p-4">
                                    <div className="text-sm text-slate-500">Disposable income</div>
                                    <div key={analysis.disposableIncome} className="number-flash mt-1 text-3xl font-black text-slate-900">
                                        {formatRM(analysis.disposableIncome)}
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 gap-3">
                                    <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-4">
                                        <div className="text-sm text-emerald-700">Conservative</div>
                                        <div key={analysis.conservativeMonthlyCarCost} className="number-flash mt-1 text-xl font-semibold text-slate-900">
                                            {formatRM(analysis.conservativeMonthlyCarCost)}
                                        </div>
                                    </div>
                                    <div className="rounded-2xl border border-amber-200 bg-amber-50 p-4">
                                        <div className="text-sm text-amber-700">Stretch</div>
                                        <div key={analysis.stretchMonthlyCarCost} className="number-flash mt-1 text-xl font-semibold text-slate-900">
                                            {formatRM(analysis.stretchMonthlyCarCost)}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Savings Timeline */}
                        <div className={`${panel} card-pop reveal s3`}>
                            <div className="flex items-center gap-2 text-xl font-semibold text-slate-900">
                                <TrendingUp className="h-5 w-5 text-emerald-500" /> Savings Timeline
                            </div>
                            <p className="mt-2 text-sm text-slate-500">How long to save for a 10% down payment.</p>
                            <div className="mt-5 space-y-3">
                                {(() => {
                                    const targetPrice    = Number(form.desiredCarPrice || analysis.safeCarBudgetHigh || 0);
                                    const downPayment    = Math.round(targetPrice * 0.1);
                                    const monthlySavable = Math.max(analysis.disposableIncome - analysis.conservativeMonthlyCarCost, 0);
                                    const currentSavings = Number(form.currentSavings || 0);
                                    const remaining      = Math.max(downPayment - currentSavings, 0);
                                    const monthsNeeded   = monthlySavable > 0 ? Math.ceil(remaining / monthlySavable) : null;
                                    const alreadyCovered = currentSavings >= downPayment && downPayment > 0;
                                    return (
                                        <>
                                            <div className="rounded-2xl bg-slate-100 p-4">
                                                <div className="text-sm text-slate-500">10% down payment target</div>
                                                <div key={downPayment} className="number-flash mt-1 text-2xl font-black text-slate-900">{formatRM(downPayment)}</div>
                                            </div>
                                            <div className="rounded-2xl bg-slate-100 p-4">
                                                <div className="text-sm text-slate-500">Monthly savings available</div>
                                                <div key={monthlySavable} className="number-flash mt-1 text-xl font-semibold text-slate-900">{formatRM(monthlySavable)}</div>
                                            </div>
                                            <div className={`rounded-2xl p-4 ${alreadyCovered ? "border border-emerald-200 bg-emerald-50" : "border border-sky-200 bg-sky-50"}`}
                                                style={{ transition: "background 300ms ease, border-color 300ms ease" }}>
                                                <div className="text-sm text-slate-500">Time to goal</div>
                                                <div className={`mt-1 text-xl font-bold ${alreadyCovered ? "text-emerald-700" : "text-sky-700"}`}>
                                                    {alreadyCovered ? "Ready now!" : monthsNeeded ? `~${monthsNeeded} months` : "Enter details to calculate"}
                                                </div>
                                            </div>
                                        </>
                                    );
                                })()}
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* ── ANALYSIS ──────────────────────────────────── */}
            {page === "analysis" && (
                <div className="space-y-6">
                    <div className={`${panel} card-pop reveal s1`}>
                        <h1 className="text-4xl font-black md:text-5xl">Your purchase decision cockpit</h1>
                    </div>

                    <section className="grid gap-4 md:grid-cols-3">
                        {[
                            ["Financial Health Score", `${analysis.financialHealthScore}/100`, 0],
                            ["Safe Car Budget",        `${formatRM(analysis.safeCarBudgetLow)} – ${formatRM(analysis.safeCarBudgetHigh)}`, 1],
                            ["Recommended Monthly",   `${formatRM(analysis.recommendedMonthlyLow)} – ${formatRM(analysis.recommendedMonthlyHigh)}`, 2],
                        ].map(([title, value, i]) => (
                            <div key={title} className={`${panel} card-pop glow-soft reveal`} style={{ animationDelay: `${80 + i * 90}ms` }}>
                                <div className="text-sm uppercase tracking-[0.16em] text-slate-500">{title}</div>
                                <div className="mt-2 text-3xl font-black">{value}</div>
                                {i === 0 && (
                                    <div className="mt-3">
                                        <div className="h-2 w-full overflow-hidden rounded-full bg-slate-200">
                                            <div className={`h-full rounded-full progress-animate ${analysis.financialHealthScore >= 70 ? "bg-emerald-500" : analysis.financialHealthScore >= 50 ? "bg-amber-400" : "bg-rose-500"}`}
                                                style={{ width: `${analysis.financialHealthScore}%`, animationDelay: "400ms" }} />
                                        </div>
                                    </div>
                                )}
                            </div>
                        ))}
                    </section>

                    <section className="grid gap-4 md:grid-cols-[1.2fr_0.8fr]">
                        <div className={`${panel} card-pop reveal s2`}>
                            <div className="text-2xl font-bold">Monthly stress simulator</div>
                            <div className="mt-5 flex h-64 items-end gap-6 rounded-2xl border border-slate-200 bg-slate-50 p-4">
                                {[analysis.scenarioA, analysis.scenarioB].map((s, i) => (
                                    <div key={s.label} className="flex flex-1 flex-col items-center gap-2">
                                        <div className="text-xs text-slate-500">{formatRM(s.monthly)}</div>
                                        <div className="flex h-44 w-full items-end rounded-xl bg-white p-1.5">
                                            <div className={`bar-animate w-full rounded-lg ${i === 0 ? "bg-slate-900" : "bg-slate-400"}`}
                                                style={{ height: `${(s.monthly / chartMax) * 100}%`, animationDelay: `${200 + i * 160}ms` }} />
                                        </div>
                                        <div className="text-xs text-slate-600">{i === 0 ? "Scenario A" : "Scenario B"}</div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className={`${panel} card-pop reveal s3`}>
                            <div className="text-2xl font-bold">Scenario outcomes</div>
                            <div className="mt-4 space-y-3">
                                {[analysis.scenarioA, analysis.scenarioB].map((s, i) => (
                                    <div key={s.label}
                                        className={`card-pop reveal rounded-2xl border p-4 ${i === 0 ? "border-rose-200 bg-rose-50" : "border-emerald-200 bg-emerald-50"}`}
                                        style={{ animationDelay: `${300 + i * 100}ms` }}>
                                        <div className="text-xs text-slate-500">{s.label}</div>
                                        <div className="mt-1 text-xl font-bold">{formatRM(s.monthly)} / month</div>
                                        <div className="mt-2 inline-flex rounded-full bg-white px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.16em]">
                                            Stress: {s.stress}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>

                    <div className={`${panel} card-pop reveal s3`}>
                        <div className="inline-flex rounded-full border border-slate-300 bg-white/80 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-600">
                            What-If Financing Lab
                        </div>
                        <div className="mt-5 grid gap-5 md:grid-cols-2">
                            <div className="space-y-4 rounded-2xl bg-slate-50 p-4">
                                <label>
                                    <div className="mb-2 flex justify-between text-sm text-slate-600">
                                        <span>Down payment</span><span>{dp}%</span>
                                    </div>
                                    <input type="range" min="0" max="40" value={dp} onChange={(e) => setDp(Number(e.target.value))} className="w-full accent-slate-900" />
                                </label>
                                <label>
                                    <div className="mb-2 flex justify-between text-sm text-slate-600">
                                        <span>Interest rate</span><span>{rate.toFixed(1)}%</span>
                                    </div>
                                    <input type="range" min="0" max="6" step="0.1" value={rate} onChange={(e) => setRate(Number(e.target.value))} className="w-full accent-slate-900" />
                                </label>
                                <label>
                                    <div className="mb-2 text-sm text-slate-600">Loan tenure</div>
                                    <select value={years} onChange={(e) => setYears(Number(e.target.value))} className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5">
                                        {[5, 7, 9].map((y) => <option key={y} value={y}>{y} years</option>)}
                                    </select>
                                </label>
                            </div>
                            <div className="rounded-2xl bg-slate-900 p-4 text-white">
                                <div className="text-xs uppercase tracking-[0.16em] text-slate-300">Monthly ownership estimate</div>
                                <div key={monthlyOwn} className="number-flash mt-1 text-4xl font-black">{formatRM(monthlyOwn)}</div>
                                <div className="mt-2 text-sm text-slate-300">Installment {formatRM(emi)} + running {formatRM(running)}</div>
                            </div>
                        </div>
                    </div>

                    <section className="grid gap-4 md:grid-cols-3">
                        {analysis.recommendedCars.map((car, i) => {
                            const brandFit = form.preferredBrand === "Any" || car.brand === form.preferredBrand;
                            return (
                                <div key={car.name}
                                    onClick={() => { setSelectedCar(car); setPage("car-detail"); }}
                                    className={`${panel} card-pop reveal cursor-pointer hover:shadow-[0_24px_64px_rgba(15,23,42,0.14)] hover:-translate-y-1 transition-transform`}
                                    style={{ animationDelay: `${80 + i * 90}ms` }}>
                                    <div className="flex items-center justify-between gap-2">
                                        <div className="text-xs uppercase tracking-[0.16em] text-slate-500">{car.brand}</div>
                                        <div className={`rounded-full px-2.5 py-1 text-[11px] font-semibold ${brandFit ? "bg-emerald-100 text-emerald-700" : "bg-amber-100 text-amber-700"}`}>
                                            {brandFit ? "Brand Match" : "Alt Option"}
                                        </div>
                                    </div>
                                    <div className="mt-2 text-2xl font-bold">{car.name}</div>
                                    <div className="mt-1 text-sm text-slate-500">{car.type}</div>
                                    <div className="mt-3 text-xl font-semibold text-slate-900">{formatRM(car.price)}</div>
                                    {car.details && (
                                        <div className="mt-4 grid grid-cols-2 gap-2">
                                            {[
                                                { label: "Engine",  value: car.details.engine },
                                                { label: "Trans",   value: car.details.trans  },
                                                { label: "Fuel",    value: car.details.fuel   },
                                                { label: "Seats",   value: `${car.details.seats} seats` },
                                            ].map(({ label, value }) => (
                                                <div key={label} className="rounded-xl bg-slate-50 px-3 py-2">
                                                    <div className="text-[10px] font-semibold uppercase tracking-wide text-slate-400">{label}</div>
                                                    <div className="mt-0.5 text-xs font-semibold text-slate-700">{value}</div>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                    {(() => {
                                        const fr = calcMonthlyFuelCost(car, form.budi95Eligible);
                                        if (!fr) return (
                                            <div className="mt-3 rounded-xl border border-slate-200 bg-slate-100 px-3 py-2">
                                                <div className="text-[10px] font-semibold uppercase tracking-wide text-slate-400">Monthly Fuel</div>
                                                <div className="mt-0.5 text-sm font-bold text-slate-500">Electric — no fuel</div>
                                            </div>
                                        );
                                        return (
                                            <div className="mt-3 rounded-xl border border-sky-200 bg-sky-50 px-3 py-2">
                                                <div className="text-[10px] font-semibold uppercase tracking-wide text-sky-500">Est. Monthly Fuel</div>
                                                <div className="mt-0.5 text-sm font-bold text-sky-700">
                                                    RM {fr.cost.toFixed(2)}
                                                    <span className="ml-1 text-[10px] font-normal text-sky-500">~{fr.liters}L / {MONTHLY_KM} km</span>
                                                </div>
                                            </div>
                                        );
                                    })()}
                                    <div className="mt-3 text-center text-[10px] font-semibold uppercase tracking-wide text-slate-400">Tap for full financial details →</div>
                                </div>
                            );
                        })}
                    </section>

                    {/* ── Monthly Fuel Expenses ─────────────────────── */}
                    <div className={`${panel} card-pop reveal s4`}>
                        <div className="flex items-center gap-2 text-2xl font-bold text-slate-900">
                            <span className="inline-flex rounded-2xl bg-sky-100 p-2 text-sky-600">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 10h2l2 7h10l2-7h2M7 10V6a4 4 0 018 0v4" />
                                </svg>
                            </span>
                            Monthly Fuel Expenses
                        </div>
                        <p className="mt-2 text-sm text-slate-500">
                            Based on filling up once a week (4 times/month).{" "}
                            {form.budi95Eligible === "yes"
                                ? <span className="font-semibold text-emerald-600">BUDI95 eligible — RM 1.99/L</span>
                                : <span className="font-semibold text-rose-500">Not BUDI95 eligible — RM 2.60/L</span>}
                        </p>
                        <p className="mt-1 text-xs text-slate-400">Based on {MONTHLY_KM} km/month driven, using actual fuel efficiency ratings.</p>
                        <div className="mt-5 grid gap-4 md:grid-cols-3">
                            {analysis.recommendedCars.map((car, i) => {
                                const fr = calcMonthlyFuelCost(car, form.budi95Eligible);
                                return (
                                    <div key={car.name} className="reveal rounded-2xl border border-slate-200 bg-slate-50 p-4" style={{ animationDelay: `${80 + i * 80}ms` }}>
                                        <div className="text-xs font-semibold uppercase tracking-wide text-slate-500">{car.name}</div>
                                        <div className="mt-0.5 text-[10px] text-slate-400">{car.details?.fuel}</div>
                                        {fr ? (
                                            <>
                                                <div className="mt-2 text-2xl font-black text-slate-900">RM {fr.cost.toFixed(2)}</div>
                                                <div className="mt-1 text-xs text-slate-500">
                                                    ~{fr.liters}L × RM {form.budi95Eligible === "yes" ? "1.99" : "2.60"}/L
                                                </div>
                                            </>
                                        ) : (
                                            <div className="mt-2 text-sm font-semibold text-slate-500">Electric — no fuel cost</div>
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                        {form.budi95Eligible !== "yes" && (
                            <p className="mt-4 rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-700">
                                You are not eligible for BUDI95. Fuel costs are calculated at the standard RON 95 price of RM 2.60/L.
                            </p>
                        )}
                    </div>

                    <div className={`${panel} card-pop reveal s4 flex items-start gap-3`}>
                        <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-amber-500" />
                        <p className="text-slate-700">
                            You currently keep {formatRM(analysis.disposableIncome)} disposable monthly income after essentials. Staying near {formatRM(Math.min(analysis.safeCarBudgetHigh, 30000))} keeps your affordability healthier.
                        </p>
                    </div>

                    <section className="flex flex-wrap gap-3">
                        <button onClick={() => setPage("dealerships")} className="btn-animated inline-flex items-center gap-2 rounded-full bg-slate-900 px-6 py-3 text-sm font-semibold text-white">
                            Explore Nearby Dealerships <ArrowRight className="h-4 w-4" />
                        </button>
                        <button onClick={() => setPage("summary")} className="btn-animated rounded-full border border-slate-300 bg-white px-6 py-3 text-sm">
                            View Summary Recommendation
                        </button>
                    </section>
                </div>
            )}

            {/* ── DEALERSHIPS ───────────────────────────────── */}
            {page === "dealerships" && (
                <div className="space-y-6">
                    <div className={`${panel} card-pop reveal s1`}>
                        <h1 className="text-4xl font-black md:text-5xl">Showrooms worth visiting now</h1>
                        <p className="mt-3 text-slate-600">Recommended budget range: {formatRM(analysis.safeCarBudgetLow)} – {formatRM(analysis.safeCarBudgetHigh)}</p>
                    </div>
                    <div className={`${panel} card-pop reveal s2 p-3`}>
                        <iframe title="Dealership Map" src={(analysis.recommendedDealers[0] || DEALERS[0]).mapUrl}
                            className="h-[360px] w-full rounded-2xl border-0" loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
                    </div>
                    <section className="grid gap-4 md:grid-cols-3">
                        {(analysis.recommendedDealers.length ? analysis.recommendedDealers : DEALERS).map((d, i) => (
                            <div key={d.name} className={`${panel} card-pop reveal`} style={{ animationDelay: `${80 + i * 110}ms` }}>
                                <div className="text-2xl font-bold">{d.name}</div>
                                <div className="mt-3 space-y-1 text-sm text-slate-600">
                                    <div className="inline-flex items-center gap-2"><MapPin className="h-4 w-4" /> {d.distance}</div>
                                    <div className="inline-flex items-center gap-2"><Star className="h-4 w-4 text-amber-500" /> {d.rating}</div>
                                </div>
                                <a href={d.locationUrl} target="_blank" rel="noreferrer"
                                    className="btn-animated mt-5 inline-flex rounded-full bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white">
                                    View Location
                                </a>
                            </div>
                        ))}
                    </section>
                    <section className="flex flex-wrap gap-3">
                        <button onClick={() => setPage("summary")} className="btn-animated rounded-full bg-slate-900 px-6 py-3 text-sm font-semibold text-white">Continue to Summary</button>
                        <button onClick={() => setPage("analysis")} className="btn-animated rounded-full border border-slate-300 bg-white px-6 py-3 text-sm">Back to Analysis</button>
                    </section>
                </div>
            )}

            {/* ── SUMMARY ───────────────────────────────────── */}
            {page === "summary" && (
                <div className="space-y-6">
                    <div className={`${panel} card-pop reveal s1`}>
                        <h1 className="text-4xl font-black md:text-5xl">Your smartest next move</h1>
                        <p className="mt-3 max-w-3xl text-slate-600">{analysis.recommendationText}</p>
                    </div>
                    <section className="grid gap-4 md:grid-cols-[1.2fr_0.8fr]">
                        <div className={`${panel} card-pop reveal s2`}>
                            <div className="text-2xl font-bold">Recommendation snapshot</div>
                            <div className="mt-4 rounded-2xl bg-slate-900 p-5 text-white">
                                <div className="text-xs uppercase tracking-[0.16em] text-slate-300">Safe car budget</div>
                                <div className="mt-1 text-3xl font-black">{formatRM(analysis.safeCarBudgetLow)} – {formatRM(analysis.safeCarBudgetHigh)}</div>
                            </div>
                            <div className="mt-4 grid gap-3 md:grid-cols-2">
                                <div className="rounded-2xl border border-slate-200 bg-white p-4">
                                    <div className="text-sm text-slate-500">Recommended monthly</div>
                                    <div className="mt-1 text-xl font-semibold">{formatRM(analysis.recommendedMonthlyLow)} – {formatRM(analysis.recommendedMonthlyHigh)}</div>
                                </div>
                                <div className="rounded-2xl border border-slate-200 bg-white p-4">
                                    <div className="text-sm text-slate-500">Financial score</div>
                                    <div className="mt-1 text-xl font-semibold">{analysis.financialHealthScore}/100</div>
                                    <ScoreRing score={analysis.financialHealthScore} />
                                </div>
                            </div>
                            <div className="mt-4 space-y-2">
                                {["Visit nearby dealerships", "Compare top models", "Plan emergency buffer"].map((x, i) => (
                                    <div key={x} className="reveal flex items-center gap-2 rounded-2xl bg-slate-50 p-3 text-slate-700" style={{ animationDelay: `${300 + i * 80}ms` }}>
                                        <CheckCircle2 className="h-4 w-4 text-emerald-500" /> {x}
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className={`${panel} card-pop reveal s3`}>
                            <div className="text-2xl font-bold">Your profile recap</div>
                            <div className="mt-4 space-y-3">
                                {[
                                    ["Monthly salary",      form.monthlySalary,                Landmark     ],
                                    ["Current savings",     form.currentSavings,               Wallet       ],
                                    ["Monthly commitments", form.monthlyCommitments,           ClipboardList],
                                    ["Desired car target",  form.desiredCarPrice || "Not set", Car          ],
                                ].map(([label, value, Icon], i) => (
                                    <div key={label} className="reveal rounded-2xl bg-slate-50 p-4" style={{ animationDelay: `${200 + i * 80}ms` }}>
                                        <div className="inline-flex items-center gap-2 text-sm text-slate-500">
                                            {React.createElement(Icon, { className: "h-4 w-4" })} {label}
                                        </div>
                                        <div className="mt-1 text-xl font-semibold">
                                            {typeof value === "string" && value !== "Not set" ? formatRM(value) : value === "Not set" ? value : formatRM(value)}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>
                    <section className="flex flex-wrap gap-3">
                        <button onClick={() => setPage("dealerships")} className="btn-animated rounded-full bg-slate-900 px-6 py-3 text-sm font-semibold text-white">Back to Dealership Locator</button>
                        <button onClick={() => setPage("input")} className="btn-animated rounded-full border border-slate-300 bg-white px-6 py-3 text-sm">Re-run Analysis</button>
                    </section>
                </div>
            )}
            {/* ── CAR DETAIL ────────────────────────────────── */}
            {page === "car-detail" && selectedCar && (() => {
                const car = selectedCar;
                const carPrice = car.price;
                const downPaymentAmt = Math.round(carPrice * (dp / 100));
                const financedAmt    = Math.max(carPrice - downPaymentAmt, 0);
                const monthlyEmi     = Math.round((financedAmt * (1 + (rate / 100) * years)) / Math.max(years * 12, 1));
                const totalLoanCost  = monthlyEmi * years * 12;

                const fuelResult     = calcMonthlyFuelCost(car, form.budi95Eligible);
                const monthlyFuel    = fuelResult?.cost ?? 0;
                const annualFuel     = Math.round(monthlyFuel * 12);

                const annualIns      = calcAnnualInsurance(carPrice);
                const monthlyIns     = Math.round(annualIns / 12);

                const annualRT       = calcAnnualRoadTax(car.details?.engine || "");
                const monthlyRT      = Math.round(annualRT / 12);

                const annualSvc      = calcAnnualService(car.details?.engine || "");
                const monthlySvc     = Math.round(annualSvc / 12);

                const totalMonthly   = monthlyEmi + monthlyFuel + monthlyIns + monthlyRT + monthlySvc;
                const totalAnnual    = (monthlyEmi * 12) + annualFuel + annualIns + annualRT + annualSvc;

                const rows = [
                    { label: "Loan Installment", monthly: monthlyEmi,  annual: monthlyEmi * 12,   color: "bg-slate-100" },
                    { label: "Fuel Cost",         monthly: monthlyFuel, annual: annualFuel,         color: "bg-sky-50",    note: fuelResult ? `~${fuelResult.liters}L/mo` : "Electric" },
                    { label: "Insurance",         monthly: monthlyIns,  annual: annualIns,          color: "bg-violet-50", note: "Est. comprehensive" },
                    { label: "Road Tax",          monthly: monthlyRT,   annual: annualRT,           color: "bg-amber-50",  note: `${parseEngineCC(car.details?.engine)} cc` },
                    { label: "Service & Maint.",  monthly: monthlySvc,  annual: annualSvc,          color: "bg-emerald-50",note: "Est. 2×/year" },
                ];

                return (
                    <div className="space-y-6">
                        {/* Header */}
                        <div className={`${panel} card-pop reveal s1`}>
                            <button onClick={() => setPage("analysis")}
                                className="btn-animated mb-4 inline-flex items-center gap-2 rounded-full border border-slate-300 bg-white px-4 py-2 text-sm text-slate-600">
                                ← Back to Analysis
                            </button>
                            <div className="flex flex-wrap items-start justify-between gap-4">
                                <div>
                                    <div className="text-xs font-semibold uppercase tracking-widest text-slate-400">{car.brand} · {car.type}</div>
                                    <h1 className="mt-1 text-4xl font-black md:text-5xl">{car.name}</h1>
                                    <div className="mt-2 text-3xl font-bold text-slate-700">{formatRM(carPrice)}</div>
                                </div>
                                <div className="rounded-2xl bg-slate-900 px-6 py-4 text-white">
                                    <div className="text-xs uppercase tracking-widest text-slate-300">Total Monthly Cost</div>
                                    <div className="mt-1 text-4xl font-black">{formatRM(totalMonthly)}</div>
                                    <div className="mt-1 text-xs text-slate-400">All-in ownership estimate</div>
                                </div>
                            </div>
                        </div>

                        {/* Spec strip */}
                        {car.details && (
                            <section className="grid grid-cols-2 gap-3 md:grid-cols-4">
                                {[
                                    { label: "Engine",  value: car.details.engine },
                                    { label: "Trans",   value: car.details.trans  },
                                    { label: "Fuel eff.",value: car.details.fuel  },
                                    { label: "Seats",   value: `${car.details.seats} seats` },
                                ].map(({ label, value }) => (
                                    <div key={label} className={`${panel} card-pop reveal py-4 text-center`}>
                                        <div className="text-[10px] font-semibold uppercase tracking-wide text-slate-400">{label}</div>
                                        <div className="mt-1 text-sm font-bold text-slate-800">{value}</div>
                                    </div>
                                ))}
                            </section>
                        )}

                        {/* Monthly + Annual breakdown */}
                        <section className="grid gap-4 md:grid-cols-2">
                            {/* Monthly */}
                            <div className={`${panel} card-pop reveal s2`}>
                                <div className="text-xl font-bold text-slate-900">Monthly Breakdown</div>
                                <div className="mt-4 space-y-2">
                                    {rows.map(({ label, monthly, color, note }) => (
                                        <div key={label} className={`flex items-center justify-between rounded-2xl ${color} px-4 py-3`}>
                                            <div>
                                                <div className="text-sm font-semibold text-slate-700">{label}</div>
                                                {note && <div className="text-[10px] text-slate-400">{note}</div>}
                                            </div>
                                            <div className="text-base font-bold text-slate-900">
                                                {monthly > 0 ? formatRM(monthly) : <span className="text-slate-400 text-sm">—</span>}
                                            </div>
                                        </div>
                                    ))}
                                    <div className="flex items-center justify-between rounded-2xl bg-slate-900 px-4 py-3 text-white">
                                        <div className="font-bold">Total / Month</div>
                                        <div className="text-xl font-black">{formatRM(totalMonthly)}</div>
                                    </div>
                                </div>
                            </div>

                            {/* Annual */}
                            <div className={`${panel} card-pop reveal s3`}>
                                <div className="text-xl font-bold text-slate-900">Annual Breakdown</div>
                                <div className="mt-4 space-y-2">
                                    {rows.map(({ label, annual, color, note }) => (
                                        <div key={label} className={`flex items-center justify-between rounded-2xl ${color} px-4 py-3`}>
                                            <div>
                                                <div className="text-sm font-semibold text-slate-700">{label}</div>
                                                {note && <div className="text-[10px] text-slate-400">{note}</div>}
                                            </div>
                                            <div className="text-base font-bold text-slate-900">
                                                {annual > 0 ? formatRM(annual) : <span className="text-slate-400 text-sm">—</span>}
                                            </div>
                                        </div>
                                    ))}
                                    <div className="flex items-center justify-between rounded-2xl bg-slate-900 px-4 py-3 text-white">
                                        <div className="font-bold">Total / Year</div>
                                        <div className="text-xl font-black">{formatRM(totalAnnual)}</div>
                                    </div>
                                </div>
                            </div>
                        </section>

                        {/* Loan Details */}
                        <div className={`${panel} card-pop reveal s4`}>
                            <div className="text-xl font-bold text-slate-900">Loan Details</div>
                            <p className="mt-1 text-sm text-slate-500">From your What-If Financing Lab settings. Adjust them in the Analysis page.</p>
                            <div className="mt-5 grid gap-3 sm:grid-cols-2 md:grid-cols-3">
                                {[
                                    { label: "Car Price",         value: formatRM(carPrice)           },
                                    { label: "Down Payment",      value: `${formatRM(downPaymentAmt)} (${dp}%)` },
                                    { label: "Financed Amount",   value: formatRM(financedAmt)        },
                                    { label: "Interest Rate",     value: `${rate.toFixed(1)}% p.a.`  },
                                    { label: "Loan Tenure",       value: `${years} years (${years * 12} months)` },
                                    { label: "Total Loan Cost",   value: formatRM(totalLoanCost)      },
                                ].map(({ label, value }) => (
                                    <div key={label} className="rounded-2xl bg-slate-50 px-4 py-3">
                                        <div className="text-xs font-semibold uppercase tracking-wide text-slate-400">{label}</div>
                                        <div className="mt-1 font-bold text-slate-900">{value}</div>
                                    </div>
                                ))}
                            </div>
                            {dp === 0 && (
                                <div className="mt-4 rounded-2xl border border-sky-200 bg-sky-50 px-4 py-3 text-sm text-sky-700">
                                    Full loan — no down payment applied.
                                </div>
                            )}
                            {rate === 0 && (
                                <div className="mt-2 rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
                                    0% interest rate — installment is principal-only.
                                </div>
                            )}
                        </div>

                        {/* Fuel note */}
                        <div className={`${panel} card-pop reveal s4 flex items-start gap-3`}>
                            <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-amber-500" />
                            <p className="text-sm text-slate-600">
                                Fuel cost estimated at {MONTHLY_KM} km/month.
                                Insurance is a first-year estimate (no NCD). Road tax based on engine displacement.
                                Service cost is averaged across two services per year.
                                All figures are estimates — actual costs may vary.
                            </p>
                        </div>

                        <section className="flex flex-wrap gap-3">
                            <button onClick={() => setPage("analysis")} className="btn-animated rounded-full bg-slate-900 px-6 py-3 text-sm font-semibold text-white">Back to Analysis</button>
                            <button onClick={() => setPage("dealerships")} className="btn-animated rounded-full border border-slate-300 bg-white px-6 py-3 text-sm">Find Dealerships</button>
                        </section>
                    </div>
                );
            })()}

        </Shell>
    );
}

export default App;
