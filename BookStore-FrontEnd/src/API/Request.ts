export async function request(url: string) {
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`không thể truy cập API ${url}`);
  }
  return response.json();
}
