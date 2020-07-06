import React, { useState, useEffect } from "react";

import styled from "styled-components";

const Input = styled.input`
  padding: 10px;
  border-radius: 8px;
  width: 300px;
  margin: 50px;
`;

const Img = styled.img`
  width: 250px;
  height: 250px;
  border-radius: 50%;
`;

const Container1 = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
`;

const Container2 = styled.div`
  display: flex;
  flex-direction: column;
`;

function GithubDetail(props) {
  const [detail, setDetail] = useState({});
  const [username, setUsername] = useState("");

  function handleKeyPress(event) {
    if (event.key === 'Enter') {
      event.preventDefault();
      setUsername(event.target.value);
    }
  }

  useEffect(() => {
    const fetchDetail = async () => {
      const url = `https://api.github.com/users/${username}`;
      
      let options = {
        method: "GET",
        headers: {
            "Content-type": "applications/json",
            'Authorization' : 'token f348597086154b1df828f581bf087ae8f86410fb'
        },
    };
    

      const response = await fetch(url,options);
      const result = await response.json();
      setDetail(result);
    };

    fetchDetail();
    // eslint-disable-next-line
  }, [username]);

  return (
    <div>
      <form onSubmit={handleKeyPress}>
        <Input
          placeholder="Type a username and press Enter"
          type="text"
          name="username"
          id="username"
          onChange={(event) => setUsername(event.target.value)}
          onKeyPress={handleKeyPress}
        />
      </form>
      <div style={{ textAlign: "center" }}>
        <Img src={detail.avatar_url} alt="avatar" />
        <h2>{detail.name}</h2>
        <p>{detail.bio}</p>
        <hr />
        <Container1>
          <Container2>
            <h2>{detail.followers}</h2>
            <span>Followers</span>
          </Container2>
          <Container2>
            <h2>{detail.public_repos}</h2>
            <span>Repository</span>
          </Container2>
          <Container2>
            <h2>{detail.following}</h2>
            <span>Following</span>
          </Container2>
        </Container1>
        <hr />
      </div>
    </div>
  );
}

export default GithubDetail;
