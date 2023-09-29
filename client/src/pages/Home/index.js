import React from 'react';
import CreatePost from '../../components/CreatePost';
import Navbar from '../../components/Navbar';
import Post from '../../components/Post';
import "./index.scss";

function Home() {
  return (
    <div className='home'>
      <Navbar />
      <div className='main'>
        <CreatePost />
        <Post />
      </div>
    </div>
  )
}

export default Home;