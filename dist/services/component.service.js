(()=>{var r=class{static async getProvider(s){return await r._providers[s]}static async getService(s){return console.log(r._services),await r._services[s]}static registerServices(s){for(let i in s)this.registerService(i,s[i])}static registerService(s,i){r._services[s]=i}},t=r;t._providers={Application:Promise.resolve(window.vcdc)},t._services={};var e=class{constructor(){this._hashes=[];t.getProvider("Application").then(s=>{this._application=s})}hash(){let s="";for(;this._hashes.find(i=>i==s);)s=(Math.random()+1).toString(36).substring(7);return this._hashes.push(s),s}delete(s){}insert(s){}};})();
