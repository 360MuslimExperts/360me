import "./globals.css";
import ClientLayout from "./_layout";

export const metadata = {
  title: "360ME",
  description: "Your site description",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <ClientLayout>
        {children}
      </ClientLayout>
    </html>
  );
}