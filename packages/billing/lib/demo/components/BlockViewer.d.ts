import React from 'react';
interface BlockViewerProps {
    header: string;
    code: string;
    new?: boolean;
    free?: boolean;
    containerClassName?: string;
    previewStyle?: React.CSSProperties;
    children: React.ReactNode;
}
declare const BlockViewer: (props: BlockViewerProps) => React.JSX.Element;
export default BlockViewer;
