const puppeteer = require("puppeteer");

const BASE_URL=`https://gogoanime.pe/`

exports.recentRelease=async(req,res)=>{
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(BASE_URL);

    let recentReleaseData=await page.evaluate(()=>{
        const epsData=document.getElementsByClassName("items")[0].children
        const data=[]
        for(let i=0;i<epsData.length;i++){
            data.push({
                banner:epsData[i].children[0].children[0].children[0].src,
                name:epsData[i].children[1].innerText,
                releaseDate:epsData[i].children[2].innerText,
                animeEpLink:epsData[i].children[0].children[0].href
            })
        }
        return data
    })
    await browser.close();
    res.json(recentReleaseData)
}

exports.newSeason=async(req,res)=>{
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(`${BASE_URL}/new-season.html`);

    let recentReleaseData=await page.evaluate(()=>{
        const epsData=document.getElementsByClassName("items")[0].children
        const data=[]
        for(let i=0;i<epsData.length;i++){
            data.push({
                banner:epsData[i].children[0].children[0].children[0].src,
                name:epsData[i].children[1].innerText,
                releaseDate:epsData[i].children[2].innerText,
                animeEpLink:epsData[i].children[0].children[0].href
            })
        }
        return data
    })
    await browser.close();
    res.json(recentReleaseData)
}

exports.movies=async(req,res)=>{
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(`${BASE_URL}/anime-movies.html`);

    let recentReleaseData=await page.evaluate(()=>{
        const epsData=document.getElementsByClassName("items")[0].children
        const data=[]
        for(let i=0;i<epsData.length;i++){
            data.push({
                banner:epsData[i].children[0].children[0].children[0].src,
                name:epsData[i].children[1].innerText,
                releaseDate:epsData[i].children[2].innerText,
                animeEpLink:epsData[i].children[0].children[0].href
            })
        }
        return data
    })
    await browser.close();
    res.json(recentReleaseData)
}

exports.popular=async(req,res)=>{
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(`${BASE_URL}/popular.html`);

    let recentReleaseData=await page.evaluate(()=>{
        const epsData=document.getElementsByClassName("items")[0].children
        const data=[]
        for(let i=0;i<epsData.length;i++){
            data.push({
                banner:epsData[i].children[0].children[0].children[0].src,
                name:epsData[i].children[1].innerText,
                releaseDate:epsData[i].children[2].innerText,
                animeEpLink:epsData[i].children[0].children[0].href
            })
        }
        return data
    })
    await browser.close();
    res.json(recentReleaseData)
}

exports.genre=async(req,res)=>{
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    const genre=req.body.genre

    await page.goto(`${BASE_URL}/genre/${genre}`);

    let recentReleaseData=await page.evaluate(()=>{
        const epsData=document.getElementsByClassName("items")[0].children
        const data=[]
        for(let i=0;i<epsData.length;i++){
            data.push({
                banner:epsData[i].children[0].children[0].children[0].src,
                name:epsData[i].children[1].innerText,
                releaseDate:epsData[i].children[2].innerText,
                animeEpLink:epsData[i].children[0].children[0].href
            })
        }
        return data
    })
    await browser.close();
    res.json(recentReleaseData)
}

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
        const eplist=document.getElementById("episode_related")

        animeInfo['name']=name
        animeInfo['banner']=banner        

        for(let i=0;i<details.length;i++){
            animeInfo[details[i].children[0].innerHTML.trim().slice(0,-1)]=i==2?details[i].innerText.replace('Genre: ',''):details[i].children[1]!==undefined?details[i].children[1].innerHTML:details[i].innerText.includes('Plot Summary: ')?details[i].innerText.replace('Plot Summary: ',''):details[i].innerText.replace('Other name: ','')
        }
        let episodeList=[]
        if(eplist!==null){
            for(let i=0;i<eplist.children.length;i++){
                episodeList.push(eplist.children[i].children[0].href)
            }
        }
        
        animeInfo["episodes"]=episodeList
        return animeInfo
    })
    await browser.close();
    res.json(allDetail)
}

exports.playEpisode=async(req,res)=>{
    const episodeLink=req.body.episodeLink
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(episodeLink);

    // let vidURL=await page.evaluate(()=>{
    //     let animeLink=document.getElementsByClassName("anime-info")[0].children[1].href
    //     let vidUrl=document.getElementsByTagName("iframe")[1].src
    //     return {animeLink,episodeUrl:vidUrl}
    // })

    let vidURL=await page.evaluate(()=>{
        let animeLink=document.getElementsByClassName("anime-info")[0].children[1].href
        let vidUrl=document.getElementsByClassName("dowloads")[0].children[0].href
        return {animeLink,episodeUrl:vidUrl}
    })

    Promise.all([
        await page.goto(vidURL.episodeUrl),
        page.waitForNavigation()
    ])    

    let vidUrl=await page.evaluate(()=>{
        let vid=document.getElementsByClassName("dowload")[0].children[0].href
        return vid
    })

    vidURL["episodeUrl"]=vidUrl

    await browser.close();
    res.json(vidURL)
}