import {Footer} from "antd-mobile";

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout(props: LayoutProps) {
  const {children} = props;

  return (
    <div className="flex flex-col h-screen">
      <div className="flex-1">{children}</div>

      <Footer
        content={
          <div className='h-8 leading-8'>
            Created and Maintained by
            <a
              style={{
                marginLeft: "4px",
              }}
              href="https://github.com/lexmin0412"
              target="_blank"
            >
              Lexmin0412
            </a>
          </div>
        }
      ></Footer>
    </div>
  );
}
