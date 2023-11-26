import {
  S3Client,
  // This command supersedes the ListObjectsCommand and is the recommended way to list objects.
  ListObjectsV2Command,
  ListObjectsV2Output,
  PutObjectCommand,
  PutObjectCommandInput,
  DeleteObjectCommand,
  DeleteObjectCommandInput,
} from "@aws-sdk/client-s3";

import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

const s3Client = new S3Client({
  region: "us-east-2",
});

const _listS3Objects = async (bucketName: string, folderName: string | "") => {
  try {
    const command = new ListObjectsV2Command({
      Bucket: bucketName,
      Prefix: folderName,
    });
    const response: ListObjectsV2Output = await s3Client.send(command);
    return response.Contents;
  } catch (error) {
    console.error("Error listing S3 objects:", error);
    throw error;
  }
};

export const getS3ObjectsAsJson = async (
  bucketName: string,
  folderName: string
) => {
  try {
    const objects = await _listS3Objects(bucketName, folderName);
    if (!objects) {
      return null;
    }
    // Map the necessary properties from the objects
    const mappedObjects = objects.map((obj) => ({
      Key: obj.Key,
      LastModified: obj.LastModified,
      Size: obj.Size,
    }));
    return mappedObjects;
  } catch (error) {
    console.error("Error getting S3 objects as JSON:", error);
    throw error;
  }
};

export const uploadFileToS3 = async (
  bucketName: string,
  fileName: string,
  file: string,
  params: PutObjectCommandInput = {
    Bucket: bucketName,
    Key: fileName,
    Body: file,
  }
) => {
  try {
    const response = await s3Client.send(new PutObjectCommand(params));
    return response;
  } catch (error) {
    console.error("Error uploading file:", error);
    throw error;
  }
};

export const deleteFileFromS3 = async (
  bucketName: string,
  fileName: string
) => {
  try {
    const params: DeleteObjectCommandInput = {
      Bucket: bucketName,
      Key: fileName,
    };
    const response = await s3Client.send(new DeleteObjectCommand(params));
    return response;
  } catch (error) {
    console.error("Error deleting file:", error);
    throw error;
  }
};

export const generateUploadPreSignedUrl = async (
  bucketName: string,
  fileName: string
) => {
  try {
    const command = new PutObjectCommand({ Bucket: bucketName, Key: fileName });
    return await getSignedUrl(s3Client, command, { expiresIn: 1000 });
  } catch (error) {
    console.error("Error generating upload pre-signed URL:", error);
    throw error;
  }
};

export const uploadAttachmentToS3 = async (
  bucketName: string,
  fileName: string,
  type: string,
  buffer: Buffer
) => {
  try {
    const params: PutObjectCommandInput = {
      // file name you can get from URL or in any other way, you could then pass it as parameter to the function for example if necessary
      Key: fileName,
      Body: buffer,
      Bucket: bucketName,
      ContentType: type,
    };
    const response = await s3Client.send(new PutObjectCommand(params));
    return response;
  } catch (error) {
    console.error("Error uploading file:", error);
    throw error;
  }
};

export const createEmptyFolder = async (
  bucketName: string,
  folderName: string
) => {
  try {
    const params: PutObjectCommandInput = {
      Bucket: bucketName,
      Key: `${folderName}/`,
    };
    const response = await s3Client.send(new PutObjectCommand(params));
    return response;
  } catch (error) {
    console.error("Error creating empty folder:", error);
    throw error;
  }
};

export const deleteFolder = async (bucketName: string, folderName: string) => {
  try {
    const params: DeleteObjectCommandInput = {
      Bucket: bucketName,
      Key: `${folderName}/`,
    };
    const response = await s3Client.send(new DeleteObjectCommand(params));
    return response;
  } catch (error) {
    console.error("Error deleting empty folder:", error);
    throw error;
  }
};
