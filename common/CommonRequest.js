/**
 * POST请求
 * @param requestUrl
 * @param requestData
 * @param callback
 * @constructor
 */
export function post(requestUrl,requestData) {
    console.log("requestUrl:" + requestUrl);
    return new Promise((resolve,reject)=>{

        fetch(requestUrl,{
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body:JSON.stringify(requestData)})
            .then((response)=>{
                if(response.ok){
                    return response.json();
                }
            })
            .then((responseData)=>{
                // var responseResult = JSON.stringify(responseData);
                // console.log("返回的数据" + JSON.stringify(responseData));
                resolve(responseData);
                return responseData;
            })
            .catch((e)=>{
                reject(e);
                console.log("请求发生异常:" + e.message)
            });

    });
}

/**
 * GET请求
 * @param requestUrl
 * @param requestData
 * @param callback
 * @constructor
 */
export function get(requestUrl,requestData,callback) {
    fetch(requestUrl)
}

/**
 * 请求
 * @param requestUrl
 * @param method
 * @param requestData
 * @param callback
 */
export function request(requestUrl,method,requestData,callback){
    fetch(requestUrl)
}