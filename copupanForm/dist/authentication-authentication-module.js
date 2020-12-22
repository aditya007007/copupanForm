(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["authentication-authentication-module"],{

/***/ "./node_modules/ngx-captcha/fesm5/ngx-captcha.js":
/*!*******************************************************!*\
  !*** ./node_modules/ngx-captcha/fesm5/ngx-captcha.js ***!
  \*******************************************************/
/*! exports provided: BaseReCaptchaComponent, InvisibleReCaptchaComponent, ReCaptcha2Component, ReCaptchaType, ScriptService, ReCaptchaV3Service, NgxCaptchaModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BaseReCaptchaComponent", function() { return BaseReCaptchaComponent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "InvisibleReCaptchaComponent", function() { return InvisibleReCaptchaComponent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ReCaptcha2Component", function() { return ReCaptcha2Component; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ReCaptchaType", function() { return ReCaptchaType; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ScriptService", function() { return ScriptService; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ReCaptchaV3Service", function() { return ReCaptchaV3Service; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NgxCaptchaModule", function() { return NgxCaptchaModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");





/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @abstract
 */
var BaseReCaptchaComponent = /** @class */ (function () {
    function BaseReCaptchaComponent(renderer, zone, injector, scriptService) {
        this.renderer = renderer;
        this.zone = zone;
        this.injector = injector;
        this.scriptService = scriptService;
        /**
         * Prefix of the captcha element
         */
        this.captchaElemPrefix = 'ngx_captcha_id_';
        /**
         * Indicates if global domain 'recaptcha.net' should be used instead of default domain ('google.com')
         */
        this.useGlobalDomain = false;
        /**
         * Type
         */
        this.type = 'image';
        /**
         * Tab index
         */
        this.tabIndex = 0;
        /**
         * Called when captcha receives successful response.
         * Captcha response token is passed to event.
         */
        this.success = new _angular_core__WEBPACK_IMPORTED_MODULE_3__["EventEmitter"]();
        /**
         * Called when captcha is loaded. Event receives id of the captcha
         */
        this.load = new _angular_core__WEBPACK_IMPORTED_MODULE_3__["EventEmitter"]();
        /**
         * Called when captcha is reset.
         */
        this.reset = new _angular_core__WEBPACK_IMPORTED_MODULE_3__["EventEmitter"]();
        /**
         * Called when captcha is loaded & ready. I.e. when you need to execute captcha on component load.
         */
        this.ready = new _angular_core__WEBPACK_IMPORTED_MODULE_3__["EventEmitter"]();
        /**
         * Error callback
         */
        this.error = new _angular_core__WEBPACK_IMPORTED_MODULE_3__["EventEmitter"]();
        /**
         * Expired callback
         */
        this.expire = new _angular_core__WEBPACK_IMPORTED_MODULE_3__["EventEmitter"]();
        /**
         * Indicates if captcha should be set on load
         */
        this.setupAfterLoad = false;
        /**
         * If enabled, captcha will reset after receiving success response. This is useful
         * when invisible captcha need to be resolved multiple times on same page
         */
        this.resetCaptchaAfterSuccess = false;
        /**
         * Indicates if captcha is loaded
         */
        this.isLoaded = false;
    }
    /**
     * @return {?}
     */
    BaseReCaptchaComponent.prototype.ngAfterViewInit = /**
     * @return {?}
     */
    function () {
        this.control = this.injector.get(_angular_forms__WEBPACK_IMPORTED_MODULE_1__["NgControl"]).control;
    };
    /**
     * @param {?} changes
     * @return {?}
     */
    BaseReCaptchaComponent.prototype.ngOnChanges = /**
     * @param {?} changes
     * @return {?}
     */
    function (changes) {
        // cleanup scripts if language changed because they need to be reloaded
        if (changes && changes.hl) {
            // cleanup scripts when language changes
            if (!changes.hl.firstChange && (changes.hl.currentValue !== changes.hl.previousValue)) {
                this.scriptService.cleanup();
            }
        }
        if (changes && changes.useGlobalDomain) {
            // cleanup scripts when domain changes
            if (!changes.useGlobalDomain.firstChange && (changes.useGlobalDomain.currentValue !== changes.useGlobalDomain.previousValue)) {
                this.scriptService.cleanup();
            }
        }
        this.setupComponent();
    };
    /**
    * Gets captcha response as per reCaptcha docs
    */
    /**
     * Gets captcha response as per reCaptcha docs
     * @return {?}
     */
    BaseReCaptchaComponent.prototype.getResponse = /**
     * Gets captcha response as per reCaptcha docs
     * @return {?}
     */
    function () {
        return this.reCaptchaApi.getResponse(this.captchaId);
    };
    /**
    * Gets Id of captcha widget
    */
    /**
     * Gets Id of captcha widget
     * @return {?}
     */
    BaseReCaptchaComponent.prototype.getCaptchaId = /**
     * Gets Id of captcha widget
     * @return {?}
     */
    function () {
        return this.captchaId;
    };
    /**
    * Resets captcha
    */
    /**
     * Resets captcha
     * @return {?}
     */
    BaseReCaptchaComponent.prototype.resetCaptcha = /**
     * Resets captcha
     * @return {?}
     */
    function () {
        var _this = this;
        this.zone.run((/**
         * @return {?}
         */
        function () {
            // reset captcha using Google js api
            _this.reCaptchaApi.reset();
            // required due to forms
            _this.onChange(undefined);
            _this.onTouched(undefined);
            // trigger reset event
            _this.reset.next();
        }));
    };
    /**
    * Gets last submitted captcha response
    */
    /**
     * Gets last submitted captcha response
     * @return {?}
     */
    BaseReCaptchaComponent.prototype.getCurrentResponse = /**
     * Gets last submitted captcha response
     * @return {?}
     */
    function () {
        return this.currentResponse;
    };
    /**
    * Reload captcha. Useful when properties (i.e. theme) changed and captcha need to reflect them
    */
    /**
     * Reload captcha. Useful when properties (i.e. theme) changed and captcha need to reflect them
     * @return {?}
     */
    BaseReCaptchaComponent.prototype.reloadCaptcha = /**
     * Reload captcha. Useful when properties (i.e. theme) changed and captcha need to reflect them
     * @return {?}
     */
    function () {
        this.setupComponent();
    };
    /**
     * @protected
     * @param {?} captchaElemId
     * @return {?}
     */
    BaseReCaptchaComponent.prototype.ensureCaptchaElem = /**
     * @protected
     * @param {?} captchaElemId
     * @return {?}
     */
    function (captchaElemId) {
        /** @type {?} */
        var captchaElem = document.getElementById(captchaElemId);
        if (!captchaElem) {
            throw Error("Captcha element with id '" + captchaElemId + "' was not found");
        }
        // assign captcha alem
        this.captchaElem = captchaElem;
    };
    /**
    * Responsible for instantiating captcha element
    */
    /**
     * Responsible for instantiating captcha element
     * @protected
     * @return {?}
     */
    BaseReCaptchaComponent.prototype.renderReCaptcha = /**
     * Responsible for instantiating captcha element
     * @protected
     * @return {?}
     */
    function () {
        var _this = this;
        // run outside angular zone due to timeout issues when testing
        // details: https://github.com/Enngage/ngx-captcha/issues/26
        this.zone.runOutsideAngular((/**
         * @return {?}
         */
        function () {
            _this.captchaId = _this.reCaptchaApi.render(_this.captchaElemId, _this.getCaptchaProperties());
            _this.ready.next();
        }));
    };
    /**
    * Called when captcha receives response
    * @param callback Callback
    */
    /**
     * Called when captcha receives response
     * @protected
     * @param {?} callback Callback
     * @return {?}
     */
    BaseReCaptchaComponent.prototype.handleCallback = /**
     * Called when captcha receives response
     * @protected
     * @param {?} callback Callback
     * @return {?}
     */
    function (callback) {
        var _this = this;
        this.currentResponse = callback;
        this.success.next(callback);
        this.zone.run((/**
         * @return {?}
         */
        function () {
            _this.onChange(callback);
            _this.onTouched(callback);
        }));
        if (this.resetCaptchaAfterSuccess) {
            this.resetCaptcha();
        }
    };
    /**
     * @private
     * @return {?}
     */
    BaseReCaptchaComponent.prototype.getPseudoUniqueNumber = /**
     * @private
     * @return {?}
     */
    function () {
        return new Date().getUTCMilliseconds() + Math.floor(Math.random() * 9999);
    };
    /**
     * @private
     * @return {?}
     */
    BaseReCaptchaComponent.prototype.setupComponent = /**
     * @private
     * @return {?}
     */
    function () {
        var _this = this;
        // captcha specific setup
        this.captchaSpecificSetup();
        // create captcha wrapper
        this.createAndSetCaptchaElem();
        this.scriptService.registerCaptchaScript(this.useGlobalDomain, 'explicit', (/**
         * @param {?} grecaptcha
         * @return {?}
         */
        function (grecaptcha) {
            _this.onloadCallback(grecaptcha);
        }), this.hl);
    };
    /**
    * Called when google's recaptcha script is ready
    */
    /**
     * Called when google's recaptcha script is ready
     * @private
     * @param {?} grecapcha
     * @return {?}
     */
    BaseReCaptchaComponent.prototype.onloadCallback = /**
     * Called when google's recaptcha script is ready
     * @private
     * @param {?} grecapcha
     * @return {?}
     */
    function (grecapcha) {
        // assign reference to reCaptcha Api once its loaded
        this.reCaptchaApi = grecapcha;
        if (!this.reCaptchaApi) {
            throw Error("ReCaptcha Api was not initialized correctly");
        }
        // loaded flag
        this.isLoaded = true;
        // fire load event
        this.load.next();
        // render captcha
        this.renderReCaptcha();
        // setup component if it was flagged as such
        if (this.setupAfterLoad) {
            this.setupAfterLoad = false;
            this.setupComponent();
        }
    };
    /**
     * @private
     * @return {?}
     */
    BaseReCaptchaComponent.prototype.generateNewElemId = /**
     * @private
     * @return {?}
     */
    function () {
        return this.captchaElemPrefix + this.getPseudoUniqueNumber();
    };
    /**
     * @private
     * @return {?}
     */
    BaseReCaptchaComponent.prototype.createAndSetCaptchaElem = /**
     * @private
     * @return {?}
     */
    function () {
        // generate new captcha id
        this.captchaElemId = this.generateNewElemId();
        if (!this.captchaElemId) {
            throw Error("Captcha elem Id is not set");
        }
        // remove old html
        this.captchaWrapperElem.nativeElement.innerHTML = '';
        // create new wrapper for captcha
        /** @type {?} */
        var newElem = this.renderer.createElement('div');
        newElem.id = this.captchaElemId;
        this.renderer.appendChild(this.captchaWrapperElem.nativeElement, newElem);
        // update captcha elem
        this.ensureCaptchaElem(this.captchaElemId);
    };
    /**
     * To be aligned with the ControlValueAccessor interface we need to implement this method
     * However as we don't want to update the recaptcha, this doesn't need to be implemented
     */
    /**
     * To be aligned with the ControlValueAccessor interface we need to implement this method
     * However as we don't want to update the recaptcha, this doesn't need to be implemented
     * @param {?} obj
     * @return {?}
     */
    BaseReCaptchaComponent.prototype.writeValue = /**
     * To be aligned with the ControlValueAccessor interface we need to implement this method
     * However as we don't want to update the recaptcha, this doesn't need to be implemented
     * @param {?} obj
     * @return {?}
     */
    function (obj) { };
    /**
     * This method helps us tie together recaptcha and our formControl values
     */
    /**
     * This method helps us tie together recaptcha and our formControl values
     * @param {?} fn
     * @return {?}
     */
    BaseReCaptchaComponent.prototype.registerOnChange = /**
     * This method helps us tie together recaptcha and our formControl values
     * @param {?} fn
     * @return {?}
     */
    function (fn) {
        this.onChange = fn;
    };
    /**
    * At some point we might be interested whether the user has touched our component
    */
    /**
     * At some point we might be interested whether the user has touched our component
     * @param {?} fn
     * @return {?}
     */
    BaseReCaptchaComponent.prototype.registerOnTouched = /**
     * At some point we might be interested whether the user has touched our component
     * @param {?} fn
     * @return {?}
     */
    function (fn) {
        this.onTouched = fn;
    };
    /**
    * Handles error callback
    */
    /**
     * Handles error callback
     * @protected
     * @return {?}
     */
    BaseReCaptchaComponent.prototype.handleErrorCallback = /**
     * Handles error callback
     * @protected
     * @return {?}
     */
    function () {
        var _this = this;
        this.zone.run((/**
         * @return {?}
         */
        function () {
            _this.onChange(undefined);
            _this.onTouched(undefined);
        }));
        this.error.next();
    };
    /**
    * Handles expired callback
    */
    /**
     * Handles expired callback
     * @protected
     * @return {?}
     */
    BaseReCaptchaComponent.prototype.handleExpireCallback = /**
     * Handles expired callback
     * @protected
     * @return {?}
     */
    function () {
        this.expire.next();
        // reset captcha on expire callback
        this.resetCaptcha();
    };
    BaseReCaptchaComponent.propDecorators = {
        siteKey: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_3__["Input"] }],
        useGlobalDomain: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_3__["Input"] }],
        type: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_3__["Input"] }],
        hl: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_3__["Input"] }],
        tabIndex: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_3__["Input"] }],
        success: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_3__["Output"] }],
        load: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_3__["Output"] }],
        reset: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_3__["Output"] }],
        ready: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_3__["Output"] }],
        error: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_3__["Output"] }],
        expire: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_3__["Output"] }],
        captchaWrapperElem: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_3__["ViewChild"], args: ['captchaWrapperElem',] }],
        captchaScriptElem: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_3__["ViewChild"], args: ['captchaScriptElem',] }]
    };
    return BaseReCaptchaComponent;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @enum {number} */
