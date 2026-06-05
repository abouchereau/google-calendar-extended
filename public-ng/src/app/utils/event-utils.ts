export class EventUtils {

    static nameAbrev(name: string): string {
        if (!name) return "";
        const parts = name.split(" ");
        if (parts.length === 1) return name;
        return parts[0] + " " + parts[1].charAt(0) + ".";
    }
}