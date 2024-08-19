const {PutObjectCommand, S3Client, GetObjectCommand} = require("@aws-sdk/client-s3")
const {awsAccessKey, awsBucketName, awsRegion, awsSecretAccessKey} = require("../config/keys");
const generateCode = require("../utils/generateCode");
const {getSignedUrl} = require("@aws-sdk/s3-request-presigner")


const client = new S3Client({
    region: awsRegion,
    credentials: {
        accessKeyId: awsAccessKey,
        secretAccessKey: awsSecretAccessKey
    }
});

const uploadFileToS3 = async ({file, ext}) => {

    const Key = `${generateCode(12)}_${Date.now()}${ext}`;

    const params = {
        Bucket: awsBucketName,
        Body: file.buffer,
        Key,
        ContentType: file.mimetype
    }

    const command = new PutObjectCommand(params);

    try {
        await client.send(command);
        return Key;
    } catch (error) {
        console.log(error)
    }
};

const signedUrl = async (Key) => {
    const params = {
        Bucket: awsBucketName,
        Key,
    }

    const command = new GetObjectCommand(params);

    try {
        const url = await getSignedUrl(client, command, {expiresIn: 60});
        return url;
    } catch (error) {
        console.log(error);
    }
}

module.exports = {uploadFileToS3, signedUrl};