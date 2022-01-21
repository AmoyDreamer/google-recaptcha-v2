# google-recaptcha-v2
A simple library of captcha based on [Google reCAPTCHA v2](https://developers.google.com/recaptcha/docs/invisible).

## Install
### Using unpkg CDN
```html
<script src="https://unpkg.com/google-recaptcha-v2/index.js"></script>
```

### Using npm
```bash
npm install google-recaptcha-v2 --save-dev
```

## Usage

### Step1
The easiest method for using the invisible reCAPTCHA widget on your page. The necessary attributes are a class name 'g-recaptcha', your site key in the data-sitekey attribute, and the name of a JavaScript callback to handle completion of the captcha in the data-callback attribute.
```html
<div id="recaptcha" class="g-recaptcha" style="display:none"></div>
```
you can get data-sitekey from [Google reCAPTCHA Admin Console](https://www.google.com/recaptcha/admin/)

### Step2
#### Example-CDN
```html
<script>
    // Initialize JSSDK of Google reCAPTCHA v2
    GoogleReCaptcha.init({
        siteKey: '_your_site_key_',// alias of data-sitekey
		callback: getCaptchaToken,// alias of data-callback
    })
</script>
```

#### Example-CommonJS
```js
var GoogleReCaptcha = require('google-recaptcha-v2');
GoogleReCaptcha.init({
    siteKey: '_your_site_key_',// alias of data-sitekey
    callback: getCaptchaToken,// alias of data-callback
})
```

### Define the callback function of man-machine verification
This is data-callback attribute.
```js
function getCaptchaToken(token) {
    // get token from Google reCAPTCHA Server
    if (token) {
        // Next step code: AJAX request the relevant verification interface of the server, check with the API of the Google man-machine verification server, and confirm whether the verification is passed or not.
    }
}
```
### Man-machine verification enabled
you can validate by click button. Like this, just register click function.
```js
var element = document.getElementById('validate');
element.onclick = GoogleReCaptcha.validate;
```

## Method

### Initialize JSSDK
GoogleReCaptcha.init(options)
 - options => {Object} Required. The options of Google reCAPTCHA v2.

#### options
- siteKey => {String} Required. Alias of data-sitekey.
- callback => {String} Required. Alias of data-callback. The name of your callback function, executed when the user submits a successful response. The **g-recaptcha-response** token is passed to your callback.
- id => {String} Optional. The HTML element to render the reCAPTCHA widget.  Specify either the ID of the container.
- host => {String} Optional. That means api hostname, default use **www.google.com**. Specially, some areas require network proxying, such as China, just set host: **www.recaptcha.net**.
- expiredCallback => {String} Optional. The name of your callback function, executed when the reCAPTCHA response expires and the user needs to re-verify.
- errorCallback => {String} Optional. The name of your callback function, executed when reCAPTCHA encounters an error (usually network connectivity) and cannot continue until connectivity is restored. If you specify a function here, you are responsible for informing the user that they should retry. You can write a demo like this.
```js
function errorCallback(res) {
    var code = res.code;// error code
    var message = res.message;// error message
    // console.log(message)
    switch (code) {
        // The JSSDK of Google reCAPTCHA load unsuccessfully
        case -1:
            // you can reload the JSSDK of Google reCAPTCHA or check again
            break;
            // Google reCAPTCHA encounters an error(usually network connectivity)
        case 10001:
            break;
        default:
            // set default operation
    }
}
```
- debug => {Boolean} Optional. The debug mode, default false. If you set **true**, you can get some debug message about **Google reCAPTCHA** on console.

### Start man-machine verification
GoogleReCaptcha.validate(event)
- event => Required. DOM event.

## License
google-recaptcha-v2 is [MIT licensed](https://github.com/AmoyDreamer/google-recaptcha-v2/blob/master/LICENSE).
