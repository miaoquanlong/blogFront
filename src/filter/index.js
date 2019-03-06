import moment from "moment";

export function momentTime(time, cFormat) {
    if (arguments.length === 0 || !time) {
        return null;
    }
    if (moment(time).isBefore("2000-01-01")) {
        return null;
    }
    const formatter = cFormat || "YYYY-MM-DD HH:mm:ss";
    return moment(time).format(formatter);
}