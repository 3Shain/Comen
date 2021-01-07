
export const APP_ID = 13,
    APP_NAME = "link-sdk",
    SDK_VERSION = "1.2.1",
    KPN = "ACFUN_APP",
    KPF = "PC_WEB",
    SUB_BIZ = "mainApp",
    CLIENT_LIVE_SDK_VERSION = "kwai-acfun-live-link";

export enum Command {
    REGISTER = "Basic.Register",
    UNREGISTER = "Basic.Unregister",
    KEEP_ALIVE = "Basic.KeepAlive",
    PING = "Basic.Ping",
    CLIENT_CONFIG_GET = "Basic.ClientConfigGet",
    MESSAGE_SESSION = "Message.Session",
    MESSAGE_PULL_OLD = "Message.PullOld",
    GROUP_USER_GROUP_LIST = "Group.UserGroupList",
    GLOBAL_COMMAND = "Global.ZtLiveInteractive.CsCmd",
    PUSH_MESSAGE = "Push.ZtLiveInteractive.Message"
}

export enum GlobalCommand {
    ENTER_ROOM = "ZtLiveCsEnterRoom",
    ENTER_ROOM_ACK = "ZtLiveCsEnterRoomAck",
    HEARTBEAT = "ZtLiveCsHeartbeat",
    HEARTBEAT_ACK = "ZtLiveCsHeartbeatAck",
    USER_EXIT = "ZtLiveCsUserExit",
    USER_EXIT_ACK = "ZtLiveCsUserExitAck"
}

export const PushMessage =
{
    ACTION_SIGNAL: "ZtLiveScActionSignal",
    STATE_SIGNAL: "ZtLiveScStateSignal",
    NOTIFY_SIGNAL: "ZtLiveScNotifySignal",
    STATUS_CHANGED: "ZtLiveScStatusChanged",
    TICKET_INVALID: "ZtLiveScTicketInvalid",

    ActionSignal:
    {
        COMMENT: "CommonActionSignalComment",
        LIKE: "CommonActionSignalLike",
        ENTER_ROOM: "CommonActionSignalUserEnterRoom",
        FOLLOW: "CommonActionSignalUserFollowAuthor",
        THROW_BANANA: "AcfunActionSignalThrowBanana",
        GIFT: "CommonActionSignalGift",
        RICH_TEXT: "CommonActionSignalRichText",
        JOIN_CLUB: "AcfunActionSignalJoinClub",
    },

    StateSignal:
    {
        ACFUN_DISPLAY_INFO: "AcfunStateSignalDisplayInfo",
        DISPLAY_INFO: "CommonStateSignalDisplayInfo",
        TOP_USRES: "CommonStateSignalTopUsers",
        RECENT_COMMENT: "CommonStateSignalRecentComment",
        CHAT_CALL: "CommonStateSignalChatCall",
        CHAT_ACCEPT: "CommonStateSignalChatAccept",
        CHAT_READY: "CommonStateSignalChatReady",
        CHAT_END: "CommonStateSignalChatEnd",
        CURRENT_RED_PACK_LIST: "CommonStateSignalCurrentRedpackList",
        AUTHOR_CHAT_CALL: "CommonStateSignalAuthorChatCall",
        AUTHOR_CHAT_ACCEPT: "CommonStateSignalAuthorChatAccept",
        AUTHOR_CHAT_READY: "CommonStateSignalAuthorChatReady",
        AUTHOR_CHAT_END: "CommonStateSignalAuthorChatEnd",
        AUTHOR_CHAT_CHANGE_SOUND_CONFIG: "CommonStateSignalAuthorChatChangeSoundConfig"
    },

    NotifySignal:
    {
        KICKED_OUT: "CommonNotifySignalKickedOut",
        VIOLATION_ALERT: "CommonNotifySignalViolationAlert",
        LIVE_MANAGER_STATE: "CommonNotifySignalLiveManagerState"
    }
}