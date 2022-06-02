import React from "react";

export default function Home() {
    return (
        <div className="short-info">
            <div className="container">
                <h1 className="headline">Tech Stack</h1>
                <div className="flex-row">
                    <div className="substack">
                        <h2>Style, Structure, Animation</h2>
                        <div className="flex-row">
                            <div className="stack-icon-container">
                                <p>HTML5</p>
                                <img
                                    src="https://img.icons8.com/ios-filled/48/undefined/html-5--v1.png"
                                    alt="html5"
                                />
                            </div>
                            <div className="stack-icon-container">
                                <p>CSS3</p>
                                <img
                                    src="https://img.icons8.com/ios-filled/48/undefined/css3.png"
                                    alt="css"
                                />
                            </div>
                            <div className="stack-icon-container">
                                <p>Sass</p>
                                <img
                                    src="https://img.icons8.com/material-outlined/48/undefined/sass.png"
                                    alt="sass"
                                />
                            </div>
                        </div>
                    </div>
                    <div className="substack">
                        <h2>Language, Library, Framework</h2>
                        <div className="flex-row">
                            <div className="stack-icon-container">
                                <p>JavaScript</p>
                                <img
                                    src="https://img.icons8.com/ios-filled/48/undefined/javascript-logo.png"
                                    alt="javascript"
                                />
                            </div>
                            <div className="stack-icon-container">
                                <p>React</p>
                                <img
                                    src="https://img.icons8.com/dotty/48/undefined/react.png"
                                    alt="react"
                                />
                            </div>
                            <div className="stack-icon-container">
                                <p>Svelte</p>
                                <img
                                    src="https://img.icons8.com/wired/48/undefined/svetle.png"
                                    alt="svelte"
                                />
                            </div>
                            <div className="stack-icon-container">
                                <p>Vue</p>
                                <img
                                    src="https://img.icons8.com/windows/48/undefined/vuejs.png"
                                    alt="vue"
                                />
                            </div>
                            <div className="stack-icon-container">
                                <p>TypeScript</p>
                                <img
                                    src="https://img.icons8.com/ios-filled/48/undefined/typescript.png"
                                    alt="typescript"
                                />
                            </div>
                        </div>
                    </div>
                    <div className="substack">
                        <h2>Backend Technology</h2>
                        <div className="flex-row">
                            <div className="stack-icon-container">
                                <p>Nodejs</p>
                                <img
                                    src="https://img.icons8.com/windows/48/undefined/nodejs.png"
                                    alt="nodejs"
                                />
                            </div>
                            <div className="stack-icon-container">
                                <p>Postgres</p>
                                <img
                                    src="https://img.icons8.com/ios-filled/50/undefined/postgreesql.png"
                                    alt="postgres"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
