import { Observable, OperatorFunction } from 'rxjs';
import { filter } from 'rxjs/operators';
import { Message, TextMessage } from '@comen/gamma';

export function commentFilter(options: {
    blacklist?: number[],
    wordBlacklist?: string[],
    bilibili?: {
        showSilverGift?: boolean
    }
}): OperatorFunction<Message, Message> {
    return (upstream) => upstream.pipe(filter(comment => {
        if(comment.type=='text'||comment.type=='paid'){
            if(options.wordBlacklist){
                if(options.wordBlacklist.some(s=>{
                   return comment.content.indexOf(s)!=-1;
                })){
                    return false;
                }
            }
        }
        return true;
    }));
}

export function smoother(options: {

}): OperatorFunction<Message, Message> {
    return (upstream) => {
        return new Observable(observer => {
            const messageBuffer = [] as TextMessage[];
            (async ()=>{
                while(!observer.closed){
                    if(messageBuffer.length){
                        observer.next(messageBuffer.shift());
                        // TODO: dynamic
                        for(let i=0;i<10;i++){
                            await nextFrame();
                        }
                    }
                    await nextFrame();
                }
            })();

            return upstream.subscribe(comment => {
                if (comment.type == 'text') {
                    messageBuffer.push(comment);
                } else {
                    // ignore non text comment
                    observer.next(comment);
                }
            });
        })
    }
}

export function folder(options:{
    searchRange:number
}):OperatorFunction<Message,Message> {
    return (upstream) => {
        return new Observable(observer => {
            return upstream.subscribe(comment => {
                if (comment.type === 'text') {
                    // folding logic
                    observer.next(comment);
                } else {
                    // ignore non text comment
                    observer.next(comment);
                }
            })
        })
    }
}

function nextFrame(){
    return new Promise(res=>{
        requestAnimationFrame(res);
    })
}