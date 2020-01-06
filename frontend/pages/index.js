import React, { Component } from 'react';
import Link from 'next/link';
import Router from 'next/router';
import WPAPI from 'wpapi';
import Layout from '../components/Layout';
import PageWrapper from '../components/PageWrapper';
import Menu from '../components/Menu';
import HeroImage from '../components/HeroImage';
import IntroHeader from '../components/IntroHeader';
import Services from '../components/Services';
import About from '../components/About';
import Projects from '../components/Projects';
import Config from '../config';

const wp = new WPAPI({ endpoint: Config.apiUrl });

const tokenExpired = () => {
  if (process.browser) {
    localStorage.removeItem(Config.AUTH_TOKEN);
  }
  wp.setHeaders('Authorization', '');
  Router.push('/login');
};

class Index extends Component {
  state = {
    id: '',
    projects: []
  };

  static async getInitialProps() {
    try {
      const [page, posts, pages, media] = await Promise.all([
        wp.pages().slug('welcome').embed().then(data => {
            return data[0];
          }),
        wp.posts().embed(),
        wp.pages().embed(),
        wp.media().embed()
      ]);
      return { page, posts, pages, media };

    } catch (err) {
      if (err.data.status === 403) {
        tokenExpired();
      }
    }

    return null;
  }

  componentDidMount() {
    const token = localStorage.getItem(Config.AUTH_TOKEN);
    if (token) {
      wp.setHeaders('Authorization', `Bearer ${token}`);
      wp.users()
        .me()
        .then(data => {
          const { id } = data;
          this.setState({ id });
        })
        .catch(err => {
          if (err.data.status === 403) {
            tokenExpired();
          }
        });
    }



    fetch('https://wordpress-dot-jacwynn-site-263723.appspot.com/wp-json/wp/v2/project')
      .then(response => response.json())
      .then(response => {
        this.setState({
          projects: response
        })
      })

  }

  render() {
    const { id } = this.state;
    const { posts, pages, headerMenu, page, media, types } = this.props;
    // const fprojects = this.state.projects.map(project => {
    //   return (
    //       <h1>hello</h1>
    //   )
    // });
    // const fposts = posts.map(post => {
    //   return (

    //     <ul key={post.slug}>
    //       <li>
    //         <Link
    //           as={`/post/${post.slug}`}
    //           href={`/post?slug=${post.slug}&apiRoute=post`}
    //         >
    //           <a>{post.title.rendered}</a>
    //         </Link>
    //       </li>
    //     </ul>
    //   );
    // });
    // const fpages = pages.map(ipage => {
    //   return (
    //     <ul key={ipage.slug}>
    //       <li>
    //         <Link
    //           as={`/page/${ipage.slug}`}
    //           href={`/post?slug=${ipage.slug}&apiRoute=page`}
    //         >
    //           <a>{ipage.title.rendered}</a>
    //         </Link>
    //       </li>
    //     </ul>
    //   );
    // });


    return (
      <Layout>
        {/* {console.log(this.state.projects, "state for projects")} */}
        <Menu menu={headerMenu} />
        <IntroHeader />
        {/* <HeroImage /> */}
        <Services />
        <Projects projects={this.state.projects} />
        {/* <About /> */}
        {/* <BlogPosts />         */}
        {/* <section className="posts-section">
          <h2>Posts</h2>
          {fposts}
        </section> */}
        <section className="contact-section">
          <h1>Contact Section</h1>
        </section>
        {/* <div
          dangerouslySetInnerHTML={{
            __html: page.content.rendered,
          }}
        /> */}
      </Layout>
    );
  }
}

export default PageWrapper(Index);
