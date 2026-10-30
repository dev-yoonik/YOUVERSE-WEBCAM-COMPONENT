![https://yk-website-images.s3.eu-west-1.amazonaws.com/LogoV4_TRANSPARENT.png](https://yk-website-images.s3.eu-west-1.amazonaws.com/LogoV4_TRANSPARENT.png)

# Youverse Webcam Component

[![License](https://img.shields.io/github/license/dev-yoonik/YOUVERSE-WEBCAM-COMPONENT)](https://github.com/dev-yoonik/YOUVERSE-WEBCAM-COMPONENT/blob/master/LICENSE)
[![Version](https://img.shields.io/github/v/release/dev-yoonik/YOUVERSE-WEBCAM-COMPONENT?display_name=tag)](https://github.com/dev-yoonik/YOUVERSE-WEBCAM-COMPONENT)

## Getting Started

```
npm install youverse-webcam-component
```

## License token (JWT) setup

Before using this component, you must obtain a valid license token (JWT) from your backend service.

1. **Send an HTTP GET request** to the authentication endpoint:
   - **Endpoint**: `https://web-sdk.youverse.id/auth-token`
   - **Headers**:
     - `x-api-key`: Your API key (get it from your Youverse dashboard at [https://www.youverse.id/](https://www.youverse.id/))
   - **Parameters**:
     - `customer_bind`: Customer identifier required by the service

2. **Response**: Backend returns authentication payload containing the JWT token.

3. **Use the token** as the `license` attribute:
   ```html
   <youverse-webcam license="JWT_TOKEN" ...></youverse-webcam>

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

> **Note:** Importing the component inside your app bundle lowers the trust of every capture (see [Load order](#load-order)). Prefer a `<script>` tag as the first element of `<head>`, as in [Integration via CDN](#integration-via-cdn); you can serve `js/dist/youverse-webcam.min.js` from your own assets.

Add the component name to the `.html` file.

```html
<youverse-webcam 
    license="JWT_TOKEN"
    cancel-verification="false"
    change-camera="true"
></youverse-webcam>
```

## Integration via CDN

Connect the script in your `.html` file. Here is the CDN link: `https://www.jsdelivr.com/package/npm/:package@:version/:file`

For example:

```html
<script src="https://cdn.jsdelivr.net/npm/youverse-webcam-component@3.0.0/js/dist/youverse-webcam.min.js"
        integrity="sha384-77/KGDA1TBxyxppp6nJmOWzN6tj6JJi4B3yq3tCt0pBsO2Id51Com3FCmAw1KaUO"
        crossorigin="anonymous"></script>
```

> **Note:** The `integrity` attribute ensures the script has not been tampered with. Always load a fixed version: the hash only matches the version it was published with, so with `@latest` the script stops loading as soon as a new version is released. Each [release](https://github.com/dev-yoonik/YOUVERSE-WEBCAM-COMPONENT/releases) lists its version and hash. The `crossorigin="anonymous"` attribute is required when loading from a CDN.

### Load order

Place the component's `<script>` as **the first element of `<head>`**, before any other script on the page. When it loads, the component records the browser's native camera APIs and counts the scripts already in the page. If any script ran before it (a theme snippet, analytics, a tag manager, your app bundle), it cannot rule out that the script tampered with those APIs. It reports this in the signed capture, and the capture's risk is raised (`bundle did not load first, baseline trust reduced`). If your site uses a Content-Security-Policy with nonces, give the tag the page's nonce.

### Supported browsers

Chrome, Edge, Safari (macOS, iOS and iPadOS) and Chromium-based browsers on Android. **Firefox is not supported** (desktop, Android and iOS): the component shows a "browser not supported" message instead of the camera and emits an `error` event (see [Error event](#error-event)).

### Content-Security-Policy

If your site sets a Content-Security-Policy, it must allow the following, or every capture is blocked:

Directive     | Value                                                         | Why
--------------|---------------------------------------------------------------|---------------------------------------------------------------
`script-src`  | `'wasm-unsafe-eval'`                                          | The capture is protected by a WebAssembly module compiled in the browser
`script-src`  | `blob:`                                                       | The face detection script is verified against its hash and then run from a `blob:` URL
`connect-src` | `https://cdn.jsdelivr.net` `https://raw.githubusercontent.com` | The face detection script and models are fetched from the CDN, with GitHub as fallback

For example:

```
script-src 'self' 'nonce-…' blob: 'wasm-unsafe-eval'; connect-src 'self' https://cdn.jsdelivr.net https://raw.githubusercontent.com
```

Add the component name to the `.html` file.

```html
<youverse-webcam 
    license="JWT_TOKEN"
    cancel-verification="false"
    change-camera="true"
></youverse-webcam>
```

## Attributes

 **Attribute**           | **Info**                                                                                             | **Data type** | **Default Value**                                       | **Values**       
-------------------------|------------------------------------------------------------------------------------------------------|---------------|---------------------------------------------------------|------------------
 **license**    | JWT license token required to authorize the component | string | - | string (required)
 **face-position-check** | Option for guided face positioning              | boolean       | true                                                    | true, false      
 **cancel-verification** | Option to cancel verification. If true, an option to cancel de verification will appear              | boolean       | true                                                    | true, false      
 **change-camera**       | Option to change camera. If true and if exist multiple cameras, an icon to switch camera will appear | boolean       | true                                                    | true, false      
 **locale**              | The language of the component interface                                                              | string        | en                                                      | en, pt, es       
 **color**               | The color of the component interface                                                                 | string        | #492280                                                 | hex color string 
 **background-color**               | Background color of the component interface                                                                 | string        | #fff                                                 | hex color string 
 **title-text**          | Text for the component title. Translation based on the language selected                             | string        | Take a selfie                                           | string           
 **info-text**           | Text for the component info. Translation based on the language selected                              | string        | Make sure that your face is in the frame and is visible | string                 

## Events

You can subscribe to the component events.

For example:

```javascript
document.addEventListener('YV_SELFIE_NEXT_STEP', (event) => console.log(event.detail));
```

### Type of events:

| **Event**                    | **Description**                                                | **Event Handling**                                           |
|------------------------------|----------------------------------------------------------------|--------------------------------------------------------------|
| **YV_SELFIE_NEXT_STEP**          | Event triggered when a selfie is taken                          | Handled by a designated event listener in the application(listener)    |
| **YV_SELFIE_CANCEL**             | Event triggered when cancellation occurs                       | Handled by a designated event listener in the application(listener)    |
| **YV_SELFIE_BLOCKED_ATTEMPT**    | Event triggered when the component blocks a capture (camera access or capture integrity) | Handled by a designated event listener in the application(listener)    |
| **YV_SELFIE_RESPONSE_NEXT_STEP** | Event to communicate with the component after YV_SELFIE_NEXT_STEP   | Dispatched by the application to signal handling components(dispatch)  |
| **YV_SELFIE_RESPONSE_CANCEL**    | Event to communicate with the component after YV_SELFIE_CANCEL      | Dispatched by the application to signal handling components(dispatch)  |

### Response Events

Type of events:

 **Event**                    | **Response Parameters** | **Usage** | **Description**                                                
------------------------------|-------------|------|----------------------------------------------------------------
 **YV_SELFIE_NEXT_STEP**          |`{ detail: { metadata: object, image: string, video?: string, frames?: string[], clips?: string[], samples?: object[] } }`  | `event.detail.image` | The event returns an image and the capture evidence: a short recording (`video`), or a frame sequence (`frames` with its `clips`) where the camera has no exposure control (Safari, iOS, iPadOS). Preview sample frames (`samples`) are sent instead when the capture check cannot run. Forward `event.detail` unchanged. 
 **YV_SELFIE_CANCEL** | `null` | `null` | The event has no return 
 **YV_SELFIE_BLOCKED_ATTEMPT** | `{ detail: { metadata: object } }` | `event.detail.metadata` | The event returns a signed record of the blocked capture, without an image. Forward `event.detail` unchanged to the attestation endpoint, like a capture. 

### Error event

When the component cannot start in the current browser (for example, Firefox), it dispatches an `error` event on the `<youverse-webcam>` element itself, not on `document`. The error is in `event.detail[0]`:

```javascript
document.querySelector('youverse-webcam')
  .addEventListener('error', (event) => console.error(event.detail[0].message));
```

## Attest payload with your backend service

Before validating the payload, you must send the captured data to the attestation endpoint from your backend service.

1. **Send an HTTP POST request** to the attestation endpoint:
   - **Endpoint**: `https://web-sdk.youverse.id/integrity/attest`
   - **Payload**: the `YV_SELFIE_NEXT_STEP` `event.detail`, unchanged:
     - `metadata`: Metadata object generated by the component
     - `image`: Captured image data
     - `video`: Capture recording (data URL, a few MB), when present
     - `frames`: Capture frame sequence (JPEG data URLs), when present
     - `clips`: One short clip per frame of the sequence (video data URLs), present with `frames`
     - `samples`: Preview sample frames, when present

   Right after taking the selfie, the component runs a short capture check (a few seconds) and sends its evidence with the selfie, so allow request bodies of at least
   10 MB on the way to `/integrity/attest`.

2. **Response**: Backend returns an attestation result indicating whether the payload is valid and trusted.

3. **Blocked attempts**: send the `YV_SELFIE_BLOCKED_ATTEMPT` `event.detail` (`metadata` only) to the
   same endpoint. Its attestation result is always `failed`; forwarding it lets the service record
   the blocked attempt.

For more information please [contact us](mailto:tech@youverse.id).