let SOD = ["Sonoda Mion", "hashimoto arina", "Mikami Yua"];
let mile = ["Sonoda Mion", "hashimoto arina", "Aoi Tsukasa"];
//運用Set跟展開運算子把相同的東西去除
// avGirls = [...SOD,...mile];
// console.log(avGirls);
// avGirlsSet = new Set(avGirls);
// console.log(avGirlsSet);
// avGirls = [...avGirlsSet];
// console.log(avGirls);
//運用Set跟展開運算子把相同的東西去除
avGirls = [...new Set([...SOD, ...mile])];
console.log(avGirls);

//SOD跟mile交集
mile = new Set(mile);
avGirls = SOD.filter((name) => mile.has(name));
console.log(avGirls);
//SOD有但mile沒有的
avGirls = SOD.filter((name) => !mile.has(name));
console.log(avGirls);
//mile有但SOD沒有的
mile = [...mile];
SOD = new Set(SOD);
avGirls = mile.filter((name) => !SOD.has(name));
console.log(avGirls);
