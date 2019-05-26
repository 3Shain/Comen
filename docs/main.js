(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["main"],{

/***/ "./src/$$_lazy_route_resource lazy recursive":
/*!**********************************************************!*\
  !*** ./src/$$_lazy_route_resource lazy namespace object ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncaught exception popping up in devtools
	return Promise.resolve().then(function() {
		var e = new Error("Cannot find module '" + req + "'");
		e.code = 'MODULE_NOT_FOUND';
		throw e;
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = "./src/$$_lazy_route_resource lazy recursive";

/***/ }),

/***/ "./src/app/alpha/alpha.component.css":
/*!*******************************************!*\
  !*** ./src/app/alpha/alpha.component.css ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL2FscGhhL2FscGhhLmNvbXBvbmVudC5jc3MifQ== */"

/***/ }),

/***/ "./src/app/alpha/alpha.component.html":
/*!********************************************!*\
  !*** ./src/app/alpha/alpha.component.html ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<yt-live-chat-renderer [displayMode]=3 (onawake)=\"onload()\" #renderer></yt-live-chat-renderer>"

/***/ }),

/***/ "./src/app/alpha/alpha.component.ts":
/*!******************************************!*\
  !*** ./src/app/alpha/alpha.component.ts ***!
  \******************************************/
/*! exports provided: AlphaComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AlphaComponent", function() { return AlphaComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/platform-browser */ "./node_modules/@angular/platform-browser/fesm5/platform-browser.js");
/* harmony import */ var _message_processor_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../message-processor.service */ "./src/app/message-processor.service.ts");
/* harmony import */ var _chat_renderer_chat_renderer_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./chat-renderer/chat-renderer.component */ "./src/app/alpha/chat-renderer/chat-renderer.component.ts");
/* harmony import */ var _biliws_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../biliws.service */ "./src/app/biliws.service.ts");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../environments/environment */ "./src/environments/environment.ts");
/* harmony import */ var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @ngx-translate/core */ "./node_modules/@ngx-translate/core/fesm5/ngx-translate-core.js");










var AlphaComponent = /** @class */ (function () {
    function AlphaComponent(route, title, proc, bili, http, translate) {
        this.route = route;
        this.title = title;
        this.proc = proc;
        this.bili = bili;
        this.http = http;
        this.translate = translate;
    }
    AlphaComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.currentRoomId = this.route.snapshot.params['id'];
        this.translate.get('ROOM').subscribe(function (value) {
            _this.title.setTitle(value + ' ' + _this.currentRoomId);
        });
        if (this.route.snapshot.queryParamMap.has('loadAvatar')) {
            this.proc.loadAvatar = this.route.snapshot.queryParamMap.get('loadAvatar').toLowerCase() === 'true';
        }
        if (this.route.snapshot.queryParamMap.has('levelFilter')) {
            this.proc.userLevelFilter = Number(this.route.snapshot.queryParamMap.get('levelFilter'));
        }
        if (this.route.snapshot.queryParamMap.has('hideGiftDanmaku')) {
            this.proc.hideGiftDanmaku = this.route.snapshot.queryParamMap.get('hideGiftDanmaku').toLowerCase() === 'true';
        }
        if (this.route.snapshot.queryParamMap.has('showGift')) {
            this.proc.showGift = this.route.snapshot.queryParamMap.get('showGift').toLowerCase() === 'true';
        }
        if (this.route.snapshot.queryParamMap.has('giftOnly')) {
            this.renderer.displayMode = this.route.snapshot.queryParamMap.get('giftOnly').toLowerCase() === 'true' ? 2 : 3;
        }
        if (this.route.snapshot.queryParamMap.has('wordFilter')) {
            this.proc.wordFilter = this.proc.wordFilter.concat(String(this.route.snapshot.queryParamMap.get('wordFilter')).split(','));
        }
        if (this.route.snapshot.queryParamMap.has('blackList')) {
            this.proc.blackList = this.proc.blackList.concat(String(this.route.snapshot.queryParamMap.get('blackList')).split(',').map(function (x) { return Number(x); }));
        }
        if (this.route.snapshot.queryParamMap.has('groupSimilar')) {
            this.renderer.groupSimilar = this.route.snapshot.queryParamMap.get('groupSimilar').toLowerCase() === 'true';
        }
        if (this.route.snapshot.queryParamMap.has('pure')) {
            this.proc.pure = this.route.snapshot.queryParamMap.get('pure').toLowerCase() === 'true';
        }
        if (this.route.snapshot.queryParamMap.has('minGiftValue')) {
            this.proc.minGiftValue = Number(this.route.snapshot.queryParamMap.get('minGiftValue'));
        }
        if (this.route.snapshot.queryParamMap.has('silverGiftRatio')) {
            this.proc.silverGiftRatio = Number(this.route.snapshot.queryParamMap.get('silverGiftRatio'));
        }
    };
    AlphaComponent.prototype.onload = function () {
        var _this = this;
        if (this.currentRoomId <= 0) {
            this.translate.get('IDFORMATERROR').subscribe(function (value) {
                _this.renderer.sendSystemInfo(value);
            });
            return;
        }
        if (this.proc.pure) {
            this.start(this.currentRoomId);
        }
        else {
            this.translate.get('GETROOMINFO').subscribe(function (value) {
                _this.renderer.sendSystemInfo(value);
            });
            this.http.get(_environments_environment__WEBPACK_IMPORTED_MODULE_8__["environment"].api_server + "/stat/" + this.currentRoomId).subscribe(function (x) {
                _this.bili.ownerId = x.uid;
                if (x.config) {
                    _this.proc.loadAvatar = x.config.loadAvatar || _this.proc.loadAvatar;
                    _this.proc.userLevelFilter = x.config.levelFilter || _this.proc.userLevelFilter;
                    _this.proc.hideGiftDanmaku = x.config.hideGiftDanmaku || _this.proc.hideGiftDanmaku;
                    _this.proc.showGift = x.config.showGift || _this.proc.showGift;
                    _this.proc.minGiftValue = x.config.minGiftValue || _this.proc.minGiftValue;
                    _this.proc.silverGiftRatio = x.config.silverGiftRatio || _this.proc.silverGiftRatio;
                    _this.proc.wordFilter = _this.proc.wordFilter.concat(x.config.wordFilter || []);
                    _this.proc.blackList = _this.proc.blackList.concat(x.config.blackList || []);
                    _this.proc.customEmotions = x.config.customEmotions || [];
                    _this.proc.customGiftLevel = x.config.customGiftLevel || _this.proc.customGiftLevel;
                    _this.proc.customGiftLevel.sort(function (a, b) { return b.value - a.value; }); // sort from large to small
                    _this.renderer.displayMode = x.config.displayMode || _this.renderer.displayMode;
                    _this.renderer.groupSimilar = x.config.groupSimilar || _this.renderer.groupSimilar;
                    _this.renderer.groupSimilarWindow = x.config.groupSimilarWindow || _this.renderer.groupSimilarWindow;
                    _this.renderer.maxDammakuNum = x.config.maxDammakuNumber || _this.renderer.maxDammakuNum;
                }
                _this.start(x.room_id);
            }, function (e) {
                _this.translate.get('ROOMINFORAWID').subscribe(function (value) {
                    _this.renderer.sendSystemInfo(value);
                });
                _this.start(_this.currentRoomId);
            });
        }
    };
    AlphaComponent.prototype.start = function (realRoomId) {
        var _this = this;
        this.translate.get('CONNECTING').subscribe(function (value) {
            _this.renderer.sendSystemInfo(value + realRoomId + '...');
        });
        this.bili.connect(Number(realRoomId)).subscribe(function (message) {
            if (message.type === 'connected') {
                _this.translate.get('CONNECTED').subscribe(function (value) {
                    _this.renderer.sendSystemInfo(value);
                });
                if (_environments_environment__WEBPACK_IMPORTED_MODULE_8__["environment"].official) {
                    // this.renderer.sendSystemInfo('你正在使用公共服务器提供的服务，为了更高的稳定性，建议使用本地部署版本。详情访问https://bilichat.3shain.com');
                }
            }
            else {
                _this.renderer.sendDanmaku(message);
            }
        }, function (e) {
            if (e.target.readyState === WebSocket.CLOSED) {
                _this.translate.get('CONNECTCLOSED').subscribe(function (value) {
                    _this.renderer.sendSystemInfo(value);
                });
                setTimeout(function () { return _this.start(realRoomId); }, 5000);
            }
        }, function () {
            _this.translate.get('DISCONNECTED').subscribe(function (value) {
                _this.renderer.sendSystemInfo(value);
            });
            _this.start(realRoomId); // 重连
        });
    };
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ViewChild"])('renderer'),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", _chat_renderer_chat_renderer_component__WEBPACK_IMPORTED_MODULE_5__["ChatRendererComponent"])
    ], AlphaComponent.prototype, "renderer", void 0);
    AlphaComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-alpha',
            template: __webpack_require__(/*! ./alpha.component.html */ "./src/app/alpha/alpha.component.html"),
            encapsulation: _angular_core__WEBPACK_IMPORTED_MODULE_1__["ViewEncapsulation"].None,
            styles: [__webpack_require__(/*! ./alpha.component.css */ "./src/app/alpha/alpha.component.css")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_angular_router__WEBPACK_IMPORTED_MODULE_2__["ActivatedRoute"],
            _angular_platform_browser__WEBPACK_IMPORTED_MODULE_3__["Title"],
            _message_processor_service__WEBPACK_IMPORTED_MODULE_4__["MessageProcessorService"],
            _biliws_service__WEBPACK_IMPORTED_MODULE_6__["BiliwsService"],
            _angular_common_http__WEBPACK_IMPORTED_MODULE_7__["HttpClient"],
            _ngx_translate_core__WEBPACK_IMPORTED_MODULE_9__["TranslateService"]])
    ], AlphaComponent);
    return AlphaComponent;
}());



/***/ }),

/***/ "./src/app/alpha/chat-renderer/chat-renderer.component.css":
/*!*****************************************************************!*\
  !*** ./src/app/alpha/chat-renderer/chat-renderer.component.css ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\r\nyt-live-chat-renderer {\r\n    font-family: 'Microsoft YaHei';\r\n    font-size: 13px;\r\n    --yt-emoji-picker-renderer-height: 30%;\r\n    --yt-button-default-text-color: var(--yt-live-chat-button-default-text-color);\r\n    --yt-button-default-background-color: var(--yt-live-chat-button-default-background-color);\r\n    --yt-button-dark-text-color: var(--yt-live-chat-button-dark-text-color);\r\n    --yt-button-dark-background-color: var(--yt-live-chat-button-dark-background-color);\r\n    --yt-button-payment-background-color: var(--yt-live-chat-sponsor-color);\r\n}\r\n\r\nyt-live-chat-paid-message-renderer {\r\n    position: relative;\r\n    display: block;\r\n    padding: 4px 24px;\r\n    font-size: 15px;\r\n    --yt-live-chat-paid-message-background-color: var(--yt-live-chat-paid-message-primary-color);\r\n    --yt-live-chat-paid-message-header-background-color: var(--yt-live-chat-paid-message-secondary-color);\r\n    --yt-live-chat-text-input-field-placeholder-color: var(--yt-live-chat-paid-message-color);\r\n    --yt-live-chat-item-timestamp-display: var(--yt-live-chat-paid-message-timestamp-display, none);\r\n}\r\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvYWxwaGEvY2hhdC1yZW5kZXJlci9jaGF0LXJlbmRlcmVyLmNvbXBvbmVudC5jc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUNBO0lBQ0ksOEJBQThCO0lBQzlCLGVBQWU7SUFDZixzQ0FBc0M7SUFDdEMsNkVBQTZFO0lBQzdFLHlGQUF5RjtJQUN6Rix1RUFBdUU7SUFDdkUsbUZBQW1GO0lBQ25GLHVFQUF1RTtBQUMzRTs7QUFFQTtJQUNJLGtCQUFrQjtJQUNsQixjQUFjO0lBQ2QsaUJBQWlCO0lBQ2pCLGVBQWU7SUFDZiw0RkFBNEY7SUFDNUYscUdBQXFHO0lBQ3JHLHlGQUF5RjtJQUN6RiwrRkFBK0Y7QUFDbkciLCJmaWxlIjoic3JjL2FwcC9hbHBoYS9jaGF0LXJlbmRlcmVyL2NoYXQtcmVuZGVyZXIuY29tcG9uZW50LmNzcyIsInNvdXJjZXNDb250ZW50IjpbIlxyXG55dC1saXZlLWNoYXQtcmVuZGVyZXIge1xyXG4gICAgZm9udC1mYW1pbHk6ICdNaWNyb3NvZnQgWWFIZWknO1xyXG4gICAgZm9udC1zaXplOiAxM3B4O1xyXG4gICAgLS15dC1lbW9qaS1waWNrZXItcmVuZGVyZXItaGVpZ2h0OiAzMCU7XHJcbiAgICAtLXl0LWJ1dHRvbi1kZWZhdWx0LXRleHQtY29sb3I6IHZhcigtLXl0LWxpdmUtY2hhdC1idXR0b24tZGVmYXVsdC10ZXh0LWNvbG9yKTtcclxuICAgIC0teXQtYnV0dG9uLWRlZmF1bHQtYmFja2dyb3VuZC1jb2xvcjogdmFyKC0teXQtbGl2ZS1jaGF0LWJ1dHRvbi1kZWZhdWx0LWJhY2tncm91bmQtY29sb3IpO1xyXG4gICAgLS15dC1idXR0b24tZGFyay10ZXh0LWNvbG9yOiB2YXIoLS15dC1saXZlLWNoYXQtYnV0dG9uLWRhcmstdGV4dC1jb2xvcik7XHJcbiAgICAtLXl0LWJ1dHRvbi1kYXJrLWJhY2tncm91bmQtY29sb3I6IHZhcigtLXl0LWxpdmUtY2hhdC1idXR0b24tZGFyay1iYWNrZ3JvdW5kLWNvbG9yKTtcclxuICAgIC0teXQtYnV0dG9uLXBheW1lbnQtYmFja2dyb3VuZC1jb2xvcjogdmFyKC0teXQtbGl2ZS1jaGF0LXNwb25zb3ItY29sb3IpO1xyXG59XHJcblxyXG55dC1saXZlLWNoYXQtcGFpZC1tZXNzYWdlLXJlbmRlcmVyIHtcclxuICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcclxuICAgIGRpc3BsYXk6IGJsb2NrO1xyXG4gICAgcGFkZGluZzogNHB4IDI0cHg7XHJcbiAgICBmb250LXNpemU6IDE1cHg7XHJcbiAgICAtLXl0LWxpdmUtY2hhdC1wYWlkLW1lc3NhZ2UtYmFja2dyb3VuZC1jb2xvcjogdmFyKC0teXQtbGl2ZS1jaGF0LXBhaWQtbWVzc2FnZS1wcmltYXJ5LWNvbG9yKTtcclxuICAgIC0teXQtbGl2ZS1jaGF0LXBhaWQtbWVzc2FnZS1oZWFkZXItYmFja2dyb3VuZC1jb2xvcjogdmFyKC0teXQtbGl2ZS1jaGF0LXBhaWQtbWVzc2FnZS1zZWNvbmRhcnktY29sb3IpO1xyXG4gICAgLS15dC1saXZlLWNoYXQtdGV4dC1pbnB1dC1maWVsZC1wbGFjZWhvbGRlci1jb2xvcjogdmFyKC0teXQtbGl2ZS1jaGF0LXBhaWQtbWVzc2FnZS1jb2xvcik7XHJcbiAgICAtLXl0LWxpdmUtY2hhdC1pdGVtLXRpbWVzdGFtcC1kaXNwbGF5OiB2YXIoLS15dC1saXZlLWNoYXQtcGFpZC1tZXNzYWdlLXRpbWVzdGFtcC1kaXNwbGF5LCBub25lKTtcclxufSJdfQ== */"

