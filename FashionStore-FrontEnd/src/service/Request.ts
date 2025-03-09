export async function request(url: string) {
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`không thể truy cập API ${url}`);
  }
  return response.json();
}

// tổng quát hóa hàm request
// export async function request1<T>(url: string, method: string = "GET", body?: unknown): Promise<T> {
//   const options: RequestInit = {
//       method,
//       headers: {
//           "Content-Type": "application/json",
//       },
//   };

//   if (body) {
//       options.body = JSON.stringify(body);
//   }

//   const response = await fetch(url, options);

//   if (!response.ok) {
//       throw new Error(`Không thể truy cập API ${url}`);
//   }
//   return response.json();
// }
