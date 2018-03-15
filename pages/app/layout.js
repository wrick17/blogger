import Header from './header'

const Layout = (props) => (
  <div className="layout">
    <Header />
    {props.children}
    <style jsx global>{`
      body {
        font-family: "Arial";
      }
    `}</style>
  </div>
)

export default Layout
