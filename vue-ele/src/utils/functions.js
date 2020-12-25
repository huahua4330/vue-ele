export const formatDate=(num)=>{
    var now=new Date(Number(num*1000))
    var year=now.getFullYear();
    var month=now.getMonth()+1;
    var date=now.getDate();
    var hour=now.getHours();
    var minute=now.getMinutes();
    var second=now.getSeconds();
    return year+'-'+month+'-'+date+'-'+hour+"-"+minute+'-'+second;
}