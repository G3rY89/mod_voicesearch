class BlobBuilder {

    parts = [];
    blob;

    constructor(){

    }

    append(part) {
        var that = this;

        that.parts.push(part);
        that.blob = undefined; 
      };

    getBlob() {
        var that = this;

        if (!that.blob) {
            that.blob = new Blob(that.parts, {type: that.parts[0].type});
        }
        return that.blob;
    };

    blobToBase64(blob) {
        return new Promise((resolve, _) => {
            const reader = new FileReader();
            reader.onloadend = () => resolve(reader.result);
            reader.readAsDataURL(blob);
        });
    }
}