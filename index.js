const express = require('express')
const router = require('./Routes/route')
const bodyParser = require("body-parser");
const app = express()
const port = 6699

app.get('/', (req, res) => {
  res.send('i am runnin')
})
app.use(bodyParser());
app.use('/api',router)

app.listen(port, () => {
  console.log(`Anime app listening at http://localhost:${port}`)
})

// (async () => {
//     const browser = await puppeteer.launch();
//     const page = await browser.newPage();
//     await page.goto('https://gogoanime.pe/night-head-2041-episode-7');
//     await page.screenshot({ path: 'example.png' });

//     const HomePage=async()=>{
//         let names=await page.evaluate(()=>{
//             let names=document.querySelectorAll('p[class="name"] > a')
//             let banner=document.querySelectorAll('div[class="img"]>a>img')
//             let datas=[]
//             let banners=[]
//             for(let i=0;i<names.length;i++){
//                 datas.push(names[i].innerHTML)
//                 banners.push(banner[i].src)
//             }
//             return {
//                 datas,banners
//             }
//         })
//     }

//     // let names=await page.evaluate(()=>{
//     //     let vidUrl=document.getElementsByTagName("iframe")[1].src
//     //     // let vidUrl=document.querySelector('div[class="anime_video_body"]>h1').innerHTML
//     //     return vidUrl
        
//     // })

//     await page.type('#keyword', 'attack on titan');

//     await Promise.all([
//         page.waitForNavigation(),
//         page.click(".btngui")
//     ])
//     let names=await page.evaluate(()=>{
//         let names=document.querySelectorAll('p[class="name"] > a')
//         let banner=document.querySelectorAll('div[class="img"]>a>img')
//         let datas=[]
//         let banners=[]
//         for(let i=0;i<names.length;i++){
//             datas.push(names[i].innerHTML)
//             banners.push(banner[i].src)
//         }
//         return {
//             datas,banners
//         }
//     })

//     console.log("names",names)
//     await browser.close();
//   })();