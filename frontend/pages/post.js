import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import PageWrapper from '../components/PageWrapper';
import Menu from '../components/Menu';

const Post = props => {

  const [detailedPost, setDetailedPost] = useState();
  const { headerMenu, query } = props;

  useEffect(() => {
    const DETAILED_POST_URL = `https://wordpress-dot-jacwynn-site-263723.appspot.com/wp-json/wp/v2/posts?slug=${query.slug}`
    fetch(DETAILED_POST_URL)
      .then(response => response.json())
      .then(response => {
        setDetailedPost(response)
      })
      .catch(error => alert(error.message));
  }, []);


  return(
    <Layout>
      <Menu menu={headerMenu} />

      {detailedPost ? 
        <>
          <section className="intro-header-section intro-header-section__post" style={{backgroundImage: `url(${detailedPost[0].better_featured_image.source_url})`}}>
            <div className="intro-header-content-block">
              <h1>{detailedPost[0].title.rendered}</h1>
              <small>Published: {new Date(detailedPost[0].date).toLocaleDateString()}</small>
            </div>
          </section>

          <main>
            <div dangerouslySetInnerHTML={{ __html: detailedPost[0].content.rendered }} />
          </main>
        </>
      : 
      <div className="loader-container">
        <div class="loader">
            Loading...
        </div>
      </div>}
    </Layout>
  )
}

Post.getInitialProps = async context => {
  const query = context.query;
  return { query }
}

export default PageWrapper(Post);
