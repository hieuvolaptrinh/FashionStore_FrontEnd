export async function request1(url: string) {
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`không thể truy cập API ${url}`);
  }
  return response.json();
}

// tổng quát hóa hàm request
export async function request<T = unknown>(
  url: string,
  method: string = "GET",
  // headers: {
  //   "Content-Type": "application/json";
  // },
  body?: unknown
): Promise<T> {
  const options: RequestInit = {
    method,
    headers: {
      "Content-Type": "application/json",
    },
    body: body ? JSON.stringify(body) : undefined,
  };

  try {
    const response = await fetch(url, options);

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Lỗi API ${url}: ${response.status} - ${errorText}`);
    }

    const contentType = response.headers.get("Content-Type");
    if (contentType && contentType.includes("application/json")) {
      return (await response.json()) as T; // ✅ Parse JSON nếu đúng định dạng
    } else {
      return (await response.text()) as T;
    }
  } catch (error) {
    console.error("Lỗi khi gọi API:", error);
    throw new Error(`Lỗi khi fetch dữ liệu từ ${url}: ${error}`);
  }
}
