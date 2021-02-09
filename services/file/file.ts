import * as FileSystem from "expo-file-system";

class FileService {
  api: any;

  constructor(api: any) {
    this.api = api;
  }

  async delete(uri: string) {
    return this.api.deleteAsync(uri);
  }
}

export default new FileService(FileSystem);
