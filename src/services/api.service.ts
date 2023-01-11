interface RequestOptions extends RequestInit {
  url: string;
}

export class ApiService {
  constructor() {
    // register service worker and execute requests in sw context?
    // requires https; todo: gen certs
    // is "fetch" the best choice?
  }

  async request(params: RequestOptions) {
    return fetch(params.url, params).then((res) => {
      if (params.headers && params.headers['Accept'] === 'application/json')
        return res.json();
      return res;
    });
  }
}
