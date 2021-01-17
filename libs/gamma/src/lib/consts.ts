/**
 * <yt-live-chat-paid-message-renderer>
 * --yt-live-chat-paid-message-primary-color
 * --yt-live-chat-paid-message-secondary-color
 * --yt-live-chat-paid-message-header-color
 * --yt-live-chat-paid-message-author-name-color
 * --yt-live-chat-paid-message-timestamp-color
 * --yt-live-chat-paid-message-color
 */

/**
 * <yt-live-chat-paid-sticker-renderer>
 * --yt-live-chat-paid-sticker-chip-background-color
 * --yt-live-chat-paid-sticker-chip-text-color
 * --yt-live-chat-paid-sticker-background-color
 * --yt-live-chat-paid-sticker-author-name-text-color
 */

/**
 * sponsor: linear-gradient(90deg,0,1,2,3,4);  15 157 88 11 / 11 128 67 1
 */
export type ColorInfo = {
    primary: string;
    secondary: string;
    header: string;
    authorName: string;
    timestamp: string;
    message: string;

    sticker_size: number;
    ticker_timeout?: number;
    price_limit: number;
}

export const BLUE: ColorInfo = {
    primary: 'rgba(30,136,229,1)',
    secondary: 'rgba(21,101,192,1)',
    header: 'rgba(255,255,255,1)',
    authorName: 'rgba(255,255,255,0.7)',
    timestamp: 'rgba(255,255,255,0.5)',
    message: 'rgba(255,255,255,1)',
    sticker_size: 40,
    ticker_timeout: 0,
    price_limit: 0
}

export const CYAN: ColorInfo = {
    primary: 'rgba(0,229,255,1)',
    secondary: 'rgba(0,184,212,1)',
    header: 'rgba(0,0,0,1)',
    authorName: 'rgba(0,0,0,0.7)',
    timestamp: 'rgba(0,0,0,0.5)',
    message: 'rgba(0,0,0,1)',
    sticker_size: 72,
    ticker_timeout: 60,
    price_limit: 30
}

export const YELLOW_GREEN: ColorInfo = {
    primary: 'rgba(29,233,182,1)',
    secondary: 'rgba(0,191,165,1)',
    header: 'rgba(0,0,0,1)',
    authorName: 'rgba(0,0,0,0.5)',
    timestamp: 'rgba(0,0,0,0.5)',
    message: 'rgba(0,0,0,1)',
    sticker_size: 88,
    ticker_timeout: 120,
    price_limit: 50
}

export const YELLOW: ColorInfo = {
    primary: 'rgba(255,202,40,1)',
    secondary: 'rgba(255,179,0,1)',
    header: 'rgba(0,0,0,0.87)',
    authorName: 'rgba(0,0,0,0.5)',
    timestamp: 'rgba(0,0,0,0.5)',
    message: 'rgba(0,0,0,0.87)',
    sticker_size: 104,
    ticker_timeout: 300,
    price_limit: 100
}

export const ORANGE: ColorInfo = {
    primary: 'rgba(245,124,0,1)',
    secondary: 'rgba(230,81,0,1)',
    header: 'rgba(255,255,255,0.87)',
    authorName: 'rgba(255,255,255,0.7)',
    timestamp: 'rgba(255,255,255,0.5)',
    message: 'rgba(255,255,255,0.87)',
    sticker_size: 120,
    ticker_timeout: 1800,
    price_limit: 500
}

export const MAGNET: ColorInfo = {
    primary: 'rgba(233,30,99,1)',
    secondary: 'rgba(194,24,91,1)',
    header: 'rgba(255,255,255,1)',
    authorName: 'rgba(255,255,255,0.7)',
    timestamp: 'rgba(255,255,255,0.5)',
    message: 'rgba(255,255,255,1)',
    sticker_size: 144,
    ticker_timeout: 3600,
    price_limit: 1000
}

export const RED: ColorInfo = {
    primary: 'rgba(230,33,23,1)',
    secondary: 'rgba(208,0,0,1)',
    header: 'rgba(255,255,255,1)',
    authorName: 'rgba(255,255,255,0.7)',
    timestamp: 'rgba(255,255,255,0.5)',
    message: 'rgba(255,255,255,1)',
    sticker_size: 144,
    ticker_timeout: 7200,
    price_limit: 2000
}