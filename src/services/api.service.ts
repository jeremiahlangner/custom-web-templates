interface RequestOptions extends RequestInit {
  url: string;
}

export class ApiService {
  constructor() {
    // register service worker and execute requests in sw context?
    // requires https; todo: gen certs
  }

  async request(params: RequestOptions) {
    const request = new Request(params.url, params);
    return fetch(request).then((res) => {
      if (params.headers && params.headers['Accept'] === 'application/json')
        return res.json();
      return res;
    });
  }
}
