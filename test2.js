import http from 'k6/http';
import { sleep, check } from 'k6';

export let options = { 
  stages: [
    { duration: '5s', target: 10 },
    { duration: '25s', target: 30 },
    { duration: '5s', target: 10 },
  ],
  thresholds: {
    // 99% of requests must finish within 1000ms.
    http_req_duration: ['p(99) < 2000'],
    http_req_failed: ['rate<0.01'], // http errors should be less than 1%
  },
};

export default function () {
  let homepage = http.get('https://demowebshop.tricentis.com/desktops');  

    check(homepage, {
      'status is 200': (r) => r.status === 200,
    });

    const links = [
      "/build-your-cheap-own-computer", 
      "/build-your-own-computer", 
      "/build-your-own-expensive-computer-2",
      "/desktop-pc-with-cdrw", 
      "/desktop-pc", 
      "/simple-computer"
    ];

  let allProducts = [];
  for (const link of links){
      allProducts.push(link);
  }
  
  // Visit each product page
  for (const product of allProducts) {
    let productLink = "https://demowebshop.tricentis.com" + product;
    let productPage = http.get(productLink);
    //console.log("Visited: " + productLink + ", Status: " + productPage.status);
    check(productPage, {
      'status is 200': (r) => r.status === 200,
    });
  }

  sleep(1);
}