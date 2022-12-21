interface RequestOptions extends RequestInit {
  url: string;
}

export class ApiService {
  async request(params: RequestOptions) {
    const request = new Request(params.url, params);
    return fetch(request).then((res) => {
      console.log(res);
    });
  }
}
