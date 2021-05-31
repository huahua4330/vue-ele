import { MessageBox } from 'element-ui'
// 自定义方法  方法一
export const comdel=({content,Tips,type,center,callback})=>{
    MessageBox.confirm( content,Tips, {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: type,
        center: center
    }).then(() => {
        // 如果存在就调用
        callback && callback()
    }).catch(() => {
        
    });
}


// 方法二
// export const comdel=({content,Tips,type,center})=>{
//     return new Promise((resolve,reject)=>{
//         MessageBox.confirm( content,Tips, {
//             confirmButtonText: '确定',
//             cancelButtonText: '取消',
//             type: type,
//             center: center
//         }).then(() => {
//             resolve('确定')
//         }).catch(() => {
//             reject('取消')
//         });
//     })
// }