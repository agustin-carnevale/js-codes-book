import './resizable.css';
import { useEffect, useState } from 'react';
import { ResizableBox } from 'react-resizable';

interface ResizableProps {
    direction: 'horizontal' | 'vertical';
}

const Resizable: React.FC<ResizableProps> = ({ direction, children }) => {
    const [innerWidth, setInnerWidth] = useState(window.innerWidth);
    const [innerHeight, setInnerHeight] = useState(window.innerHeight);
    const [width, setWidth] = useState(window.innerWidth * 0.75);

    useEffect(() => {
        let timer: any;
        const listener = () => {
            if(timer){
                clearTimeout(timer);
            }
            timer = setTimeout(()=>{
                setInnerWidth(window.innerWidth);
                setInnerHeight(window.innerHeight);
                if(window.innerWidth < width){
                    setWidth(window.innerWidth * 0.75);
                }
            }, 300);
        }
        window.addEventListener('resize', listener);

        //remove (clean up)
        return () => {
            window.removeEventListener('resize', listener);
        }
    }, [width])

    if(direction === 'horizontal'){
        return (<ResizableBox
            className="resize-horizontal"
            width={width}
            height={Infinity}
            resizeHandles={['e']}
            maxConstraints={[innerWidth * 0.8, Infinity]}
            minConstraints={[innerWidth * 0.2, Infinity]}
            onResizeStop={(event, data) => {
                setWidth(data.size.width);
            }}
        >
            {children}
        </ResizableBox>);
    }

    return (<ResizableBox
        height={300}
        width={Infinity}
        resizeHandles={['s']}
        maxConstraints={[Infinity, innerHeight * 0.95]}
        minConstraints={[Infinity, 50]}
    >
        {children}
    </ResizableBox>);
};

export default Resizable;