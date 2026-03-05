export function normalize(text) {
    if (text.toLowerCase() === "ñ")
        return "Ñ";
    return text.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toUpperCase();
}
