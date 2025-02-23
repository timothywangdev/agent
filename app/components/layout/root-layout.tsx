import { Sidebar } from "./sidebar";
import { Breadcrumb } from "./breadcrumb";
import { Toaster } from "sonner"

interface RootLayoutProps {
  children: React.ReactNode;
}

export function RootLayout({ children }: RootLayoutProps) {
  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />
      <main className="flex-1 overflow-y-auto">
        <div className="container mx-auto p-6">
          <Breadcrumb />
          {children}
        </div>
      </main>
      <Toaster />
    </div>
  );
} 