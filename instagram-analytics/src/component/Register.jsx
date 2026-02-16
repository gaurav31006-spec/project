import React, { useState } from "react";
import "./Register.css";
import axios from 'axios'
import { useNavigate } from "react-router-dom";


const Register = () => {
  const [title, settitle] = useState();
  const [time, settime] = useState();
  const [like, setlike] = useState();
  const [view, setview] = useState();
  const [repost, setrepost] = useState();
  const [reach, setreach] = useState();
  const [watchtime, setwatchtime] = useState();
  const [img, setimg] = useState();
  const [share, setshare] = useState();
  const [cmt, setcmt] = useState();
  const [c1, setc1] = useState()
  const [c2, setc2] = useState()
  const [c3, setc3] = useState()
  const [c4, setc4] = useState()
  const [c5, setc5] = useState()
  const [p1, setp1] = useState()
  const [p2, setp2] = useState()
  const [p3, setp3] = useState()
  const [p4, setp4] = useState()
  const [p5, setp5] = useState()

  const navigate = useNavigate()
//  http://10.129.47.108:
  function formhandeler(e) {
    e.preventDefault();
    axios.post(
      'http://10.59.43.108:3000/register',
      { title, time, like, repost, view, watchtime, reach, img, share, cmt, c1, p1, c2, p2, c3, p3, c4, p4, c5, p5 }
    )
      .then(result => {
        console.log(result)
        navigate("/home")
      })
      .catch(err => console.log(err))
  }


  return (
    <div className="register-container">
      <div className="register-box">
        <h2>Reel insight</h2>

        <form onSubmit={formhandeler}>
          <div className="form-group">
            <label>title</label>
            <input type="text"
              placeholder="Enter title"
              onChange={(e) => settitle(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>Time</label>
            <input type="text"
              placeholder="january 10 duration 0:29"
              onChange={(e) => settime(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>like</label>
            <input type="text"
              placeholder="like"
              onChange={(e) => setlike(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>repost</label>
            <input type="text"
              placeholder="Enter repost"
              onChange={(e) => setrepost(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>views</label>
            <input type="text"
              placeholder="views"
              onChange={(e) => setview(e.target.value)} />

          </div>

          <div className="form-group">
            <label>watchtime</label>
            <input type="text"
              placeholder=" watchtime"
              onChange={(e) => setwatchtime(e.target.value)} />
          </div>

          <div className="form-group">
            <label>Account reach</label>
            <input type="text"
              placeholder=" acount reach"
              onChange={(e) => setreach(e.target.value)} />
          </div>

          <div className="form-group">
            <label>image</label>
            <input type="text"
              placeholder=" image link"
              onChange={(e) => setimg(e.target.value)} />
          </div>
          <div className="flex" style={{ display: "flex", flexDirection: "row" }}>
            <div className="form-group">
              <label>country 1</label>
              <input type="text"
                placeholder="country 1 "
                onChange={(e) => setimg(e.target.value)} />
            </div>
            <div className="form-group">
              <label>p1</label>
              <input type="text"
                placeholder=" p1"
                onChange={(e) => setimg(e.target.value)} />
            </div>
          </div>
          <div className="flex" style={{ display: "flex", flexDirection: "row" }}>

            <div className="form-group">
              <label>counrt 2</label>
              <input type="text"
                placeholder=" c2"
                onChange={(e) => setimg(e.target.value)} />
            </div>
            <div className="form-group">
              <label>p2</label>
              <input type="text"
                placeholder=" p2"
                onChange={(e) => setimg(e.target.value)} />
            </div>
          </div>

          <div className="flex" style={{ display: "flex", flexDirection: "row" }}>

            <div className="form-group">
              <label>c3</label>
              <input type="text"
                placeholder=" c3"
                onChange={(e) => setimg(e.target.value)} />
            </div>

            <div className="form-group">
              <label>p3</label>
              <input type="text"
                placeholder=" p3"
                onChange={(e) => setimg(e.target.value)} />
            </div>
          </div>

          <div className="flex" style={{ display: "flex", flexDirection: "row" }}>

            <div className="form-group">
              <label>c4</label>
              <input type="text"
                placeholder=" c4"
                onChange={(e) => setimg(e.target.value)} />
            </div>
            <div className="form-group">
              <label>p4</label>
              <input type="text"
                placeholder=" p4"
                onChange={(e) => setimg(e.target.value)} />
            </div>
          </div>
          <div className="flex" style={{ display: "flex", flexDirection: "row" }}>

            <div className="form-group">
              <label>c5</label>
              <input type="text"
                placeholder=" c5"
                onChange={(e) => setimg(e.target.value)} />
            </div>

            <div className="form-group">
              <label>p5</label>
              <input type="text"
                placeholder=" p5"
                onChange={(e) => setimg(e.target.value)} />
            </div>
          </div>


          <button type="submit" className="btn">
            click
          </button>
        </form>


      </div>
    </div>
  );
};

export default Register;