/***/ }),

/***/ "./src/app/alpha/chat-renderer/chat-renderer.component.html":
/*!******************************************************************!*\
  !*** ./src/app/alpha/chat-renderer/chat-renderer.component.html ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div id=\"items\" class=\"style-scope yt-live-chat-item-list-render yt-live-chat-renderer\">\r\n  <ng-container *ngFor=\"let item of danmakuList\" [ngSwitch]=\"item.type\">\r\n    <yt-live-chat-text-message-renderer *ngSwitchCase=\"'danmaku'\" [item]=\"item\"></yt-live-chat-text-message-renderer>\r\n    <yt-live-chat-paid-message-renderer *ngSwitchCase=\"'gift'\" [item]=\"item\"></yt-live-chat-paid-message-renderer>\r\n  </ng-container>\r\n</div>"

/***/ }),

/***/ "./src/app/alpha/chat-renderer/chat-renderer.component.ts":
/*!****************************************************************!*\
  !*** ./src/app/alpha/chat-renderer/chat-renderer.component.ts ***!
  \****************************************************************/
/*! exports provided: ChatRendererComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ChatRendererComponent", function() { return ChatRendererComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _app_danmaku_def__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../app/danmaku.def */ "./src/app/danmaku.def.ts");




var ChatRendererComponent = /** @class */ (function () {
    function ChatRendererComponent(plat) {
        this.plat = plat;
        this.maxDammakuNum = 100;
        this.displayMode = 3;
        this.groupSimilar = true;
        this.groupSimilarWindow = 5;
        this.danmakuList = [];
        this.waitForRendering = [];
        this.groupSimilarCache = [];
        this.onawake = new _angular_core__WEBPACK_IMPORTED_MODULE_1__["EventEmitter"]();
    }
    ChatRendererComponent.prototype.onFrame = function () {
        if (Date.now() - this.lastRenderInvoke > 1000) { // 窗口不在active状态时，此方法不会被调用。
            this.waitForRendering = [];
            // this.sendSystemInfo('窗口已恢复激活');
        }
        this.lastRenderInvoke = Date.now();
        if (this.waitForRendering.length > 0) {
            if (Date.now() - this.lastRenderPush >= (1000.0 / this.waitForRendering.length)) {
                this.lastRenderPush = Date.now();
                while (this.danmakuList.length > this.maxDammakuNum) {
                    this.danmakuList.shift();
                }
                this.danmakuList.push(this.waitForRendering.shift());
            }
        }
        requestAnimationFrame(this.onFrame.bind(this));
    };
    ChatRendererComponent.prototype.ngOnInit = function () {
        if (!Object(_angular_common__WEBPACK_IMPORTED_MODULE_2__["isPlatformBrowser"])(this.plat)) {
            return;
        }
        requestAnimationFrame(this.awake.bind(this));
    };
    ChatRendererComponent.prototype.awake = function () {
        this.onawake.emit();
        this.lastRenderInvoke = Date.now();
        this.lastRenderPush = Date.now();
        requestAnimationFrame(this.onFrame.bind(this));
    };
    ChatRendererComponent.prototype.sendSystemInfo = function (msg, force) {
        if (force === void 0) { force = false; }
        this.sendDanmaku(new _app_danmaku_def__WEBPACK_IMPORTED_MODULE_3__["DanmakuMessage"](-1, 'BILICHAT', msg, 0, true, undefined, 'assets/logo_icon.png'), force);
    };
    ChatRendererComponent.prototype.sendDanmaku = function (msg, force) {
        if (force === void 0) { force = false; }
        if ((this.displayMode & msg.mode) === 0 && msg.uid !== -1) {
            return;
        }
        if (msg.type === 'danmaku' && msg.uid > 0) {
            for (var _i = 0, _a = this.groupSimilarCache; _i < _a.length; _i++) {
                var c = _a[_i];
                if (this.groupSimilar
                    && (c.message.indexOf(msg.message) !== -1 || msg.message.indexOf(c.message) !== -1)
                    && (Math.abs(c.message.length - msg.message.length) < Math.min(c.message.length, msg.message.length))) {
                    c.repeat++;
                    return; // 如果存在相似元素,会在这里被截断
                }
            }
            this.groupSimilarCache.unshift(msg);
            while (this.groupSimilarCache.length > this.groupSimilarWindow) {
                this.groupSimilarCache.pop();
            }
        }
        if (force) {
            this.danmakuList.push(msg);
        }
        else {
            this.waitForRendering.push(msg);
        }
    };
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])(),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", Object)
    ], ChatRendererComponent.prototype, "maxDammakuNum", void 0);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])(),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", Object)
    ], ChatRendererComponent.prototype, "displayMode", void 0);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])(),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", Object)
    ], ChatRendererComponent.prototype, "groupSimilar", void 0);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Output"])(),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", _angular_core__WEBPACK_IMPORTED_MODULE_1__["EventEmitter"])
    ], ChatRendererComponent.prototype, "onawake", void 0);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])(),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", Object)
    ], ChatRendererComponent.prototype, "groupSimilarWindow", void 0);
    ChatRendererComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'yt-live-chat-renderer',
            template: __webpack_require__(/*! ./chat-renderer.component.html */ "./src/app/alpha/chat-renderer/chat-renderer.component.html"),
            styles: [__webpack_require__(/*! ./chat-renderer.component.css */ "./src/app/alpha/chat-renderer/chat-renderer.component.css")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__param"](0, Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Inject"])(_angular_core__WEBPACK_IMPORTED_MODULE_1__["PLATFORM_ID"])),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [Object])
    ], ChatRendererComponent);
    return ChatRendererComponent;
}());



/***/ }),

/***/ "./src/app/alpha/image/image.component.css":
/*!*************************************************!*\
  !*** ./src/app/alpha/image/image.component.css ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "yt-img-shadow.no-transition {\r\n    opacity: 1;\r\n    transition: none;\r\n}\r\n\r\nyt-img-shadow[loaded] {\r\n    opacity: 1;\r\n}\r\n\r\nyt-img-shadow {\r\n    display: inline-block;\r\n    opacity: 0;\r\n    transition: opacity 0.2s;\r\n    flex: none;\r\n}\r\n\r\nimg.yt-img-shadow {\r\n    margin: 0;\r\n    padding: 0;\r\n    border: 0;\r\n    background: transparent;\r\n}\r\n\r\nimg.yt-img-shadow {\r\n    display: block;\r\n    margin-left: auto;\r\n    margin-right: auto;\r\n    max-height: none;\r\n    max-width: 100%;\r\n    height: 100%;\r\n    width: 100%;\r\n    border-radius: none;\r\n}\r\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvYWxwaGEvaW1hZ2UvaW1hZ2UuY29tcG9uZW50LmNzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtJQUNJLFVBQVU7SUFDVixnQkFBZ0I7QUFDcEI7O0FBRUE7SUFDSSxVQUFVO0FBQ2Q7O0FBRUE7SUFDSSxxQkFBcUI7SUFDckIsVUFBVTtJQUNWLHdCQUF3QjtJQUd4QixVQUFVO0FBQ2Q7O0FBR0E7SUFDSSxTQUFTO0lBQ1QsVUFBVTtJQUNWLFNBQVM7SUFDVCx1QkFBdUI7QUFDM0I7O0FBRUE7SUFDSSxjQUFjO0lBQ2QsaUJBQWlCO0lBQ2pCLGtCQUFrQjtJQUNsQixnQkFBZ0I7SUFDaEIsZUFBZTtJQUNmLFlBQVk7SUFDWixXQUFXO0lBQ1gsbUJBQW1CO0FBQ3ZCIiwiZmlsZSI6InNyYy9hcHAvYWxwaGEvaW1hZ2UvaW1hZ2UuY29tcG9uZW50LmNzcyIsInNvdXJjZXNDb250ZW50IjpbInl0LWltZy1zaGFkb3cubm8tdHJhbnNpdGlvbiB7XHJcbiAgICBvcGFjaXR5OiAxO1xyXG4gICAgdHJhbnNpdGlvbjogbm9uZTtcclxufVxyXG5cclxueXQtaW1nLXNoYWRvd1tsb2FkZWRdIHtcclxuICAgIG9wYWNpdHk6IDE7XHJcbn1cclxuXHJcbnl0LWltZy1zaGFkb3cge1xyXG4gICAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xyXG4gICAgb3BhY2l0eTogMDtcclxuICAgIHRyYW5zaXRpb246IG9wYWNpdHkgMC4ycztcclxuICAgIC1tcy1mbGV4OiBub25lO1xyXG4gICAgLXdlYmtpdC1mbGV4OiBub25lO1xyXG4gICAgZmxleDogbm9uZTtcclxufVxyXG5cclxuXHJcbmltZy55dC1pbWctc2hhZG93IHtcclxuICAgIG1hcmdpbjogMDtcclxuICAgIHBhZGRpbmc6IDA7XHJcbiAgICBib3JkZXI6IDA7XHJcbiAgICBiYWNrZ3JvdW5kOiB0cmFuc3BhcmVudDtcclxufVxyXG5cclxuaW1nLnl0LWltZy1zaGFkb3cge1xyXG4gICAgZGlzcGxheTogYmxvY2s7XHJcbiAgICBtYXJnaW4tbGVmdDogYXV0bztcclxuICAgIG1hcmdpbi1yaWdodDogYXV0bztcclxuICAgIG1heC1oZWlnaHQ6IG5vbmU7XHJcbiAgICBtYXgtd2lkdGg6IDEwMCU7XHJcbiAgICBoZWlnaHQ6IDEwMCU7XHJcbiAgICB3aWR0aDogMTAwJTtcclxuICAgIGJvcmRlci1yYWRpdXM6IG5vbmU7XHJcbn0iXX0= */"

/***/ }),

/***/ "./src/app/alpha/image/image.component.html":
/*!**************************************************!*\
  !*** ./src/app/alpha/image/image.component.html ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<img id=\"img\" referrerpolicy=\"no-referer\" class=\"style-scope yt-img-shadow\" height=\"{{height}}\" width=\"{{width}}\" src=\"{{avatarUrl}}\">"

/***/ }),

/***/ "./src/app/alpha/image/image.component.ts":
/*!************************************************!*\
  !*** ./src/app/alpha/image/image.component.ts ***!
  \************************************************/
/*! exports provided: ImageComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ImageComponent", function() { return ImageComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");


var ImageComponent = /** @class */ (function () {
    function ImageComponent() {
    }
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])(),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", String)
    ], ImageComponent.prototype, "avatarUrl", void 0);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])(),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", Number)
    ], ImageComponent.prototype, "height", void 0);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])(),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", Number)
    ], ImageComponent.prototype, "width", void 0);
    ImageComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'yt-img-shadow',
            template: __webpack_require__(/*! ./image.component.html */ "./src/app/alpha/image/image.component.html"),
            encapsulation: _angular_core__WEBPACK_IMPORTED_MODULE_1__["ViewEncapsulation"].None,
            styles: [__webpack_require__(/*! ./image.component.css */ "./src/app/alpha/image/image.component.css")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [])
    ], ImageComponent);
    return ImageComponent;
}());



/***/ }),

