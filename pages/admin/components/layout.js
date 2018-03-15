import AuthButton from './auth_button'

const Layout = (props) => (
  <div className="mdl-layout mdl-js-layout mdl-layout--fixed-header mdl-layout--fixed-drawer dashboard">
    <header className="mdl-layout__header dashboard-header">
      <div className="mdl-layout__header-row">
        <span className="mdl-layout-title dashboard-title">Dashboard</span>
        <div className="mdl-layout-spacer"></div>
        <nav className="mdl-navigation mdl-layout--large-screen-only">
          <a className="mdl-navigation__link" href="">Home Page</a>
          <a className="mdl-navigation__link" href="">Categories</a>
          <a className="mdl-navigation__link" href="">Posts</a>
          <a className="mdl-navigation__link" href=""><AuthButton /></a>
        </nav>

        <button id="demo-menu-lower-right" className="mdl-button mdl-js-button mdl-button--icon  mdl-layout--small-screen-only">
          <i className="material-icons">more_vert</i>
        </button>

        <ul className="mdl-menu mdl-menu--bottom-right mdl-js-menu mdl-js-ripple-effect" htmlFor="demo-menu-lower-right">
          <li className="mdl-menu__item">Home Page</li>
          <li className="mdl-menu__item">Categories</li>
          <li className="mdl-menu__item">Posts</li>
          <li className="mdl-menu__item"><AuthButton /></li>
        </ul>
      </div>
    </header>
    {props.children}
    <style jsx>{`
      .dashboard {
        height: 100vh;
      }
      .dashboard-header {
        z-index: 10;
        width: 100% !important;
        margin-left: 0 !important;
      }
      .dashboard-sidebar {
        margin-top: 64px;
        height: calc(100% - 64px);
      }    
    `}</style>
    <style jsx global>{`  
      @media(min-width: 1025px) {
        .mdl-layout__drawer-button {
          display: none !important;
        }
      }
    `}</style>
  </div>
)

export default Layout
