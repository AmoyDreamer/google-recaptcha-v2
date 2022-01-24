/**
 * @author Allen Liu
 * @desc A simple library of captcha based on Google reCAPTCHA v2.
 * @document https://developers.google.com/recaptcha/docs/invisible
 */
(function() {
    var GoogleReCaptcha = function(obj) {
        if (obj instanceof GoogleReCaptcha) return obj;
        if (!(this instanceof GoogleReCaptcha)) return new GoogleReCaptcha(obj);
        this.GoogleReCaptchaWrapped = obj;
    }
    if (typeof exports !== 'undefined') {
        if (typeof module !== 'undefined' && module.exports) {
            exports = module.exports = GoogleReCaptcha;
        }
        exports.GoogleReCaptcha = GoogleReCaptcha;
    } else {
        this.GoogleReCaptcha = GoogleReCaptcha;
    }
    /**
     * @method Output message on console
     * @param {String} msg => The message is output on console.(required)
     * @param {String} level => message level.(optional)
     */
    function outputMsg(msg, level) {
        var level = level || 'log';
        if (console.hasOwnProperty(level)) {
            console[level]('Module "google-recaptcha-v2" ' + level + ' message => ' + msg);
        } else {
            console.log('Module "google-recaptcha-v2" debug message => ' + msg);
        }
    }
    // jssdk load success message
    var jssdkSuccessMsg = 'the JSSDK of Google reCAPTCHA load successfully!';
    // Google reCAPTCHA v2 default type
    GoogleReCaptcha.size = 'invisible';
    /**
     * @method Initialize JSSDK of Google reCAPTCHA v2
     * @param {Object} options => The configure options of Google reCAPTCHA.(required)
     */
    GoogleReCaptcha.init = function(options) {
        if (typeof options !== 'object' || options === null) {
            outputMsg('method "init" must pass a object variable, please check again!', 'error');
            return;
        }
        // api hostname, default use "www.google.com". Specially, some areas require network proxying, such as China, just set host: "www.recaptcha.net".(optional)
        GoogleReCaptcha.host = typeof options.host === 'string' ? options.host : 'www.google.com';
        GoogleReCaptcha.id = typeof options.id === 'string' ? options.id : '';
        GoogleReCaptcha.siteKey = typeof options.siteKey === 'string' ? options.siteKey : '';
        GoogleReCaptcha.callback = typeof options.callback === 'function' ? options.callback : null;
        GoogleReCaptcha.expiredCallback = typeof options.expiredCallback === 'function' ? options.expiredCallback : null;
        GoogleReCaptcha.errorCallback = typeof options.errorCallback === 'function' ? options.errorCallback : null;
        GoogleReCaptcha.debug = typeof options.debug === 'boolean' ? options.debug : false;
        // check required key
        if (!GoogleReCaptcha.siteKey) {
            outputMsg('method "init" must pass the value of "siteKey" on options params, please check again!', 'error');
            return;
        }
        if (!GoogleReCaptcha.callback) {
            outputMsg('method "init" must pass the value of "callback" on options params, please check again!', 'error');
            return;
        }
        // whether the JSSDK is loaded successfully or not
        GoogleReCaptcha.loaded = false
        // explicit rendering after an onload callback
        if (GoogleReCaptcha.id) {
            GoogleReCaptcha.explicitRender();
        // default render
        } else {
            GoogleReCaptcha.defaultRender();
        }
    }/**
     * @method Default render method
     */
    GoogleReCaptcha.defaultRender = function() {
        var recaptchaDOM = document.querySelector('.g-recaptcha');
        recaptchaDOM.setAttribute('data-size', GoogleReCaptcha.size);
        recaptchaDOM.setAttribute('data-sitekey', GoogleReCaptcha.siteKey);
        if (GoogleReCaptcha.callback) {
            window.GoogleReCaptchaCallback = GoogleReCaptcha.callback;
            recaptchaDOM.setAttribute('data-callback', 'GoogleReCaptchaCallback');
        }
        if (GoogleReCaptcha.expiredCallback) {
            window.GoogleReCaptchaExpiredCallback = GoogleReCaptcha.expiredCallback;
            recaptchaDOM.setAttribute('data-expired-callback', 'GoogleReCaptchaExpiredCallback');
        }
        if (GoogleReCaptcha.errorCallback) {
            window.GoogleReCaptchaErrorCallback = GoogleReCaptcha.errorCallback;
            recaptchaDOM.setAttribute('data-error-callback', 'GoogleReCaptchaErrorCallback');
        }
        GoogleReCaptcha.loadJSSDK();
    }
    /**
     * @method Explicit rendering after an onload callback
     */
    GoogleReCaptcha.explicitRender = function() {
        GoogleReCaptcha.setGlobalOnloadCallback();
        GoogleReCaptcha.loadJSSDK();
    }
    /**
     * @method Set the global onload callback function of Google reCAPTCHE
     */
    GoogleReCaptcha.setGlobalOnloadCallback = function() {
        if (typeof window.GoogleReCaptchaOnloadCallback === 'function') return;
        window.GoogleReCaptchaOnloadCallback = function() {
            GoogleReCaptcha.debug && outputMsg(jssdkSuccessMsg);
            GoogleReCaptcha.loaded = true;
            grecaptcha.render(GoogleReCaptcha.id, {
                'sitekey': GoogleReCaptcha.siteKey,
                'size': GoogleReCaptcha.size,
                'callback': function(token) {
                    GoogleReCaptcha.callback && GoogleReCaptcha.callback(token);
                },
                'expired-callback': function() {
                    GoogleReCaptcha.expiredCallback && GoogleReCaptcha.expiredCallback();
                },
                'error-callback': function() {
                    GoogleReCaptcha.errorCallback && GoogleReCaptcha.errorCallback({
                        code: 10001,
                        message: 'Google reCAPTCHA encounters an error(usually network connectivity), please try again!'
                    });
                }
            })
        }
    }
    /**
     * @method Load the JSSDK of Google reCAPTCHA
     */
    GoogleReCaptcha.loadJSSDK = function() {
        var script = document.createElement('script');
        var jssdkUrl = 'https://' + GoogleReCaptcha.host + '/recaptcha/api.js';
        if (GoogleReCaptcha.id) {
            jssdkUrl += '?onload=GoogleReCaptchaOnloadCallback&render=explicit';
        } else {
            script.onload = function() {
                GoogleReCaptcha.debug && outputMsg(jssdkSuccessMsg);
                GoogleReCaptcha.loaded = true;
            }
        }
        script.type = 'text/javascript';
        script.src = jssdkUrl;
        script.async = 'async';
        script.defer = 'defer';
        document.body.appendChild(script);
    }
    /**
     * @method Man-machine verification enabled
     * @param {Object} event => DOM event.(required)
     */
    GoogleReCaptcha.validate = function(event) {
        event.preventDefault();
        if (!GoogleReCaptcha.loaded) {
            // outputMsg('the JSSDK of Google reCAPTCHA load unsuccessfully, please check again!', 'warn');
            GoogleReCaptcha.errorCallback && GoogleReCaptcha.errorCallback({
                code: -1,
                message: 'The JSSDK of Google reCAPTCHA load unsuccessfully, please check again!'
            });
            return;
        }
        grecaptcha.reset();
        grecaptcha.execute();
    }
}.call(this));