/***/ "./src/app/alpha/message/message.component.css":
/*!*****************************************************!*\
  !*** ./src/app/alpha/message/message.component.css ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "#content.yt-live-chat-text-message-renderer {\r\n    -ms-align-self: center;\r\n    -webkit-align-self: center;\r\n    display: inline-block;\r\n    vertical-align: middle;\r\n    padding-right: 30px;\r\n    align-self: center;\r\n    white-space: normal;\r\n    min-width: 0;\r\n}\r\n\r\n#emotion.yt-live-chat-text-message-renderer{\r\n    vertical-align: text-top;\r\n    height: unset !important;\r\n    width: unset !important;\r\n    max-height: 120px;\r\n    opacity: var(--yt-live-chat-text-message-renderer-message-message-style_-_opacity);\r\n}\r\n\r\n#message.yt-live-chat-text-message-renderer {\r\n    color: var(--yt-live-chat-primary-text-color, var(--yt-primary-text-color));\r\n    line-height: 16px;\r\n    overflow: hidden;\r\n    overflow-wrap: break-word;\r\n    word-wrap: break-word;\r\n    word-break: break-word;\r\n    font-style: var(--yt-live-chat-text-message-renderer-message-message-style_-_font-style);\r\n    opacity: var(--yt-live-chat-text-message-renderer-message-message-style_-_opacity);\r\n}\r\n\r\n#repeat_count.yt-live-chat-text-message-renderer {\r\n    color: white;\r\n    line-height: 16px;\r\n    overflow: hidden;\r\n    overflow-wrap: break-word;\r\n    word-wrap: break-word;\r\n    word-break: break-word;\r\n    font-style: var(--yt-live-chat-text-message-renderer-message-message-style_-_font-style);\r\n    opacity: var(--yt-live-chat-text-message-renderer-message-message-style_-_opacity);\r\n    /*background: var(--yt-live-chat-mention-background-color);*/\r\n    margin-left: 0.5em;\r\n    border-radius: 0.5em;\r\n    padding: 0 0.35em;\r\n    text-shadow: none !important;\r\n}\r\n\r\n#author-photo.yt-live-chat-text-message-renderer {\r\n    display: inline-block;\r\n    vertical-align: middle;\r\n    margin-right: 16px;\r\n    overflow: hidden;\r\n    border-radius: 50%;\r\n    flex: none;\r\n}\r\n\r\nspan.yt-live-chat-text-message-renderer,\r\ndiv.yt-live-chat-text-message-renderer\r\n{\r\n    margin: 0;\r\n    padding: 0;\r\n    border: 0;\r\n    background: transparent;\r\n}\r\n\r\nyt-live-chat-author-chip.yt-live-chat-text-message-renderer {\r\n    margin-right: 8px;\r\n}\r\n\r\n#author-name.yt-live-chat-author-chip {\r\n    box-sizing: border-box;\r\n    border-radius: 2px;\r\n    color: var(--yt-live-chat-secondary-text-color);\r\n    font-weight: 500;\r\n}\r\n\r\n#author-name.yt-live-chat-author-chip[type='member'] {\r\n    color: var(--yt-live-chat-sponsor-color);\r\n}\r\n\r\n#author-name.yt-live-chat-author-chip[type='moderator'] {\r\n    color: var(--yt-live-chat-moderator-color);\r\n}\r\n\r\nimg.yt-live-chat-author-badge-renderer,\r\ndiv.yt-live-chat-author-badge-renderer,\r\nspan.yt-live-chat-author-chip{\r\n    margin: 0;\r\n    padding: 0;\r\n    border: 0;\r\n    background: transparent;\r\n}\r\n\r\nyt-live-chat-text-message-renderer {\r\n    position: relative;\r\n    font-size: 13px;\r\n    padding: 4px 24px;\r\n    white-space: nowrap;\r\n    --yt-endpoint-color: var(--yt-live-chat-primary-text-color, hsl(0, 0%, 6.7%));\r\n    --yt-endpoint-hover-color: var(--yt-live-chat-primary-text-color, var(--yt-endpoint-color));\r\n    display: block;\r\n    flex-direction: row;\r\n    align-items: flex-start;\r\n}\r\n\r\nyt-live-chat-author-badge-renderer.yt-live-chat-author-chip {\r\n    margin: 0 0 0 2px;\r\n    vertical-align: sub;\r\n}\r\n\r\nyt-live-chat-author-badge-renderer[type='member'] {\r\n    color: var(--yt-live-chat-sponsor-color, #107516);\r\n}\r\n\r\nyt-live-chat-author-badge-renderer[type='moderator'] {\r\n    color: var(--yt-live-chat-moderator-color, #5e84f1);\r\n}\r\n\r\nyt-live-chat-author-badge-renderer {\r\n    display: inline-block;\r\n}\r\n\r\nimg.yt-live-chat-author-badge-renderer, yt-icon.yt-live-chat-author-badge-renderer {\r\n    display: block;\r\n    width: 16px;\r\n    height: 16px;\r\n}\r\n\r\nyt-icon, .yt-icon-container.yt-icon {\r\n    display: inline-flex;\r\n    align-items: center;\r\n    justify-content: center;\r\n    position: relative;\r\n    vertical-align: middle;\r\n    fill: currentcolor;\r\n    stroke: none;\r\n    width: var(--iron-icon-width, 24px);\r\n    height: var(--iron-icon-height, 24px);\r\n}\r\n\r\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvYWxwaGEvbWVzc2FnZS9tZXNzYWdlLmNvbXBvbmVudC5jc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7SUFDSSxzQkFBc0I7SUFDdEIsMEJBQTBCO0lBQzFCLHFCQUFxQjtJQUNyQixzQkFBc0I7SUFDdEIsbUJBQW1CO0lBQ25CLGtCQUFrQjtJQUNsQixtQkFBbUI7SUFDbkIsWUFBWTtBQUNoQjs7QUFFQTtJQUNJLHdCQUF3QjtJQUN4Qix3QkFBd0I7SUFDeEIsdUJBQXVCO0lBQ3ZCLGlCQUFpQjtJQUNqQixrRkFBa0Y7QUFDdEY7O0FBRUE7SUFDSSwyRUFBMkU7SUFDM0UsaUJBQWlCO0lBQ2pCLGdCQUFnQjtJQUNoQix5QkFBeUI7SUFDekIscUJBQXFCO0lBQ3JCLHNCQUFzQjtJQUN0Qix3RkFBd0Y7SUFDeEYsa0ZBQWtGO0FBQ3RGOztBQUVBO0lBQ0ksWUFBWTtJQUNaLGlCQUFpQjtJQUNqQixnQkFBZ0I7SUFDaEIseUJBQXlCO0lBQ3pCLHFCQUFxQjtJQUNyQixzQkFBc0I7SUFDdEIsd0ZBQXdGO0lBQ3hGLGtGQUFrRjtJQUNsRiw0REFBNEQ7SUFDNUQsa0JBQWtCO0lBQ2xCLG9CQUFvQjtJQUNwQixpQkFBaUI7SUFDakIsNEJBQTRCO0FBQ2hDOztBQUVBO0lBQ0kscUJBQXFCO0lBQ3JCLHNCQUFzQjtJQUN0QixrQkFBa0I7SUFDbEIsZ0JBQWdCO0lBQ2hCLGtCQUFrQjtJQUdsQixVQUFVO0FBQ2Q7O0FBRUE7OztJQUdJLFNBQVM7SUFDVCxVQUFVO0lBQ1YsU0FBUztJQUNULHVCQUF1QjtBQUMzQjs7QUFFQTtJQUNJLGlCQUFpQjtBQUNyQjs7QUFFQTtJQUNJLHNCQUFzQjtJQUN0QixrQkFBa0I7SUFDbEIsK0NBQStDO0lBQy9DLGdCQUFnQjtBQUNwQjs7QUFFQTtJQUNJLHdDQUF3QztBQUM1Qzs7QUFFQTtJQUNJLDBDQUEwQztBQUM5Qzs7QUFFQTs7O0lBR0ksU0FBUztJQUNULFVBQVU7SUFDVixTQUFTO0lBQ1QsdUJBQXVCO0FBQzNCOztBQUVBO0lBQ0ksa0JBQWtCO0lBQ2xCLGVBQWU7SUFDZixpQkFBaUI7SUFDakIsbUJBQW1CO0lBQ25CLDZFQUE2RTtJQUM3RSwyRkFBMkY7SUFDM0YsY0FBYztJQUdkLG1CQUFtQjtJQUduQix1QkFBdUI7QUFDM0I7O0FBRUE7SUFDSSxpQkFBaUI7SUFDakIsbUJBQW1CO0FBQ3ZCOztBQUVBO0lBQ0ksaURBQWlEO0FBQ3JEOztBQUNBO0lBQ0ksbURBQW1EO0FBQ3ZEOztBQUNBO0lBQ0kscUJBQXFCO0FBQ3pCOztBQUVBO0lBQ0ksY0FBYztJQUNkLFdBQVc7SUFDWCxZQUFZO0FBQ2hCOztBQUVBO0lBQ0ksb0JBQW9CO0lBR3BCLG1CQUFtQjtJQUduQix1QkFBdUI7SUFDdkIsa0JBQWtCO0lBQ2xCLHNCQUFzQjtJQUN0QixrQkFBa0I7SUFDbEIsWUFBWTtJQUNaLG1DQUFtQztJQUNuQyxxQ0FBcUM7QUFDekMiLCJmaWxlIjoic3JjL2FwcC9hbHBoYS9tZXNzYWdlL21lc3NhZ2UuY29tcG9uZW50LmNzcyIsInNvdXJjZXNDb250ZW50IjpbIiNjb250ZW50Lnl0LWxpdmUtY2hhdC10ZXh0LW1lc3NhZ2UtcmVuZGVyZXIge1xyXG4gICAgLW1zLWFsaWduLXNlbGY6IGNlbnRlcjtcclxuICAgIC13ZWJraXQtYWxpZ24tc2VsZjogY2VudGVyO1xyXG4gICAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xyXG4gICAgdmVydGljYWwtYWxpZ246IG1pZGRsZTtcclxuICAgIHBhZGRpbmctcmlnaHQ6IDMwcHg7XHJcbiAgICBhbGlnbi1zZWxmOiBjZW50ZXI7XHJcbiAgICB3aGl0ZS1zcGFjZTogbm9ybWFsO1xyXG4gICAgbWluLXdpZHRoOiAwO1xyXG59XHJcblxyXG4jZW1vdGlvbi55dC1saXZlLWNoYXQtdGV4dC1tZXNzYWdlLXJlbmRlcmVye1xyXG4gICAgdmVydGljYWwtYWxpZ246IHRleHQtdG9wO1xyXG4gICAgaGVpZ2h0OiB1bnNldCAhaW1wb3J0YW50O1xyXG4gICAgd2lkdGg6IHVuc2V0ICFpbXBvcnRhbnQ7XHJcbiAgICBtYXgtaGVpZ2h0OiAxMjBweDtcclxuICAgIG9wYWNpdHk6IHZhcigtLXl0LWxpdmUtY2hhdC10ZXh0LW1lc3NhZ2UtcmVuZGVyZXItbWVzc2FnZS1tZXNzYWdlLXN0eWxlXy1fb3BhY2l0eSk7XHJcbn1cclxuXHJcbiNtZXNzYWdlLnl0LWxpdmUtY2hhdC10ZXh0LW1lc3NhZ2UtcmVuZGVyZXIge1xyXG4gICAgY29sb3I6IHZhcigtLXl0LWxpdmUtY2hhdC1wcmltYXJ5LXRleHQtY29sb3IsIHZhcigtLXl0LXByaW1hcnktdGV4dC1jb2xvcikpO1xyXG4gICAgbGluZS1oZWlnaHQ6IDE2cHg7XHJcbiAgICBvdmVyZmxvdzogaGlkZGVuO1xyXG4gICAgb3ZlcmZsb3ctd3JhcDogYnJlYWstd29yZDtcclxuICAgIHdvcmQtd3JhcDogYnJlYWstd29yZDtcclxuICAgIHdvcmQtYnJlYWs6IGJyZWFrLXdvcmQ7XHJcbiAgICBmb250LXN0eWxlOiB2YXIoLS15dC1saXZlLWNoYXQtdGV4dC1tZXNzYWdlLXJlbmRlcmVyLW1lc3NhZ2UtbWVzc2FnZS1zdHlsZV8tX2ZvbnQtc3R5bGUpO1xyXG4gICAgb3BhY2l0eTogdmFyKC0teXQtbGl2ZS1jaGF0LXRleHQtbWVzc2FnZS1yZW5kZXJlci1tZXNzYWdlLW1lc3NhZ2Utc3R5bGVfLV9vcGFjaXR5KTtcclxufVxyXG5cclxuI3JlcGVhdF9jb3VudC55dC1saXZlLWNoYXQtdGV4dC1tZXNzYWdlLXJlbmRlcmVyIHtcclxuICAgIGNvbG9yOiB3aGl0ZTtcclxuICAgIGxpbmUtaGVpZ2h0OiAxNnB4O1xyXG4gICAgb3ZlcmZsb3c6IGhpZGRlbjtcclxuICAgIG92ZXJmbG93LXdyYXA6IGJyZWFrLXdvcmQ7XHJcbiAgICB3b3JkLXdyYXA6IGJyZWFrLXdvcmQ7XHJcbiAgICB3b3JkLWJyZWFrOiBicmVhay13b3JkO1xyXG4gICAgZm9udC1zdHlsZTogdmFyKC0teXQtbGl2ZS1jaGF0LXRleHQtbWVzc2FnZS1yZW5kZXJlci1tZXNzYWdlLW1lc3NhZ2Utc3R5bGVfLV9mb250LXN0eWxlKTtcclxuICAgIG9wYWNpdHk6IHZhcigtLXl0LWxpdmUtY2hhdC10ZXh0LW1lc3NhZ2UtcmVuZGVyZXItbWVzc2FnZS1tZXNzYWdlLXN0eWxlXy1fb3BhY2l0eSk7XHJcbiAgICAvKmJhY2tncm91bmQ6IHZhcigtLXl0LWxpdmUtY2hhdC1tZW50aW9uLWJhY2tncm91bmQtY29sb3IpOyovXHJcbiAgICBtYXJnaW4tbGVmdDogMC41ZW07XHJcbiAgICBib3JkZXItcmFkaXVzOiAwLjVlbTtcclxuICAgIHBhZGRpbmc6IDAgMC4zNWVtO1xyXG4gICAgdGV4dC1zaGFkb3c6IG5vbmUgIWltcG9ydGFudDtcclxufVxyXG5cclxuI2F1dGhvci1waG90by55dC1saXZlLWNoYXQtdGV4dC1tZXNzYWdlLXJlbmRlcmVyIHtcclxuICAgIGRpc3BsYXk6IGlubGluZS1ibG9jaztcclxuICAgIHZlcnRpY2FsLWFsaWduOiBtaWRkbGU7XHJcbiAgICBtYXJnaW4tcmlnaHQ6IDE2cHg7XHJcbiAgICBvdmVyZmxvdzogaGlkZGVuO1xyXG4gICAgYm9yZGVyLXJhZGl1czogNTAlO1xyXG4gICAgLW1zLWZsZXg6IG5vbmU7XHJcbiAgICAtd2Via2l0LWZsZXg6IG5vbmU7XHJcbiAgICBmbGV4OiBub25lO1xyXG59XHJcblxyXG5zcGFuLnl0LWxpdmUtY2hhdC10ZXh0LW1lc3NhZ2UtcmVuZGVyZXIsXHJcbmRpdi55dC1saXZlLWNoYXQtdGV4dC1tZXNzYWdlLXJlbmRlcmVyXHJcbntcclxuICAgIG1hcmdpbjogMDtcclxuICAgIHBhZGRpbmc6IDA7XHJcbiAgICBib3JkZXI6IDA7XHJcbiAgICBiYWNrZ3JvdW5kOiB0cmFuc3BhcmVudDtcclxufVxyXG5cclxueXQtbGl2ZS1jaGF0LWF1dGhvci1jaGlwLnl0LWxpdmUtY2hhdC10ZXh0LW1lc3NhZ2UtcmVuZGVyZXIge1xyXG4gICAgbWFyZ2luLXJpZ2h0OiA4cHg7XHJcbn1cclxuXHJcbiNhdXRob3ItbmFtZS55dC1saXZlLWNoYXQtYXV0aG9yLWNoaXAge1xyXG4gICAgYm94LXNpemluZzogYm9yZGVyLWJveDtcclxuICAgIGJvcmRlci1yYWRpdXM6IDJweDtcclxuICAgIGNvbG9yOiB2YXIoLS15dC1saXZlLWNoYXQtc2Vjb25kYXJ5LXRleHQtY29sb3IpO1xyXG4gICAgZm9udC13ZWlnaHQ6IDUwMDtcclxufVxyXG5cclxuI2F1dGhvci1uYW1lLnl0LWxpdmUtY2hhdC1hdXRob3ItY2hpcFt0eXBlPSdtZW1iZXInXSB7XHJcbiAgICBjb2xvcjogdmFyKC0teXQtbGl2ZS1jaGF0LXNwb25zb3ItY29sb3IpO1xyXG59XHJcblxyXG4jYXV0aG9yLW5hbWUueXQtbGl2ZS1jaGF0LWF1dGhvci1jaGlwW3R5cGU9J21vZGVyYXRvciddIHtcclxuICAgIGNvbG9yOiB2YXIoLS15dC1saXZlLWNoYXQtbW9kZXJhdG9yLWNvbG9yKTtcclxufVxyXG5cclxuaW1nLnl0LWxpdmUtY2hhdC1hdXRob3ItYmFkZ2UtcmVuZGVyZXIsXHJcbmRpdi55dC1saXZlLWNoYXQtYXV0aG9yLWJhZGdlLXJlbmRlcmVyLFxyXG5zcGFuLnl0LWxpdmUtY2hhdC1hdXRob3ItY2hpcHtcclxuICAgIG1hcmdpbjogMDtcclxuICAgIHBhZGRpbmc6IDA7XHJcbiAgICBib3JkZXI6IDA7XHJcbiAgICBiYWNrZ3JvdW5kOiB0cmFuc3BhcmVudDtcclxufVxyXG5cclxueXQtbGl2ZS1jaGF0LXRleHQtbWVzc2FnZS1yZW5kZXJlciB7XHJcbiAgICBwb3NpdGlvbjogcmVsYXRpdmU7XHJcbiAgICBmb250LXNpemU6IDEzcHg7XHJcbiAgICBwYWRkaW5nOiA0cHggMjRweDtcclxuICAgIHdoaXRlLXNwYWNlOiBub3dyYXA7XHJcbiAgICAtLXl0LWVuZHBvaW50LWNvbG9yOiB2YXIoLS15dC1saXZlLWNoYXQtcHJpbWFyeS10ZXh0LWNvbG9yLCBoc2woMCwgMCUsIDYuNyUpKTtcclxuICAgIC0teXQtZW5kcG9pbnQtaG92ZXItY29sb3I6IHZhcigtLXl0LWxpdmUtY2hhdC1wcmltYXJ5LXRleHQtY29sb3IsIHZhcigtLXl0LWVuZHBvaW50LWNvbG9yKSk7XHJcbiAgICBkaXNwbGF5OiBibG9jaztcclxuICAgIC1tcy1mbGV4LWRpcmVjdGlvbjogcm93O1xyXG4gICAgLXdlYmtpdC1mbGV4LWRpcmVjdGlvbjogcm93O1xyXG4gICAgZmxleC1kaXJlY3Rpb246IHJvdztcclxuICAgIC1tcy1mbGV4LWFsaWduOiBzdGFydDtcclxuICAgIC13ZWJraXQtYWxpZ24taXRlbXM6IGZsZXgtc3RhcnQ7XHJcbiAgICBhbGlnbi1pdGVtczogZmxleC1zdGFydDtcclxufVxyXG5cclxueXQtbGl2ZS1jaGF0LWF1dGhvci1iYWRnZS1yZW5kZXJlci55dC1saXZlLWNoYXQtYXV0aG9yLWNoaXAge1xyXG4gICAgbWFyZ2luOiAwIDAgMCAycHg7XHJcbiAgICB2ZXJ0aWNhbC1hbGlnbjogc3ViO1xyXG59XHJcblxyXG55dC1saXZlLWNoYXQtYXV0aG9yLWJhZGdlLXJlbmRlcmVyW3R5cGU9J21lbWJlciddIHtcclxuICAgIGNvbG9yOiB2YXIoLS15dC1saXZlLWNoYXQtc3BvbnNvci1jb2xvciwgIzEwNzUxNik7XHJcbn1cclxueXQtbGl2ZS1jaGF0LWF1dGhvci1iYWRnZS1yZW5kZXJlclt0eXBlPSdtb2RlcmF0b3InXSB7XHJcbiAgICBjb2xvcjogdmFyKC0teXQtbGl2ZS1jaGF0LW1vZGVyYXRvci1jb2xvciwgIzVlODRmMSk7XHJcbn1cclxueXQtbGl2ZS1jaGF0LWF1dGhvci1iYWRnZS1yZW5kZXJlciB7XHJcbiAgICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XHJcbn1cclxuXHJcbmltZy55dC1saXZlLWNoYXQtYXV0aG9yLWJhZGdlLXJlbmRlcmVyLCB5dC1pY29uLnl0LWxpdmUtY2hhdC1hdXRob3ItYmFkZ2UtcmVuZGVyZXIge1xyXG4gICAgZGlzcGxheTogYmxvY2s7XHJcbiAgICB3aWR0aDogMTZweDtcclxuICAgIGhlaWdodDogMTZweDtcclxufVxyXG5cclxueXQtaWNvbiwgLnl0LWljb24tY29udGFpbmVyLnl0LWljb24ge1xyXG4gICAgZGlzcGxheTogaW5saW5lLWZsZXg7XHJcbiAgICAtbXMtZmxleC1hbGlnbjogY2VudGVyO1xyXG4gICAgLXdlYmtpdC1hbGlnbi1pdGVtczogY2VudGVyO1xyXG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcclxuICAgIC1tcy1mbGV4LXBhY2s6IGNlbnRlcjtcclxuICAgIC13ZWJraXQtanVzdGlmeS1jb250ZW50OiBjZW50ZXI7XHJcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcclxuICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcclxuICAgIHZlcnRpY2FsLWFsaWduOiBtaWRkbGU7XHJcbiAgICBmaWxsOiBjdXJyZW50Y29sb3I7XHJcbiAgICBzdHJva2U6IG5vbmU7XHJcbiAgICB3aWR0aDogdmFyKC0taXJvbi1pY29uLXdpZHRoLCAyNHB4KTtcclxuICAgIGhlaWdodDogdmFyKC0taXJvbi1pY29uLWhlaWdodCwgMjRweCk7XHJcbn1cclxuIl19 */"

