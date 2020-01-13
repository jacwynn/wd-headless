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
          <button>Visit Website</button>
        </section>
      : "Spinner goes here"}
      {/* TODO::NEED TO ADD SPINNER FUNCTIONALITY */}

      {singleProject ?
        <section className="project-detail-section wrap">
          <div className="image">
            <img src={singleProject[0].better_featured_image.media_details.sizes.medium_large.source_url} />
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