declare namespace JSX {
    interface IntrinsicElements {
        'youverse-webcam': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
            cancelVerification?: boolean;
            changeCamera?: boolean;
            facePositionCheck?: boolean;
            backgroundColor?: string;
            titleText?: string;
            infoText?: string;
            license?: string;
            color?: string;
            locale?: string;
        };
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'youverse-webcam': YourverseWebcam;
    }
}

interface YourverseWebcam extends HTMLElement {
    cancelVerification?: boolean;
    changeCamera?: boolean;
    facePositionCheck?: boolean;
    backgroundColor?: string;
    titleText?: string;
    infoText?: string;
    license?: string;
    color?: string;
    locale?: string;
}

export default YourverseWebcam;