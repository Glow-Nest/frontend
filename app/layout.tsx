
import { Provider } from "react-redux";
import { store } from "@/store";

import "./globals.css";
import { ReduxProvider } from "@/components/common/ReduxProvider";
 
export default function RootLayout({ children, }: Readonly<{ children: React.ReactNode; }>) {
  return (
    <html lang="en">
      <body>
        <ReduxProvider>
          {children}
        </ReduxProvider>
      </body>
    </html>
  );
}
