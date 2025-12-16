import AppShell from "@/app/AppShell";

import "./globals.css"
import "@/styles/commons.css"
import "@/styles/home.css";
import "@/styles/purchaseheader.css";
import "@/styles/support.css";
import "@/styles/board/board.css"
import "@/styles/board/board_write.css"
import "@/styles/board/board_detail.css"
import "@/styles/board/board_write.css"

export const metadata = {
    title: "Bicycle App",
    description: "Next.js Migration",
};

export default function RootLayout({ children }) {
    return (
        <html lang="ko">
            <body>
                <AppShell>{children}</AppShell>
            </body>
        </html>
    );
}