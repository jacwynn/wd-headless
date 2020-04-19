import React from 'react';
import Layout from '../components/Layout';
import PageWrapper from '../components/PageWrapper';
import Menu from '../components/Menu';
import IntroHeader from '../components/IntroHeader';
import Services from '../components/Services';
import Projects from '../components/Projects';
import FeaturedPosts from '../components/FeaturedPosts';

import fetch from 'isomorphic-unfetch';

const Index = props => {

  const { headerMenu, data } = props;
  const projects = data[0];

  return (
    <Layout>
      <Menu menu={headerMenu} />
      <IntroHeader />
      <Services />
      <Projects projects={projects} />
      <FeaturedPosts />
    </Layout>
  )
}

Index.getInitialProps = async () => {

  const urls = [
    fetch('https://wordpress-dot-jacwynn-site-263723.appspot.com/wp-json/wp/v2/project').then((response) => response.json()),
    fetch('https://wordpress-dot-jacwynn-site-263723.appspot.com/wp-json/wp/v2/posts?per_page=3').then((response) => response.json())
  ]

  const data = await Promise.all(urls);

  return {
    data
  };
};
  

export default PageWrapper(Index);
