let _data = {};

self.onMessage((e: MessageEvent<string>) => {
  console.log(e);
  const events = {
    setData: (data) => {
      if (_data == data) return;
      _data = data;
    },
    eval: (statement: string) => {
      /*
       * Notes: 
       *
       * Need to be able to evaluate in local context, or full data context.
       * Local data should just reference a key in the full data context to
       * prevent reseting it.
       */
      return eval('() => { statement }(data)');
    }
  };
});


