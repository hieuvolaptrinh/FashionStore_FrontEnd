import { API_CONFIG } from "../../apiConfig";
import Type from "../../models/Type";
import { request } from "../Request";

export async function getTypes(): Promise<Type[]> {
  const result: Type[] = [];

  const response = await request(`${API_CONFIG.types}`);

  const responseData = response._embedded.types;

  if (responseData && Array.isArray(responseData)) {
    responseData.forEach((item: { typeId: number; typeName: string }) => {
      result.push({ typeId: item.typeId, typeName: item.typeName });
    });
  }
  return result;
}
