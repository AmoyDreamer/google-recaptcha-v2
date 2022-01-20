/**
 * @author Allen Liu
 * @desc A simple library of captcha based on Google reCAPTCHA v2.
 * @document https://developers.google.com/recaptcha/docs/invisible
 */
(function() {
    var GoogleReCaptcha = function(obj) {
        if (obj instanceof GoogleReCaptcha) return obj
        if (!(this instanceof GoogleReCaptcha)) return new GoogleReCaptcha(obj)
        this.GoogleReCaptchaWrapped = obj
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
     * @method Initialize JSSDK of Google reCAPTCHA v2
     * @param {Object} options => The configure options of Google reCAPTCHA.(required)
     */
    GoogleReCaptcha.init = function(options) {
        if (typeof options !== 'object' || options === null) {
            console.error('Module "google-recaptcha-v2" error message => method "init" must pass a object variable, please check again!')
            return;
        }
        // api hostname, default use "www.google.com". Specially, some areas require network proxying, such as China, just set host: "www.recaptcha.net".(optional)
        GoogleReCaptcha.host = typeof options.host === 'string' ? options.host : 'www.google.com';
        GoogleReCaptcha.id = typeof options.id === 'string' ? options.id : '';
        GoogleReCaptcha.siteKey = typeof options.siteKey === 'string' ? options.siteKey : '';
        GoogleReCaptcha.callback = typeof options.callback === 'function' ? options.callback : null;
        GoogleReCaptcha.expiredCallback = typeof options.expiredCallback === 'function' ? options.expiredCallback : null;
        GoogleReCaptcha.errorCallback = typeof options.errorCallback === 'function' ? options.errorCallback : null;
        if (GoogleReCaptcha.id && GoogleReCaptcha.siteKey) {
            // Whether the JSSDK is loaded successfully or not
            GoogleReCaptcha.loaded = false
            GoogleReCaptcha.setGlobalOnloadCallback();
            GoogleReCaptcha.loadJSSDK();
        }
    }
    /**
     * @method Set the global onload callback function of Google reCAPTCHE
     */
    GoogleReCaptcha.setGlobalOnloadCallback = function() {
        if (typeof window.GoogleReCaptchaOnloadCallback === 'function') return;
        window.GoogleReCaptchaOnloadCallback = function() {
            // console.log('Module "google-recaptcha-v2" debug message => the JSSDK of Google reCAPTCHA load successfully!');
            GoogleReCaptcha.loaded = true;
            grecaptcha.render(GoogleReCaptcha.id, {
                'sitekey': GoogleReCaptcha.siteKey,
                'size': 'invisible',
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
        script.type = 'text/javascript';
        script.src = 'https://' + GoogleReCaptcha.host + '/recaptcha/api.js?onload=GoogleReCaptchaOnloadCallback&render=explicit';
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
            // console.warn('Module "google-recaptcha-v2" warning message => the JSSDK of Google reCAPTCHA load unsuccessfully, please check again!');
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
