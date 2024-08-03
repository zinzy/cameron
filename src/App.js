import './App.css';
import axios from "axios";
import {useEffect, useState} from "react";
import Feed from './feed';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { HiOutlineMenuAlt2 } from "react-icons/hi";
import { HiArrowLeft } from "react-icons/hi";
import { CgClose } from "react-icons/cg";

function App() {
  const [blogroll, setArticles] = useState([]);

  const getArticles = async () => {
    try {
      const res = await axios.get("http://localhost:4000");
      setArticles(res.data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getArticles();
  })

  const [navbarOpen, setNavbarOpen] = useState(false);

  return (
    <div className="bg-white">

      {/* https://ibaslogic.com/how-to-add-hamburger-menu-in-react/ */}
      <button className={`menu-trigger${navbarOpen ? ' menu-shown' : ''}`}
        onClick={() => setNavbarOpen((prev) => !prev)}
        >
        {navbarOpen ? (
          <div className=" w-full bg-white flex">
            <div className="w-14 h-14 flex justify-center items-center"><CgClose size={24} /></div>
          </div>
        ) : (
          <div className="flex w-full bg-white">
            <div className="w-14 h-14 flex justify-center items-center"><HiOutlineMenuAlt2 size={24} /></div> 
          </div>
        )}
      </button>

    <div >
    <Tabs>
        <TabList className={`menu-nav${navbarOpen ? ' show-menu' : ''}`}>
  
        {blogroll.map((item, i) =>

          <Tab className="mb-5" onClick={() => setNavbarOpen(false)}><Feed
            key={i}
            title={item.item.title}
            link={item.item.link}
            date={item.item.pubDate}
          /></Tab>
        )} 


      <div className="mt-5 pt-5 border-t">
          <p><a href="" target="_blank" className="text-secondary">What is this?</a></p>
        </div>
        </TabList>
        {blogroll.map((item, i) =>
        <TabPanel>
            <iframe src={item.item.link} title="description" className="active"></iframe>
        </TabPanel>
        )} 


        
      </Tabs>

    </div>

      {/* <div className="">
        {blogroll.map((item, i) =>
          <Feed
            key={i}
            title={item.item.title}
            link={item.item.link}
            date={item.item.pubDate}
          />
        )} 
    </div> */}

    </div>
  );
}

export default App;
