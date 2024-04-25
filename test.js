import http from 'k6/http';
import { sleep, check } from 'k6';
export const options = {
  stages: [
    { duration: '5s', target: 5 },
    { duration: '1m', target: 30 },
    { duration: '5s', target: 5 },
  ],
  thresholds: {
    // 99% of requests must finish within 1000ms.
    http_req_duration: ['p(99) < 1000'],
  },
};
export default function () {
  const page = http.get('http://test.k6.io');

  check(page, {
    'status is 200': (r) => r.status === 200,
  });

  //console.log(page.body);

  sleep(1);
}
