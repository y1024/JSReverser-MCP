globalThis.window = globalThis;
globalThis.self = globalThis;
globalThis.global = globalThis;
globalThis.document ??= {cookie: "", location: {href: ""}};
globalThis.navigator ??= {userAgent: "js-reverse-mcp"};
globalThis.location ??= {href: ""};
globalThis.atob ??= (value) => Buffer.from(value, "base64").toString("utf8");
globalThis.btoa ??= (value) => Buffer.from(value, "utf8").toString("base64");
globalThis.crypto ??= {subtle: {}};

globalThis.location = {href: "https://m.jd.com/"};

globalThis.document = {cookie: "appCode=ms0ca95114; __jdb=122270672.2.1772672932237181433857|2.1772680212; __jdv=122270672%7Cdirect%7C-%7Cnone%7C-%7C1772672932238; wqmnx1=MDEyNjM2M3AubTQzMm8vWGk4IFIvMllhLTQxUlMjISk%3D; 3AB9D23F7A4B3CSS=jdd03WGVENRDKGL7BUVKEO445WUDOL64R5WWAGK7DDSBXW43PFAV46FYV6GMW7OJWTMNPGPFGELJ52TXVVHGQ2TANLRGKWAAAAAM4XP6STFAAAAAADXHT7QJMLQUSYEX; retina=0; visitkey=5248533232061228121; mba_muid=1772672932237181433857; cd_eid=jdd03WGVENRDKGL7BUVKEO445WUDOL64R5WWAGK7DDSBXW43PFAV46FYV6GMW7OJWTMNPGPFGELJ52TXVVHGQ2TANLRGKWAAAAAM4XOFFV7YAAAAACC5VVRSK7OT3MIX; __jda=122270672.1772672932237181433857.1772672932.1772672932.1772680212.2; sdtoken=AAbEsBpEIOVjqTAKCQtvQu17G-1BCGpHyp0S6INHnUdcaoWMw-gIiEZh2Cg7YkgdEEHBLCu7wzwf561Y6mdzVh797a9wc7sD5eYPnugaBC9RH2RMlsoKsSQT0oUlJyPrWjPL; wxa_level=1; jxsid=17726729319701082070; sbx_hot_h=null; cid=9; 3AB9D23F7A4B3C9B=WGVENRDKGL7BUVKEO445WUDOL64R5WWAGK7DDSBXW43PFAV46FYV6GMW7OJWTMNPGPFGELJ52TXVVHGQ2TANLRGKWA; webp=1; mba_sid=17726802122361484462170.2; __jdc=122270672; autoOpenApp_downCloseDate_jd_homePage=1772680456668_1; __jd_ref_cls=MDownLoadFloat_FloatShield", location: globalThis.location};

