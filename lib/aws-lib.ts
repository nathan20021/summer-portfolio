import {
  S3Client,
  // This command supersedes the ListObjectsCommand and is the recommended way to list objects.
  ListObjectsV2Command,
  PutObjectCommand,
  PutObjectCommandInput,
} from "@aws-sdk/client-s3";

const s3Client = new S3Client({
  region: "us-east-2",
});

const _listS3Objects = async (bucketName: string, folderName: string | "") => {
  try {
    const command = new ListObjectsV2Command({
      Bucket: bucketName,
      Prefix: folderName,
    });
    const response = await s3Client.send(command);
    return response.Contents;
  } catch (error) {
    console.error("Error listing S3 objects:", error);
    throw error;
  }
};

export const getS3ObjectsAsJson = async (
  bucketName: string,
  folderName: string | ""
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
