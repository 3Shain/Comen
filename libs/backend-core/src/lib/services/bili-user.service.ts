import { CACHE_MANAGER, Inject, Injectable } from "@nestjs/common";
import { Cache } from "cache-manager";
import got from 'got';

const MINIMUM_FETCH_INTERVAL = 500; //ms
const REFRESH_TIME = 3 * 24 * 60 * 60 * 1000; //ms
const CACHE_TIME = 1.5 * REFRESH_TIME; //ms

@Injectable()
export class BilibiliUserService {
    constructor(@Inject(CACHE_MANAGER) private cache: Cache) { }

    lastFetch: number = Date.now();
    fetchQueue: Set<number> = new Set()
    currentFetchJob: NodeJS.Timeout = null;

    interfaceUnlock = 0;

    // NB: current design is not for horizontal scale! SINGLE INSTANCE ONLY!
    async fetchUserInfo(uid: number): Promise<CachedBilibiliUserInfo> {
        // determine fetch now or insert into batch
        // eslint-disable-next-line
        while (true) {
            if (Date.now() - this.lastFetch < MINIMUM_FETCH_INTERVAL || this.interfaceUnlock > Date.now()) {
                this.fetchQueue.add(uid);
                if (this.currentFetchJob == null) {
                    this.currentFetchJob = setTimeout(async () => {
                        // this is a different context that fetchQueue is mutated.
                        const ids = [...this.fetchQueue].slice(0, this.fetchQueue.size > 20 ? 20 : this.fetchQueue.size); // maximum size?

                        try {
                            this.lastFetch = Date.now();
                            const ret = (await got.get<{
                                data: {
                                    [key: string]: {
                                        info: {
                                            uid: number,
                                            uname: string,
                                            face: string
                                        }
                                    }
                                }
                            }>(`https://api.live.bilibili.com/user/v3/User/getMultiple?${ids.map(x => `uids[]=${x}`).join('&')
                                }&attributes[]=info`, {
                                headers: {
                                    'User-Agent': ""
                                },
                                responseType: 'json'
                            })).body;
                            for (const uid in ret.data) {
                                const user = ret.data[uid];
                                const obj: CachedBilibiliUserInfo = {
                                    uid: user.info.uid,
                                    face: user.info.face,
                                    name: user.info.uname,
                                    refresh_time: Date.now() + REFRESH_TIME,
                                }
                                this.fetchQueue.delete(obj.uid);
                                await this.cache.set(`BILI_USERINFO_${uid}`, obj, {
                                    ttl: CACHE_TIME / 1000
                                });
                            }
                        }
                        catch (e) {
                            console.error(e);
                        }
                        finally {
                            this.currentFetchJob = null;
                        }

                    }, this.lastFetch + MINIMUM_FETCH_INTERVAL - Date.now());
                }
                const obj: CachedBilibiliUserInfo = {
                    uid: uid,
                    temp: true,
                    face: "http://static.hdslb.com/images/member/noface.gif", // normal avatar
                }
                return obj;
            } else {
                this.lastFetch = Date.now();
                try {
                    const ret = (await got.get<{
                        data: {
                            name: string;
                            face: string;
                        }
                    }>(`https://api.bilibili.com/x/space/acc/info?mid=${uid}`, {
                        headers: {
                            // 'User-Agent': ""
                        },
                        responseType: 'json'
                    })).body;

                    const obj: CachedBilibiliUserInfo = {
                        uid: uid,
                        face: ret.data.face,
                        name: ret.data.name,
                        refresh_time: Date.now() + REFRESH_TIME,
                    };
                    await this.cache.set(`BILI_USERINFO_${uid}`, obj, {
                        ttl: CACHE_TIME / 1000
                    });
                    return obj;
                } catch (e) {
                    this.interfaceUnlock = Date.now() + 10 * 60 * 1000; // 10 min
                }
            }
        }
    }

    async getUserInfoFromCache(uid: number): Promise<CachedBilibiliUserInfo> {
        const info = await this.cache.get(`BILI_USERINFO_${uid}`) as CachedBilibiliUserInfo | null;
        if (info) {
            if (info.refresh_time < Date.now()) {
                this.fetchUserInfo(uid); // fire and forgot
            }
            return info;
        } else {
            return await this.fetchUserInfo(uid); // fire and forgot
        }
    }
}

export type CachedBilibiliUserInfo = {
    uid: number;

    name?: string;
    face?: string;

    // refresh time
    refresh_time?: number;
    // do not cache in browser
    temp?: boolean;
}