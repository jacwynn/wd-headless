import React from 'react';
import { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import PageWrapper from '../components/PageWrapper';
import Menu from '../components/Menu';
import IntroHeader from '../components/IntroHeader';
import Services from '../components/Services';
import Projects from '../components/Projects';

const Index = props => {

  const [projects, setProject] = useState([]);

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
    </Layout>
  )
}

  

export default PageWrapper(Index);
