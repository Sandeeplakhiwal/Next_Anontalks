"use client";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { createContext, useEffect, useState } from "react";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Provider as ReduxProvider, useSelector } from "react-redux";
import store from "@/redux/store";
import { Toaster } from "react-hot-toast";

export const Context = createContext({ user: {} });

export const ContextProvider = ({ children }) => {
  const [user, setUser] = useState({});
  const queryClient = new QueryClient();

  return (
    <ReduxProvider store={store}>
      <QueryClientProvider client={queryClient}>
        <Context.Provider value={{ user, setUser }}>
          <>
            {children}
            <Toaster />
            <ReactQueryDevtools />
          </>
        </Context.Provider>
      </QueryClientProvider>
    </ReduxProvider>
  );
};
