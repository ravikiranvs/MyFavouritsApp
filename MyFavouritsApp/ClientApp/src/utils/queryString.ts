export default function getValue(key: string): string {
    return new URLSearchParams(window.location.search).get(key) ?? "";
};