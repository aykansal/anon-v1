import axios from "axios";
import { CLIENT_ID } from "../config";
import { Octokit } from "@octokit/core";
import React, { useEffect } from "react";

interface RepoData {
  name: string;
  description?: string;
  private: boolean;
}

const Github = () => {
  const [rerender, setRerender] = React.useState(false);
  const loginWithGithub = () => {
    window.location.assign(
      "https://github.com/login/oauth/authorize?client_id=" +
        CLIENT_ID +
        "&scope=repo"
    );
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const codeParam = urlParams.get("code");

    if (codeParam && localStorage.getItem("accesss_token") === null) {
      async function getAccessToken() {
        await axios
          .get("http://localhost:3000/getAccessToken?code=" + codeParam)
          .then((response) => {
            return response.data;
          })
          .then((data) => {
            const access_token = data?.split("access_token=")[1].split("&")[0];
            if (access_token) {
              localStorage.setItem("access_token", access_token);
              setRerender(!rerender);
            }
          });
      }
      getAccessToken();
    }
  }, []);

  const getUserData = async () => {
    await axios
      .get("http://localhost:3000/getUserData", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("access_token"),
        },
      })
      .then((response) => {
        return response.data;
      })
      .then((data) => {
        console.log(data);
      });
  };

  const createGithubRepo = async (accessToken: any, _repoData: RepoData) => {
    const octokit = new Octokit({
      auth: accessToken,
    });
    try {
      const response = await octokit.request("POST /user/repos", {
        name: _repoData.name,
        description: _repoData.description,
        private: _repoData.private,
        headers: {
          "X-GitHub-Api-Version": "2022-11-28",
        },
      });

      if (response.status === 201) {
        console.log("Repository created successfully!");
        console.log(response.data);
      } else {
        console.error("Failed to create the repository:", response.status);
      }
    } catch (error) {
      console.error("Error creating repository:", error);
    }
  };

  const sampleRepoData: RepoData = {
    name: "new-repository-name",
    description: "A description of the repository",
    private: true,
  };

  return (
    <div>
      {localStorage.getItem("access_token") ? (
        <div>
          <button onClick={getUserData}>Get User Data</button>
          <button
            onClick={() =>
              createGithubRepo(
                localStorage.getItem("access_token"),
                sampleRepoData
              )
            }
          >
            Create Repo
          </button>
          <button
            onClick={() => {
              localStorage.removeItem("access_token");
              setRerender(!rerender);
            }}
          >
            Logout
          </button>
        </div>
      ) : (
        <button onClick={loginWithGithub}>Login with Github</button>
      )}
    </div>
  );
};

export default Github;
