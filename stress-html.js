import http from 'k6/http';
import { sleep } from 'k6';
import { htmlReport } from "https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js";

export const options = {
vus: 50,
duration: '2m',
};

export default function () {
http.get('https://api.ecumentis.org/api/dashboard/33');
sleep(1);
}

export function handleSummary(data) {
return {
"report.html": htmlReport(data),
};
}