import React, { useEffect, useMemo, useState } from "react";
import {
    AlertTriangle,
    ArrowRight,
    Car,
    CheckCircle2,
    ChevronDown,
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

const SCENARIO_COLORS = {
    red: {
        border: "border-rose-200",
        bg: "from-rose-50 to-rose-100/80",
        text: "text-rose-700",
        sub: "text-rose-500",
        bar: "bg-rose-400",
        expand: "bg-rose-50 border-rose-200 text-rose-800",
    },
    amber: {
        border: "border-amber-200",
        bg: "from-amber-50 to-amber-100/80",
        text: "text-amber-700",
        sub: "text-amber-500",
        bar: "bg-amber-400",
        expand: "bg-amber-50 border-amber-200 text-amber-800",
    },
    emerald: {
        border: "border-emerald-200",
        bg: "from-emerald-50 to-emerald-100/80",
        text: "text-emerald-700",
        sub: "text-emerald-500",
        bar: "bg-emerald-400",
        expand: "bg-emerald-50 border-emerald-200 text-emerald-800",
    },
};

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

const fp = (f) => `https://commons.wikimedia.org/wiki/Special:FilePath/${encodeURIComponent(f)}`;

const CAR_IMAGE_MAP = {
    // ── Perodua ───────────────────────────────────────────
    "Perodua Axia":         fp("2019_Perodua_Axia_1.0_Style_(42).jpg"),
    "Perodua Bezza":        fp("Perodua_Bezza_1.3_Advance_in_Malaysia_(1).jpg"),
    "Perodua Myvi":         fp("Perodua_Myvi_3rd_generation.jpg"),
    "Perodua Ativa":        fp("2021_Perodua_Ativa_H_(Malaysia)_front_view_04.jpg"),
    "Perodua Alza":         fp("2022_Perodua_Alza_AV_GearUp_(Malaysia)_front_view_01.jpg"),
    "Perodua Aruz":         fp("Perodua_Aruz_AV_in_Penang,_Malaysia_(2).jpg"),
    // ── Proton ────────────────────────────────────────────
    "Proton Saga":          fp("2022_Proton_Saga.jpg"),
    "Proton Iriz":          fp("Proton_Iriz_2022_-_Side_profile.jpg"),
    "Proton Persona":       fp("Proton_Persona_Elegance_on_road.jpg"),
    "Proton Exora":         fp("2019_Proton_Exora_Executive_CVT_(6).jpg"),
    "Proton Ertiga":        fp("Proton_Ertiga_(cropped).jpg"),
    "Proton S70":           fp("2024_Proton_S70_(Front).jpg"),
    "Proton X50":           fp("2020_Proton_X50_1.5_TGDi_Flagship_(front_view).png"),
    "Proton X70":           fp("2023_Proton_X70_MC_Front.jpg"),
    "Proton X90":           fp("2021_Proton_X70_1.8_7AT_Executive_white_front_view_in_Brunei.jpg"),
    // ── Toyota ────────────────────────────────────────────
    "Toyota Avanza":        fp("2021_Toyota_Avanza_1.5_G_Toyota_Safety_Sense_(Indonesia)_front_view_03.jpg"),
    "Toyota Vios":          fp("2007_Toyota_Vios_1.5_E_02.jpg"),
    "Toyota Rush":          fp("Toyota_Rush.jpg"),
    "Toyota Raize":         fp("Toyota_Raize_Z.jpg"),
    "Toyota Hilux":         fp("Toyota_Hilux_2024.jpg"),
    "Toyota Corolla Cross": fp("Toyota_Corolla_Cross_1.8_G_2023_(6).jpg"),
    "Toyota Innova Zenix":  fp("2022_Toyota_Kijang_Innova_Zenix_V_(Indonesia)_front_view.jpg"),
    "Toyota Fortuner":      fp("2020_Toyota_Fortuner_2.8_Legender_4WD.jpg"),
    "Toyota Camry":         fp("Toyota_Camry_2.5_V_HEV_Hybrid_2023_(9).jpg"),
    "Toyota Alphard":       fp("2023_Toyota_Alphard_Hybrid_(AH40)_1.jpg"),
    // ── Honda ─────────────────────────────────────────────
    "Honda City Hatchback": fp("2021_Honda_City_Hatchback_RS_1.5_GN5_(20210922).jpg"),
    "Honda City":           fp("2022_Honda_City_1.5_GN2_(20220317)_01.jpg"),
    "Honda WR-V":           fp("2023_Honda_WR-V_RS.jpg"),
    "Honda BR-V":           fp("2022_Honda_BR-V_1.5_E_(front).jpg"),
    "Honda HR-V":           fp("2021_Honda_HR-V_e_HEV_RS.jpg"),
    "Honda Civic":          fp("Civic_wiki.jpg"),
    "Honda ZR-V":           fp("0_Honda_ZR-V_1.jpg"),
    "Honda CR-V":           fp("Honda_CR-V_2.0_i-VTEC_Facelift_front.JPG"),
    "Honda Accord":         fp("Honda_Accord_Executive_(27696905860).jpg"),
    "Honda e:N1":           fp("HONDA_ZR-V_China.jpg"),
};

const getCarImage = (car) =>
    CAR_IMAGE_MAP[car.name] || fp("Perodua_Myvi_3rd_generation.jpg");

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
    const conservativeMonthlyCarCost = Math.max(Math.round(disposableIncome * 0.2), 0);
    const stretchMonthlyCarCost      = Math.max(Math.round(disposableIncome * 0.5), 0);

    const lowBudget        = Math.max(Math.round(conservativeMonthlyCarCost * 60), 12000);
    const highBudget       = Math.max(Math.round(stretchMonthlyCarCost * 60), lowBudget + 8000);
    const safeCarBudgetLow  = Math.round(lowBudget  / 1000) * 1000;
    const safeCarBudgetHigh = Math.round(highBudget / 1000) * 1000;

    const savingsBufferMonths = salary > 0 ? savings / Math.max(expenses + commitments, 1) : 0;
    let score = 35;
    score += Math.min(disposableIncome / 40, 25);
    score += Math.min(savingsBufferMonths * 8, 20);
    score -= Math.min((commitments / Math.max(salary, 1)) * 50, 20);
    const financialHealthScore = Math.max(18, Math.min(92, Math.round(score)));

    const scenarioAPrice = targetCar || Math.max(safeCarBudgetHigh + 30000, 80000);
    const scenarioBPrice = Math.min(Math.max(safeCarBudgetLow, 30000), 100000);

    const recommendedCars = (() => {
        // Step 1: Preferred brand AND strictly within desired price, sorted by price descending
        const brandAndBudget = CAR_CATALOG
            .filter((car) => (form.preferredBrand === "Any" || car.brand === form.preferredBrand) && car.price <= form.desiredCarPrice * 1)
            .sort((a, b) => b.price - a.price); // most expensive first

        if (brandAndBudget.length) return brandAndBudget.slice(0, 3);

        // Step 2: Brand match only, sorted by price descending closest to desired price
        const brandOnly = CAR_CATALOG
            .filter((car) => form.preferredBrand === "Any" || car.brand === form.preferredBrand)
            .filter(car => car.price <= form.desiredCarPrice) // optional: still keep within desired price
            .sort((a, b) => b.price - a.price);

        if (brandOnly.length) return brandOnly.slice(0, 3);

        // Step 3: Any car within desired price, sorted by most expensive first
        return CAR_CATALOG
            .filter((car) => car.price <= form.desiredCarPrice)
            .sort((a, b) => b.price - a.price)
            .slice(0, 3);
    })();

    const fallbackCars = recommendedCars;
    const recommendedDealers = DEALERS.filter((dealer) =>
        form.preferredBrand === "Any" ? true : dealer.brand === form.preferredBrand || dealer.brand === "Used Car"

    );
    const monthlyA = Math.round(scenarioAPrice / 72 + scenarioAPrice * 0.0068 + 190);
    const monthlyB = Math.round(scenarioBPrice / 84 + scenarioBPrice * 0.0055 + 160);

    return {
        disposableIncome,
        conservativeMonthlyCarCost,
        stretchMonthlyCarCost,
        financialHealthScore,
        safeCarBudgetLow,
        safeCarBudgetHigh,
        recommendedMonthlyLow:  Math.round(conservativeMonthlyCarCost / 10) * 10,
        recommendedMonthlyHigh: Math.round(stretchMonthlyCarCost      / 10) * 10,
        scenarioA: {
            label: `Scenario A (${formatRM(scenarioAPrice)})`,
            monthly: monthlyA,
            stress:
                scenarioAPrice <= safeCarBudgetLow
                    ? "LOW"
                    : scenarioAPrice <= safeCarBudgetHigh*0.8
                        ? "MEDIUM"
                        : "HIGH",
        },
        scenarioB: {
            label: `Scenario B (${formatRM(scenarioBPrice)})`,
            monthly: monthlyB,
            stress:
                scenarioBPrice <= safeCarBudgetLow
                    ? "LOW"
                    : scenarioBPrice <= safeCarBudgetHigh*0.8
                        ? "MEDIUM"
                        : "HIGH",
        },
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
    const [showDangerModal, setShowDangerModal] = useState(false);
    const analysis = useMemo(() => calculateAnalysis(form), [form]);

    const [li_years, setLiYears] = useState(5);        // default 5 years
    const [li_rate, setLiRate] = useState(3.5);       // default interest rate
    const [li_cheaperDiff, setLiCheaperDiff] = useState(10000); // default cheaper car diff

    useEffect(() => { saveStored({ page, form }); }, [page, form]);
    useEffect(() => { window.scrollTo({ top: 0, behavior: "instant" }); }, [page, selectedCar]);

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
    const monthlyOwn = emi + running ;

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
                        <button
                            onClick={() => {
                                const salary = Number(form.monthlySalary);
                                const carPrice = Number(form.desiredCarPrice);

                                if (carPrice > salary * 20) {
                                    setShowDangerModal(true);
                                    return;
                                }

                                setPage("analysis");
                            }}
                            className="btn-animated mt-7 inline-flex w-full items-center justify-center gap-2 rounded-full bg-slate-900 px-6 py-3.5 text-sm font-semibold text-white"
                        >
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

                    <div className={`${panel} card-pop reveal s2`}>
                        <div className="flex items-center justify-between">
                            <div className="text-xl font-bold text-slate-900">Monthly Stress Simulator</div>
                            <span className="rounded-full border border-slate-200 px-3 py-1 text-xs text-slate-400">2 scenarios</span>
                        </div>

                        <div className="mt-6 grid grid-cols-2 divide-x divide-slate-100">
                            {[analysis.scenarioA, analysis.scenarioB].map((s, i) => {
                                const isHigh = s.stress === "HIGH";
                                const isMed  = s.stress === "MEDIUM";
                                const amtColor  = isHigh ? "text-rose-600"    : isMed ? "text-amber-600"    : "text-emerald-600";
                                const barColor  = isHigh ? "bg-rose-400"      : isMed ? "bg-amber-400"      : "bg-emerald-400";
                                const pillStyle = isHigh ? "bg-rose-100 text-rose-700" : isMed ? "bg-amber-100 text-amber-700" : "bg-emerald-100 text-emerald-700";
                                const fillPct   = (s.monthly / chartMax) * 100;
                                return (
                                    <div key={s.label} className={`py-2 ${i === 0 ? "pr-8" : "pl-8"}`}>
                                        <div className="flex items-start justify-between gap-2">
                                            <div>
                                                <div className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Scenario {i === 0 ? "A" : "B"}</div>
                                                <div className="mt-0.5 text-xs font-medium text-slate-600">{i === 0 ? "Buying a car in your desired car price" : "Buying a car in your safe car budget"}</div>
                                            </div>
                                            <span className={`rounded-full px-2.5 py-1 text-[10px] font-bold uppercase ${pillStyle}`}>{s.stress}</span>
                                        </div>
                                        <div className={`mt-4 text-4xl font-black ${amtColor}`}>{formatRM(s.monthly)}</div>
                                        <div className="text-xs font-medium text-slate-500">per month</div>
                                        <div className="mt-5 h-1.5 w-full rounded-full bg-slate-200">
                                            <div className={`h-full rounded-full bar-animate ${barColor}`}
                                                style={{ width: `${fillPct}%`, animationDelay: `${200 + i * 150}ms` }} />
                                        </div>
                                        <div className="mt-1.5 flex justify-between text-[10px] font-medium text-slate-400">
                                            <span>RM 0</span><span>{formatRM(chartMax)}</span>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>

                        <div className="mt-6 flex items-center  rounded-2xl bg-slate-50 px-5 py-4">
                            {analysis.scenarioB.monthly < analysis.scenarioA.monthly ? (
                                <>
                                    <span className="text-sm text-slate-500">Choosing B saves you -   </span>
                                    <span className="text-xl font-black text-slate-900">
         {formatRM(analysis.scenarioA.monthly - analysis.scenarioB.monthly)}
                                        <span className="text-sm font-normal text-slate-400"> / month</span>
      </span>
                                </>
                            ) : analysis.scenarioA.monthly < analysis.scenarioB.monthly ? (
                                <>
                                    <span className="text-sm text-slate-500">Scenario A is cheaper — smart decision</span>
                                    <span className="text-xl font-black text-slate-900">
        {formatRM(analysis.scenarioB.monthly - analysis.scenarioA.monthly)}
                                        <span className="text-sm font-normal text-slate-400"> / month</span>
      </span>
                                </>
                            ) : (
                                <>
                                    <span className="text-sm text-slate-500">Both options cost the same</span>
                                    <span className="text-xl font-black text-slate-900">
        {formatRM(analysis.scenarioA.monthly)}
                                        <span className="text-sm font-normal text-slate-400"> / month</span>
      </span>
                                </>
                            )}
                        </div>
                    </div>

                    <div className={`${panel} card-pop reveal s3`}>
                        <div className="inline-flex rounded-full border border-slate-300 bg-white/80 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-600">
                            What-If Financing Lab
                        </div> <br/><br/>
                        <div className="mb-2 text-sm text-slate-700">
                            Experiment with different down payment amounts, interest rates, and loan tenures to understand how each factor impacts your monthly car ownership cost. This helps you find a financing plan that keeps your debt manageable and aligned with your financial capacity.
                        </div> <div className="mb-2 text-sm text-slate-700">
                            The DTI below will change dynamically based on the down payment and interest rate set.
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
                                    <input type="range" min="0" max="10" step="0.1" value={rate} onChange={(e) => setRate(Number(e.target.value))} className="w-full accent-slate-900" />
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

                    <div className="grid md:grid-cols-2 gap-6 items-stretch">

                        {/* ================= DTI PANEL ================= */}
                        <div className={`${panel} card-pop reveal s6`}>
                            <div className="text-xl font-bold text-slate-900 mb-4">
                                💡 Debt-to-Income (DTI) Intelligence
                            </div>

                            {(() => {
                                const monthlyCommitments = parseFloat(form.monthlyCommitments) || 0;
                                const carInstallment = parseFloat(monthlyOwn) || 0;
                                const monthlySalary = parseFloat(form.monthlySalary) || 1;

                                const dti = ((monthlyCommitments + carInstallment) / monthlySalary) * 100;

                                let riskColor = "text-emerald-600";
                                let riskText = "Very Low Risk";
                                let advice =
                                    "Your debt obligations are minimal relative to your income. You have excellent capacity for savings, investments, and unexpected expenses.";

// 20–30%: Low Risk
                                if (dti >= 20 && dti < 30) {
                                    riskColor = "text-emerald-500";
                                    riskText = "Low Risk";
                                    advice =
                                        "Your debt is well-managed and unlikely to affect your monthly cash flow. You can comfortably consider small additional commitments if needed.";
                                }
// 30–40%: Moderate Risk
                                else if (dti >= 30 && dti < 40) {
                                    riskColor = "text-amber-600";
                                    riskText = "Moderate Risk";
                                    advice =
                                        "Your financial commitments are beginning to consume a noticeable portion of your income. While still manageable, taking on additional debt could start limiting your ability to save or respond to emergencies.";
                                }
// 40–50%: High Risk
                                else if (dti >= 40 && dti < 50) {
                                    riskColor = "text-orange-600";
                                    riskText = "High Risk";
                                    advice =
                                        "A significant portion of your income is already dedicated to debt repayments. Adding another large commitment may strain your budget and reduce flexibility in emergencies.";
                                }
// 50–60%: Very High Risk
                                else if (dti >= 50 && dti < 60) {
                                    riskColor = "text-red-600";
                                    riskText = "Very High Risk";
                                    advice =
                                        "More than half of your income is tied to debt obligations. Taking on new loans now could severely impact your financial stability and create stress in monthly cash flow.";
                                }
// 60%+: Critical Risk
                                else if (dti >= 60) {
                                    riskColor = "text-rose-600";
                                    riskText = "Critical Risk";
                                    advice =
                                        "At this level, your income is largely consumed by debt. Additional loans or commitments could lead to serious financial strain and long-term risk.";
                                }

                                return (
                                    <>
                                        <div className="mb-2 text-sm text-slate-700">
                                            <strong>Debt-to-Income (DTI) Concept:</strong><br />
                                            Keep your DTI low so you have enough monthly income left for daily expenses, savings and unexpected costs. Maintaining a low DTI also gives you more flexibility to handle new financial opportunities without stress.                                            <br /><br />
                                            Monthly salary: <strong>RM{monthlySalary.toLocaleString()}</strong><br />
                                            Monthly commitments: <strong>RM{monthlyCommitments.toLocaleString()}</strong><br />
                                            Car installment: <strong>RM{monthlyOwn.toLocaleString()}</strong><br />
                                        </div>

                                        <div className="mb-3 text-sm text-slate-700">
                                            <strong>Your DTI :</strong>{" "}
                                            <span className={`font-bold ${riskColor}`}>
        {dti.toFixed(0)}%
    </span>{" "}
                                             <span className={`font-semibold ${riskColor}`}>{" - " +riskText}</span>
                                        </div>

                                        <div className="mb-3 text-sm text-slate-700">
                                            Intelligent insight 💡 : <em>{advice}</em>
                                        </div>
                                    </>
                                );
                            })()}
                        </div>


                        {/* ================= EMERGENCY FUND PANEL ================= */}
                        <div className={`${panel} card-pop reveal s7`}>
                            <div className="text-xl font-bold text-slate-900 mb-4">
                                🛟 Emergency Fund Intelligence
                            </div>

                            {(() => {
                                const monthlyExpenses = parseFloat(form.monthlyExpenses) || 0;
                                const monthlyCommitment = parseFloat(form.monthlyCommitments) || 0;
                                const currentSavings = parseFloat(form.currentSavings) || 0;

                                const recommendedFund = (monthlyExpenses + monthlyCommitment) * 6;
                                const gap = recommendedFund - currentSavings;

                                let status = "";
                                let insight = "";
                                let color = "text-emerald-600";

                                if (currentSavings >= recommendedFund) {
                                    status = "Excellent Protection";
                                    color = "text-emerald-600";

                                    insight =
                                        "Your emergency savings already meet the recommended six-month safety buffer. This means unexpected situations such as job loss, medical bills, or urgent repairs can be handled without relying on debt.";
                                }
                                else if (currentSavings >= recommendedFund * 0.75) {
                                    status = "Nearly Prepared";
                                    color = "text-lime-600";

                                    insight =
                                        "Your emergency fund is close to the recommended level. With slightly more saving, you will have a strong financial cushion before committing to large financial obligations.";
                                }
                                else if (currentSavings >= recommendedFund * 0.5) {
                                    status = "Moderate Protection";
                                    color = "text-amber-600";

                                    insight =
                                        "You have started building an emergency fund, but it is still below the recommended safety level. Purchasing a car now could slow your progress toward financial stability.";
                                }
                                else if (currentSavings >= recommendedFund * 0.25) {
                                    status = "Low Protection";
                                    color = "text-orange-600";

                                    insight =
                                        "Your emergency savings are limited. Unexpected expenses may create financial pressure, and taking on a new loan could reduce your financial flexibility.";
                                }
                                else {
                                    status = "Critical Risk";
                                    color = "text-rose-600";

                                    insight =
                                        "Your emergency fund is critically low. Without sufficient savings, unexpected events such as job loss or medical emergencies could lead to serious financial strain. It is strongly recommended to build your emergency fund before committing to major purchases.";
                                }

                                return (
                                    <>
                                        <div className="text-sm text-slate-700 mb-3">
                                            <strong>Emergency Fund Concept:</strong>
                                            <br />
                                            Keep at least <strong>6 months of living expenses</strong> as an emergency fund to protect against unexpected events like job loss or medical emergencies.
                                        </div>

                                        <div className="text-sm text-slate-700 mb-2">
                                            Monthly expenses: <strong>RM{monthlyExpenses.toLocaleString()}</strong> <br/>
                                            Monthly commitments: <strong>RM{monthlyCommitment.toLocaleString()}</strong> <br/>
                                            Recommended emergency fund: <strong>RM{recommendedFund.toLocaleString()}</strong> <br/>
                                            Your savings: <strong>RM{currentSavings.toLocaleString()}</strong>
                                        </div>

                                        {currentSavings < recommendedFund && (
                                            <div className="text-sm text-slate-700 mb-4">
                                                Remaining gap: <strong>RM{gap.toLocaleString()}</strong>
                                            </div>
                                        )}

                                        <div className="text-sm text-slate-800 mb-1">
                                            <strong>Your emergency readiness :</strong>
                                            <strong className={`ml-1 ${color}`}> {status}</strong>
                                        </div>

                                        <div className="text-sm text-slate-700">
                                            Intelligent insight 💡 : {insight}
                                        </div>
                                    </>
                                );
                            })()}
                        </div>

                    </div>

                    <section className="grid gap-4 md:grid-cols-3">
                        {analysis.recommendedCars.map((car, i) => {
                            const brandFit = form.preferredBrand === "Any" || car.brand === form.preferredBrand;
                            return (
                                <div key={car.name}
                                    onClick={() => { setSelectedCar(car); setPage("car-detail"); }}
                                    className={`${panel} card-pop reveal cursor-pointer hover:shadow-[0_24px_64px_rgba(15,23,42,0.14)] hover:-translate-y-1 transition-transform overflow-hidden`}
                                    style={{ animationDelay: `${80 + i * 90}ms` }}>
                                    <div className="-mx-6 -mt-6 mb-4 overflow-hidden rounded-t-3xl">
                                        <img
                                            src={getCarImage(car)}
                                            alt={car.name}
                                            className="h-36 w-full object-cover transition-transform duration-500 hover:scale-105"
                                        />
                                    </div>
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

                    {/* Report Header */}
                    <div className={`${panel} card-pop reveal s1`}>
                        <h1 className="text-4xl font-black md:text-5xl">Your smartest next move</h1>
                        <p className="mt-3 max-w-3xl text-slate-600">{analysis.recommendationText}</p>
                    </div>

                    <section className="grid gap-4 md:grid-cols-[1.2fr_0.8fr]">

                        {/* Left Column: Recommendations & Cars */}
                        <div className={`${panel} card-pop reveal s2 space-y-4`}>

                            {/* Recommendation snapshot */}
                            <div>
                                <div className="text-2xl font-bold mb-2">Recommendation snapshot</div>
                                <div className="rounded-2xl bg-slate-900 p-5 text-white">
                                    <div className="text-xs uppercase tracking-[0.16em] text-slate-300">Safe car budget</div>
                                    <div className="mt-1 text-3xl font-black">
                                        {formatRM(analysis.safeCarBudgetLow)} – {formatRM(analysis.safeCarBudgetHigh)}
                                    </div>
                                </div>

                                <div className="mt-4 grid gap-3 md:grid-cols-2">
                                    <div className="rounded-2xl border border-slate-200 bg-white p-4">
                                        <div className="text-sm text-slate-500">Recommended monthly</div>
                                        <div className="mt-1 text-xl font-semibold">
                                            {formatRM(analysis.recommendedMonthlyLow)} – {formatRM(analysis.recommendedMonthlyHigh)}
                                        </div>
                                    </div>
                                    <div className="rounded-2xl border border-slate-200 bg-white p-4 flex items-start justify-between">
                                        <div className="flex flex-col">
                                            <div className="text-sm text-slate-500">Financial score</div>
                                            <div className="mt-1 text-xl font-semibold">{analysis.financialHealthScore}/100</div>
                                        </div>
                                        <ScoreRing score={analysis.financialHealthScore} />
                                    </div>
                                </div>
                            </div>

                            {/* Recommended cars (side by side) */}
                            <div>
                                <div className="text-l font-bold mb-2">Recommended Cars</div>
                                <div className="flex gap-1 overflow-x-auto py-2">
                                    {analysis.recommendedCars.map((car) => {
                                        const brandFit = form.preferredBrand === "Any" || car.brand === form.preferredBrand;
                                        return (
                                            <div key={car.name} className="min-w-[280px] rounded-2xl border border-slate-200 bg-white p-1 flex-shrink-0">
                                                <div className="h-30 overflow-hidden rounded-xl">
                                                    <img
                                                        src={getCarImage(car)}
                                                        alt={car.name}
                                                        className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
                                                    />
                                                </div>
                                                <div className="flex items-center justify-between mt-2">
                                                    <div className="text-xs uppercase tracking-[0.16em] text-slate-500">{car.brand}</div>
                                                    <div className={`rounded-full px-2.5 py-1 text-[11px] font-semibold ${brandFit ? "bg-emerald-100 text-emerald-700" : "bg-amber-100 text-amber-700"}`}>
                                                        {brandFit ? "Brand Match" : "Alt Option"}
                                                    </div>
                                                </div>
                                                <div className="mt-2 text-lg font-bold">{car.name}</div>
                                                <div className="text-sm text-slate-500">{car.type}</div>
                                                <div className="mt-2 text-lg font-semibold text-slate-900">{formatRM(car.price)}</div>

                                                {car.details && (
                                                    <div className="mt-2 grid grid-cols-2 gap-2">
                                                        {[
                                                            { label: "Engine",  value: car.details.engine },
                                                            { label: "Trans",   value: car.details.trans },
                                                            { label: "Fuel",    value: car.details.fuel },
                                                            { label: "Seats",   value: `${car.details.seats} seats` },
                                                        ].map(({ label, value }) => (
                                                            <div key={label} className="rounded-xl bg-slate-50 px-2 py-1">
                                                                <div className="text-[10px] font-semibold uppercase tracking-wide text-slate-400">{label}</div>
                                                                <div className="mt-0.5 text-xs font-semibold text-slate-700">{value}</div>
                                                            </div>
                                                        ))}
                                                    </div>
                                                )}

                                                {/* Fuel info */}
                                                {(() => {
                                                    const fr = calcMonthlyFuelCost(car, form.budi95Eligible);
                                                    if (!fr) return (
                                                        <div className="mt-2 rounded-xl border border-slate-200 bg-slate-100 px-2 py-1">
                                                            <div className="text-[10px] font-semibold uppercase tracking-wide text-slate-400">Monthly Fuel</div>
                                                            <div className="mt-0.5 text-sm font-bold text-slate-500">Electric — no fuel</div>
                                                        </div>
                                                    );
                                                    return (
                                                        <div className="mt-2 rounded-xl border border-sky-200 bg-sky-50 px-2 py-1">
                                                            <div className="text-[10px] font-semibold uppercase tracking-wide text-sky-500">Est. Monthly Fuel</div>
                                                            <div className="mt-0.5 text-sm font-bold text-sky-700">
                                                                RM {fr.cost.toFixed(2)}
                                                                <span className="ml-1 text-[10px] font-normal text-sky-500">~{fr.liters}L / {MONTHLY_KM} km</span>
                                                            </div>
                                                        </div>
                                                    );
                                                })()}

                                                <div className="mt-2 text-center text-[10px] font-semibold uppercase tracking-wide text-slate-400">
                                                    Full financial details available in analysis
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>

                            {/* Suggested Actions */}
                            <div className="mt-4 space-y-2">
                                {["Visit nearby dealerships", "Compare top models", "Plan emergency buffer"].map((x, i) => (
                                    <div key={x} className="reveal flex items-center gap-2 rounded-2xl bg-slate-50 p-3 text-slate-700" style={{ animationDelay: `${300 + i * 80}ms` }}>
                                        <CheckCircle2 className="h-4 w-4 text-emerald-500" /> {x}
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Right Column: Profile Recap */}
                        <div className={`${panel} card-pop reveal s3`}>
                            <div className="text-2xl font-bold">Your profile recap</div>
                            <div className="mt-4 space-y-3">
                                {[
                                    ["Monthly salary",      form.monthlySalary,      Landmark],
                                    ["Current savings",     form.currentSavings,     Wallet],
                                    ["Monthly commitments", form.monthlyCommitments, ClipboardList],
                                    ["Desired car target",  form.desiredCarPrice || "Not set", Car],
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

                    {/* Action Buttons */}
                    <section className="flex flex-wrap gap-3">
                        <button onClick={() => setPage("dealerships")} className="btn-animated rounded-full bg-slate-900 px-6 py-3 text-sm font-semibold text-white">
                            Back to Dealership Locator
                        </button>
                        <button onClick={() => setPage("input")} className="btn-animated rounded-full border border-slate-300 bg-white px-6 py-3 text-sm">
                            Re-run Analysis
                        </button>
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

                // ── Life Impact Simulator calculations ─────────────────────
                const li_salary = Number(form.monthlySalary || 0);
                const li_expenses = Number(form.monthlyExpenses || 0);
                const li_commitments = Number(form.monthlyCommitments || 0);

// Scenario A: buy THIS car — monthly savings left over
                const li_freeCash_A = Math.max(li_salary - li_expenses - li_commitments - totalMonthly, 0);
                const li_savings_A = Math.round(li_freeCash_A * 60);

// Scenario B: buy a car that is RM15,000 cheaper (same dp%, rate, tenure)
                const li_cheaperPrice = Math.max(carPrice - 15000, 5000);
                const li_cheaperDown = Math.round(li_cheaperPrice * (dp / 100));
                const li_cheaperFin = Math.max(li_cheaperPrice - li_cheaperDown, 0);
                const li_cheaperEmi = Math.round(
                    (li_cheaperFin * (1 + (rate / 100) * years)) / Math.max(years * 12, 1)
                );
                const li_cheaperIns = Math.round(calcAnnualInsurance(li_cheaperPrice) / 12);
// Fuel, road tax, service assumed similar for a comparable car
                const li_totalB = li_cheaperEmi + monthlyFuel + li_cheaperIns + monthlyRT + monthlySvc;
                const li_freeCash_B = Math.max(li_salary - li_expenses - li_commitments - li_totalB, 0);
                const li_savings_B = Math.round(li_freeCash_B * 60);
                const li_monthlyDiff = Math.max(li_freeCash_B - li_freeCash_A, 0);

// Scenario C: invest scenario-B free cash at 7% p.a. (ASB / unit trust) for 60 months
                const li_mr = 0.07 / 12; // monthly rate
                const li_savings_C = li_freeCash_B > 0 ? Math.round(li_freeCash_B * ((Math.pow(1 + li_mr, 60) - 1) / li_mr)) : 0;

                const li_max = Math.max(li_savings_A, li_savings_B, li_savings_C, 1);

                const li_pct_B = li_savings_A > 0 ? `+${Math.round(((li_savings_B - li_savings_A) / li_savings_A) * 100)}% vs this car` : li_savings_B > 0 ? "More savings" : "Similar";
                const li_pct_C = li_savings_A > 0 ? `+${Math.round(((li_savings_C - li_savings_A) / li_savings_A) * 100)}% vs this car` : li_savings_C > 0 ? "Best outcome" : "Similar";

                const li_expA = [
                    "You spend a lot on this car (high monthly payment + insurance + maintenance).",
                    "Because of that, you can save very little each month.",
                    ``,
                    `Monthly saving: ${formatRM(li_freeCash_A)}`,
                    `5 years = 60 months → ${formatRM(li_freeCash_A)} × 60 = ${formatRM(li_savings_A)}`,
                    `Result: Your total savings after 5 years = ${formatRM(li_savings_A)}`,
                ].join("\n");

                const li_expB = [
                    `You spend less on the car (lower monthly payment of ${formatRM(li_cheaperEmi)}/mo),`,
                    "allowing you to save more each month.",
                    ``,
                    `Monthly saving: ${formatRM(li_freeCash_B)}`,
                    `5 years → ${formatRM(li_freeCash_B)} × 60 = ${formatRM(li_savings_B)}`,
                    `Result: Your total savings after 5 years = ${formatRM(li_savings_B)}`,
                ].join("\n");

                const li_expC = [
                    "The extra money you saved from buying a cheaper car, is invested instead of spent.",
                    ``,
                    `Extra money: ${formatRM(li_freeCash_B)}/month`,
                    "Invested at 7% p.a. growth → total = ${formatRM(li_savings_C)}",
                    `Result: Your total wealth after 5 years = ${formatRM(li_savings_C)}`,
                ].join("\n");


                return (
                    <div className="space-y-6">
                        {/* Header */}
                        <div className={`${panel} card-pop reveal s1 overflow-hidden p-0`}>
                            {/* Hero image */}
                            <div className="relative h-56 w-full overflow-hidden rounded-t-3xl md:h-72">
                                <img
                                    src={getCarImage(car)}
                                    alt={car.name}
                                    className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                                <button onClick={() => setPage("analysis")}
                                        className="btn-animated absolute left-4 top-4 inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/20 px-4 py-2 text-sm font-medium text-white backdrop-blur-md">
                                    ← Back to Analysis
                                </button>
                                <div className="absolute bottom-5 left-6 right-6">
                                    <div className="text-xs font-semibold uppercase tracking-widest text-white/70">{car.brand} · {car.type}</div>
                                    <h1 className="mt-1 text-3xl font-black text-white md:text-4xl">{car.name}</h1>
                                </div>
                            </div>
                            {/* Price + Monthly */}
                            <div className="flex flex-wrap items-center justify-between gap-4 p-6">
                                <div>
                                    <div className="text-sm text-slate-500">Retail price</div>
                                    <div className="mt-1 text-3xl font-bold text-slate-900">{formatRM(carPrice)}</div>
                                </div>
                                <div className="rounded-2xl bg-slate-900 px-6 py-4 text-white">
                                    <div className="text-xs uppercase tracking-widest text-slate-300">Payment per month</div>
                                    <div className="mt-1 text-4xl font-black">{formatRM(monthlyEmi)}</div>
                                    <div className="mt-1 text-s text-slate-400">
                                        This is <strong>{((monthlyEmi / analysis.disposableIncome) * 100).toFixed(1)}%</strong> of your monthly income
                                    </div>
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
                                    {/* Total */}
                                    <div className="flex flex-col rounded-2xl bg-slate-900 px-4 py-3 text-white">
                                        <div className="flex justify-between items-center">
                                            <div className="font-bold">Total / Month</div>
                                            <div className="text-xl font-black">{formatRM(totalMonthly)}</div>
                                        </div>
                                        {/* Percentage of salary */}
                                        <div className="mt-1 text-xs text-slate-300">
                                            This is <strong>{((totalMonthly / analysis.disposableIncome) * 100).toFixed(1)}%</strong> of your monthly income
                                        </div>
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

                        <div className={`${panel} card-pop reveal s8`}>
                            <div className="text-xl font-bold text-slate-900 mb-4">💡 Lifestyle Impact Meter</div>

                            {(() => {
                                // Parse inputs safely
                                const salary = parseFloat(form.monthlySalary) || 1;
                                const expenses = parseFloat(form.monthlyExpenses) || 0;
                                const commitments = parseFloat(form.monthlyCommitments) || 0;
                                const carInstallment = parseFloat(totalMonthly) || 0;

                                // Calculate leftover after all outflows
                                const leftover = salary - (expenses + commitments + carInstallment);
                                const leftoverPct = (leftover / salary) * 100;

                                // Determine lifestyle label and AI-style advice
                                let label = "";
                                let colorClass = "text-emerald-600";
                                let advice = "";

                                const leftoverPctt = leftover / salary;

                                if (leftoverPctt >= 0.55) {
                                    label = "Very Comfortable";
                                    colorClass = "text-emerald-600";
                                    advice = "You have a strong financial buffer. Your income comfortably covers all expenses and debts, allowing you to save, invest, or enjoy lifestyle choices without stress.";
                                } else if (leftoverPctt >= 0.35) {
                                    label = "Comfortable";
                                    colorClass = "text-lime-800";
                                    advice = "Your leftover cash is healthy. You can manage unexpected costs and still have room for savings or discretionary spending, though careful planning is always good.";
                                } else if (leftoverPctt >= 0.20) {
                                    label = "Tight";
                                    colorClass = "text-amber-600";
                                    advice = "Your leftover cash is limited. Avoid taking new debts or unnecessary expenses, and try to boost savings to maintain financial stability.";
                                } else {
                                    label = "Financial Stress";
                                    colorClass = "text-rose-600";
                                    advice = "Your leftover is critically low. Any unexpected expense or additional debt could strain your budget. Immediate attention is required to reduce commitments and build a buffer.";
                                }

                                // Bar visual for leftover
                                const barWidth = Math.max(0, Math.min(leftoverPct, 100)); // 0-100%
                                const barColor =
                                    leftover > 1500 ? "bg-emerald-400" : leftover > 700 ? "bg-amber-400" : "bg-rose-400";

                                return (
                                    <>
                                        <div className="mb-2 text-sm text-slate-700">
                                            This meter helps you understand how your current expenses, commitments, and car payments
                                            affect your monthly financial comfort.
                                        </div>

                                        {/* Visual bar */}
                                        <div className="mt-2 w-full h-3 rounded-full bg-slate-200">
                                            <div
                                                className={`h-full rounded-full ${barColor} bar-animate`}
                                                style={{ width: `${barWidth}%` }}
                                            />
                                        </div>

                                        <div className={`mt-2 text-sm font-semibold ${colorClass}`}>
                                            Lifestyle : {label}
                                        </div>

                                        <div className="mt-2 text-s text-slate-800">
                                            Intelligent Insight 💡 :  {advice}
                                        </div><br />
                                        <div className="mt-2 text-xs text-slate-600">
                                            Breakdown:<br />
                                            Remaining = Salary − ( Expenses + Commitments + Car Installment )<br />
                                            = RM{salary.toLocaleString()} − ( RM{expenses.toLocaleString()} + RM{commitments.toLocaleString()} + RM{carInstallment.toLocaleString()} )<br />
                                            Remaining : RM{leftover.toLocaleString()} ({leftoverPct.toFixed(0)}% of your salary)
                                        </div>
                                    </>
                                );
                            })()}
                        </div>

                        <div className={`${panel} card-pop reveal s9`}>
                            <div className="text-xl font-bold text-slate-900 mb-4">🛡️ Financial Safety Score
                            </div>
                            <div className="text-sm text-slate-700 mb-2">
                                This score evaluates your financial safety based on debt, savings, leftover cash, and loan tenure.
                            </div>
                            {(() => {
                                // --- Parse Inputs ---
                                const monthlySalary = parseFloat(form.monthlySalary) || 1;
                                const monthlyExpenses = parseFloat(form.monthlyExpenses) || 0;
                                const monthlyCommitments = parseFloat(form.monthlyCommitments) || 0;
                                const carInstallment = parseFloat(monthlyOwn) || 0;
                                const currentSavings = parseFloat(form.currentSavings) || 0;
                                const loanTenureYears = parseFloat(form.loanTenure) || 5;

                                // --- Key Metrics ---
                                const leftover = monthlySalary - (monthlyExpenses + monthlyCommitments + carInstallment);
                                const leftoverPct = Math.max((leftover / monthlySalary) * 100, 0);
                                const recommendedFund = (monthlyExpenses + monthlyCommitments) * 6;
                                const savingsPct = Math.min((currentSavings / recommendedFund) * 100, 100);
                                const dti = ((monthlyCommitments + carInstallment) / monthlySalary) * 100;

                                // --- Score Metrics ---
                                let dtiScore = 100;
                                if (dti >= 30 && dti < 40) dtiScore = 80;
                                else if (dti >= 40 && dti < 50) dtiScore = 50;
                                else if (dti >= 50) dtiScore = 20;

                                const leftoverScore = Math.min(Math.max(leftoverPct, 0), 100);
                                const tenureScore = loanTenureYears <= 3 ? 100 : loanTenureYears <= 5 ? 80 : 60;

                                const financialScore = Math.round(
                                    dtiScore * 0.3 + savingsPct * 0.3 + leftoverScore * 0.3 + tenureScore * 0.1
                                );

                                // --- Status ---
                                let status = "";
                                let statusColor = "text-emerald-600";
                                let advice = "";

                                if (financialScore >= 80) {
                                    status = "Safe Purchase";
                                    advice = "Your finances are in excellent shape. You can comfortably afford this car while still maintaining strong savings, emergency funds, and flexibility for unexpected expenses.";
                                    statusColor = "text-emerald-600"; // Green
                                } else if (financialScore >= 60) {
                                    status = "Moderate Risk";
                                    advice = "Your finances are decent, but some areas like savings, leftover cash, or DTI could be improved. You can afford this car, but monitor your budget and avoid taking on additional debt.";
                                    statusColor = "text-amber-600"; // Amber
                                } else if (financialScore >= 40) {
                                    status = "High Risk";
                                    advice = "A significant portion of your income is already committed to expenses and debt. Purchasing this car could strain your monthly cash flow, reduce your ability to save, and limit financial flexibility during emergencies.";
                                    statusColor = "text-orange-600"; // Orange
                                } else {
                                    status = "Critical Risk";
                                    advice = "Your financial situation is under severe stress. Taking on this car loan could jeopardize your stability, increase long-term debt risk, and leave you vulnerable to unexpected costs. Immediate financial review is highly recommended.";
                                    statusColor = "text-rose-600"; // Red
                                }

                                // --- Donut Settings ---
                                const radius = 40;
                                const strokeWidth = 10;
                                const circumference = 2 * Math.PI * radius;
                                const offset = circumference * (1 - financialScore / 100);

                                return (
                                    <>
                                        {/* Horizontal Layout */}
                                        <div className="flex items-center mb-4">
                                            {/* Donut */}
                                            <div className="relative w-24 h-24 flex-shrink-0">
                                                <svg width="100%" height="100%" viewBox="0 0 120 120">
                                                    {/* Background Circle */}
                                                    <circle
                                                        cx="60"
                                                        cy="60"
                                                        r={radius}
                                                        stroke="#e2e8f0"
                                                        strokeWidth={strokeWidth}
                                                        fill="white"
                                                    />
                                                    {/* Score Arc */}
                                                    <circle
                                                        cx="60"
                                                        cy="60"
                                                        r={radius}
                                                        stroke="currentColor"
                                                        strokeWidth={strokeWidth}
                                                        strokeDasharray={circumference}
                                                        strokeDashoffset={offset}
                                                        strokeLinecap="round"
                                                        className={`${statusColor}`}
                                                        fill="none"
                                                        style={{ transition: "stroke-dashoffset 0.8s ease" }}
                                                    />
                                                </svg>
                                                {/* Center Number */}
                                                <div className="absolute inset-0 flex items-center justify-center">
                                                    <div className="text-lg font-bold text-slate-900">{financialScore}</div>
                                                </div>
                                            </div>

                                            {/* Description + Status */}
                                            <div className="ml-4 flex-1">

                                                <div className={`text-m font-semibold ${statusColor}`}>Status: {status}</div>
                                                <div className="text-m text-slate-700 mt-1">
                                                    Intelligent Insight 💡 : <em>{advice}</em>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Breakdown */}
                                        <div className="mt-2 text-xs text-slate-500">
                                            📊 Breakdown: <br />
                                            DTI Score: {dtiScore}/100 ({dti.toFixed(0)}% DTI) <br />
                                            Savings Score: {savingsPct.toFixed(0)}/100 (Saved RM{currentSavings.toLocaleString()} / Recommended RM{recommendedFund.toLocaleString()}) <br />
                                            Leftover Score: {leftoverScore.toFixed(0)}/100 (Remaining RM{leftover.toLocaleString()} / {leftoverPct.toFixed(0)}%) <br />
                                            Loan Tenure Score: {tenureScore}/100 ({loanTenureYears} years)
                                        </div>
                                    </>
                                );
                            })()}
                        </div>

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

                        {/* Life Impact Simulator */}

                        <div className={`${panel} card-pop reveal s5`}>
                            <div className="flex items-center gap-3">
                                <span className="inline-flex rounded-2xl bg-emerald-100 p-2.5 text-emerald-600">
                                    <TrendingUp className="h-5 w-5" />
                                </span>
                                <div>
                                    <div className="text-2xl font-extrabold text-slate-900">Life Impact Simulator</div>
                                    <div className="text-sm text-slate-500">5-year savings projection based on your choice today</div>
                                </div>
                            </div>

                            <p className="mt-5 text-sm text-slate-600 leading-relaxed">
                                Your car decision today shapes your financial future. Compare three paths and see how much you could save over the next 5 years.
                            </p>

                            <div className="space-y-4 rounded-2xl bg-white p-4 border border-slate-200">

                            </div>

                            {/* Visual proportion bars */}
                            <div className="mt-5 space-y-3 rounded-2xl bg-slate-50 p-4 border border-slate-200">
                                <div className="text-xs font-semibold uppercase tracking-wide text-slate-400 mb-1">5-Year Savings Comparison</div>
                                {[
                                    { label: "Buy this car",          amount: li_savings_A, bar: "bg-rose-400"    },
                                    { label: "RM15k cheaper car",     amount: li_savings_B, bar: "bg-amber-400"   },
                                    { label: "Invest free cash (7%)", amount: li_savings_C, bar: "bg-emerald-400" },
                                ].map(({ label, amount, bar }) => (
                                    <div key={label} className="space-y-1">
                                        <div className="flex items-center justify-between text-xs text-slate-600">
                                            <span>{label}</span>
                                            <span className="font-semibold">{formatRM(amount)}</span>
                                        </div>
                                        <div className="h-2.5 w-full overflow-hidden rounded-full bg-slate-200">
                                            <div
                                                className={`h-full rounded-full bar-animate ${bar}`}
                                                style={{ width: `${(amount / li_max) * 100}%` }}
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="mt-6 grid gap-4 md:grid-cols-3">
                                <ScenarioCard
                                    title="🚗 Buy this car"
                                    amount={li_savings_A}
                                    changeText={li_savings_A > 0 ? `${formatRM(li_freeCash_A)}/mo free cash` : "No savings margin"}
                                    color="red"
                                    explanation={li_expA}
                                />
                                <ScenarioCard
                                    title="🚙 RM15k Cheaper Car"
                                    amount={li_savings_B}
                                    changeText={li_pct_B}
                                    color="amber"
                                    explanation={li_expB}
                                />
                                <ScenarioCard
                                    title="💰 Invest Free Cash (7%)"
                                    amount={li_savings_C}
                                    changeText={li_pct_C}
                                    color="emerald"
                                    explanation={li_expC}
                                />
                            </div>

                            <p className="mt-5 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-600 leading-relaxed">
                                Figures based on your profile: {formatRM(li_salary)}/mo salary, {formatRM(li_expenses + li_commitments)}/mo outgoings.
                                Cheaper car scenario uses same {dp}% down, {rate}% rate, {years}-year tenure. Investment return assumes 7% p.a.
                                <strong className="text-slate-900"> Your choices today shape your financial future.</strong>
                            </p>
                        </div>


                        {/* Action Buttons */}
                        <section className="flex flex-wrap gap-3">
                            <button onClick={() => setPage("analysis")} className="btn-animated rounded-full bg-slate-900 px-6 py-3 text-sm font-semibold text-white">Back to Analysis</button>
                            <button onClick={() => setPage("dealerships")} className="btn-animated rounded-full border border-slate-300 bg-white px-6 py-3 text-sm">Find Dealerships</button>
                        </section>
                    </div>
                );
            })()}

            {/* ── DANGER MODAL ──────────────────────────────── */}
            {showDangerModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4"
                     onClick={() => setShowDangerModal(false)}>
                    {/* Backdrop */}
                    <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" />

                    {/* Card */}
                    <div className="reveal-scale relative w-full max-w-sm rounded-3xl border border-white/70 bg-white/95 p-7 shadow-[0_32px_80px_rgba(15,23,42,0.22)] backdrop-blur-xl"
                         onClick={(e) => e.stopPropagation()}>

                        {/* Icon */}
                        <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-rose-50 border border-rose-100">
                            <AlertTriangle className="h-7 w-7 text-rose-500" />
                        </div>

                        {/* Heading */}
                        <h2 className="text-center text-xl font-black text-slate-900">Financial Risk Detected</h2>
                        <p className="mt-2 text-center text-sm text-slate-500 leading-relaxed">
                            This car price exceeds <span className="font-semibold text-slate-700">20× your monthly salary</span>. Taking on this loan may put serious strain on your finances.
                        </p>

                        {/* Divider */}
                        <div className="my-5 h-px bg-slate-100" />

                        {/* Tips */}
                        <ul className="space-y-2.5 text-sm text-slate-600">
                            {[
                                "Consider a car within your safe budget range.",
                                "A lower loan reduces monthly stress significantly.",
                                "You can still proceed — but plan carefully.",
                            ].map((tip) => (
                                <li key={tip} className="flex items-start gap-2.5">
                                    <span className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-rose-100 text-rose-600 text-[10px] font-bold">!</span>
                                    {tip}
                                </li>
                            ))}
                        </ul>

                        {/* Actions */}
                        <div className="mt-6 flex flex-col gap-2.5">
                            <button
                                onClick={() => { setShowDangerModal(false); setPage("analysis"); }}
                                className="btn-animated w-full rounded-full bg-rose-500 py-3 text-sm font-semibold text-white">
                                Proceed Anyway
                            </button>
                            <button
                                onClick={() => setShowDangerModal(false)}
                                className="btn-animated w-full rounded-full border border-slate-200 bg-white py-3 text-sm text-slate-700">
                                Go Back & Adjust
                            </button>
                        </div>
                    </div>
                </div>
            )}

        </Shell>
    );
}
{/* ScenarioCard Component */}
function ScenarioCard({ title, amount, changeText, color, explanation, recommended }) {
    const [show, setShow] = React.useState(false);
    const c = SCENARIO_COLORS[color] || SCENARIO_COLORS.emerald;

    return (
        <div
            onClick={() => setShow(!show)}
            className={`card-pop reveal rounded-3xl border ${c.border} bg-gradient-to-b ${c.bg} px-5 py-6 cursor-pointer`}
        >
            <div className={`text-sm font-semibold text-center ${c.text}`}>{title}</div>
            <div className={`mt-3 text-3xl font-extrabold text-center ${c.text}`}>{formatRM(amount)}</div>
            <div className={`mt-1 text-[11px] font-bold text-center uppercase tracking-widest ${c.sub} opacity-70`}>saved</div>
            <div className={`mt-1 text-xs font-medium text-center ${c.sub}`}>{changeText}</div>

            {recommended && (
                <div className="mt-3 flex justify-center">
                    <div className="inline-flex items-center gap-1 rounded-full bg-amber-200/80 px-3 py-1 text-xs font-semibold text-amber-800">
                        <CheckCircle2 className="h-3 w-3" /> Recommended
                    </div>
                </div>
            )}

            <div className={`mt-4 flex items-center justify-center gap-1.5 ${c.sub}`}>
                <span className="text-[11px] font-semibold">{show ? "Hide breakdown" : "See breakdown"}</span>
                <ChevronDown className={`h-3.5 w-3.5 transition-transform duration-300 ${show ? "rotate-180" : ""}`} />
            </div>

            <div className={`expand-panel${show ? " open" : ""} mt-2`}>
                <div>
                    <div className={`rounded-2xl border ${c.expand} p-3 text-left text-sm whitespace-pre-line leading-relaxed`}>
                        {explanation}
                    </div>
                </div>
            </div>
        </div>
    );
}
export default App;
