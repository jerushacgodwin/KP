/// <reference types="react" />
import 'primereact/resources/primereact.css';
import 'primeflex/primeflex.css';
import 'primeicons/primeicons.css';
import '../styles/layout/layout.scss';
import '../styles/demo/Demos.scss';
interface RootLayoutProps {
    children: React.ReactNode;
}
export default function RootLayout({ children }: RootLayoutProps): import("react").JSX.Element;
export {};
