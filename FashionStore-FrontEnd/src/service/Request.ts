export async function request(url: string) {
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`không thể truy cập API ${url}`);
  }
  return response.json();
}

// tổng quát hóa hàm request
export async function request1<T>(
  url: string,
  method: string = "GET",
  body?: unknown
): Promise<T> {
  const options: RequestInit = {
    method,
    headers: {
      "Content-Type": "application/json",
    },
    body: body ? JSON.stringify(body) : undefined, // Chỉ thêm body nếu có
  };

  try {
    const response = await fetch(url, options);

    if (!response.ok) {
      // Lấy chi tiết lỗi từ API nếu có
      const errorText = await response.text();
      throw new Error(`Lỗi API ${url}: ${response.status} - ${errorText}`);
    }

    return await response.json(); // Trả về dữ liệu đã parse JSON
  } catch (error) {
    console.error("Lỗi khi gọi API:", error);
    throw new Error(`Lỗi khi fetch dữ liệu từ ${url}: ${error}`);
  }
}
