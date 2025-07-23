import conf from "../confg/conf";
import { Client, ID, Account } from "appwrite";

export class AuthService {
  Client = new Client();
  account;
  constructor() {
    this.Client.setEndpoint(conf.appwriteURL).setProject(
      conf.appwriteProjectId
    );
    this.account = new Account(this.Client);
  }

  async createAccount({ email, password, name }) {
    try {
      const userAccount = await this.account.create(
        ID.unique(),
        email,
        password,
        name
      );
      if (userAccount) return this.login({ email, password });
    } catch (err) {
      console.log("Cannot create account", err);
    }
  }
  async login({ email, password }) {
    try {
      return this.account.createEmailPasswordSession(email, password);
    } catch (err) {
      console.log(err);
    }
  }

  async getCurrentUser() {
    try {
      return await this.account.get();
    } catch (err) {
      console.log(err);
    }
    return null;
  }

  async logout() {
    try {
      return this.account.deleteSessions();
    } catch (err) {
      console.log(err);
    }
  }
}

const authService = new AuthService();
export default authService;
