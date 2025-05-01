// import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ConfigProvider, theme } from "antd";
import { AntdRegistry } from '@ant-design/nextjs-registry';

// const geistSans = Geist({
//   variable: "--font-geist-sans",
//   subsets: ["latin"],
// });

// const geistMono = Geist_Mono({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
// });

export const metadata = {
  title: "Fact Checken",
  description: "Got a forwarded message or Suscpectible claim? Check the facts before you believe it!",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
      <ConfigProvider
          theme={{
            token: {
              // Seed Token
              colorPrimary: "#cc9900",
              // algorithm: [theme.darkAlgorithm, theme.compactAlgorithm],
              // Alias Token
              // colorBgContainer: "#f6ffed",
              fontSize: 16
            },
          }}
        >
          <AntdRegistry>{children}</AntdRegistry>
        </ConfigProvider>
      </body>
    </html>
  );
}
