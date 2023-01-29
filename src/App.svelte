<!-- <script> -->
<!-- 	import About from "./views/About.svelte"; -->
<!--   import Home from "./views/Home.svelte"; -->
<!-- </script> -->

<!-- <Home /> -->
<!-- <About /> -->


<script>
  import { Router, links, Route } from "svelte-routing";
  import {
    Header,
    HeaderNav,
    HeaderNavItem,
    SideNav,
    SideNavItems,
    SideNavLink,
    SkipToContent,
    Content,
    InlineNotification,
  } from "carbon-components-svelte";

  import Home from "./views/Home.svelte";
  import About from "./views/About.svelte";

  let isSideNavOpen = false;
</script>

<div use:links>
  <Router url="">
    <Content>
      <Route path="/" component={Home} />
      <Route path="/about" component={About} />
      <Route let:location>
        <InlineNotification
          hideCloseButton
          title="Error:"
          subtitle={`No route found for ${location.pathname}`}
        />
      </Route>
    </Content>
  </Router>
  <div style="float: left; margin: 4px">
    <SideNavLink
      text="Home"
      href="/"
    />
  </div>
  <div style="float: left; margin: 4px">
    <SideNavLink 
      text="About"
      href="/about"
    />
  </div>
</div>
