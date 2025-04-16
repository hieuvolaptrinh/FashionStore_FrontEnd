import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";

const Test = () => {
  const [userName, setUserName] = useState<string | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const userData = jwtDecode(token);
      console.log("userData", userData);
      setUserName(userData.sub + "");
      //   setUserName(localStorage.getItem("username")); như này cũng được nhưng không an toàn
    }
  }, []);
  return <>{userName && <div>Xin chào {userName}</div>}</>;
};
export default Test;
