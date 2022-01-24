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

### Import required html tag
The easiest method for using the invisible reCAPTCHA widget on your page. The necessary attributes are a class name 'g-recaptcha', your site key in the data-sitekey attribute, and the name of a JavaScript callback to handle completion of the captcha in the data-callback attribute.
```html
<div id="recaptcha" class="g-recaptcha" style="display:none"></div>
```
you can get data-sitekey from [Google reCAPTCHA Admin Console](https://www.google.com/recaptcha/admin/)

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
### Initialize JSSDK
#### Example-CDN
```html
<script>
    // Initialize JSSDK of Google reCAPTCHA v2
    GoogleReCaptcha.init({
        siteKey: '_your_site_key_',
        callback: getCaptchaToken
    })
</script>
```

#### Example-CommonJS
```js
var GoogleReCaptcha = require('google-recaptcha-v2');
GoogleReCaptcha.init({
    siteKey: '_your_site_key_',
    callback: getCaptchaToken
})
```

### Man-machine verification enabled
you can validate by click button. Like this, just register click function.
```js
var element = document.getElementById('validate');
element.onclick = GoogleReCaptcha.validate;
```

## Method

### Initialize Google reCAPTCHA
GoogleReCaptcha.init(options)
 - options => {Object} Required. The options of Google reCAPTCHA v2.

#### options
- siteKey => {String} Required. Alias of data-sitekey.
- callback => {Function} Required. Alias of data-callback. The name of your callback function, executed when the user submits a successful response. The **g-recaptcha-response** token is passed to your callback.
- id => {String} Optional. The HTML element to render the reCAPTCHA widget. Specify the ID of the container. If you pass a valid value, **[Explicit Render](https://developers.google.com/recaptcha/docs/invisible#examples)** will be used first, otherwise **[Auto Render](https://developers.google.com/recaptcha/docs/invisible#auto_render)** will be used.
- host => {String} Optional. That means api hostname, default use **www.google.com**. Specially, some areas require network proxying, such as China, just set host: **www.recaptcha.net**.
- expiredCallback => {Function} Optional. The name of your callback function, executed when the reCAPTCHA response expires and the user needs to re-verify.
- errorCallback => {Function} Optional. The name of your callback function, executed when reCAPTCHA encounters an error (usually network connectivity) and cannot continue until connectivity is restored. If you specify a function here, you are responsible for informing the user that they should retry. You can write a demo like this.
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
