import { S3Client, PutObjectCommand, CreateBucketCommand, HeadBucketCommand } from "@aws-sdk/client-s3";
import * as fs from 'fs';
import * as path from 'path';
import * as mime from 'mime-types';

const BUCKET_NAME = "vehicles";
const PUBLIC_DIR = path.join(process.cwd(), "public", "cars");

const s3Client = new S3Client({
    forcePathStyle: true,
    region: "us-west-2",
    endpoint: "https://riqguufkfqlvfrayhvbt.storage.supabase.co/storage/v1/s3",
    credentials: {
        accessKeyId: "8f0b8a781ba12157d4f7ce1a3a98c02a",
        secretAccessKey: "4fa793ddbd70c1a796ec6aba77545acad9347da47e6f92e0ea809bb0b29f4e58",
    },
});

async function ensureBucketExists() {
    try {
        await s3Client.send(new HeadBucketCommand({ Bucket: BUCKET_NAME }));
        console.log(`Bucket "${BUCKET_NAME}" already exists.`);
    } catch (error: any) {
        if (error.name === 'NotFound' || error.$metadata?.httpStatusCode === 404) {
            console.log(`Creating bucket "${BUCKET_NAME}"...`);
            await s3Client.send(new CreateBucketCommand({ Bucket: BUCKET_NAME }));
            console.log("Bucket created successfully (Note: Make it public in Supabase Dashboard!).");
        } else {
            throw error;
        }
    }
}

async function uploadImages() {
    await ensureBucketExists();

    const files = fs.readdirSync(PUBLIC_DIR);

    for (const file of files) {
        const filePath = path.join(PUBLIC_DIR, file);
        const stats = fs.statSync(filePath);

        if (stats.isFile()) {
            const fileStream = fs.createReadStream(filePath);
            const contentType = mime.lookup(filePath) || 'application/octet-stream';

            const uploadParams = {
                Bucket: BUCKET_NAME,
                Key: file,
                Body: fileStream,
                ContentType: contentType,
            };

            try {
                await s3Client.send(new PutObjectCommand(uploadParams));
                console.log(`✅ Uploaded: ${file}`);
            } catch (err) {
                console.error(`❌ Failed to upload ${file}:`, err);
            }
        }
    }
    console.log("Upload process finished.");
}

uploadImages().catch(console.error);