var ReCaptchaType = {
    InvisibleReCaptcha: 0,
    ReCaptcha2: 1,
};
ReCaptchaType[ReCaptchaType.InvisibleReCaptcha] = 'InvisibleReCaptcha';
ReCaptchaType[ReCaptchaType.ReCaptcha2] = 'ReCaptcha2';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var ScriptService = /** @class */ (function () {
    function ScriptService(zone) {
        this.zone = zone;
        /**
         * Name of the global google recaptcha script
         */
        this.windowGrecaptcha = 'grecaptcha';
        /**
         * Name of the global callback
         */
        this.windowOnLoadCallbackProperty = 'ngx_captcha_onload_callback';
        this.globalDomain = 'recaptcha.net';
        this.defaultDomain = 'google.com';
    }
    /**
     * @param {?} useGlobalDomain
     * @param {?} render
     * @param {?} onLoad
     * @param {?=} language
     * @return {?}
     */
    ScriptService.prototype.registerCaptchaScript = /**
     * @param {?} useGlobalDomain
     * @param {?} render
     * @param {?} onLoad
     * @param {?=} language
     * @return {?}
     */
    function (useGlobalDomain, render, onLoad, language) {
        var _this = this;
        if (this.grecaptchaScriptLoaded()) {
            // recaptcha script is already loaded
            // just call the callback
            this.zone.run((/**
             * @return {?}
             */
            function () {
                onLoad(window[_this.windowGrecaptcha]);
            }));
            return;
        }
        // we need to patch the callback through global variable, otherwise callback is not accessible
        // note: https://github.com/Enngage/ngx-captcha/issues/2
        window[this.windowOnLoadCallbackProperty] = (/** @type {?} */ (((/**
         * @return {?}
         */
        function () { return _this.zone.run(onLoad.bind(_this, window[_this.windowGrecaptcha])); }))));
        // prepare script elem
        /** @type {?} */
        var scriptElem = document.createElement('script');
        scriptElem.innerHTML = '';
        scriptElem.src = this.getCaptchaScriptUrl(useGlobalDomain, render, language);
        scriptElem.async = true;
        scriptElem.defer = true;
        // add script to header
        document.getElementsByTagName('head')[0].appendChild(scriptElem);
    };
    /**
     * @return {?}
     */
    ScriptService.prototype.cleanup = /**
     * @return {?}
     */
    function () {
        window[this.windowOnLoadCallbackProperty] = undefined;
        window[this.windowGrecaptcha] = undefined;
    };
    /**
     * Indicates if google recaptcha script is available and ready to be used
     */
    /**
     * Indicates if google recaptcha script is available and ready to be used
     * @private
     * @return {?}
     */
    ScriptService.prototype.grecaptchaScriptLoaded = /**
     * Indicates if google recaptcha script is available and ready to be used
     * @private
     * @return {?}
     */
    function () {
        if (window[this.windowOnLoadCallbackProperty] && window[this.windowGrecaptcha]) {
            return true;
        }
        return false;
    };
    /**
     * Gets language param used in script url
     */
    /**
     * Gets language param used in script url
     * @private
     * @param {?=} hl
     * @return {?}
     */
    ScriptService.prototype.getLanguageParam = /**
     * Gets language param used in script url
     * @private
     * @param {?=} hl
     * @return {?}
     */
    function (hl) {
        if (!hl) {
            return '';
        }
        return "&hl=" + hl;
    };
    /**
    * Url to google api script
    */
    /**
     * Url to google api script
     * @private
     * @param {?} useGlobalDomain
     * @param {?} render
     * @param {?=} language
     * @return {?}
     */
    ScriptService.prototype.getCaptchaScriptUrl = /**
     * Url to google api script
     * @private
     * @param {?} useGlobalDomain
     * @param {?} render
     * @param {?=} language
     * @return {?}
     */
    function (useGlobalDomain, render, language) {
        /** @type {?} */
        var domain = useGlobalDomain ? this.globalDomain : this.defaultDomain;
        // tslint:disable-next-line:max-line-length
        return "https://www." + domain + "/recaptcha/api.js?onload=" + this.windowOnLoadCallbackProperty + "&render=" + render + this.getLanguageParam(language);
    };
    ScriptService.decorators = [
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_3__["Injectable"] }
    ];
    /** @nocollapse */
    ScriptService.ctorParameters = function () { return [
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_3__["NgZone"] }
    ]; };
    return ScriptService;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var InvisibleReCaptchaComponent = /** @class */ (function (_super) {
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"])(InvisibleReCaptchaComponent, _super);
    function InvisibleReCaptchaComponent(renderer, zone, injector, scriptService) {
        var _this = _super.call(this, renderer, zone, injector, scriptService) || this;
        _this.renderer = renderer;
        _this.zone = zone;
        _this.injector = injector;
        _this.scriptService = scriptService;
        /**
         * This size representing invisible captcha
         */
        _this.size = 'invisible';
        /**
         * Theme
         */
        _this.theme = 'light';
        /**
         * Badge
         */
        _this.badge = 'bottomright';
        _this.recaptchaType = ReCaptchaType.InvisibleReCaptcha;
        return _this;
    }
    /**
     * @param {?} changes
     * @return {?}
     */
    InvisibleReCaptchaComponent.prototype.ngOnChanges = /**
     * @param {?} changes
     * @return {?}
     */
    function (changes) {
        _super.prototype.ngOnChanges.call(this, changes);
    };
    /**
     * Programatically invoke the reCAPTCHA check. Used if the invisible reCAPTCHA is on a div instead of a button.
     */
    /**
     * Programatically invoke the reCAPTCHA check. Used if the invisible reCAPTCHA is on a div instead of a button.
     * @return {?}
     */
    InvisibleReCaptchaComponent.prototype.execute = /**
     * Programatically invoke the reCAPTCHA check. Used if the invisible reCAPTCHA is on a div instead of a button.
     * @return {?}
     */
    function () {
        var _this = this;
        // execute captcha
        this.zone.runOutsideAngular((/**
         * @return {?}
         */
        function () { return _this.reCaptchaApi.execute(_this.captchaId); }));
    };
    /**
     * @protected
     * @return {?}
     */
    InvisibleReCaptchaComponent.prototype.captchaSpecificSetup = /**
     * @protected
     * @return {?}
     */
    function () {
    };
    /**
    * Gets reCaptcha properties
    */
    /**
     * Gets reCaptcha properties
     * @protected
     * @return {?}
     */
    InvisibleReCaptchaComponent.prototype.getCaptchaProperties = /**
     * Gets reCaptcha properties
     * @protected
     * @return {?}
     */
    function () {
        var _this = this;
        return {
            'sitekey': this.siteKey,
            'callback': (/**
             * @param {?} response
             * @return {?}
             */
            function (response) { return _this.zone.run((/**
             * @return {?}
             */
            function () { return _this.handleCallback(response); })); }),
            'expired-callback': (/**
             * @return {?}
             */
            function () { return _this.zone.run((/**
             * @return {?}
             */
            function () { return _this.handleExpireCallback(); })); }),
            'error-callback': (/**
             * @return {?}
             */
            function () { return _this.zone.run((/**
             * @return {?}
             */
            function () { return _this.handleErrorCallback(); })); }),
            'badge': this.badge,
            'type': this.type,
            'tabindex': this.tabIndex,
            'size': this.size,
            'theme': this.theme
        };
    };
    InvisibleReCaptchaComponent.decorators = [
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_3__["Component"], args: [{
                    selector: 'ngx-invisible-recaptcha',
                    template: "\n  <div #captchaWrapperElem></div>",
                    providers: [
                        {
                            provide: _angular_forms__WEBPACK_IMPORTED_MODULE_1__["NG_VALUE_ACCESSOR"],
                            useExisting: Object(_angular_core__WEBPACK_IMPORTED_MODULE_3__["forwardRef"])((/**
                             * @return {?}
                             */
                            function () { return InvisibleReCaptchaComponent; })),
                            multi: true,
                        }
                    ]
                }] }
    ];
    /** @nocollapse */
    InvisibleReCaptchaComponent.ctorParameters = function () { return [
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_3__["Renderer2"] },
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_3__["NgZone"] },
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_3__["Injector"] },
        { type: ScriptService }
    ]; };
    InvisibleReCaptchaComponent.propDecorators = {
        theme: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_3__["Input"] }],
        badge: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_3__["Input"] }],
        hl: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_3__["Input"] }]
    };
    return InvisibleReCaptchaComponent;
}(BaseReCaptchaComponent));

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var ReCaptcha2Component = /** @class */ (function (_super) {
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"])(ReCaptcha2Component, _super);
    function ReCaptcha2Component(renderer, zone, injector, scriptService) {
        var _this = _super.call(this, renderer, zone, injector, scriptService) || this;
        _this.renderer = renderer;
        _this.zone = zone;
        _this.injector = injector;
        _this.scriptService = scriptService;
        /**
         * Name of the global expire callback
         */
        _this.windowOnErrorCallbackProperty = 'ngx_captcha_error_callback';
        /**
         * Name of the global error callback
         */
        _this.windowOnExpireCallbackProperty = 'ngx_captcha_expire_callback';
        /**
         * Theme
         */
        _this.theme = 'light';
        /**
         * Size
         */
        _this.size = 'normal';
        _this.recaptchaType = ReCaptchaType.ReCaptcha2;
        return _this;
    }
    /**
     * @param {?} changes
     * @return {?}
     */
    ReCaptcha2Component.prototype.ngOnChanges = /**
     * @param {?} changes
     * @return {?}
     */
    function (changes) {
        _super.prototype.ngOnChanges.call(this, changes);
    };
    /**
     * @return {?}
     */
    ReCaptcha2Component.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        window[this.windowOnErrorCallbackProperty] = {};
        window[this.windowOnExpireCallbackProperty] = {};
    };
    /**
     * @protected
     * @return {?}
     */
    ReCaptcha2Component.prototype.captchaSpecificSetup = /**
     * @protected
     * @return {?}
     */
    function () {
        this.registerCallbacks();
    };
    /**
     * Gets reCaptcha properties
    */
    /**
     * Gets reCaptcha properties
     * @protected
     * @return {?}
     */
    ReCaptcha2Component.prototype.getCaptchaProperties = /**
     * Gets reCaptcha properties
     * @protected
     * @return {?}
     */
    function () {
        var _this = this;
        return {
            'sitekey': this.siteKey,
            'callback': (/**
             * @param {?} response
             * @return {?}
             */
            function (response) { return _this.zone.run((/**
             * @return {?}
             */
            function () { return _this.handleCallback(response); })); }),
            'expired-callback': (/**
             * @return {?}
             */
            function () { return _this.zone.run((/**
             * @return {?}
             */
            function () { return _this.handleExpireCallback(); })); }),
            'error-callback': (/**
             * @return {?}
             */
            function () { return _this.zone.run((/**
             * @return {?}
             */
            function () { return _this.handleErrorCallback(); })); }),
            'theme': this.theme,
            'type': this.type,
            'size': this.size,
            'tabindex': this.tabIndex
        };
    };
    /**
     * Registers global callbacks
    */
    /**
     * Registers global callbacks
     * @private
     * @return {?}
     */
    ReCaptcha2Component.prototype.registerCallbacks = /**
     * Registers global callbacks
     * @private
     * @return {?}
     */
    function () {
        window[this.windowOnErrorCallbackProperty] = _super.prototype.handleErrorCallback.bind(this);
        window[this.windowOnExpireCallbackProperty] = _super.prototype.handleExpireCallback.bind(this);
    };
    ReCaptcha2Component.decorators = [
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_3__["Component"], args: [{
                    selector: 'ngx-recaptcha2',
                    template: "\n  <div #captchaWrapperElem></div>",
                    providers: [
                        {
                            provide: _angular_forms__WEBPACK_IMPORTED_MODULE_1__["NG_VALUE_ACCESSOR"],
                            useExisting: Object(_angular_core__WEBPACK_IMPORTED_MODULE_3__["forwardRef"])((/**
                             * @return {?}
                             */
                            function () { return ReCaptcha2Component; })),
                            multi: true,
                        }
                    ]
                }] }
    ];
    /** @nocollapse */
    ReCaptcha2Component.ctorParameters = function () { return [
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_3__["Renderer2"] },
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_3__["NgZone"] },
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_3__["Injector"] },
        { type: ScriptService }
    ]; };
    ReCaptcha2Component.propDecorators = {
        theme: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_3__["Input"] }],
        size: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_3__["Input"] }],
        hl: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_3__["Input"] }]
    };
    return ReCaptcha2Component;
}(BaseReCaptchaComponent));

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var ReCaptchaV3Service = /** @class */ (function () {
    function ReCaptchaV3Service(scriptService, zone) {
        this.scriptService = scriptService;
        this.zone = zone;
    }
    /**
     * Executes reCaptcha v3 with given action and passes token via callback. You need to verify
     * this callback in your backend to get meaningful results.
     *
     * For more information see https://developers.google.com/recaptcha/docs/v3
     *
     * @param siteKey Site key found in your google admin panel
     * @param action Action to log
     */
    /**
     * Executes reCaptcha v3 with given action and passes token via callback. You need to verify
     * this callback in your backend to get meaningful results.
     *
     * For more information see https://developers.google.com/recaptcha/docs/v3
     *
     * @param {?} siteKey Site key found in your google admin panel
     * @param {?} action Action to log
     * @param {?} callback
     * @param {?=} config
     * @return {?}
     */
    ReCaptchaV3Service.prototype.execute = /**
     * Executes reCaptcha v3 with given action and passes token via callback. You need to verify
     * this callback in your backend to get meaningful results.
     *
     * For more information see https://developers.google.com/recaptcha/docs/v3
     *
     * @param {?} siteKey Site key found in your google admin panel
     * @param {?} action Action to log
     * @param {?} callback
     * @param {?=} config
     * @return {?}
     */
    function (siteKey, action, callback, config) {
        var _this = this;
        /** @type {?} */
        var useGlobalDomain = config && config.useGlobalDomain ? true : false;
        this.scriptService.registerCaptchaScript(useGlobalDomain, siteKey, (/**
         * @param {?} grecaptcha
         * @return {?}
         */
        function (grecaptcha) {
            _this.zone.runOutsideAngular((/**
             * @return {?}
             */
            function () {
                grecaptcha.execute(siteKey, {
                    action: action
                }).then((/**
                 * @param {?} token
                 * @return {?}
                 */
                function (token) {
                    _this.zone.run((/**
                     * @return {?}
                     */
                    function () { return callback(token); }));
                }));
            }));
        }));
    };
    ReCaptchaV3Service.decorators = [
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_3__["Injectable"] }
    ];
    /** @nocollapse */
    ReCaptchaV3Service.ctorParameters = function () { return [
        { type: ScriptService },
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_3__["NgZone"] }
    ]; };
    return ReCaptchaV3Service;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var NgxCaptchaModule = /** @class */ (function () {
    function NgxCaptchaModule() {
    }
    NgxCaptchaModule.decorators = [
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_3__["NgModule"], args: [{
                    imports: [
                        _angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"]
                    ],
                    declarations: [
                        ReCaptcha2Component,
                        InvisibleReCaptchaComponent
                    ],
                    providers: [
                        ScriptService,
                        ReCaptchaV3Service
                    ],
                    exports: [
                        ReCaptcha2Component,
                        InvisibleReCaptchaComponent
                    ]
                },] }
    ];
    return NgxCaptchaModule;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */



//# sourceMappingURL=ngx-captcha.js.map

/***/ }),

/***/ "./src/app/authentication/auth-home/auth-home.component.html":
/*!*******************************************************************!*\
  !*** ./src/app/authentication/auth-home/auth-home.component.html ***!
  \*******************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/authentication/auth-home/auth-home.component.scss":
/*!*******************************************************************!*\
  !*** ./src/app/authentication/auth-home/auth-home.component.scss ***!
  \*******************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL2F1dGhlbnRpY2F0aW9uL2F1dGgtaG9tZS9hdXRoLWhvbWUuY29tcG9uZW50LnNjc3MifQ== */"

/***/ }),

/***/ "./src/app/authentication/auth-home/auth-home.component.ts":
/*!*****************************************************************!*\
  !*** ./src/app/authentication/auth-home/auth-home.component.ts ***!
  \*****************************************************************/
/*! exports provided: AuthHomeComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AuthHomeComponent", function() { return AuthHomeComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");


var AuthHomeComponent = /** @class */ (function () {
    function AuthHomeComponent() {
    }
    AuthHomeComponent.prototype.ngOnInit = function () {
    };
    AuthHomeComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-auth-home',
            template: __webpack_require__(/*! ./auth-home.component.html */ "./src/app/authentication/auth-home/auth-home.component.html"),
            styles: [__webpack_require__(/*! ./auth-home.component.scss */ "./src/app/authentication/auth-home/auth-home.component.scss")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [])
    ], AuthHomeComponent);
    return AuthHomeComponent;
}());



/***/ }),

/***/ "./src/app/authentication/authentication.module.ts":
/*!*********************************************************!*\
  !*** ./src/app/authentication/authentication.module.ts ***!
  \*********************************************************/
/*! exports provided: AuthenticationModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AuthenticationModule", function() { return AuthenticationModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _login_login_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./login/login.component */ "./src/app/authentication/login/login.component.ts");
/* harmony import */ var _sign_up_sign_up_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./sign-up/sign-up.component */ "./src/app/authentication/sign-up/sign-up.component.ts");
/* harmony import */ var _auth_home_auth_home_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./auth-home/auth-home.component */ "./src/app/authentication/auth-home/auth-home.component.ts");
/* harmony import */ var _authentication_routing_module__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./authentication.routing.module */ "./src/app/authentication/authentication.routing.module.ts");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _sign_up_control_service__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./sign-up/control.service */ "./src/app/authentication/sign-up/control.service.ts");
/* harmony import */ var ngx_captcha__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ngx-captcha */ "./node_modules/ngx-captcha/fesm5/ngx-captcha.js");
/* harmony import */ var _forgot_password_forgot_password_component__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./forgot-password/forgot-password.component */ "./src/app/authentication/forgot-password/forgot-password.component.ts");
/* harmony import */ var _new_password_new_password_component__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./new-password/new-password.component */ "./src/app/authentication/new-password/new-password.component.ts");
/* harmony import */ var _services_auth_service__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./services/auth.service */ "./src/app/authentication/services/auth.service.ts");
/* harmony import */ var _verify_otp_verify_otp_component__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./verify-otp/verify-otp.component */ "./src/app/authentication/verify-otp/verify-otp.component.ts");
/* harmony import */ var _services_otp_service__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./services/otp.service */ "./src/app/authentication/services/otp.service.ts");















