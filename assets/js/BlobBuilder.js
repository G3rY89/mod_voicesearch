/**
 * A class which creates blob and vice versa to base64
 */
class BlobBuilder {

    parts = [];
    blob;

    constructor(){

    }

    /**
     * Appends a part of blob to a created blob array
     * @param {*} part 
     */
    append(part) {
        var that = this;

        that.parts.push(part);
        that.blob = undefined; 
      };

    /**
     * Creates a blob object from blob array
     * @returns new Blob
     */
    getBlob() {
        var that = this;

        if (!that.blob) {
            that.blob = new Blob(that.parts, {type: that.parts[0].type});
        }
        return that.blob;
    };

    /**
     * Converts blob to base64 string
     * @param {*} blob 
     * @returns new Promise
     */
    blobToBase64(blob) {
        return new Promise((resolve, _) => {
            const reader = new FileReader();
            reader.onloadend = () => resolve(reader.result);
            reader.readAsDataURL(blob);
        });
    }
}