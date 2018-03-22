const Header = (props) => (
  <React.Fragment>
    <header className="header" >
      <h2><a href="/">Blogger</a></h2>
    </header>
    <style jsx>{`
      .header {
        border-bottom: 1px solid #CCC;
        padding: 0 15px;
      }
    `}</style>
  </React.Fragment>
)

export default Header
