![https://yk-website-images.s3.eu-west-1.amazonaws.com/LogoV4_TRANSPARENT.png](https://yk-website-images.s3.eu-west-1.amazonaws.com/LogoV4_TRANSPARENT.png)

# Youverse Webcam Component

[![License](https://img.shields.io/github/license/dev-yoonik/YOUVERSE-WEBCAM-COMPONENT)](https://github.com/dev-yoonik/YOUVERSE-WEBCAM-COMPONENT/blob/master/LICENSE)
[![Version](https://img.shields.io/github/v/release/dev-yoonik/YOUVERSE-WEBCAM-COMPONENT?display_name=tag)](https://github.com/dev-yoonik/YOUVERSE-WEBCAM-COMPONENT)

## Getting Started

```
npm install youverse-webcam-component
```

## Integration via NPM

Install `youverse-webcam-component`:

```
npm i youverse-webcam-component
```

Import `youverseWebcam` from `youverse-webcam-component` into your `.js` file:

```javascript
// If you use module bundler
import { youverseWebcam } from 'youverse-webcam-component';

// If you don't use module bundler
import { youverseWebcam } from './node_modules/youverse-webcam-component/js/dist/youverse-webcam.min.js';
```

Add the component name to the `.html` file.

```html
<youverse-webcam 
    cancel-verification 
    change-camera
></youverse-webcam>
```

## Integration via CDN

Connect the script in your `.html` file. Here is the CDN link: `https://www.jsdelivr.com/package/npm/:package@:version/:file`

For example:

```html
<script src="https://cdn.jsdelivr.net/npm/youverse-webcam-component@latest/js/dist/youverse-webcam.min.js"></script>
```

Add the component name to the `.html` file.

```html
<youverse-webcam 
    cancel-verification 
    change-camera
    locale="en"
></youverse-webcam>
```

## Attributes

 **Attribute**           | **Info**                                                                                             | **Data type** | **Default Value**                                       | **Values**       
-------------------------|------------------------------------------------------------------------------------------------------|---------------|---------------------------------------------------------|------------------
 **cancel-verification** | Option to cancel verification. If true, an option to cancel de verification will appear              | boolean       | true                                                    | true, false      
 **change-camera**       | Option to change camera. If true and if exist multiple cameras, an icon to switch camera will appear | boolean       | true                                                    | true, false      
 **locale**              | The language of the component interface                                                              | string        | en                                                      | en, pt, es       
 **color**               | The color of the component interface                                                                 | string        | #492280                                                 | hex color string 
 **title-text**          | Text for the component title. Translation based on the language selected                             | string        | Take a selfie                                           | string           
 **info-text**           | Text for the component info. Translation based on the language selected                              | string        | Make sure that your face is in the frame and is visible | string           

## Events

You can subscribe to the component events.

For example:

```javascript
document.addEventListener('NEXT_STEP_EVENT', (event) => console.log(event.detail)); // Event
```

Type of events:

 **Event**                    | **Description**                                                
------------------------------|----------------------------------------------------------------
 **NEXT_STEP_EVENT**          | Event triggered when selfie is taken                           
 **CANCEL_EVENT**             | Event triggered when cancellation occurs                       
 **RESPONSE_NEXT_STEP_EVENT** | Event to communicate to component after NEXT_STEP_EVENT occurs 
 **RESPONSE_CANCEL_EVENT**    | Event to communicate to component after CANCEL_EVENT occurs    

For more information please [contact us](mailto:tech@youverse.id).