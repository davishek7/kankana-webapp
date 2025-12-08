import { S3Client, GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

// R2 Client
const client = new S3Client({
  endpoint: process.env.R2_ENDPOINT_URL,
  region: "auto", // R2 requires this
  credentials: {
    accessKeyId: process.env.R2_ACCESS_KEY_ID,
    secretAccessKey: process.env.R2_SECRET_ACCESS_KEY,
  },
});

export default async function handler(req, res){
    const { key } = req.query

    if (!key){
        return res.status(400).json({ error: "Missing ?key=<file>" })
    }

    try {
        const command = new GetObjectCommand({
            Bucket: process.env.R2_BUCKET,
            Key: key
        })

        const signedUrl = await getSignedUrl(client, command, {
            expiresIn: 600
        })

        return res.redirect(302, signedUrl)
    }
    catch(err){
        console.error("R2 Signing Error:", err)
        return res.status(500).json({ error: "Failed to generate signed URL" })
    }
}