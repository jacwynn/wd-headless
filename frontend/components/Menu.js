/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from 'react';
import Link from 'next/link';
import Router from 'next/router';
import Config from '../config';

import HamburgerMenu from './subComponents/HamburgerButton';

const getSlug = url => {
  const parts = url.split('/');
  return parts.length > 2 ? parts[parts.length - 2] : '';
};

class Menu extends Component {
  state = {
    token: null,
    username: null,
    menuOpen: false,
  };

  componentDidMount() {
    const token = localStorage.getItem(Config.AUTH_TOKEN);
    const username = localStorage.getItem(Config.USERNAME);
    this.setState({ token, username });
  }

  btnClickToggle = () => {
    this.setState((prevState) => {
      return {menuOpen: !prevState.menuOpen}
    })
  }

  render() {
    const { menu } = this.props;
    const { token, username } = this.state;
    const menuItems = menu.items.map(item => {
      if (item.object === 'custom') {
        return (
          <Link href={item.url} key={item.ID}>
            <a>{item.title}</a>
          </Link>
        );
      }
      const slug = getSlug(item.url);
      const actualPage = item.object === 'category' ? 'category' : 'post';
      return (
        <Link
          as={`/${item.object}/${slug}`}
          href={`/${actualPage}?slug=${slug}&apiRoute=${item.object}`}
          key={item.ID}
        >
          <a>{item.title}</a>
        </Link>
      );
    });

    let active;
    let showMenu;
    let animateMenu;

    if (this.state.menuOpen) {
      active = "mobile-menu-active"
      showMenu = "show"
      animateMenu = "open"
    } else {
      active = "mobile-menu-not-active"
      showMenu = "noShow"
    }

    return (
      <header className={`header ${active}`}>
        <div className="wrap flex-default clearfix">
          <HamburgerMenu menu={menuItems} animateMenu={animateMenu} click={this.btnClickToggle} />
          <h1 className="logo">
            <Link as="/">Wynn Digital</Link>
          </h1>
          <nav className={`navigation ${showMenu}`}>
            {menuItems}
          </nav>
        </div>
      </header>
    );
  }
}
export default Menu;
