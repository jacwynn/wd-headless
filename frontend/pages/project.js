import React, { useState, useEffect } from 'react';
import Error from 'next/error';
import Layout from '../components/Layout';
import PageWrapper from '../components/PageWrapper';
import Menu from '../components/Menu';



const Project = props => {

  const [singleProject, setSingleProject] = useState()
  const { headerMenu, query } = props;

  useEffect(() => {
    const PROJECT_URL = `https://wordpress-dot-jacwynn-site-263723.appspot.com/wp-json/wp/v2/project?slug=${query.slug}`
    fetch(PROJECT_URL)
      .then(response => response.json())
      .then(response => {
        setSingleProject(response)
      })
      .catch(error => alert(error.message));
  }, []);


  return(
    <Layout>
      <Menu menu={headerMenu} />

    </Layout>
  )
}

Project.getInitialProps = async context => {
    const query = context.query;
  return { query }
}

export default PageWrapper(Project)