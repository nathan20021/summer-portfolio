import {
  S3Client,
  // This command supersedes the ListObjectsCommand and is the recommended way to list objects.
  ListObjectsV2Command,
  PutObjectCommand,
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
  file: string
) => {
  try {
    const params = {
      Bucket: bucketName,
      Key: fileName,
      Body: file,
    };
    const response = await s3Client.send(new PutObjectCommand(params));
    return response;
  } catch (error) {
    console.error("Error uploading file:", error);
    throw error;
  }
};
