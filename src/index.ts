import { S3Client, GetObjectCommand, PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

const s3Client = new S3Client({
    region: process.env.REGION as string,
    credentials: {
        accessKeyId: process.env.ACCESS_KEY_ID as string,
        secretAccessKey: process.env.SECRET_ACCESS_KEY as string,
    },
});

const getObjectUrl = async(bucket:string,key:string)=>{
    const getCommand = new GetObjectCommand({
        Bucket:bucket,
        Key:key
    });
    const response  = await getSignedUrl(s3Client,getCommand);
    return response;
}
const putObjectUrl = async(bucket:string,filename:string,contentType:string)=>{
    const putCommand = new PutObjectCommand({
        Bucket:bucket,
        Key:'uploads/'+filename,
        ContentType:contentType
    })
    const response  = await getSignedUrl(s3Client,putCommand);
    return response;
}
const geturl =async()=>{
    // const url = await getObjectUrl("syncstream","Admit Card.pdf")
    // console.log(url)
    // const puturl = await putObjectUrl("syncstream",`metaspace-${Date.now()}.mp4`,"video/mp4")
    // console.log(puturl)
    const url = await getObjectUrl("syncstream",`uploads/metaspace-1732736168644.mp4`)
    console.log(url)
}
geturl()
