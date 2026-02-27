import http from 'k6/http';
import { sleep, check } from 'k6';
import { Trend } from 'k6/metrics';

export let responseTime = new Trend('custom_response_time');

export const options = {
stages: [
    { duration: '1m', target: 10 },
    { duration: '2m', target: 25 },
    { duration: '2m', target: 50 },
    { duration: '2m', target: 75 },
    { duration: '2m', target: 100 },
    { duration: '1m', target: 0 },
],
thresholds: {
    http_req_failed: ['rate<0.02'],
    http_req_duration: ['p(95)<800'],
},
};

const BASE_URL = 'https://api.ecumentis.org';

const userIds = Array.from({ length: 51 }, (_, i) => i + 33);
const learningBlockIds = Array.from({ length: 10 }, (_, i) => i + 1);

export default function () {

const userId = userIds[Math.floor(Math.random() * userIds.length)];
const blockId = learningBlockIds[Math.floor(Math.random() * learningBlockIds.length)];

// LOGIN
let loginRes = http.post(
'https://ecumentis.org/login',
JSON.stringify({
    email: "test@example.com",
    password: "test123"
}),
{ headers: { 'Content-Type': 'application/json' } }
);

check(loginRes, { 'login status 200': (r) => r.status === 200 });
responseTime.add(loginRes.timings.duration);
sleep(1);

//  NEXT QUESTION
let nextRes = http.get(`${BASE_URL}/api/nextQuestion/${userId}`);
check(nextRes, { 'nextQuestion 200': (r) => r.status === 200 });
sleep(1);

// SUBMIT QUIZ
const payload = JSON.stringify({
userId: userId,
math_score: Math.floor(Math.random() * 10) + 1,
language_score: Math.floor(Math.random() * 10) + 1,
science_score: Math.floor(Math.random() * 10) + 1,
social_score: Math.floor(Math.random() * 10) + 1,
tech_score: Math.floor(Math.random() * 10) + 1,
finance_score: Math.floor(Math.random() * 10) + 1,
logic_score: Math.floor(Math.random() * 10) + 1,
});

let diagRes = http.post(
`${BASE_URL}/api/diagnostic/submit`,
payload,
{ headers: { 'Content-Type': 'application/json' } }
);

check(diagRes, { 'diagnostic 200': (r) => r.status === 200 });
sleep(1);

//  LEARNING BLOCK
let blockRes = http.get(`${BASE_URL}/api/learningblocks/${blockId}`);
check(blockRes, { 'learningblock 200': (r) => r.status === 200 });
sleep(1);

//  DASHBOARD
let dashRes = http.get(`${BASE_URL}/api/dashboard/${userId}`);
check(dashRes, { 'dashboard 200': (r) => r.status === 200 });
sleep(1);
}