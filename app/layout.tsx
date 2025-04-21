import "./globals.css";
import { ReduxProvider } from "@/components/common/ReduxProvider";
import { Toaster } from "react-hot-toast";
 
export default function RootLayout({ children, }: Readonly<{ children: React.ReactNode; }>) {
  return (
    <html lang="en">
      <body>
        <ReduxProvider>
          <Toaster position="top-right"/>
          {children}
        </ReduxProvider>
      </body>
    </html>
  );
}