/***/ }),

/***/ "./src/app/alpha/message/message.component.html":
/*!******************************************************!*\
  !*** ./src/app/alpha/message/message.component.html ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<yt-img-shadow height=\"24\" width=\"24\" id=\"author-photo\" class=\"no-transition style-scope yt-live-chat-text-message-renderer\"\r\n[avatarUrl]=\"item.avatarUrl\"></yt-img-shadow>\r\n<div id=\"content\" class=\"style-scope yt-live-chat-text-message-renderer\">\r\n  <div id=\"timestamp\"></div>\r\n  <yt-live-chat-author-chip class=\"style-scope yt-live-chat-text-message-renderer\">\r\n    <span id=\"author-name\" class=\"style-scope yt-live-chat-author-chip\" [attr.type]=\"getType()\">{{item.username}}</span>\r\n    <span id=\"chat-badges\" class=\"style-scope yt-live-chat-author-chip\">\r\n      <yt-live-chat-author-badge-renderer *ngIf=\"item.is_admin\" class=\"style-scope yt-live-chat-author-chip\" type=\"moderator\">\r\n        <div id=\"image\" class=\"style-scope yt-live-chat-author-badge-renderer\">\r\n          <yt-icon class=\"style-scope yt-live-chat-author-badge-renderer\">\r\n            <svg viewBox=\"0 0 16 16\" preserveAspectRatio=\"xMidYMid meet\" focusable=\"false\" class=\"style-scope yt-icon\"\r\n              style=\"pointer-events: none; display: block; width: 100%; height: 100%;\">\r\n              <g class=\"style-scope yt-icon\">\r\n                <path d=\"M9.64589146,7.05569719 C9.83346524,6.562372 9.93617022,6.02722257 9.93617022,5.46808511 C9.93617022,3.00042984 7.93574038,1 5.46808511,1 C4.90894765,1 4.37379823,1.10270499 3.88047304,1.29027875 L6.95744681,4.36725249 L4.36725255,6.95744681 L1.29027875,3.88047305 C1.10270498,4.37379824 1,4.90894766 1,5.46808511 C1,7.93574038 3.00042984,9.93617022 5.46808511,9.93617022 C6.02722256,9.93617022 6.56237198,9.83346524 7.05569716,9.64589147 L12.4098057,15 L15,12.4098057 L9.64589146,7.05569719 Z\"\r\n                  class=\"style-scope yt-icon\"></path>\r\n              </g>\r\n            </svg>\r\n          </yt-icon>\r\n        </div>\r\n      </yt-live-chat-author-badge-renderer>\r\n      <yt-live-chat-author-badge-renderer *ngIf=\"item.guard>0\" class=\"style-scope yt-live-chat-author-chip\" type=\"member\">\r\n        <div id=\"image\" class=\"style-scope yt-live-chat-author-badge-renderer\">\r\n          <img [src]=\"getIcon()\"\r\n            class=\"style-scope yt-live-chat-author-badge-renderer\">\r\n        </div>\r\n      </yt-live-chat-author-badge-renderer>\r\n    </span>\r\n  </yt-live-chat-author-chip>\r\n  <span id=\"message\" *ngIf=\"!item.emotionUrl\" class=\"style-scope yt-live-chat-text-message-renderer\">{{item.message}}</span>\r\n  <img referrerpolicy=\"no-referer\" id=\"emotion\" *ngIf=\"item.emotionUrl\" [src]=\"item.emotionUrl\" class=\"style-scope yt-live-chat-text-message-renderer\">\r\n  <span id=\"repeat_count\" class=\"style-scope yt-live-chat-text-message-renderer\" *ngIf=\"item.repeat>1\" [ngStyle]=\"{'background-color':getRepeatGradientColor()}\">{{item.repeat}}</span>\r\n  <a id=\"show-original\"></a>\r\n</div>"

/***/ }),

/***/ "./src/app/alpha/message/message.component.ts":
/*!****************************************************!*\
  !*** ./src/app/alpha/message/message.component.ts ***!
  \****************************************************/
/*! exports provided: MessageComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MessageComponent", function() { return MessageComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _app_danmaku_def__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../app/danmaku.def */ "./src/app/danmaku.def.ts");
/* harmony import */ var _app_biliws_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../app/biliws.service */ "./src/app/biliws.service.ts");




var MessageComponent = /** @class */ (function () {
    function MessageComponent(bili) {
        this.bili = bili;
    }
    MessageComponent.prototype.ngOnInit = function () {
    };
    MessageComponent.prototype.getType = function () {
        if (this.item.uid === this.bili.ownerId) {
            return 'owner';
        }
        else if (this.item.is_admin) {
            return 'moderator';
        }
        else if (this.item.guard > 0) {
            return 'member';
        }
        return null;
    };
    MessageComponent.prototype.getIcon = function () {
        if (this.item.guard === 3) {
            return 'data:image/png;base64,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';
        }
        else if (this.item.guard === 2) {
            return 'data:image/png;base64,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';
        }
        else if (this.item.guard === 1) {
            return 'data:image/png;base64,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';
        }
        else {
            return '';
        }
    };
    MessageComponent.prototype.ngAfterViewInit = function () {
        // if (!isPlatformBrowser(this.plat)) {
        // return;
        // }
        // document.documentElement.scrollTop=document.documentElement.scrollHeight;
        window.scrollTo(0, document.documentElement.scrollHeight);
    };
    MessageComponent.prototype.getRepeatGradientColor = function () {
        return this.getColorGradient('#2196f3', '#ff5722', this.item.repeat > 10 ? 1 : this.item.repeat / 10.0);
    };
    MessageComponent.prototype.getColorGradient = function (start_color, end_color, percent) {
        // strip the leading # if it's there
        start_color = start_color.replace(/^\s*#|\s*$/g, '');
        end_color = end_color.replace(/^\s*#|\s*$/g, '');
        // convert 3 char codes --> 6, e.g. `E0F` --> `EE00FF`
        if (start_color.length === 3) {
            start_color = start_color.replace(/(.)/g, '$1$1');
        }
        if (end_color.length === 3) {
            end_color = end_color.replace(/(.)/g, '$1$1');
        }
        // get colors
        var start_red = parseInt(start_color.substr(0, 2), 16), start_green = parseInt(start_color.substr(2, 2), 16), start_blue = parseInt(start_color.substr(4, 2), 16);
        var end_red = parseInt(end_color.substr(0, 2), 16), end_green = parseInt(end_color.substr(2, 2), 16), end_blue = parseInt(end_color.substr(4, 2), 16);
        // calculate new color
        var diff_red_ = end_red - start_red;
        var diff_green_ = end_green - start_green;
        var diff_blue_ = end_blue - start_blue;
        var diff_red = ((diff_red_ * percent) + start_red).toString(16).split('.')[0];
        var diff_green = ((diff_green_ * percent) + start_green).toString(16).split('.')[0];
        var diff_blue = ((diff_blue_ * percent) + start_blue).toString(16).split('.')[0];
        // ensure 2 digits by color
        if (diff_red.length === 1) {
            diff_red = '0' + diff_red;
        }
        if (diff_green.length === 1) {
            diff_green = '0' + diff_green;
        }
        if (diff_blue.length === 1) {
            diff_blue = '0' + diff_blue;
        }
        return '#' + diff_red + diff_green + diff_blue;
    };
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])(),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", _app_danmaku_def__WEBPACK_IMPORTED_MODULE_2__["DanmakuMessage"])
    ], MessageComponent.prototype, "item", void 0);
    MessageComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'yt-live-chat-text-message-renderer',
            template: __webpack_require__(/*! ./message.component.html */ "./src/app/alpha/message/message.component.html"),
            encapsulation: _angular_core__WEBPACK_IMPORTED_MODULE_1__["ViewEncapsulation"].None,
            styles: [__webpack_require__(/*! ./message.component.css */ "./src/app/alpha/message/message.component.css")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_app_biliws_service__WEBPACK_IMPORTED_MODULE_3__["BiliwsService"]])
    ], MessageComponent);
    return MessageComponent;
}());



/***/ }),

