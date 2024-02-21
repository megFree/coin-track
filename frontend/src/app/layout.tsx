import type { Metadata } from "next";
import 'normalize.css';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import './base.scss';
import StoreProviderComponent from '@/redux/StoreProviderComponent';
import AuthGuardComponent from '@/components/_util/AuthGuardComponent/AuthGuardComponent';
import PopupManager from '@/components/_util/PopupManager/PopupManager';

export const metadata: Metadata = {
  title: "CoinTrack",
  description: "Приложение для отслеживания Ваших финансов!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <StoreProviderComponent>
        <AuthGuardComponent>
          <body className='root-layout'>
            {children}
            <PopupManager />
          </body>
        </AuthGuardComponent>
      </StoreProviderComponent>
    </html>
  );
}
