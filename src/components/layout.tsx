import {LexminFooter} from "@lexmin0412/wc-react";
interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout(props: LayoutProps) {
  const {children} = props;

  return (
    <div className="flex flex-col h-screen">
      <div className="flex-1 overflow-hidden">{children}</div>
			<LexminFooter />
    </div>
  );
}
