import { useLocation } from "react-router-dom";

export default function getValue(key: string): string {
    return new URLSearchParams(useLocation().search).get(key) ?? "";
};