/***/ "./src/app/alpha/paid-message/paid-message.component.css":
/*!***************************************************************!*\
  !*** ./src/app/alpha/paid-message/paid-message.component.css ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "#header.yt-live-chat-paid-message-renderer {\r\n    position: relative;\r\n    background-color: var(--yt-live-chat-paid-message-header-background-color, #125aac);\r\n    color: var(--yt-live-chat-paid-message-header-color, #fff);\r\n    font-weight: 500;\r\n    padding: 8px 16px;\r\n    min-height: 20px;\r\n    overflow: hidden;\r\n    white-space: nowrap;\r\n    display: block;\r\n    flex-direction: row;\r\n    align-items: center;\r\n    border-radius:4px;\r\n    box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12), 0 3px 1px -2px rgba(0, 0, 0, 0.2);\r\n}\r\n#author-photo.yt-live-chat-paid-message-renderer {\r\n    width: 40px;\r\n    height: 40px;\r\n}\r\n#author-photo.yt-live-chat-paid-message-renderer {\r\n    display: inline-block;\r\n    margin-right: 16px;\r\n    overflow: hidden;\r\n    border-radius: 50%;\r\n    flex: none;\r\n}\r\n#header-content.yt-live-chat-paid-message-renderer {\r\n    display: inline-block;\r\n    flex-direction: row;\r\n    justify-content: space-between;\r\n    flex: 1;\r\n    flex-basis: 0.000000001px;\r\n    align-items: baseline;\r\n}\r\n#header-content-primary-column.yt-live-chat-paid-message-renderer {\r\n    display: flex;\r\n    flex-direction: column;\r\n    justify-content: space-between;\r\n    flex: 1;\r\n    flex-basis: 0.000000001px;\r\n}\r\n#author-name.yt-live-chat-paid-message-renderer {\r\n    color: var(--yt-live-chat-paid-message-author-name-color, rgba(255, 255, 255, 0.7));\r\n    font-size: 14px;\r\n    margin-bottom: 2px;\r\n}\r\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvYWxwaGEvcGFpZC1tZXNzYWdlL3BhaWQtbWVzc2FnZS5jb21wb25lbnQuY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0lBQ0ksa0JBQWtCO0lBQ2xCLG1GQUFtRjtJQUNuRiwwREFBMEQ7SUFDMUQsZ0JBQWdCO0lBQ2hCLGlCQUFpQjtJQUNqQixnQkFBZ0I7SUFDaEIsZ0JBQWdCO0lBQ2hCLG1CQUFtQjtJQUNuQixjQUFjO0lBR2QsbUJBQW1CO0lBR25CLG1CQUFtQjtJQUNuQixpQkFBaUI7SUFDakIsK0dBQStHO0FBQ25IO0FBQ0E7SUFDSSxXQUFXO0lBQ1gsWUFBWTtBQUNoQjtBQUNBO0lBQ0kscUJBQXFCO0lBQ3JCLGtCQUFrQjtJQUNsQixnQkFBZ0I7SUFDaEIsa0JBQWtCO0lBR2xCLFVBQVU7QUFDZDtBQUVBO0lBQ0kscUJBQXFCO0lBR3JCLG1CQUFtQjtJQUduQiw4QkFBOEI7SUFHOUIsT0FBTztJQUVQLHlCQUF5QjtJQUd6QixxQkFBcUI7QUFDekI7QUFFQTtJQUNJLGFBQWE7SUFHYixzQkFBc0I7SUFHdEIsOEJBQThCO0lBRzlCLE9BQU87SUFFUCx5QkFBeUI7QUFDN0I7QUFFQTtJQUNJLG1GQUFtRjtJQUNuRixlQUFlO0lBQ2Ysa0JBQWtCO0FBQ3RCIiwiZmlsZSI6InNyYy9hcHAvYWxwaGEvcGFpZC1tZXNzYWdlL3BhaWQtbWVzc2FnZS5jb21wb25lbnQuY3NzIiwic291cmNlc0NvbnRlbnQiOlsiI2hlYWRlci55dC1saXZlLWNoYXQtcGFpZC1tZXNzYWdlLXJlbmRlcmVyIHtcclxuICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcclxuICAgIGJhY2tncm91bmQtY29sb3I6IHZhcigtLXl0LWxpdmUtY2hhdC1wYWlkLW1lc3NhZ2UtaGVhZGVyLWJhY2tncm91bmQtY29sb3IsICMxMjVhYWMpO1xyXG4gICAgY29sb3I6IHZhcigtLXl0LWxpdmUtY2hhdC1wYWlkLW1lc3NhZ2UtaGVhZGVyLWNvbG9yLCAjZmZmKTtcclxuICAgIGZvbnQtd2VpZ2h0OiA1MDA7XHJcbiAgICBwYWRkaW5nOiA4cHggMTZweDtcclxuICAgIG1pbi1oZWlnaHQ6IDIwcHg7XHJcbiAgICBvdmVyZmxvdzogaGlkZGVuO1xyXG4gICAgd2hpdGUtc3BhY2U6IG5vd3JhcDtcclxuICAgIGRpc3BsYXk6IGJsb2NrO1xyXG4gICAgLW1zLWZsZXgtZGlyZWN0aW9uOiByb3c7XHJcbiAgICAtd2Via2l0LWZsZXgtZGlyZWN0aW9uOiByb3c7XHJcbiAgICBmbGV4LWRpcmVjdGlvbjogcm93O1xyXG4gICAgLW1zLWZsZXgtYWxpZ246IGNlbnRlcjtcclxuICAgIC13ZWJraXQtYWxpZ24taXRlbXM6IGNlbnRlcjtcclxuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XHJcbiAgICBib3JkZXItcmFkaXVzOjRweDtcclxuICAgIGJveC1zaGFkb3c6IDAgMnB4IDJweCAwIHJnYmEoMCwgMCwgMCwgMC4xNCksIDAgMXB4IDVweCAwIHJnYmEoMCwgMCwgMCwgMC4xMiksIDAgM3B4IDFweCAtMnB4IHJnYmEoMCwgMCwgMCwgMC4yKTtcclxufVxyXG4jYXV0aG9yLXBob3RvLnl0LWxpdmUtY2hhdC1wYWlkLW1lc3NhZ2UtcmVuZGVyZXIge1xyXG4gICAgd2lkdGg6IDQwcHg7XHJcbiAgICBoZWlnaHQ6IDQwcHg7XHJcbn1cclxuI2F1dGhvci1waG90by55dC1saXZlLWNoYXQtcGFpZC1tZXNzYWdlLXJlbmRlcmVyIHtcclxuICAgIGRpc3BsYXk6IGlubGluZS1ibG9jaztcclxuICAgIG1hcmdpbi1yaWdodDogMTZweDtcclxuICAgIG92ZXJmbG93OiBoaWRkZW47XHJcbiAgICBib3JkZXItcmFkaXVzOiA1MCU7XHJcbiAgICAtbXMtZmxleDogbm9uZTtcclxuICAgIC13ZWJraXQtZmxleDogbm9uZTtcclxuICAgIGZsZXg6IG5vbmU7XHJcbn1cclxuXHJcbiNoZWFkZXItY29udGVudC55dC1saXZlLWNoYXQtcGFpZC1tZXNzYWdlLXJlbmRlcmVyIHtcclxuICAgIGRpc3BsYXk6IGlubGluZS1ibG9jaztcclxuICAgIC1tcy1mbGV4LWRpcmVjdGlvbjogcm93O1xyXG4gICAgLXdlYmtpdC1mbGV4LWRpcmVjdGlvbjogcm93O1xyXG4gICAgZmxleC1kaXJlY3Rpb246IHJvdztcclxuICAgIC1tcy1mbGV4LXBhY2s6IGp1c3RpZnk7XHJcbiAgICAtd2Via2l0LWp1c3RpZnktY29udGVudDogc3BhY2UtYmV0d2VlbjtcclxuICAgIGp1c3RpZnktY29udGVudDogc3BhY2UtYmV0d2VlbjtcclxuICAgIC1tcy1mbGV4OiAxIDEgMC4wMDAwMDAwMDFweDtcclxuICAgIC13ZWJraXQtZmxleDogMTtcclxuICAgIGZsZXg6IDE7XHJcbiAgICAtd2Via2l0LWZsZXgtYmFzaXM6IDAuMDAwMDAwMDAxcHg7XHJcbiAgICBmbGV4LWJhc2lzOiAwLjAwMDAwMDAwMXB4O1xyXG4gICAgLW1zLWZsZXgtYWxpZ246IGJhc2VsaW5lO1xyXG4gICAgLXdlYmtpdC1hbGlnbi1pdGVtczogYmFzZWxpbmU7XHJcbiAgICBhbGlnbi1pdGVtczogYmFzZWxpbmU7XHJcbn1cclxuXHJcbiNoZWFkZXItY29udGVudC1wcmltYXJ5LWNvbHVtbi55dC1saXZlLWNoYXQtcGFpZC1tZXNzYWdlLXJlbmRlcmVyIHtcclxuICAgIGRpc3BsYXk6IGZsZXg7XHJcbiAgICAtbXMtZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcclxuICAgIC13ZWJraXQtZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcclxuICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XHJcbiAgICAtbXMtZmxleC1wYWNrOiBqdXN0aWZ5O1xyXG4gICAgLXdlYmtpdC1qdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWJldHdlZW47XHJcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWJldHdlZW47XHJcbiAgICAtbXMtZmxleDogMSAxIDAuMDAwMDAwMDAxcHg7XHJcbiAgICAtd2Via2l0LWZsZXg6IDE7XHJcbiAgICBmbGV4OiAxO1xyXG4gICAgLXdlYmtpdC1mbGV4LWJhc2lzOiAwLjAwMDAwMDAwMXB4O1xyXG4gICAgZmxleC1iYXNpczogMC4wMDAwMDAwMDFweDtcclxufVxyXG5cclxuI2F1dGhvci1uYW1lLnl0LWxpdmUtY2hhdC1wYWlkLW1lc3NhZ2UtcmVuZGVyZXIge1xyXG4gICAgY29sb3I6IHZhcigtLXl0LWxpdmUtY2hhdC1wYWlkLW1lc3NhZ2UtYXV0aG9yLW5hbWUtY29sb3IsIHJnYmEoMjU1LCAyNTUsIDI1NSwgMC43KSk7XHJcbiAgICBmb250LXNpemU6IDE0cHg7XHJcbiAgICBtYXJnaW4tYm90dG9tOiAycHg7XHJcbn0iXX0= */"

/***/ }),

/***/ "./src/app/alpha/paid-message/paid-message.component.html":
/*!****************************************************************!*\
  !*** ./src/app/alpha/paid-message/paid-message.component.html ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\r\n<div id=\"header\" [ngStyle]=\"{'background-color':item.color}\" class=\"style-scope yt-live-chat-paid-message-renderer\">\r\n  <yt-img-shadow height=\"40\" width=\"40\" id=\"author-photo\" class=\"no-transition style-scope yt-live-chat-paid-message-renderer\"  [avatarUrl]=\"item.avatarUrl\"></yt-img-shadow>\r\n  <div id=\"header-content\" class=\"style-scope yt-live-chat-paid-message-renderer\">\r\n    <div id=\"header-content-primary-column\" class=\"no-transition style-scope yt-live-chat-paid-message-renderer\" >\r\n      <div id=\"author-name\" class=\"style-scope yt-live-chat-paid-message-renderer\">{{title}}</div>\r\n    <div id=\"purchase-amount\" class=\"style-scope yt-live-chat-paid-message-renderer\" style=\"transform:scale(0.9);transform-origin: left;\">{{subtitle}}</div>\r\n    </div>\r\n  </div>\r\n</div>"

/***/ }),

/***/ "./src/app/alpha/paid-message/paid-message.component.ts":
/*!**************************************************************!*\
  !*** ./src/app/alpha/paid-message/paid-message.component.ts ***!
  \**************************************************************/
/*! exports provided: LegacyPaidMessageComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LegacyPaidMessageComponent", function() { return LegacyPaidMessageComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _app_danmaku_def__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../app/danmaku.def */ "./src/app/danmaku.def.ts");



var LegacyPaidMessageComponent = /** @class */ (function () {
    function LegacyPaidMessageComponent() {
    }
    LegacyPaidMessageComponent.prototype.ngOnInit = function () {
    };
    Object.defineProperty(LegacyPaidMessageComponent.prototype, "title", {
        get: function () {
            if (this.item.guard_type > 0) {
                return "\u65B0\u7684" + this.item.gift;
            }
            else {
                return this.item.username;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LegacyPaidMessageComponent.prototype, "subtitle", {
        get: function () {
            if (this.item.guard_type > 0) {
                return "\u6B22\u8FCE " + this.item.username + " \u4E0A\u8230";
            }
            else {
                return "\u8D60\u9001 " + this.item.gift + " \u00D7" + this.item.amount;
            }
        },
        enumerable: true,
        configurable: true
    });
    LegacyPaidMessageComponent.prototype.ngAfterViewInit = function () {
        // if (!isPlatformBrowser(this.plat)) {
        //  return;
        // }
        // document.documentElement.scrollTop=document.documentElement.scrollHeight;
        window.scrollTo(0, document.documentElement.scrollHeight);
    };
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])(),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", _app_danmaku_def__WEBPACK_IMPORTED_MODULE_2__["GiftMessage"])
    ], LegacyPaidMessageComponent.prototype, "item", void 0);
    LegacyPaidMessageComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'yt-live-chat-paid-message-renderer',
            template: __webpack_require__(/*! ./paid-message.component.html */ "./src/app/alpha/paid-message/paid-message.component.html"),
            encapsulation: _angular_core__WEBPACK_IMPORTED_MODULE_1__["ViewEncapsulation"].None,
            styles: [__webpack_require__(/*! ./paid-message.component.css */ "./src/app/alpha/paid-message/paid-message.component.css")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [])
    ], LegacyPaidMessageComponent);
    return LegacyPaidMessageComponent;
}());



/***/ }),

/***/ "./src/app/app-routing.module.ts":
/*!***************************************!*\
  !*** ./src/app/app-routing.module.ts ***!
  \***************************************/
/*! exports provided: AppRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppRoutingModule", function() { return AppRoutingModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _alpha_alpha_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./alpha/alpha.component */ "./src/app/alpha/alpha.component.ts");
/* harmony import */ var _index_index_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./index/index.component */ "./src/app/index/index.component.ts");
/* harmony import */ var _viewer_viewer_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./viewer/viewer.component */ "./src/app/viewer/viewer.component.ts");
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../environments/environment */ "./src/environments/environment.ts");
/* harmony import */ var _index_local_index_local_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./index-local/index-local.component */ "./src/app/index-local/index-local.component.ts");








var routes = [
    { path: 'alpha/:id', component: _alpha_alpha_component__WEBPACK_IMPORTED_MODULE_3__["AlphaComponent"] },
    { path: 'viewer/:id', component: _viewer_viewer_component__WEBPACK_IMPORTED_MODULE_5__["ViewerComponent"] },
    { path: 'official', component: _index_index_component__WEBPACK_IMPORTED_MODULE_4__["IndexComponent"] },
    { path: '', component: _environments_environment__WEBPACK_IMPORTED_MODULE_6__["environment"].official ? _index_index_component__WEBPACK_IMPORTED_MODULE_4__["IndexComponent"] : _index_local_index_local_component__WEBPACK_IMPORTED_MODULE_7__["IndexLocalComponent"] },
    { path: '**', redirectTo: '', pathMatch: 'full' }
];
var AppRoutingModule = /** @class */ (function () {
    function AppRoutingModule() {
    }
    AppRoutingModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
            imports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"].forRoot(routes)],
            exports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"]]
        })
    ], AppRoutingModule);
    return AppRoutingModule;
}());



