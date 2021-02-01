/*
 * @Author: Hemingway
 * @Date: 2021-02-01 15:56:09
 * @LastEditors: Hemingway
 * @LastEditTime: 2021-02-01 17:40:14
 * @Descripttion: XMLHttpRequest封装
 */

 
/**
    * @Author: Hemingway
    * @Date: 2021-02-01 11:39:55
    * @Descripttion: XMLHttpRequest封装的请求方法
    * @param {JSON} params
    * url 请求路径
    * data 请求数据
    * method 请求方式
    * @promise 研究Content-Type
    */   
   function ajax(params){
        const {url,data='',method='GET',callback,dataType='json',timeout=30000} = params;
        
        //创造XMLHttpRequest实例
        let xhr = new XMLHttpRequest()
        //初始化
        xhr.open(
            method,
            url
        )
        //设置超时
        xhr.timeout = timeout
        
        if(callback){
            callSend(callback)
        }else{
            return new Promise((resolve,reject)=>{
                callSend(resolve)
            })
        }
        
        function callSend(callback){
            xhr.onreadystatechange = () => {
                if(xhr.readyState==4){
                    callback({
                        status:xhr.status,
                        data:tryJSON(xhr.response)||xhr.response,
                    })
                }
            }
            //传值
            xhr.send(data)
        }
    }

    /**
     * @Author: Hemingway
     * @Date: 2021-02-01 17:37:28
     * @Descripttion: 检查是否满足JSON
     * @param {*} str
     */
    function tryJSON(str){
        try{
            return JSON.parse(str);
        }catch(e){
            return false;
        }
    }

    module.exports = ajax;