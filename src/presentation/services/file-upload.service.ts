export class FileUpladService {
  constructor() {}

  private checkFolder(folderPath: string) {
    throw new Error("Not implemented");
  }

  uploadFile = async (
    file: any,
    folder: string = "uploads",
    validExtension: string[] = ["jpg", "png", "jpeg", "gif"]
  ) => {
    return { message: "File uploaded successfully" };
  };

  uploadMultipleFile = async (
    file: any[],
    folder: string = "uploads",
    validExtension: string[] = ["jpg", "png", "jpeg", "gif"]
  ) => {
    return { message: "File uploaded successfully" };
  };
}
