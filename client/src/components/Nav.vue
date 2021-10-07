<template>
  <div id="nav">
    <nav class="navbar is-primary" role="navigation" aria-label="main navigation">
  <div class="navbar-brand">
    <a class="navbar-item">
      <img src="../assets/logo.png" width="28" height="28">
      <h3 class="title">Title</h3>
    </a>

    <a role="button" class="navbar-burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample" :class="{'is-active': isActive}" @click="isActive = !isActive">
      <span aria-hidden="true"></span>
      <span aria-hidden="true"></span>
      <span aria-hidden="true"></span>
    </a>
  </div>

<div class="container">
  <div id="navbarBasicExample" class="navbar-menu">
    <div class="navbar-start">
      <a class="navbar-item" href="/">
        Home
      </a>

      <a class="navbar-item" href="/feed">
        Feed
      </a>

      <a class="navbar-item">
        Documentation
      </a>

      <div class="navbar-item has-dropdown is-hoverable">
        <a class="navbar-link">
          More
        </a>

        <div class="navbar-dropdown">
          <a class="navbar-item" href="/about">
            About
          </a>
          <a class="navbar-item">
            Jobs
          </a>
          <a class="navbar-item">
            Contact
          </a>
          <hr class="navbar-divider">
          <a class="navbar-item">
            Report an issue
          </a>
        </div>
      </div>
    </div>

    <div class="navbar-end">
      <div class="navbar-item">
        <login-badge />
      </div>
    </div>
  </div>
</div>
</nav>
  </div>
</template>

<script>
import LoginBadge from './LoginBadge.vue';

export default {
    data(){
        return {
            isActive: false
        }
    },
    components : {
        LoginBadge
    }
}
</script>

<style>

</style>