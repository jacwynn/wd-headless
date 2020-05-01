const FeaturedPost = ({posts}) => {

    const fposts = posts.map(post => {
        return (
            <div className="featured-post-article">
                <a href={`/post/${post.slug}`}>
                    <div className="featured-post-image" style={{backgroundImage: `url(${post.better_featured_image.source_url})`}}></div>
                    <div className="featured-post-content">
                        <h3 className="featured-post-title">{post.title.rendered}</h3>
                        <h5>{new Date(post.date).toLocaleDateString()}</h5>
                         <div className="featured-post-snippet" dangerouslySetInnerHTML={{__html: post.excerpt.rendered}} />
                    </div>
                </a>
            </div>
        )
    })



    return (
        <section className="featured-post-section" id="featured-post">
            <div className="wrap">
                <h2>Latest Posts</h2>
                <div className="featured-post-container">
                    {fposts}
                </div>
                <div className="featured-post-link">
                    <a href="#">See Older Posts</a>
                </div>
            </div>
        </section>
    )
} 



export default FeaturedPost;