/***/ }),

/***/ "./src/app/app.component.css":
/*!***********************************!*\
  !*** ./src/app/app.component.css ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL2FwcC5jb21wb25lbnQuY3NzIn0= */"

/***/ }),

/***/ "./src/app/app.component.html":
/*!************************************!*\
  !*** ./src/app/app.component.html ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<router-outlet></router-outlet>\r\n"

/***/ }),

/***/ "./src/app/app.component.ts":
/*!**********************************!*\
  !*** ./src/app/app.component.ts ***!
  \**********************************/
/*! exports provided: AppComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppComponent", function() { return AppComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @ngx-translate/core */ "./node_modules/@ngx-translate/core/fesm5/ngx-translate-core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _nguniversal_express_engine_tokens__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @nguniversal/express-engine/tokens */ "./node_modules/@nguniversal/express-engine/fesm5/tokens.js");





var langs = ['en', 'zh', 'ja'];
var defaultLang = 'zh';
var AppComponent = /** @class */ (function () {
    function AppComponent(translate, platformId, request) {
        this.translate = translate;
        this.platformId = platformId;
        this.request = request;
        this.title = 'bilichat';
    }
    AppComponent.prototype.ngOnInit = function () {
        this.translate.addLangs(langs);
        this.translate.setDefaultLang(defaultLang);
        var language = this.getLang();
        if (langs.indexOf(language) > -1) {
            this.translate.use(language);
        }
        else {
            this.translate.use(defaultLang);
        }
    };
    AppComponent.prototype.getLang = function () {
        var lang;
        if (Object(_angular_common__WEBPACK_IMPORTED_MODULE_3__["isPlatformBrowser"])(this.platformId)) {
            lang = this.translate.getBrowserLang();
        }
        else {
            lang = (this.request.headers['accept-language'] || '').substring(0, 2); // 暂不考虑区域代码
        }
        return lang;
    };
    AppComponent.prototype.switchLanguage = function (lang) {
        this.translate.use(lang);
    };
    AppComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-root',
            template: __webpack_require__(/*! ./app.component.html */ "./src/app/app.component.html"),
            styles: [__webpack_require__(/*! ./app.component.css */ "./src/app/app.component.css")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__param"](1, Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Inject"])(_angular_core__WEBPACK_IMPORTED_MODULE_1__["PLATFORM_ID"])),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__param"](2, Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Optional"])()),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__param"](2, Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Inject"])(_nguniversal_express_engine_tokens__WEBPACK_IMPORTED_MODULE_4__["REQUEST"])),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_ngx_translate_core__WEBPACK_IMPORTED_MODULE_2__["TranslateService"],
            Object,
            Request])
    ], AppComponent);
    return AppComponent;
}());



/***/ }),

/***/ "./src/app/app.module.ts":
/*!*******************************!*\
  !*** ./src/app/app.module.ts ***!
  \*******************************/
/*! exports provided: HttpLoaderFactory, AppModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HttpLoaderFactory", function() { return HttpLoaderFactory; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppModule", function() { return AppModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/platform-browser */ "./node_modules/@angular/platform-browser/fesm5/platform-browser.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @ngx-translate/core */ "./node_modules/@ngx-translate/core/fesm5/ngx-translate-core.js");
/* harmony import */ var _ngx_translate_http_loader__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @ngx-translate/http-loader */ "./node_modules/@ngx-translate/http-loader/fesm5/ngx-translate-http-loader.js");
/* harmony import */ var _app_routing_module__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./app-routing.module */ "./src/app/app-routing.module.ts");
/* harmony import */ var _app_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./app.component */ "./src/app/app.component.ts");
/* harmony import */ var _alpha_alpha_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./alpha/alpha.component */ "./src/app/alpha/alpha.component.ts");
/* harmony import */ var _alpha_message_message_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./alpha/message/message.component */ "./src/app/alpha/message/message.component.ts");
/* harmony import */ var _alpha_image_image_component__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./alpha/image/image.component */ "./src/app/alpha/image/image.component.ts");
/* harmony import */ var _index_index_component__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./index/index.component */ "./src/app/index/index.component.ts");
/* harmony import */ var _alpha_chat_renderer_chat_renderer_component__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./alpha/chat-renderer/chat-renderer.component */ "./src/app/alpha/chat-renderer/chat-renderer.component.ts");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");
/* harmony import */ var _alpha_paid_message_paid_message_component__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./alpha/paid-message/paid-message.component */ "./src/app/alpha/paid-message/paid-message.component.ts");
/* harmony import */ var _viewer_viewer_component__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./viewer/viewer.component */ "./src/app/viewer/viewer.component.ts");
/* harmony import */ var _index_local_index_local_component__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./index-local/index-local.component */ "./src/app/index-local/index-local.component.ts");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm5/index.js");

















function HttpLoaderFactory(http, state) {
    return {
        getTranslation: function (lang) {
            var key = Object(_angular_platform_browser__WEBPACK_IMPORTED_MODULE_1__["makeStateKey"])('transfer-translate-' + lang);
            var data = state.get(key, null);
            // 检查transfer-state是否存在传入语言的语言包内容, 不存在则请求相应的语言包资源
            if (data) {
                return new rxjs__WEBPACK_IMPORTED_MODULE_16__["Observable"](function (observer) {
                    observer.next(data);
                    observer.complete();
                });
            }
            else {
                // 使用网络请求获取语言包资源
                return new _ngx_translate_http_loader__WEBPACK_IMPORTED_MODULE_4__["TranslateHttpLoader"](http).getTranslation(lang);
            }
        }
    };
}
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_2__["NgModule"])({
            declarations: [
                _app_component__WEBPACK_IMPORTED_MODULE_6__["AppComponent"],
                _alpha_alpha_component__WEBPACK_IMPORTED_MODULE_7__["AlphaComponent"],
                _alpha_message_message_component__WEBPACK_IMPORTED_MODULE_8__["MessageComponent"],
                _alpha_image_image_component__WEBPACK_IMPORTED_MODULE_9__["ImageComponent"],
                _index_index_component__WEBPACK_IMPORTED_MODULE_10__["IndexComponent"],
                _alpha_chat_renderer_chat_renderer_component__WEBPACK_IMPORTED_MODULE_11__["ChatRendererComponent"],
                _alpha_paid_message_paid_message_component__WEBPACK_IMPORTED_MODULE_13__["LegacyPaidMessageComponent"],
                _viewer_viewer_component__WEBPACK_IMPORTED_MODULE_14__["ViewerComponent"],
                _index_local_index_local_component__WEBPACK_IMPORTED_MODULE_15__["IndexLocalComponent"]
            ],
            imports: [
                _angular_platform_browser__WEBPACK_IMPORTED_MODULE_1__["BrowserModule"].withServerTransition({ appId: 'serverApp' }),
                _app_routing_module__WEBPACK_IMPORTED_MODULE_5__["AppRoutingModule"],
                _angular_common_http__WEBPACK_IMPORTED_MODULE_12__["HttpClientModule"],
                _angular_platform_browser__WEBPACK_IMPORTED_MODULE_1__["BrowserTransferStateModule"],
                _ngx_translate_core__WEBPACK_IMPORTED_MODULE_3__["TranslateModule"].forRoot({
                    loader: {
                        provide: _ngx_translate_core__WEBPACK_IMPORTED_MODULE_3__["TranslateLoader"],
                        useFactory: HttpLoaderFactory,
                        deps: [_angular_common_http__WEBPACK_IMPORTED_MODULE_12__["HttpClient"], _angular_platform_browser__WEBPACK_IMPORTED_MODULE_1__["TransferState"]]
                    }
                })
            ],
            providers: [],
            bootstrap: [_app_component__WEBPACK_IMPORTED_MODULE_6__["AppComponent"]],
            schemas: [_angular_core__WEBPACK_IMPORTED_MODULE_2__["CUSTOM_ELEMENTS_SCHEMA"]]
        })
    ], AppModule);
    return AppModule;
}());



/***/ }),

/***/ "./src/app/biliws.service.ts":
/*!***********************************!*\
  !*** ./src/app/biliws.service.ts ***!
  \***********************************/
/*! exports provided: BiliwsService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BiliwsService", function() { return BiliwsService; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm5/index.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");
/* harmony import */ var _message_processor_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./message-processor.service */ "./src/app/message-processor.service.ts");
/* harmony import */ var _danmaku_def__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./danmaku.def */ "./src/app/danmaku.def.ts");






var BiliwsService = /** @class */ (function () {
    function BiliwsService(http, proc) {
        this.http = http;
        this.proc = proc;
    }
    Object.defineProperty(BiliwsService.prototype, "ownerId", {
        get: function () {
            return this._ownerId;
        },
        set: function (v) {
            this._ownerId = v;
        },
        enumerable: true,
        configurable: true
    });
    BiliwsService.prototype.connect = function (roomid) {
        var _this = this;
        this.ws = new WebSocket('wss://broadcastlv.chat.bilibili.com/sub');
        this.ws.binaryType = "blob";
        return new rxjs__WEBPACK_IMPORTED_MODULE_2__["Observable"](function (observer) {
            var that = _this;
            _this.ws.onopen = function (e) {
                var obj = {
                    uid: 0,
                    roomid: Number(roomid),
                    protover: 1,
                    platform: 'web',
                    clientver: '1.5.15'
                };
                _this.sendPackageObj(7, obj);
                _this.heartbeatHandler = setInterval(function () { _this.sendHeartbeat(); }, 30000);
                observer.next(new _danmaku_def__WEBPACK_IMPORTED_MODULE_5__["ConnectedMessage"]());
            };
            _this.ws.onmessage = function (e) {
                var data = e.data;
                var reader = new FileReader();
                reader.onload = function (e) {
                    var arr = new Uint8Array(reader.result);
                    var view = new DataView(arr.buffer);
                    var offset = 0;
                    while (offset < arr.byteLength) {
                        var type = view.getInt32(8 + offset);
                        var section = arr.slice(offset + view.getInt16(4 + offset), view.getInt32(offset) + offset);
                        offset += view.getInt32(offset);
                        //后面不要操作offset了
                        if (type == 5) {
                            that.proc.formMessage(JSON.parse(new TextDecoder().decode(section)), observer);
                        }
                    }
                };
                reader.readAsArrayBuffer(data);
            };
            _this.ws.onerror = function (e) {
                observer.error(e);
            };
            _this.ws.onclose = function (e) {
                clearInterval(_this.heartbeatHandler);
                observer.complete();
            };
        });
    };
    BiliwsService.prototype.sendHeartbeat = function () {
        var body = new TextEncoder().encode('[object Object]');
        this.sendPackageBinary(2, body);
    };
    BiliwsService.prototype.sendPackageBinary = function (type, body) {
        var head = new ArrayBuffer(16);
        var headDataView = new DataView(head);
        headDataView.setInt32(0, head.byteLength + body.byteLength);
        headDataView.setInt16(4, 16);
        headDataView.setInt16(6, 1);
        headDataView.setInt32(8, type); // verify
        headDataView.setInt32(12, 1);
        var tmp = new Uint8Array(16 + body.byteLength);
        tmp.set(new Uint8Array(head), 0);
        tmp.set(body, 16);
        this.ws.send(tmp);
    };
    BiliwsService.prototype.sendPackageObj = function (type, bufferObj) {
        this.sendPackageBinary(type, new TextEncoder().encode(JSON.stringify(bufferObj)));
    };
    BiliwsService = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])({
            providedIn: 'root'
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_angular_common_http__WEBPACK_IMPORTED_MODULE_3__["HttpClient"],
            _message_processor_service__WEBPACK_IMPORTED_MODULE_4__["MessageProcessorService"]])
    ], BiliwsService);
    return BiliwsService;
}());



/***/ }),

/***/ "./src/app/danmaku.def.ts":
/*!********************************!*\
  !*** ./src/app/danmaku.def.ts ***!
  \********************************/
/*! exports provided: DanmakuMessage, GiftMessage, ConnectedMessage, DisplayMode */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DanmakuMessage", function() { return DanmakuMessage; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GiftMessage", function() { return GiftMessage; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ConnectedMessage", function() { return ConnectedMessage; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DisplayMode", function() { return DisplayMode; });
var DanmakuMessage = /** @class */ (function () {
    function DanmakuMessage(uid, username, message, guard, is_admin, emotionUrl, avatarUrl, type, mode, repeat) {
        if (avatarUrl === void 0) { avatarUrl = 'https://static.hdslb.com/images/member/noface.gif'; }
        if (type === void 0) { type = 'danmaku'; }
        if (mode === void 0) { mode = 1; }
        if (repeat === void 0) { repeat = 1; }
        this.uid = uid;
        this.username = username;
        this.message = message;
        this.guard = guard;
        this.is_admin = is_admin;
        this.emotionUrl = emotionUrl;
        this.avatarUrl = avatarUrl;
        this.type = type;
        this.mode = mode;
        this.repeat = repeat;
    }
    return DanmakuMessage;
}());
var GiftMessage = /** @class */ (function () {
    function GiftMessage(uid, username, gift, amount, value, guard_type, color, avatarUrl, type, mode) {
        if (avatarUrl === void 0) { avatarUrl = 'https://static.hdslb.com/images/member/noface.gif'; }
        if (type === void 0) { type = 'gift'; }
        if (mode === void 0) { mode = 2; }
        this.uid = uid;
        this.username = username;
        this.gift = gift;
        this.amount = amount;
        this.value = value;
        this.guard_type = guard_type;
        this.color = color;
        this.avatarUrl = avatarUrl;
        this.type = type;
        this.mode = mode;
    }
    return GiftMessage;
}());
var ConnectedMessage = /** @class */ (function () {
    function ConnectedMessage(uid, username, avatarUrl, type, mode) {
        if (uid === void 0) { uid = 0; }
        if (username === void 0) { username = null; }
        if (avatarUrl === void 0) { avatarUrl = null; }
        if (type === void 0) { type = 'connected'; }
        if (mode === void 0) { mode = 1; }
        this.uid = uid;
        this.username = username;
        this.avatarUrl = avatarUrl;
        this.type = type;
        this.mode = mode;
    }
    return ConnectedMessage;
}());
var DisplayMode;
(function (DisplayMode) {
    DisplayMode[DisplayMode["Danmaku"] = 1] = "Danmaku";
    DisplayMode[DisplayMode["Gift"] = 2] = "Gift";
    DisplayMode[DisplayMode["Both"] = 3] = "Both";
})(DisplayMode || (DisplayMode = {}));