var AuthenticationModule = /** @class */ (function () {
    function AuthenticationModule() {
    }
    AuthenticationModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
            declarations: [_login_login_component__WEBPACK_IMPORTED_MODULE_3__["LoginComponent"], _sign_up_sign_up_component__WEBPACK_IMPORTED_MODULE_4__["SignUpComponent"], _auth_home_auth_home_component__WEBPACK_IMPORTED_MODULE_5__["AuthHomeComponent"], _forgot_password_forgot_password_component__WEBPACK_IMPORTED_MODULE_10__["ForgotPasswordComponent"], _new_password_new_password_component__WEBPACK_IMPORTED_MODULE_11__["NewPasswordComponent"], _verify_otp_verify_otp_component__WEBPACK_IMPORTED_MODULE_13__["VerifyOTPComponent"]],
            imports: [_angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"], _angular_forms__WEBPACK_IMPORTED_MODULE_7__["ReactiveFormsModule"], _authentication_routing_module__WEBPACK_IMPORTED_MODULE_6__["AuthenticationRoutingModule"], ngx_captcha__WEBPACK_IMPORTED_MODULE_9__["NgxCaptchaModule"]],
            exports: [],
            providers: [_sign_up_control_service__WEBPACK_IMPORTED_MODULE_8__["ControlService"], _services_auth_service__WEBPACK_IMPORTED_MODULE_12__["AuthService"], _services_otp_service__WEBPACK_IMPORTED_MODULE_14__["OTPService"]],
        })
    ], AuthenticationModule);
    return AuthenticationModule;
}());



/***/ }),

/***/ "./src/app/authentication/authentication.routing.module.ts":
/*!*****************************************************************!*\
  !*** ./src/app/authentication/authentication.routing.module.ts ***!
  \*****************************************************************/
/*! exports provided: AuthenticationRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AuthenticationRoutingModule", function() { return AuthenticationRoutingModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _login_login_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./login/login.component */ "./src/app/authentication/login/login.component.ts");
/* harmony import */ var _sign_up_sign_up_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./sign-up/sign-up.component */ "./src/app/authentication/sign-up/sign-up.component.ts");
/* harmony import */ var _forgot_password_forgot_password_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./forgot-password/forgot-password.component */ "./src/app/authentication/forgot-password/forgot-password.component.ts");
/* harmony import */ var _new_password_new_password_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./new-password/new-password.component */ "./src/app/authentication/new-password/new-password.component.ts");








/* Authentication Routes */
var routes = [
    { path: 'login', component: _login_login_component__WEBPACK_IMPORTED_MODULE_4__["LoginComponent"] },
    { path: 'signUp', component: _sign_up_sign_up_component__WEBPACK_IMPORTED_MODULE_5__["SignUpComponent"] },
    { path: 'resetPassword', component: _forgot_password_forgot_password_component__WEBPACK_IMPORTED_MODULE_6__["ForgotPasswordComponent"] },
    { path: 'newPassword', component: _new_password_new_password_component__WEBPACK_IMPORTED_MODULE_7__["NewPasswordComponent"] },
    { path: '', pathMatch: 'full', redirectTo: 'login' },
    { path: '**', pathMatch: 'full', redirectTo: 'login' }
];
/* End of Authentication Routes */
var AuthenticationRoutingModule = /** @class */ (function () {
    function AuthenticationRoutingModule() {
    }
    AuthenticationRoutingModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
            imports: [_angular_common__WEBPACK_IMPORTED_MODULE_3__["CommonModule"], _angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"].forChild(routes)],
            exports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"]]
        })
    ], AuthenticationRoutingModule);
    return AuthenticationRoutingModule;
}());



/***/ }),

/***/ "./src/app/authentication/forgot-password/forgot-password.component.html":
/*!*******************************************************************************!*\
  !*** ./src/app/authentication/forgot-password/forgot-password.component.html ***!
  \*******************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"bgimg-1\">\n  <div class=\"row card-form\">\n    <div class=\"col s1 m4 l4 xl4\"></div>\n     <div class=\"col s10 m4 l4 xl4\">\n      <div class=\"card-panel\">\n          <div class=\"center\">\n            <img src=\"/assets/login/images/logo.png\" (click)=\"navigateToVahana()\" style=\"cursor: pointer\">\n          </div>\n          <div class=\"divInfo center\">\n            <span class=\"heading\">Forgot Password?</span>\n          </div>\n          <span class=\"heading\">Step 01/02</span>\n          <p>\n          <span class=\"heading1\">Please provide your Mobile Number to verify your account.</span>\n\n          <div id=\"forgotPasswordForm\">\n            <form [formGroup]=\"forgotPasswordForm\" (ngSubmit)=\"submit()\">\n                <div class=\"input-field1\">\n                    <label >Mobile Number</label>\n                    <input id=\"email\" placeholder=\"Enter Mobile Number\" type=\"text\" class=\"validate\" formControlName=\"userInput\">\n                    <small style=\"color:red;\"\n                    *ngIf=\"(forgotPasswordForm.controls['userInput'].hasError('patternError')) &&\n                    (forgotPasswordForm.controls['userInput'].dirty)\"\n                    class=\"form-text text-muted\">\n                    <!-- Please enter valid mobile number or email Address. -->\n                    Please enter valid mobile number \n                  </small>\n                   \n                  <small style=\"color:red;\"\n                  *ngIf=\"(forgotPasswordForm.controls['userInput'].hasError('accountDoesNotExist')) &&  (forgotPasswordForm.controls['userInput'].dirty)\"\n                  class=\"form-text text-muted\">\n                  Account does not exist with this credential\n                </small>\n\n\n                  </div>\n                <div >\n                    \n                </div>\n                <div class=\"input-field1\" *ngIf=\"isOTPScreen\">\n                     <app-verify-otp [groupName]=\"forgotPasswordForm\" [isSetNewPassword]=\"isSetNewPassword\" (optFilled)=\"enableDisableButton($event)\"></app-verify-otp>\n                    \n                </div>\n\n                <div class=\"row \">\n                    <div class=\"input-field col s12 \">\n                      <button [disabled]=\"!forgotPasswordForm.valid || !enableField\" type=\"submit\" class=\"btn sign-in-btn\">\n                        <span *ngIf=\"!showSmallLoader\">Proceed to Set New Password</span> \n                        <i *ngIf=\"showSmallLoader\" class=\"fa fa-circle-o-notch fa-spin\" style=\"font-size:24px\"></i>\n                      </button>\n                      <p class=\"font12 center\">Already have an account? <a (click)=\"navigateToLogin()\">Login</a></p>\n                    </div>\n                </div>\n            </form>\n          </div>\n      </div>\n     </div>\n    <div class=\"col s1 m4 l4 xl4\"></div>\n  </div>\n</div>"

/***/ }),

/***/ "./src/app/authentication/forgot-password/forgot-password.component.scss":
/*!*******************************************************************************!*\
  !*** ./src/app/authentication/forgot-password/forgot-password.component.scss ***!
  \*******************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".bgimg-1 {\n  height: calc(100vh);\n  background-position: center 55%;\n  background-repeat: no-repeat;\n  background-size: cover;\n  background-image: url(\"/assets/login/images/signup-bg.jpg\");\n  -o-object-fit: contain;\n     object-fit: contain; }\n\n.heading {\n  font-family: 'Raleway-SemiBold';\n  color: #757575;\n  font-size: 16px; }\n\n.heading1 {\n  font-family: 'Raleway-Regular';\n  color: #757575;\n  font-size: 14px; }\n\n.input-field1 label {\n  font-size: 13px;\n  text-align: left;\n  width: 100%;\n  float: left;\n  margin-bottom: 2px;\n  color: #2c60ad;\n  margin-top: 5px; }\n\n.input-field1 input {\n  border: 1px solid #b9b9b9;\n  background: #fff;\n  box-shadow: none;\n  padding: 0 8px;\n  border-radius: 4px;\n  width: calc(100% - 20px);\n  line-height: 25px;\n  height: 38px;\n  font-size: 13px;\n  margin: 0px; }\n\n.sign-in-btn {\n  width: 100%;\n  background: #2457a7; }\n\ntable {\n  border-collapse: unset; }\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL2RlY2ltYWwvRGVjaW1hbC92YWhhbmEvdmFoYW5hLXBvcnRhbC1hdXRoZW50aWNhdGlvbi9zcmMvYXBwL2F1dGhlbnRpY2F0aW9uL2ZvcmdvdC1wYXNzd29yZC9mb3Jnb3QtcGFzc3dvcmQuY29tcG9uZW50LnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFDSSxtQkFBbUI7RUFDbkIsK0JBQStCO0VBQy9CLDRCQUE0QjtFQUM1QixzQkFBc0I7RUFDdEIsMkRBQTJEO0VBQzNELHNCQUFtQjtLQUFuQixtQkFBbUIsRUFBQTs7QUFHdkI7RUFDSSwrQkFBK0I7RUFDL0IsY0FBYztFQUNkLGVBQWUsRUFBQTs7QUFHbkI7RUFDSSw4QkFBOEI7RUFDOUIsY0FBYztFQUNkLGVBQWUsRUFBQTs7QUFHbkI7RUFFUSxlQUFlO0VBQ2YsZ0JBQWdCO0VBQ2hCLFdBQVc7RUFDWCxXQUFXO0VBQ1gsa0JBQWtCO0VBQ2xCLGNBQWM7RUFDZCxlQUFlLEVBQUE7O0FBUnZCO0VBWVEseUJBQXlCO0VBQ3pCLGdCQUFnQjtFQUNoQixnQkFBZ0I7RUFDaEIsY0FBYztFQUNkLGtCQUFrQjtFQUNsQix3QkFBd0I7RUFDeEIsaUJBQWlCO0VBQ2pCLFlBQVk7RUFDWixlQUFlO0VBQ2YsV0FBVyxFQUFBOztBQUluQjtFQUNJLFdBQVc7RUFDWCxtQkFBbUIsRUFBQTs7QUFHdkI7RUFDSSxzQkFBc0IsRUFBQSIsImZpbGUiOiJzcmMvYXBwL2F1dGhlbnRpY2F0aW9uL2ZvcmdvdC1wYXNzd29yZC9mb3Jnb3QtcGFzc3dvcmQuY29tcG9uZW50LnNjc3MiLCJzb3VyY2VzQ29udGVudCI6WyIuYmdpbWctMSB7XG4gICAgaGVpZ2h0OiBjYWxjKDEwMHZoKTtcbiAgICBiYWNrZ3JvdW5kLXBvc2l0aW9uOiBjZW50ZXIgNTUlO1xuICAgIGJhY2tncm91bmQtcmVwZWF0OiBuby1yZXBlYXQ7XG4gICAgYmFja2dyb3VuZC1zaXplOiBjb3ZlcjtcbiAgICBiYWNrZ3JvdW5kLWltYWdlOiB1cmwoXCIvYXNzZXRzL2xvZ2luL2ltYWdlcy9zaWdudXAtYmcuanBnXCIpO1xuICAgIG9iamVjdC1maXQ6IGNvbnRhaW47XG59XG5cbi5oZWFkaW5ne1xuICAgIGZvbnQtZmFtaWx5OiAnUmFsZXdheS1TZW1pQm9sZCc7XG4gICAgY29sb3I6ICM3NTc1NzU7XG4gICAgZm9udC1zaXplOiAxNnB4O1xufVxuXG4uaGVhZGluZzF7XG4gICAgZm9udC1mYW1pbHk6ICdSYWxld2F5LVJlZ3VsYXInO1xuICAgIGNvbG9yOiAjNzU3NTc1O1xuICAgIGZvbnQtc2l6ZTogMTRweDtcbn1cblxuLmlucHV0LWZpZWxkMSB7XG4gICAgbGFiZWwge1xuICAgICAgICBmb250LXNpemU6IDEzcHg7XG4gICAgICAgIHRleHQtYWxpZ246IGxlZnQ7XG4gICAgICAgIHdpZHRoOiAxMDAlO1xuICAgICAgICBmbG9hdDogbGVmdDtcbiAgICAgICAgbWFyZ2luLWJvdHRvbTogMnB4O1xuICAgICAgICBjb2xvcjogIzJjNjBhZDtcbiAgICAgICAgbWFyZ2luLXRvcDogNXB4O1xuICAgIH1cblxuICAgIGlucHV0IHtcbiAgICAgICAgYm9yZGVyOiAxcHggc29saWQgI2I5YjliOTtcbiAgICAgICAgYmFja2dyb3VuZDogI2ZmZjtcbiAgICAgICAgYm94LXNoYWRvdzogbm9uZTtcbiAgICAgICAgcGFkZGluZzogMCA4cHg7XG4gICAgICAgIGJvcmRlci1yYWRpdXM6IDRweDtcbiAgICAgICAgd2lkdGg6IGNhbGMoMTAwJSAtIDIwcHgpO1xuICAgICAgICBsaW5lLWhlaWdodDogMjVweDtcbiAgICAgICAgaGVpZ2h0OiAzOHB4O1xuICAgICAgICBmb250LXNpemU6IDEzcHg7XG4gICAgICAgIG1hcmdpbjogMHB4O1xuICAgIH1cbn1cblxuLnNpZ24taW4tYnRuIHtcbiAgICB3aWR0aDogMTAwJTtcbiAgICBiYWNrZ3JvdW5kOiAjMjQ1N2E3O1xufVxuXG50YWJsZXtcbiAgICBib3JkZXItY29sbGFwc2U6IHVuc2V0O1xufSJdfQ== */"

/***/ }),

/***/ "./src/app/authentication/forgot-password/forgot-password.component.ts":
/*!*****************************************************************************!*\
  !*** ./src/app/authentication/forgot-password/forgot-password.component.ts ***!
  \*****************************************************************************/
/*! exports provided: ForgotPasswordComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ForgotPasswordComponent", function() { return ForgotPasswordComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _services_auth_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../services/auth.service */ "./src/app/authentication/services/auth.service.ts");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm5/index.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm5/operators/index.js");
/* harmony import */ var src_app_shared_notify_notify_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! src/app/shared/notify/notify.service */ "./src/app/shared/notify/notify.service.ts");








