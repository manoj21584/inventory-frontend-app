import React from "react";

const WelcomeContent = () => {
  return (
    <div className="row justify-content-md-center">
      <div className="jumbotron jumbotron-fluid">
        <div className="container">
          <h1 className="display-4 text-success">
            <strong>Hi There !!</strong>
          </h1>
          <h1 className="display-4">
            <b>Welcome To this page</b>
          </h1>
          <p className="lead  display-6">
            <mark>
              <b className="text-primary">
                <u>PLEASE LOGIN TO SEE THE PROTECTED CONTENTS</u>
              </b>
            </mark>
          </p>
        </div>
      </div>
    </div>
  );
};

export default WelcomeContent;
