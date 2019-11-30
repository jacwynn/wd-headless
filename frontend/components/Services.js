import React, { Component } from 'react';

const Services = () => (
    <section className="services-section" id="services">
        <h2>What we can do for you</h2>
        <div className="services wrap">
        <div className="service">
            <i class="fa fa-cloud"></i>
            <h3>Cloud Hosting</h3>
            <p>Instead of hosting your website on one server, host your site across a series of links servers. This guarantee your site is always up.</p>
            <a href="/page/cloud-hosting/">Learn More</a>
        </div>

        <div className="service middle">
            <i className="fa fa-wordpress"></i>
            <h3>WordPress Maintenance</h3>
            <p>We ensure that the platform and plugins are always up to date. As a result, security is enhanced and data that is on the site is kept safe.</p>
            <a href="#">Learn More</a>
        </div>

        <div className="service">
            <i className="fa fa-comments"></i>
            <h3>24/7 Support</h3>
            <p>Our skilled persons are avalible to assist you at all times. We will solve any problem arising for you at any time because we are here to help you out.</p>
            <a href="#">Learn More</a>
        </div>
        </div>
        <hr />
    </section>
)

export default Services;