var ForgotPasswordComponent = /** @class */ (function () {
    function ForgotPasswordComponent(formBuilder, router, authService, notifyService) {
        this.formBuilder = formBuilder;
        this.router = router;
        this.authService = authService;
        this.notifyService = notifyService;
        this.validateFields = new rxjs__WEBPACK_IMPORTED_MODULE_5__["Subject"]();
        this.mobileNumberRegex = new RegExp(/^[789]\d{9}$/);
        this.emailRegex = new RegExp('^[a-z0-9]+(\\.[_a-z0-9]+)*@[a-z0-9-]+(\\.[a-z0-9-]+)*(\\.[a-z]{2,15})$');
        this.isSetNewPassword = new rxjs__WEBPACK_IMPORTED_MODULE_5__["BehaviorSubject"](false);
        this.enableField = false;
    }
    ForgotPasswordComponent.prototype.ngOnInit = function () {
        this.initForm();
        this.validateUserInput();
        this.initValidateFields();
        this.subScribeISSetNewPassword();
    };
    ForgotPasswordComponent.prototype.initForm = function () {
        this.forgotPasswordForm = this.formBuilder.group({
            userInput: ['', [_angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required]],
        });
    };
    ForgotPasswordComponent.prototype.submit = function () {
        this.authService.forgotUserInput = this.getEmailORMobileNumberObject(this.forgotPasswordForm.value.userInput);
        this.navigateToNewPassword();
    };
    ForgotPasswordComponent.prototype.resendOTP = function () {
        console.log('resend OTP');
    };
    ForgotPasswordComponent.prototype.navigateToNewPassword = function () {
        if (this.isOTPScreen) {
            this.isSetNewPassword.next(true);
        }
        else {
            this.isSetNewPassword.next(false);
            this.router.navigate(['auth/newPassword']);
        }
    };
    /* Get Email Or Mobile Number Object for User Exist or not */
    ForgotPasswordComponent.prototype.getEmailORMobileNumberCodeObj = function (value) {
        var reqObj = {};
        var isMobile = this.mobileNumberRegex.test(value);
        if (isMobile) {
            //1 is code for mobile
            reqObj = { 1: value };
        }
        else {
            //2 is code for email
            reqObj = { 2: value };
        }
        return reqObj;
    };
    /* End of Get Email Or Mobile Number Object */
    ForgotPasswordComponent.prototype.getEmailORMobileNumberObject = function (value) {
        var reqObj = {};
        var isMobile = this.mobileNumberRegex.test(value);
        if (isMobile) {
            reqObj = { mobileNumber: value };
        }
        else {
            reqObj = { email: value };
        }
        return reqObj;
    };
    ForgotPasswordComponent.prototype.validateUserInput = function () {
        var _this = this;
        this.forgotPasswordForm.controls['userInput'].valueChanges.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_6__["debounceTime"])(400), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_6__["distinctUntilChanged"])()).subscribe(function (inputValue) {
            if (_this.mobileNumberRegex.test(inputValue)) {
                var userInput = _this.getEmailORMobileNumberCodeObj(inputValue);
                _this.validateFields.next(userInput);
                _this.isValidateAPICompleted = new rxjs__WEBPACK_IMPORTED_MODULE_5__["Subject"]();
                _this.showOTPScreenOnValidateAPIResponse();
                // setting error so button remain Disabled until validation is not done yet
            }
            else if (_this.emailRegex.test(inputValue)) {
                /* Commented for now */
                _this.notifyService.showToast('Email are not allowed', 'error');
                _this.forgotPasswordForm.controls['userInput'].setErrors({ 'patternError': true });
                // const userInput = this.getEmailORMobileNumberCodeObj(inputValue);
                // this.validateFields.next(userInput);
                // this.isOTPScreen = false;
            }
            else {
                _this.isOTPScreen = false;
                _this.forgotPasswordForm.controls['userInput'].setErrors({ 'patternError': true });
            }
        });
    };
    ForgotPasswordComponent.prototype.initValidateFields = function () {
        var _this = this;
        this.validateFields.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_6__["debounceTime"])(500), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_6__["distinctUntilChanged"])()).subscribe(function (userInputObj) {
            if (userInputObj) {
                _this.validateAPI(userInputObj);
            }
        });
    };
    ForgotPasswordComponent.prototype.validateAPI = function (userInputObj) {
        var _this = this;
        /* this api return the true if account doesn't exist */
        this.showSmallLoader = false;
        this.authService.validateFields(userInputObj[Object.keys(userInputObj)[0]], Object.keys(userInputObj)[0]).subscribe(function (resp) {
            if (resp) {
                _this.showSmallLoader = false;
                _this.forgotPasswordForm.controls['userInput'].setErrors({ accountDoesNotExist: true });
            }
        }, function (err) {
            //HERE
            _this.showSmallLoader = false;
            if (err.errorCode == 'ROUTER_TARGERSERVER_EXECUTION') {
                _this.forgotPasswordForm.controls['userInput'].setErrors({ errorInExecutingAPI: true });
                _this.notifyService.showToast(err.errorCode, 'error');
            }
            else {
                _this.forgotPasswordForm.controls['userInput'].setErrors(null);
                _this.isValidateAPICompleted.next(true);
            }
        });
        return Object(rxjs__WEBPACK_IMPORTED_MODULE_5__["of"])('');
    };
    ForgotPasswordComponent.prototype.showOTPScreenOnValidateAPIResponse = function () {
        var _this = this;
        this.isValidateAPICompleted.subscribe(function (isCompleted) {
            if (isCompleted) {
                _this.isOTPScreen = true;
                _this.forgotPasswordForm.setErrors({ 'otpNotGenerated': true });
                _this.isValidateAPICompleted.unsubscribe();
            }
        });
    };
    ForgotPasswordComponent.prototype.subScribeISSetNewPassword = function () {
        var _this = this;
        console.log('init set');
        this.isSetNewPassword.subscribe(function (resp) {
            if (!resp) {
                console.log('init set true');
                _this.showSmallLoader = false;
                _this.forgotPasswordForm.controls['userInput'].setErrors({ aacountNotExist: true });
            }
            else {
                console.log('init seswswswt');
                _this.forgotPasswordForm.controls['userInput'].setErrors(null);
            }
        });
    };
    ForgotPasswordComponent.prototype.navigateToLogin = function () {
        this.router.navigate(['auth/login']);
    };
    ForgotPasswordComponent.prototype.navigateToVahana = function () {
        this.router.navigate(['auth/login']);
    };
    ForgotPasswordComponent.prototype.enableDisableButton = function (value) {
        console.log("enable/disable Button: ", value);
        console.log(this.forgotPasswordForm);
        this.enableField = value;
    };
    ForgotPasswordComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-forgot-password',
            template: __webpack_require__(/*! ./forgot-password.component.html */ "./src/app/authentication/forgot-password/forgot-password.component.html"),
            styles: [__webpack_require__(/*! ./forgot-password.component.scss */ "./src/app/authentication/forgot-password/forgot-password.component.scss")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormBuilder"], _angular_router__WEBPACK_IMPORTED_MODULE_3__["Router"], _services_auth_service__WEBPACK_IMPORTED_MODULE_4__["AuthService"],
            src_app_shared_notify_notify_service__WEBPACK_IMPORTED_MODULE_7__["NotifyService"]])
    ], ForgotPasswordComponent);
    return ForgotPasswordComponent;
}());



/***/ }),

/***/ "./src/app/authentication/login/login.component.html":
/*!***********************************************************!*\
  !*** ./src/app/authentication/login/login.component.html ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"bgimg-1\">\n  <div class=\"row card-form\">\n    <div class=\"col s1 m4 l4 xl4\"></div>\n    <div class=\"col s10 m4 l4 xl4\">\n      <div class=\"card-panel\">\n        <div class=\"center\">\n          <img src=\"/assets/login/images/logo.png\" (click)=\"navigateToVahana()\" style=\"cursor: pointer\">\n        </div>\n        <div class=\"divInfo center\">\n          <span class=\" infoText\">We are glad, you're back. Proceed to Sign In</span>\n        </div>\n\n        <div id=\"signInForm\">\n          <form [formGroup]=\"signInForm\" (ngSubmit)=\"submit()\">\n            <!-- Email Row-->\n            <div class=\"input-field1\">\n              <label >Email ID/Mobile Number</label>\n              <input id=\"email\" placeholder=\"Enter Email ID or Mobile Number\" type=\"text\" class=\"validate\" formControlName=\"userInput\">\n              <small style=\"color:red;\"\n              *ngIf=\"(signInForm.controls['userInput'].hasError('patternError')) &&\n              (signInForm.controls['userInput'].dirty)\"\n              class=\"form-text text-muted\">\n              Please enter valid mobile number or email Address.\n            </small>\n           \n            <small style=\"color:red;\"\n                  *ngIf=\"(signInForm.controls['userInput'].hasError('accountDoesNotExist')) &&  (signInForm.controls['userInput'].dirty)\"\n                  class=\"form-text text-muted\">\n                  Account does not exist with this credential\n                </small>\n\n\n            </div>\n            \n  \n\n            <div class=\"input-field1\">\n              <label>Password</label>\n              <input id=\"password\" placeholder=\"*******\" type=\"password\" class=\"validate\" formControlName=\"password\">\n            </div>\n\n            <!-- <div class=\"input-field1\" style=\"padding-top: 10px;\">\n              <ngx-recaptcha2 #captchaElem [siteKey]=\"captcha\" [useGlobalDomain]=\"false\"\n                [size]=\"'10px'\"    formControlName=\"recaptcha\">\n              </ngx-recaptcha2>\n            </div> -->\n\n            <div class=\"row \">\n              <div class=\"input-field col s12 \">\n                <button [disabled]=\"signInForm.invalid\" type=\"submit\"  class=\"waves-effect btn sign-in-btn\">Sign\n                  In</button>\n                \n                <p class=\"font12 center\">Don't have an account? <a (click)=\"navigateToSignUp()\">Sign Up</a></p>\n                <p class=\"font12 center\">Don't remember your password? <a (click)=\"navigateToForgotPassword()\">Reset</a></p>\n              </div>\n            </div>\n\n\n\n            <!-- End of Email Row-->\n          </form>\n        </div>\n      </div>\n    </div>\n    <div class=\"col s1 m4 l4 xl4\"></div>\n  </div>\n</div>"

/***/ }),

/***/ "./src/app/authentication/login/login.component.scss":
/*!***********************************************************!*\
  !*** ./src/app/authentication/login/login.component.scss ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".bgimg-1 {\n  height: calc(110vh);\n  background-position: center 55%;\n  background-repeat: no-repeat;\n  background-size: cover;\n  background-image: url(\"/assets/login/images/signup-bg.jpg\");\n  -o-object-fit: contain;\n     object-fit: contain; }\n\n.card-panel {\n  transition: box-shadow .25s;\n  padding: 24px;\n  margin: .5rem 0 1rem 0;\n  border-radius: 2px;\n  background-color: #fff; }\n\n.infoText {\n  font-size: 16px;\n  color: grey;\n  font-weight: 500; }\n\n.divInfo {\n  padding-left: 70px;\n  padding-right: 75px; }\n\n.input-field1 label {\n  font-size: 13px;\n  text-align: left;\n  width: 100%;\n  float: left;\n  margin-bottom: 2px;\n  color: #2c60ad;\n  margin-top: 5px; }\n\n.input-field1 input {\n  border: 1px solid #b9b9b9;\n  background: #fff;\n  box-shadow: none;\n  padding: 0 8px;\n  border-radius: 4px;\n  width: calc(100% - 20px);\n  line-height: 25px;\n  height: 38px;\n  font-size: 13px;\n  margin: 0px; }\n\n.sign-in-btn {\n  width: 100%;\n  background: #2457a7; }\n\n:host ::ng-deep .rc-anchor-light.rc-anchor-normal {\n  border: 0px solid #d3d3d3 !important; }\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL2RlY2ltYWwvRGVjaW1hbC92YWhhbmEvdmFoYW5hLXBvcnRhbC1hdXRoZW50aWNhdGlvbi9zcmMvYXBwL2F1dGhlbnRpY2F0aW9uL2xvZ2luL2xvZ2luLmNvbXBvbmVudC5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUVBO0VBQ0ksbUJBQW1CO0VBQ25CLCtCQUErQjtFQUMvQiw0QkFBNEI7RUFDNUIsc0JBQXNCO0VBQ3RCLDJEQUEyRDtFQUMzRCxzQkFBbUI7S0FBbkIsbUJBQW1CLEVBQUE7O0FBR3ZCO0VBQ0ksMkJBQTJCO0VBQzNCLGFBQWE7RUFDYixzQkFBc0I7RUFDdEIsa0JBQWtCO0VBQ2xCLHNCQUFzQixFQUFBOztBQUcxQjtFQUVJLGVBQWU7RUFDZixXQUFXO0VBQ1gsZ0JBQWdCLEVBQUE7O0FBR3BCO0VBQ0ksa0JBQWtCO0VBQ2xCLG1CQUFtQixFQUFBOztBQUd2QjtFQUVRLGVBQWU7RUFDZixnQkFBZ0I7RUFDaEIsV0FBVztFQUNYLFdBQVc7RUFDWCxrQkFBa0I7RUFDbEIsY0FBYztFQUNkLGVBQWUsRUFBQTs7QUFSdkI7RUFZUSx5QkFBeUI7RUFDekIsZ0JBQWdCO0VBQ2hCLGdCQUFnQjtFQUNoQixjQUFjO0VBQ2Qsa0JBQWtCO0VBQ2xCLHdCQUF3QjtFQUN4QixpQkFBaUI7RUFDakIsWUFBWTtFQUNaLGVBQWU7RUFDZixXQUFXLEVBQUE7O0FBSW5CO0VBQ0ksV0FBVztFQUNYLG1CQUFtQixFQUFBOztBQUd2QjtFQUNJLG9DQUFvQyxFQUFBIiwiZmlsZSI6InNyYy9hcHAvYXV0aGVudGljYXRpb24vbG9naW4vbG9naW4uY29tcG9uZW50LnNjc3MiLCJzb3VyY2VzQ29udGVudCI6WyJcblxuLmJnaW1nLTEge1xuICAgIGhlaWdodDogY2FsYygxMTB2aCk7XG4gICAgYmFja2dyb3VuZC1wb3NpdGlvbjogY2VudGVyIDU1JTtcbiAgICBiYWNrZ3JvdW5kLXJlcGVhdDogbm8tcmVwZWF0O1xuICAgIGJhY2tncm91bmQtc2l6ZTogY292ZXI7XG4gICAgYmFja2dyb3VuZC1pbWFnZTogdXJsKFwiL2Fzc2V0cy9sb2dpbi9pbWFnZXMvc2lnbnVwLWJnLmpwZ1wiKTtcbiAgICBvYmplY3QtZml0OiBjb250YWluO1xufVxuXG4uY2FyZC1wYW5lbCB7XG4gICAgdHJhbnNpdGlvbjogYm94LXNoYWRvdyAuMjVzO1xuICAgIHBhZGRpbmc6IDI0cHg7XG4gICAgbWFyZ2luOiAuNXJlbSAwIDFyZW0gMDtcbiAgICBib3JkZXItcmFkaXVzOiAycHg7XG4gICAgYmFja2dyb3VuZC1jb2xvcjogI2ZmZjtcbn1cblxuLmluZm9UZXh0XG57XG4gICAgZm9udC1zaXplOiAxNnB4O1xuICAgIGNvbG9yOiBncmV5O1xuICAgIGZvbnQtd2VpZ2h0OiA1MDA7XG59XG5cbi5kaXZJbmZve1xuICAgIHBhZGRpbmctbGVmdDogNzBweDtcbiAgICBwYWRkaW5nLXJpZ2h0OiA3NXB4O1xufVxuXG4uaW5wdXQtZmllbGQxIHtcbiAgICBsYWJlbCB7XG4gICAgICAgIGZvbnQtc2l6ZTogMTNweDtcbiAgICAgICAgdGV4dC1hbGlnbjogbGVmdDtcbiAgICAgICAgd2lkdGg6IDEwMCU7XG4gICAgICAgIGZsb2F0OiBsZWZ0O1xuICAgICAgICBtYXJnaW4tYm90dG9tOiAycHg7XG4gICAgICAgIGNvbG9yOiAjMmM2MGFkO1xuICAgICAgICBtYXJnaW4tdG9wOiA1cHg7XG4gICAgfVxuXG4gICAgaW5wdXQge1xuICAgICAgICBib3JkZXI6IDFweCBzb2xpZCAjYjliOWI5O1xuICAgICAgICBiYWNrZ3JvdW5kOiAjZmZmO1xuICAgICAgICBib3gtc2hhZG93OiBub25lO1xuICAgICAgICBwYWRkaW5nOiAwIDhweDtcbiAgICAgICAgYm9yZGVyLXJhZGl1czogNHB4O1xuICAgICAgICB3aWR0aDogY2FsYygxMDAlIC0gMjBweCk7XG4gICAgICAgIGxpbmUtaGVpZ2h0OiAyNXB4O1xuICAgICAgICBoZWlnaHQ6IDM4cHg7XG4gICAgICAgIGZvbnQtc2l6ZTogMTNweDtcbiAgICAgICAgbWFyZ2luOiAwcHg7XG4gICAgfVxufVxuXG4uc2lnbi1pbi1idG4ge1xuICAgIHdpZHRoOiAxMDAlO1xuICAgIGJhY2tncm91bmQ6ICMyNDU3YTc7XG59XG5cbjpob3N0IDo6bmctZGVlcCAucmMtYW5jaG9yLWxpZ2h0LnJjLWFuY2hvci1ub3JtYWwge1xuICAgIGJvcmRlcjogMHB4IHNvbGlkICNkM2QzZDMgIWltcG9ydGFudDtcbn1cblxuIl19 */"

/***/ }),

