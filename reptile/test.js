var http = require('http');
var cheerio = require('cheerio');    //解析html

//抓取页面
var argument=process.argv.splice(2)[0];  //获取命令行后输入的路径
if(!argument){
    console.log("请在命令行之后输入路径！");
}else{
    //自动补全路径
    var protocol = "http";
    if (argument.indexOf("http") < 0) {
             argument = protocol + "://" + argument;
        }
    download(argument, function (data) {
        //使用load方法，参数是抓取下来的html代码
        var $ = cheerio.load(data);
        //定义一个空数组用于存放a链接
        var arr = [];
        //抓取页面所有a链接的href存在数组arr
        $('a').each(function(index,element){
            var href = $(element).attr('href');
            arr.push(href);
        });
        console.log(arr);
    });
}

  function download(url,callback){
      http.get(url,function(res){
          var html='';
          res.on('data',function(data){
              html += data;
          });

          res.on('end',function(){
               callback(html);
          });

      }).on('error',function(){
          callback(null);
      });
  }
