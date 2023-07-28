import React from 'react';
import CreatePost from '../../components/CreatePost';
import Navbar from '../../components/Navbar';
import Post from '../../components/Post';

function Home() {
  return (
    <div>
      <Navbar />
      <div className='main'>
        <CreatePost />
        <Post />
      </div>
    </div>
  )
}

export default Home;