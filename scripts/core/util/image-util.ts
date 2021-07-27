import ImageView = require("@smartface/native/ui/imageview");
import Http = require("@smartface/native/net/http");
import Image = require("@smartface/native/ui/image");
const myHttp = new Http();

export type ImageLoadError = {
    message: string;
    body: any;
    statusCode: number;
    headers: { [key: string]: string };
}

export class ImageUtil {
    static setImageViewImageFromNetwork(imageView: ImageView, url: string,
        onError?: (e: ImageLoadError) => void): void {
        myHttp.requestImage({
            url: url,
            onLoad: (e: {
                statusCode: number;
                headers: { [key: string]: string };
                image: Image;
            }): void => {
                imageView.image = e.image;
            },
            onError: (e: {
                message: string;
                body: any;
                statusCode: number;
                headers: { [key: string]: string };
            }): void => {
                if (onError) onError(e)
                else console.log(e.message);
            }
        });
    }
}