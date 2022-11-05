import Document, { Html, Head, Main, NextScript } from "next/document";

class MyDocument extends Document {
    render() {
        return (
            <Html>
                <Head />
                <body>
                    <Main />
                    <NextScript />
                    <script
                        src="https://product-gallery.cloudinary.com/all.js"
                        type="text/javascript"
                        strategy="beforeInteractive"
                    ></script>
                </body>
            </Html>
        );
    }
}

export default MyDocument;
