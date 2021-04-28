# google-recaptcha-v2
A simple library of captcha based on [Google reCAPTCHA v2](https://developers.google.com/recaptcha/docs/invisible).

## Install
### Using unpkg CDN
```
<script src="https://unpkg.com/google-recaptcha-v2@1.0.0/index.js"></script>
```

### Using npm
```bash
npm install google-recaptcha-v2 --save-dev
```

## Usage
The easiest method for using the invisible reCAPTCHA widget on your page. The necessary attributes are a class name 'g-recaptcha', your site key in the data-sitekey attribute, and the name of a JavaScript callback to handle completion of the captcha in the data-callback attribute.

```
<form>
    <div id="recaptcha" class="g-recaptcha" style="display:none"
      data-sitekey="your_site_key"
      data-callback="getCaptchaToken"
      data-size="invisible"></div>
</form>
```
you can get data-sitekey from [Google reCAPTCHA Admin Console](https://www.google.com/recaptcha/admin/)

### Initialize JSSDK
#### Example-CDN
```
<script>
    //Initialize JSSDK of Google reCAPTCHA v2
    GoogleReCaptcha.init()
</script>
```

#### Example-CommonJS
```
var GoogleReCaptcha = require('google-recaptcha-v2');
GoogleReCaptcha.init();
```

### Define the callback function of man-machine verification
This is data-callback attribute.
```
window.getCaptchaToken = function(token) {
    //get token from Google reCAPTCHA Server
    if (token) {
        ...
        //Next step code: AJAX request the relevant verification interface of the server, check with the API of the Google man-machine verification server, and confirm whether the verification is passed or not.
        ...
    }
}
```
### Man-machine verification enabled
you can validate by click button. Like this, just register click function.
```
var element = document.getElementById('validate');
element.onclick = GoogleReCaptcha.validate;
```

## Method

GoogleReCaptcha.init(host)//Initialize JSSDK
- host => api hostname, default use www.google.com. Specially, some areas require network proxying, such as China, just set host: www.recaptcha.net.(optional)

GoogleReCaptcha.validate(event)//Man-machine verification enabled
- event => DOM event.(required)

## License
google-recaptcha-v2 is [MIT licensed](https://github.com/AmoyDreamer/google-recaptcha-v2/blob/master/LICENSE).
