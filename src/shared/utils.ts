export function normalize(text: string): string {
    return text
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .toUpperCase();
}

export function keyCodeToLetter(code: string): string {
    if (code === "Semicolon") return "Ñ";
    if (code.startsWith("Key")) return code.replace("Key", "");
    return "";
}