const puppeteer = require("puppeteer");
const Redis=require("ioredis")

const redis = new Redis(6690,"172.31.45.77");

const DEFAULT_EXPIRATION=3600
const BASE_URL=`https://gogoanime.pe/`

exports.getFrontPageData=async(req,res)=>{
    const browser = await puppeteer.launch({args: ["--no-sandbox"]});
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

    Promise.all([
        await page.goto(`${BASE_URL}/new-season.html`),
        page.waitForNavigation()
    ])    

    let newSeasonData=await page.evaluate(()=>{
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

    Promise.all([
        await page.goto(`${BASE_URL}/anime-movies.html`),
        page.waitForNavigation()
    ])  

    let moviesData=await page.evaluate(()=>{
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

    Promise.all([
        await page.goto(`${BASE_URL}/popular.html`),
        page.waitForNavigation()
    ]) 

    let popularData=await page.evaluate(()=>{
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

    const combinedData={recentReleaseData,newSeasonData,moviesData,popularData}

    await browser.close(combinedData);
    res.json()
}

exports.recentRelease=async(req,res)=>{
    redis.get("recentRelease",async(err,recentReleaseData)=>{
        if(err) console.error(err)
        if(recentReleaseData!=null){
            return res.json(JSON.parse(recentReleaseData))
        }else{
            const browser = await puppeteer.launch({args: ["--no-sandbox"]});
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
            redis.setex("recentRelease",DEFAULT_EXPIRATION,JSON.stringify(recentReleaseData))
            res.json(recentReleaseData)
        }
    })
}

exports.newSeason=async(req,res)=>{
    redis.get("newSeason",async(err,newSeasonData)=>{
        if(err)console.error(err)
        if(newSeasonData!=null){
            return res.json(JSON.parse(newSeasonData))
        }else{
            const browser = await puppeteer.launch({args: ["--no-sandbox"]});
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
    })
}

exports.movies=async(req,res)=>{
    redis.get("movies",async(err,moviesData)=>{
        if(err)console.error(err)
        if(moviesData!=null){
            return res.json(JSON.parse(moviesData))
        }else{
            const browser = await puppeteer.launch({args: ["--no-sandbox"]});
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
    })
}

exports.popular=async(req,res)=>{
    redis.get("popular",async(err,popularData)=>{
        if(err)console.error(err)
        if(popularData!=null){
            return res.json(JSON.parse(popularData))
        }else{
            const browser = await puppeteer.launch({args: ["--no-sandbox"]});
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
    })
}

exports.genre=async(req,res)=>{
    const browser = await puppeteer.launch({args: ["--no-sandbox"]});
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
    const browser = await puppeteer.launch({args: ["--no-sandbox"]});
    const page = await browser.newPage();
    await page.goto(BASE_URL);
    let keyword=req.body.keyword
    await page.type('#keyword', keyword);

    await Promise.all([
        page.waitForNavigation(),
        page.click(".btngui")
    ])
    let searchedList=await page.evaluate(()=>{
        // try{
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
        // }
        // catch(err){
        //     console.log(err.message)
        // }
    })
    page.click(`document.querySelectorAll('ul[id="episode_page"]>li>a')[0]`)
    await browser.close();
    res.json(searchedList)
}

exports.animeDetail=async(req,res)=>{
    const animeLink=req.body.animeLink
    const browser = await puppeteer.launch({args: ["--no-sandbox"]});
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

        const ele=document.querySelectorAll('ul[id="episode_page"]>li>a')[0]
        ele.click()
        // animeInfo["episodes"]=episodeList
        return animeInfo
    })
    
    let pageCount=await page.evaluate(()=>{
        const ele=document.querySelectorAll('ul[id="episode_page"]>li>a').length
        return ele
    })

    let episodes=[]

    for(let p=1;p<=pageCount;p++){
        let de=await page.evaluate((p,pageCount)=>{
            let episodeList=[]
            const ele=document.querySelectorAll('ul[id="episode_page"]>li>a')
            const eplist=document.getElementById("episode_related")
            for(let i=0;i<eplist.children.length;i++){
                episodeList.push(eplist.children[i].children[0].href)
            }
            p<pageCount&&ele[p].click()
            return episodeList
        },p,pageCount)
        episodes.push(...de.reverse())
    }
    allDetail["episodes"]=episodes.reverse()
    await browser.close();
    res.json(allDetail)
}

exports.webPlayEpisode=async(req,res)=>{
    const episodeLink=req.body.episodeLink
    const browser = await puppeteer.launch({args: ["--no-sandbox"]});
    const page = await browser.newPage();
    await page.goto(episodeLink);

    let vidURL=await page.evaluate(()=>{
        let animeLink=document.getElementsByClassName("anime-info")[0].children[1].href
        let vidUrl=document.getElementsByTagName("iframe")[1].src
        return {animeLink,episodeUrl:vidUrl}
    })
    await browser.close();
    res.json(vidURL)
}

exports.playEpisode=async(req,res)=>{
    const episodeLink=req.body.episodeLink
    const browser = await puppeteer.launch({args: ["--no-sandbox"]});
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