/***/ "./src/app/authentication/login/login.component.ts":
/*!*********************************************************!*\
  !*** ./src/app/authentication/login/login.component.ts ***!
  \*********************************************************/
/*! exports provided: LoginComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LoginComponent", function() { return LoginComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _services_auth_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../services/auth.service */ "./src/app/authentication/services/auth.service.ts");
/* harmony import */ var src_app_shared_loader_loader_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! src/app/shared/loader/loader.service */ "./src/app/shared/loader/loader.service.ts");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm5/index.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm5/operators/index.js");
/* harmony import */ var src_app_shared_notify_notify_service__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! src/app/shared/notify/notify.service */ "./src/app/shared/notify/notify.service.ts");
/* harmony import */ var src_app_shared_services_platwareService_utility_service__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! src/app/shared/services/platwareService/utility.service */ "./src/app/shared/services/platwareService/utility.service.ts");
/* harmony import */ var src_app_shared_services_AppConstant__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! src/app/shared/services/AppConstant */ "./src/app/shared/services/AppConstant.ts");
/* harmony import */ var src_app_shared_services_platwareService_platware_service__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! src/app/shared/services/platwareService/platware.service */ "./src/app/shared/services/platwareService/platware.service.ts");












var LoginComponent = /** @class */ (function () {
    function LoginComponent(formBuilder, router, authService, loaderService, notifyService, utility, utilityService, platwareService) {
        this.formBuilder = formBuilder;
        this.router = router;
        this.authService = authService;
        this.loaderService = loaderService;
        this.notifyService = notifyService;
        this.utility = utility;
        this.utilityService = utilityService;
        this.platwareService = platwareService;
        this.validateFields = new rxjs__WEBPACK_IMPORTED_MODULE_6__["Subject"]();
        this.fieldsType = '';
        this.mobileNumberRegex = new RegExp(/^[789]\d{9}$/);
        this.emailRegex = new RegExp(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
    }
    LoginComponent.prototype.ngOnInit = function () {
        this.initForm();
        this.addCaptcha();
        this.initValidateFields();
        this.validateUserInput();
        this.scrollToWindowToTop();
    };
    LoginComponent.prototype.initForm = function () {
        this.signInForm = this.formBuilder.group({
            userInput: [this.utilityService.getLocalStorage(src_app_shared_services_AppConstant__WEBPACK_IMPORTED_MODULE_10__["AppConstant"].SIGNUP_EMAIL), [_angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required]],
            password: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required],
        });
        this.getCaptureKey();
    };
    LoginComponent.prototype.submit = function () {
        console.log(this.signInForm.value);
        this.callSignInApi();
    };
    /* This method navigate user to signUp */
    LoginComponent.prototype.navigateToSignUp = function () {
        this.router.navigate(['auth/signUp']);
    };
    /* This method navigate user to Forgot Password */
    LoginComponent.prototype.navigateToForgotPassword = function () {
        this.router.navigate(['auth/resetPassword']);
    };
    /*Method for adding Captcha to formControl Object */
    LoginComponent.prototype.addCaptcha = function () {
        //  this.signInForm.addControl('recaptcha', new FormControl('', [Validators.required]));
    };
    /*End of method for adding Captcha to formControl Object */
    LoginComponent.prototype.callSignInApi = function () {
        this.loaderService.showLoader();
        var reqObj = {};
        reqObj = this.getEmailORMobileObj(this.signInForm.value.userInput);
        reqObj['password'] = this.signInForm.value.password;
        var self = this;
        this.authService.signIn(reqObj, function (response) {
            self.loaderService.hideLoader();
            if (response.status) {
                self.notifyService.showToast('Welcome to Vahana Portal! ', 'success');
                response = JSON.parse(response['data']);
                self.saveUserData(response);
                window.open('/vahana/', '_top');
            }
            else {
                self.notifyService.showToast('Login failed.', 'error');
            }
        });
    };
    // public callSignInApi(): void {
    //   this.loaderService.showLoader();
    //   let reqObj = {};
    //   reqObj = this.getEmailORMobileObj(this.signInForm.value.userInput);
    //   reqObj['password'] = this.signInForm.value.password;
    //   let self = this;
    //   this.authService.signIn(reqObj).subscribe(
    //     (next)=>{
    //       if(next){
    //         self.loaderService.hideLoader();
    //         if (next.status) {
    //           self.notifyService.showToast('Welcome to Vahana Portal! ','success');
    //           next = JSON.parse(next['data']);
    //           self.saveUserData(next);
    //           window.open('/vahana/', '_top');
    //         } else {
    //           self.utilityService.getError(next,'AUTH_VAHANA')
    //         }
    //       }
    //     },(error)=>{
    //       self.loaderService.hideLoader();
    //       self.utilityService.getError(error,'AUTH_VAHANA')
    //     }
    //   );
    // }
    LoginComponent.prototype.saveUserData = function (response) {
        var _response = response['response'];
        _response['defaultOrg'] = _response['orgId'];
        _response['userId'] = _response['userDetails']['userId'];
        _response[src_app_shared_services_AppConstant__WEBPACK_IMPORTED_MODULE_10__["AppConstant"].COMMUNICATION] = _response['userDetails'][src_app_shared_services_AppConstant__WEBPACK_IMPORTED_MODULE_10__["AppConstant"].COMMUNICATION];
        _response[src_app_shared_services_AppConstant__WEBPACK_IMPORTED_MODULE_10__["AppConstant"].CITY] = _response['userDetails'][src_app_shared_services_AppConstant__WEBPACK_IMPORTED_MODULE_10__["AppConstant"].CITY];
        _response[src_app_shared_services_AppConstant__WEBPACK_IMPORTED_MODULE_10__["AppConstant"].COUNTRY] = _response['userDetails'][src_app_shared_services_AppConstant__WEBPACK_IMPORTED_MODULE_10__["AppConstant"].COUNTRY];
        _response[src_app_shared_services_AppConstant__WEBPACK_IMPORTED_MODULE_10__["AppConstant"].ADDRESS] = _response['userDetails'][src_app_shared_services_AppConstant__WEBPACK_IMPORTED_MODULE_10__["AppConstant"].ADDRESS];
        _response[src_app_shared_services_AppConstant__WEBPACK_IMPORTED_MODULE_10__["AppConstant"].FULL_NAME] = _response['userDetails'][src_app_shared_services_AppConstant__WEBPACK_IMPORTED_MODULE_10__["AppConstant"].FULL_NAME];
        _response[src_app_shared_services_AppConstant__WEBPACK_IMPORTED_MODULE_10__["AppConstant"].ORGANIZATION_NAME] = _response['userDetails'][src_app_shared_services_AppConstant__WEBPACK_IMPORTED_MODULE_10__["AppConstant"].ORGANIZATION_NAME];
        _response[src_app_shared_services_AppConstant__WEBPACK_IMPORTED_MODULE_10__["AppConstant"].POSTAL_CODE] = _response['userDetails'][src_app_shared_services_AppConstant__WEBPACK_IMPORTED_MODULE_10__["AppConstant"].POSTAL_CODE];
        _response[src_app_shared_services_AppConstant__WEBPACK_IMPORTED_MODULE_10__["AppConstant"].STATE] = _response['userDetails'][src_app_shared_services_AppConstant__WEBPACK_IMPORTED_MODULE_10__["AppConstant"].STATE];
        this.utility.saveUserDetail(_response);
    };
    LoginComponent.prototype.getCaptureKey = function () {
        var _this = this;
        this.authService.getCaptureKey().subscribe(function (result) {
            _this.captcha = result['captcha'];
            console.log(_this.captcha);
        });
    };
    LoginComponent.prototype.initValidateFields = function () {
        var _this = this;
        this.validateFields.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_7__["distinctUntilChanged"])()).subscribe(function (userInputObj) {
            _this.validateAPI(userInputObj);
        });
    };
    LoginComponent.prototype.validateAPI = function (userInputObj) {
        var _this = this;
        this.authService.validateFields(userInputObj[Object.keys(userInputObj)[0]], Object.keys(userInputObj)[0]).subscribe(function (resp) {
            if (resp) {
                _this.signInForm.controls['userInput'].setErrors({ accountDoesNotExist: true });
            }
        }, function (err) { _this.signInForm.controls['userInput'].setErrors(null); });
        return Object(rxjs__WEBPACK_IMPORTED_MODULE_6__["of"])('');
    };
    /* validate userInput*/
    LoginComponent.prototype.validateUserInput = function () {
        var _this = this;
        this.signInForm.controls['userInput'].valueChanges.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_7__["debounceTime"])(400), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_7__["distinctUntilChanged"])()).subscribe(function (inputValue) {
            if (_this.emailRegex.test(inputValue) || _this.mobileNumberRegex.test(inputValue)) {
                _this.signInForm.controls['userInput'].setErrors(null);
                var userInput = _this.getEmailORMobileNumberCodeObj(inputValue);
                _this.validateFields.next(userInput);
            }
            else {
                _this.signInForm.controls['userInput'].setErrors({ 'patternError': true });
            }
        });
    };
    /* End of validate userInput*/
    /* Get Email Or Mobile Number Object for User Exist or not */
    LoginComponent.prototype.getEmailORMobileNumberCodeObj = function (value) {
        var reqObj = {};
        var isMobile = this.mobileNumberRegex.test(value);
        if (isMobile) {
            //1 is code for mobile
            reqObj = { '1': value };
        }
        else {
            //2 is code for email
            reqObj = { '2': value };
        }
        return reqObj;
    };
    /* End of Get Email Or Mobile Number Object */
    /* Get Email Or Mobile Number Object for User Exist or not */
    LoginComponent.prototype.getEmailORMobileObj = function (value) {
        var reqObj = {};
        var isMobile = this.mobileNumberRegex.test(value);
        if (isMobile) {
            //1 is code for mobile
            reqObj = { 'id': value, 'authType': 'mobile', 'email': '' };
        }
        else {
            //2 is code for email
            reqObj = { 'id': value, 'authType': 'email', 'email': '' };
        }
        return reqObj;
    };
    /* End of Get Email Or Mobile Number Object */
    LoginComponent.prototype.scrollToWindowToTop = function () {
        window.scroll(0, 0);
    };
    LoginComponent.prototype.navigateToVahana = function () {
        this.router.navigate(['auth/login']);
    };
    LoginComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-login',
            template: __webpack_require__(/*! ./login.component.html */ "./src/app/authentication/login/login.component.html"),
            styles: [__webpack_require__(/*! ./login.component.scss */ "./src/app/authentication/login/login.component.scss")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormBuilder"], _angular_router__WEBPACK_IMPORTED_MODULE_3__["Router"],
            _services_auth_service__WEBPACK_IMPORTED_MODULE_4__["AuthService"], src_app_shared_loader_loader_service__WEBPACK_IMPORTED_MODULE_5__["LoaderService"],
            src_app_shared_notify_notify_service__WEBPACK_IMPORTED_MODULE_8__["NotifyService"], src_app_shared_services_platwareService_utility_service__WEBPACK_IMPORTED_MODULE_9__["UtilityService"],
            src_app_shared_services_platwareService_utility_service__WEBPACK_IMPORTED_MODULE_9__["UtilityService"], src_app_shared_services_platwareService_platware_service__WEBPACK_IMPORTED_MODULE_11__["PlatwareService"]])
    ], LoginComponent);
    return LoginComponent;
}());



/***/ }),

/***/ "./src/app/authentication/new-password/new-password.component.html":
/*!*************************************************************************!*\
  !*** ./src/app/authentication/new-password/new-password.component.html ***!
  \*************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"bgimg-1\">\n    <div class=\"row card-form\">\n      <div class=\"col s1 m4 l4 xl4\"></div>\n       <div class=\"col s10 m4 l4 xl4\">\n        <div class=\"card-panel\">\n            <div class=\"center\">\n              <img src=\"/assets/login/images/logo.png\" (click)=\"navigateToVahana()\" style=\"cursor: pointer\">\n            </div>\n            <div class=\"divInfo center\">\n              <span class=\"heading\">Forgot Password?</span>\n            </div>\n            <span class=\"heading\">Step 02/02</span>\n            <p>\n            <span class=\"heading1\">Please create your new password.</span>\n  \n            <div id=\"forgotPasswordForm\">\n              <form [formGroup]=\"newPasswordForm\" (ngSubmit)=\"submit()\">\n                  <div class=\"input-field1\">\n                      <label >New Password</label>\n                      <input id=\"password\" placeholder=\"Enter New Password\" type=\"password\" class=\"validate\" formControlName=\"password\">\n                      <small style=\"color:red;\"\n                      *ngIf=\"(newPasswordForm.controls['password'].hasError('required')) &&\n                      (newPasswordForm.controls['password'].dirty)\"\n                      class=\"form-text text-muted\">\n                      Password is mandatory\n                    </small> \n                    <small style=\"color:red;\"\n                      *ngIf=\"(newPasswordForm.controls['password'].hasError('pattern')) &&\n                      (newPasswordForm.controls['password'].dirty)\"\n                      class=\"form-text text-muted\">\n                      Please choose strong password\n                    </small>                    \n                    </div>\n\n                  <div class=\"input-field1\">\n                      <label>Confirm Password</label>\n                      <input id=\"confirmPassword\" placeholder=\"Confirm New Password\" type=\"password\" class=\"validate\" formControlName=\"confirmPassword\">\n                      <small style=\"color:red;\"\n                      *ngIf=\"(newPasswordForm.hasError('invalidPassword')) &&\n                      (newPasswordForm.controls['confirmPassword'].dirty)\"\n                      class=\"form-text text-muted\">\n                      Password and confirm password mismatch\n                    </small>                    \n                    </div>\n\n  \n                  <div class=\"row \">\n                      <div class=\"input-field col s12 \">\n                        <button [disabled]=\"newPasswordForm.invalid\" type=\"submit\" class=\"waves-effect btn sign-in-btn\">Set New Password</button>\n                      </div>\n                  </div>\n                    <span>Haven’t joined Vahana yet?</span>\n                  <span style=\"color:#2457a7;\" (click)=\"navigateToSignUp()\" > <u> Join free</u></span>\n              </form>\n            </div>\n        </div>\n       </div>\n      <div class=\"col s1 m4 l4 xl4\"></div>\n    </div>\n  </div>"

/***/ }),

