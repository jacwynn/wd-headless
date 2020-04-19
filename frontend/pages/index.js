import React from 'react';
import { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import PageWrapper from '../components/PageWrapper';
import Menu from '../components/Menu';
import IntroHeader from '../components/IntroHeader';
import Services from '../components/Services';
import Projects from '../components/Projects';
import FeaturedPosts from '../components/FeaturedPosts';

const Index = props => {

  const [projects, setProject] = useState([]);


  Index.getInitialProps = async ctx => {
      //create array map of urls
      let urls = [
        'https://wordpress-dot-jacwynn-site-263723.appspot.com/wp-json/wp/v2/project',
        'https://wordpress-dot-jacwynn-site-263723.appspot.com/wp-json/wp/v2/posts?per_page=3'
      ]

      //pass that array of urls into promise.all (should return 1 object of data I need)
      let requests = urls.map((url) => fetch(url));

      Promise.all(requests)
        .then(responses => console.log(responses))
  }

  useEffect(() => {
    const PROJECTS_URL = 'https://wordpress-dot-jacwynn-site-263723.appspot.com/wp-json/wp/v2/project'
    fetch(PROJECTS_URL)
      .then(response => response.json())
      .then(response => {
        setProject(response)
      })
  }, []);

  const { headerMenu } = props;

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

  

export default PageWrapper(Index);
