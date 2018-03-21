import Header from './header'

const Layout = (props) => (
  <div className="layout">
    <meta name="viewport" content="width=device-width, initial-scale=1" />
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
