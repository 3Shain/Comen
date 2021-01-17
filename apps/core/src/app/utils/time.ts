
export function waitTimeout(time:number){
    return new Promise((res)=>{
        setTimeout(res,time);
    })
}