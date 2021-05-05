import './preview.css';
import { useRef, useEffect } from "react";

interface PreviewProps {
    code: string;
    error: string;
};

const html = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>IFrameBox</title>
    </head>
    <body>
        <div id="root"></div>
        <script>
            const handleError = (err) => {
                const root = document.querySelector('#root');
                root.innerHTML = '<div style="color: red;"><h4>Runtime Error</h4>' + err + '</div>';
                console.error(err);
            };

            //asynchronous errors
            window.addEventListener('error', (event) => {
                event.preventDefault();
                handleError(event.error);
            });

            //synchronous errors
            window.addEventListener('message', (event) => {
                try{
                    eval(event.data);
                }catch (err){
                    handleError(err);
                }
            }, false);
        </script>
    </body>
    </html>
`;

const Preview: React.FC<PreviewProps> = ({code, error}) => {
    const iframeRef = useRef<any>(); 

    useEffect(() => {
        //reset html in iframe
        iframeRef.current.srcdoc = html;

        //just to give time for the iframe to 'refresh'
        setTimeout(()=>{
            iframeRef.current.contentWindow.postMessage(code, '*');
        }, 50);
        
    }, [code]);

    return (
        <div className="preview-wrapper">
            <iframe 
                ref={iframeRef} 
                sandbox="allow-scripts" 
                srcDoc={html} 
                title="IFrameBox"
            />
            {error && <div className="preview-error">{error}</div>}
        </div>
    );
};

export default Preview;