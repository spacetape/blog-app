// Tools.js
import React from "react";
import Header from "./Header";
import "../css/tools.css";

const Tools = () => {
  return (
    <>
      <Header />
      <div className="tools-container">
        <h1 className="page-title">Productivity Tools</h1>
        <p className="page-text">
          Explore a variety of tools to enhance your productivity and
          organization.
        </p>

        <div className="tool-row">
          <div className="tool-capsule-big">
            <h2>Task Management</h2>
            <p>
              Try using{" "}
              <a
                href="https://todoist.com/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Todoist
              </a>{" "}
              for efficient task management. It's a versatile tool with various
              features.
            </p>
          </div>

          <div className="tool-capsule-small">
            <h2>Note-taking</h2>
            <p>
              Consider using{" "}
              <a
                href="https://www.evernote.com/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Evernote
              </a>{" "}
              for organizing your notes and ideas. It provides a seamless
              experience across devices.
            </p>
          </div>

          <div className="tool-capsule-medium">
            <h2>Time Tracking</h2>
            <p>
              Utilize{" "}
              <a
                href="https://toggl.com/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Toggl
              </a>{" "}
              for tracking your time and optimizing your workflow. It's
              user-friendly and efficient.
            </p>
          </div>
        </div>

        <div className="tool-row">
          <div className="tool-capsule-small">
            <h2>Project Management</h2>
            <p>
              Manage your projects effectively with{" "}
              <a
                href="https://asana.com/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Asana
              </a>
              . Collaborate and organize tasks seamlessly.
            </p>
          </div>

          <div className="tool-capsule-medium">
            <h2>Mind Mapping</h2>
            <p>
              Enhance creativity using{" "}
              <a
                href="https://www.mindmeister.com/"
                target="_blank"
                rel="noopener noreferrer"
              >
                MindMeister
              </a>{" "}
              for mind mapping and brainstorming ideas.
            </p>
          </div>

          <div className="tool-capsule-big">
            <h2>Collaboration</h2>
            <p>
              Foster team collaboration with{" "}
              <a
                href="https://slack.com/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Slack
              </a>{" "}
              - a messaging and collaboration tool.
            </p>
          </div>
        </div>

        {/* Add more tool rows as needed */}
      </div>
    </>
  );
};

export default Tools;
