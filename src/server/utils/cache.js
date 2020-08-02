const cache = require('memory-cache');

let memCache = new cache.Cache();
function cacheMiddleware(duration){
    return (req, res, next) => {
        let key =  '__express__' + req.originalUrl || req.url;
        let cacheContent = memCache.get(key);
        if(cacheContent){
            console.log('cacheContent:', cacheContent);
            res.send( cacheContent );
            return
        }else{
            res.sendResponse = res.send;
            res.send = (body) => {
                console.log("cachebody", body);
                if(body!==null && body.user!=null && body.user!="null") memCache.put(key,body,duration*1000);
                res.sendResponse(body)
            }
            next()
        }
    }
}
module.exports = {
    cacheMiddleware
}