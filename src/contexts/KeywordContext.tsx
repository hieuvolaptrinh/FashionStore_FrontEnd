import React, { createContext, useContext, useState } from "react";

// Kiểu dữ liệu cho context
interface KeywordContextType {
  keyword: string;
  setKeyword: (keyword: string) => void;
}

// Tạo context với giá trị mặc định
const KeywordContext = createContext<KeywordContextType | undefined>(undefined);

// Custom hook để sử dụng context
export const useKeyword = () => {
  const context = useContext(KeywordContext);
  if (!context)
    throw new Error("useKeyword phải được dùng bên trong KeywordProvider");
  return context;
};

// Provider component
export const KeywordProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [keyword, setKeyword] = useState("");
  return (
    <KeywordContext.Provider value={{ keyword, setKeyword }}>
      {children}
    </KeywordContext.Provider>
  );
};