/***/ }),

/***/ "./src/app/index-local/index-local.component.css":
/*!*******************************************************!*\
  !*** ./src/app/index-local/index-local.component.css ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL2luZGV4LWxvY2FsL2luZGV4LWxvY2FsLmNvbXBvbmVudC5jc3MifQ== */"

/***/ }),

/***/ "./src/app/index-local/index-local.component.html":
/*!********************************************************!*\
  !*** ./src/app/index-local/index-local.component.html ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"container\">\r\n  <h1>{{'INDEX' | translate}}</h1>\r\n</div>\r\n"

/***/ }),

/***/ "./src/app/index-local/index-local.component.ts":
/*!******************************************************!*\
  !*** ./src/app/index-local/index-local.component.ts ***!
  \******************************************************/
/*! exports provided: IndexLocalComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "IndexLocalComponent", function() { return IndexLocalComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");


var IndexLocalComponent = /** @class */ (function () {
    function IndexLocalComponent() {
    }
    IndexLocalComponent.prototype.ngOnInit = function () {
    };
    IndexLocalComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-index-local',
            template: __webpack_require__(/*! ./index-local.component.html */ "./src/app/index-local/index-local.component.html"),
            styles: [__webpack_require__(/*! ./index-local.component.css */ "./src/app/index-local/index-local.component.css")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [])
    ], IndexLocalComponent);
    return IndexLocalComponent;
}());



/***/ }),

/***/ "./src/app/index/index.component.css":
/*!*******************************************!*\
  !*** ./src/app/index/index.component.css ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".container {\r\n    max-width:900px;\r\n    margin:0em auto;\r\n    padding:1em;\r\n    padding-top:165px;\r\n    /*background-color:white;*/\r\n    /*border-radius: 1em;*/\r\n    /*box-shadow:0 1px 1px 1px #bbbbbb;*/\r\n}\r\n\r\n:host {\r\n    position: absolute;\r\n    height: 100%;\r\n    width: 100%;\r\n    background-color:#ff4081;\r\n    overflow-y: scroll;\r\n    /*background-image: url(\"https://api.i-meto.com/bing?[object Object]\");*/\r\n}\r\n\r\n.entry:not(:last-child){\r\n    padding-bottom: 0.5em;\r\n    margin-bottom: 0.5em;\r\n    border-bottom:1px solid #bbbbbb ;\r\n}\r\n\r\n.list{\r\n    margin-top:1em;\r\n}\r\n\r\n.entry{\r\n    display: flex;\r\n\r\n}\r\n\r\n.entry > img{\r\n    width:3em;\r\n    height: 3em;\r\n    border-radius: 50%;\r\n    flex:none;\r\n}\r\n\r\n.entry > .info{\r\n    padding-left: 0.5em;\r\n    flex:1 1 auto;\r\n}\r\n\r\n.entry > .info > .intro{\r\n    color:#555555;\r\n}\r\n\r\n.entry > .info > .user > a{\r\n    color:#777777;\r\n    margin-left: 0.5em;\r\n    text-decoration: none;\r\n}\r\n\r\n.def{\r\n    font-size: 0.8em;\r\n    color:#555555;\r\n    margin:0.4em;\r\n}\r\n\r\n.info_card{\r\n    padding:1pc;\r\n}\r\n\r\n.mybutton{\r\n    /*width:100px;*/\r\n    display: inline-block;\r\n    margin:0.5em;\r\n}\r\n\r\n.display{\r\n    padding-top:1pc;\r\n}\r\n\r\n.display > yt-live-chat-renderer {\r\n    height: calc(100% - 20px);\r\n}\r\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvaW5kZXgvaW5kZXguY29tcG9uZW50LmNzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtJQUNJLGVBQWU7SUFDZixlQUFlO0lBQ2YsV0FBVztJQUNYLGlCQUFpQjtJQUNqQiwwQkFBMEI7SUFDMUIsc0JBQXNCO0lBQ3RCLG9DQUFvQztBQUN4Qzs7QUFFQTtJQUNJLGtCQUFrQjtJQUNsQixZQUFZO0lBQ1osV0FBVztJQUNYLHdCQUF3QjtJQUN4QixrQkFBa0I7SUFDbEIsd0VBQXdFO0FBQzVFOztBQUVBO0lBQ0kscUJBQXFCO0lBQ3JCLG9CQUFvQjtJQUNwQixnQ0FBZ0M7QUFDcEM7O0FBRUE7SUFDSSxjQUFjO0FBQ2xCOztBQUVBO0lBQ0ksYUFBYTs7QUFFakI7O0FBRUE7SUFDSSxTQUFTO0lBQ1QsV0FBVztJQUNYLGtCQUFrQjtJQUNsQixTQUFTO0FBQ2I7O0FBRUE7SUFDSSxtQkFBbUI7SUFDbkIsYUFBYTtBQUNqQjs7QUFFQTtJQUNJLGFBQWE7QUFDakI7O0FBRUE7SUFDSSxhQUFhO0lBQ2Isa0JBQWtCO0lBQ2xCLHFCQUFxQjtBQUN6Qjs7QUFFQTtJQUNJLGdCQUFnQjtJQUNoQixhQUFhO0lBQ2IsWUFBWTtBQUNoQjs7QUFFQTtJQUNJLFdBQVc7QUFDZjs7QUFFQTtJQUNJLGVBQWU7SUFDZixxQkFBcUI7SUFDckIsWUFBWTtBQUNoQjs7QUFFQTtJQUNJLGVBQWU7QUFDbkI7O0FBRUE7SUFDSSx5QkFBeUI7QUFDN0IiLCJmaWxlIjoic3JjL2FwcC9pbmRleC9pbmRleC5jb21wb25lbnQuY3NzIiwic291cmNlc0NvbnRlbnQiOlsiLmNvbnRhaW5lciB7XHJcbiAgICBtYXgtd2lkdGg6OTAwcHg7XHJcbiAgICBtYXJnaW46MGVtIGF1dG87XHJcbiAgICBwYWRkaW5nOjFlbTtcclxuICAgIHBhZGRpbmctdG9wOjE2NXB4O1xyXG4gICAgLypiYWNrZ3JvdW5kLWNvbG9yOndoaXRlOyovXHJcbiAgICAvKmJvcmRlci1yYWRpdXM6IDFlbTsqL1xyXG4gICAgLypib3gtc2hhZG93OjAgMXB4IDFweCAxcHggI2JiYmJiYjsqL1xyXG59XHJcblxyXG46aG9zdCB7XHJcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XHJcbiAgICBoZWlnaHQ6IDEwMCU7XHJcbiAgICB3aWR0aDogMTAwJTtcclxuICAgIGJhY2tncm91bmQtY29sb3I6I2ZmNDA4MTtcclxuICAgIG92ZXJmbG93LXk6IHNjcm9sbDtcclxuICAgIC8qYmFja2dyb3VuZC1pbWFnZTogdXJsKFwiaHR0cHM6Ly9hcGkuaS1tZXRvLmNvbS9iaW5nP1tvYmplY3QgT2JqZWN0XVwiKTsqL1xyXG59XHJcblxyXG4uZW50cnk6bm90KDpsYXN0LWNoaWxkKXtcclxuICAgIHBhZGRpbmctYm90dG9tOiAwLjVlbTtcclxuICAgIG1hcmdpbi1ib3R0b206IDAuNWVtO1xyXG4gICAgYm9yZGVyLWJvdHRvbToxcHggc29saWQgI2JiYmJiYiA7XHJcbn1cclxuXHJcbi5saXN0e1xyXG4gICAgbWFyZ2luLXRvcDoxZW07XHJcbn1cclxuXHJcbi5lbnRyeXtcclxuICAgIGRpc3BsYXk6IGZsZXg7XHJcblxyXG59XHJcblxyXG4uZW50cnkgPiBpbWd7XHJcbiAgICB3aWR0aDozZW07XHJcbiAgICBoZWlnaHQ6IDNlbTtcclxuICAgIGJvcmRlci1yYWRpdXM6IDUwJTtcclxuICAgIGZsZXg6bm9uZTtcclxufVxyXG5cclxuLmVudHJ5ID4gLmluZm97XHJcbiAgICBwYWRkaW5nLWxlZnQ6IDAuNWVtO1xyXG4gICAgZmxleDoxIDEgYXV0bztcclxufVxyXG5cclxuLmVudHJ5ID4gLmluZm8gPiAuaW50cm97XHJcbiAgICBjb2xvcjojNTU1NTU1O1xyXG59XHJcblxyXG4uZW50cnkgPiAuaW5mbyA+IC51c2VyID4gYXtcclxuICAgIGNvbG9yOiM3Nzc3Nzc7XHJcbiAgICBtYXJnaW4tbGVmdDogMC41ZW07XHJcbiAgICB0ZXh0LWRlY29yYXRpb246IG5vbmU7XHJcbn1cclxuXHJcbi5kZWZ7XHJcbiAgICBmb250LXNpemU6IDAuOGVtO1xyXG4gICAgY29sb3I6IzU1NTU1NTtcclxuICAgIG1hcmdpbjowLjRlbTtcclxufVxyXG5cclxuLmluZm9fY2FyZHtcclxuICAgIHBhZGRpbmc6MXBjO1xyXG59XHJcblxyXG4ubXlidXR0b257XHJcbiAgICAvKndpZHRoOjEwMHB4OyovXHJcbiAgICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XHJcbiAgICBtYXJnaW46MC41ZW07XHJcbn1cclxuXHJcbi5kaXNwbGF5e1xyXG4gICAgcGFkZGluZy10b3A6MXBjO1xyXG59XHJcblxyXG4uZGlzcGxheSA+IHl0LWxpdmUtY2hhdC1yZW5kZXJlciB7XHJcbiAgICBoZWlnaHQ6IGNhbGMoMTAwJSAtIDIwcHgpO1xyXG59Il19 */"

/***/ }),

/***/ "./src/app/index/index.component.html":
/*!********************************************!*\
  !*** ./src/app/index/index.component.html ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"demo-layout-transparent mdl-layout mdl-js-layout\">\r\n  <header class=\"mdl-layout__header mdl-layout__header--transparent\">\r\n    <div class=\"mdl-layout__header-row\">\r\n      <!-- Title -->\r\n      <span class=\"mdl-layout-title\">BILICHAT</span>\r\n      <!-- Add spacer, to align navigation to the right -->\r\n      <div class=\"mdl-layout-spacer\"></div>\r\n      <!-- Navigation -->\r\n      <nav class=\"mdl-navigation\">\r\n        <a class=\"mdl-navigation__link\" href=\"https://github.com/3Shain/BiliChat/releases\">下载</a>\r\n        <a class=\"mdl-navigation__link\" href=\"https://github.com/3Shain/BiliChat\">源码</a>\r\n      </nav>\r\n    </div>\r\n  </header>\r\n  <!--div class=\"mdl-layout__drawer\">\r\n    <span class=\"mdl-layout-title\">BILICHAT</span>\r\n    <nav class=\"mdl-navigation\">\r\n      <a class=\"mdl-navigation__link\" href=\"\">Link</a>\r\n    </nav>\r\n  </div-->\r\n  <main class=\"mdl-layout__content\">\r\n  </main>\r\n</div>\r\n<div class=\"container mdl-grid\">\r\n  <div class=\"mdl-card mdl-shadow--2dp mdl-cell mdl-cell--8-col info_card\">\r\n\r\n    <h1>BILICHAT <small>by <a href=\"https://3shain.com\" target=\"_blank\">3Shain</a></small></h1>\r\n    <p>B站仿油管样式评论机->效果看右边<br><del>使B站限定转播成为可能</del></p>\r\n    <p>\r\n      <a href=\"/css4obs\"\r\n        class=\"mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent mybutton\">\r\n        <i class=\"material-icons\">color_lens</i> 样式生成器\r\n      </a>\r\n      <a href=\"https://github.com/3Shain/BiliChat\" target=\"_blank\"\r\n        class=\"mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent mybutton\">\r\n        View this project on Github\r\n      </a>\r\n      <a href=\"https://github.com/3Shain/BiliChat/releases\" target=\"_blank\"\r\n        class=\"mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent mybutton\">\r\n        <i class=\"material-icons\">get_app</i> 本地版下载地址</a>\r\n      <a  href=\"https://nodejs.org/zh-cn/\" target=\"_blank\" class=\"mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent mybutton\">Node.js(运行库)下载地址</a>\r\n    </p>\r\n    <p>使用npm安装： npm i -g bilichat</p>\r\n\r\n    <p>请优先使用本地部署版本,虽然公共服务器能保证99%的稳定性,但因公共服务器调试/故障/宕机造成直播事故,BILICHAT不会为此负责。</p>\r\n  </div>\r\n  <div class=\"mdl-card mdl-shadow--2dp mdl-cell mdl-cell--4-col display\">\r\n    <yt-live-chat-renderer #renderer></yt-live-chat-renderer>\r\n    <div class=\"mdl-card__supporting-text\">\r\n    </div>\r\n  </div>\r\n  <div class=\"mdl-card mdl-shadow--2dp mdl-cell mdl-cell--12-col info_card\">\r\n    <!--p class=\"def\">* 这个数据并不太准确，因为OBS会使浏览器源始终处于激活状态，即使在被遮挡/隐藏的情况下</p>\r\n    <p class=\"def\">** 如果你发现有时间连续的多条(重复)记录，一定是转播man干的好事</p>\r\n    <p class=\"def\">*** 一切都是因为OBS对h5的实现不完善，程序没法知道自己是否真正地被显示出来了</p-->\r\n    <h5 style=\"margin:0\">使用记录</h5>\r\n    <div class=\"list\">\r\n      <!--ngFor-->\r\n      <div class=\"entry\" *ngFor=\"let item of entrys\">\r\n        <img [src]=\"getImageUrl(item.user_id)\" />\r\n        <div class=\"info\">\r\n          <div class=\"user\"><span>{{item.user_name}}</span>\r\n            <a [href]=\"'https://live.bilibili.com/'+item.room_id\" target=\"_blank\">[直播间]</a>\r\n            <a [href]=\"'https://space.bilibili.com/'+item.user_id\" target=\"_blank\">[个人主页]</a>\r\n            <span style=\"float:right;color:#555555;\">{{getTimeString(item.time)}}</span></div>\r\n          <div class=\"intro\">{{item.user_intro}}</div>\r\n        </div>\r\n      </div>\r\n    </div>\r\n  </div>\r\n\r\n</div>"

/***/ }),

/***/ "./src/app/index/index.component.ts":
/*!******************************************!*\
  !*** ./src/app/index/index.component.ts ***!
  \******************************************/
