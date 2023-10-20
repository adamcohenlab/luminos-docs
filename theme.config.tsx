import React from "react";
import { DocsThemeConfig, useConfig } from "nextra-theme-docs";
import { useRouter } from "next/router";

const config: DocsThemeConfig = {
  useNextSeoProps() {
    const { asPath } = useRouter();
    if (asPath !== "/") {
      return {
        titleTemplate: "%s",
      };
    }
  },
  head: (
    <>
      <meta
        name="description"
        content="Luminos is a MATLAB library for bi-directional microscopy: simultaneous high-speed imaging and patterned optical stimulation."
      />
    </>
  ),
  logo: <span>Luminos</span>,
  project: {
    link: "https://github.com/adamcohenlab/luminos-microscopy",
  },
  feedback: {
    useLink() {
      const config = useConfig();
      return getGitIssueUrl({
        labels: "feedback",
        repository: config.project.link,
        title: `Luminos Feedback`,
      });
    },
  },
  docsRepositoryBase: "https://github.com/adamcohenlab/luminos-docs/tree/main",
  footer: {
    text: (
      <span
        style={{
          // make small
          fontSize: "0.8em",
        }}
      >
        Created by the{" "}
        <a
          href="https://cohenweb.rc.fas.harvard.edu/Research/research.html"
          style={{
            textDecoration: "underline",
          }}
          // open in new tab
          target="_blank"
        >
          Adam Cohen Lab
        </a>{" "}
        at Harvard University
      </span>
    ),
  },
};

const getGitIssueUrl = ({
  repository,
  title,
  labels,
}: {
  repository: string;
  title: string;
  labels: string;
}) => {
  const labelString = labels ? `&labels=${labels}` : "";
  return `${repository}/issues/new?title=${encodeURIComponent(
    title
  )}${labelString}`;
};

export default config;
