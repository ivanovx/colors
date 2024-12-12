import React from "react";

import "./Banner.css";

export default function Banner() {
    return (
        <header role="banner">
            <h1 className="bannerTitle">Colors</h1>
            <p className="bannerIntro">
                Visualize The CSS Color Function<b>*</b>. Made by{" "}
                <a href="https://www.ivanov.pro" target="_blank" rel="noopener">Ivan Ivanov</a>
                . Code on{" "}
                <a href="https://github.com/ivanovx/colors" target="_blank" rel="noopener">GitHub</a>
                . Inspired by{" "}
                <a href="https://jim-nielsen.com/sassme/" target="_blank" rel="noopener">SassMe</a>
                .
            </p>
        </header>
    );
}