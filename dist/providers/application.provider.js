(()=>{var s=class{get app(){return this._app}set app(t){s._app=t,window.vcdcApp=t}getByPath(t,n){let r=n.split(".");for(let e of r){if(!t[e])return;t=t[e]}return t}},a=s;a._app={},a._data={};})();