const localStorageSeed = new Map([["CA1AN5BV0CA8DS2E3F","41a8d6bcde3480086b62d405cdb986dd"],["JDst_rac_nfd","{\"v\":10,\"t\":1772680062919,\"e\":31536000}"],["WQ_gather_cv1","{\"v\":\"41a8d6bcde3480086b62d405cdb986dd\",\"t\":1772680062612,\"e\":31536000}"],["3AB9D23F7A4B3CSS","jdd03WGVENRDKGL7BUVKEO445WUDOL64R5WWAGK7DDSBXW43PFAV46FYV6GMW7OJWTMNPGPFGELJ52TXVVHGQ2TANLRGKWAAAAAM4XP6STFAAAAAADXHT7QJMLQUSYEX"],["3AB9D23F7A4B3C9B","WGVENRDKGL7BUVKEO445WUDOL64R5WWAGK7DDSBXW43PFAV46FYV6GMW7OJWTMNPGPFGELJ52TXVVHGQ2TANLRGKWA"],["JDst_behavior_report_flag","{}"],["YL_EXP_INIT","{\"userId\":\"6300\",\"hitExpName\":\"\",\"hitExpId\":\"\",\"expires\":0}"],["JDst_behavior_flag","[{\"t\":1772677055580,\"e\":3600,\"v\":\"Aj\"},{\"t\":1772677055580,\"e\":3600,\"v\":\"Al\"},{\"t\":1772680633055,\"e\":3600,\"v\":\"Fq\"}]"],["__disp_m_gr__","0"],["WQ_dy1_vk","{\"5.3\":{\"73806\":{\"e\":31536000,\"v\":\"bzz22bibip1jaep1\",\"t\":1772672932647},\"2088b\":{\"e\":31536000,\"v\":\"pnbbn5be7i2p5pb5\",\"t\":1772672932723}}}"],["TSA9D23F7A4B3CSS","1772680812323"],["JDst_rac_last_update","{\"v\":1772680062603}"],["FFA9D23F7A4B3CSS","f93173837799f3286da37a67d155e93c"],["YL_OPENAPP_TYPE","aa"],["WQ_dy1_tk_algo","{\"pnbbn5be7i2p5pb5\":{\"2088b\":{\"v\":\"N5i3R5jxjEaAfoe0dVXzT4mIf4P6dlyHaH2Ke1WIWV_Ye4iWPVb_WGv0YlmIVGX5NIGKPlmcQHeYYWuKNmWkYoKETXG3Rl2qe2OYRYecRmWFQ2Cja2aSgWi7VECWPWT4e0a1jJ7JTV6EQ5jxjFS2QFe3RVu9jkaGP0bDOl--SEr-Okf-TVH-TV6EQ5GwOFm5jkiHcZP3fom9f2qAZYqnR3zEd0SKPJq4OkjuUpiPjJyIQ1yITUbDOl-CgFe8QFeKOpKFPpH9T1u9T1m3hka4hZyIQ1yITUbDTVHCgFe8QFeKOpK5SpHwPFW3OUi9jlm-S1v9X3KqfIX1hke3PJHwMZiu\",\"e\":86400,\"t\":1772672933120}},\"bzz22bibip1jaep1\":{\"73806\":{\"v\":\"N5i3R5jxjEaAfoe0T4n7fYmHfoX6dlyqT336O0qpdUL3P1mCXGv0YFuxb0eHX1nyRUX4ekOIXIGFR3__WmvyZZ20fHWxT1aCZki_OkqpW1OEWkD_WkSZTXaxQ1CqOYW0W3f0jJ7JTV6EQ5jxjFS2QFe3RVu9jkaGP0bDOl--SEr-Okf-TVH-TV6EQ5GwOFm5jkiHcZOfNIagX2P2WGG-NmjEd0SKPJq4OkjuUpiPjJyIQ1yITUbDOl-CgFe8QFeKOpKFPpH9T1u9T1m3hka4hZyIQ1yITUbDTVHCgFe8QFeKOpK5SpHwPFW3OUi9jlm-S1v9X3KqfIX1hke3PJHwMZiu\",\"e\":86400,\"t\":1772672933162}}}"]]);
globalThis.localStorage = {
  getItem(key) { return this._store.has(key) ? this._store.get(key) : null; },
  setItem(key, value) { this._store.set(String(key), String(value)); },
  removeItem(key) { this._store.delete(String(key)); },
  clear() { this._store.clear(); },
  key(index) { return Array.from(this._store.keys())[index] ?? null; },
  get length() { return this._store.size; },
  _store: localStorageSeed,
};

const sessionStorageSeed = new Map([["3AB9D23F7A4B3CSS","jdd03WGVENRDKGL7BUVKEO445WUDOL64R5WWAGK7DDSBXW43PFAV46FYV6GMW7OJWTMNPGPFGELJ52TXVVHGQ2TANLRGKWAAAAAM4XP6STFAAAAAADXHT7QJMLQUSYEX"],["3AB9D23F7A4B3C9B","WGVENRDKGL7BUVKEO445WUDOL64R5WWAGK7DDSBXW43PFAV46FYV6GMW7OJWTMNPGPFGELJ52TXVVHGQ2TANLRGKWA"],["fingerWebgl","null"],["CA1AN5BV0CA8DS2E3F","41a8d6bcde3480086b62d405cdb986dd"],["FFA9D23F7A4B3CSS","f93173837799f3286da37a67d155e93c"],["fingerCharging","true"],["fingerLevel","100"],["agentSid","a32c07df-a2c2-4f5b-b21c-78c2386427a5"]]);
globalThis.sessionStorage = {
  getItem(key) { return this._store.has(key) ? this._store.get(key) : null; },
  setItem(key, value) { this._store.set(String(key), String(value)); },
  removeItem(key) { this._store.delete(String(key)); },
  clear() { this._store.clear(); },
  key(index) { return Array.from(this._store.keys())[index] ?? null; },
  get length() { return this._store.size; },
  _store: sessionStorageSeed,
};