/*! exports provided: IndexComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "IndexComponent", function() { return IndexComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../environments/environment */ "./src/environments/environment.ts");
/* harmony import */ var _alpha_chat_renderer_chat_renderer_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../alpha/chat-renderer/chat-renderer.component */ "./src/app/alpha/chat-renderer/chat-renderer.component.ts");
/* harmony import */ var _danmaku_def__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../danmaku.def */ "./src/app/danmaku.def.ts");






var IndexComponent = /** @class */ (function () {
    function IndexComponent(plat, http) {
        this.plat = plat;
        this.http = http;
    }
    IndexComponent.prototype.ngOnInit = function () {
        var _this = this;
        /*if (!isPlatformBrowser(this.plat)) {
          return;
        }*/
        this.http.get(_environments_environment__WEBPACK_IMPORTED_MODULE_3__["environment"].api_server + "/history").subscribe(function (resp) {
            _this.entrys = resp;
        });
        this.renderer.sendSystemInfo('Hello World!');
        this.renderer.sendDanmaku(new _danmaku_def__WEBPACK_IMPORTED_MODULE_5__["DanmakuMessage"](4331384, '3Shain', '我是单推人(指一天单推一个', 1, false, undefined, 'https://i2.hdslb.com/bfs/face/b4efacefd9fe31ae253c610168738483631d3d22.jpg'));
        this.renderer.sendSystemInfo('以下为白上吹雪第一次B限名场景复刻');
        this.renderer.sendDanmaku(new _danmaku_def__WEBPACK_IMPORTED_MODULE_5__["DanmakuMessage"](0, 'DD0', 'awsl', 0, false, undefined));
        this.renderer.sendDanmaku(new _danmaku_def__WEBPACK_IMPORTED_MODULE_5__["GiftMessage"](109402, '绊爱厨', '小电视', 2, 1245000, 0, '#e62117', 'https://i2.hdslb.com/bfs/face/bd02e3ed33bb93bddb146441a04f212f77f0cb4d.jpg'));
        this.renderer.sendDanmaku(new _danmaku_def__WEBPACK_IMPORTED_MODULE_5__["DanmakuMessage"](0, 'DD1', '草', 0, false, undefined));
        this.renderer.sendDanmaku(new _danmaku_def__WEBPACK_IMPORTED_MODULE_5__["DanmakuMessage"](0, 'DD2', '石油佬你来啦', 0, false, undefined));
        this.renderer.sendDanmaku(new _danmaku_def__WEBPACK_IMPORTED_MODULE_5__["DanmakuMessage"](0, 'DD3', '草', 3, false, undefined));
        this.renderer.sendDanmaku(new _danmaku_def__WEBPACK_IMPORTED_MODULE_5__["DanmakuMessage"](0, 'DD4', '绊 爱 厨', 0, false, undefined));
    };
    IndexComponent.prototype.getImageUrl = function (uid) {
        return _environments_environment__WEBPACK_IMPORTED_MODULE_3__["environment"].api_server + '/avatar/' + uid;
    };
    IndexComponent.prototype.getTimeString = function (time) {
        return (new Date(time)).toLocaleDateString() + ' ' + (new Date(time)).toLocaleTimeString();
    };
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ViewChild"])('renderer'),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", _alpha_chat_renderer_chat_renderer_component__WEBPACK_IMPORTED_MODULE_4__["ChatRendererComponent"])
    ], IndexComponent.prototype, "renderer", void 0);
    IndexComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-index',
            template: __webpack_require__(/*! ./index.component.html */ "./src/app/index/index.component.html"),
            styles: [__webpack_require__(/*! ./index.component.css */ "./src/app/index/index.component.css")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__param"](0, Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Inject"])(_angular_core__WEBPACK_IMPORTED_MODULE_1__["PLATFORM_ID"])),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [Object, _angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpClient"]])
    ], IndexComponent);
    return IndexComponent;
}());



/***/ }),

/***/ "./src/app/message-processor.service.ts":
/*!**********************************************!*\
  !*** ./src/app/message-processor.service.ts ***!
  \**********************************************/
/*! exports provided: MessageProcessorService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MessageProcessorService", function() { return MessageProcessorService; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _danmaku_def__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./danmaku.def */ "./src/app/danmaku.def.ts");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm5/index.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm5/operators/index.js");
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../environments/environment */ "./src/environments/environment.ts");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");







var MessageProcessorService = /** @class */ (function () {
    function MessageProcessorService(http) {
        this.http = http;
        this.userLevelFilter = 0;
        this.minGiftValue = 5;
        this.showGift = true;
        this.hideGiftDanmaku = true;
        // showMember:boolean;
        // showModerator:boolean;
        this.loadAvatar = true;
        this.wordFilter = [
            'kimo', '风暴',
            '弹幕姬', '弹幕机',
            '别刷', '不要刷',
            '小鬼', 'biss',
            '嘴臭', '骂我',
            '梗',
            '傻逼', '弱智', '脑残', '屏蔽', 'cnm',
            '警察', '加群', '群号', 'QQ群', '出警',
            '人工智能', '老婆',
            '\0'
        ];
        this.blackList = [];
        this.customEmotions = [];
        this.customGiftLevel = [
            { value: 1245, color: '#e62117' },
            { value: 450, color: '#c2185b' },
            { value: 300, color: '#e65110' },
            { value: 100, color: '#ffca28' },
            { value: 50, color: '#00bfa5' },
            { value: 0, color: '#00b8d4' }
        ];
        this.silverGiftRatio = 0;
        this.pure = false;
    }
    MessageProcessorService.prototype.formMessage = function (rawData, observer) {
        var _this = this;
        if (rawData.cmd === 'DANMU_MSG') {
            if (this.blackList.indexOf(rawData.info[2][0]) !== -1) {
                return; // blackList
            }
            if (this.hideGiftDanmaku && rawData.info[0][9] > 0) {
                return; // 屏蔽礼物弹幕
            }
            if (this.userLevelFilter > rawData.info[4][0] && rawData.info[2][2] === 0 && rawData.info[7] === 0) {
                return; // 用户等级屏蔽
            }
            var content_1 = String(rawData.info[1]);
            if (this.wordFilter.some(function (item) {
                return content_1.indexOf(item) !== -1;
            })) {
                return; // 关键字屏蔽
            }
            this.avatarPreload(rawData.info[2][0]).subscribe(function (avatarUrl) {
                var l = new _danmaku_def__WEBPACK_IMPORTED_MODULE_2__["DanmakuMessage"](rawData.info[2][0], rawData.info[2][1], rawData.info[1], rawData.info[7], rawData.info[2][2] === 1, _this.getEmotionUrl(rawData.info[1]), avatarUrl);
                observer.next(l);
            });
        }
        else if (this.showGift && rawData.cmd === 'SEND_GIFT') {
            var value_1 = rawData.data.total_coin;
            if (rawData.data.coin_type !== 'gold') { // gold/silver
                value_1 *= this.silverGiftRatio;
            }
            if (value_1 < this.minGiftValue * 1000) { // 计算用的scale
                return;
            }
            this.avatarPreload(rawData.data.uid).subscribe(function (avatarUrl) {
                observer.next(new _danmaku_def__WEBPACK_IMPORTED_MODULE_2__["GiftMessage"](rawData.data.uid, rawData.data.uname, rawData.data.giftName, rawData.data.num, value_1 / 1000, 0, _this.getGiftColor(value_1 / 1000), avatarUrl));
            });
        }
        else if (rawData.cmd === 'GUARD_BUY') {
            this.avatarPreload(rawData.data.uid).subscribe(function (avatarUrl) {
                observer.next(new _danmaku_def__WEBPACK_IMPORTED_MODULE_2__["GiftMessage"](rawData.data.uid, rawData.data.username, rawData.data.gift_name, rawData.data.num, rawData.data.price / 1000, rawData.data.guard_level, _this.getGiftColor(rawData.data.price / 1000), avatarUrl));
            });
        }
    };
    MessageProcessorService.prototype.avatarPreload = function (userid) {
        if (!this.loadAvatar) {
            return Object(rxjs__WEBPACK_IMPORTED_MODULE_3__["of"])(_environments_environment__WEBPACK_IMPORTED_MODULE_5__["environment"].default_avatar);
        }
        if (this.pure) {
            return Object(rxjs__WEBPACK_IMPORTED_MODULE_3__["of"])(_environments_environment__WEBPACK_IMPORTED_MODULE_5__["environment"].default_avatar);
        }
        var obs = this.http.get(_environments_environment__WEBPACK_IMPORTED_MODULE_5__["environment"].api_server + "/avturl/" + userid)
            .pipe(
        // mapTo(x=>x.json()),
        Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["mergeMap"])(function (data) {
            if (data.face === 'http://static.hdslb.com/images/member/noface.gif') {
                return Object(rxjs__WEBPACK_IMPORTED_MODULE_3__["of"])(_environments_environment__WEBPACK_IMPORTED_MODULE_5__["environment"].default_avatar);
            }
            data.face = data.face.replace(/http:/g, 'https:');
            var img = new Image();
            img.referrerPolicy = 'no-referer';
            img.src = data.face + '@48w_48h';
            return Object(rxjs__WEBPACK_IMPORTED_MODULE_3__["race"])(Object(rxjs__WEBPACK_IMPORTED_MODULE_3__["fromEvent"])(img, 'load').pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["map"])(function (x) { return data.face + '@48w_48h'; })), Object(rxjs__WEBPACK_IMPORTED_MODULE_3__["fromEvent"])(img, 'error').pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["map"])(function (x) { return _environments_environment__WEBPACK_IMPORTED_MODULE_5__["environment"].default_avatar; })));
        }), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["catchError"])(function () { return Object(rxjs__WEBPACK_IMPORTED_MODULE_3__["of"])(_environments_environment__WEBPACK_IMPORTED_MODULE_5__["environment"].default_avatar); }));
        return Object(rxjs__WEBPACK_IMPORTED_MODULE_3__["race"])(Object(rxjs__WEBPACK_IMPORTED_MODULE_3__["timer"])(1000).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["map"])(function (x) { return _environments_environment__WEBPACK_IMPORTED_MODULE_5__["environment"].default_avatar; })), obs);
    };
    MessageProcessorService.prototype.getGuardName = function (level) {
        // i18n
        switch (level) {
            case 1:
                return '总督';
            case 2:
                return '提督';
            case 3:
                return '舰长';
            default:
                return null;
        }
    };
    MessageProcessorService.prototype.getEmotionUrl = function (text) {
        var ele = this.customEmotions.find(function (x) { return x.command === text; });
        if (!ele) {
            return undefined;
        }
        return ele.source;
    };
    MessageProcessorService.prototype.getGiftColor = function (value) {
        for (var _i = 0, _a = this.customGiftLevel; _i < _a.length; _i++) {
            var s = _a[_i];
            if (value >= s.value) {
                return s.color;
            }
        }
        return '#00b8d4'; // const min value color
    };
    MessageProcessorService = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])({
            providedIn: 'root'
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_angular_common_http__WEBPACK_IMPORTED_MODULE_6__["HttpClient"]])
    ], MessageProcessorService);
    return MessageProcessorService;
}());



/***/ }),

/***/ "./src/app/viewer/viewer.component.css":
/*!*********************************************!*\
  !*** ./src/app/viewer/viewer.component.css ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL3ZpZXdlci92aWV3ZXIuY29tcG9uZW50LmNzcyJ9 */"

/***/ }),

/***/ "./src/app/viewer/viewer.component.html":
/*!**********************************************!*\
  !*** ./src/app/viewer/viewer.component.html ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<p>\r\n  viewer works!\r\n</p>\r\n"

/***/ }),

/***/ "./src/app/viewer/viewer.component.ts":
/*!********************************************!*\
  !*** ./src/app/viewer/viewer.component.ts ***!
  \********************************************/
/*! exports provided: ViewerComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ViewerComponent", function() { return ViewerComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/platform-browser */ "./node_modules/@angular/platform-browser/fesm5/platform-browser.js");
/* harmony import */ var _message_processor_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../message-processor.service */ "./src/app/message-processor.service.ts");





var ViewerComponent = /** @class */ (function () {
    function ViewerComponent(route, title, proc) {
        this.route = route;
        this.title = title;
        this.proc = proc;
    }
    ViewerComponent.prototype.ngOnInit = function () {
        this.currentRoomId = this.route.snapshot.params['id'];
        this.title.setTitle('查看模式|直播间' + this.currentRoomId);
    };
    ViewerComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-viewer',
            template: __webpack_require__(/*! ./viewer.component.html */ "./src/app/viewer/viewer.component.html"),
            styles: [__webpack_require__(/*! ./viewer.component.css */ "./src/app/viewer/viewer.component.css")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_angular_router__WEBPACK_IMPORTED_MODULE_2__["ActivatedRoute"],
            _angular_platform_browser__WEBPACK_IMPORTED_MODULE_3__["Title"],
            _message_processor_service__WEBPACK_IMPORTED_MODULE_4__["MessageProcessorService"]])
    ], ViewerComponent);
    return ViewerComponent;
}());



/***/ }),

/***/ "./src/environments/environment.ts":
/*!*****************************************!*\
  !*** ./src/environments/environment.ts ***!
  \*****************************************/
/*! exports provided: environment */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "environment", function() { return environment; });
// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
var environment = {
    official: false,
    production: false,
    api_server: 'https://bilichat.3shain.com/api',
    default_avatar: 'https://static.hdslb.com/images/member/noface.gif'
};
/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.


/***/ }),

/***/ "./src/main.ts":
/*!*********************!*\
  !*** ./src/main.ts ***!
  \*********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_platform_browser_dynamic__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/platform-browser-dynamic */ "./node_modules/@angular/platform-browser-dynamic/fesm5/platform-browser-dynamic.js");
/* harmony import */ var _app_app_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./app/app.module */ "./src/app/app.module.ts");
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./environments/environment */ "./src/environments/environment.ts");




if (_environments_environment__WEBPACK_IMPORTED_MODULE_3__["environment"].production) {
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["enableProdMode"])();
}
document.addEventListener('DOMContentLoaded', function () {
    Object(_angular_platform_browser_dynamic__WEBPACK_IMPORTED_MODULE_1__["platformBrowserDynamic"])().bootstrapModule(_app_app_module__WEBPACK_IMPORTED_MODULE_2__["AppModule"])
        .catch(function (err) { return console.error(err); });
});


/***/ }),

/***/ 0:
/*!***************************!*\
  !*** multi ./src/main.ts ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! F:\BiliChat\src\main.ts */"./src/main.ts");


/***/ })

},[[0,"runtime","vendor"]]]);
//# sourceMappingURL=main.js.map