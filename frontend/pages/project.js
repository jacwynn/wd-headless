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
      {singleProject ?
        <section className="intro-header-section intro-header-section__project">
          <h1>{singleProject ? singleProject[0].title.rendered : "Loading..."}</h1>
          <a href={singleProject[0].acf.project_url} target="_blank"><button>Visit Website</button></a>
        </section>
      : "Spinner goes here"}
      {/* TODO:NEED TO ADD SPINNER FUNCTIONALITY */}

      {singleProject ?
        <section className="project-detail-section wrap">
          <div className="image">
            <img src={singleProject[0].acf.project_imac_image ? singleProject[0].acf.project_imac_image.url : ""} />
          </div>
          <div className="description">
            <div dangerouslySetInnerHTML={{ __html: singleProject[0].content.rendered }} />
          </div>
        </section>
      : ""}
    </Layout>
  )
}

Project.getInitialProps = async context => {
    const query = context.query;
  return { query }
}

export default PageWrapper(Project)