/***/ "./src/app/authentication/new-password/new-password.component.scss":
/*!*************************************************************************!*\
  !*** ./src/app/authentication/new-password/new-password.component.scss ***!
  \*************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".bgimg-1 {\n  height: calc(100vh);\n  background-position: center 55%;\n  background-repeat: no-repeat;\n  background-size: cover;\n  background-image: url(\"/assets/login/images/signup-bg.jpg\");\n  -o-object-fit: contain;\n     object-fit: contain; }\n\n.heading {\n  font-family: 'Raleway-SemiBold';\n  color: #757575;\n  font-size: 16px; }\n\n.heading1 {\n  font-family: 'Raleway-Regular';\n  color: #757575;\n  font-size: 14px; }\n\n.input-field1 label {\n  font-size: 13px;\n  text-align: left;\n  width: 100%;\n  float: left;\n  margin-bottom: 2px;\n  color: #2c60ad;\n  margin-top: 5px; }\n\n.input-field1 input {\n  border: 1px solid #b9b9b9;\n  background: #fff;\n  box-shadow: none;\n  padding: 0 8px;\n  border-radius: 4px;\n  width: calc(100% - 20px);\n  line-height: 25px;\n  height: 38px;\n  font-size: 13px;\n  margin: 0px; }\n\n.sign-in-btn {\n  width: 100%;\n  background: #2457a7; }\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL2RlY2ltYWwvRGVjaW1hbC92YWhhbmEvdmFoYW5hLXBvcnRhbC1hdXRoZW50aWNhdGlvbi9zcmMvYXBwL2F1dGhlbnRpY2F0aW9uL25ldy1wYXNzd29yZC9uZXctcGFzc3dvcmQuY29tcG9uZW50LnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFDSSxtQkFBbUI7RUFDbkIsK0JBQStCO0VBQy9CLDRCQUE0QjtFQUM1QixzQkFBc0I7RUFDdEIsMkRBQTJEO0VBQzNELHNCQUFtQjtLQUFuQixtQkFBbUIsRUFBQTs7QUFHdkI7RUFDSSwrQkFBK0I7RUFDL0IsY0FBYztFQUNkLGVBQWUsRUFBQTs7QUFHbkI7RUFDSSw4QkFBOEI7RUFDOUIsY0FBYztFQUNkLGVBQWUsRUFBQTs7QUFHbkI7RUFFUSxlQUFlO0VBQ2YsZ0JBQWdCO0VBQ2hCLFdBQVc7RUFDWCxXQUFXO0VBQ1gsa0JBQWtCO0VBQ2xCLGNBQWM7RUFDZCxlQUFlLEVBQUE7O0FBUnZCO0VBWVEseUJBQXlCO0VBQ3pCLGdCQUFnQjtFQUNoQixnQkFBZ0I7RUFDaEIsY0FBYztFQUNkLGtCQUFrQjtFQUNsQix3QkFBd0I7RUFDeEIsaUJBQWlCO0VBQ2pCLFlBQVk7RUFDWixlQUFlO0VBQ2YsV0FBVyxFQUFBOztBQUluQjtFQUNJLFdBQVc7RUFDWCxtQkFBbUIsRUFBQSIsImZpbGUiOiJzcmMvYXBwL2F1dGhlbnRpY2F0aW9uL25ldy1wYXNzd29yZC9uZXctcGFzc3dvcmQuY29tcG9uZW50LnNjc3MiLCJzb3VyY2VzQ29udGVudCI6WyIuYmdpbWctMSB7XG4gICAgaGVpZ2h0OiBjYWxjKDEwMHZoKTtcbiAgICBiYWNrZ3JvdW5kLXBvc2l0aW9uOiBjZW50ZXIgNTUlO1xuICAgIGJhY2tncm91bmQtcmVwZWF0OiBuby1yZXBlYXQ7XG4gICAgYmFja2dyb3VuZC1zaXplOiBjb3ZlcjtcbiAgICBiYWNrZ3JvdW5kLWltYWdlOiB1cmwoXCIvYXNzZXRzL2xvZ2luL2ltYWdlcy9zaWdudXAtYmcuanBnXCIpO1xuICAgIG9iamVjdC1maXQ6IGNvbnRhaW47XG59XG5cbi5oZWFkaW5ne1xuICAgIGZvbnQtZmFtaWx5OiAnUmFsZXdheS1TZW1pQm9sZCc7XG4gICAgY29sb3I6ICM3NTc1NzU7XG4gICAgZm9udC1zaXplOiAxNnB4O1xufVxuXG4uaGVhZGluZzF7XG4gICAgZm9udC1mYW1pbHk6ICdSYWxld2F5LVJlZ3VsYXInO1xuICAgIGNvbG9yOiAjNzU3NTc1O1xuICAgIGZvbnQtc2l6ZTogMTRweDtcbn1cblxuLmlucHV0LWZpZWxkMSB7XG4gICAgbGFiZWwge1xuICAgICAgICBmb250LXNpemU6IDEzcHg7XG4gICAgICAgIHRleHQtYWxpZ246IGxlZnQ7XG4gICAgICAgIHdpZHRoOiAxMDAlO1xuICAgICAgICBmbG9hdDogbGVmdDtcbiAgICAgICAgbWFyZ2luLWJvdHRvbTogMnB4O1xuICAgICAgICBjb2xvcjogIzJjNjBhZDtcbiAgICAgICAgbWFyZ2luLXRvcDogNXB4O1xuICAgIH1cblxuICAgIGlucHV0IHtcbiAgICAgICAgYm9yZGVyOiAxcHggc29saWQgI2I5YjliOTtcbiAgICAgICAgYmFja2dyb3VuZDogI2ZmZjtcbiAgICAgICAgYm94LXNoYWRvdzogbm9uZTtcbiAgICAgICAgcGFkZGluZzogMCA4cHg7XG4gICAgICAgIGJvcmRlci1yYWRpdXM6IDRweDtcbiAgICAgICAgd2lkdGg6IGNhbGMoMTAwJSAtIDIwcHgpO1xuICAgICAgICBsaW5lLWhlaWdodDogMjVweDtcbiAgICAgICAgaGVpZ2h0OiAzOHB4O1xuICAgICAgICBmb250LXNpemU6IDEzcHg7XG4gICAgICAgIG1hcmdpbjogMHB4O1xuICAgIH1cbn1cblxuLnNpZ24taW4tYnRuIHtcbiAgICB3aWR0aDogMTAwJTtcbiAgICBiYWNrZ3JvdW5kOiAjMjQ1N2E3O1xufSJdfQ== */"

/***/ }),

/***/ "./src/app/authentication/new-password/new-password.component.ts":
/*!***********************************************************************!*\
  !*** ./src/app/authentication/new-password/new-password.component.ts ***!
  \***********************************************************************/
/*! exports provided: NewPasswordComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NewPasswordComponent", function() { return NewPasswordComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _services_auth_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../services/auth.service */ "./src/app/authentication/services/auth.service.ts");
/* harmony import */ var _validators_custom_validaors__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../validators/custom.validaors */ "./src/app/authentication/validators/custom.validaors.ts");
/* harmony import */ var src_app_shared_loader_loader_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! src/app/shared/loader/loader.service */ "./src/app/shared/loader/loader.service.ts");
/* harmony import */ var src_app_shared_notify_notify_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! src/app/shared/notify/notify.service */ "./src/app/shared/notify/notify.service.ts");
/* harmony import */ var src_app_shared_services_platwareService_utility_service__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! src/app/shared/services/platwareService/utility.service */ "./src/app/shared/services/platwareService/utility.service.ts");









var NewPasswordComponent = /** @class */ (function () {
    function NewPasswordComponent(formBuilder, router, authService, loaderService, notifyService, utilityService) {
        this.formBuilder = formBuilder;
        this.router = router;
        this.authService = authService;
        this.loaderService = loaderService;
        this.notifyService = notifyService;
        this.utilityService = utilityService;
    }
    NewPasswordComponent.prototype.ngOnInit = function () {
        this.initForm();
    };
    NewPasswordComponent.prototype.initForm = function () {
        this.newPasswordForm = this.formBuilder.group({
            password: ['', [_angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required, _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].pattern('^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{9,16}$')]],
            confirmPassword: ['', [_angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required]]
        }, { validators: _validators_custom_validaors__WEBPACK_IMPORTED_MODULE_5__["CustomValidators"].passwordMatcher });
    };
    NewPasswordComponent.prototype.submit = function () {
        var _this = this;
        this.loaderService.showLoader();
        debugger;
        this.authService.resetPassword(this.newPasswordForm.value.password).subscribe(function (resp) {
            if (resp) {
                _this.loaderService.hideLoader();
                _this.notifyService.showToast('Password reset successfully', 'success');
                _this.router.navigate(['auth/login']);
            }
        }, function (err) {
            //HERE
            _this.utilityService.getError(err, 'VAHANA_RESETPASSWORD');
            err = err[Object.keys(err)[0]];
            _this.loaderService.hideLoader();
        });
    };
    NewPasswordComponent.prototype.navigateToSignUp = function () {
        this.router.navigate(['auth/signUp']);
    };
    NewPasswordComponent.prototype.navigateToVahana = function () {
        this.router.navigate(['auth/login']);
    };
    NewPasswordComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-new-password',
            template: __webpack_require__(/*! ./new-password.component.html */ "./src/app/authentication/new-password/new-password.component.html"),
            styles: [__webpack_require__(/*! ./new-password.component.scss */ "./src/app/authentication/new-password/new-password.component.scss")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormBuilder"], _angular_router__WEBPACK_IMPORTED_MODULE_3__["Router"],
            _services_auth_service__WEBPACK_IMPORTED_MODULE_4__["AuthService"], src_app_shared_loader_loader_service__WEBPACK_IMPORTED_MODULE_6__["LoaderService"],
            src_app_shared_notify_notify_service__WEBPACK_IMPORTED_MODULE_7__["NotifyService"], src_app_shared_services_platwareService_utility_service__WEBPACK_IMPORTED_MODULE_8__["UtilityService"]])
    ], NewPasswordComponent);
    return NewPasswordComponent;
}());



/***/ }),

/***/ "./src/app/authentication/services/auth.service.ts":
/*!*********************************************************!*\
  !*** ./src/app/authentication/services/auth.service.ts ***!
  \*********************************************************/
/*! exports provided: AuthService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AuthService", function() { return AuthService; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var src_app_shared_services_platwareService_platware_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/shared/services/platwareService/platware.service */ "./src/app/shared/services/platwareService/platware.service.ts");
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../environments/environment */ "./src/environments/environment.ts");
/* harmony import */ var _PlatwareClient__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../../PlatwareClient */ "./PlatwareClient/index.js");
/* harmony import */ var _PlatwareClient__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_PlatwareClient__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");






var AuthService = /** @class */ (function () {
    function AuthService(platwareService, http) {
        this.platwareService = platwareService;
        this.http = http;
        this.forgotUserInput = {};
    }
    /* Method for SignUp Api Call */
    AuthService.prototype.signUp = function (signUpObject) {
        var body = { Create_User: [signUpObject] };
        var header = {
            custom_headers: JSON.stringify({
                'Content-type': 'application/json'
            })
        };
        return this.platwareService.callPlatware(body, header);
    };
    /* End of Method for SignUp Api Call */
    /* Method for SignIn */
    AuthService.prototype.signIn = function (signInObject, callBack) {
        var body = { AUTH_VAHANA: [signInObject] };
        var header = {
            custom_headers: JSON.stringify({
                'Content-type': 'application/json'
            })
        };
        _PlatwareClient__WEBPACK_IMPORTED_MODULE_4__["executeApi"](_environments_environment__WEBPACK_IMPORTED_MODULE_3__, body, header, callBack);
        // return this.platwareService.callPlatware(body, header);
    };
    /* End of Method for SignIn */
    /* Method for Checking the userExist or Not */
    AuthService.prototype.validateFields = function (value, type) {
        var body = { VAHANA_VALIDATE_FIELDS: [{}] };
        var header = {
            custom_headers: JSON.stringify({
                'Content-type': 'application/json',
                type: type,
                value: value
            })
        };
        console.log(body, header);
        return this.platwareService.callPlatware(body, header);
    };
    /* Vahana reset Password */
    AuthService.prototype.resetPassword = function (password) {
        var resetReq = this.forgotUserInput;
        resetReq['password'] = password;
        console.log(resetReq);
        var body = { VAHANA_RESETPASSWORD: [resetReq] };
        var header = {
            custom_headers: JSON.stringify({
                'Content-type': 'application/json'
            })
        };
        return this.platwareService.callPlatware(body, header);
    };
    /* End of Vahana reset Password */
    AuthService.prototype.getCaptureKey = function () {
        return this.http.get('/assets/login/data/additionalData.json');
    };
    AuthService = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])(),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [src_app_shared_services_platwareService_platware_service__WEBPACK_IMPORTED_MODULE_2__["PlatwareService"], _angular_common_http__WEBPACK_IMPORTED_MODULE_5__["HttpClient"]])
    ], AuthService);
    return AuthService;
}());



/***/ }),

/***/ "./src/app/authentication/services/otp.service.ts":
/*!********************************************************!*\
  !*** ./src/app/authentication/services/otp.service.ts ***!
  \********************************************************/
/*! exports provided: OTPService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "OTPService", function() { return OTPService; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var src_app_shared_services_platwareService_platware_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/shared/services/platwareService/platware.service */ "./src/app/shared/services/platwareService/platware.service.ts");
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../environments/environment */ "./src/environments/environment.ts");
/* harmony import */ var src_app_shared_services_platwareService_utility_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/app/shared/services/platwareService/utility.service */ "./src/app/shared/services/platwareService/utility.service.ts");





var OTPService = /** @class */ (function () {
    function OTPService(platwareService, utilityService) {
        this.platwareService = platwareService;
        this.utilityService = utilityService;
    }
    OTPService.prototype.generateOTP = function (mobileNumber) {
        var reqBody = {
            GETOTP: [{
                    serviceType: 'LOGIN',
                    reference: '123',
                    appId: _environments_environment__WEBPACK_IMPORTED_MODULE_3__["environment"].envProps['appId'],
                    orgId: _environments_environment__WEBPACK_IMPORTED_MODULE_3__["environment"].envProps['orgId'],
                    timestamp: this.utilityService.getDateInISOFormat(),
                    mobile: mobileNumber
                }]
        };
        console.log(reqBody);
        var reqHeader = {
            custom_headers: JSON.stringify({
                'Content-type': 'application/json'
            })
        };
        return this.platwareService.callPlatware(reqBody, reqHeader);
    };
    /* API Call to Validate OTP Entered By User */
    OTPService.prototype.verfiyOTP = function (enteredOTP, refId) {
        var reqBody = {
            VERIFYOTP: [{
                    serviceType: 'LOGIN',
                    reference: refId,
                    timestamp: this.utilityService.getDateInISOFormat(),
                    appId: _environments_environment__WEBPACK_IMPORTED_MODULE_3__["environment"].envProps['appId'],
                    orgId: _environments_environment__WEBPACK_IMPORTED_MODULE_3__["environment"].envProps['orgId'],
                    otp: enteredOTP
                }]
        };
        var reqHeader = {
            custom_headers: JSON.stringify({
                'Content-type': 'application/json'
            })
        };
        return this.platwareService.callPlatware(reqBody, reqHeader);
    };
    OTPService = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])(),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [src_app_shared_services_platwareService_platware_service__WEBPACK_IMPORTED_MODULE_2__["PlatwareService"], src_app_shared_services_platwareService_utility_service__WEBPACK_IMPORTED_MODULE_4__["UtilityService"]])
    ], OTPService);
    return OTPService;
}());



/***/ }),

/***/ "./src/app/authentication/sign-up/control.service.ts":
/*!***********************************************************!*\
  !*** ./src/app/authentication/sign-up/control.service.ts ***!
  \***********************************************************/
/*! exports provided: ControlService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ControlService", function() { return ControlService; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm5/operators/index.js");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm5/index.js");






var ControlService = /** @class */ (function () {
    function ControlService(http) {
        this.http = http;
    }
    ControlService.prototype.getFormControl = function (control) {
        return new _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormControl"]('', this.getValidators(control));
    };
    ControlService.prototype.getValidators = function (control) {
        var validatorsArray = [];
        if (this.isMandatory(control)) {
            validatorsArray.push(_angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].required);
        }
        if (this.isRegex(control)) {
            validatorsArray.push(_angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].pattern(control.regex));
        }
        if (this.isMinLength(control)) {
            validatorsArray.push(_angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].minLength(+control.minLength));
        }
        if (this.isMaxLength(control)) {
            validatorsArray.push(_angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].maxLength(+control.maxLength));
        }
        return validatorsArray;
    };
    /* method for Configuring Question Is Mandatory */
    ControlService.prototype.isMandatory = function (question) {
        if (question.isMandatory) {
            return question.isMandatory;
        }
        else {
            return false;
        }
    };
    /* method for Configuring Question Is Mandatory */
    /* method for Configuring Regex in formControl */
    ControlService.prototype.isRegex = function (control) {
        /* This method check that if regex has length > 1 then return true othrwise false */
        return control.regex && control.regex.length > 1;
        /* End of this This method check that if regex has length > 1 then return true othrwise false */
    };
    /* method for Configuring Regex in formControl */
    /* method for configuring min length */
    ControlService.prototype.isMinLength = function (control) {
        return control.minLength !== '' && control.minLength !== null && !isNaN(+control.minLength);
    };
    /* method for configuring min length */
    /* method for Configuring Max Length */
    ControlService.prototype.isMaxLength = function (control) {
        return control.maxLength !== '' && control.maxLength !== null && !isNaN(+control.maxLength);
    };
    /* End of  method for Configuring Max Length */
    ControlService.prototype.getFormAPIData = function () {
        var _this = this;
        this.formDetail = new rxjs__WEBPACK_IMPORTED_MODULE_5__["BehaviorSubject"](null);
        var timeStamp = new Date().getTime();
        this.http.get("/assets/login/control.json?" + timeStamp).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["delay"])(2)).subscribe(function (resp) {
            _this.iForm = resp;
            _this.formDetail.next(_this.iForm);
        });
        return this.formDetail;
    };
    ControlService.prototype.getFormData = function () {
        return this.iForm;
    };
    ControlService = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])(),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpClient"]])
    ], ControlService);
    return ControlService;
}());



