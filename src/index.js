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
     * @param {String} host => api hostname, default use "www.google.com". Specially, some areas require network proxying, such as China, just set host: "www.recaptcha.net".(optional)
     */
    GoogleReCaptcha.init = function(host) {
        var domain = host || 'www.google.com';
        var script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = 'https://' + domain + '/recaptcha/api.js';
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
        grecaptcha.reset();
        grecaptcha.execute();
    }
}.call(this));
