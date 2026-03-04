export function normalize(text: string): string {
    if (text.toLowerCase() === "ñ") return "Ñ";    
    return text.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toUpperCase();
}