/***/ }),

/***/ "./src/app/authentication/sign-up/sign-up.component.html":
/*!***************************************************************!*\
  !*** ./src/app/authentication/sign-up/sign-up.component.html ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"bgimg-1\" *ngIf=\"iForm!== undefined\">\n  <form [formGroup]=\"signUpForm\" (ngSubmit)=\"signUp()\" autocomplete=\"off\">\n    <div class=\"row card-form\">\n      <div class=\"col s1 m4 l4 xl4\"></div>\n      <div class=\"col s10 m4 l4 xl4\">\n        <div class=\"card-panel\">\n          <div *ngIf=\"getFormData() | async\">\n            <div class=\"center\">\n              <img src=\"/assets/login/images/logo.png\" (click)=\"navigateToVahana()\" style=\"cursor: pointer\">\n            </div>\n            <div class=\"divInfo center\">\n              <span class=\"infoText\" [innerHTML]=\"iForm.details\"></span>\n            </div>\n\n\n\n            <div id=\"signUpForm\">\n              <div class=\"input-field1\" *ngFor=\"let control of iForm.controls\">\n                <label class=\"label\">{{control.label}}</label>\n                <input (keyup)=\"keyUp.next({value:$event.target.value, control:control})\" [id]=\"control.id\" [placeholder]=\"control.placeHolder\" [type]=\"control?.type\" [formControlName]=\"control.id\" autocomplete=\"off\">\n\n                <small style=\"color:red;\" *ngIf=\"(signUpForm.controls[control.id].hasError('minlength'))\" class=\"form-text text-muted\">\n                  {{control.label}} should be minimum of {{control.minLength}} character long\n                </small>\n                <small style=\"color:red;\" *ngIf=\"(signUpForm.controls[control.id].hasError('required')) &&  (signUpForm.controls[control.id].dirty)\" class=\"form-text text-muted\">\n                  {{control.label}} is mandatory\n                </small>\n                <small style=\"color:red;\" *ngIf=\"(signUpForm.controls[control.id].hasError('duplicate')) &&  (signUpForm.controls[control.id].dirty)\" class=\"form-text text-muted\">\n                  {{emailErrorMessage}}. Please choose different {{control.label}}\n                </small>\n                <small style=\"color:red;\" *ngIf=\"(signUpForm.hasError('invalidPassword')) && (signUpForm.controls['confirmPassword'].dirty) && control.id === 'confirmPassword' \" class=\"form-text text-muted\">\n                  Password and confirm password mismatch\n                </small>\n                <small style=\"color:red;\" *ngIf=\"(signUpForm.controls[control.id].hasError('pattern')) &&  (signUpForm.controls[control.id].dirty)\" class=\"form-text text-muted\">\n                  <span *ngIf=\"control.id !== 'password'\">Please enter in correct format</span>\n                  <span *ngIf=\"control.id=== 'password'\"> Your password must be at least 8 characters long and must contain special charectors and numbers. Please try another. </span>\n                </small>\n\n              </div>\n            </div>\n\n            <div style=\"margin-top: 12px;\">\n              <!-- <ngx-recaptcha2 #captchaElem [siteKey]=\"captcha\" [useGlobalDomain]=\"false\"\n                [size]=\"size\" [hl]=\"lang\" [theme]=\"theme\" [type]=\"type\" formControlName=\"recaptcha\">\n              </ngx-recaptcha2> -->\n\n            </div>\n\n\n            <div>\n              <button type=\"submit\" [disabled]=\"signUpForm.invalid\" class=\"btn sign-in-btn\">Join\n                VAHANA</button>\n            </div>\n            <p class=\"font12 center\">Already have an account? <a (click)=\"navigateToLogin()\">Sign In</a></p>\n          </div>\n\n\n        </div>\n\n\n      </div>\n      <div class=\"col s1 m4 l4 xl4\"></div>\n    </div>\n  </form>\n</div>\n"

/***/ }),

/***/ "./src/app/authentication/sign-up/sign-up.component.scss":
/*!***************************************************************!*\
  !*** ./src/app/authentication/sign-up/sign-up.component.scss ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".bgimg-1 {\n  height: auto;\n  background-position: center 55%;\n  background-repeat: no-repeat;\n  background-size: cover;\n  background-image: url(\"/assets/login/images/signup-bg.jpg\");\n  -o-object-fit: contain;\n     object-fit: contain; }\n\n.card-panel {\n  transition: box-shadow .25s;\n  padding: 24px;\n  margin: .5rem 0 1rem 0;\n  border-radius: 2px;\n  background-color: #fff; }\n\n.infoText {\n  font-size: 16px;\n  color: grey;\n  font-weight: 500; }\n\n.divInfo {\n  padding-left: 70px;\n  padding-right: 75px; }\n\n.input-field1 label {\n  font-size: 15px;\n  text-align: left;\n  width: 100%;\n  float: left;\n  margin-bottom: 2px;\n  margin-top: 20px;\n  color: #2457a7;\n  font-family: 'Raleway-Regular'; }\n\n.input-field1 input {\n  border: 1px solid #b9b9b9;\n  background: #fff;\n  box-shadow: none;\n  padding: 0 8px;\n  border-radius: 4px;\n  width: calc(100% - 20px);\n  line-height: 25px;\n  height: 38px;\n  font-size: 13px;\n  margin: 0px; }\n\n.sign-in-btn {\n  width: 100%;\n  background: #2457a7;\n  -webkit-margin-before: 17px;\n          margin-block-start: 17px; }\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL2RlY2ltYWwvRGVjaW1hbC92YWhhbmEvdmFoYW5hLXBvcnRhbC1hdXRoZW50aWNhdGlvbi9zcmMvYXBwL2F1dGhlbnRpY2F0aW9uL3NpZ24tdXAvc2lnbi11cC5jb21wb25lbnQuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFDQTtFQUNJLFlBQVk7RUFDWiwrQkFBK0I7RUFDL0IsNEJBQTRCO0VBQzVCLHNCQUFzQjtFQUN0QiwyREFBMkQ7RUFDM0Qsc0JBQW1CO0tBQW5CLG1CQUFtQixFQUFBOztBQUd2QjtFQUNJLDJCQUEyQjtFQUMzQixhQUFhO0VBQ2Isc0JBQXNCO0VBQ3RCLGtCQUFrQjtFQUNsQixzQkFBc0IsRUFBQTs7QUFHMUI7RUFFSSxlQUFlO0VBQ2YsV0FBVztFQUNYLGdCQUFnQixFQUFBOztBQUdwQjtFQUNJLGtCQUFrQjtFQUNsQixtQkFBbUIsRUFBQTs7QUFHdkI7RUFFUSxlQUFlO0VBQ2YsZ0JBQWdCO0VBQ2hCLFdBQVc7RUFDWCxXQUFXO0VBQ1gsa0JBQWtCO0VBQ2xCLGdCQUFnQjtFQUNoQixjQUFjO0VBQ2QsOEJBQThCLEVBQUE7O0FBVHRDO0VBYVEseUJBQXlCO0VBQ3pCLGdCQUFnQjtFQUNoQixnQkFBZ0I7RUFDaEIsY0FBYztFQUNkLGtCQUFrQjtFQUNsQix3QkFBd0I7RUFDeEIsaUJBQWlCO0VBQ2pCLFlBQVk7RUFDWixlQUFlO0VBQ2YsV0FBVyxFQUFBOztBQUluQjtFQUNJLFdBQVc7RUFDWCxtQkFBbUI7RUFDbkIsMkJBQXdCO1VBQXhCLHdCQUF3QixFQUFBIiwiZmlsZSI6InNyYy9hcHAvYXV0aGVudGljYXRpb24vc2lnbi11cC9zaWduLXVwLmNvbXBvbmVudC5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiXG4uYmdpbWctMSB7XG4gICAgaGVpZ2h0OiBhdXRvO1xuICAgIGJhY2tncm91bmQtcG9zaXRpb246IGNlbnRlciA1NSU7XG4gICAgYmFja2dyb3VuZC1yZXBlYXQ6IG5vLXJlcGVhdDtcbiAgICBiYWNrZ3JvdW5kLXNpemU6IGNvdmVyO1xuICAgIGJhY2tncm91bmQtaW1hZ2U6IHVybChcIi9hc3NldHMvbG9naW4vaW1hZ2VzL3NpZ251cC1iZy5qcGdcIik7XG4gICAgb2JqZWN0LWZpdDogY29udGFpbjtcbn1cblxuLmNhcmQtcGFuZWwge1xuICAgIHRyYW5zaXRpb246IGJveC1zaGFkb3cgLjI1cztcbiAgICBwYWRkaW5nOiAyNHB4O1xuICAgIG1hcmdpbjogLjVyZW0gMCAxcmVtIDA7XG4gICAgYm9yZGVyLXJhZGl1czogMnB4O1xuICAgIGJhY2tncm91bmQtY29sb3I6ICNmZmY7XG59XG5cbi5pbmZvVGV4dFxue1xuICAgIGZvbnQtc2l6ZTogMTZweDtcbiAgICBjb2xvcjogZ3JleTtcbiAgICBmb250LXdlaWdodDogNTAwO1xufVxuXG4uZGl2SW5mb3tcbiAgICBwYWRkaW5nLWxlZnQ6IDcwcHg7XG4gICAgcGFkZGluZy1yaWdodDogNzVweDtcbn1cblxuLmlucHV0LWZpZWxkMSB7XG4gICAgbGFiZWwge1xuICAgICAgICBmb250LXNpemU6IDE1cHg7XG4gICAgICAgIHRleHQtYWxpZ246IGxlZnQ7XG4gICAgICAgIHdpZHRoOiAxMDAlO1xuICAgICAgICBmbG9hdDogbGVmdDtcbiAgICAgICAgbWFyZ2luLWJvdHRvbTogMnB4O1xuICAgICAgICBtYXJnaW4tdG9wOiAyMHB4O1xuICAgICAgICBjb2xvcjogIzI0NTdhNztcbiAgICAgICAgZm9udC1mYW1pbHk6ICdSYWxld2F5LVJlZ3VsYXInO1xuICAgIH1cblxuICAgIGlucHV0IHtcbiAgICAgICAgYm9yZGVyOiAxcHggc29saWQgI2I5YjliOTtcbiAgICAgICAgYmFja2dyb3VuZDogI2ZmZjtcbiAgICAgICAgYm94LXNoYWRvdzogbm9uZTtcbiAgICAgICAgcGFkZGluZzogMCA4cHg7XG4gICAgICAgIGJvcmRlci1yYWRpdXM6IDRweDtcbiAgICAgICAgd2lkdGg6IGNhbGMoMTAwJSAtIDIwcHgpO1xuICAgICAgICBsaW5lLWhlaWdodDogMjVweDtcbiAgICAgICAgaGVpZ2h0OiAzOHB4O1xuICAgICAgICBmb250LXNpemU6IDEzcHg7XG4gICAgICAgIG1hcmdpbjogMHB4O1xuICAgIH1cbn1cblxuLnNpZ24taW4tYnRuIHtcbiAgICB3aWR0aDogMTAwJTtcbiAgICBiYWNrZ3JvdW5kOiAjMjQ1N2E3O1xuICAgIG1hcmdpbi1ibG9jay1zdGFydDogMTdweDtcbn1cblxuIl19 */"

/***/ }),

/***/ "./src/app/authentication/sign-up/sign-up.component.ts":
/*!*************************************************************!*\
  !*** ./src/app/authentication/sign-up/sign-up.component.ts ***!
  \*************************************************************/
/*! exports provided: SignUpComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SignUpComponent", function() { return SignUpComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _control_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./control.service */ "./src/app/authentication/sign-up/control.service.ts");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm5/index.js");
/* harmony import */ var ngx_captcha__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ngx-captcha */ "./node_modules/ngx-captcha/fesm5/ngx-captcha.js");
/* harmony import */ var _services_auth_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../services/auth.service */ "./src/app/authentication/services/auth.service.ts");
/* harmony import */ var src_app_shared_loader_loader_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! src/app/shared/loader/loader.service */ "./src/app/shared/loader/loader.service.ts");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm5/operators/index.js");
/* harmony import */ var src_app_shared_notify_notify_service__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! src/app/shared/notify/notify.service */ "./src/app/shared/notify/notify.service.ts");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _validators_custom_validaors__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../validators/custom.validaors */ "./src/app/authentication/validators/custom.validaors.ts");
/* harmony import */ var src_app_shared_services_platwareService_utility_service__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! src/app/shared/services/platwareService/utility.service */ "./src/app/shared/services/platwareService/utility.service.ts");
/* harmony import */ var src_app_shared_services_AppConstant__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! src/app/shared/services/AppConstant */ "./src/app/shared/services/AppConstant.ts");














