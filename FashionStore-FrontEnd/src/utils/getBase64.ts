const getBase64 = (file: File): Promise<string | null> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      // Tách và chỉ lấy phần base64 data (phần sau dấu phẩy)
      const result = reader.result as string;
      const base64Data = result ? result.split(",")[1] : null;
      resolve(base64Data);
    };
    reader.onerror = (error) => {
      reject(error);
    };
  });
};
export default getBase64;
