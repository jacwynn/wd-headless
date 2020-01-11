const IntroHeader = () => (
    <section className="intro-header-section" id="introHeader">

        <div className="intro-header">
             <img src="/static/images/me.png" />
            <h1>Jac Wynn Jr.</h1>
            <h3>SFCC Front End Developer</h3>
            {/*TODO:: Clean up styles for scroll down button */}
            <div id="section10" className="demo">
                <a href="#services"><span></span></a>
            </div>
        </div> 

    </section>
)

export default IntroHeader;