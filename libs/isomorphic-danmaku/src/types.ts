
interface BilibiliRoomInfo {
    room_id: number;
    short_id: number;
    uid: number;
    need_p2p: number;
    is_hidden: boolean;
    is_locked: boolean;
    is_portrait: boolean;
    live_status: number;
    hidden_till: number;
    lock_till: number;
    encrypted: boolean;
    pwd_verified: boolean;
    live_time: number;
    room_shield: number;
    special_type: number;
}

interface BilibiliDanmuInfo {
    group: string;
    busness_id: number;
    refresh_row_factor: number;
    refresh_Rate: number;
    max_delay: number;
    token: string;
    host_list: {
        host: string;
        port: number;
        wss_port: number;
        ws_port: number;
    }[];
}

interface BilibiliGiftConfig {

    animation_frame_number: number;
    bag_gift: number;
    bind_roomid: number;
    bind_ruid: number;
    broadcast: number;
    bullet_head: string;
    bullet_tail: string;
    coin_type: string;
    combo_resources_id: number;
    corner_background: string;
    corner_mark: string;
    count_map: {

    }[],
    desc: string;
    draw: number;
    effect: number;
    frame_animation: string;
    full_sc_horizontal: string;
    full_sc_horizontal_svga: string;
    full_sc_vertical: string;
    full_sc_vertical_svga: string;
    full_sc_web: string;
    gif: string;
    gift_type: number;
    goods_id: number;
    has_imaged_gift: number;
    id: number;
    image_basic: string;
    image_dynamic: string;
    left_corner_background: string;
    left_corner_text: string;
    limit_interval: number;
    max_send_limit: number;
    name: string;
    price: number;
    privilege_required: number;
    rights: string;
    rule: string;
    stay_time: number;
    type: number;
    webp: string;
    weight: number
}

interface BilibiliHistoryDanmaku {
    bubble: number;
    bubble_color: string;
    guard_level: number;
    isadmin: number;
    lpl: number;
    medal: unknown[],
    nickname: string;
    rank: number;
    rnd: number;
    svip: number;
    teamid: number;
    text: string;
    timeline: string;
    title: string[];
    uid: number;
    uname_color: string;
    user_level: unknown[];
    user_title: string;
    vip: number;
}

export {
    BilibiliDanmuInfo, BilibiliRoomInfo, BilibiliGiftConfig,
    BilibiliHistoryDanmaku
};