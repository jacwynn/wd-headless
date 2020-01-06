const Projects = ({projects}) => {

    const fprojects = projects.map(project => {
        return (
            <li>
                <a href="#">
                    <img src={project.better_featured_image.source_url} />
                    <h4>{project.title.rendered}</h4>
                </a>
            </li>
        )
    })

    

    return (
        <section className="projects-section" id="projects">
            <div className="wrap">
                <h2>Projects</h2>
                <ul>
                    {projects.length > 0 ? fprojects : "loading..."}
                </ul>
            </div>
        </section>
    )
}

export default Projects