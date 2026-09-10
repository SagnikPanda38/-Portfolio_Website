import "./style.css";

export const metadata = {
  title: "Sagnik Panda — AI / ML Researcher",
  description:
    "Portfolio of Sagnik Panda — CS undergraduate (AI & ML), researcher in deep learning, PINNs and scientific computing.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="true"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Shippori+Mincho:wght@400;500;600;700;800&family=Manrope:wght@300;400;500;600;700;800&family=JetBrains+Mono:wght@400;500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <script
          // Runs before paint so the site never flashes the wrong theme.
          dangerouslySetInnerHTML={{
            __html: `
              try {
                var saved = localStorage.getItem('sp-theme');
                var theme = saved || (window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark');
                document.documentElement.setAttribute('data-theme', theme);
              } catch (e) {}
            `,
          }}
        />
        {children}
      </body>
    </html>
  );
}