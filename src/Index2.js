let RH1, RH2, CH1, CH2, VS1, VS2, AH, ETH24h, USD24h, sumPayouts, unpaidETH, ETHprice;

const FetchDashboard = fetch("https://api.ethermine.org/miner/8454f8ab6cb0b8b760a9c8feb24f73465b218928/dashboard");
const FetchStats = fetch("https://api.ethermine.org/miner/8454f8ab6cb0b8b760a9c8feb24f73465b218928/currentStats");
const FetchPayouts = fetch("https://api.ethermine.org/miner/8454f8ab6cb0b8b760a9c8feb24f73465b218928/payouts");
/*const FetchPrices = fetch("https://pro-api.coinmarketcap.com/v1/cryptocurrency/quotes/latest?symbol=ETH,TON,ERG,RVN&convert=EUR&=3ad53571-5a34-41c1-93b1-01dc29b8ab75");*/

Promise.all([FetchDashboard, FetchStats, FetchPayouts/*,FetchPrices*/])
    .then(values => {
        return Promise.all(values.map(APIresponse => APIresponse.json()));})
    .then(values => {

        RH1 = (values[0].data.workers[0].reportedHashrate / 1000000);
        RH2 = (values[0].data.workers[1].reportedHashrate / 1000000);
        CH1 = (values[0].data.workers[0].currentHashrate / 1000000);
        CH2 = (values[0].data.workers[1].currentHashrate / 1000000);
        VS1 = (values[0].data.workers[0].validShares / (values[0].data.workers[0].validShares + values[0].data.workers[0].staleShares + values[0].data.workers[0].invalidShares) * 100);
        VS2 = (values[0].data.workers[1].validShares / (values[0].data.workers[1].validShares + values[0].data.workers[1].staleShares + values[0].data.workers[1].invalidShares) * 100);
        unpaidETH = (values[0].data.currentStatistics.unpaid / 1000000000000000000);
        AH = (values[1].data.averageHashrate / 1000000);
        ETH24h = (values[1].data.coinsPerMin * 60 * 24);
        USD24h = (values[1].data.usdPerMin * 60 * 24);
        /*ETHprice = (values[3].data.ETH.quote.EUR.price);*/

        let sumPayoutsBase = 0;
        for (let i = 0; i < values[2].data.length; i++){
            sumPayoutsBase += values[2].data[i].amount;}
        sumPayouts = (sumPayoutsBase / 1000000000000000000);

        document.querySelector("#RH1").innerHTML = RH1.toFixed(2) + " MH/s";
        document.querySelector("#RH2").innerHTML = RH2.toFixed(2) + " MH/s";
        document.querySelector("#CH1").innerHTML = CH1.toFixed(2) + " MH/s";
        document.querySelector("#CH2").innerHTML = CH2.toFixed(2) + " MH/s";
        document.querySelector("#VS1").innerHTML = VS1.toFixed(2) + "%";
        document.querySelector("#VS2").innerHTML = VS2.toFixed(2) + "%";
        document.querySelector("#unpaid").innerHTML = unpaidETH.toFixed(5) + " ETH";
        document.querySelector("#AH").innerHTML = AH.toFixed(2) + " MH/s";
        document.querySelector("#ETH24h").innerHTML = ETH24h.toFixed(5) + " ETH";
        document.querySelector("#USD24h").innerHTML = USD24h.toFixed(2) + " USD";
        document.querySelector("#sumETH").innerHTML = (sumPayouts + 2.00681 + unpaidETH).toFixed(5) + " ETH";
    });