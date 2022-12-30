(()=>{var n=class{constructor(){}async request(e){return fetch(e.url,e).then(t=>e.headers&&e.headers.Accept==="application/json"?t.json():t)}};})();
