import NoSSR from 'react-no-ssr'
import Link from 'next/link'
import MediaQuery from 'react-responsive';
import { authManager } from './utils'

import { Toolbar, ToolbarRow, ToolbarSection, ToolbarTitle, ToolbarMenuIcon } from 'rmwc/Toolbar';
import { Button, ButtonIcon } from 'rmwc/Button';
import { SimpleMenu, MenuItem } from 'rmwc/Menu';

import AdminStyles from './admin_styles'

const Layout = (props) => (
  <div className="fixer">
    <AdminStyles>
      <NoSSR>
        <Toolbar theme="secondary-light-bg" >
          <ToolbarRow>
            <ToolbarSection alignStart>
              <ToolbarMenuIcon use="menu" />
              <ToolbarTitle>Toolbar</ToolbarTitle>
            </ToolbarSection>
            <ToolbarSection alignEnd>
              
              <MediaQuery query="(min-width: 769px)">
                <Link href="/admin/edit_home" as="/admin"><Button theme="secondary-light-bg" unelevated>Home</Button></Link>
                <Link href="/admin/categories"><Button theme="secondary-light-bg" unelevated>Categories</Button></Link>
                <Link href="/admin/posts"><Button theme="secondary-light-bg" unelevated>Posts</Button></Link>
                <Button theme="secondary-light-bg" onClick={authManager.signout} unelevated>Logout</Button>
              </MediaQuery>

              <MediaQuery query="(max-width: 768px)">
                <SimpleMenu handle={<Button theme="secondary-light-bg" unelevated><ButtonIcon use="more_vert" /></Button>}>
                  <MenuItem><Link href="/admin/edit_home" as="/admin"><span>Home</span></Link></MenuItem>
                  <MenuItem><Link href="/admin/categories"><span>Categories</span></Link></MenuItem>
                  <MenuItem><Link href="/admin/posts"><span>Posts</span></Link></MenuItem>
                </SimpleMenu>
              </MediaQuery>

            </ToolbarSection>
          </ToolbarRow>
        </Toolbar>
      </NoSSR>
    </AdminStyles>
    <section className="main-content">
      { props.children }
    </section>
  </div>
)

export default Layout;


 
