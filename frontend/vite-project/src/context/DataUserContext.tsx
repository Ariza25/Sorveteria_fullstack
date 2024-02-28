import { useState, createContext, FunctionComponent } from "react";

export interface UserDataProps {
  fullName: string;
  phone: string;
  address: string;
  addressNumber: string;
  addressDistrict: string;
  complement: string;
  addressCity: string;
  paymentMethod: string;
  cpf: string;
}

export type UserDataContextType = {
  userData: UserDataProps;
  setUserData: (userData: UserDataProps) => void;
};

export interface UserDataProviderProps {
  children: React.ReactNode;
}

export const UserDataContext = createContext<UserDataContextType>({
  userData: {
    fullName: "",
    phone: "",
    address: "",
    addressNumber: "",
    addressDistrict: "",
    complement: "",
    addressCity: "",
    paymentMethod: "",
    cpf: "",
  },
  setUserData: () => {},
});

export const UserDataProvider: FunctionComponent<UserDataProviderProps> = ({
  children,
}) => {
  const [userData, setUserData] = useState<UserDataProps>({
    fullName: "",
    phone: "",
    address: "",
    addressNumber: "",
    addressDistrict: "",
    complement: "",
    addressCity: "",
    paymentMethod: "",
    cpf: "",
  });

  return (
    <UserDataContext.Provider value={{ userData, setUserData }}>
      {children}
    </UserDataContext.Provider>
  );
};