var SignUpComponent = /** @class */ (function () {
    function SignUpComponent(formBuilder, controlService, reCaptchaV3Service, authService, loaderService, notifyService, router, utilityService) {
        this.formBuilder = formBuilder;
        this.controlService = controlService;
        this.reCaptchaV3Service = reCaptchaV3Service;
        this.authService = authService;
        this.loaderService = loaderService;
        this.notifyService = notifyService;
        this.router = router;
        this.utilityService = utilityService;
        this.iFormCallback = new rxjs__WEBPACK_IMPORTED_MODULE_4__["BehaviorSubject"](null);
        this.validateFields = new rxjs__WEBPACK_IMPORTED_MODULE_4__["Subject"]();
        this.keyUp = new rxjs__WEBPACK_IMPORTED_MODULE_4__["Subject"]();
        this.getFormDataAPI();
        this.subscribeKeyUp();
    }
    SignUpComponent.prototype.addRecapture = function () {
        if (this.iForm.isCaptchaRequired) {
            // this.reCaptchaV3Service.execute('6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI', 'homepage', (token) => {
            //   console.log('This is your token: ', token);
            // }, {
            //     useGlobalDomain: false
            // });
        }
    };
    SignUpComponent.prototype.handleSuccess = function (event) {
        console.log(event);
    };
    SignUpComponent.prototype.click = function (event) {
        console.log(this.signUpForm);
    };
    SignUpComponent.prototype.addContols = function () {
        var contols = this.iForm.controls;
        for (var i = 0; i < contols.length; i++) {
            this.signUpForm.addControl(contols[i].id.toString(), this.controlService.getFormControl(contols[i]));
        }
        // this.signUpForm.addControl(
        //   "TermsCondition",
        //   new FormControl("", [Validators.required, Validators.pattern("true")])
        // );
        if (this.iForm.isCaptchaRequired) {
            //  this.signUpForm.addControl('recaptcha', new FormControl('', [Validators.required]));
        }
        this.signUpForm.setValidators(_validators_custom_validaors__WEBPACK_IMPORTED_MODULE_11__["CustomValidators"].passwordMatcher);
    };
    SignUpComponent.prototype.getFormData = function () {
        return this.iFormCallback.asObservable();
    };
    SignUpComponent.prototype.ngOnInit = function () {
        setTimeout(function () {
            $(document).ready(function () {
                $('.tooltipped').tooltip();
            });
        }, 500);
        this.signUpForm = this.formBuilder.group({});
        this.initValidateFields();
    };
    SignUpComponent.prototype.getFormGroup = function () { };
    /*This method takes sign up form value from html */
    SignUpComponent.prototype.signUp = function () {
        var _this = this;
        console.log(this.signUpForm.value);
        this.loaderService.showLoader();
        this.authService.signUp(this.signUpForm.value).subscribe(function (resp) {
            console.log(resp);
            if (resp) {
                _this.loaderService.hideLoader();
                _this.notifyService.showToast('successfully registered', 'success');
                var email = _this.signUpForm.value.email;
                _this.utilityService.setLocalStorage(src_app_shared_services_AppConstant__WEBPACK_IMPORTED_MODULE_13__["AppConstant"].SIGNUP_EMAIL, email);
                _this.router.navigate(['auth/login']);
            }
        }, function (err) {
            //HERE
            _this.utilityService.getError(err, 'Create_User');
            _this.loaderService.hideLoader();
            console.log(err);
            err = err[Object.keys(err)[0]];
        });
    };
    /*End of This method takes sign up form value from html */
    SignUpComponent.prototype.initValidateFields = function () {
        var _this = this;
        this.validateFields
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_8__["debounceTime"])(500), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_8__["distinctUntilChanged"])())
            .subscribe(function (searchText) {
            _this.validateSearch(searchText);
        });
    };
    /* This method performs the API Call for search  */
    SignUpComponent.prototype.validateSearch = function (value) {
        var _this = this;
        this.authService
            .validateFields(value, this.activeControl.controlType)
            .subscribe(function (resp) {
            console.log(resp);
        }, function (err) {
            //HERE
            console.log(err);
            _this.utilityService.getError(err, 'VAHANA_VALIDATE_FIELDS');
            err = err[Object.keys(err)[0]];
            _this.emailErrorMessage = err.message;
            _this.signUpForm.controls[_this.activeControl.id].setErrors({
                duplicate: true
            });
        });
        return Object(rxjs__WEBPACK_IMPORTED_MODULE_4__["of"])('');
    };
    /* This method set the value passed from html for fileds for valodation */
    SignUpComponent.prototype.checiIfExist = function (textValue, control) {
        var _this = this;
        this.signUpForm.controls[control.id].valueChanges
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_8__["debounceTime"])(400), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_8__["distinctUntilChanged"])())
            .subscribe(function (value) {
            if (control.isAPIToCheck) {
                _this.activeControl = control;
                _this.validateFields.next(value);
            }
        });
    };
    SignUpComponent.prototype.navigateToLogin = function () {
        this.router.navigate(['auth/login']);
    };
    SignUpComponent.prototype.navigateToVahana = function () {
        this.router.navigate(['auth/login']);
    };
    /* Get form json Data */
    SignUpComponent.prototype.getFormDataAPI = function () {
        var _this = this;
        this.loaderService.showLoader();
        this.controlService.getFormAPIData().subscribe(function (value) {
            if (value) {
                _this.iFormCallback.next(value.signUpForm);
                _this.iForm = value.signUpForm;
                _this.addContols();
                _this.addRecapture();
                _this.loaderService.hideLoader();
            }
        }, function (err) {
            _this.loaderService.hideLoader();
        });
    };
    SignUpComponent.prototype.subscribeKeyUp = function () {
        var _this = this;
        this.keyUp.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_8__["debounceTime"])(300), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_8__["distinctUntilChanged"])(), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_8__["flatMap"])(function (data) { return Object(rxjs__WEBPACK_IMPORTED_MODULE_4__["of"])(data).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_8__["delay"])(0)); })).subscribe(function (data) {
            if (data.control.isAPIToCheck && _this.signUpForm.controls[data.control.id].valid) {
                _this.activeControl = data.control;
                _this.validateSearch(data.value);
            }
        });
    };
    SignUpComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-sign-up',
            template: __webpack_require__(/*! ./sign-up.component.html */ "./src/app/authentication/sign-up/sign-up.component.html"),
            styles: [__webpack_require__(/*! ./sign-up.component.scss */ "./src/app/authentication/sign-up/sign-up.component.scss")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormBuilder"],
            _control_service__WEBPACK_IMPORTED_MODULE_3__["ControlService"],
            ngx_captcha__WEBPACK_IMPORTED_MODULE_5__["ReCaptchaV3Service"],
            _services_auth_service__WEBPACK_IMPORTED_MODULE_6__["AuthService"],
            src_app_shared_loader_loader_service__WEBPACK_IMPORTED_MODULE_7__["LoaderService"],
            src_app_shared_notify_notify_service__WEBPACK_IMPORTED_MODULE_9__["NotifyService"],
            _angular_router__WEBPACK_IMPORTED_MODULE_10__["Router"],
            src_app_shared_services_platwareService_utility_service__WEBPACK_IMPORTED_MODULE_12__["UtilityService"]])
    ], SignUpComponent);
    return SignUpComponent;
}());



/***/ }),

/***/ "./src/app/authentication/validators/custom.validaors.ts":
/*!***************************************************************!*\
  !*** ./src/app/authentication/validators/custom.validaors.ts ***!
  \***************************************************************/
/*! exports provided: CustomValidators */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CustomValidators", function() { return CustomValidators; });
var CustomValidators = /** @class */ (function () {
    function CustomValidators() {
    }
    /* Password Matcher */
    CustomValidators.passwordMatcher = function (group) {
        var password = group.controls.password;
        var confirm = group.controls.confirmPassword;
        if (password.pristine || confirm.pristine) {
            return null;
        }
        group.markAsTouched();
        if (password.value === confirm.value) {
            return null;
        }
        return {
            invalidPassword: true
        };
    };
    return CustomValidators;
}());



/***/ }),

/***/ "./src/app/authentication/verify-otp/verify-otp.component.html":
/*!*********************************************************************!*\
  !*** ./src/app/authentication/verify-otp/verify-otp.component.html ***!
  \*********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"center\" *ngIf=\"isOTPLoader\" style=\"padding-top: 5px;\">\n<div class=\"preloader-wrapper small active\">\n    <div class=\"spinner-layer spinner-green-only\">\n      <div class=\"circle-clipper left\">\n        <div class=\"circle\"></div>\n      </div><div class=\"gap-patch\">\n        <div class=\"circle\"></div>\n      </div><div class=\"circle-clipper right\">\n        <div class=\"circle\"></div>\n      </div>\n    </div>\n  </div>\n</div>\n<form [formGroup]=\"groupName\" *ngIf=\"!isOTPLoader && (otpArrayClassName.length>0)\">\n  <label>Confirm OTP</label>\n  <table border=\"0\">\n    <tr>\n      <td *ngFor=\"let formName of otpArrayClassName;let i = index;\" >\n        <input  type=\"number\" class=\"{{formName}}\" [formControlName]=\"formName\" onKeyDown=\"if(this.value.length==1 && event.keyCode!=8) return false;\" (keyup)=\"next($event,formName,i)\">\n      </td>\n    </tr>\n  </table>\n  <div style=\"margin-top: -3%\"><p style=\"font-size: 12px; text-align: right\"> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Haven't recieved OTP yet? <strong style=\"color: #ef5350; cursor: pointer;\" (click)=\"generateOTP(true)\">Request again!</strong> </p></div>\n</form>"

/***/ }),

/***/ "./src/app/authentication/verify-otp/verify-otp.component.scss":
/*!*********************************************************************!*\
  !*** ./src/app/authentication/verify-otp/verify-otp.component.scss ***!
  \*********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "table {\n  border-collapse: unset; }\n\ninput[type=number] {\n  height: 40px;\n  width: 40px;\n  border: 1px solid navy;\n  text-align: center; }\n\n.spinner-layer {\n  position: absolute;\n  width: 90%;\n  height: 90%;\n  opacity: 0;\n  border-color: #303f9f; }\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL2RlY2ltYWwvRGVjaW1hbC92YWhhbmEvdmFoYW5hLXBvcnRhbC1hdXRoZW50aWNhdGlvbi9zcmMvYXBwL2F1dGhlbnRpY2F0aW9uL3ZlcmlmeS1vdHAvdmVyaWZ5LW90cC5jb21wb25lbnQuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNJLHNCQUFzQixFQUFBOztBQUcxQjtFQUNJLFlBQVk7RUFDWixXQUFXO0VBQ1gsc0JBQXNCO0VBQUMsa0JBQWtCLEVBQUE7O0FBRzdDO0VBQ0ksa0JBQWtCO0VBQ2xCLFVBQVU7RUFDVixXQUFXO0VBQ1gsVUFBVTtFQUNWLHFCQUFxQixFQUFBIiwiZmlsZSI6InNyYy9hcHAvYXV0aGVudGljYXRpb24vdmVyaWZ5LW90cC92ZXJpZnktb3RwLmNvbXBvbmVudC5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsidGFibGV7XG4gICAgYm9yZGVyLWNvbGxhcHNlOiB1bnNldDtcbn1cblxuaW5wdXRbdHlwZT1udW1iZXJde1xuICAgIGhlaWdodDogNDBweDtcbiAgICB3aWR0aDogNDBweDtcbiAgICBib3JkZXI6IDFweCBzb2xpZCBuYXZ5O3RleHQtYWxpZ246IGNlbnRlcjtcbn1cblxuLnNwaW5uZXItbGF5ZXIge1xuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgICB3aWR0aDogOTAlO1xuICAgIGhlaWdodDogOTAlO1xuICAgIG9wYWNpdHk6IDA7XG4gICAgYm9yZGVyLWNvbG9yOiAjMzAzZjlmO1xufSJdfQ== */"

/***/ }),

/***/ "./src/app/authentication/verify-otp/verify-otp.component.ts":
/*!*******************************************************************!*\
  !*** ./src/app/authentication/verify-otp/verify-otp.component.ts ***!
  \*******************************************************************/
/*! exports provided: VerifyOTPComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "VerifyOTPComponent", function() { return VerifyOTPComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _services_otp_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../services/otp.service */ "./src/app/authentication/services/otp.service.ts");
/* harmony import */ var src_app_shared_notify_notify_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/app/shared/notify/notify.service */ "./src/app/shared/notify/notify.service.ts");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm5/index.js");
/* harmony import */ var src_app_shared_services_platwareService_utility_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! src/app/shared/services/platwareService/utility.service */ "./src/app/shared/services/platwareService/utility.service.ts");








var VerifyOTPComponent = /** @class */ (function () {
    function VerifyOTPComponent(element, otpService, notifyService, router, utilityService) {
        this.element = element;
        this.otpService = otpService;
        this.notifyService = notifyService;
        this.router = router;
        this.utilityService = utilityService;
        this.otpArrayClassName = [];
        this.otpLength = 6;
        this.optFilled = new _angular_core__WEBPACK_IMPORTED_MODULE_1__["EventEmitter"]();
    }
    VerifyOTPComponent.prototype.ngOnInit = function () {
        this.generateOTP();
        this.initIsSetNewPassword();
        this.groupName.setErrors(null);
    };
    /* Initialize OTP Form */
    VerifyOTPComponent.prototype.initOTPForm = function () {
        for (var i = 0; i < this.otpLength; i++) {
            this.groupName.addControl('digit' + i, new _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormControl"]('', _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required));
            this.otpArrayClassName.push('digit' + i);
        }
    };
    /* End of Initialization form */
    /* set Focus Back */
    VerifyOTPComponent.prototype.setFocusBack = function (className, index) {
        if ((+index) === (0)) {
            return;
        }
        var nextIndex = +(index) - 1;
        className = className.substring(0, className.length - 1) + nextIndex;
        var divToScroll = this.element.nativeElement.querySelector('.' + className);
        setTimeout(function () {
            divToScroll.focus();
        }, 0);
    };
    VerifyOTPComponent.prototype.setFocus = function (className, index) {
        if (this.combineOTP().length === this.otpLength) {
            this.optFilled.emit(true);
        }
        else {
            this.optFilled.emit(false);
        }
        if ((+index) === this.otpArrayClassName.length - 1) {
            return;
        }
        var nextIndex = +(index) + 1;
        className = className.substring(0, className.length - 1) + nextIndex;
        var divToScroll = this.element.nativeElement.querySelector('.' + className);
        setTimeout(function () {
            divToScroll.focus();
        }, 0);
    };
    /* End of set focous of Input forward */
    VerifyOTPComponent.prototype.combineOTP = function () {
        var _this = this;
        var otp = '';
        var enteredOTPFormObj = Object.assign(this.groupName.value);
        delete enteredOTPFormObj.userInput;
        Object.keys(this.groupName.value).forEach(function (value) {
            otp += _this.groupName.value[value];
        });
        return otp;
    };
    VerifyOTPComponent.prototype.next = function (event, className, index) {
        if (event.code === 'Backspace' || event.keyCode === 8) {
            event.preventDefault();
            this.setFocusBack(className, index);
            return;
        }
        else {
            this.setFocus(className, index);
        }
    };
    VerifyOTPComponent.prototype.generateOTP = function (isRequestAgain) {
        var _this = this;
        if (isRequestAgain === void 0) { isRequestAgain = false; }
        // userInput = mobileNumber
        this.isOTPLoader = true;
        this.otpService.generateOTP(this.groupName.value.userInput).subscribe(function (response) {
            if (response) {
                response = response[Object.keys(response)[0]];
                if (!isRequestAgain) {
                    _this.initOTPForm();
                }
                else {
                    _this.resetOTPFormControl();
                }
                _this.referenceId = response.referance;
                _this.isOTPLoader = false;
            }
        }, function (error) {
            // HERE
            console.log(error);
            error = error[Object.keys(error)[0]];
            _this.isOTPLoader = false;
            _this.utilityService.getError(error, 'GETOTP');
            _this.isSetNewPassword.next(false);
        });
    };
    /* This method validates the OTP */
    VerifyOTPComponent.prototype.validateOTP = function () {
        var _this = this;
        if (this.combineOTP().length === this.otpLength) {
            this.otpService.verfiyOTP(this.combineOTP(), this.referenceId).subscribe(function (response) {
                if (response) {
                    response = response[Object.keys(response)[0]];
                    _this.notifyService.showToast(response.message, 'success');
                    _this.navigateToNewPassword();
                }
            }, function (error) {
                // HERE
                console.log(error);
                error = error[Object.keys(error)[0]];
                // this.isSetNewPassword.next(false);
                _this.utilityService.getError(error, 'VERIFYOTP');
            });
        }
        else {
            this.notifyService.showToast('Please enter OTP', 'error');
        }
    };
    /* End of This method validates the OTP */
    VerifyOTPComponent.prototype.navigateToNewPassword = function () {
        this.router.navigate(['auth/newPassword']);
    };
    VerifyOTPComponent.prototype.initIsSetNewPassword = function () {
        var _this = this;
        this.isSetNewPassword.subscribe(function (flag) {
            if (flag) {
                _this.validateOTP();
            }
            else {
                return;
            }
        });
    };
    VerifyOTPComponent.prototype.ngOnDestroy = function () {
        this.removeOTPFormControl();
    };
    VerifyOTPComponent.prototype.removeOTPFormControl = function () {
        for (var i = 0; i < this.otpLength; i++) {
            this.groupName.removeControl('digit' + i);
        }
        this.otpArrayClassName = [];
    };
    VerifyOTPComponent.prototype.resetOTPFormControl = function () {
        for (var i = 0; i < this.otpLength; i++) {
            this.groupName.controls['digit' + i].reset();
        }
    };
    VerifyOTPComponent.prototype.navigateToVahana = function () {
        this.router.navigate(['auth/login']);
    };
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])(),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormGroup"])
    ], VerifyOTPComponent.prototype, "groupName", void 0);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])(),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", rxjs__WEBPACK_IMPORTED_MODULE_6__["BehaviorSubject"])
    ], VerifyOTPComponent.prototype, "isSetNewPassword", void 0);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Output"])(),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", _angular_core__WEBPACK_IMPORTED_MODULE_1__["EventEmitter"])
    ], VerifyOTPComponent.prototype, "optFilled", void 0);
    VerifyOTPComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-verify-otp',
            template: __webpack_require__(/*! ./verify-otp.component.html */ "./src/app/authentication/verify-otp/verify-otp.component.html"),
            styles: [__webpack_require__(/*! ./verify-otp.component.scss */ "./src/app/authentication/verify-otp/verify-otp.component.scss")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_angular_core__WEBPACK_IMPORTED_MODULE_1__["ElementRef"], _services_otp_service__WEBPACK_IMPORTED_MODULE_3__["OTPService"],
            src_app_shared_notify_notify_service__WEBPACK_IMPORTED_MODULE_4__["NotifyService"], _angular_router__WEBPACK_IMPORTED_MODULE_5__["Router"],
            src_app_shared_services_platwareService_utility_service__WEBPACK_IMPORTED_MODULE_7__["UtilityService"]])
    ], VerifyOTPComponent);
    return VerifyOTPComponent;
}());



/***/ })

}]);
//# sourceMappingURL=authentication-authentication-module.js.map