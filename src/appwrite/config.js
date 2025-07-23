import conf from "../confg/conf";
import { Client, Databases, ID, Storage, Query, Account } from "appwrite";

export class Service {
  client = new Client();
  databases;
  bucket;
  account;

  constructor() {
    this.client
      .setEndpoint(conf.appwriteURL)
      .setProject(conf.appwriteProjectId);
    this.databases = new Databases(this.client);
    this.account = new Account(this.client);
    this.bucket = new Storage(this.client);
  }

  async createPost({
    title,
    content,
    ingredients,
    slug,
    status,
    userId,
    featuredImg,
  }) {
    try {
      return await this.databases.createDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        ID.unique(),
        {
          title,
          content,
          ingredients,
          slug,
          status,
          userId,
          featuredImg,
        }
      );
    } catch (err) {
      console.log("Error creating post:", err);
      throw err;
    }
  }

  async updatePost(slug, { title, content, ingredients, featuredImg, status }) {
    try {
      return await this.databases.updateDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        slug,
        {
          title,
          content,
          ingredients,
          featuredImg,
          status,
        }
      );
    } catch (err) {
      console.log("Error updating post:", err);
    }
  }

  async getPost(slug) {
    try {
      return await this.databases.getDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        slug
      );
    } catch (err) {
      console.log("Error getting post:", err);
      return false;
    }
  }

  async deletePost(slug) {
    try {
      await this.databases.deleteDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        slug
      );
      return true;
    } catch (err) {
      console.log("Error deleting post:", err);
      return false;
    }
  }

  async getPosts(queries = [Query.equal("status", "active")]) {
    try {
      return await this.databases.listDocuments(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        queries
      );
    } catch (err) {
      console.log("Error listing posts:", err);
      return false;
    }
  }

  async uploadFile(file) {
    try {
      return await this.bucket.createFile(
        conf.appwriteBucketId,
        ID.unique(),
        file
      );
    } catch (err) {
      console.log("Error uploading file:", err);
    }
  }

  async deleteFile(fileId) {
    try {
      await this.bucket.deleteFile(conf.appwriteBucketId, fileId);
      return true;
    } catch (err) {
      console.log("Error deleting file:", err);
      return false;
    }
  }

  getFileView(fileId) {
    return this.bucket.getFileView(conf.appwriteBucketId, fileId);
  }
}

const service = new Service();
export default service;
