const puppeteer = require("puppeteer");

const BASE_URL=`https://gogoanime.pe/`

exports.searchAnime=async(req,res)=>{
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(BASE_URL);
    let keyword=req.body.keyword
    await page.type('#keyword', keyword);

    await Promise.all([
        page.waitForNavigation(),
        page.click(".btngui")
    ])
    let searchedList=await page.evaluate(()=>{
        let names=document.querySelectorAll('p[class="name"] > a')
        let banner=document.querySelectorAll('div[class="img"]>a>img')
        let releases=document.querySelectorAll('p[class="released"]')
        let animeLink=document.querySelectorAll('div[class="img"]>a')
        let searchList=[]
        for(let i=0;i<names.length;i++){
            searchList.push({
                name:names[i].innerHTML,
                banner:banner[i].src,
                releaseDate:releases[i].innerText,
                animeLink:animeLink[i].href
            })
        }
        return searchList
    })
    await browser.close();
    res.json(searchedList)
}

exports.animeDetail=async(req,res)=>{
    const animeLink=req.body.animeLink

    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(animeLink);

    
    let allDetail=await page.evaluate(()=>{
        const animeInfo={}

        const name=document.querySelectorAll('div[class="anime_info_body_bg"]>h1')[0].innerText
        const banner=document.querySelectorAll('div[class="anime_info_body_bg"]>img')[0].src
        const details=document.querySelectorAll('p[class="type"]')

        animeInfo['name']=name
        animeInfo['banner']=banner        


        for(let i=0;i<details.length;i++){
            animeInfo[details[i].children[0].innerHTML.trim().slice(0,-1)]=details[i].children[1]!==undefined?details[i].children[1].innerHTML:details[i].innerText.replace('Plot Summary: ','')
        }

        return animeInfo
    })

    res.json(allDetail)
}