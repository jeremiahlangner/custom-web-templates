(()=>{var n=class{constructor(){}async request(e){let s=new Request(e.url,e);return fetch(s).then(t=>e.headers&&e.headers.Accept==="application/json"?t.json():t)}};})();
